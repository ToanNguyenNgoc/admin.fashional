import { LoadingButton } from "@mui/lab"
import { _product } from "app/apis"
import { FaSpinner, RoleLayout, SelectBranch, SwitchButton } from "app/components"
import { RProduct } from "app/constants"
import { usePermission } from "app/hooks"
import { ProductBranch } from "app/models"
import { QR_KEY } from "configs"
import { useFormik } from "formik"
import moment from "moment"
import { FC, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import * as Yup from "yup"

export const ProductBranches: FC = () => {
  const { id } = useParams()
  const client = useQueryClient()
  const { data } = useQuery({
    queryKey: [QR_KEY.product_branch, id],
    queryFn: () => _product.findBranches(id || 0),
    enabled: !!id
  })
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: { branch_id: number, quantity: number }) => _product.createBranch(id || 0, body),
    onSuccess: () => client.invalidateQueries([QR_KEY.product_branch, id])
  })
  let { values, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: ({ branch_id: '', quantity: 1 }),
    validationSchema: Yup.object({
      branch_id: Yup.string().required(),
      quantity: Yup.number().required()
    }),
    onSubmit: async (values) => {
      await mutateAsync({ ...values, branch_id: Number(values.branch_id) })
      resetForm()
    }
  })
  return (
    <div className="card p-4 my-4">
      <span className="text-dark fw-bold fs-6">Chi nhánh</span>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <RoleLayout permissionPath={RProduct.POST_BRANCH}>
            <form className="d-flex align-items-center mb-4" onSubmit={handleSubmit}>
              <SelectBranch value={values.branch_id || ''} onChange={(e) => setFieldValue('branch_id', e.target.value)} />
              <input
                type="number" className="form-control form-control-solid py-2 px-3" style={{ width: '120px', margin: '0px 8px' }}
                value={values.quantity} name="quantity" onChange={handleChange}
              />
              <LoadingButton
                loading={isLoading} disabled={!!!id}
                size="medium" color="success"
                variant="contained" type="submit"
              >
                Thêm chi nhánh
              </LoadingButton>
            </form>
          </RoleLayout>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-300px rounded-start'>Chi nhánh</th>
                <th className='min-w-125px'>Số lượng</th>
                <th className='min-w-125px'>Trạng thái</th>
                <th className='min-w-200px'>Ngày tạo</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            <tbody>
              {
                data?.context.data?.map((i, index) => (
                  <Tr key={index} item={i} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
const Tr: FC<{ item: ProductBranch }> = ({ item }) => {
  const { id } = useParams()
  const client = useQueryClient()
  const [quantity, setQuantity] = useState(item.quantity)
  const { resolve } = usePermission(RProduct.PUT_BRANCH)
  const { mutate: mutateUpdate, isLoading } = useMutation({
    mutationFn: (body: { quantity?: number, status?: boolean }) => _product.updateBranch(
      id || 0, item.branch.id, body
    ),
    onSuccess: () => {
      client.invalidateQueries([QR_KEY.product_branch, id])
    }
  })
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: () => _product.deleteBranch(id || 0, item.branch.id),
    onSuccess: () => client.invalidateQueries([QR_KEY.product_branch, id])
  })

  return (
    <tr>
      <td>
        <span className="text-dark fw-bold mb-1 fs-6">
          {item.branch?.name}
        </span>
      </td>
      <td>
        <input
          type="number" className="form-control form-control-solid"
          value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </td>
      <td>
        <SwitchButton disable={!resolve} value={item.status} onChange={(e) => mutateUpdate({ status: e.target.checked })} />
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-7'>
          {moment(item.created_at).format('DD/MM/YYYY')}
        </span>
      </td>
      <td className='text-end'>
        <RoleLayout permissionPath={RProduct.PUT_BRANCH}>
          <button type="button" onClick={() => mutateUpdate({
            quantity: quantity
          })}
            className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
            {isLoading ? <FaSpinner /> : <i className="fa fa-check fs-6"></i>}
          </button>
        </RoleLayout>
        <RoleLayout permissionPath={RProduct.DELETE_BRANCH}>
          <button onClick={() => mutateDelete()} className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
            {isLoadingDelete ? <FaSpinner /> : <i className="bi bi-trash-fill fs-6"></i>}
          </button>
        </RoleLayout>
      </td>
    </tr>
  )
}