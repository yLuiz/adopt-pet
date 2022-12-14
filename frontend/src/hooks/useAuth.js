import api from '../utils/api';
import useFlashMessage from './useFlashMessage';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);
  
  async function login(user) {
    let msgText = "Login realizado com sucesso";
    let msgType = "success";

    try {

      const data = await api.post('/users/login', user).then(response => response.data);

      await authUser(data);

      setFlashMessage(msgText, msgType);
    } catch (err) {
      msgText = err.response.data.message;
      msgType = "error";

      console.log(err);

      setFlashMessage(msgText, msgType);
    }
  }
  
  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));

    navigate('/');
  }

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user).then(response => response.data);      
      await authUser(data);
    } 
    catch(err) {
      msgText = err.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  function logout() {
    const msgText = "Logout realizado com sucesso";
    const msgType = 'success';

    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.Authorization = undefined;
    navigate('/login');

    setFlashMessage(msgText, msgType);
  }

  return { authenticated, register, logout, login };
}