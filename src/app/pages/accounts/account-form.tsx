import { _account } from "app/apis";
import { PageTitle, RoleLayout, SelectRole, UploadBtn } from "app/components";
import { RAccount } from "app/constants";
import { useMedia, usePermission } from "app/hooks";
import { QR_KEY } from "configs";
import { useFormik } from "formik";
import { ChangeEvent, Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import './style.scss'

function AccountForm() {
    const { id } = useParams()
    const { handlePostMedia, isLoading: isLoadingMedia } = useMedia()
    const { resolve } = usePermission(RAccount.GET_ID)
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            telephone: '',
            avatar: '',
            status: false,
            roles: []
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })
    useQuery({
        queryKey: [QR_KEY.account, id],
        queryFn: () => _account.findById(id || 0),
        enabled: !!(id && resolve),
        onSuccess: (data) => {
            formik.setFieldValue('fullname', data.context.fullname)
            formik.setFieldValue('email', data.context.email)
            formik.setFieldValue('telephone', data.context.telephone)
            formik.setFieldValue('avatar', data.context.avatar)
            formik.setFieldValue('roles', data.context.roles?.map(i => i.role))
        }
    })
    const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
        handlePostMedia({
            e,
            resetOriginalResult: true,
            callBack: (data) => formik.setFieldValue('avatar', data[0].original_url)
        })
    }

    return (
        <RoleLayout permissionPath={id ? RAccount.PUT : RAccount.POST} isNavigate>
            <Fragment>
                <PageTitle title={id ? "Thay đổi thông tin" : "Tạo mới tài khoản"} />
                <div className="card p-4">
                    <form className="py-4 px-8 form">
                        <div className="my-3 d-flex justify-content-center">
                            <div className="avatar-image">
                                <img src={formik.values.avatar} alt="" />
                                <div className="btn-avatar-cnt">
                                    <UploadBtn loading={isLoadingMedia} id="file_avatar" onChange={onChangeMedia} />
                                </div>
                            </div>
                        </div>
                        <div className="column my-3">
                            <label className="form-label required">Họ và tên</label>
                            <input name='fullname' value={formik.values.fullname} onChange={formik.handleChange} type="text"
                                className="form-control form-control-solid" placeholder="Họ và tên"
                            />
                        </div>
                        <div className="d-flex justify-content-between row-2">
                            <div className="column-2 my-3">
                                <label className="form-label required">Email</label>
                                <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange}
                                    className="form-control form-control-solid" placeholder="Email"
                                />
                            </div>
                            <div className="column-2 my-3">
                                <label className="form-label required">Số điện thoại</label>
                                <input
                                    type="text" name="telephone" value={formik.values.telephone} onChange={formik.handleChange}
                                    className="form-control form-control-solid" placeholder="Số điện thoại"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between row-2">
                            <div className="column-2 my-3">
                                <label className="form-label required">Mật khẩu</label>
                                <input disabled={!!id} type="password" className="form-control form-control-solid" placeholder="Mật khẩu" />
                            </div>
                            <div className="column-2 my-3">
                                <label className="form-label required">Nhập lại mật khẩu</label>
                                <input disabled={!!id} type="password" className="form-control form-control-solid" placeholder="Nhập lại mật khẩu" />
                            </div>
                        </div>
                        <div className="column my-3">
                            <SelectRole
                                value={formik.values.roles}
                                onChange={(e) => formik.setFieldValue('roles', e)}
                            />
                        </div>
                    </form>
                </div>
            </Fragment>
        </RoleLayout>
    );
}

export default AccountForm;