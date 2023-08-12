import { ReactElement, SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { ContextPage, SetContextPage } from "../../helpers/page-manager/pageManager";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Icon } from "../../components/Icons/Icon";
import './Home.scss';
import { Chat, ContextChats } from "../../helpers/stores/chats";
import { isUndefined } from "lodash";

export const Home  = (): ReactElement => {
    const [page, setPage] = [useContext(ContextPage), useContext(SetContextPage)];
    const [activeChatIndex, setActiveChatIndex] = useState<number>(() => 0);
    const chatsStore = useContext(ContextChats);
    const chats = chatsStore.getAll();
    const activeChat: Chat | undefined = chats[activeChatIndex];
    const textInput = useRef<HTMLInputElement>(null);

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
                title: text.length < 18 ? text : text.slice(0, 18),
                questions: [text],
                answers: [text]
            });

            setActiveChatIndex(lastPosition);
            cleanTextInput();
        }
    }

    const copyAnswer = (index: number): void => {
        const answer = activeChat.answers[index];
        console.log(answer);
        navigator.clipboard.writeText(answer);
    }

    return <div className="home">
        <Sidebar activeChatIndex={activeChatIndex} setActiveChatIndex={setActiveChatIndex} />
        <div className="chat">
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
    </div>
}