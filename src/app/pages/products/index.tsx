import { Button } from "@mui/material";
import { _product } from "app/apis";
import { PageTitle, RoleLayout, SwitchButton } from "app/components";
import { PProduct, RBranch, RProduct } from "app/constants";
import { usePermission } from "app/hooks";
import { Product } from "app/models";
import { fmPrice } from "app/utils";
import { QR_KEY } from "configs";
import { FC } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: [QR_KEY.product],
    queryFn: () => _product.findAll({
      "page": 1,
      "limit": 15,
    })
  })
  return (
    <RoleLayout permissionPath={RProduct.GET} isNavigate>
      <>
        <PageTitle title="Danh sách sản phẩm">
          <RoleLayout permissionPath={RProduct.POST}>
            <Button
              onClick={() => navigate(PProduct.create)}
              size="medium" color="primary"
              variant="contained" >
              Tạo mới
            </Button>
          </RoleLayout>
        </PageTitle>
        <div className="card">
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='text-muted mt-1 fw-semobold fs-7'>
                {data?.context?.total} sản phẩm
              </span>
            </h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-300px rounded-start'>Tên</th>
                    <th className='min-w-100px'>Trạng thái</th>
                    <th className='min-w-120px'>Tag</th>
                    <th className='min-w-100px'>Giá nhập</th>
                    <th className='min-w-100px'>Giá bán</th>
                    <th className='min-w-100px'>Giá ưu đãi</th>
                    <th className='min-w-150px'>Chi nhánh</th>
                    <th className='min-w-200px text-end rounded-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.context?.data?.map(item => (
                      <Item key={item.id} product={item} />
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
const Item: FC<{ product: Product }> = ({ product }) => {
  const { resolve: resolveUpdate } = usePermission(RBranch.PUT)
  const navigate = useNavigate()
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light'>
              <img
                src={product.thumbnail_url || ''}
                className='h-75 align-self-end'
                alt=''
              />
            </span>
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <span className="text-dark fw-bold mb-1 fs-6">{product.name}</span>
            <span className='text-muted fw-semobold text-muted d-block fs-7'>
              {product.category?.name}
            </span>
          </div>
        </div>
      </td>
      <td>
        <SwitchButton disable={!resolveUpdate} value={product.status} />
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-6'>{product.tag?.name}</span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-7">
          {fmPrice(product.price_original)}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-7">
          {fmPrice(product.price)}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-7">
          {fmPrice(product.price_special)}
        </span>
      </td>
      <td>
        {
          product.branches?.map(i => (
            <p key={i.branch_id} className="text-muted fw-semobold text-muted d-block fs-7 m-0">
              {i.branch?.name}
            </p>
          ))
        }
      </td>
      <td className='text-end'>
        <RoleLayout permissionPath={RBranch.PUT}>
          <button onClick={() => navigate(PProduct.update_id(product.id))} className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
            <i className="bi bi-pen fs-6"></i>
          </button>
        </RoleLayout>
        <RoleLayout permissionPath={RBranch.DELETE}>
          <button className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
            <i className="bi bi-trash-fill fs-6"></i>
          </button>
        </RoleLayout>
      </td>
    </tr>
  )
}

export default ProductPage;