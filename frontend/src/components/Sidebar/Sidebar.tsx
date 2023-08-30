import { ReactElement, useContext, useState } from "react";
import { Icon } from "../Icons/Icon";
import { ContextPage, PAGE_VALUE, SetContextPage } from "../../helpers/page-manager/pageManager";
import { ContextChats } from "../../helpers/stores/chats";
import './Sidebar.scss';

type SidebarProps = {
    activeChatIndex: number,
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>,
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsToShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setChatID: React.Dispatch<React.SetStateAction<null | string>>
    setIsToShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = (props: SidebarProps): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();

    const addNewChat = (): void => {
        chatsStore.add({
            title: `Chat ${chats.length + 1}`,
            questions: [],
            answers: []
        })
    }

    const getChatContainerClass = (index: number): string => {
        return `chat-container ${index === props.activeChatIndex ? 'chat-container-active' : ''}`;
    }

    const editChatTitle = (id: string): void => {
        props.setIsToShowDeleteModal(() => false);
        props.setIsToShowEditModal(() => true);
        props.setChatID(id);
    }

    const removeChat = (id: string): void => {
        props.setIsToShowEditModal(() => false);
        props.setIsToShowDeleteModal(() => true);
        props.setChatID(id);
    }

    const isToHideIcon = (index: number): boolean => {
        return props.activeChatIndex !== index;
    }

    const toggleSidebar = (): void => {
        props.setIsSidebarOpen((previousValue) => !previousValue);
    }

    const onChatClick = (index: number): void => {
        props.setActiveChatIndex(index);
        props.setIsSidebarOpen(() => false);
    }

    const openChooseCoursePage = (): void => {
        localStorage.removeItem('course')
        setPage(PAGE_VALUE.CHOOSE_COURSE);
    }

    const openTermosPage = (): void => {
        setPage(PAGE_VALUE.TERMOS_DE_USO);
    }

    const openPoliticaPage = (): void => {
        setPage(PAGE_VALUE.POLITICA_DE_PRIVACIDADE);
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
            <button className="settings-button" onClick={openChooseCoursePage}>
            <Icon.Settings />
            <h3 className="text">
                Mudar Curso
            </h3>
            </button>
            <div className="line" aria-hidden="true"></div>
            <div className="middle-container">
            {chats.map((chat, index) => {
            return <div className={getChatContainerClass(index)} key={'chat-'+ chat.id} onClick={() => onChatClick(index)}>
            <h3 className="text">{chat.title}</h3>
            <button hidden={isToHideIcon(index)} className="edit-button" onClick={() => editChatTitle(chat.id)}>
                <Icon.Edit />
            </button>
            <button hidden={isToHideIcon(index)} className="delete-button" onClick={() => removeChat(chat.id)}>
                <Icon.Delete />
            </button>
        </div>
        })}
            </div>
            <div className="links">
                <a onClick={openTermosPage}>Termos de uso</a>
                <a onClick={openPoliticaPage}>Política de privacidade</a>
            </div>
        </div>
    </div>
}