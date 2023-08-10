import { ReactElement, useContext } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";

export const TermosDeUso = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    
    return <>
        Termos de uso
        <button onClick={() => setPage('HOME')}>Click</button>
    </>
}