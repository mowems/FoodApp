import client from './client';

const endpoint = '/chows?populate=*';

const getChows = () => client.get(endpoint);

export default {
  getChows,
};