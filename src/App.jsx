import {Routes,Route} from 'react-router-dom';
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
import Error from './pages/Error/Error';

export default function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/allnotes" element={<AllNotes />}/>
      <Route path="/notes/:id" element={<Note />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/note/:id" element={<TiptapEditor />} />
      <Route path="/signupcllg" element={<SignUpCllg />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="*" element={<Error />}/>

    </Routes>
    <ChatbotPopup />
    </div>
  )
}