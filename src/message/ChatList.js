class ChatList { 
    id = null;
    username = null;
    avatar = null;
    count = null;
    lastMsg = null;
    earlyTime = null;
    lastTime = null;

    constructor(id,username,avatar,count,lastMsg,lastTime){
        this.id = id
        this.username = username
        this.avatar = avatar
        this.count = count
        this.lastMsg = lastMsg
        this.lastTime =lastTime
    }
}

export default ChatList