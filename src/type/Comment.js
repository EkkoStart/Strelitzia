class Comment{
    id=null;
    uid=null;
    username=null;
    avatar=null;
    content=null;
    createTime=null;
    thumbNum=null;
    constructor(id,uid,username,avatar,content,thumbNum,createTime){
        this.id=id
        this.uid=uid
        this.username=username
        this.avatar=avatar
        this.content =content
        this.thumbNum=thumbNum
        this.createTime=createTime
    }
}
export default Comment