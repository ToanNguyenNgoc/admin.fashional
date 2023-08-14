import { LoadingButton } from "@mui/lab";
import { ChangeEvent, FC } from "react";
import "./style.scss"

interface UploadBtnProps {
    className?: string;
    loading?: boolean;
    id: string;
    multi?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const UploadBtn: FC<UploadBtnProps> = ({
    loading = false,
    id,
    className = '',
    multi = false,
    onChange = () => { }
}) => {
    return (
        <div className={`upload-btn ${className}`}>
            <LoadingButton loading={loading}>
                <input onChange={onChange} multiple={multi} type="file" id={id} hidden />
                <label htmlFor={id} className="btn btn-icon btn-primary rounded-circle btn-sm" >
                    {!loading && <i className="bi bi-camera-fill"></i>}
                </label>
            </LoadingButton>
        </div>
    )
}