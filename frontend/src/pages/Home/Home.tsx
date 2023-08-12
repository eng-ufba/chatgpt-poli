import { ReactElement, useContext, useEffect, useState } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import './Home.scss';
import { Icon } from "../../components/Icons/Icon";
import { Chat, useChatReducerFn } from "../../helpers/stores/chats";

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const [state, setState] = useChatReducerFn();

    const { chats, activeChatIndex } = state;
    const [chat, setChat] = useState<Chat>(() => chats[activeChatIndex])

    useEffect(() => {
        console.log('state');
        setChat(() => chats[activeChatIndex]);
    }, [chats])

    return <div className="home">
        <Sidebar />
        <div className="chat">
            <div className="container">
            <div className="messages-container">
                <h1>{chat.title}</h1>
                <h1>{activeChatIndex}</h1>
            </div>
            <div className="bottom-container">
                <input type="text" placeholder="Escreva sua perga aqui..." />
                <button>
                    <Icon.Send />
                </button>
            </div>
            </div>
        </div>
    </div>
}