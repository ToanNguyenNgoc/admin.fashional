import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { _tag } from "app/apis";
import { FaSpinner, PageTitle, RoleLayout, SwitchButton, XPagination } from "app/components";
import { RTag } from "app/constants";
import { usePermission } from "app/hooks";
import { QrTag, Tag, TagBody } from "app/models";
import { slugify } from "app/utils";
import { QR_KEY } from "configs";
import { useFormik } from "formik";
import moment from "moment";
import queryString from "query-string";
import { FC, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup"

const scheme = Yup.object({
  name:Yup.string().required(),
  type:Yup.string().required()
})

function TagPage() {
  const refForm = useRef<HTMLTableSectionElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search) as QrTag
  const { data } = useQuery({
    queryKey: [QR_KEY.tag, query],
    queryFn: () => _tag.findAll({
      'page': query.page || 1,
      'limit': 15
    })
  })
  const onChangePage = (p: number) => {
    const newQuery = {
      ...query,
      page: p
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  return (
    <RoleLayout permissionPath={RTag.GET} isNavigate >
      <>
        <PageTitle title="Tag">
          <RoleLayout permissionPath={RTag.POST}>
            <Button
              onClick={() => {
                refForm.current?.classList.toggle('d-block');
                refForm.current?.classList.toggle('d-none')
              }}
              size="medium" color="primary"
              variant="contained" >
              Tạo mới tag
            </Button>
          </RoleLayout>
        </PageTitle>
        <div className="card">
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='text-muted mt-1 fw-semobold fs-7'>{data?.context.total} tags</span>
            </h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className="table align-middle gs-0 gy-4">
                <thead><tr className='fw-bold text-muted bg-light'></tr> </thead>
                <tbody className="d-none" ref={refForm}>
                  <TagForm query={query} />
                </tbody>
              </table>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted bg-light'>
                    <th className='ps-4 min-w-200px rounded-start'>Tên</th>
                    <th className='min-w-125px'>Slugify</th>
                    <th className='min-w-125px'>Type</th>
                    <th className='min-w-125px'>Trạng thái</th>
                    <th className='min-w-100px'>Cập nhật</th>
                    <th className='min-w-100px'>Ngày tạo</th>
                    <th className='min-w-200px text-end rounded-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.context.data?.map(item => (
                      <TagItem key={item.id} tag={item} query={query} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <XPagination
              totalPage={data?.context.total_page ?? 1}
              onChangePage={onChangePage}
              defaultPage={query?.page ?? 1}
            />
          </div>
        </div>
      </>
    </RoleLayout>
  );
}
const TagForm: FC<{ query: QrTag }> = ({ query }) => {
  const client = useQueryClient()
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (body: TagBody) => _tag.create(body),
    onSuccess: () => {
      client.invalidateQueries([QR_KEY.tag, query])
    }
  })
  const { values, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: "", type: "", status: true
    },
    validationSchema:scheme,
    onSubmit: async (values) => {
      await mutateAsync(values)
      resetForm()
    }
  })
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <input
            type="text" className="form-control form-control-solid"
            name="name" value={values.name} onChange={handleChange} placeholder="Tên tag..."
          />
        </div>
      </td>
      <td>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select size="small" value={values.type} onChange={(e) => setFieldValue('type', e.target.value)} >
            <MenuItem value={"COLLAB"}>COLLAB</MenuItem>
            <MenuItem value={"SHOP"}>SHOP</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td>
        <RoleLayout permissionPath={RTag.PUT}>
          <button type="submit" onClick={() => handleSubmit()} className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
            {isLoading ? <FaSpinner /> : <i className="fa fa-check fs-6"></i>}
          </button>
        </RoleLayout>
      </td>
    </tr>
  )
}
const TagItem: FC<{ tag: Tag, query: QrTag }> = ({ tag, query }) => {
  const { resolve: resolveEdit } = usePermission(RTag.PUT)
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: TagBody) => _tag.update(tag.id, body)
  })
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    mutationFn: () => _tag.delete(tag.id),
    onSuccess: () => {
      client.invalidateQueries([QR_KEY.tag, query])
    }
  })
  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: tag.name, type: tag.type, status: tag.status
    },
    validationSchema:scheme,
    onSubmit: (values) => mutate(values)
  })
  const onChangeStatus = (check: boolean) => {
    if (resolveEdit) {
      setFieldValue('status', check)
      mutate({ status: check })
    }
  }
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <input
            disabled={!resolveEdit}
            value={values.name} name="name" onChange={handleChange}
            type="text" className="form-control form-control-solid"
          />
        </div>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">
          {slugify(values.name)}
        </span>
      </td>
      <td>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            size="small" disabled={!resolveEdit}
            value={values.type} onChange={(e) => setFieldValue('type', e.target.value)}
          >
            <MenuItem value={"COLLAB"}>COLLAB</MenuItem>
            <MenuItem value={"SHOP"}>SHOP</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td>
        <SwitchButton value={values.status} onChange={(e) => onChangeStatus(e.target.checked)} />
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-7'>
          {moment(tag.updated_at).format('DD/MM/YYYY')}
        </span>
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-7'>
          {moment(tag.created_at).format('DD/MM/YYYY')}
        </span>
      </td>
      <td className='text-end'>
        <RoleLayout permissionPath={RTag.PUT}>
          <button type="submit" onClick={() => handleSubmit()} className="btn btn-icon btn-success me-1 rounded-circle btn-sm">
            {isLoading ? <FaSpinner /> : <i className="fa fa-check fs-6"></i>}
          </button>
        </RoleLayout>
        <RoleLayout permissionPath={RTag.DELETE}>
          <button onClick={() => mutateDelete()} className="btn btn-icon btn-danger me-1 rounded-circle btn-sm">
            {isLoadingDelete ? <FaSpinner /> : <i className="bi bi-trash-fill fs-6"></i>}
          </button>
        </RoleLayout>
      </td>
    </tr>
  )
}

export default TagPage;