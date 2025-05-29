import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const StudentDashboard = () => {
  const [tests, setTests] = useState([]);
  const [fileMap, setFileMap] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await axios.get('/tests/student');
        setTests(data);
      } catch (err) {
        toast.error('Ошибка загрузки тестов');
      }
    };
    fetchTests();
  }, []);

  const handleFileChange = (e, studentTestId) => {
    setFileMap({ ...fileMap, [studentTestId]: e.target.files[0] });
  };

const handleSubmit = async (studentTestId, testId) => {
  if (!fileMap[studentTestId]) {
    toast.error('Пожалуйста, выберите файл для отправки');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileMap[studentTestId]);
  formData.append('testId', testId);

  try {
    // 1. Отправка ответа
    await axios.post('/tests/uploadAnswer', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success('Файл успешно загружен. Начинается проверка...');

    // 2. Вызов автоматической проверки
    await axios.post('/tests/grade', { studentTestId });
    toast.success('Тест проверен автоматически');

    // 3. Обновить список тестов
    const { data } = await axios.get('/tests/student');
    setTests(data);
  } catch (err) {
    toast.error('Ошибка при отправке или проверке файла');
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Мои тесты</h2>
      <div className="space-y-4">
        {tests.length === 0 && <p>Тестов пока нет.</p>}
        {tests.map((studentTest) => (
          <div key={studentTest._id} className="p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-semibold">{studentTest.test.title}</h3>
            <p>Описание: {studentTest.test.description}</p>
            <p>Статус: <span className="font-medium">{studentTest.status}</span></p>

            {studentTest.status === 'pending' && (
              <div className="mt-2">
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => handleFileChange(e, studentTest._id)}
                />
                <button
                  className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
                  onClick={() => handleSubmit(studentTest._id, studentTest.test._id)}

                >
                  Отправить
                </button>
              </div>
            )}

            {studentTest.status === 'graded' && (
              <div className="mt-2 text-green-600">
                <p>Оценка: {studentTest.score}</p>
                {studentTest.comment && <p>Комментарий: {studentTest.comment}</p>}
              </div>
            )}

            {/* Можно добавить еще статусы, если надо */}
          </div>
        ))}
      </div>
    </div>
  );
};
