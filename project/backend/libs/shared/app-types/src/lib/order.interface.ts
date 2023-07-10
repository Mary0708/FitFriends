import { PaymentOption } from "./payment-option.enum";

export interface Order {
  _id?: number;
  userId: string;
  coachId: number;
  gymId?: number;
  orderType: string;
  trainingId: number;
  trainingCount: number;
  totalPrice: number;
  price: number;
  paymentOption: PaymentOption;
  trainingDoneCount: number;
  trainingRestCount: number;
  isDone: boolean;
}
