import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { Home } from './pages/Home';
import { AllNotes } from './pages/AllNotes';
import { NoteCard } from './components/NoteCard';
import { Note } from './pages/Note';

export default function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/allnotes" element={<AllNotes />}/>
      <Route path="/notes/:id" element={<Note />}/>
    </Routes>
    </div>
  )
}