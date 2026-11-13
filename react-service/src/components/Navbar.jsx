//css
import styles from './Navbar.module.css'

//hooks
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <ul className={styles.container}>
      <li
        onClick={() => {
          navigate('/task/logs')
        }}
      ><i class="bi bi-archive" about='registros' ></i></li>
      <li
        className={styles.add_task_button}
        onClick={() => { navigate('/task/create') }}
      >
        <i class="bi bi-patch-plus-fill"></i></li>
      <li
        onClick={() => navigate('/activities')}
      ><i class="bi bi-card-checklist" about='activities'></i></li>
    </ul>
  )

}
export default Navbar