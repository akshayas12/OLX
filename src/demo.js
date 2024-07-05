import { useEffect, useState } from "react";

import React from 'react'

function demo() {
    const [counter,setCounter]=useState(counter)

    const increment=()=>{
       setCounter(counter+1);
     }
    const decrement=()=>{
        setCounter(counter-1)
     }
  return (
    <div>
        {counter}
        <button onClick={increment}>+</button>
     <button onClick={decrement}>-</button>
    
    </div>
  )
}

export default demo
