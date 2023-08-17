import { LoadingButton } from "@mui/lab";
import { PageTitle, RoleLayout, SelectAddress, Snack, SwitchButton, UploadBtn } from "app/components";
import { RBranch } from "app/constants";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import "./style.scss"
import { BranchBody } from "app/models";
import { useMedia, useMessage } from "app/hooks";
import { ChangeEvent } from "react";
import { useMutation, useQuery } from "react-query";
import { QR_KEY } from "configs";
import { _branch } from "app/apis";
import * as Yup from "yup"
import { validate } from "app/utils";
import { AxiosError } from "axios";

function BranchFrom() {
  const { id } = useParams()
  const { handlePostMedia, isLoading: isLoadingMedia } = useMedia()
  const { notification, result, onClose } = useMessage()
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: BranchBody) => id ? _branch.update(id, body) : _branch.create(body),
    onSuccess: () => result({
      message: id ? 'Cập nhật thành công' : 'Tạo mới thành công',
      color: 'success',
    }),
    onError: (error) => {
      const err = error as AxiosError
      result({
        message: err.response?.data.message || 'Có lỗi xảy ra',
        color: 'error'
      })
    }
  })
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik<BranchBody>({
    initialValues: {
      name: '',
      email: '',
      hotline: '',
      short_address: '',
      media: null,
      status: true,
      province_code: undefined,
      district_code: undefined,
      ward_code: undefined,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Vui lòng nhập tên chi nhánh'),
      email: Yup.string().required("Vui lòng nhập email").matches(validate.email, { message: 'Nhập đúng dạng dạng email' }),
      hotline: Yup.string().required("Vui lòng nhập hotline").matches(validate.phone, { message: 'Nhập đúng dạng dạng hotline' }),
      short_address: Yup.string().required('Vui lòng nhập địa chỉ chi nhánh'),
      province_code: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
      district_code: Yup.string().required('Vui lòng chọn quận/huyện'),
      ward_code: Yup.string().required('Vui lòng chọn xã/phường'),
    }),
    onSubmit: (values) => {
      mutate({
        ...values,
        media_id: values.media?.id || undefined
      })
    }
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.branch, id],
    queryFn: () => _branch.findById(id || 0),
    enabled: !!id,
    onSuccess: (data) => {
      const { context } = data
      setFieldValue('name', context.name)
      setFieldValue('status', context.status)
      setFieldValue('email', context.email || '')
      setFieldValue('media', context.media)
      setFieldValue('hotline', context.hotline || '')
      setFieldValue('short_address', context.short_address || '')
      setFieldValue('province_code', context.province?.code)
      setFieldValue('district_code', context.district?.code)
      setFieldValue('ward_code', context.ward?.code)
    }
  })
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      resetOriginalResult: true,
      callBack: (data) => setFieldValue('media', data[0])
    })
  }
  return (
    <RoleLayout permissionPath={id ? RBranch.PUT : RBranch.POST} isNavigate>
      <>
        <Snack message={notification.message} open={notification.openAlert} onClose={onClose} severity={notification.color} />
        <PageTitle title={id ? "Thay đổi thông tin" : "Tạo mới chi nhánh"} />
        <div className="card p-4">
          <form onSubmit={handleSubmit} className="form">
            <div className="my-3 d-flex justify-content-center">
              <div className="avatar-image">
                <img src={values.media?.original_url || ''} alt="" />
                <div className="btn-avatar-cnt">
                  <UploadBtn loading={isLoadingMedia} id="file_avatar" onChange={onChangeMedia} />
                </div>
              </div>
            </div>
            <div className="column my-3">
              <SwitchButton
                label="Trạng thái"
                value={values.status}
                onChange={(e) => setFieldValue('status', e.target.checked)}
              />
            </div>
            <div className="column my-3">
              <label className="form-label required">Tên chi nhánh</label>
              <input name='name' value={values.name} onChange={handleChange} type="text"
                className="form-control form-control-solid"
              />
              {
                touched.name && errors.name &&
                <span className="text-danger fs-8">{errors.name}</span>
              }
            </div>
            <div className="d-flex justify-content-between row-2">
              <div className="column-2 my-3">
                <label className="form-label required">Email liên hệ</label>
                <input
                  name="email" value={values.email} onChange={handleChange}
                  className="form-control form-control-solid"
                />
                {
                  touched.email && errors.email &&
                  <span className="text-danger fs-8">{errors.email}</span>
                }
              </div>
              <div className="column-2 my-3">
                <label className="form-label required">Hotline</label>
                <input
                  name="hotline" value={values.hotline} onChange={handleChange}
                  className="form-control form-control-solid"
                />
                {
                  touched.hotline && errors.hotline &&
                  <span className="text-danger fs-8">{errors.hotline}</span>
                }
              </div>
            </div>
            <div className="column my-3">
              <label className="form-label required">Địa chỉ</label>
              <input name="short_address" value={values.short_address} onChange={handleChange} type="text"
                className="form-control form-control-solid"
              />
              {
                touched.short_address && errors.short_address &&
                <span className="text-danger fs-8">{errors.short_address}</span>
              }
            </div>
            <div className="column my-3">
              <SelectAddress
                values={{
                  province: values.province_code,
                  district: values.district_code,
                  ward: values.ward_code
                }}
                onChangeProvince={(code) => setFieldValue('province_code', code)}
                onChangeDistrict={(code) => setFieldValue('district_code', code)}
                onChangeWard={(code) => setFieldValue('ward_code', code)}
              />
            </div>
            <div className="d-flex justify-content-end mt-6">
              <LoadingButton loading={isLoading} type="submit" color="success" variant="contained">
                Lưu
              </LoadingButton>
              {
                id &&
                <LoadingButton onClick={() => refetch()} loading={isFetching} className="mx-2" type="button" variant="outlined">
                  Khôi phục
                </LoadingButton>
              }
            </div>
          </form>
        </div>
      </>
    </RoleLayout>
  );
}

export default BranchFrom;