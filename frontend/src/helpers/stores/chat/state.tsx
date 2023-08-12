export type Chat = {
    id: string,
    title: string,
    questions: Array<string>,
    answers: Array<string>
}

export type State = {
    chats: Array<Chat>,
    activeChatIndex: number
}