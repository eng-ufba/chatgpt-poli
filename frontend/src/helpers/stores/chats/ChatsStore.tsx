import { ReactElement, ReactNode } from "react";
import { ContextChats, useChatsStore } from "./hooks";

type StoreProps = {
    children: ReactNode
}

export const ChatsStore = ({ children }: StoreProps): ReactElement => {
    const [_chats, chatsStore] = useChatsStore();

    return <ContextChats.Provider value={chatsStore}>
        { children }
    </ContextChats.Provider>
}