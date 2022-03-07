import axios from 'axios';

const BASE_URL = '/';

export function getProducts() {
        return axios.get(`${BASE_URL}/menuitem`)
                .then(response => response.data);
}
export function getCartProducts(cart) {
        return axios.post(`${BASE_URL}/menu/`, {cart})
                .then(response => response.data);
}
/*export function login (data) {
  return axios.post(`${BASE_URL}/api/auth`,
                    { name: data.name, password: data.password })
    .then(response => {
       localStorage.setItem('x-access-token', response.data.token);
       localStorage.setItem('x-access-token-expiration',
                            Date.now() + 2 * 60 * 60 * 1000);
      return response.data})
    .catch(err => Promise.reject('Authentication Failed!'));
}
*/
export function pay (data) {
        return axios.get(`${BASE_URL}/pay`,
            { params: { 'this-token': localStorage.getItem('this-token')} })
                .then(response => response.data)
                .catch(err => Promise.reject(err));
}
export function isAuthenticated(){
        return localStorage.getItem('this-token') && localStorage.getItem('this-token-expiration') > Date.now()
}
