import { _order } from "app/apis";
import { PageTitle, RoleLayout } from "app/components";
import { POrder, ROrder } from "app/constants";
import { usePermission } from "app/hooks";
import { fmPrice } from "app/utils";
import { QR_KEY } from "configs";
import moment from "moment";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const { resolve } = usePermission(ROrder.GET)
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: [QR_KEY.order],
    queryFn: () => _order.findAll({
      "page": 1,
      "limit": 15,
      "includes": "order_deliveries"
    }),
    enabled: resolve
  })
  return (
    <RoleLayout permissionPath={ROrder.GET} isNavigate >
      <>
        <PageTitle title="Danh sách đơn hàng" />
        <div className="card">
          <div className='card-body py-3 pt-5'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-200px rounded-start'>Mã đơn hàng/ngày tạo</th>
                    <th className='min-w-125px'>Khách hàng</th>
                    <th className='min-w-200px'>PT thanh toán</th>
                    <th className='min-w-175px'>Trạng thái thanh toán</th>
                    <th className='min-w-150px'>Tổng thanh toán</th>
                    <th className='min-w-175px'>Trạng thái giao nhận</th>
                    <th className='min-w-200px text-end rounded-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.context?.data?.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <span className="text-dark fw-bold mb-1 fs-6">ĐH-{item.id}</span>
                              <span className='text-muted fw-semobold text-muted d-block fs-7'>
                                {moment(item.created_at).format('HH:mm DD/MM/YYYY')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark fw-bold d-block mb-1 fs-6">
                            {item.account?.fullname}
                          </span>
                          <span className='text-muted fw-semobold text-muted d-block fs-7'>
                            {item.account?.email}
                          </span>
                          <span className='text-muted fw-semobold text-muted d-block fs-7'>
                            {item.account?.telephone}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark fw-bold d-block mb-1 fs-6">
                            {item.payment_method?.method_key}
                          </span>
                          <span className='text-muted fw-semobold text-muted d-block fs-7'>
                            {item.payment_method?.name}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark fw-bold d-block mb-1 fs-7">
                            {item.payment_gateway?.status}
                          </span>
                        </td>
                        <td>
                          <span className="text-dark fw-bold d-block mb-1 fs-7">
                            {fmPrice(item.payment_gateway?.amount)}
                          </span>
                        </td>
                        <td>
                          <span className='text-muted fw-semobold text-muted d-block fs-7'>
                            {item.order_deliveries[0]?.status_name}
                          </span>
                          <span className='text-muted fw-semobold text-muted d-block fs-8'>
                            {item.order_deliveries[0]?.note}
                          </span>
                        </td>
                        <td className='text-end'>
                          <RoleLayout permissionPath={ROrder.PUT}>
                            <button onClick={() => navigate(POrder.update_id(item.id))} type="button" className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
                              <i className="bi bi-pen fs-6"></i>
                            </button>
                          </RoleLayout>
                          <RoleLayout permissionPath={ROrder.DELETE}>
                            <button className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
                              <i className="bi bi-trash-fill fs-6"></i>
                            </button>
                          </RoleLayout>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </RoleLayout>
  );
}

export default OrderPage;