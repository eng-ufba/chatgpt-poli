import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons/Icon";
import './Sidebar.scss';
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Chat, ContextChats } from "../../helpers/stores/chats/facade";

type SidebarProps = {
    activeChatIndex: number,
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>
}

export const Sidebar = ({activeChatIndex, setActiveChatIndex}: SidebarProps): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();

    const [isEditingTitleList, setIsEditingTitleList] = useState(chats.map(_ => false));

    useEffect(() => {
        console.log('sidebar: ', chats);
    }, [chats]);

    const addNewChat = (): void => {
        chatsStore.add({
            title: `Chat ${chats.length + 1}`,
            questions: [],
            answers: []
        })
    }

    const getChatContainerClass = (index: number): string => {
        return `chat-container ${index === activeChatIndex ? 'chat-container-active' : ''}`;
    }

    const editChatTitle = (index: number): void => {
        console.log('EDIT');
        setIsEditingTitleList((previousIsEditingTitleList) => {
            return previousIsEditingTitleList.map((_, position) => index === position);
        });
    }

    const removeChat = (chat: Chat): void => {
        chatsStore.remove(chat.id);
    }

    const isToHideIcon = (index: number): boolean => {
        return activeChatIndex !== index;
    }

    return <div className="sidebar">
    <div className="top-container">
        <h1 className="title">ChatBot - Poli</h1>
        <button className="hamburguer-button">
            <Icon.Hamburguer />
        </button>
    </div>
    <button className="add-button" onClick={addNewChat}>
            <Icon.Add />
            <h3 className="text">
                Novo Chat
            </h3>
    </button>
    <div className="line" aria-hidden="true"></div>
    <div className="middle-container">
        {chats.map((chat, index) => {
            return <div className={getChatContainerClass(index)} key={'chat-'+ chat.id} onClick={() => setActiveChatIndex(index)}>
            <h3 className="text" contentEditable={isEditingTitleList[index]}>{chat.title}</h3>
            <button hidden={isToHideIcon(index)} className="edit-button" onClick={() => editChatTitle(index)}>
                <Icon.Edit />
            </button>
            <button hidden={isToHideIcon(index)} className="delete-button" onClick={() => removeChat(chat)}>
                <Icon.Delete />
            </button>
        </div>
        })}
    </div>
    <div className="links">
        <a>Termos de uso</a>
        <a>Política de privacidade</a>
    </div>
    </div>
}