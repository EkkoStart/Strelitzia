class SendToAllReq {
    type = "group_req";
    message = {
        fromId:null,
        msgId:null,
        gid:null,
        content:null
    }
    

    constructor(fromId,gid,content,msgId){
        this.message.fromId = fromId 
        this.message.gid = gid
        this.message.msgId = msgId
        this.message.content = content
    }
}

export default SendToAllReq