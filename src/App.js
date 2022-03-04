import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Home from './pages/Home'
import Subcribe from './pages/Subcribe';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import Transaction from './pages/Transaction';
import AddBook from './pages/AddBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/subcribe' element={<Subcribe />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/detail/:id' element={<Detail />} />
        <Route exact path='/transaction' element={<Transaction />} />
        <Route exact path='/add-book' element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
