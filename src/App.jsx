import React, {useEffect, useState} from "react";
import {useGetTodo} from "./hooks/useQueryTodo";
import {ContextTodo} from "./context/ContextTodo";
import TodoRender from "./components/TodoRender";
import "./App.css";
import {useAddTodo} from "./hooks/useAddTodo";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
const App = () => {
  const {data: getTodos, isFetching, error: todoError} = useGetTodo();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [error, setError] = useState("");
  const [oneTodoId, setOneTodoId] = useState(null);
  useEffect(() => {
    setError(todoError?.message)
  }, [todoError]);  
  return (
    <ContextTodo.Provider value={{data: getTodos}}>
      <div className="container">
        <p>{isFetching ? "Loading..." : ""}</p>
        {
          error?.message ? <p className="error">{error?.message}</p> : null
        }
        <button
          onClick={() => {
            setAddModal(!addModal);
          }}
          className="add-todo-button"
        >
          Add Todo
        </button>
        <div className="todos-box">
          <TodoRender
            modal={setEditModal}
            setOneTodoId={setOneTodoId}
            errorSet={setError}
          />
        </div>
      </div>
      {addModal ? (
        <AddModal modal={setAddModal} errorSet={setError} />
      ) : null}
      {editModal ? (
        <EditModal errorSet={setError} oneTodoId={oneTodoId} modal={setEditModal} />
      ) : null}
    </ContextTodo.Provider>
  );
};

export default App;
