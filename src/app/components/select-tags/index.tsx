import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { _tag } from "app/apis";
import { QR_KEY } from "configs";
import { FC, useCallback, useState } from "react";
import { useQuery } from "react-query";
import {debounce} from "lodash"

interface SelectTagProps {
  value?: number | string;
  onChange?: (e: SelectChangeEvent<string | number>) => void;
}

export const SelectTag: FC<SelectTagProps> = ({ value, onChange = () => { } }) => {
  const [search, setSearch] = useState('')
  const { data: dataTags } = useQuery({
    queryKey: [QR_KEY.tag, search],
    queryFn: () => _tag.findAll({
      'page':1,
      'limit':15,
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
        value={value || ''}
        onChange={onChange}
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