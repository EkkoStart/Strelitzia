class Message {
    type = null;
    fromId = null;
    username = null;
    avatar = null;
    content = null;
    msgType = null;

    constructor(type,fromId,username,avatar,content,msgType){
        this.type = type
        this.fromId = fromId
        this.username = username
        this.avatar = avatar
        this. content = content
        this.msgType = msgType 
    }
}

export default Message