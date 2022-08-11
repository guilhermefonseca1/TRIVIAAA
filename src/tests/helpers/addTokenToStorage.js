export function getTokenFromStorage(key) {
  const request = localStorage.getItem(key);

  return request;
}

export function saveTokenToStorage(token) {
  localStorage.setItem('token', token);
}

// export default function addToCart(id) {
//   // const product = await getDetailProduct(id);
//   if (!localStorage.getItem('cartArray')) {
//   localStorage.setItem('cartArray', '[]');
//   }
//   const cart = JSON.parse(localStorage.getItem('cartArray'));
//   const newArray = [...cart, id];
//   return localStorage.setItem('cartArray', JSON.stringify(newArray));
// }

// };