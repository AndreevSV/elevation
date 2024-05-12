import { useState } from "react";

import "./App.css";

function App() {
  const [enteredText, setEnteredText] = useState("");
  const [submittedText, setSubmittedText] = useState([]);

  const textChangeHandler = (i) => {
    setEnteredText(i.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmittedText([...submittedText, enteredText]);
    setEnteredText("");
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input
          placeholder="type something"
          type="text"
          value={enteredText}
          onChange={textChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
      {submittedText.map((el) => (
        <p>Hello {el} !</p>
      ))}
    </div>
  );
}

export default App;
