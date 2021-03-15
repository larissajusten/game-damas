export default class Player {

  constructor(numberPieces, colorPieces) {
    this.id = 1; //gerar aleatorio
    this.moviments = [];
    this.numberPieces = numberPieces;
    this.colorPieces = colorPieces;
    this.timeToPlay = 0;
    this.createPieces();
  }

  get id() {
    return this.id;
  }

  createPieces() {
    console.log('criar objetos de peças de acordo com a quantidade e posicionamento');
  }
}