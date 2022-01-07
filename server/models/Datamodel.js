import mongoose from 'mongoose'

const dataSchema=new mongoose.Schema({
    name:String,
    DOB:String,
    email:String,
});

const Datamodel=mongoose.model('detail',dataSchema);

export default Datamodel;