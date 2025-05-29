import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    title:   // Название теста
    {
        type: String, 
        required: true
    },
    description: // Описание теста
    { 
        type: String
    },         
    fileUrl: {  // MATLAB-скрипт
        type: String,
        required: true
    }, 
    createdBy: // Автор (преподаватель)
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    }, 
}, { timestamps: true });

export default mongoose.model("Test", TestSchema);
