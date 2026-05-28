import React, {useContext, useEffect, useState} from "react";
import {ContextTodo} from "../context/ContextTodo";
import {useDeleteTodo} from "../hooks/useDeleteTodo";
import {useEditTodo} from "../hooks/useEditTodo";
import {useGetOneTodo} from "../hooks/useGetOneTodo";

const TodoRender = ({errorSet, modal, setOneTodoId}) => {
  const {data} = useContext(ContextTodo);
  const {mutate, error} = useDeleteTodo();
  useEffect(() => {
    errorSet(error?.message);
  }, [error]);
  const {mutate: editMutate, error: editError} = useEditTodo();
  useEffect(() => {
    errorSet(editError?.message);
  }, [editError]);


  
  return data?.data?.map((todo) => (
    <div key={`${todo.title} ${todo.id}`} className="todo">
      <p className="todo-title">{todo.title}</p>
      <div className="todo-bottom">
        <div className="todo-status-b">
          <span className="todo-status">
            {todo.completed ? "Completed" : "Pending"}
          </span>
          <input onChange={()=>{
            editMutate({
              ...todo,
              completed: !todo.completed
            })
          }} checked={todo.completed} type="checkbox" />
        </div>
        <span className={`todo-priority todo-priority-${todo.priority}`}>
          {todo.priority}
        </span>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => {
            setOneTodoId(todo.id)
            modal((prev) => !prev);
          }}
          className="act-buttons act-edit"
        >
          edit
        </button>
        <button
          onClick={() => {
            mutate(todo.id);
          }}
          className="act-buttons act-delete"
        >
          delete
        </button>
      </div>
    </div>
  ));
};

export default TodoRender;
