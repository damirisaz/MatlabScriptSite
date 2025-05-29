Веб-приложение на MERN-стеке (MongoDB, Express, React, Node.js) для автоматизированного тестирования студентов с использованием MATLAB-совместимых скриптов.

## 📦 Стек технологий

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (через Mongoose)
- **Другие**: Octave CLI, Multer, JWT

---

### 1. Клонировать репозиторий и Установка Node.js и npm

```
bash
git clone https://github.com/damirisaz/MatlabScriptSite.git
cd MatlabScriptSite

```
Установите npm и node.js и разрешить его использование (если есть необходимость)
https://nodejs.org/en/download
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Работа с базой данных

Зарегистрируйтесь на MongoDB Atlas.

Создайте новый кластер и пользователя.
Находясь в папке server, установите mongodb
```
cd server
npm install mongodb
```
Для подключения к базе данных, выберите connect->drivers->node.js

Скопируйте строку подключения и вставьте в свой index.js в server, по примеру имеющейся там ссылки:
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority 

Подставьте свои данные в .env. (Крайне важно установить все параметры в env, в качестве порта можно использовать 3002, в качестве JWT_SECRET любую комбинацию латиницы и цифр наугад.

Для контроля над базой данных удобно использовать MONGODBCOMPASS
Перед запуском сервера не забудьте добавить IP-адрес в список разрешенных

### 3. Подготовка для работы с Backend.

Установка express
```
npm install express
```

Установка mongoose, cors, bcryptjs, dotenv, jsonweboken

```
npm i mongoose cors bcryptjs dotenv jsonwebtoken
```

```
npm i nodemon -D
npm i multer
npm i react-toastify
npm i react-redux
npm i axios

```

### 4. Подготовка для работы с Frontend.
```
cd ..
npm install -D tailwindcss postcss autoprefixer
npm install -D tailwindcss@3
npm install react-router-dom
npm install @reduxjs/toolkit
npm install axios
npm install react-redux
npm i react-toastify
npm i multer
```

### 5. Скачайте Octave.

Как только все будет готово, переходите в server и запускайте его

```
cd ..
cd server
npm run dev
```

После запуска сервера можно переходить к запуску клиента (в отдельном терминале)

```
cd client
npm run start
```


Для корректировки баз данных можно воспользоваться MongoDBCompass.
