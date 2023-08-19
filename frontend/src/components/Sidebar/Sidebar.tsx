import { ReactElement, useContext, useState } from "react";
import { Icon } from "../Icons/Icon";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { ContextChats } from "../../helpers/stores/chats";
import './Sidebar.scss';

type SidebarProps = {
    activeChatIndex: number,
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>,
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = ({activeChatIndex, setActiveChatIndex, isSidebarOpen, setIsSidebarOpen}: SidebarProps): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();
    const [isEditingTitleList, setIsEditingTitleList] = useState(chats.map(_ => false));

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

    const removeChat = (id: string): void => {
        chatsStore.remove(id);
        setActiveChatIndex(0);
    }

    const isToHideIcon = (index: number): boolean => {
        return activeChatIndex !== index;
    }

    const toggleSidebar = (): void => {
        setIsSidebarOpen((previousValue) => !previousValue);
    }

    const onChatClick = (index: number): void => {
        setActiveChatIndex(index);
        setIsSidebarOpen(() => false);
    }

    return <div className="sidebar">
        <div className="container">
            <div className="top-container">
            <h1 className="title">ChatBot - Poli</h1>
            <button className="close-button" onClick={toggleSidebar}>
                <Icon.Close />
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
            return <div className={getChatContainerClass(index)} key={'chat-'+ chat.id} onClick={() => onChatClick(index)}>
            <h3 className="text" contentEditable={isEditingTitleList[index]}>{chat.title}</h3>
            <button hidden={isToHideIcon(index)} className="edit-button" onClick={() => editChatTitle(index)}>
                <Icon.Edit />
            </button>
            <button hidden={isToHideIcon(index)} className="delete-button" onClick={() => removeChat(chat.id)}>
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
    </div>
}