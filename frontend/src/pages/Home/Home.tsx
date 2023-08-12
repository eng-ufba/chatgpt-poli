import { ReactElement, useContext, useEffect, useState } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Icon } from "../../components/Icons/Icon";
import './Home.scss';
import { ContextChats } from "../../helpers/stores/chats";

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const [activeChatIndex, setActiveChatIndex] = useState<number>(() => 0);
    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();
    const activeChat = chats[activeChatIndex];

    useEffect(() => {
        console.log(chats);
    }, [chats]);

    return <div className="home">
        <Sidebar activeChatIndex={activeChatIndex} setActiveChatIndex={setActiveChatIndex} />
        <div className="chat">
            <div className="container">
            <div className="messages-container">
                <h1>{activeChat.title}</h1>
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