import { Piece } from '../index'
import Styles from './house.module.scss'

const House = ({ houseColor, isOccupied, pieceColor, pieceLine, pieceColumn, playerId, handleClick, isHouseActive }) => {

  const returnHouseState = () => { return isHouseActive ? Styles.active : Styles.inactive}

  const returnHouseColor = () => { return houseColor === 'white' ? Styles.white : Styles.black}

 return (
  <button 
    className={Styles.house + ' ' + returnHouseColor() + ' ' + returnHouseState()} 
    onClick={_ => handleClick({line: pieceLine, column: pieceColumn, isOccupied: isOccupied, playerId: playerId, isSelected: !isHouseActive})}> 
      {isOccupied && <Piece color={pieceColor} />}
  </button>
  )
}

export default House