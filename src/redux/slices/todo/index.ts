import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "interfaces/Todo";

const initialState: ITodo[] = [
  {
    id: nanoid(),
    desc: "Hello World",
    deadline: new Date("2019-09-19T07:45:51.377Z").toISOString(),
    done: false,
  },
];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<ITodo>) => {
        return [action.payload, ...state];
      },
      prepare: (desc: string, deadline: string) => {
        const id = nanoid();
        const done = false;
        return { payload: { id, desc, deadline, done } };
      },
    },
    deleteTodo: (state, action: PayloadAction<ITodo>) => {
      return state.filter(
        (todo) => todo.id.toLowerCase() !== action.payload.id.toLowerCase()
      );
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const todo = state.find(
        (todo) => todo.id.toLowerCase() === action.payload.id.toLowerCase()
      );
      if (todo) {
        todo.desc = action.payload.desc;
        todo.deadline = action.payload.deadline;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;