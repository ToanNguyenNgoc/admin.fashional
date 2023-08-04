import { FC, ReactElement } from 'react';

interface IProps {
    title: string
    children?: ReactElement
}

export const PageTitle: FC<IProps> = ({ title, children }) => {
    return (
        <div className='toolbar' id='kt_toolbar'>
            <div id="kt_toolbar_container" className='container-fluid d-flex flex-stack'>
                <h1 className='d-flex align-items-center text-dark fw-bolder my-1 fs-3'>
                    {title}
                </h1>
                {children}
            </div>
        </div>
    );
}