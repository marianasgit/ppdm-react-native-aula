import axios from 'axios';

const apiLivraria = axios.create({
    baseURL:'http://10.107.144.30:3000'
});

export default apiLivraria;