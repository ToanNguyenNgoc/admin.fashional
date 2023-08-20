import { Button } from "@mui/material";
import { _category } from "app/apis";
import { FaSpinner, PageTitle, RoleLayout, SwitchButton } from "app/components";
import { PCategory, RCategory } from "app/constants";
import { usePermission } from "app/hooks";
import { Category, CategoryBody, QrCategory } from "app/models";
import { QR_KEY } from "configs";
import moment from "moment";
import queryString from "query-string";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

function CategoryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const query = queryString.parse(location.search) as QrCategory
  const { data } = useQuery({
    queryKey: [QR_KEY.category, query],
    queryFn: () => _category.findAll({
      "page": query?.page || 1,
      "limit": 15
    })
  })
  return (
    <RoleLayout permissionPath={RCategory.GET} isNavigate >
      <>
        <PageTitle title="Danh mục sản phẩm">
          <RoleLayout permissionPath={RCategory.POST}>
            <Button
              onClick={() => navigate(PCategory.create)}
              size="medium" color="primary"
              variant="contained" >
              Tạo mới danh mục
            </Button>
          </RoleLayout>
        </PageTitle>
        <div className={`card`}>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='text-muted mt-1 fw-semobold fs-7'>{data?.context?.total} danh mục</span>
            </h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='min-w-300px rounded-start'>Tên danh mục</th>
                    <th className='min-w-125px'>Slugify</th>
                    <th className='min-w-125px'>Tag</th>
                    <th className='min-w-100px'>Trạng thái</th>
                    <th className='min-w-100px'>Cập nhật</th>
                    <th className='min-w-100px'>Ngày tạo</th>
                    <th className='min-w-200px text-end rounded-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.context.data?.map(item => (
                      <CategoryItem key={item.id} item={item} query={query} />
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
const CategoryItem: FC<{ item: Category, query?: QrCategory }> = ({ item, query }) => {
  const { resolve } = usePermission(RCategory.PUT)
  const navigate = useNavigate()
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (body: CategoryBody) => _category.update(item.id, body),
    onSuccess: () => client.invalidateQueries([QR_KEY.category, query])
  })
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: () => _category.delete(item.id),
    onSuccess: () => {
      client.invalidateQueries([QR_KEY.category, query])
    }
  })
  return (
    <tr key={item.id}>
      <td>
        <span className="text-dark fw-bold mb-1 fs-6">
          {item.name}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">{item.name_slugify}</span>
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-6'>
          {item.tag?.name}
        </span>
      </td>
      <td>
        <SwitchButton disable={!resolve} value={item.status} onChange={(e) => mutate({
          status: e.target.checked,
          tag_id: item.tag_id
        })} />
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
        <RoleLayout permissionPath={RCategory.PUT}>
          <button onClick={() => navigate(PCategory.update_id(item.id))} type="submit" className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
            <i className="bi bi-pen fs-6"></i>
          </button>
        </RoleLayout>
        <RoleLayout permissionPath={RCategory.DELETE}>
          <button onClick={() => mutateDelete()} className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
            {isLoadingDelete ? <FaSpinner /> : <i className="bi bi-trash-fill fs-6"></i>}
          </button>
        </RoleLayout>
      </td>
    </tr>
  )
}

export default CategoryPage;