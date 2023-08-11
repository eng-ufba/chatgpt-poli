import { useReducer } from "react";
import { State } from "./state";
import { reducer } from "./reducer";

const initialState: State = {
    chats: [
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
    ],
    activeChatIndex: 0
}

export const useReducerFn = () => {
    return useReducer(reducer, initialState);
}