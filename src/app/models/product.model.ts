import { Branch } from "./branch.model";
import { Category } from "./category.model";
import { Media } from "./media.model";
import { Page } from "./page.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export interface Product {
    id: number;
    name: string;
    name_slugify: string;
    thumbnail_url: string | null;
    price_original: number;
    price: number;
    price_special: number;
    short_content: string;
    status: boolean;
    deleted: boolean;
    updated_at: string;
    created_at: string;
    created_by_id: number;
    tag_id: number;
    category_id: number;
    branches: {
        branch_id: number;
        branch: Branch
    }[];
    tag?: Tag;
    category?: Category;
    account: User;
    media:{
        media:Media
    }[]
}
export interface ProductMedia {
    media:Media
}
export interface ProductBranch{
    quantity:number;
    status:boolean;
    branch:Branch;
    created_at:string;
}
export interface ProductSize{
    id:number;
    name:string;
    product_id:number;
    status:boolean;
    updated_at:string;
    created_at:string
}
export interface QrProduct extends Page {
    search?: string;
    branch_ids?: number | string;
    tag_id?: number | string;
    category_ids?: string;
    min_price?: number | string;
    max_price?: number | string;
    min_price_original?: number | string;
    max_price_original?: number | string;
    includes?: string;
    sort?: string;
    status?: boolean;
}
export interface ProductBody {
    name?: string;
    thumbnail_url?:string;
    price_original?: number;
    price?: number;
    price_special?: number;
    short_content?: string;
    tag_id?: number|string;
    category_id?: number|string;
    status?: boolean
}