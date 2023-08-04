import { _account } from "app/apis";
import { PageTitle, RoleLayout } from "app/components";
import { RAccount } from "app/constants";
import { usePermission } from "app/hooks";
import { QR_KEY } from "configs";
import { useFormik } from "formik";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

function AccountForm() {
    const { id } = useParams()
    const { resolve } = usePermission(RAccount.GET_ID)
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            telephone: '',
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
                    AccountForm
                </div>
            </Fragment>
        </RoleLayout>
    );
}

export default AccountForm;