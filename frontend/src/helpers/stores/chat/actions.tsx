import { Chat } from "./state";

type ActionType = 'ADD_CHAT' | 'DELETE_CHAT' | 'UPDATE_CHAT' | 'UPDATE_ACTIVE_CHAT_INDEX';

type ActionsData = {
    CHAT: {
        [keyof: string]: ActionType;
    },
    ACTIVE_CHAT_INDEX: {
        UPDATE: 'UPDATE_ACTIVE_CHAT_INDEX'
    }
}

export const ACTIONS: ActionsData = {
    CHAT: {
        ADD: 'ADD_CHAT',
        DELETE: 'DELETE_CHAT',
        UPDATE: 'UPDATE_CHAT',
    },
    ACTIVE_CHAT_INDEX: {
        UPDATE: 'UPDATE_ACTIVE_CHAT_INDEX'
    }
};

export type Action = {
    type: ActionType,
    payload?: {
        chat?: Chat,
        activeChatIndex?: number
    }
}
