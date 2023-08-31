import { ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Icon } from "../../components/Icons/Icon";
import { Chat, ContextChats } from "../../helpers/stores/chats";
import { Modal } from "../../components/Modal/Modal";
import { isEmpty, isNull, isUndefined } from "lodash";
import { Loading } from "../../components/Loading/Loading";
import './Home.scss';
import { ping } from "../../helpers/backend-connection";

type Snackbar = {
    message: string;
    type: 'success' | 'error' | 'warn' | 'hidden';
}

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
    const [snackbar, setSnackbar] = useState<Snackbar>(() => ({ message: '', type: 'hidden' }));
    const [isToShowLoading, setIsToShowLoading] = useState<boolean>(() => false);

    useEffect(() => {
        checkBackendConnection();
    }, []);

    const checkBackendConnection = async(): Promise<void> => {
        setIsToShowLoading(() => true);

        const response = await ping();

        if (response === null) {
            setSnackbar(() => ({ message: 'Falha ao conectar ao servidor, possíveis problemas ao carregar respostas', type: 'error' }));
            closeSnackbar(4000);
        }
        
        setIsToShowLoading(() => false);
    }

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

    const getAnswer = async (question: string): Promise<string> => {
        return question;
    } 

    const sendQuestion = async(): Promise<void> => {
        if (textInput.current && activeChat) {
            const text = textInput.current?.value;
            setIsToShowLoading(() => true);
            const answer = await getAnswer(text);   

            chatsStore.update({
                id: activeChat.id,
                questions: [...activeChat.questions, text],
                answers: [...activeChat.answers, answer],
            });
        } else if(textInput.current) {
            const text = textInput.current?.value;  
            const lastPosition = chats.length;
            setIsToShowLoading(() => true);
            const answer = await getAnswer(text);   

            chatsStore.add({
                title: text.length < 15 ? text : text.slice(0, 15) + '...',
                questions: [text],
                answers: [answer]
            });

            setActiveChatIndex(lastPosition);
        }
        setIsToShowLoading(() => false);
        cleanTextInput();
    }

    const copyAnswer = (index: number): void => {
        const answer = activeChat.answers[index];
        navigator.clipboard.writeText(answer);
        showCopyTextSnackbar();
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
            setSnackbar(() => ({ message: 'Não foi possível deletar esse chat', type: 'error' }));
            closeSnackbar(2000);
        } else {
            chatsStore.remove(chatID);
            setActiveChatIndex(0);
            closeDeleteModal();
        }
    }

    const changeChatTitle = (): void => {
        const titleValue = title.current?.value;

        if (isNull(chatID)) {
            setSnackbar(() => ({ message: 'Não foi possível editar esse chat', type: 'error' }));
            closeSnackbar(2000);
        } 
        else if(isUndefined(titleValue)) {
            setSnackbar(() => ({ message: 'Não foi possível editar esse chat', type: 'error' }));
            closeSnackbar(2000);
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

    const showCopyTextSnackbar = (): void => {
        setSnackbar(() => ({ message: 'Texto copiado', type: 'success' }));
        closeSnackbar(2000);
    }

    const closeSnackbar = (time?: number): void => {
        if (time) {
            setTimeout(() => {
                closeSnackbar();
            }, time);
        }
        else {
            setSnackbar((previousSnackbar) => ({ message: previousSnackbar.message, type: 'hidden' }));
        }
    }

    const getSnackbarClassName = (): string => {
        if( isEmpty(snackbar.message)) {
            return 'snackbar';
        }
        if (snackbar.type === 'hidden') {
            return 'snackbar-hide'
        }
        return 'snackbar-visible';
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
                <div className={isToShowLoading ? "messages-container-loading" : "messages-container"}>
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
                <div className={"loading-container loading-container-" + (!isToShowLoading && 'hidden')}>
                    <Loading isToShow={isToShowLoading} />
                </div>
                <div className="bottom-container">
                <input ref={textInput} onKeyDown={(e) => onKeyDown(e)} type="text" placeholder="Escreva sua pergunta aqui..." />
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
        <div className={getSnackbarClassName()} hidden={snackbar.type === 'hidden'}>
            <div className="text-container">
                <div className={'icon-container icon-container-' + snackbar.type}>
                    {snackbar.type === 'success' ? <Icon.Success /> : null}
                    {snackbar.type === 'warn' ? <Icon.Warn /> : null}
                    {snackbar.type === 'error' ? <Icon.Error /> : null}
                </div>
                <h1 className={"message message-" + snackbar.type}>{snackbar.message}</h1>
            </div>
            <div className="button-container">
            <button onClick={() => closeSnackbar()}><Icon.Close /></button>
            </div>
        </div>
    </div>
}