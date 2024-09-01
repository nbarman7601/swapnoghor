const { useState } = require("react")

const Counter = ({count})=>{
    const [counter, setCounter] = useState(count);
    const increment = ()=> setCounter((prevCounter)=> prevCounter+1)
    const decrement = ()=> setCounter((prevCounter)=> prevCounter-1)
    return (
       <div className="counter">
          <button onClick={decrement}>-</button>
          <span>{counter}</span>
          <button onClick={increment}>+</button>
       </div> 
    )
}

export default Counter;