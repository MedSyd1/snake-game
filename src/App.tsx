
import Board from "./Board/board";
import './App.css'
import {BsFillFileArrowUpFill} from "react-icons/bs"

const App = () => {
  return (
    <div className="App">
        <div className="arrow-up"><BsFillFileArrowUpFill color={'aquamarine'} size={50}></BsFillFileArrowUpFill></div>
        <Board></Board>
        <div className="arrow-down"><BsFillFileArrowUpFill color={'aquamarine'} size={50}></BsFillFileArrowUpFill></div>
    </div>
  )
}

export default App;