import axios from 'axios';

export const getTrophies = async() => axios.get("/api/getTrophies");

export const getUser = async() => axios.get("/api/getUserData");