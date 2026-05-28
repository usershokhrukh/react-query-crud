import React, {use, useEffect, useState} from "react";
import {useGetOneTodo} from "../hooks/useGetOneTodo";
import { useEditTodo } from "../hooks/useEditTodo";

const EditModal = ({oneTodoId, modal, errorSet}) => {
  const {data, error: getError} = useGetOneTodo(oneTodoId);
  const [todo, setTodo] = useState({
    id: data?.data.id || null,
    title: data?.data.title || "",
    completed: data?.data.completed,
    priority: data?.data.priority,
  });

  useEffect(() => {
    setTodo({
      id: data?.data.id || null,
      title: data?.data.title || "",
      completed: data?.data.completed,
      priority: data?.data.priority,
    });
  }, [data]);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(todo);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo.title) {
      mutate(todo)
      modal(false)
    }
  };

  const {mutate, error: editError} = useEditTodo()

  useEffect(() => {
    errorSet(editError?.message)
  }, [editError])
  useEffect(() => {
    errorSet(getError?.message)
  }, [getError])

  return (
    <div className="modal-box">
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          className="form-input"
          onChange={handleChange}
          name="title"
          placeholder="Title"
          type="text"
          value={todo.title}
        />
        <select
          value={todo.priority}
          onChange={handleChange}
          name="priority"
          id=""
        >
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
        <div className="form-box">
          <button type="submit" className="form-buttons">
            admit
          </button>
          <button
            type="button"
            onClick={() => {
              modal(false);
            }}
            className="form-buttons"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
