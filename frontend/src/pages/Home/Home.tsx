import { ReactElement, useContext, useEffect, useState } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Icon } from "../../components/Icons/Icon";
import { ACTIONS, Chat, useChatReducerFn } from "../../helpers/stores/chat";
import './Home.scss';
import { ContextChats } from "../../helpers/stores/chats/facade";

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const [state, dispatch] = useChatReducerFn();

    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();

    const { activeChatIndex } = state;
    const [activeChat, setActiveChat] = useState<Chat>(() => chats[activeChatIndex]);

    useEffect(() => {
        console.log(chats);
    }, [chats]);

    const addMockChat = (): void => {
        chatsStore.add({
            id: '12123123',
            title: 'neww chat',
            questions: [],
            answers: []
        })
    }

    return <div className="home">
        <Sidebar />
        <div className="chat">
            <div className="container">
            <div className="messages-container">
                <button onClick={addMockChat}>Add</button>
                {chats.map((chat, index) => {
                    return <div key={'chat-' + index}>
                        <h1>{chat.title}</h1>
                    </div>
                })}
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