import React from 'react'
import { Pagination } from '@mui/material'
import { scrollTop } from 'app/utils';

interface XPaginationProps {
  totalPage: number,
  onChangePage: (page: number) => void,
  defaultPage: any
}

export function XPagination(props: XPaginationProps) {
  const { totalPage, onChangePage, defaultPage } = props;
  const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangePage(value)
    scrollTop()
  }
  return (
    <Pagination
      onChange={onChange}
      defaultPage={parseInt(defaultPage)}
      page={parseInt(defaultPage)}
      count={totalPage}
      color="primary"
    />
  );
}