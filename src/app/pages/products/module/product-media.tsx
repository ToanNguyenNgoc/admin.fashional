import { LoadingButton } from "@mui/lab"
import { Chip, CircularProgress } from "@mui/material"
import { _product } from "app/apis"
import { UploadBtn } from "app/components"
import { useMedia } from "app/hooks"
import { Media } from "app/models"
import { QR_KEY } from "configs"
import { useFormik } from "formik"
import { ChangeEvent, FC } from "react"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import "../style.scss"

export const ProductMedia: FC = () => {
  const { id } = useParams()
  const { handlePostMedia } = useMedia()
  const { values, setFieldValue } = useFormik<{ medias: Media[] }>({
    initialValues: { medias: [] },
    onSubmit: (values) => {}
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.product_media, id],
    queryFn: () => _product.findMedias(id || 0),
    enabled: !!id,
    onSuccess: (data) => setFieldValue('medias', data.context.data?.map(i => i.media))
  })
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        setFieldValue('medias', [...values.medias, ...data])
      }
    })
  }
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: { media_ids: number[] }) => _product.createProductMedias(id || 0, body),
  })
  const onRemoveMedia = async (id: number) => {
    setFieldValue('medias', values.medias.filter(a => a.id !== id))
    await _product.deleteProductMedias(id || 0, { media_ids: [id] })
  }
  return (
    <div className="card p-4 my-4">
      <span className="text-dark fw-bold fs-6">Thư viện ảnh</span>
      <div className="mt-2 product-media">
        {
          values.medias.map((i, index) => (
            <div key={index} className="media-item">
              {i.mime_type === "video/mp4" ? <video controls ><source src={i.original_url} /></video> : <img src={i.original_url} alt="" />}
              {
                i.id > 0 ?
                  <Chip color="error" variant="filled"
                    onDelete={() => onRemoveMedia(i.id)}
                  />
                  :
                  <div className="item-image-load d-flex justify-content-center align-items-center">
                    <CircularProgress size={26} />
                  </div>
              }
            </div>
          ))
        }
        <div className="media-item d-flex justify-content-center align-items-center">
          <UploadBtn id="medias" onChange={onChangeMedia} multi />
        </div>
      </div>
      <div className="d-flex justify-content-end mt-6">
        <LoadingButton
          disabled={!!!id} onClick={() => mutate({ media_ids: values.medias.map(i => i.id) })}
          loading={isLoading} type="button" color="success" variant="contained"
        >
          Lưu
        </LoadingButton>
        {
          id &&
          <LoadingButton
            disabled={!!!id}
            onClick={() => refetch()} loading={isFetching} className="mx-2" type="button" variant="outlined"
          >
            Khôi phục
          </LoadingButton>
        }
      </div>
    </div>
  )
}