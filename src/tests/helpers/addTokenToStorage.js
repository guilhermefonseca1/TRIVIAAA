export function getTokenFromStorage(key) {
  const request = localStorage.getItem(key);

  return request;
}

export function saveTokenToStorage(token) {
  localStorage.setItem('token', token);
}

// export const addToken  = (token) => {
//   if (!JSON.parse(localStorage.getItem('token'))) {
//     localStorage.setItem('token', JSON.stringify([]));
//   }
//   if (token) {
//     // const listedTokens = getToken('token');
//     saveTokens(token);
//   }
// };