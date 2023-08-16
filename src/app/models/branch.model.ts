import { District, Province, Ward } from "./location.model";
import { Media } from "./media.model";
import { Page } from "./page.model";

export interface Branch {
  id: number;
  name: string;
  media_id: number | null;
  status: boolean;
  deleted: boolean;
  updated_at: string;
  created_at: string;
  short_address: string;
  province_code: number;
  district_code: number;
  ward_code: number;
  lat: number | null;
  long: number | null;
  hotline: number | null;
  email: number | null;
  province?: Province | null;
  district?: District | null;
  ward?: Ward | null;
  media?: Media | null
}
export interface QrBranch extends Page {
  status?: boolean;
  includes?: string;
  created_at?: 'desc' | 'asc'
}
export interface BranchBody {
  name?: string;
  media_id?: number;
  short_address?: string;
  province_code?: number;
  district_code?: number;
  ward_code?: number;
  hotline?: string;
  email?: string;
  lat?: number;
  long?: number;
  media?:Media|null;
  status?:boolean
}