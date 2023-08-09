import { LoadingButton } from "@mui/lab";
import { FC } from "react";
import "./style.scss"

interface UploadBtnProps {
    className?: string;
    loading?: boolean;
    id: string
}

export const UploadBtn: FC<UploadBtnProps> = ({ loading = false, id, className = '' }) => {
    return (
        <div className={`upload-btn ${className}`}>
            <LoadingButton loading={loading}>
                <input type="file" id={id} hidden />
                <label htmlFor={id} className="btn btn-icon btn-primary rounded-circle btn-sm" >
                    {!loading && <i className="bi bi-camera-fill"></i>}
                </label>
            </LoadingButton>
        </div>
    )
}