import React, { useState, useEffect} from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";


function App() {
  const [sushis, setSushis]= useState([])
  const [sushiIndex, setSushiIndex] = useState(0)
  const [wallet, setWallet] = useState("100")

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(sushiData => { const updatedsushi = sushiData.map(sushi => {
      return {...sushi, isEaten: false}
    })
    setSushis(updatedsushi)})
  }, [])

  // Slice with two args - will take the items from 1st index to 2nd index and put in new array
  // since we need to change the state of the index, we have to make state
  // Then take sushis, slice from Index 0 to Index 4(index + 4)
  const displaySushis = sushis.slice(sushiIndex, sushiIndex + 4);

  // When we click MoreButton, we need to change to next 4 sushi
  // everytime button is clicked, the sushiIndex needs to be increased by 4

  function handleSushiMoreClick() {
    
    setSushiIndex(sushiIndex + 4)
  }

  function handleEatSush(eatenSushi) {
    if (wallet >= eatenSushi.price) {
     const updatedsushi= sushis.map(sushi => {
        if (eatenSushi.id === sushi.id) {
         return {...sushi, isEaten: true} 
        } 
        return sushi
      })
      setWallet(wallet - eatenSushi.price)
      setSushis(updatedsushi)
    } else { alert("You don't have enough money to eat this sushi!")}
  }
  
  const sushiAte = sushis.filter(sushi => {
    return sushi.isEaten === true
  })

  
  return (
    <div className="app">
      <SushiContainer sushis= {displaySushis} onSushiMoreClick={handleSushiMoreClick} onEatSushi={handleEatSush}/>
      <Table plates = {sushiAte} wallet={wallet}/>
    </div>
  );
}

export default App;
