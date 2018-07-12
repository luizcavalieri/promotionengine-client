import {EBenefitType} from '../benefits';

export class BenefitDetail {
  quantity: number;
  promotionType: string;
  benefitType: EBenefitType;
  promotionId: number;
  benefitId: number;
  message: string;
}
