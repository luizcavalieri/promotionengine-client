import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LazyViewport } from './lazy-viewport';
import {LazyTarget } from './lazy-target';

@Directive({
  selector: '[appLazySrc]'
})

export class LazySrcDirective implements OnInit, OnDestroy, LazyTarget {
  @Input()
  appLazySrc: string;
  @Input()
  lazySrcVisible: string;

  public element: Element;
  private lazyViewport: LazyViewport;
  private renderer: Renderer2;


  constructor(elementRef: ElementRef,
              lazyViewport: LazyViewport,
              renderer: Renderer2) {

    this.element = elementRef.nativeElement;
    this.lazyViewport = lazyViewport;
    this.renderer = renderer;

    this.appLazySrc = '';
    this.lazySrcVisible = '';
  }

  // I get called once when the directive is being destroyed.
  public ngOnDestroy(): void {

    // If we haven't detached from the LazyViewport, do so now.
    if (this.lazyViewport) {
      this.lazyViewport.removeTarget(this);
    }

  }


  // I get called once after the inputs have been bound for the first time.
  public ngOnInit(): void {

    // Attached this directive the LazyViewport so that we can be alerted to changes
    // in this element's visibility on the page.
    this.lazyViewport.addTarget(this);

  }


  // I get called by the LazyViewport service when the element associated with this
  // directive has its visibility changed.
  public updateVisibility(isVisible: boolean, ratio: number): void {

    // When this target starts being tracked by the viewport, the initial visibility
    // will be reported, even if it is not visible. As such, let's ignore the first
    // visibility update.
    if (!isVisible) {
      return;
    }

    // Now that the element is visible, load the underlying SRC value. And, since we
    // no longer need to worry about loading, we can detach from the LazyViewport.
    this.lazyViewport.removeTarget(this);
    this.lazyViewport = null;
    this.renderer.setProperty(this.element, 'src', this.appLazySrc);

    // If an active class has been provided, add it to the element.
    if (this.lazySrcVisible) {
      this.renderer.addClass(this.element, this.lazySrcVisible);
    }

  }
}
