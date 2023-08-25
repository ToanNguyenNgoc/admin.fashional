import { Page } from "./page.model";
import { PaymentGateway, PaymentMethod } from "./payment.model";
import { Account } from "./user.model";

export interface Order {
    id: number;
    account_id: number;
    payment_method_id: number;
    address_id: number;
    branch_id: null | number;
    status: boolean;
    deleted: boolean;
    amount: number;
    order_original: string;
    updated_at: string;
    created_at: string;
    note: null;
    account: Account;
    payment_method?: PaymentMethod;
    payment_gateway?: PaymentGateway;
    delivery_address: DeliveryAddress;
    order_deliveries: OrderDelivery[]
}
export interface DeliveryAddress {
    id: number;
    account_id: number;
    is_default: boolean;
    status: boolean;
    delete: boolean;
    short_address: string;
    province_code: number;
    district_code: number;
    ward_code: number;
    lat: number;
    long: number;
    updated_at: string;
    created_at: string;
    consignee_s_name: string;
    consignee_s_telephone: string;
    province: { name: string };
    district: { name: string };
    ward: { name: string };
}
export interface OrderDelivery {
    id: number,
    status_name: string,
    note: string,
    updated_at: string,
    created_at: string,
    created_by?: Account,
    order_id: 2
}
export interface QrOrder extends Page{
    includes?:string;
}