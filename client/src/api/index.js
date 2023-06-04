import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_HOST;

const getAPIClient = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
});

getAPIClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Token ${localStorage.getItem('igaming')}`;
    return config;
})

export const API = {
    auth: {
        login: async ({username, password}) => {
            const sendData = {
                "username": username,
                "password": password,
            };
            const answer = await axios.post(`${API_BASE_URL}/api/v1/token/login/`, sendData);
            return answer;
        },
        logout: async () => {
            const answer = await getAPIClient.post('/token/logout/');
            return answer;
        },
        register: async ({email, username, password}) => {
            const sendData = {
                email,
                username,
                password,
            };
            const answer = await axios.post(`${API_BASE_URL}/api/v1/users/`, sendData);
            return answer;
        },
    },
    games: {
        getGames: async () => {
            const answer = await getAPIClient.get('/games/');
            return answer;
        },
        create: async ({name, description, url, type}) => {
            const data = {
                name,
                description,
                url,
                type
            }
            const answer = await getAPIClient.post('/games/', data);
            return answer;
        },
        update: async ({id, name, description}) => {
            const data = {
                name,
                description,
            }
            const answer = await getAPIClient.patch(`/games/${id}/`, data);
            return answer;
        },
        delete: async ({id}) => {
            const answer = await getAPIClient.delete(`/games/${id}/`);
            return answer;
        },
        typesGames: async () => {
            const answer = await getAPIClient.get('/types-games/');
            return answer;
        },
        getGameById: async ({id}) => {
            const answer = await getAPIClient.get(`/games/${id}/`);
            return answer;
        },

    },
    profile: {
        adminstatus: async () => {
            const answer = await getAPIClient.get('/profile/adminstatus/');
            return answer;
        }
    },
    types: {
        getTypes: async () => {
            const answer = await getAPIClient.get('/types/');
            return answer;
        },
        postTypes: async ({name, info}) => {
            const data = {
                name,
                info
            }
            const answer = await getAPIClient.post('/types/', data);
            return answer;
        },
        putTypes: async ({id, name, info}) => {
            const data = {
                name,
                info
            }
            const answer = await getAPIClient.put(`/types/${id}/`, data);
            return answer;
        },
        deleteTypes: async ({id}) => {
            const answer = await getAPIClient.delete(`/types/${id}/`);
            return answer;
        },


    }
}
