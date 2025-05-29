import React, { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const StudentTestCard = ({ studentTest }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Выберите файл перед отправкой');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentTestId', studentTest._id);

        try {
            await axios.post('/tests/uploadAnswer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Файл успешно отправлен!');
        } catch (error) {
            toast.error('Ошибка при отправке файла');
        }
    };

    return (
        <div className="p-4 border rounded shadow bg-white mb-4">
            <h2 className="text-xl font-semibold">{studentTest.test.title}</h2>
            <p className="text-gray-600">{studentTest.test.description}</p>
            <p className="text-sm text-gray-500 mt-1">Статус: {studentTest.status}</p>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                    className="border p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Отправить файл
                </button>
            </form>
        </div>
    );
};

export default StudentTestCard;
