import { useState } from "react";
import { chatsStore } from "./facade";
import { Chat, ChatStore } from "./types";
import React from "react";
import { isNull } from "lodash-es";

export const ContextChats = React.createContext({} as unknown as ChatStore);

const getChatsFromCache = (): Array<Chat> => {
    const rawChats = localStorage.getItem('chats');
    
    if (isNull(rawChats)) {
        return [];
    }
    const chats = JSON.parse(rawChats) as Array<Chat>;
    return chats;
}

export const useChatsStore: () => [Array<Chat>, ChatStore] = () => {
    const [chats, dispatch] = useState<Array<Chat>>(() => getChatsFromCache());
    return [chats, chatsStore(getChatsFromCache(), dispatch)];
};