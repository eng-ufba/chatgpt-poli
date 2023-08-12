import { isUndefined } from "lodash";
import React from "react";
import { useState } from "react";
import { generateUniqueId } from "../../utils";

type Chat = {
    id: string,
    title: string,
    questions: Array<string>,
    answers: Array<string>
}

type UpdatableChat = {
    id: string
} & Partial<Chat>;

type ChatStore = {
    getAll: () => Array<Chat>;
    getOne: (id: string) => Chat;
    add: (chat: Chat) => void;
    remove: (id: string) => void;
    update: (updatedChat: UpdatableChat) => void;
}

type DispatchChat = React.Dispatch<React.SetStateAction<Array<Chat>>>;

export const chatsStore = (chats: Array<Chat>, dispatch: DispatchChat): ChatStore => {
    const getAll = (): Array<Chat> => {
        return chats;
    };
    const getOne = (id: string): Chat => {
        const chat = chats.find(currentChat => currentChat.id === id);

        if (isUndefined(chat)) {
            throw new Error('Unable to find the chat');
        }

        return chat;
    };
    const add = (chat: Omit<Chat, 'id'>): void => {
        const addedChat = {
            ...chat,
            id: generateUniqueId()
        };
        dispatch((previousChats) => [...previousChats, addedChat]);
    };
    const remove = (id: string): void => {
        dispatch((previousChats) => previousChats.filter(chat => chat.id !== id));
    };
    const update = (updatedChat: UpdatableChat): void => {
        dispatch((previousChats) => previousChats.map(chat => {
            if (chat.id === updatedChat.id) {
                return {...chat, ...updatedChat };
            }
            return chat;
        }))
    };

    return {
        getAll,
        getOne,
        add,
        remove,
        update
    }
}

export const ContextChats = React.createContext({} as unknown as ChatStore);

const initialChats = [
    {
        id: '1',
        title: 'Chat 1',
        questions: ['Qual a velocidade da luz ?'],
        answers: ['300000km por segundo']
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
]

export const useChatsStore: () => [Array<Chat>, ChatStore] = () => {
    const [chats, dispatch] = useState<Array<Chat>>(() => initialChats);
    return [chats, chatsStore(chats, dispatch)];
};