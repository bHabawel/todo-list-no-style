import { useState } from "react";
import "./index.css";

function App() {
  const [listArray, setListArray] = useState([]);

  function handlleAddList(list) {
    setListArray((prevList) => [...prevList, list]);
  }

  function handleDeleteList(id) {
    setListArray((prevList) => prevList.filter((list) => list.id !== id));
  }

  return (
    <div className="App">
      <Header />
      <AddList onAddList={handlleAddList} />
      <TodoList onShowList={listArray} onDeleteList={handleDeleteList} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Todo List</h1>
    </header>
  );
}

function AddList({ onAddList }) {
  const [addList, setAddList] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newAddList = { item: addList, id: id };
    onAddList(newAddList);
    setAddList("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Add a task..."
        value={addList}
        onChange={(e) => setAddList(e.target.value)}
      />{" "}
      <button>Add</button>
    </form>
  );
}

function TodoList({ onShowList, onDeleteList }) {
  return (
    <main className="main">
      <ul className="list-container" style={{ listStyle: "none" }}>
        {onShowList.map((list) => (
          <TodoContent
            onShowList={list}
            key={list.id}
            onDeleteList={onDeleteList}
          />
        ))}
      </ul>
    </main>
  );
}

function TodoContent({ onShowList, onDeleteList }) {
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <input
        type="checkbox"
        onClick={() => setIsDone((currState) => !currState)}
      />
      <li
        className="list-item"
        style={isDone ? { textDecoration: "line-through" } : {}}
      >
        {onShowList.item}
      </li>{" "}
      <button
        className="remove-button"
        onClick={() => onDeleteList(onShowList.id)}
      >
        Remove
      </button>
    </>
  );
}
export default App;
