import { AlertColor } from "@mui/material";
import { useState } from "react";

interface Noti {
    load: boolean,
    message: string,
    openAlert: boolean,
    element?: React.ReactElement,
    color?: AlertColor
}

export interface ResultOptions {
    message?: string;
    element?: React.ReactElement;
    color?: AlertColor
}

export function useMessage() {
    const [notification, setNotification] = useState<Noti>({
        load: false,
        message: "",
        openAlert: false,
        color: 'info'
    })
    const first = () => setNotification({ ...notification, load: true })
    const result = (options: ResultOptions) => {
        setNotification({
            load: false,
            message: options.message ?? '',
            openAlert: true,
            element: options.element,
            color: options.color
        })
    }
    const onClose = () => setNotification({ ...notification, openAlert: false })
    return { notification, first, result, onClose }
}