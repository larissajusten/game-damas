import { NavLink } from 'react-router-dom'
import { Header } from '../../components'
import Styles from './menu.module.scss'

export const MenuScreen = () => {

  const renderOptions = () => {
    return (
      <ul className={Styles.optionsContainer}>
        <li><NavLink to="/play" className={Styles.optionLink}>Iniciar partida</NavLink></li>
        <li><NavLink to="/options" className={Styles.optionLink}>Opções</NavLink></li>
      </ul>
    )
  }
  
  return (
    <div className={Styles.menuScreenContainer}>
      <Header title="Damas" />
      {renderOptions()}
    </div>
  )
}
