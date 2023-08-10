import { ReactElement, useContext } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];

    return <>
    Home
    <button onClick={() => setPage('POLITICA_DE_PRIVACIDADE')}>Click</button>
    </>
}