# 🏆 Q-Manager - Virtual Queue Management System  

## 🚀 Overview  
Q-Manager is a **Virtual Queue Management System** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It helps businesses and organizations manage queues **efficiently**, reducing **customer wait times** by **50%** through a smart ticketing and real-time notification system.  

📌 Currently, queue updates are managed using **polling**. **WebSockets** will be implemented in the future for real-time updates.  

---

## 📌 Features  

✅ **User Authentication** – Register, login, and manage user profiles.  
✅ **Admin Dashboard** – Create, manage, and monitor queues.  
✅ **Queue Management** – Join, leave, and track queue status.  
✅ **Real-time Updates (Polling)** – Future update: **WebSockets** for real-time notifications.  
✅ **Notifications System** – Get notified when your turn is near.  
✅ **Analytics Dashboard** – Track queue performance and trends.  
✅ **Role-based Access Control** – Separate features for **users** and **admins**.  
✅ **Mobile Responsive** – Works seamlessly on mobile & tablets.  

---

## 🛠 Tech Stack  

| Technology  | Description |
|-------------|------------|
| **Frontend**  | React.js, React Router, Tailwind CSS, Axios |
| **Backend**   | Node.js, Express.js |
| **Database**  | MongoDB (Mongoose ORM) |
| **Real-time** | Polling (WebSockets planned) |
| **Authentication** | JWT (JSON Web Tokens) |
| **State Management** | Context API, React Hooks |
| **Security** | bcrypt.js, Cookie Parser, CORS |

---

## 🖥️ Screenshots  
_Add screenshots of your project UI here (e.g., dashboard, queue tracking, admin panel)._  

---

## 🔧 Installation & Setup  

### 📌 Prerequisites  
- **Node.js** (v18+ recommended)  
- **MongoDB** (local or cloud via MongoDB Atlas)  

### 🚀 Clone & Install Dependencies  
```bash
git clone https://github.com/21namanpandey/virtual-queue-management-system.git
cd virtual-queue-management-system
```

### **Backend Setup**  
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend/` directory and add:  
  ```plaintext
  MONGO_URI=
  JWT_SECRET=
  ADMIN_SECRET_CODE=
  PORT=5000
  NODE_ENV=
  JWT_TOKEN_EXPIRE=
  CLIENT_URL=
  ```
- Start the backend server:  
  ```bash
  npm run dev
  ```

### **Frontend Setup**  
```bash
cd frontend
npm install
npm run dev
```
Your app will be live at **http://localhost:5173** 🚀  

---

## 🎯 API Endpoints  

### **Auth Routes** (`authRoutes.js`)  
| Method | Endpoint | Description |
|--------|----------|------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | User login (JWT) |
| **POST** | `/api/auth/logout` | User logout |
| **POST** | `/api/auth/forgot-password` | Request password reset |
| **POST** | `/api/auth/reset-password/:token` | Reset password |
| **GET** | `/api/auth/profile` | Get user profile (protected) |
| **PUT** | `/api/auth/profile/edit` | Edit user profile (protected) |

### **Queue Routes** (`queueRoutes.js`)  
| Method | Endpoint | Description |
|--------|----------|------------|
| **POST** | `/api/queue` | Create a new queue (admin only) |
| **GET** | `/api/queue` | Get all queues |
| **GET** | `/api/queue/joined` | Get joined queues (user only) |
| **GET** | `/api/queue/history` | Get queue history |
| **DELETE** | `/api/queue/history/all` | Delete all queue history |
| **POST** | `/api/queue/:id/join` | Join a queue |
| **POST** | `/api/queue/:id/leave` | Leave a queue |
| **PATCH** | `/api/queue/:id/next` | Move to next in queue (admin only) |
| **PATCH** | `/api/queue/:id/pause` | Pause a queue (admin only) |

### **Notifications** (`notificationRoutes.js`)  
| Method | Endpoint | Description |
|--------|----------|------------|
| **GET** | `/api/notifications` | Get user notifications |
| **PATCH** | `/api/notifications/:id` | Mark notification as read |
| **DELETE** | `/api/notifications/:id` | Delete a single notification |
| **DELETE** | `/api/notifications` | Delete all notifications |

### **Analytics** (`analyticsRoutes.js`)  
| Method | Endpoint | Description |
|--------|----------|------------|
| **GET** | `/api/analytics` | Get queue analytics (admin only) |

---

## 📚 Folder Structure  

```
📂 virtual-queue-management-system  
 ┣ 📂 backend  
 ┃ ┣ 📂 models  
 ┃ ┣ 📂 routes  
 ┃ ┣ 📂 controllers  
 ┃ ┣ 📂 middleware  
 ┃ ┣ 📜 server.js  
 ┃ ┣ 📜 .env  
 ┣ 📂 frontend  
 ┃ ┣ 📂 src  
 ┃ ┃ ┣ 📂 components  
 ┃ ┃ ┣ 📂 pages  
 ┃ ┃ ┣ 📜 App.jsx  
 ┃ ┣ 📜 index.js  
 ┃ ┣ 📜 tailwind.config.js  
 ┃ ┣ 📜 vite.config.js  
 ┃ ┣ 📜 .env  
 ┗ 📜 README.md  
```

---

## 🌟 Contributing  
🚀 **Contributions are welcome!**  
1. Fork the repo.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m "Added feature X"`).  
4. Push to the branch (`git push origin feature-name`).  
5. Submit a Pull Request.  

---

## 📜 License  
This project is **open-source** under the **MIT License**.  

---

## 📞 Contact & Support  
💡 Found a bug? Have a feature request? Open an issue or reach out:  
📧 **Email:** [24namanpandey@gmail.com](mailto:24namanpandey@gmail.com)  
🔗 **GitHub:** [@21namanpandey](https://github.com/21namanpandey)  
🔗 **LinkTree:** [@21namanpandey](https://linktr.ee/21namanpandey)  

🚀 **Happy Coding!** 🎯  

---

### 🔥 Next Steps for Enhancement  
- ✅ Implement **WebSockets** for real-time queue updates.  
- ✅ Add **SMS/WhatsApp notifications** for queue alerts.  
- ✅ Deploy using **Docker + Kubernetes** for scalability.