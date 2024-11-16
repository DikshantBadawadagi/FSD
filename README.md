

# Real-Time Chat Application

## 🚀 Introduction

The **Real-Time Chat Application** is a modern, full-stack solution for seamless communication. Built with the MERN stack (MongoDB, Express, React, Node.js), this project integrates user authentication, live messaging, and online presence indicators into a responsive web application along with features like posting and commenting on community. It’s ideal for both personal and professional use, emphasizing performance, security, and real-time capabilities.

---

## 🛠️ Features at a Glance

### Core Features
1. **User Authentication**  
   - Secure registration and login using **JWT**.
   - Passwords hashed with industry-standard techniques.
2. **Real-Time Messaging**  
   - Live chat powered by **Socket.io**, without page reloads.  
   - Persistent chat history stored in MongoDB.
3. **User Presence Indicators**  
   - Show online/offline status dynamically.
4. **Interactive User Interface**  
   - React-based chat interface.  
   - Clean and modern UI for users to get used to easily

### Bonus Features  
- **Typing Indicator**: Know when the other user is typing.  
- **Media Messaging**: Share images seamlessly. 
- **Comments and editing profile**: Like any other social media app 
- **Read Receipts**: Track when messages are seen.

---

## 📁 Project Structure

The project is divided into **frontend** and **backend** for modular development:

```
/backend         # Node.js server-side code
/frontend        # React-based client-side code
```

---

## 🎨 UI Demo  

Here’s a snapshot of the user interface:  
*(Attach or describe the main screens: login page, chat window, user list, etc.)*  

1. **Login Page**  
   ![Alt text](./assets/Screenshot%202024-11-16%20201459.png)
   ![Alt text](./assets/Screenshot%202024-11-16%20201440.png)
2. **Chat Window**  
   ![Alt text](./assets/Screenshot%202024-11-16%20200614.png)  
3. **Comment and Like**  
   ![Alt text](./assets/Screenshot%202024-11-16%20200726.png)  
4. **Home Page**
   ![Alt text](./assets/Screenshot%202024-11-16%20200450.png)
5. **Profile Page**
   ![Alt text](./assets/Screenshot%202024-11-16%20200939.png)
6. **Create Media File**
   ![Alt text](./assets/Screenshot%202024-11-16%20200841.png)
---

## 🧑‍💻 How to Run the Project

### Prerequisites  
- **Node.js** (v16+ recommended)  
- **MongoDB** (Cloud or local setup)  
- Package Manager: `npm`

### 1. Clone the Repository  
```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Backend Setup  
```bash
cd backend
npm install
```

Create a `.env` file in the project directory with the following:

```env
PORT=8000
MONGO_URI=<your_mongo_connection_string>
SECRET_KEY=<your_jwt_secret_key>
URL=<Your Local Enviornment >
CLOUD_NAME=<Your Cloudinary Name>
API_KEY=<Cloudinary api key>
API_SECRET=<Api Secret of cloudinary api key>
```

### 3. Frontend Setup  
```bash
cd ../frontend
npm install
```


### 4. Running the Application  
Start both servers:

- **Backend**:  
```bash
cd /projectname
npm run dev
```

- **Frontend**:  
```bash
cd frontend
npm run dev
```

Visit the app at [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Deployment Guide

### Deployment (Blender)
1. Build the frontend for production:
   ```bash
   npm run build
   ```
2. Upload the `frontend/dist` folder to Blender.
3. Start the Project in production:
   ```bash
   npm run start
   ```
4. Set up environment variables in Blender

---

## 🎯 Core Functionality Breakdown

1. **Authentication**  
   - Implemented via **JWT** for secure session management.  
   - Passwords are securely hashed using **bcrypt**.  
   - Enables user registration and login functionality.  

2. **Real-Time Messaging**  
   - Built with **Socket.io** to enable WebSocket connections.  
   - Sends messages in real-time between users.  
   - Depicts **online status** and **typing indicators** when a user is active and typing.  
   - Chat messages are stored persistently in **MongoDB**, allowing users to view past conversations.  

3. **User Posts**  
   - Users can create posts, which other users can like and comment on.  
   - Includes a **real-time notification system**:  
     - Notifies users when their post is liked or commented on.  

4. **User Status Updates**  
   - Utilizes WebSockets to broadcast status changes (online/offline) to all connected users.  

5. **User Profile Management**  
   - Users can set up and customize their **profile**.  
   - Includes options to update **profile bio** and other personal information.  

6. **Frontend User Experience**  
   - **React Context** manages user authentication and application state.  
   - Auto-scroll ensures the latest messages are always visible in the chat window.  
   - Minimalist, intuitive UI for effortless navigation and interaction.  

---

## 🌟 Highlights

- **Scalability**: Modular architecture allows easy scaling for large user bases.  
- **Security**: Follows best practices for password hashing and secure API endpoints.  
- **Performance**: Real-time WebSocket connections minimize latency.

---

## 🛡️ Challenges and Solutions

### Challenge: Real-time user presence  
**Solution**: Used WebSocket events to broadcast status updates dynamically.

### Challenge: Storing media files  
**Solution**: Integrated file uploads with cloud storage services (e.g., Cloudinary).

---

## 🚧 Future Improvements

1. **Group Chats**: Extend functionality to support multi-user conversations.  
2. **Push Notifications**: Notify users of new messages.  
3. **Themes**: Add dark/light mode support.

---

## 💾 Repository & Deployment Links

- **GitHub**: [[Link to repository](https://github.com/DivamSanghvi/LearnieTask.git)](#)  
- **Deployed Project (Blender)**: [[Link to deployed site](https://learnietaskdivamsanghvi.onrender.com/)](#)  

---

## 🛠️ Technologies Used

- **Frontend**: React, Socket.io-client 
- **UI**: ShadCn, Accertinity, Framer motions
- **Backend**: Node.js, Express, Socket.io  
- **Database**: MongoDB  
- **Authentication**: JWT, bcrypt  
- **Cloud Service**: Cloudinary
---

## 📝 License  

This project is licensed under the [MIT License](LICENSE).

---