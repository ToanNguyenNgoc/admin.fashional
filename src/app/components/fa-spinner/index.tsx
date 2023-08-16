import { FC } from "react";
import "./fa-spinner.scss"

export const FaSpinner: FC<{ size?: number }> = ({ size = 6 }) => {
  return <i className={`spinner-icon fa fa-spinner fs-${size}`}></i>
}