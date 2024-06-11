import {Routes,Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { AllNotes } from './pages/AllNotes';
import { Note } from './pages/Note';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/allnotes" element={<AllNotes />}/>
      <Route path="/notes/:id" element={<Note />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
    </Routes>
    </div>
  )
}