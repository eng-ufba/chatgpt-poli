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
        console.error('An error ocurred: ', error);
        return null;
    }
}