import { Button } from "@mui/material";
import { _branch } from "app/apis";
import { PageTitle, RoleLayout, SwitchButton } from "app/components";
import { PBranch, RBranch } from "app/constants";
import { QR_KEY } from "configs";
import moment from "moment";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function BranchPage() {
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: [QR_KEY.branch],
    queryFn: () => _branch.findAll({
      page: 1,
      limit: 15,
      includes: 'media',
      created_at: 'desc'
    })
  })
  return (
    <>
      <PageTitle title="Chi nhánh">
        <RoleLayout permissionPath={RBranch.POST}>
          <Button onClick={()=> navigate(PBranch.create)} size="medium" color="primary"
            variant="contained" >
            Tạo mới chi nhánh
          </Button>
        </RoleLayout>
      </PageTitle>
      <div className="card">
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='text-muted mt-1 fw-semobold fs-7'>{data?.context.total || 1} chi nhánh</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted bg-light'>
                  <th className='ps-4 min-w-300px rounded-start'>Tên và địa chỉ</th>
                  <th className='min-w-100px'>Trạng thái</th>
                  <th className='min-w-125px'>Email</th>
                  <th className='min-w-200px'>Hotline</th>
                  <th className='min-w-100px'>Cập nhật</th>
                  <th className='min-w-100px'>Ngày tạo</th>
                  <th className='min-w-150px text-end rounded-end'></th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.context.data?.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-50px me-5'>
                            <span className='symbol-label bg-light'>
                              <img
                                src={item.media?.original_url}
                                className='h-75 align-self-end'
                                alt=''
                              />
                            </span>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bold  mb-1 fs-6'>
                              {item.name}
                            </span>
                            <span className='text-muted fw-semobold text-muted d-block fs-7'>
                              {item.short_address}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <SwitchButton value={item.status} />
                      </td>
                      <td>
                        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {item.email}
                        </span>
                      </td>
                      <td>
                        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {item.hotline}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {moment(item.updated_at).format('DD/MM/YYYY')}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {moment(item.created_at).format('DD/MM/YYYY')}
                        </span>
                      </td>
                      <td className='text-end'>
                        <RoleLayout permissionPath={RBranch.PUT}>
                          <Link to={PBranch.update_id(item.id)} className="btn btn-icon btn-success me-1 rounded-circle btn-sm ">
                            <i className="bi bi-pen fs-6"></i>
                          </Link>
                        </RoleLayout>
                        <RoleLayout permissionPath={RBranch.DELETE}>
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
  );
}

export default BranchPage;