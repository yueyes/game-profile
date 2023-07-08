import axios from 'axios';

export const getTrophies = async() => axios.get("/api/getTrophies");