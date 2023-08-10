import { ReactElement, useContext } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";

export const PoliticaDePrivacidade = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];

    return <>
    Política de privacidade
    <button onClick={() => setPage('TERMOS_DE_USO')}>Click</button>
    </>
}