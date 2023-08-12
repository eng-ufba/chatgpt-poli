import { ACTIONS, Action } from "./actions";
import { State } from "./state";
import { isUndefined } from "lodash-es";

export const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case ACTIONS.CHAT.ADD: {
            const newChat = action.payload?.chat;

            if (isUndefined(newChat)) {
                console.warn('New chat was not provided');
                return state;
            }            
            return {...state, chats: [...state.chats, newChat]};
        }
        case ACTIONS.CHAT.DELETE: {
            const deletedChat = action.payload?.chat;

            if (isUndefined(deletedChat)) {
                console.warn('Removed chat was not provided');
                return state;
            }
            return {...state, chats: state.chats.filter(chat => chat.id !== deletedChat.id)};
        }
        case ACTIONS.CHAT.UPDATE: {
            const updatedChat = action.payload?.chat;

            if (isUndefined(updatedChat)) {
                console.warn('Updated chat was not provided');
                return state;
            }
            return {...state, chats: state.chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat)};
        }
        case ACTIONS.ACTIVE_CHAT_INDEX.UPDATE: {
            const newActiveChatIndex = action.payload?.activeChatIndex;

            if(isUndefined(newActiveChatIndex)) {
                return state;
            }
            return {...state, activeChatIndex: newActiveChatIndex};
        }
        default: {
            return state;
        }
    }
} 