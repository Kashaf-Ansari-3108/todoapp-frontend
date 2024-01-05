import axios from "axios";

const instance = axios.create({
    baseURL: 'https://delightful-life-jacket-wasp.cyclic.app/api'
})

export default instance;