

export default function randomFromInterval(min:number,max:number){
    return Math.floor(Math.random()*(max - min + 1)+ min);
}


export const createBoard = (BOARD_SIZE: any) => {
    let counter1 = 1;
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const currenRow = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        currenRow.push(counter1++);
      }
      board.push(currenRow);
    }
  
    return board;
  };