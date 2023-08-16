import { _account } from "app/apis";
import { PageTitle, RoleLayout, SelectRole, Snack, SwitchButton, UploadBtn } from "app/components";
import { RAccount } from "app/constants";
import { useMedia, useMessage, usePermission } from "app/hooks";
import { QR_KEY } from "configs";
import { useFormik } from "formik";
import { ChangeEvent, Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import { validate } from "app/utils";
import './style.scss'
import { AccountBody, Role } from "app/models";

function AccountForm() {
  const { id } = useParams()
  const { handlePostMedia, isLoading: isLoadingMedia } = useMedia()
  const { notification, result, onClose } = useMessage()
  const { resolve } = usePermission(RAccount.GET_ID)
  const { isLoading, mutate } = useMutation({
    mutationFn: (body: AccountBody) => id ? _account.update(id, body) : _account.create(body),
    onSuccess: () => result({
      message: id ? 'Cập nhật thành công' : 'Tạo mới thành công',
      color: 'success',
    }),
    onError: () => result({ message: 'Có lỗi xảy ra', color: 'error' })
  })
  const { touched, errors, values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      telephone: '',
      avatar: '',
      status: false,
      password: '',
      password_confirm: '',
      roles: []
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Vui lòng nhập họ và tên"),
      email: Yup.string().required("Vui lòng nhập email").matches(validate.email, { message: 'Nhập đúng dạng dạng email' }),
      telephone: Yup.string().required("Vui lòng nhập số điện thoại"),
      password: !id ? Yup.string().required("Vui lòng nhập mật khẩu") : Yup.string(),
      password_confirm: !id ? Yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([Yup.ref("password"), null], "Mật khẩu không khớp") : Yup.string(),
    }),
    onSubmit: (values) => {
      mutate({
        ...values,
        roles: values.roles.map((i: Role) => i.id)
      })
    }
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.account, id],
    queryFn: () => _account.findById(id || 0),
    enabled: !!(id && resolve),
    onSuccess: (data) => {
      setFieldValue('fullname', data.context.fullname)
      setFieldValue('status', data.context.status)
      setFieldValue('email', data.context.email)
      setFieldValue('telephone', data.context.telephone)
      setFieldValue('avatar', data.context.avatar)
      setFieldValue('roles', data.context.roles?.map(i => i.role))
    }
  })
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      resetOriginalResult: true,
      callBack: (data) => setFieldValue('avatar', data[0].original_url)
    })
  }

  return (
    <RoleLayout permissionPath={id ? RAccount.PUT : RAccount.POST} isNavigate>
      <Fragment>
        <PageTitle title={id ? "Thay đổi thông tin" : "Tạo mới tài khoản"} />
        <Snack
          message={notification.message}
          open={notification.openAlert}
          onClose={onClose}
          severity={notification.color}
        />
        <div className="card p-4">
          <form autoComplete="off" onSubmit={handleSubmit} className="py-4 px-8 form">
            <div className="my-3 d-flex justify-content-center">
              <div className="avatar-image">
                <img src={values.avatar} alt="" />
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
              <label className="form-label required">Họ và tên</label>
              <input name='fullname' value={values.fullname} onChange={handleChange} type="text"
                className="form-control form-control-solid" placeholder="Họ và tên"
              />
              {
                touched.fullname && errors.fullname &&
                <span className="text-danger fs-8">{errors.fullname}</span>
              }
            </div>
            <div className="d-flex justify-content-between row-2">
              <div className="column-2 my-3">
                <label className="form-label required">Email</label>
                <input type="text" name="email" value={values.email} onChange={handleChange}
                  className="form-control form-control-solid" placeholder="Email"
                />
                {
                  touched.email && errors.email &&
                  <span className="text-danger fs-8">{errors.email}</span>
                }
              </div>
              <div className="column-2 my-3">
                <label className="form-label required">Số điện thoại</label>
                <input
                  type="text" name="telephone" value={values.telephone} onChange={handleChange}
                  className="form-control form-control-solid" placeholder="Số điện thoại"
                />
                {
                  touched.telephone && errors.telephone &&
                  <span className="text-danger fs-8">{errors.telephone}</span>
                }
              </div>
            </div>
            <div className="d-flex justify-content-between row-2">
              <div className="column-2 my-3">
                <label className="form-label required">Mật khẩu</label>
                <input
                  disabled={!!id} type="password" className="form-control form-control-solid" placeholder="Mật khẩu"
                  name="password" value={values.password} onChange={handleChange}
                />
                {
                  touched.password && errors.password &&
                  <span className="text-danger fs-8">{errors.password}</span>
                }
              </div>
              <div className="column-2 my-3">
                <label className="form-label required">Nhập lại mật khẩu</label>
                <input
                  disabled={!!id} type="password" className="form-control form-control-solid" placeholder="Nhập lại mật khẩu"
                  name="password_confirm" value={values.password_confirm} onChange={handleChange}
                />
                {
                  touched.password_confirm && errors.password_confirm &&
                  <span className="text-danger fs-8">{errors.password_confirm}</span>
                }
              </div>
            </div>
            <div className="column my-3">
              <SelectRole
                value={values.roles}
                onChange={(e) => setFieldValue('roles', e)}
              />
            </div>
            <div className="d-flex justify-content-end mt-6">
              <LoadingButton loading={isLoading} type="submit" color="success" variant="contained">
                Lưu
              </LoadingButton>
              {
                id &&
                <LoadingButton loading={isFetching} onClick={() => refetch()} className="mx-2" type="button" variant="outlined">
                  Khôi phục
                </LoadingButton>
              }
            </div>
          </form>
        </div>
      </Fragment>
    </RoleLayout>
  );
}

export default AccountForm;