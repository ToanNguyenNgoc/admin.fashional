import { Button } from "@mui/material";
import { _role } from "app/apis";
import { PageTitle, RoleLayout, SwitchButton } from "app/components";
import { PRole, RRole } from "app/constants";
import { usePermission } from "app/hooks";
import { QR_KEY } from "configs";
import moment from "moment";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function RolePage() {
	const { resolve } = usePermission(RRole.GET)
	const navigate = useNavigate()
	const { data, isLoading } = useQuery({
		queryKey: [QR_KEY.role],
		queryFn: () => _role.findAll(),
		enabled: resolve
	})
	console.log(data?.context.data)
	return (
		<RoleLayout permissionPath={RRole.GET} isNavigate>
			<>
				<PageTitle title="Danh sách quyền">
					<RoleLayout permissionPath={RRole.POST}>
						<Button onClick={() => navigate(PRole.create)} size="medium" color="primary"
							variant="contained" >
							Tạo mới quyền
						</Button>
					</RoleLayout>
				</PageTitle>
				<div className={`card`}>
					<div className='card-header border-0 pt-5'>
						<h3 className='card-title align-items-start flex-column'>
							<span className='card-label fw-bold fs-3 mb-1'>Quyền</span>
							<span className='text-muted mt-1 fw-semobold fs-7'>
								{data?.context?.total} quyền
							</span>
						</h3>
					</div>
					<div className='card-body py-3'>
						<div className='table-responsive'>
							<table className='table align-middle gs-0 gy-4'>
								<thead>
									<tr className='fw-bold text-muted bg-light'>
										<th className='ps-4 min-w-200px'>Tên quyền</th>
										<th className='min-w-125px'>Trạng thái</th>
										<th className='min-w-100px'>Ngày tạo</th>
										<th className='min-w-125px'>Cập nhật</th>
										<th className='min-w-200px text-end rounded-end'></th>
									</tr>
								</thead>
								<tbody>
									{
										data?.context.data.map((i) => (
											<tr key={i.id}>
												<td>
													<span className='text-muted fw-semobold text-muted d-block fs-7'>
														{i.name}
													</span>
												</td>
												<RoleLayout permissionPath={RRole.PUT}>
													<td className="d-flex justify-content-center">
														<SwitchButton value={i.status} />
													</td>
												</RoleLayout>
												<td>
													<span className='text-muted fw-semobold text-muted d-block fs-7'>
														{moment(i.created_at).format('HH:mm DD/MM/YYYY')}
													</span>
												</td>
												<td>
													<span className='text-muted fw-semobold text-muted d-block fs-7'>
														{moment(i.updated_at).format('HH:mm DD/MM/YYYY')}
													</span>
												</td>
												<td className='text-end'>
													<RoleLayout permissionPath={RRole.PUT}>
														<Link to={PRole.update_id(i.id)} className="btn btn-icon btn-success me-1 rounded-circle btn-sm ">
															<i className="bi bi-pen fs-6"></i>
														</Link>
													</RoleLayout>
													<RoleLayout permissionPath={RRole.DELETE}>
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

export default RolePage;