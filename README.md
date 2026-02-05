# 🛒 E-Commerce Store (Full-Stack)

A simple **full-stack e-commerce application** with a modern frontend and a Node.js backend. The project is structured as separate **client** and **server** applications and is suitable for learning, demos, and portfolio use.

---

## 🚀 Tech Stack

### Frontend (Client)
- Vite + JavaScript
- HTML5 / CSS3
- REST API integration

### Backend (Server)
- Node.js
- Express.js
- Nodemon (development)
- JSON-based data storage

---

## 📁 Project Structure

```
ecommerce-store/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── data/
│   │   └── products.json
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <repo-url>
cd ecommerce-store
```

### 2️⃣ Run Backend (Server)
```powershell
cd server
npm install
npm run dev
```

### 3️⃣ Run Frontend (Client)
```powershell
cd client
npm install
npm run dev
```

---

## 🔗 API Overview

| Method | Endpoint | Description |
|------|--------|-------------|
| GET | /products | Fetch all products |
| GET | /products/:id | Fetch product by ID |

---

## 🧠 Key Features
- Modular client–server architecture
- RESTful API design
- Dynamic product rendering
- Easy to extend with database & auth

---

## 🐛 Common Issues
- Ensure `products.json` contains valid JSON
- No trailing commas
- Proper brackets and quotes

---

## 👤 Author
**Shafeeque Haider**  
Aspiring Full-Stack / Data Professional
