import { FC, useRef } from "react";
import { RoleLayout } from "../role-layout";
import { RRole } from "app/constants";
import { useQuery } from "react-query";
import { QR_KEY } from "configs";
import { _role } from "app/apis";
import { usePermission } from "app/hooks";
import { Box, Chip, MenuItem } from "@mui/material";
import { Role } from "app/models";
import "./select-roles.scss"

interface SelectRoleProps {
  value?: Role[],
  onChange?: (e: Role[]) => void
}

export const SelectRole: FC<SelectRoleProps> = ({ value = [], onChange = () => { } }) => {
  const { resolve } = usePermission(RRole.GET)
  const refRoles = useRef<HTMLDivElement>(null)
  const { data } = useQuery({
    queryKey: [QR_KEY.role],
    queryFn: () => _role.findAll(),
    enabled: resolve
  })
  window.addEventListener('click', () => refRoles.current?.classList.remove('list-cnt-act'))
  const onChangeRole = (item: Role) => {
    const iIndex = value.findIndex(i => i.id === item.id)
    if (iIndex < 0) {
      onChange([...value, item])
    } else {
      onChange(value.filter(i => i.id !== item.id))
    }
  }
  return (
    <RoleLayout permissionPath={RRole.GET} >
      <div>
        <label className="form-label required">Quyền</label>
        <div onClick={(e) => {
          e.stopPropagation();
          refRoles.current?.classList.add('list-cnt-act')
        }}
          className="select-cnt"
        >
          <div className="form-control form-control-solid">
            {
              value.map(i => (
                <Chip className="m-1" key={i.id} color="success"
                  label={i.name} size="small"
                  onDelete={() => onChangeRole(i)}
                />
              ))
            }
          </div>
          <Box ref={refRoles} sx={{ boxShadow: 3 }} className="list-cnt">
            <div className="list">
              <ul>
                {
                  data?.context.data.map(i => (
                    <MenuItem
                      onClick={() => onChangeRole(i)} key={i.id}
                      selected={value.map(item => item.id).includes(i.id)}
                    >
                      {i.name}
                    </MenuItem>
                  ))
                }
              </ul>
            </div>
          </Box>
        </div>
      </div>
    </RoleLayout>
  )
}