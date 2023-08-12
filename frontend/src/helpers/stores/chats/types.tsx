export type Chat = {
    id: string,
    title: string,
    questions: Array<string>,
    answers: Array<string>
}

export type UpdatableChat = {
    id: string
} & Partial<Chat>;

export type CreatableChat = Omit<Chat, 'id'>;

export type ChatStore = {
    getAll: () => Array<Chat>;
    getOne: (id: string) => Chat;
    add: (chat: CreatableChat) => void;
    remove: (id: string) => void;
    update: (updatedChat: UpdatableChat) => void;
}

export type DispatchChat = React.Dispatch<React.SetStateAction<Array<Chat>>>;