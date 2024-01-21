import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  return Cookies.set(TokenKey, token,{expires:expires})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
