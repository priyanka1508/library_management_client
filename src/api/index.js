import axios from 'axios';

const url = 'http://localhost:8081';

export const getWelcome = () => axios.get(`${url}/welcome`);
export const getBooks = () => axios.get(`${url}/allbooks`);
export const returnBookAPI = (id, payload) => axios.post(`${url}/books/return/${id}`,payload);
export const borrowBookAPI = (id) => axios.post(`${url}/books/borrow/${id}`);


