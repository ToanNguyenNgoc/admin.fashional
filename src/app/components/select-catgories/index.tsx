import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { QR_KEY } from "configs";
import { FC, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { debounce } from "lodash"
import { _category } from "app/apis";

interface SelectCategoryProps {
  value?: number | string;
  tag_id?:number|string;
  onChange?: (e: SelectChangeEvent<string | number>) => void;
  disabled?:boolean
}

export const SelectCategory: FC<SelectCategoryProps> = ({ value, onChange = () => { }, tag_id, disabled = false }) => {
  const [search, setSearch] = useState('')
  const { data: dataTags } = useQuery({
    queryKey: [QR_KEY.category, search, tag_id],
    queryFn: () => _category.findAll({
      'page':1,
      'limit':15,
      'search': search,
      'status': true,
      'tag_id':tag_id
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
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
      >
        <TextField
          size="small" style={{ width: '100%' }} id="filled-basic" variant="filled"
          placeholder="Tìm kiếm..." onChange={(e) => onDebounce(e.target.value)}
        />
        {
          dataTags?.context.data?.map(tag => (
            <MenuItem key={tag.id} value={tag.id}>.{tag.name}.</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}