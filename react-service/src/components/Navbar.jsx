import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <ul className={styles.container}>
      <li><i class="bi bi-archive-fill" about='registros' ></i></li>
      <li className={styles.add_task_button}><i class="bi bi-patch-plus-fill"></i></li>
      <li><i class="bi bi-card-checklist" about='pendencias'></i></li>
    </ul>
  )
}
export default Navbar