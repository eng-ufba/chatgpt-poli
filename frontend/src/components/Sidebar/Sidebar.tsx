import { ReactElement, useContext, useEffect, useState } from "react";
import { Icon } from "../Icons/Icon";
import './Sidebar.scss';
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { ACTIONS, Chat, useChatReducerFn } from "../../helpers/stores/chats";
import { generateUniqueId } from "../../helpers/utils";

export const Sidebar = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const [state, setState] = useChatReducerFn();
    const { chats, activeChatIndex } = state;
    const [isEditingTitleList, setIsEditingTitleList] = useState(chats.map(_ => false));

    useEffect(() => {
        setIsEditingTitleList(chats.map(_ => false));
        console.log(chats);
        console.log(isEditingTitleList);
    }, [chats]);

    const addNewChat = (): void => {
        setState({
            type: ACTIONS.CHAT.ADD,
            payload: {
                chat: {
                    id: generateUniqueId(),
                    title: `Chat ${chats.length + 1}`,
                    questions: [],
                    answers: []
                }
            }
        })
    }

    const getChatContainerClass = (chatIndex: number): string => {
        return `chat-container ${chatIndex === activeChatIndex ? 'chat-container-active' : ''}`;
    }

    const selectCurrentChat = (index: number): void => {
        setState({
            type: ACTIONS.ACTIVE_CHAT_INDEX.UPDATE,
            payload: {
                activeChatIndex: index
            }
        })
    }

    const editChatTitle = (index: number): void => {
        console.log('EDIT');
        setIsEditingTitleList((previousIsEditingTitleList) => {
            return previousIsEditingTitleList.map((_, position) => index === position);
        });
    }

    const deleteChat = (chat: Chat): void => {
        setState({
            type: ACTIONS.CHAT.DELETE,
            payload: {
                chat
            }
        })
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
            return <div className={getChatContainerClass(index)} key={'chat-'+ chat.id} onClick={() => selectCurrentChat(index)}>
            <h3 className="text" contentEditable={isEditingTitleList[index]}>{chat.title}</h3>
            <button hidden={isToHideIcon(index)} className="edit-button" onClick={() => editChatTitle(index)}>
                <Icon.Edit />
            </button>
            <button hidden={isToHideIcon(index)} className="delete-button" onClick={() => deleteChat(chat)}>
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