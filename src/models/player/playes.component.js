export class Player {

  constructor(numberPieces, colorPieces) {
    this.id = 1; //TODO gerar aleatorio
    this.moviments = [];
    this.pieces = [];
    this.numberPieces = numberPieces;
    this.colorPieces = colorPieces;
    this.timeToPlay = 0; //TODO escolher tempo padrão
    this.createPieces();
  }

  getTime() {
    return this.timeToPlay;
  }

  setNumberPieces(newNumberPieces) {
    return this.numberPieces = newNumberPieces;
  }

  createPieces() { } //TODO criar peças

}
