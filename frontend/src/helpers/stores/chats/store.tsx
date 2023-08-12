import { ReactElement, ReactNode } from "react";
import { ContextChats, useChatsStore } from "./facade";

type StoreProps = {
    children: ReactNode
}

export const Store = ({ children }: StoreProps): ReactElement => {
    const [chats, chatsStore] = useChatsStore();

    return <ContextChats.Provider value={chatsStore}>
        { children }
    </ContextChats.Provider>
}