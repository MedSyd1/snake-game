import { useEffect, useState } from "react";
import randomFromInterval from "../Utils/utils";
import { createBoard } from "../Utils/utils";
import "./board.css";
import { GiShinyApple } from "react-icons/gi";
import { GiAppleCore } from "react-icons/gi";

const BOARD_SIZE = 20;

const createFood = (snake: number[]) => {
  let foodCell: number = randomFromInterval(1, 400);
  while (snake.includes(foodCell)) foodCell = randomFromInterval(1, 400);
  return foodCell;
};

const handleKeyDown = (e: any, f: (str: string) => void, direction: string) => {
  if (e.key === "ArrowUp" && direction !== "U") f("U");
  if (e.key === "ArrowDown" && direction !== "D") f("D");
  if (e.key === "ArrowLeft" && direction !== "L") f("L");
  if (e.key === "ArrowRight" && direction !== "R") f("R");
};

const moveSnake = (
  setSnake: (t: number[]) => void,
  setDirection: (n: string) => void,
  setFood: (n: number) => void,
  setCount: (n: number) => void,
  direction: string,
  snake: number[],
  food: number,
  count: number
) => {
  if (direction === "U") {
    let newSnake = [...snake];
    let head = snake[snake.length - 1];
    let newHead = head - 20;
    if (snake.includes(newHead) || newHead <= 0 || newHead > 400) {
      setSnake([1, 2, 3]);
      setDirection("R");
      setCount(0);
      return;
    }
    newSnake.push(newHead);
    if (newHead != food) newSnake.shift();
    else {
      setFood(createFood(snake));
      setCount(count + 1);
    }
    setSnake(newSnake);
  } else if (direction === "R") {
    let newSnake = [...snake];
    let head = snake[snake.length - 1];
    let newHead = head + 1;
    if (snake.includes(newHead) || newHead <= 0 || newHead > 400) {
      setSnake([1, 2, 3]);
      setDirection("R");
      setCount(0);
      return;
    }
    newSnake.push(newHead);
    if (newHead != food) newSnake.shift();
    else {
      setFood(createFood(snake));
      setCount(count + 1);
    }
    setSnake(newSnake);
  } else if (direction === "L") {
    let newSnake = [...snake];
    let head = snake[snake.length - 1];
    let newHead = head - 1;
    if (snake.includes(newHead) || newHead <= 0 || newHead > 400) {
      setSnake([1, 2, 3]);
      setDirection("R");
      setCount(0);
      return;
    }
    newSnake.push(newHead);
    if (newHead != food) newSnake.shift();
    else {
      setFood(createFood(snake));
      setCount(count + 1);
    }
    setSnake(newSnake);
  } else if (direction === "D") {
    let newSnake = [...snake];
    let head = snake[snake.length - 1];
    let newHead = head + 20;
    if (snake.includes(newHead) || newHead <= 0 || newHead > 400) {
      setSnake([1, 2, 3]);
      setDirection("R");
      setCount(0);
      return;
    }
    newSnake.push(newHead);
    if (newHead != food) newSnake.shift();
    else {
      setFood(createFood(snake));
      setCount(count + 1);
    }
    setSnake(newSnake);
  }
};

const Board = () => {
  const [snake, setSnake] = useState([1, 2, 3]);
  const [direction, setDirection] = useState("R");
  const [food, setFood] = useState(createFood(snake));
  const [count, setCount] = useState(0);
  useEffect(() => {
    let inter = setInterval(() => {
      moveSnake(
        setSnake,
        setDirection,
        setFood,
        setCount,
        direction,
        snake,
        food,
        count
      );
    }, 50);
    return () => clearInterval(inter);
  }, [snake, direction]);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      handleKeyDown(e, setDirection, direction);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  return (
    <div className="board">
      <div className="result">
        <GiAppleCore size={50} color="aquamarine" />
        <div className="count">{count}</div>
      </div>
      {createBoard(BOARD_SIZE).map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cellValue, cellIndex) => (
            <div
              className={`cell ${snake.includes(cellValue) ? "snake" : ""} ${
                food === cellValue ? "cell-food" : ""
              } ${cellValue >= 1 && cellValue <= 20 ? "danger-up" : ""} ${
                cellValue >= 381 && cellValue <= 400 ? "danger-down" : ""
              }`}
              key={cellValue}
            >
              {cellValue === food ? (
                <div className="icon">
                  <GiShinyApple size={40} direcion={90} color={"red"} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
