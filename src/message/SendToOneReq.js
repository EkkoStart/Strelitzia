class SendToOneReq {
    type = "chat_req";
    message = {
        fromId:null,
        toId:null,
        msgId:null,
        content:null
    }
    

    constructor(fromId,toId,content,msgId){
        this.message.fromId = fromId 
        this.message.toId = toId
        this.message.msgId = msgId
        this.message.content = content
    }
}

export default SendToOneReq