import client from './client';

const login = (identifier, password) => client.post('/auth/local', { identifier, password });
const register = (username, email, password) => client.post('/auth/local/register', { username, email, password });

export default {
  login, register,
};