import { _account } from "app/apis";
import { PageTitle, RoleLayout, UploadBtn } from "app/components";
import { RAccount } from "app/constants";
import { usePermission } from "app/hooks";
import { QR_KEY } from "configs";
import { useFormik } from "formik";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import './style.scss'

function AccountForm() {
    const { id } = useParams()
    const { resolve } = usePermission(RAccount.GET_ID)
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            telephone: '',
            avatar: '',
            status: false,
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })
    const { data } = useQuery({
        queryKey: [QR_KEY.account, id],
        queryFn: () => _account.findById(id || 0),
        enabled: !!(id && resolve)
    })
    console.log(data)

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
                                    <UploadBtn
                                        id="file_avatar"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column my-3">
                            <label className="form-label required">Họ và tên</label>
                            <input type="text" className="form-control form-control-solid" placeholder="Họ và tên" />
                        </div>
                        <div className="d-flex justify-content-between row-2">
                            <div className="column-2 my-3">
                                <label className="form-label required">Email</label>
                                <input type="text" className="form-control form-control-solid" placeholder="Email" />
                            </div>
                            <div className="column-2 my-3">
                                <label className="form-label required">Số điện thoại</label>
                                <input type="text" className="form-control form-control-solid" placeholder="Số điện thoại" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between row-2">
                            <div className="column-2 my-3">
                                <label className="form-label required">Mật khẩu</label>
                                <input type="text" className="form-control form-control-solid" placeholder="Mật khẩu" />
                            </div>
                            <div className="column-2 my-3">
                                <label className="form-label required">Nhập lại mật khẩu</label>
                                <input type="text" className="form-control form-control-solid" placeholder="Nhập lại mật khẩu" />
                            </div>
                        </div>
                        <div className="column my-3">
                            <label className="form-label required">Địa chỉ</label>
                            <input type="text" className="form-control form-control-solid" placeholder="Địa chỉ" />
                        </div>
                    </form>
                </div>
            </Fragment>
        </RoleLayout>
    );
}

export default AccountForm;