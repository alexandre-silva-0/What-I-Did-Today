import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store'

//redux
import { useSelector } from 'react-redux';

//pages
import Home from './pages/Home/Home';
import CreateTask from './pages/CreateTask/CreateTask';
import TaskDetails from './pages/TaskDetails/TaskDetails';
import LoadingScreen from './components/LoadingScreen'
import Toast from './components/Toast';
import Logs from './pages/Logs/Logs';
import Assignments from './pages/Assignments/Assignments';
import CreateAssignment from './pages/CreateAssignment/CreateAssignment';
import AssignmentDetails from './pages/AssignmentDetails/AssignmentDetails';

function AppRoutes() {

  const { loading } = useSelector((state) => state.task)

  return (
    <>
      {loading && (<LoadingScreen />)}

      <Toast />

      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/task/create' element={<CreateTask />}></Route>
        <Route path='/task/:id' element={<TaskDetails />}></Route>
        <Route path='/tasks/logs' element={<Logs />}></Route>
        <Route path='/activities' element={<Assignments />}></Route>
        <Route path='/assignment/create' element={<CreateAssignment />}></Route>
        <Route path='/assignment/:id' element={<AssignmentDetails />}></Route>
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
