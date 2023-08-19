import React from "react";

export type Page = 'HOME' | 'POLITICA_DE_PRIVACIDADE' | 'TERMOS_DE_USO' | 'CHOOSE_COURSE';

export type PageValue = {
    [key: string]: Page
}

export const PAGE_VALUE: PageValue = {
    HOME: 'HOME',
    POLITICA_DE_PRIVACIDADE: 'POLITICA_DE_PRIVACIDADE',
    TERMOS_DE_USO: 'TERMOS_DE_USO',
    CHOOSE_COURSE: 'CHOOSE_COURSE'
}

export const ContextPage = React.createContext<Page>(PAGE_VALUE.HOME);
export const SetContextPage = React.createContext((_page: Page) => {});