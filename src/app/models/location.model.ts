export interface MainProvince {
  code: number;
  name: string;
  division_type: string;
  codename: string;
}
export interface Province extends MainProvince {
  phone_code: number;
}
export interface District extends MainProvince {
  province_code: number;
}
export interface Ward extends MainProvince {
  province_code: number;
}