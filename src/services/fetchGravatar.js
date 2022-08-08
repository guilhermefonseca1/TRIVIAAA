import { MD5 } from 'crypto-js';

const fetchGravatar = async (email) => {
  const user = MD5(email).toString();
  const response = await fetch(`www.gravatar.com/avatar/${user}`);
  const json = await response.json();
  return response;
};
export default fetchGravatar;
