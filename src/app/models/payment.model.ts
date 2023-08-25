export interface PaymentMethod {
    id: number;
    name: string;
    icon: string | null;
    setting: string | null;
    method_key: string;
    child_key: string;
    deleted: boolean;
    status: boolean;
    updated_at: string;
    created_at: string
}
export interface PaymentGateway {
    transaction_txn: string;
    transaction: string;
    amount: string;
    description: string;
    payment_url: null | string;
    callback_url: null | string;
    secure_hash: null | string;
    status: string;
    updated_at: string;
    created_at: string;
    order_id: number
}