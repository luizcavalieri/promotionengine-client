# Promotion Engine FE

This is a project to proof concept of a Benefits Engine and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

- Using Angular Cli: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Using NPM: Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

- Using Angular Cli: Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
- Using NPM: Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Mocked API Server

- Install "json-server" globally with either npm or yarn
- Run the below command from terminal within "/api" directory
  - json-server --watch product.json --port 8085


## Running unit tests

- Using Angular Cli: Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Using NPM: Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

- Using Angular Cli: Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
- Using Angular Cli: Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Code scaffolding (Only with Angular CLI)

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help with Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Modules and functionalities introduced

- HTTP Services getting list and item detail via routing.
- Lazy loading images directive. 
- List component.
- Detail component. 
- Material Design.
  - Card layout.
  - Custom theme.
- Dockerfile integrated with dockerhub.
- Circle CI config building to Docker hub. [Circle CI reference](https://circleci.com/docs/2.0/configuration-reference/#store_test_results)
