export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

export function loginVerify(userInfo){
    const username = userInfo.username;
    const password = userInfo.password;

    if(username == "" || password == ""){
      return "用户名或密码不能为空"
    }
    if(username.length < 4 ){
      return "用户名长度不能小于4"
    }
    if(password.length < 6){
      return "密码长度不能小于6"
    }
    return "success"
}

export function registerVerify(registerInfo){
  const username = registerInfo.username;
  const password = registerInfo.password;

    if(username == "" || password == ""){
      return "用户名或密码不能为空"
    }
    if(username.length < 4 ){
      return "用户名长度不能小于4"
    }
    if(password.length < 6){
      return "密码长度不能小于6"
    }
    return "success"
}