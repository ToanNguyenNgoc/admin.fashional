import { LoadingButton } from "@mui/lab";
import { PageTitle, RoleLayout, SwitchButton, UploadBtn } from "app/components";
import { RBranch } from "app/constants";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import "./style.scss"
import { BranchBody } from "app/models";
import { useMedia } from "app/hooks";
import { ChangeEvent } from "react";
import { useQuery } from "react-query";
import { QR_KEY } from "configs";
import { _branch } from "app/apis";

function BranchFrom() {
  const { id } = useParams()
  const { handlePostMedia, isLoading: isLoadingMedia } = useMedia()
  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik<BranchBody>({
    initialValues: {
      name: '',
      email: '',
      hotline: '',
      short_address: '',
      media: null,
      status: false
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.branch, id],
    queryFn: () => _branch.findById(id || 0),
    enabled: !!id,
    onSuccess: (data) => {
      const { context } = data
      setFieldValue('name', context.name)
      setFieldValue('status', context.status)
      setFieldValue('email', context.email)
      setFieldValue('hotline', context.hotline)
      setFieldValue('short_address', context.short_address)
    }
  })
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      resetOriginalResult: true,
      callBack: (data) => setFieldValue('media', data[0])
    })
  }
  return (
    <RoleLayout permissionPath={RBranch.POST} isNavigate>
      <>
        <PageTitle title={id ? "Thay đổi thông tin" : "Tạo mới chi nhánh"} />
        <div className="card p-4">
          <form onSubmit={handleSubmit} className="form">
            <div className="my-3 d-flex justify-content-center">
              <div className="avatar-image">
                <img src={values.media?.original_url || ''} alt="" />
                <div className="btn-avatar-cnt">
                  <UploadBtn loading={isLoadingMedia} id="file_avatar" onChange={onChangeMedia} />
                </div>
              </div>
            </div>
            <div className="column my-3">
              <SwitchButton
                label="Trạng thái"
                value={values.status}
                onChange={(e) => setFieldValue('status', e.target.checked)}
              />
            </div>
            <div className="column my-3">
              <label className="form-label required">Tên chi nhánh</label>
              <input name='name' value={values.name} onChange={handleChange} type="text"
                className="form-control form-control-solid"
              />
            </div>
            <div className="d-flex justify-content-between row-2">
              <div className="column-2 my-3">
                <label className="form-label required">Email liên hệ</label>
                <input
                  name="email" value={values.email} onChange={handleChange}
                  className="form-control form-control-solid"
                />
              </div>
              <div className="column-2 my-3">
                <label className="form-label required">Hotline</label>
                <input
                  name="hotline" value={values.hotline} onChange={handleChange}
                  className="form-control form-control-solid"
                />
              </div>
            </div>
            <div className="column my-3">
              <label className="form-label required">Địa chỉ</label>
              <input name="short_address" value={values.short_address} onChange={handleChange} type="text"
                className="form-control form-control-solid"
              />
            </div>
            <div className="d-flex justify-content-end mt-6">
              <LoadingButton type="submit" color="success" variant="contained">
                Lưu
              </LoadingButton>
              {
                id &&
                <LoadingButton className="mx-2" type="button" variant="outlined">
                  Khôi phục
                </LoadingButton>
              }
            </div>
          </form>
        </div>
      </>
    </RoleLayout>
  );
}

export default BranchFrom;