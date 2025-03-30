# Notify  

Notify is a versatile note-managing and sharing platform designed to help users create, manage, and share their notes with the community or keep them for personal use. The application also features an integrated chatbot to answer user queries and provide real-time support.  

---

## Table of Contents  

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [User Flow](#user-flow)  
- [App Pics](#app-pics)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Contributing](#contributing)  

---

## Features  

- **Note Creation & Editing:**  
  Create notes using an advanced editor that supports rich text formatting, tables, code snippets, and more.  
- **PDF Attachment:**  
  Attach and manage PDFs within each note.  
- **Note Sharing:**  
  Share notes with the community or keep them private.  
  - Organized into **Community**, **Personal**, and **Draft** categories.  
- **User Authentication:**  
  Secure login via Google Auth.  
- **Password Recovery:**  
  Reset password using a **magic link** sent to the registered email.  
- **Chatbot Assistance:**  
  A Lenma-powered chatbot is available to answer questions and assist users.  
- **Responsive UI:**  
  A modern and responsive design ensuring a smooth experience across devices.  

---

## Tech Stack  

- **Frontend:** React.js  
- **Backend:** Appwrite  
- **Rich Text Editor:** Tiptap Editor  
- **Chatbot:** Lenma-powered Chatbot  
- **Authentication & Recovery:** Google Auth & Magic Link  

---

## User Flow  

### 1. Landing Page  
- **Navigation Bar:**  
  - **Unauthenticated Users:** Options to **Sign In** and **Sign Up**.  
  - **Authenticated Users:** Options to visit **Profile** or view **User Notes**.  
- A clean landing page with introductory content and calls-to-action.  

### 2. Sign In / Sign Up Page  
- Users can authenticate using Google Auth.  
- Upon successful authentication, users are redirected to the **Notes Page**.  

### 3. Forgot Password Recovery  
- If a user forgets their password, they can enter their registered email address.  
- A **magic URL** will be sent to their email.  
- Clicking the **magic link** will redirect them to a password reset page, allowing them to set a new password.  

### 4. Notes Page  
- **Note Categories:**  
  - **Community:** Notes shared with all users.  
  - **Personal:** Private notes accessible only by the user.  
  - **Draft:** Notes saved as drafts if not posted.  
- **Actions:**  
  - **Add Note:** Click the add button at the top to open a popup for entering new note details.  
  - **Search:** Use the search bar next to the add button to filter notes.  
- Display of available notes based on the selected category.  

### 5. Note Editor  
- After creating a note, users are directed to an editor with advanced options:  
  - **Rich Formatting:** Add tables, highlight text, choose fonts, and insert code snippets.  
  - **PDF Management:**  
    - Click the **PDFs Option** (top-right) to view attached PDFs.  
    - Use the **Add PDF Button** to upload new PDFs.  
- **Post & Draft Saving:**  
  - Clicking **Post** publishes the note.  
  - Changes are auto-saved as a draft if not posted.  

### 6. Chatbot Assistance  
- A built-in chatbot is available on every page to help answer questions and resolve doubts.  

---

## App Pics  

- **Landing Page:**
  
  ![Landing Page](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743374948/Screenshot_2025-03-31_041753_xs84ro.png)  

- **Sign In / Sign Up Page:**

  ![Sign In / Sign Up](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375287/Screenshot_2025-03-31_042440_tllvoc.png)  

- **Forgot Password Email:**
  
  ![Forgot Password](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375849/Screenshot_2025-03-31_043338_p9wxtt.png)  

- **Profile Page:**
  
  ![Profile Page](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743374946/Screenshot_2025-03-31_041849_pqs1u0.png)  

- **Notes Page:**

  ![Notes Page](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375017/Screenshot_2025-03-31_041945_mnild5.png)  

- **Create Note Pop Up:**
  
  ![Create Note](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375018/Screenshot_2025-03-31_042007_v2srtz.png)  

- **Upload PDF Pop Up:**
  
  ![Upload PDF](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375181/Screenshot_2025-03-31_042238_yvseda.png)  

- **Note Editor:**
  
  ![Note Editor](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375182/Screenshot_2025-03-31_042156_hr3wup.png)  

- **Note Page:**
  
  ![Note Page](https://res.cloudinary.com/dge7dzxe0/image/upload/v1743375207/Screenshot_2025-03-31_042321_wqxnrq.png)  

---

## Installation  

1. **Clone the Repository:**  

   ```bash
   git clone https://github.com/yourusername/noteshare.git
   cd noteshare
   ```  

2. **Install Dependencies:**  

   ```bash
   npm install
   ```  

3. **Start the Application:**  

   ```bash
   npm start
   ```  

4. **Environment Setup:**  
   - Configure any required environment variables for Google Auth, backend APIs, and password recovery in a `.env` file.  

---

## Usage  

- **Authentication:**  
  Sign in or sign up using Google Auth to access your personalized dashboard.  

- **Password Recovery:**  
  Reset your password using the **forgot password** option, which sends a magic link to your email.  

- **Managing Notes:**  
  Create, edit, and manage your notes across various categories.  

- **Rich Note Editing:**  
  Utilize the advanced editor for enhanced note creation and attach PDFs as needed.  

- **Community Interaction:**  
  Share your notes with the community and interact with others.  

- **Chatbot Support:**  
  Use the integrated chatbot for any queries or guidance.  

---

## Contributing  

Contributions are welcome! Please fork the repository and submit a pull request with your changes.  

---

Happy note sharing! 🚀
