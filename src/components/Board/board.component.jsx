import { House } from '../index'
import variables from '../../assets/scss-variables/index.module.scss'
import Styles from './board.module.scss'

const Board = ({ length, handleClick, pieces }) => {

  const initializeBoardColor = (line, column) => {
    return ((line+column)%2 === 0) ? 'white' : 'black'
  }

  const renderHouses = () => {
    return (
      <>
      { pieces.map((piece, key) => (
        <House
          key={key}
          houseColor={initializeBoardColor(piece.line, piece.column)}
          isOccupied={piece.isOccupied}
          pieceColor={piece?.pieceColor}
          pieceLine={piece.line}
          pieceColumn={piece.column}
          playerId={piece?.playerId}
          isHouseActive={piece.isSelected}
          handleClick={handleClick} />
      ))}
      </>
    )
  }

  return (
    <div className={Styles.boardContainer} style={{height:length*variables.houseSize, width:length*variables.houseSize}}>
      {console.log(variables)}
      {renderHouses()}
    </div>
  )
}

export default Board