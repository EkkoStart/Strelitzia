class AddCountReq{
    type='add_count_req';
    message={
        fromId:null,
        toId:null
    }
  

    constructor(fromId,toId){
        this.message.fromId = fromId
        this.message.toId = toId
    }
}

export default AddCountReq