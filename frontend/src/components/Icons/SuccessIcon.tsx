import { ReactElement } from "react";

export const SuccessIcon = (): ReactElement => {
    return <svg className="success-icon" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="var(--primary-icon-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="var(--secondary-icon-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}