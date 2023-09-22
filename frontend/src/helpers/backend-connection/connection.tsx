import axios from 'axios';
// require("dotenv").config();

// export const logURL = () => {
//    console.log(process.env.BACKEND_URL);
// }

axios.defaults.baseURL = 'http://localhost:5000';

type PingResponse = 'pong';

export const ping = async (): Promise<PingResponse | null> => {
    try {
        const { data, status } = await axios.get<PingResponse>('/ping');
    
        if(status === 200 && data === 'pong') {
            return 'pong';
        } else {
            return null;
        }
    }
    catch(error) {
        console.error(error);
        return null;
    }
}

export type Course = "engenharia de controle e automação" | "engenharia química";
type SendQuestionResponse = string;

export const sendQuestionRequest = async(question: string, course: Course): Promise<SendQuestionResponse | Error> => {
    try {
        const { data, status } = await axios.post<SendQuestionResponse>('/question', { question, course });

        if (status === 200) {
           return data;
        } else {
            console.error('Unable to generate an answer to the question');
            return data;
        }
    }
    catch(error) {
        console.error(error);
        return new Error('Unable to generate an answer to the question');
    }
}