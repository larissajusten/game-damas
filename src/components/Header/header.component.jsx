import Styles from './header.module.scss'

const Header = ({title}) => (
  <div className={Styles.headerTitleContainer}>
    <h1 data-text={title.toLowerCase()} className={Styles.glitch}>{title.toLowerCase()}</h1>
  </div>
)

export default Header