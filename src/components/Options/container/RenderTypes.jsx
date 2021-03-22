import { useDispatch } from 'react-redux'
import { gameTypes } from '../../../constants'
import setGameType from '../../../redux/gameType.action'
import Styles from './RenderTypes.module.scss'

const RenderTypes = () => {
  const dispatch = useDispatch();

  return (
    <>
    {
      gameTypes.map((type, key) => (
        <div className={Styles.gameTypeOption} key={key}>
          <input
            type="radio"
            className={Styles.gameTypeRadio}
            name='game-type'
            value={type.value}
            onClick={_ => dispatch(setGameType(type.value))}
          />
          {type.label}
        </div> 
      ))
    }
    </>
  )
}

export default RenderTypes