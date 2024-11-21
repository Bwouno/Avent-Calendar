import React from "react";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div class="illustration">
	<div class="i-large"></div>
	<div class="i-medium"></div>
	<div class="i-small"></div>
      
      <h1>Calendrier de l'Avent</h1>
      <Calendar />
      </div>
    </div>
  );
}

export default App;
