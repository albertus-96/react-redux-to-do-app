import { useState } from "react";

import { Button } from "components";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { addTodo, deleteTodo, updateTodo } from "redux/actions";
import { ITodo } from "interfaces/Todo";

export const Main = () => {
  const dispatch = useAppDispatch();
  const todo = useSelector((state: RootState) => state.todo);
  const [desc, setDesc] = useState("new todo");
  // const [deadline, setDeadline] = useState<Date>(
  //   new Date(new Date().getDate() + 1)
  // );

  const handleSubmit = () => {
    dispatch(addTodo(desc, new Date().toISOString()));
  };

  const handleDelete = (selected: ITodo) => {
    dispatch(deleteTodo(selected));
  };

  const handleEdit = (selected: ITodo) => {
    dispatch(updateTodo({ ...selected, desc: "update" }));
  };

  return (
    <div className="text-center font-light py-5 bg-gray-700">
      <div className="container mx-auto">
        <div className="text-lg text-white mb-3">
          {todo.map((data, idx) => {
            return (
              <div key={idx}>
                {data.id} {"  "} {data.desc} {"  "} {data.deadline} {"  "}{" "}
                {data.done}{" "}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(data);
                  }}
                >
                  {" "}
                  EDIT
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(data);
                  }}
                >
                  {" "}
                  DELETE
                </Button>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="desc">desc: </label>
          <input
            id="desc"
            type="text"
            required={true}
            defaultValue={desc}
            onChange={(e) => {
              e.preventDefault();
              setDesc(e.target.value);
            }}
          ></input>
          {/* <label htmlFor="deadline">desc: </label>
          <input
            id="deadline"
            type="date"
            required={true}
            min={Date.now()}
            defaultValue={deadline.toISOString()}
            onChange={(e) => setDeadline(new Date(e.target.value))}
          ></input> */}

          <Button type="submit">Add</Button>
        </form>
      </div>
    </div>
  );
};
