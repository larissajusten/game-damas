import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Board, Header, TieModal } from '../../components'
import { Redirect } from 'react-router-dom'
import Styles from './match.module.scss'

export const MatchScreen = () => {

  const gameType = useSelector(state => state.gameType);

  const [isGameOn, setGameStatus] = useState(true)
  const [playerOne, setPlayerOne] = useState({id: Math.random(), name: 'Player A', timeToPlay: 10, pieces: gameType.piecesPerPlayer, isMyTurn: true})
  const [playerTwo, setPlayerTwo] = useState({id: Math.random(), name: 'Player B', timeToPlay: 10, pieces: gameType.piecesPerPlayer, isMyTurn: false})
  const [gameTime, setGameTime] = useState(playerOne.timeToPlay)
  const [pieces, setPieces] = useState(initializeMatchValues())
  const [goToMenu, setGoToMenu] = useState(false)
  const [showTie, setShowTie] = useState(false)

  function initializeMatchValues() {
    let newPiece = []

    for (let line = 0; line < gameType.lineSize; line++) {
      for (let column = 0; column < gameType.columnSize; column++) {
        let verificationEven = (line+column)%2 === 0
        let maxWhitePieces = (gameType.columnSize-2)/2

        if (!verificationEven) {
          if (line < maxWhitePieces) {
            newPiece.push({line: line, column: column, isOccupied: true, playerId: playerOne.id, pieceColor: 'white', isSelected: false})
          } else if (line > maxWhitePieces+1) {
            newPiece.push({line: line, column: column, isOccupied: true, playerId: playerTwo.id, pieceColor: 'black', isSelected: false})
          } else {
            newPiece.push({line: line, column: column, isOccupied: false, isSelected: false})
          }
        } else {
          newPiece.push({line: line, column: column, isOccupied: false, isSelected: false})
        }
      }
    }

    return newPiece
  }

  useEffect(() => {
    let intervalId;

    if (isGameOn && !showTie) {
      intervalId = setInterval(() => {
        setGameTime(gameTime => gameTime - 1)
      }, 1000)
    }

    if(gameTime <= 0 && !showTie) {
      let winner = playerOne.isMyTurn ? 'player two' : 'player one'
      alert(winner)
      setGameStatus(false)
    }

    return () => clearInterval(intervalId);
  }, [gameTime, showTie])

  useEffect(() => {
    if(playerOne.pieces === 0) {
      alert('player two wins')
      setGameStatus(false)
    }

    if (playerTwo.pieces === 0) {
      alert('player one wins')
      setGameStatus(false)
    }
  }, [playerTwo.pieces, playerOne.pieces])

  const checkIfHasPieceSelected = () => {
    return pieces.filter(piece => piece.isSelected)
  }

  const getPiece = (line, column) => {
    return pieces.filter(piece => piece.line === line && piece.column === column)
  }

  const eatPiece = (actualHouse, pieceSelected, oldLine, actualColumn) => {
    let newPieces = movePiece(actualHouse, pieceSelected)
    return removePiece(actualColumn, oldLine, newPieces)
  }

  const isEatPossible = (pieceSelected, eatenPieceLine, eatenPieceColumn) => {
    return getPiece(eatenPieceLine, eatenPieceColumn)[0].playerId !== pieceSelected.playerId
  }

  const isMovePossible = (actualHouse, pieceSelected, nextLine) => {
    let verifyLine = nextLine === actualHouse.line
    let verifyColumn = pieceSelected.column-1 === actualHouse.column || pieceSelected.column+1 === actualHouse.column

    return verifyLine && verifyColumn
  }

  const movePiece = (actualHouse, pieceSelected) => {
    return pieces.map(piece => (piece.line === actualHouse.line && piece.column === actualHouse.column)
      ? {...piece, isOccupied: true, isSelected: false, playerId: pieceSelected.playerId, pieceColor: pieceSelected.pieceColor}
      : ((piece.line === pieceSelected.line && piece.column === pieceSelected.column)
        ? {...piece, line: pieceSelected.line, column: pieceSelected.column, isOccupied: false, isSelected: false}
        : {...piece, isSelected: false})
      )
  }

  const removePiece = (actualColumn, actualLine, newPieces) => {
    return newPieces.map(piece => (piece.line === actualLine && piece.column === actualColumn)
      ? {line: actualLine, column: actualColumn, isOccupied: false, isSelected: false}
      : {...piece})
  }

  const updateSelectedPiece = (house) => {
    const canPlayerSelectThisPiece = playerOne.isMyTurn ? house.playerId === playerOne.id : (playerTwo.isMyTurn ? house.playerId === playerTwo.id : false)

    return pieces.map((piece) => (piece.line === house.line && piece.column === house.column && canPlayerSelectThisPiece) 
      ? {...piece, isSelected: house.isSelected}
      : {...piece, isSelected: false})
  }

  const handleClick = (actualHouse) => {
    let newPieces = pieces
    let pieceSelected = checkIfHasPieceSelected()[0]
    console.log(gameType)

    if (!actualHouse.isOccupied && pieceSelected) {

      if (Math.abs(actualHouse.column - pieceSelected.column) === 1 && Math.abs(actualHouse.line - pieceSelected.line) === 1) {
        if (playerOne.isMyTurn && isMovePossible(actualHouse, pieceSelected, pieceSelected.line+1)) {
          newPieces = movePiece(actualHouse, pieceSelected)
          setPlayerOne({...playerOne, isMyTurn: false})
          setPlayerTwo({...playerTwo, isMyTurn: true})
          setGameTime(playerTwo.timeToPlay)
        }
  
        if (playerTwo.isMyTurn && isMovePossible(actualHouse, pieceSelected, pieceSelected.line-1)) {
          newPieces = movePiece(actualHouse, pieceSelected)
          setPlayerOne({...playerOne, isMyTurn: true})
          setPlayerTwo({...playerTwo, isMyTurn: false})
          setGameTime(playerOne.timeToPlay)
        }
      } 

      else if (Math.abs(actualHouse.column - pieceSelected.column) === 2 && Math.abs(actualHouse.line - pieceSelected.line) === 2 
        && !getPiece(actualHouse.line, actualHouse.column).isOccupied) {

        let eatenPieceColumn = actualHouse.column > pieceSelected.column ? actualHouse.column-1 : actualHouse.column+1

        if(playerOne.isMyTurn && pieceSelected.line < actualHouse.line && isEatPossible(pieceSelected, actualHouse.line-1, eatenPieceColumn)) {
          newPieces = eatPiece(actualHouse, pieceSelected, actualHouse.line-1, eatenPieceColumn)
          setPlayerOne({...playerOne, isMyTurn: false})
          setPlayerTwo({...playerTwo, isMyTurn: true, pieces: playerTwo.pieces-1})
          setGameTime(playerTwo.timeToPlay)

        } else if (playerTwo.isMyTurn && pieceSelected.line > actualHouse.line && isEatPossible(pieceSelected, actualHouse.line+1, eatenPieceColumn)) {
          newPieces = eatPiece(actualHouse, pieceSelected, actualHouse.line+1, eatenPieceColumn)
          setPlayerOne({...playerOne, isMyTurn: true, pieces: playerOne.pieces-1})
          setPlayerTwo({...playerTwo, isMyTurn: false})
          setGameTime(playerOne.timeToPlay)
        }
      }

    } else if (actualHouse.isOccupied) {
      newPieces = updateSelectedPiece(actualHouse)
    }

    setPieces(newPieces)
  }

  return (
    <>
    {(!isGameOn || goToMenu) && <Redirect to ="/"/>}
    {showTie && <TieModal player={playerOne.isMyTurn ? playerOne.name : playerTwo.name} setGameStatus={setGameStatus} setShowTie={setShowTie}/>}
    <div className={Styles.matchContainer}>
      <Header title='Partida' />
      <span className={Styles.subtitleContainer}>
        Peças: <span className={Styles.player}>{playerOne.isMyTurn ? 'Brancas' : 'Pretas'}</span>
      </span>
      <span className={Styles.subtitleContainer}>
        Jogador: <span className={Styles.player}>{playerOne.isMyTurn ? playerOne.name : playerTwo.name}</span>
      </span>
      <span className={Styles.subtitleContainer}>
        Tempo: <span className={Styles.gameTime}>{gameTime}</span> segundos
      </span>
      <div className={Styles.matchBoard}>
        <Board length={gameType.columnSize} handleClick={handleClick} pieces={pieces} />
      </div>

      <div className={Styles.buttonsContainer}>
        <button className={Styles.button} onClick={_ => setGoToMenu(true)}>Voltar</button>
        <button className={Styles.button} onClick={_ => setShowTie(true)}>Empate</button>
      </div>
    </div>
    </>
  )
}
