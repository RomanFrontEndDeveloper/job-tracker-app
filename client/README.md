# Job Tracker App

Fullstack додаток для відстеження вакансій (Job Tracker), створений з використанням сучасного стеку: React / Next.js + Node.js + MongoDB.

## 🚀 Функціонал

- Реєстрація користувача (bcrypt)
- Логін (JWT авторизація)
- Захищені маршрути (auth middleware)
- CRUD операції для вакансій:
    - створення
    - перегляд
    - редагування
    - видалення

- Фільтрація, пошук і сортування вакансій
- Dashboard зі статистикою

---

## 🧱 Технології

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)
- React Hook Form + Zod

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cookie-parser
- cors

---

## 📁 Структура проєкту

```
job-tracker-app/
  client/        # frontend (Next.js)
  server/        # backend (Node.js + Express)
```

### Backend структура

```
server/src/
  controllers/
  middlewares/
  models/
  routes/
  config/
  app.ts
  server.ts
```

---

## ⚙️ Встановлення та запуск

### 1. Клонувати репозиторій

```bash
git clone https://github.com/your-username/job-tracker-app.git
cd job-tracker-app
```

---

### 2. Backend

```bash
cd server
npm install
```

#### Створити `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

#### Запуск

```bash
npm run dev
```

---

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Авторизація

- JWT токени використовуються для аутентифікації
- Захищені маршрути перевіряються через middleware
- Токен передається через header:

```
Authorization: Bearer <token>
```

---

## 📡 API маршрути

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Jobs

- `GET /api/jobs`
- `POST /api/jobs`
- `GET /api/jobs/:id`
- `PATCH /api/jobs/:id`
- `DELETE /api/jobs/:id`

---

## 🧪 Тестування API

Можна використовувати:

- Thunder Client
- Postman
- Insomnia

---

## ⚠️ Безпека

- Паролі хешуються через bcrypt
- JWT_SECRET зберігається в `.env`
- `.env` не додається в Git
- MongoDB доступ через Atlas

---

## 🌐 Деплой (план)

- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## 👨‍💻 Автор

Roman Okhremov
Frontend Developer (React / TypeScript)

---

## 📌 Примітка

Це навчальний fullstack проєкт для прокачки навичок frontend та backend розробки.
