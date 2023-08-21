import { Page } from "./page.model";

export interface Tag {
    id: number,
    name: string,
    name_slugify: string,
    type: string,
    status: boolean,
    deleted: boolean,
    updated_at: string,
    created_at: string
}
export interface QrTag extends Page{
    search?:string;
    status?:boolean
    sort?:string;
    tag_id?:number|string
}
export interface TagBody {
    name?:string;
    type?:string;
    status?:boolean;
}