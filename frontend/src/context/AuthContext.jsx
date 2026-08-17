import {createContext,useContext,useState} from 'react';
import api,{getError} from '../services/api.js';

const AuthContext=createContext();
export const useAuth=()=>useContext(AuthContext);

export function AuthProvider({children}){
  const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem('relief_user')||'null'));
  const [notice,setNotice]=useState(null);
  const flash=(message,type='success')=>{setNotice({message,type});setTimeout(()=>setNotice(null),4000)};
  const store=({user,token})=>{setUser(user);localStorage.setItem('relief_user',JSON.stringify(user));localStorage.setItem('relief_token',token)};
  const login=async(email,password)=>{try{const {data}=await api.post('/auth/login',{email,password});store(data);flash(`Welcome back, ${data.user.full_name}!`);return data.user}catch(error){throw new Error(getError(error))}};
  const register=async(form)=>{try{const {data}=await api.post('/auth/register',form);store(data);flash('Your account has been created.');return data.user}catch(error){throw new Error(getError(error))}};
  const updateUser=async(form)=>{try{const {data}=await api.patch('/auth/profile',form);setUser(data);localStorage.setItem('relief_user',JSON.stringify(data));flash('Profile updated successfully.');return data}catch(error){throw new Error(getError(error))}};
  const logout=()=>{setUser(null);localStorage.removeItem('relief_user');localStorage.removeItem('relief_token');flash('You have been signed out.','info')};
  return <AuthContext.Provider value={{user,login,register,updateUser,logout,notice,flash}}>{children}</AuthContext.Provider>;
}
