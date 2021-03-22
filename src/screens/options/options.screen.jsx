import { RenderTypes } from '../../components'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Styles from './options.module.scss'

export const OptionsScreen = () => {
  const [goToMenu, setGoToMenu] = useState(false)

  return (
    <div className={Styles.optionsContainer}>
      {goToMenu && <Redirect to ="/"/>}
      <h4 className={Styles.subtitle}>Tipos de jogos:</h4>
      <div className={Styles.typesContainer}>
        <RenderTypes />
      </div>
      <button className={Styles.button} onClick={_ => setGoToMenu(true)}>Voltar</button>
    </div>
  )
}