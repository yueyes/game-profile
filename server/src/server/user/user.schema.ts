import { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: { type: String, required: true },
  token: { type: String, required: true },
  email : {type : String,required : true},
  displayName : {type : String, required:true},
  icon : {type:String}
});