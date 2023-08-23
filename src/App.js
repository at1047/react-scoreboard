import {useState, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

function App() {


  const [tOneScore, setTOneScore] = useState(
    (localStorage.getItem("tOneScore") === null) ? 0 : localStorage.getItem("tOneScore")
  )

  useEffect(() => {
    localStorage.setItem("tOneScore", tOneScore);
    }, [tOneScore]);


  function handleContainerLeftClick(e) {
    e.preventDefault();
    setTOneScore(parseInt(tOneScore) + 1)
  }

  function handleMinusLeftClick(e) {
    e.stopPropagation();
    e.preventDefault();
    setTOneScore(parseInt(tOneScore) - 1)
  }


  const [style, setStyle] = useState(
    (localStorage.getItem("flip") === null) ? "" : localStorage.getItem("flip")
  )
  function handleSwitchSides(e) {
    e.preventDefault();
    setStyle(
      (style === ""? "container-flip" : "")
    )
  }

  useEffect(() => {
    localStorage.setItem("flip", style);
    }, [style]);

  const leftHandlers = useSwipeable({
    onSwipedUp: () => setTOneScore(parseInt(tOneScore) + 1),
    onSwipedDown: () => setTOneScore(parseInt(tOneScore) - 1),
    preventScrollOnSwipe: true,
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className={`${style} container-score`}>
          <div {...leftHandlers} className="container-team" id="container-left" onClick={handleContainerLeftClick}>
            <p>name 1</p>
            <h2>{tOneScore}</h2>
            <p className="button-minus" onClick={handleMinusLeftClick}>-</p>
          </div>
          <div className="container-control">
            <h3 onClick={handleSwitchSides}>s</h3>
          </div>
          <div className="container-team" id="container-right">
            <p>name 2</p>
            <h2>5</h2>
            <p className="button-minus">-</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
