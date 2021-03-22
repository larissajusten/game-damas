import Style from './piece.module.scss'

const Piece = ({ color }) => (
  <div className={Style.piece} style={{ background: color}} />
)

export default Piece
