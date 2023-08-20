import { Page } from "./page.model";
import { Tag } from "./tag.model";

export interface Category {
    id: 8,
    name: string,
    name_slugify: string,
    status: boolean,
    deleted: boolean,
    updated_at: string,
    created_at: string,
    tag_id: number,
    tag: Tag
}
export interface QrCategory extends Page{
    tag_id?:number|string;
    sort?:string
}
export interface CategoryBody{
    name?:string;
    tag_id?:number|string;
    status?:boolean
}