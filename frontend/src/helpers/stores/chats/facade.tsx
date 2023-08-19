import { isUndefined } from "lodash";
import { generateUniqueId } from "../../utils";
import { Chat, ChatStore, DispatchChat, UpdatableChat } from "./types";

const saveChatsOnStorage = (chats: Array<Chat>): void => {
    const rawChats = JSON.stringify(chats);
    localStorage.setItem('chats', rawChats)
}

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
        dispatch((previousChats) => {
            const chats =  [...previousChats, addedChat];
            saveChatsOnStorage(chats);
            return chats;
        });
    };

    const remove = (id: string): void => {
        dispatch((previousChats) => {
            const chats = previousChats.filter(chat => chat.id !== id);
            saveChatsOnStorage(chats);
            return chats;
        });
    };
    
    const update = (updatedChat: UpdatableChat): void => {
        dispatch((previousChats) => {
            const chats = previousChats.map(chat => {
                if (chat.id === updatedChat.id) {
                    return {...chat, ...updatedChat };
                }
                return chat;
            });

            saveChatsOnStorage(chats);
            return chats;
        })
    };

    return {
        getAll,
        getOne,
        add,
        remove,
        update
    }
}