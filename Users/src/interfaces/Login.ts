import { ObjectId } from "mongodb"

export default interface Login_Information { 
    id : ObjectId,
    username : string,
    password : string
}