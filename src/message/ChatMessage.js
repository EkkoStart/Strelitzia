class ChatMessage {
    fromId = null;
    username = null;
    avatar = null;
    content = null;
    msgType = null;
    createTime =null;

    constructor(fromId,username,avatar,content,msgType,createTime){
        this.fromId = fromId
        this.username = username
        this.avatar = avatar
        this. content = content
        this.msgType = msgType 
        this.createTime = createTime
    }
}

export default ChatMessage