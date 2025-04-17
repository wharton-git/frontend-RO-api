import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Input from './pages/Input';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
