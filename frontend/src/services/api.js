import axios from 'axios';
const client=axios.create({baseURL:import.meta.env.VITE_API_URL || 'http://localhost:5000/api'});
client.interceptors.request.use(c=>{const t=localStorage.getItem('relief_token'); if(t)c.headers.Authorization=`Bearer ${t}`; return c;});
export const getError=e=>e.response?.data?.message || 'Could not reach the server. Please try again.';
export default client;
