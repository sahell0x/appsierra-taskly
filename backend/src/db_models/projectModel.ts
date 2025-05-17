import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    createdAt:{type:String,required:true}
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
