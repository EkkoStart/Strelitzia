class AuthReq {
    type = "auth_req";
    message = {
        token: null
    }
    

    constructor(token){
        this.message.token = token
    }
}

export default AuthReq