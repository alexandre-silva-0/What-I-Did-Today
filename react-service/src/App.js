import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store'

//pages
import Home from './pages/Home/Home';
import CreateTask from './pages/CreateTask/CreateTask';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/task/create' element={<CreateTask />}></Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className={styles.App}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
