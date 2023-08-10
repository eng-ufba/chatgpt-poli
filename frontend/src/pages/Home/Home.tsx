import { ReactElement, useContext } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Icon } from "../../components/Icons/Icon";

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];

    return <div className="home">
        <Sidebar />
        <div className="chat">
            <Icon.Send />
        </div>
    </div>
}