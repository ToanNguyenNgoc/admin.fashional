import { PageTitle, RoleLayout, SelectCategory, SelectTag, Snack, SwitchButton, UploadBtn } from "app/components";
import { PProduct, RProduct } from "app/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ProductBody } from "app/models";
import { useMutation, useQuery } from "react-query";
import { QR_KEY } from "configs";
import { _product } from "app/apis";
import { ChangeEvent,  } from "react";
import { useMedia, useMessage } from "app/hooks";
import { LoadingButton } from "@mui/lab";
import "./style.scss"
import { AxiosError } from "axios";
import { pickBy, identity } from "lodash"
import { ProductBranches, ProductMedia, ProductSizes } from "./module";

function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { result, notification: { message, color, openAlert }, onClose } = useMessage()
  const { handlePostMedia, isLoading: isLoadingMedia } = useMedia()
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ProductBody) => id ? _product.update(id, body) : _product.create(body),
    onSuccess: (data) => {
      result({
        message: id ? "Cập nhật thành công" : "Tạo mới thành công",
        color: "success"
      })
      if (!id)
        setTimeout(() => { navigate(PProduct.update_id(data.context.id)) })
    },
    onError: (err) => {
      const error = err as AxiosError
      result({
        message: error.response?.data.message || 'Có lỗi xảy ra',
        color: 'error'
      })
    }
  })
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = useFormik<ProductBody>({
    initialValues: {
      name: '',
      status: true,
      thumbnail_url: '',
      price_original: undefined,
      price: undefined,
      price_special: undefined,
      short_content: '',
      tag_id: undefined,
      category_id: undefined
    },
    onSubmit: (values) => {
      const body = pickBy(values, identity)
      mutate({ ...body, status: values.status })
    }
  })
  const { isFetching, refetch } = useQuery({
    queryKey: [QR_KEY.product, id],
    queryFn: () => _product.findById(id || 0),
    enabled: !!id,
    onSuccess: (data) => {
      const { name, thumbnail_url, status, price_original, price, price_special, short_content, tag_id, category_id } = data.context
      setFieldValue('name', name)
      setFieldValue('status', status)
      setFieldValue('thumbnail_url', thumbnail_url)
      setFieldValue('price_original', price_original)
      setFieldValue('price', price)
      setFieldValue('price_special', price_special)
      setFieldValue('short_content', short_content)
      setFieldValue('tag_id', tag_id)
      setFieldValue('category_id', category_id)
    }
  })
  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      resetOriginalResult: true,
      callBack: (data) => setFieldValue('thumbnail_url', data[0].original_url)
    })
  }
  const onChangePriceOriginal = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0) setFieldValue('price_original', Number(e.target.value))
  }
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0) setFieldValue('price', Number(e.target.value))
  }
  const onChangePriceSpecial = (e: ChangeEvent<HTMLInputElement>) => {
    if (0 <= Number(e.target.value) && Number(e.target.value) <= Number(values.price))
      setFieldValue('price_special', Number(e.target.value))
  }
  return (
    <RoleLayout permissionPath={id ? RProduct.PUT : RProduct.POST}>
      <>
        <PageTitle title={id ? "Thay đổi thông tin sản phẩm" : ""} />
        <Snack open={openAlert} message={message} severity={color} onClose={onClose} />
        <div className="card p-4">
          <form onSubmit={handleSubmit} className="form">
            <div className="my-3 d-flex justify-content-center">
              <div className="avatar-image">
                <img src={values.thumbnail_url || ''} alt="" />
                <div className="btn-avatar-cnt">
                  <UploadBtn loading={isLoadingMedia} onChange={onChangeThumbnail} id="file_avatar" />
                </div>
              </div>
            </div>
            <div className="column my-3">
              <SwitchButton value={values.status} onChange={(e) => setFieldValue('status', e.target.checked)} label="Trạng thái" />
            </div>
            <div className="column my-3">
              <label className="form-label required">Tên sản phẩm</label>
              <input
                type="text" className="form-control form-control-solid"
                name="name" value={values.name} onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between row-3">
              <div className="column my-3">
                <label className="form-label required">Giá nhập</label>
                <input
                  type="number" className="form-control form-control-solid"
                  name="price_original" value={values.price_original || ''}
                  onChange={onChangePriceOriginal}
                />
              </div>
              <div className="column my-3">
                <label className="form-label required">Giá bán</label>
                <input
                  type="text" className="form-control form-control-solid"
                  name="price" value={values.price || ''} onChange={onChangePrice}
                />
              </div>
              <div className="column my-3">
                <label className="form-label required">Giá ưu đãi</label>
                <input
                  type="text" className="form-control form-control-solid"
                  name="price_special" value={values.price_special || ''} onChange={onChangePriceSpecial}
                />
              </div>
            </div>
            <div className="column my-3">
              <label className="form-label required">Mô tả</label>
              <input
                type="text" className="form-control form-control-solid"
                name="short_content" value={values.short_content} onChange={handleChange}
              />
            </div>
            <div className="d-flex row-2">
              <div className="column  my-3">
                <label className="form-label required">Tag</label>
                <div className="column">
                  <SelectTag value={values.tag_id} onChange={(e) => {
                    setFieldValue('tag_id', e.target.value);
                    setFieldValue('category_id', '')
                  }} />
                </div>
                {
                  touched.tag_id && errors.tag_id &&
                  <span className="text-danger fs-8">{errors.tag_id}</span>
                }
              </div>
              <div className="column  my-3">
                <label className="form-label required">Danh mục dịch vụ</label>
                <div className="column">
                  <SelectCategory
                    tag_id={values.tag_id} disabled={!values.tag_id || values.tag_id === ''}
                    value={values.category_id}
                    onChange={(e) => setFieldValue('category_id', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-6">
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
          </form>
        </div>
        <ProductMedia />
        <ProductBranches />
        <ProductSizes />
      </>
    </RoleLayout>
  );
}


export default ProductForm;