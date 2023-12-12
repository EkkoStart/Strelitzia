import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const UidKey = 'UID'

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

export function setId(id){
  return Cookies.set(UidKey,id);
}

export function getId(){
  return Cookies.get(UidKey)
}