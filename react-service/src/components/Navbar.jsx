//css
import styles from './Navbar.module.css'

//hooks
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Botão central: "+" na Home, "casa" nas outras telas.
  // O círculo azul é sempre o mesmo; só o ícone troca.
  const center = isHome
    ? { to: '/task/create', icon: 'bi-plus-lg', label: 'Registrar tarefa' }
    : { to: '/', icon: 'bi-house-door-fill', label: 'Início' }

  const sideClass = ({ isActive }) =>
    `${styles.item} ${isActive ? styles.item_active : ''}`

  return (
    <nav className={styles.container} aria-label="Navegação principal">
      <NavLink to="/tasks/logs" className={sideClass} aria-label="Registros" title="Registros">
        {({ isActive }) => (
          <i className={`bi ${isActive ? 'bi-archive-fill' : 'bi-archive'}`} aria-hidden="true"></i>
        )}
      </NavLink>

      <Link to={center.to} className={styles.center_button} aria-label={center.label} title={center.label}>
        {/* key faz o ícone "pular" de novo sempre que ele troca */}
        <i key={center.icon} className={`bi ${center.icon} ${styles.center_icon}`} aria-hidden="true"></i>
      </Link>

      <NavLink to="/activities" className={sideClass} aria-label="Pendências" title="Pendências">
        <i className="bi bi-card-checklist" aria-hidden="true"></i>
      </NavLink>
    </nav>
  )
}

export default Navbar
