interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string;
  status: string;
  attempts: number;
  notes: {
    stationId: string;
    userId: string;
    numberOfHalfLitre: number;
    price: number;
  };
  created_at: number;
}
