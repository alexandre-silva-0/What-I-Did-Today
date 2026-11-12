import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import Home from './pages/Home/Home';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
