import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from 'interfaces/Todo';

interface todos {
	todos: ITodo[];
	isAscending: boolean;
}

//init state for todo
const initialState: todos = {
	todos: [
		{
			id: nanoid(),
			desc: 'Hello World',
			deadline: new Date('2021-09-19T07:45:51.377Z').toISOString(),
			done: false,
		},
		{
			id: nanoid(),
			desc: 'Hello World',
			deadline: new Date('2019-09-19T07:45:51.377Z').toISOString(),
			done: true,
		},
	],
	isAscending: true,
};

//create reducer for todo
const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<ITodo>) => {
				return { todos: [...state.todos, action.payload], isAscending: state.isAscending };
			},
			prepare: (desc: string, deadline: string) => {
				const id = nanoid();
				const done = false;
				return { payload: { id, desc, deadline, done } };
			},
		},
		deleteTodo: (state, action: PayloadAction<ITodo>) => {
			return {
				todos: state.todos.filter((todo) => todo.id.toLowerCase() !== action.payload.id.toLowerCase()),
				isAscending: state.isAscending,
			};
		},
		updateTodo: (state, action: PayloadAction<ITodo>) => {
			const todo = state.todos.find((todo) => todo.id.toLowerCase() === action.payload.id.toLowerCase());
			if (todo) {
				todo.desc = action.payload.desc;
				todo.deadline = action.payload.deadline;
			}
		},
		toggleTodo: (state, action: PayloadAction<ITodo>) => {
			const todo = state.todos.find((todo) => todo.id.toLowerCase() === action.payload.id.toLowerCase());
			if (todo) {
				todo.done = !todo.done;
			}
		},
		toggleSort: (state, action: PayloadAction<boolean>) => {
			const todo = state;
			if (todo) {
				todo.isAscending = action.payload;
			}
		},
	},
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo, toggleSort } = todoSlice.actions;

export default todoSlice.reducer;
