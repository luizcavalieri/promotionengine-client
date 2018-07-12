import {BenefitPointDetail} from './benefits/point';
import {BenefitCouponDetail} from './benefits/coupon';
import {BenefitFixedPriceDetail} from './benefits/fixed-price';
import {BenefitAmountOffItemDetail} from './benefits/amount-off-item';
import {BenefitAmountOffCartDetail} from './benefits/amount-off-cart';
import {BenefitPercentageOffCartDetail} from './benefits/percentage-off-cart';
import {BenefitItemFreeDetail} from './benefits/item-free';
import {BenefitGiftDetail} from './benefits/gift';

export class Benefits {
  ItemFree: BenefitItemFreeDetail;
  PercentageOffCart: BenefitPercentageOffCartDetail;
  PercentageOffItem: BenefitPercentageOffCartDetail;
  AmountOffCart: BenefitAmountOffCartDetail;
  AmountOffItem: BenefitAmountOffItemDetail;
  FixedPrice: BenefitFixedPriceDetail;
  Gift: BenefitGiftDetail;
  Coupon: BenefitCouponDetail;
  Point: BenefitPointDetail;
}

export enum EBenefitType {
  ITEM_FREE = 'ITEM_FREE',
  PERCENTAGE_OFF = 'PERCENTAGE_OFF',
  AMOUNT_OFF = 'AMOUNT_OFF',
  FIXED_PRICE = 'FIXED_PRICE',
  COUPONB = 'COUPONB',
  GIFT = 'GIFT',
  POINTS = 'POINTS'
}

export enum EBenefit {
  ITEM_FREE = 'ITEM_FREE',
  PERCENTAGE_OFF = 'PercentageOffCart',
  AMOUNT_OFF = 'AMOUNT_OFF',
  FIXED_PRICE = 'FIXED_PRICE',
  COUPONB = 'COUPONB',
  GIFT = 'GIFT',
  POINTS = 'POINTS'
}
