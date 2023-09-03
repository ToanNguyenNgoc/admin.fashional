import { FC } from "react";
import { RoleLayout } from "../role-layout";
import { RPermission } from "app/constants";
import { useQuery } from "react-query";
import { QR_KEY } from "configs";
import { _permission } from "app/apis";
import { usePermission } from "app/hooks";
import { unique } from "app/utils";
import { Checkbox } from "@mui/material";
import "./permission-tb.scss"

interface SelectPermissionProps {
  permission_ids?: number[],
  onChange?: (permission_ids: number[]) => void
}

export const SelectPermission: FC<SelectPermissionProps> = ({ permission_ids = [], onChange = () => { } }) => {
  const { resolve } = usePermission(RPermission.GET)
  const { data } = useQuery({
    queryKey: [QR_KEY.permission],
    queryFn: () => _permission.findAll(),
    enabled: resolve
  })
  const permissionsGroupName = unique(data?.context.data.map(i => i.name) || [])
  const permissionsGroup = permissionsGroupName.map(i => {
    return {
      group_name: i,
      methods: data?.context.data.filter(per => per.name === i)
    }
  })
  const onChangeItem = (id: number) => {
    const iIndex = permission_ids.findIndex(i => i === id)
    if (iIndex < 0) {
      onChange([...permission_ids, id])
    } else {
      onChange(permission_ids.filter(i => i !== id))
    }
  }
  return (
    <RoleLayout permissionPath={RPermission.GET} >
      <div className="permission-cnt">
        <div className="per-header">
          <ul className="list-item">
            <li className="item">Xem tất cả</li>
            <li className="item">Xem chi tiết</li>
            <li className="item">Tạo mới</li>
            <li className="item">Chỉnh sửa</li>
            <li className="item">Xóa</li>
          </ul>
        </div>
        <div className="per-body">
          {
            permissionsGroup?.sort((a, b) => a.group_name.localeCompare(b.group_name)).map((item, index: number) => (
              <div key={index} className="per-body-item">
                <div className="item-name">
                  <span>{item.group_name}</span>
                </div>
                <ul className="item-check-list">
                  {
                    item.methods?.map(permission => (
                      <li key={permission.id} className="item-check">
                        <Checkbox
                          checked={permission_ids?.includes(permission.id)}
                          onChange={() => onChangeItem(permission.id)}
                          color="success"
                        />
                        <div className="item-hover">{permission.path}</div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </RoleLayout>
  )
}