import { ReactElement } from "react";

export const CloseIcon = (): ReactElement => {
    return <svg className="close-icon" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="var(--primary-icon-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
}