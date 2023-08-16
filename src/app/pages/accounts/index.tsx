import { Avatar, Button } from "@mui/material";
import { _account } from "app/apis";
import { FaSpinner, PageTitle, RoleLayout, Snack, SwitchButton } from "app/components";
import { PAccount, RAccount } from "app/constants";
import { ResultOptions, useMessage, usePermission } from "app/hooks";
import { Account, QrAccount } from "app/models";
import { AxiosError } from "axios";
import { QR_KEY } from "configs";
import moment from "moment";
import { FC, Fragment } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function AccountPage() {
  const { resolve } = usePermission(RAccount.GET)
  const { notification, onClose, result } = useMessage()
  const navigate = useNavigate()
  const qrParams: QrAccount = {
    'page': 1,
    'limit': 15,
    'manager': true,
    'includes': 'roles'
  }
  const { data } = useQuery({
    queryKey: [QR_KEY.account, qrParams],
    queryFn: () => _account.findAll(qrParams),
    enabled: resolve,
  })
  return (
    <RoleLayout permissionPath={RAccount.GET} isNavigate>
      <Fragment>
        <PageTitle title="Danh sách tài khoản">
          <RoleLayout permissionPath={RAccount.POST}>
            <Button onClick={() => navigate(PAccount.create)} size="medium" color="primary"
              variant="contained" >
              Tạo mới tài khoản
            </Button>
          </RoleLayout>
        </PageTitle>
        <div className={`card`}>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Tài khoản</span>
              <span className='text-muted mt-1 fw-semobold fs-7'>
                {data?.context?.total} tài khoản
              </span>
            </h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-200px'>Họ và tên</th>
                    <th className='min-w-125px'>Email</th>
                    <th className='min-w-125px'>Quyền</th>
                    <RoleLayout permissionPath={RAccount.PUT} >
                      <th className='min-w-50px'>Trạng thái</th>
                    </RoleLayout>
                    <th className='min-w-100px'>Ngày tạo</th>
                    <th className='min-w-200px text-end rounded-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.context.data.map((i) => (
                      <AccountItem i={i} key={i.id} result={result} qrParams={qrParams} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Snack message={notification.message} open={notification.openAlert} onClose={onClose} severity={notification.color} />
      </Fragment>
    </RoleLayout>
  );
}
interface AccountItemProps {
  i: Account,
  qrParams?: QrAccount,
  result?: (opt: ResultOptions) => void
}
const AccountItem: FC<AccountItemProps> = ({ i, qrParams = {}, result = () => { } }) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: () => _account.delete(i.id),
    onSuccess: () => {
      result({
        message: 'Xóa tài khoản thành công',
        color: 'success'
      })
      setTimeout(() => { queryClient.invalidateQueries([QR_KEY.account, qrParams]) }, 100)
    },
    onError: (error) => {
      const err = error as AxiosError
      result({
        message: err.response?.data.message || 'Có lỗi xảy ra',
        color: 'error'
      })
    }
  })
  return (
    <>
      <tr>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-50px me-5'>
              <Avatar src={i.avatar || i.fullname} alt="" />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <span className='text-dark fw-bold mb-1 fs-6'>
                {i.fullname}
              </span>
              <span className='text-muted fw-semobold text-muted d-block fs-7'>
                {i.telephone}
              </span>
            </div>
          </div>
        </td>
        <td>
          <span className='text-muted fw-semobold text-muted d-block fs-6'>
            {i.email}
          </span>
        </td>
        <td>
          {
            i.roles?.map((role) => (
              <span key={role.role?.id} className="badge badge-primary m-1">
                {role?.role?.name}
              </span>
            ))
          }
        </td>
        <RoleLayout permissionPath={RAccount.PUT}>
          <td className="d-flex justify-content-center">
            <SwitchButton value={i.status} />
          </td>
        </RoleLayout>
        <td>
          <span className='text-muted fw-semobold text-muted d-block fs-7'>
            {moment(i.created_at).format('HH:mm DD/MM/YYYY')}
          </span>
        </td>
        <td className='text-end'>
          <RoleLayout permissionPath={RAccount.PUT}>
            <Link to={PAccount.update_id(i.id)} className="btn btn-icon btn-success me-1 rounded-circle btn-sm ">
              <i className="bi bi-pen fs-6"></i>
            </Link>
          </RoleLayout>
          <RoleLayout permissionPath={RAccount.DELETE}>
            <button onClick={() => mutate()} className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
              {
                isLoading ? <FaSpinner /> :
                  <i className="bi bi-trash-fill fs-6"></i>
              }
            </button>
          </RoleLayout>
        </td>
      </tr>
    </>
  )
}

export default AccountPage;