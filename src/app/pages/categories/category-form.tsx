import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { _category, _tag } from "app/apis";
import { PageTitle, RoleLayout, Snack, SwitchButton } from "app/components";
import { RCategory } from "app/constants";
import { QR_KEY } from "configs";
import { FC, useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { debounce } from "lodash"
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import { CategoryBody } from "app/models";
import { useMessage } from "app/hooks";
import { AxiosError } from "axios";

function CategoryForm() {
  const { id } = useParams()
  const { result, notification: { message, color, openAlert }, onClose } = useMessage()
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: CategoryBody) => id ? _category.update(id, body) : _category.create(body),
    onSuccess: () => result({
      message: id ? "Cập nhật thành công" : "Tạo mới thành công",
      color: "success"
    }),
    onError: (err) => {
      const error = err as AxiosError
      result({
        message: error.response?.data.message || 'Có lỗi xảy ra',
        color: 'error'
      })
    }
  })
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      tag_id: '',
      status: true
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên"),
      tag_id: Yup.number().required("Chọn tag")
    }),
    onSubmit: (values) => mutate(values)
  })
  const { refetch, isFetching } = useQuery({
    queryKey: [QR_KEY.category, id],
    queryFn: () => _category.findById(id || 0),
    enabled: !!id,
    onSuccess: (data) => {
      setFieldValue('name', data.context.name)
      setFieldValue('tag_id', data.context.tag_id)
      setFieldValue('status', data.context.status)
    }
  })
  return (
    <RoleLayout permissionPath={id ? RCategory.PUT : RCategory.POST} isNavigate>
      <>
        <PageTitle title={id ? "Thay đổi danh mục" : "Tạo mới danh mục"} />
        <Snack open={openAlert} message={message} severity={color} onClose={onClose} />
        <div className="card p-4">
          <form onSubmit={handleSubmit} className="form">
            <div className="column my-3">
              <SwitchButton label="Trạng thái" value={values.status} onChange={(e) => setFieldValue('status', e.target.checked)} />
            </div>
            <div className="column my-3">
              <label className="form-label required">Tên chi danh mục</label>
              <input type="text"
                name="name" value={values.name} onChange={handleChange}
                className="form-control form-control-solid"
              />
              {
                touched.name && errors.name &&
                <span className="text-danger fs-8">{errors.name}</span>
              }
            </div>
            <div className="column  my-3">
              <label className="form-label required">Tag</label>
              <div className="column">
                <SelectTag value={values.tag_id} onChange={(e) => setFieldValue('tag_id', e.target.value)} />
              </div>
              {
                touched.tag_id && errors.tag_id &&
                <span className="text-danger fs-8">{errors.tag_id}</span>
              }
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
      </>
    </RoleLayout>
  );
}

interface SelectTagProps {
  value?: number | string;
  onChange?: (e: SelectChangeEvent<string | number>) => void
}

const SelectTag: FC<SelectTagProps> = ({ value, onChange = () => { } }) => {
  const [search, setSearch] = useState('')
  const { data: dataTags } = useQuery({
    queryKey: [QR_KEY.tag, search],
    queryFn: () => _tag.findAll({
      'search': search,
      'status': true
    })
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebounce = useCallback(
    debounce((keyword) => setSearch(keyword), 800),
    []
  );
  return (
    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        size="small"
        value={value}
        defaultValue={''}
        onChange={onChange}
      >
        <TextField
          size="small" style={{ width: '100%' }} id="filled-basic" variant="filled"
          placeholder="Tìm kiếm..." onChange={(e) => onDebounce(e.target.value)}
        />
        {
          dataTags?.context.data?.map(tag => (
            <MenuItem key={tag.id} value={tag.id}>*{tag.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default CategoryForm;