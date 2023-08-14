import { LoadingButton } from "@mui/lab";
import { _role } from "app/apis";
import { PageTitle, RoleLayout, SelectPermission, Snack, SwitchButton } from "app/components";
import { RRole } from "app/constants";
import { useMessage, usePermission } from "app/hooks";
import { RoleBody } from "app/models";
import { QR_KEY } from "configs";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

function RoleForm() {
  const { id } = useParams()
  const { result, notification: { message, color, openAlert }, onClose } = useMessage()
  const { resolve } = usePermission(RRole.GET_ID)
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: RoleBody) => id ? _role.update(id, body) : _role.create(body),
    onSuccess: () => result({
      message: id ? 'Cập nhật thành công' : 'Tạo mới thành công',
      color: 'success'
    }),
    onError: () => result({
      message: 'Có lỗi xảy ra!',
      color: 'error'
    })
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      permissions: [],
      status: true
    },
    onSubmit: (values) => mutate(values)
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.permission, id],
    queryFn: () => _role.findById(id || 0),
    enabled: !!(id && resolve),
    onSuccess: (data) => {
      formik.setFieldValue('name', data.context?.name)
      formik.setFieldValue('status', data.context?.status)
      formik.setFieldValue('permissions', data.context?.permissions?.map(i => i.permission.id))
    }
  })
  return (
    <RoleLayout permissionPath={id ? RRole.POST : RRole.POST} isNavigate>
      <>
        <Snack
          open={openAlert}
          onClose={onClose}
          severity={color}
          message={message}
        />
        <PageTitle title="Cấp quyền" />
        <div className="card py-4">
          <form onSubmit={formik.handleSubmit} className="py-4 px-8 form">
            <div className="d-flex justify-content-end">
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
            <div className="column my-3">
              <SwitchButton
                value={formik.values.status}
                onChange={(e) => formik.setFieldValue('status', e.target.checked)}
                label="Trạng thái"
              />
            </div>
            <div className="column my-3">
              <label className="form-label required">Tên quyền</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text" className="form-control form-control-solid"
                placeholder="Tên quyền"
              />
            </div>
            <SelectPermission
              permission_ids={formik.values.permissions}
              onChange={(e) => formik.setFieldValue('permissions', e)}
            />
          </form>
        </div>
      </>
    </RoleLayout>
  );
}

export default RoleForm;