import { ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Icon } from "../../components/Icons/Icon";
import { Chat, ContextChats } from "../../helpers/stores/chats";
import { Modal } from "../../components/Modal/Modal";
import { isNull, isUndefined } from "lodash";
import './Home.scss';

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => false);
    const [activeChatIndex, setActiveChatIndex] = useState<number>(() => 0);
    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();
    const activeChat: Chat | undefined = chats[activeChatIndex];
    const textInput = useRef<HTMLInputElement>(null);
    const [isToShowDeleteModal, setIsToShowDeleteModal] = useState<boolean>(() => false);
    const [isToShowEditModal, setIsToShowEditModal] = useState<boolean>(() => false);
    const [chatID, setChatID] = useState<null | string>(() => null);
    const title = useRef<HTMLInputElement>(null);

    const cleanTextInput = (): void => {
        if(textInput.current) {
            textInput.current.value = '';
        }
    }

    const onKeyDown = (event: any): void => {
        const isEnterKey = event.keyCode === 13;

        if (isEnterKey) {
            sendQuestion();
          }
    }

    const sendQuestion = async(): Promise<void> => {
        if (textInput.current && activeChat) {
            const text = textInput.current?.value;   

            chatsStore.update({
                id: activeChat.id,
                questions: [...activeChat.questions, text],
                answers: [...activeChat.answers, text],
            });

            cleanTextInput();
        } else if(textInput.current) {
            const text = textInput.current?.value;  
            const lastPosition = chats.length;

            chatsStore.add({
                title: text.length < 15 ? text : text.slice(0, 15) + '...',
                questions: [text],
                answers: [text]
            });

            setActiveChatIndex(lastPosition);
            cleanTextInput();
        }
    }

    const copyAnswer = (index: number): void => {
        const answer = activeChat.answers[index];
        navigator.clipboard.writeText(answer);
    }

    const toggleSidebar = (): void => {
        setIsSidebarOpen((previousValue) => !previousValue);
    }

    const clickOutside = (): void => {
        clickOutsideSidebar();
        clickOutsideDeleteModal();
        closeEditModal();
    }

    const clickOutsideSidebar = (): void => {
        if (isSidebarOpen) {
            setIsSidebarOpen(() => false);
        }
    }

    const clickOutsideDeleteModal = (): void => {
        if (isToShowDeleteModal) {
            setIsToShowDeleteModal(() => false);
        }
    }

    const closeDeleteModal = (): void => {
        setIsToShowDeleteModal(() => false);
    }

    const closeEditModal = (): void => {
        setIsToShowEditModal(() => false);
    }

    const deleteChat = (): void => {
        if(isNull(chatID)) {
            console.warn('Unable to delete this chat');
        } else {
            chatsStore.remove(chatID);
            setActiveChatIndex(0);
            closeDeleteModal();
        }
    }

    const changeChatTitle = (): void => {
        const titleValue = title.current?.value;

        if (isNull(chatID)) {
            console.warn('Unable to update this chat title');
        } 
        else if(isUndefined(titleValue)) {
            console.warn('Unable to update this chat title');
        }
        else {
            chatsStore.update({
                id: chatID,
                title: titleValue
            });
            closeEditModal();
        }
    }

    const getContentClassName = (): string => {
        if (isSidebarOpen || isToShowDeleteModal || isToShowEditModal) {
            return 'chat content-blur';
        }
        return 'chat content-normal';
    }

    const getChatTitle = (): string => {
        const title = chats.find(chat => chat.id === chatID)?.title;
        
        if(isUndefined(title)){
            return ''
        }
        
        return title;
    }

    return <div className="home">
        <div className={isSidebarOpen ? 'sidebar-container-open' : 'sidebar-container'} onClick={clickOutsideDeleteModal}>
            <Sidebar 
            activeChatIndex={activeChatIndex} 
            setActiveChatIndex={setActiveChatIndex} 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen} 
            setIsToShowDeleteModal={setIsToShowDeleteModal}
            setChatID={setChatID}
            setIsToShowEditModal={setIsToShowEditModal}
            />
        </div>
        <div className={isSidebarOpen ? 'navbar content-blur' : 'navbar content-normal'} onClick={clickOutside}>
            <button className="hamburguer-button" onClick={toggleSidebar}>
            <Icon.Hamburguer />
            </button>
            <h2 className="title">ChatBot - Poli</h2>
        </div>
        <div className={getContentClassName()} onClick={clickOutside} >
            <div className="container">
                <div className="messages-container">
                {activeChat && activeChat.questions.map((question, index) => {
                    return <div key={'message-container-' + index}>
                        <div className="question-container">
                            <p className="text">
                                {question}
                            </p>
                        </div>
                        <div className="answer-container">
                            <p className="text">
                                {activeChat.answers[index]}
                            </p>
                            <button onClick={() => copyAnswer(index)} className="icon-button"><Icon.Copy /></button>
                        </div>
                    </div>
                })}
                </div>
            <div className="bottom-container">
                <input ref={textInput} onKeyDown={(e) => onKeyDown(e)} type="text" placeholder="Escreva sua perga aqui..." />
                <button onClick={sendQuestion}>
                    <Icon.Send />
                </button>
            </div>
            </div>
        </div>
        <div className="delete-modal" hidden={!isToShowDeleteModal}>
            <Modal>
                <div className="header">
                    <div className="icon-container">
                        <Icon.Delete />
                    </div>
                    <div className="text">
                        <h1 className="title">Deseja deletar o chat {getChatTitle()} ?</h1>
                        <p className="description">Esta ação não pode ser desfeita</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="delete-button" onClick={deleteChat}>Deletar</button>
                    <button className="cancel-button" onClick={closeDeleteModal}>Cancelar</button>
                </div>
            </Modal>
        </div>
        <div className="edit-modal" hidden={!isToShowEditModal}>
            <Modal>
                <div className="header">
                    <div className="text">
                        <h1 className="title">Editar título do chat</h1>
                        <input type="text" ref={title} defaultValue={getChatTitle()} />
                    </div>
                </div>
                <div className="buttons">
                    <button className="save-button" onClick={changeChatTitle}>Salvar</button>
                    <button className="cancel-button" onClick={closeEditModal}>Cancelar</button>
                </div>
            </Modal>
        </div>
    </div>
}