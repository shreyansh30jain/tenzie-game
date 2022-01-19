import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){

const[dieNumber,setDieNumber] = React.useState(allNewDice)
const[tenzie,setTenzie] = React.useState(false)
const[rollCount,setRollCount] = React.useState(20)
function generateNewDie() {
  return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
}

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
}

React.useEffect(function(){
  const allHeld = dieNumber.every(die => die.isHeld)
  const firstValue = dieNumber[0].value
  const allSameValue = dieNumber.every(die=>die.value === firstValue)
  if (allHeld && allSameValue) {
      setTenzie(true)
      console.log("You won!")
  }
},[dieNumber])

const dieNum = dieNumber.map(item => (
  <div>
    <Die value={item.value}
    held = {item.isHeld}
    key = {item.id}
    holdDice={() => holdDice(item.id)}
    />
  </div>
))

function holdDice(id) {
  setDieNumber(oldDie=>oldDie.map(oldItem=>{
    return oldItem.id === id ? {...oldItem,isHeld: !oldItem.isHeld}:oldItem
  }))
}

function changeNumber(){
  if(tenzie!==true)
  {
    if(rollCount <= 0 && tenzie === false){
      setRollCount(20)
    setTenzie(false)
      setDieNumber(allNewDice())
    }
    else{
      setDieNumber(prevState => prevState.map(oldI =>oldI.isHeld ?oldI:generateNewDie()))
      setRollCount(prevState=>prevState-1)
    }
  }
  else
  {
    setRollCount(20)
    setTenzie(false)
    setDieNumber(allNewDice())
  }
}

 return(
  <main className="main--content">
    {tenzie && <Confetti />}
    <div className="top--data">
    <h1 className="title">Tenzies</h1>
    <h3 className="count">Rolls left : {rollCount}</h3>
    </div>
     <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
  <div className="die--container">
            {dieNum}
  </div>
  <button type="button" className="roll--btn" onClick={changeNumber}>{tenzie===true?`New Game!!!`: rollCount<=0 ? "Retry":"Roll"}</button>
</main>
 )
}