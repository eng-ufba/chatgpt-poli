import { useState } from "react";
import { chatsStore } from "./facade";
import { Chat, ChatStore } from "./types";
import React from "react";

export const ContextChats = React.createContext({} as unknown as ChatStore);

const initialChats = [
    {
        id: '1',
        title: 'Chat 1',
        questions: ['Qual a velocidade da luz ?', 'Qual a velocidade da luz ?', 'Qual a velocidade da luz ?', 'Qual a velocidade da luz ?', 'Qual a velocidade da luz ?', 'Qual a velocidade da luz ?', 'Qual a velocidade da luz ?', 'Qual a velocidade da luz ?'],
        answers: ['300000km por segundo', '300000km por segundo', '300000km por segundo', '300000km por segundo', '300000km por segundo', '300000km por segundo', '300000km por segundo', '300000km por segundo']
    },
    {
        id: '2',
        title: 'Chat 2',
        questions: ['Quem nasceu primeiro, o ovo ou a galinha ?'],
        answers: ['A galinha, é claro.']
    },
    {
        id: '3',
        title: 'Chat 3',
        questions: ['Quantos vertices tem um cubo ?'],
        answers: ['Um cubo tem 8 vertices.']
    }
];

export const useChatsStore: () => [Array<Chat>, ChatStore] = () => {
    const [chats, dispatch] = useState<Array<Chat>>(() => initialChats);
    return [chats, chatsStore(chats, dispatch)];
};