import { isUndefined } from "lodash";
import React from "react";
import { useState } from "react";
import { generateUniqueId } from "../../utils";
import { Chat, ChatStore, DispatchChat, UpdatableChat } from "./types";

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