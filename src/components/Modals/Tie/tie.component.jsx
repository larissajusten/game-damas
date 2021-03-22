import Styles from './tie.module.scss'

const TieModal = ({player, setGameStatus, setShowTie}) => (
  <div className={Styles.tieContainer}>
    <div className={Styles.tieModal}>
      <h2 className={Styles.title}>{player} deseja empatar o jogo.</h2>
      
      <div className={Styles.buttonsContainer}>
        <button className={Styles.button} onClick={_ => setGameStatus(false)}>Aceitar</button>
        <button className={Styles.button} onClick={_ => setShowTie(false)}>Negar</button>
      </div>
    </div>
  </div>
)

export default TieModal