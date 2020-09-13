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
  notes: JSON;
  created_at: number;
}
