class sendToAll {
    type = "group_req";
    message = {
        fromId:null,
        username:null,
        avatar:null,
        msgId:null,
        gId:null,
        content:null
    }
    

    constructor(fromId,gId,content,msgId,username,avatar){
        this.message.fromId = fromId 
        this.message.gId = gId
        this.message.msgId = msgId
        this.message.content = content
        this.message.username = username
        this.message.avatar = avatar
    }
}

export default sendToAll