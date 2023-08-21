import { LoadingButton } from "@mui/lab"
import { _product } from "app/apis"
import { FaSpinner, RoleLayout, SwitchButton } from "app/components"
import { RProduct } from "app/constants"
import { usePermission } from "app/hooks"
import { ProductSize } from "app/models"
import { QR_KEY } from "configs"
import { useFormik } from "formik"
import moment from "moment"
import { FC, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import * as Yup from "yup"

export const ProductSizes: FC = () => {
  const { id } = useParams()
  const client = useQueryClient()
  const { data } = useQuery({
    queryKey: [QR_KEY.product_size, id],
    queryFn: () => _product.findSizes(id || 0),
    enabled: !!id
  })
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: { name: string }) => _product.createSize(id || 0, body),
    onSuccess: () => client.invalidateQueries([QR_KEY.product_size, id])
  })
  let { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: ({ name: '' }),
    validationSchema: Yup.object({
      name: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await mutateAsync(values)
      resetForm()
    }
  })
  return (
    <div className="card p-4 my-4">
      <span className="text-dark fw-bold fs-6">Size/loại</span>
      <div className='card-body p-2'>
        <div className='table-responsive'>
          <RoleLayout permissionPath={RProduct.POST_SIZE}>
            <form className="d-flex align-items-center mb-4" onSubmit={handleSubmit}>
              <input
                type="text" className="form-control form-control-solid py-2 px-3" 
                style={{ width: '200px', marginRight: '8px' }} placeholder="Tên size/loai..."
                value={values.name} name="name" onChange={handleChange}
              />
              <LoadingButton
                loading={isLoading} disabled={!!!id}
                size="medium" color="success"
                variant="contained" type="submit"
              >
                Thêm size/loại
              </LoadingButton>
            </form>
          </RoleLayout>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-300px rounded-start'>Tên size/loại</th>
                <th className='min-w-125px'>Trạng thái</th>
                <th className='min-w-100px'>Cập nhật</th>
                <th className='min-w-100px'>Ngày tạo</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            <tbody>
              {
                data?.context?.data?.map(i => (
                  <SizeItem key={i.id} item={i} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
const SizeItem: FC<{ item: ProductSize }> = ({ item }) => {
  const { id } = useParams()
  const client = useQueryClient()
  const [name, setName] = useState(item.name)
  const { resolve } = usePermission(RProduct.PUT_SIZE)
  const { mutate: mutateUpdate, isLoading } = useMutation({
    mutationFn: (body: { name?: string, status?: boolean }) => _product.updateSize(
      id || 0, item.id, body
    ),
    onSuccess: () => {
      client.invalidateQueries([QR_KEY.product_size, id])
    }
  })
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: () => _product.deleteSize(id || 0, item.id),
    onSuccess: () => client.invalidateQueries([QR_KEY.product_size, id])
  })
  return (
    <tr>
      <td>
        <input
          disabled={!!!resolve}
          type="text" className="form-control form-control-solid"
          value={name} onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <SwitchButton
          disable={!!!resolve} value={item.status}
          onChange={(e) => mutateUpdate({ status: e.target.checked })}
        />
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
        <RoleLayout permissionPath={RProduct.PUT_SIZE}>
          <button type="button"
            onClick={() => mutateUpdate({ name: name })}
            className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
            {isLoading ? <FaSpinner /> : <i className="fa fa-check fs-6"></i>}
          </button>
        </RoleLayout>
        <RoleLayout permissionPath={RProduct.DELETE_BRANCH}>
          <button
            onClick={() => mutateDelete()}
            className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
            {isLoadingDelete ? <FaSpinner /> : <i className="bi bi-trash-fill fs-6"></i>}
          </button>
        </RoleLayout>
      </td>
    </tr>
  )
}