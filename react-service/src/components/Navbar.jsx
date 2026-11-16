//css
import styles from './Navbar.module.css'

//hooks
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <ul className={styles.container}>
      <li
        onClick={() => {
          navigate('/tasks/logs')
        }}
      ><i class="bi bi-archive" about='registros' ></i></li>

      {location.pathname === '/' && (
        <li
          className={styles.add_task_button}
          onClick={() => { navigate('/task/create') }}
        >
          <i class="bi bi-plus-circle-fill"></i>
        </li>
      )}

      {location.pathname === '/tasks/logs' && (
        <li
          className={styles.add_task_button}
          onClick={() => { navigate('/') }}
        >
          <i class="bi bi-house-fill"></i>
        </li>
      )}

      <li
        onClick={() => navigate('/activities')}
      ><i class="bi bi-card-checklist" about='activities'></i></li>
    </ul>
  )

}
export default Navbar