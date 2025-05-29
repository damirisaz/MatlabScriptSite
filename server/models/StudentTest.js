import mongoose from "mongoose";

const StudentTestSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // ID студента
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },     // ID теста
    answerFile: { type: String }, // Файл ответа (TXT)
    status: { type: String, enum: ["pending", "submitted", "graded"], default: "pending" }, // Статус теста
    score: { type: Number, default: null } // Оценка
}, { timestamps: true });

export default mongoose.model("StudentTest", StudentTestSchema);
