import { useQuery } from "react-query";
import { FC, useRef, useState } from "react";
import { _province } from "app/apis";
import { useFilterKeyword } from "app/hooks";
import { Box, MenuItem } from "@mui/material";
import { STALE_TIME } from "configs";
import './address-select.scss'

export interface ValuesAddress {
  province?: number | null,
  district?: number | null,
  ward?: number | null,
}

interface AddressSelectProps {
  values?: ValuesAddress;
  onChangeProvince?: (code?: number | null) => void;
  onChangeDistrict?: (code?: number | null) => void;
  onChangeWard?: (code?: number | null) => void;
}

export const SelectAddress: FC<AddressSelectProps> = ({
  values, onChangeProvince = () => { }, onChangeDistrict = () => { }, onChangeWard = () => { }
}) => {
  const [key, setKeyword] = useState('')
  const refProvince = useRef<HTMLDivElement>(null)
  const refDistrict = useRef<HTMLDivElement>(null)
  const refWard = useRef<HTMLDivElement>(null)
  const { data } = useQuery({
    queryKey: ['PROVINCES'],
    queryFn: () => _province.findProvinces(),
    staleTime: STALE_TIME
  })
  const { data: districts } = useQuery({
    queryKey: ['DISTRICT', values?.province],
    queryFn: () => _province.findDistricts(values?.province ?? 0),
    enabled: values?.province ? true : false,
    staleTime: STALE_TIME
  })
  const { data: wards } = useQuery({
    queryKey: ['WARD', values?.district],
    queryFn: () => _province.findWards(values?.district ?? 0),
    enabled: values?.district ? true : false,
  })
  const listSearch = useFilterKeyword(key, data?.context?.data || [])
  const changeProvince = (code: any) => {
    onChangeProvince(code)
    onChangeDistrict(values?.province !== code ? null : values?.district)
    onChangeWard(values?.province !== code ? null : values?.ward)
    refProvince.current?.classList.remove('province_select_act')
  }
  const changeDistrict = (code: any) => {
    onChangeDistrict(code)
    onChangeWard(values?.district !== code ? null : values?.ward)
    refDistrict.current?.classList.remove('district_select_act')
  }
  const changeWard = (code: any) => {
    onChangeWard(code)
    refWard.current?.classList.remove('ward_select_act')
  }
  window.addEventListener('click', () => {
    refProvince.current?.classList.remove('province_select_act')
    refDistrict.current?.classList.remove('district_select_act')
    refWard.current?.classList.remove('ward_select_act')
  })
  return (
    <>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required'>Tỉnh/thành phố</label>
        <div
          onClick={(e) => {
            e.stopPropagation();
            refProvince.current?.classList.toggle('province_select_act')
            refDistrict.current?.classList.remove('district_select_act')
          }}
          className='col-lg-8 fv-row province_cnt'
        >
          <input
            disabled
            type="text"
            className='form-control form-control-lg form-control-solid'
            placeholder='Province'
            value={listSearch?.find(i => i.code === values?.province)?.name ?? '---'}
          />
          <Box sx={{ boxShadow: 3 }}
            onClick={(e) => e.stopPropagation()}
            ref={refProvince} className="province_select"
          >
            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              placeholder='Tìm kiếm'
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="province_list">
              <ul className="list">
                {
                  listSearch?.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      onClick={() => changeProvince(item.code)}
                      style={values?.province === item.code ? { backgroundColor: 'var(--kt-gray-200)' } : {}}
                    >
                      {item.name}
                    </MenuItem>
                  ))
                }
              </ul>
            </div>
          </Box>
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label'>
          <span className='required'>Quận/huyện</span>
        </label>

        <div
          onClick={(e) => {
            e.stopPropagation();
            refDistrict.current?.classList.toggle('district_select_act')
            refWard.current?.classList.remove('ward_select_act')
          }}
          className='col-lg-8 fv-row province_cnt'
        >
          <input
            disabled
            type='tel'
            className='form-control form-control-lg form-control-solid'
            placeholder='District'
            value={districts?.context?.data?.find(i => i.code === values?.district)?.name ?? '---'}
          />
          <Box sx={{ boxShadow: 3 }}
            onClick={(e) => e.stopPropagation()}
            ref={refDistrict} className="province_select"
          >
            <div style={{ height: '100%' }} className="province_list">
              <ul className="list">
                {
                  districts?.context?.data?.map((item, index: number) => (
                    <MenuItem
                      key={index}
                      onClick={() => changeDistrict(item.code)}
                      style={values?.district === item.code ? { backgroundColor: 'var(--kt-gray-200)' } : {}}
                    >
                      {item.name}
                    </MenuItem>
                  ))
                }
              </ul>
            </div>
          </Box>
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label'>
          <span className='required'>Xã/phường</span>
        </label>
        <div
          onClick={(e) => {
            e.stopPropagation();
            refWard.current?.classList.toggle('ward_select_act')
          }}
          className='col-lg-8 fv-row province_cnt'
        >
          <input
            disabled
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='Ward'
            value={wards?.context?.data?.find((i: any) => i.code === values?.ward)?.name ?? '---'}
          />
          <Box
            sx={{ boxShadow: 3 }}
            onClick={(e) => e.stopPropagation()}
            ref={refWard} className="province_select"
          >
            <div style={{ height: '100%' }} className="province_list">
              <ul className="list">
                {
                  wards?.context?.data?.map((item: any, index: number) => (
                    <MenuItem
                      key={index}
                      onClick={() => changeWard(item.code)}
                      style={values?.ward === item.code ? { backgroundColor: 'var(--kt-gray-200)' } : {}}
                    >
                      {item.name}
                    </MenuItem>
                  ))
                }
              </ul>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}