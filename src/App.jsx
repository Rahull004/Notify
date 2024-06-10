import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { Home } from './pages/Home';
import { AllNotes } from './pages/AllNotes';

export default function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/allnotes" element={<AllNotes />}/>
    </Routes>
    </div>
  )
}