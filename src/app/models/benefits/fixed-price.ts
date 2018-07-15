import {BenefitDetail} from './benefit-details';

export class BenefitFixedPriceDetail extends BenefitDetail {
  newPrice: number;
  originalPrice: number;
  itemKey: string;
}
