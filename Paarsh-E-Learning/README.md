# Node modules
node_modules/
*/node_modules
*/*/node_modules

# Environment variables
.env
.env.local
.env.development.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Build directories
build/
dist/
*/build
*/dist

# Uploads (if not needed in repo)
uploads/
*/uploads

# MongoDB files
*.ns
*.0
mongod.lock

# React
*.cache

# Next.js
.next/
.out/

# Serverless directories
.serverless/

# Temporary folders
tmp/
temp/

# Package manager specific
package-lock.json
yarn.lock

# 📚 Paarsh E-Learning Platform

A Full Stack MERN based E-Learning Web Application.

## 🚀 Features
- Student Registration & Login
- Course Enrollment
- Dashboard
- Admin Management
- MongoDB Database
- REST API backend
- React Frontend

---

## 🛠 Tech Stack
Frontend: React  
Backend: Node.js + Express  
Database: MongoDB  

---

## 📁 Project Structure

```
Paarsh-E-Learning/
   ├── server/          # backend API
   ├── student-board/   # frontend React app

Paarsh-Edu-Platform/
   ├── models/
   ├── views/
   ├── routes/
```

---

## ⚙️ Installation

### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd student-board
npm install
npm start
```

---

## ❌ Ignored Files
The following are NOT pushed to GitHub:
- node_modules
- .env
- build files
- dependencies

Handled via `.gitignore`.

---

## 👨‍💻 Author
Harshad More
