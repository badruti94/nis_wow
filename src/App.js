import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Home from './pages/Home'
import Subcribe from './pages/Subcribe';
import Profile from './pages/Profile';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/subcribe' element={<Subcribe />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/detail/:id' element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
