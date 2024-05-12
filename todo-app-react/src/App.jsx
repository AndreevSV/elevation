import { useState } from "react";

import "./App.css";

function InputPanel({ onFormSubmit }) {
  const [todoText, setTodoText] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [imgLink, setImgLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todoText || !dateTime) {
      alert("Please input todo text and date/time");
      return;
    }

    const finalImgLink = imgLink || "https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_640.png";
    onFormSubmit({ todoText, dateTime, imgLink: finalImgLink });
    setTodoText("");
    setDateTime("");
    setImgLink("");
  };
  return (
    <form className="inputPanel" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Input todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <input
        type="url"
        placeholder="Image link (optional)"
        value={imgLink}
        onChange={(e) => setImgLink(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function TodoItem({ todoText, dateTime, imgLink, onDelete }) {
  const imageUrl = imgLink || "https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_640.png";
  return (
    <li className="todoItem">
      <img src={imageUrl} alt="" />
      <p>{todoText}</p>
      <p>{dateTime}</p>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}

function TodoItemsList({ todos, onDelete }) {
  return (
    <ul className="todoItemsList">
      {todos.map((todo, index) => (
        <TodoItem key={index} {...todo} onDelete={() => onDelete(index)}/>
      ))}
    </ul>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleFormSubmit = (data) => {
    setTodos([...todos, data]);
    setShowList(true);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1>Todo List</h1>
      <InputPanel onFormSubmit={handleFormSubmit} />
      {showList && <TodoItemsList todos={todos} onDelete={handleDelete} />}
    </>
  );
}

export default App;
