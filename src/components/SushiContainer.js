import React from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi"

function SushiContainer({sushis, onSushiMoreClick, onEatSushi}) {
  

  const sushiElements = sushis.map(sushi => {
    return <Sushi key={sushi.id} sushi={sushi} onEatSushi={onEatSushi}/>
  })

  
  return (
    <div className="belt">
      {sushiElements}
      <MoreButton onSushiMoreClick={onSushiMoreClick} />
    </div>
  );
}

export default SushiContainer;
