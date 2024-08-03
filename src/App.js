import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
function App() {
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/log-in' element={<Login></Login>}></Route>
      </Routes>

    </>
  );
}

export default App;
