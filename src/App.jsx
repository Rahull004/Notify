import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AllNotes } from './pages/AllNotes';
import { Note } from './pages/Note';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import SignUpCllg from './pages/SignUpCllg';
import TiptapEditor from './Editor/Tiptap';
import ChatbotPopup from './components/Chatbot/ChatbotPopup';
import ProfilePage from './pages/ProfilePage';
import { ForgetPasswordEmail } from './pages/ForgetPasswordEmail';
import { ForgetPasswordNewPassword } from './pages/ForgetPasswordNewPassword';
import Error from './pages/Error/Error';
import PdfViewer from './components/PdfViewer';
import { AuthRedirect } from './components/AuthRedirect';
import { GuestRedirect } from './components/GuestRedirect';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allnotes" element={<AuthRedirect><AllNotes /></AuthRedirect>} />
        <Route path="/notes/:id" element={<AuthRedirect><Note /></AuthRedirect>} />
        <Route path="/signup" element={<GuestRedirect><SignUp /></GuestRedirect>} />
        <Route path="/signin" element={<GuestRedirect><SignIn /></GuestRedirect>} />
        <Route path="/note/:id" element={<AuthRedirect><TiptapEditor /></AuthRedirect>} />
        <Route path="/draft/:id" element={<AuthRedirect><TiptapEditor /></AuthRedirect>} />
        <Route path="/signupcllg" element={<SignUpCllg />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pdfviewer/:id" element={<AuthRedirect><PdfViewer /></AuthRedirect>} />

        <Route path="/profile" element={<AuthRedirect><ProfilePage /></AuthRedirect>} />
        <Route path="/forgetpassword/email" element={<ForgetPasswordEmail />} />
        <Route path="/forgetpassword" element={<ForgetPasswordNewPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ChatbotPopup />
    </div>
  );
}