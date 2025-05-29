import StudentTest from "../models/StudentTest.js";
import { runOctaveScript } from "./runOctaveScript.js";
import Test from "../models/Test.js";

// Студент загружает файл с ответами
export const submitAnswer = async (req, res) => {
    try {
        const { testId } = req.body;
        const answerFile = req.file.path;

        const studentTest = await StudentTest.findOne({ test: testId, student: req.userId });

        if (!studentTest) {
            return res.status(404).json({ message: "Тест не найден или не назначен вам" });
        }

        studentTest.answerFile = answerFile;
        studentTest.status = "submitted";

        await studentTest.save();
        res.json({ message: "Ответ загружен", studentTest });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при загрузке ответа" });
    }
};

// Получить ответы студентов (для преподавателя)
export const getStudentAnswers = async (req, res) => {
    try {
        const { testId } = req.params;

        const studentAnswers = await StudentTest.find({ test: testId }).populate("student");

        res.json(studentAnswers);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении ответов" });
    }
};

// Оценить тест студента
export const gradeTest = async (req, res) => {
    try {
        const { studentTestId } = req.body;
        console.log('ID, пришедший от клиента:', req.body.studentTestId);
        const studentTest = await StudentTest.findById(studentTestId).populate('test');
        if (!studentTest) {
            return res.status(404).json({ message: "Тест не найден" });
        }

        // Проверка на наличие файлов
        if (!studentTest.answerFile || !studentTest.test || !studentTest.test.fileUrl) {
            return res.status(400).json({ message: "Нет необходимых файлов для проверки" });
        }

        console.log('Используется scriptPath:', studentTest.test.fileUrl);
        //console.log('Содержимое папки:', fs.readdirSync(path.dirname(studentTest.test.fileUrl)));

        const isCorrect = await runOctaveScript(studentTest.test.fileUrl, studentTest.answerFile);
        
       

       
        const score = isCorrect ? 100 : 0;

        studentTest.score = score;
        studentTest.status = "graded";
        studentTest.result = isCorrect; 
        await studentTest.save();


        res.json({ message: "Тест оценён", studentTest });
    } catch (error) {
        console.error('Ошибка при оценке:', error);
        res.status(500).json({ message: "Ошибка при оценке теста" });
    }
};
