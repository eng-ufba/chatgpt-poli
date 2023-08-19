import { ReactElement, ReactNode } from "react";
import './Modal.scss';

type ModalProps = {
    children: ReactNode
}

export const Modal = ({children}: ModalProps): ReactElement => {
    return <div className="modal">
        { children }
    </div>
}