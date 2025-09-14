import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI);

const userSchema = mongoose.Schema({
  username : String,
  age:Number,
  email:String,
  password:String,
  posts:[{
    type : mongoose.Schema.Types.ObjectId,
    ref:"Post"
  }]
})

const User = mongoose.model("User",userSchema);
export default User;