import { useEffect, useState } from 'react'
import './App.css'
import { ICONS_OPS, NUMBERS } from "./constants";

function App() {

  const [valueScreen,setValueScreen]=useState(0)
  const [evalValue,setEvalValue]=useState(0)
  const [brakets,setBrakets]=useState(false)

  useEffect(() => { 
    if(!valueScreen) setValueScreen(0)
  },[valueScreen])

  function Key({ btnkey, evalkey, color, op }) {
    const handleClick = () => {
      if(op) op()
      else if (evalkey) {
        if (!valueScreen) {
          setValueScreen(btnkey)
          setEvalValue(evalkey)
          return
        }
        // para el valor a evaluar
        const arrEvalValue = evalValue.toString().split('');
        const newEvalValue=[...arrEvalValue,evalkey].join('')
        setEvalValue(newEvalValue)

        // para el valor a a mostrar en screen
        const arrValueScreen = valueScreen.toString().split('');
        const newValueScreen=(btnkey==ICONS_OPS.point)?[...arrValueScreen,evalkey].join(''):[...arrValueScreen,btnkey].join('')
        // const newValueScreen=[...arrValueScreen,btnkey].join('')
        setValueScreen(newValueScreen)
      }
        
    }
    return (
      <button style={{backgroundColor:color}} onClick={handleClick} data-number={btnkey}>{ btnkey}</button>
    )
  }

  function writeBrakets() {
    const braket = !brakets?"(":")";
    setBrakets(!brakets)

    // para el valor a evaluar
    const arrEvalValue = evalValue.toString().split('');
    const newEvalValue=[...arrEvalValue,braket].join('')
    setEvalValue(newEvalValue)

    // para el valor a a mostrar en screen
    const arrValueScreen = valueScreen.toString().split('');
    const newValueScreen=[...arrValueScreen,braket].join('')
    setValueScreen(newValueScreen)
  }

  function deleteChar() {
    // para el valor a evaluar
    const newEvalValue = evalValue.toString().split('').slice(0,-1).join('');
    setEvalValue(newEvalValue)
    
    // para el valor a mostrar en screen
    const newValueScreen = valueScreen.toString().split('').slice(0,-1).join('');
    setValueScreen(newValueScreen)

  }

  function calculate() {
    const res = eval(evalValue.toString());
    setEvalValue(res)
    setValueScreen(res)
  }

  return (
    <>
      <div className="clc">
        <div className="clc__screen">
          <span className="screenInput">{valueScreen}</span>
        </div>
        <div className="clc__buttons" id="keys">
          <div className="clc__btns">
            <Key btnkey={ICONS_OPS.clean} op={() => {
              setEvalValue('')
              setValueScreen(0)
            }} color="#ee6060" />
            <Key btnkey={ICONS_OPS.brakets} op={writeBrakets}/>
            <Key btnkey={ICONS_OPS.percent} op={() => {
              setEvalValue(evalValue/100)
              setValueScreen(valueScreen/100)
            }}/>
          </div>
          <div className="clc__nums">
            {
              NUMBERS.map((num) => {
                return (
                  <Key key={num} btnkey={num} evalkey={num} />
                )
              })
            }
            <Key btnkey={ICONS_OPS.delete} op={ deleteChar}/>
            <Key btnkey={ICONS_OPS.point} evalkey="." />
            <Key btnkey="0" evalkey="0"/>
          </div>
          <div className="clc__operations">
            <Key btnkey={ICONS_OPS.divide} evalkey="/" color="#20b1aa" />
            <Key btnkey={ICONS_OPS.multi} evalkey="*" color="#fea500" />
            <Key btnkey={ICONS_OPS.minus} evalkey="-" color="#f0807f" />
            <Key btnkey={ICONS_OPS.plus} evalkey="+" color="#7c93e1" />
            <Key btnkey={ICONS_OPS.equal} op={calculate} color="#ffffff" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
