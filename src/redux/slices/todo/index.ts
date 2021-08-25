import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from 'interfaces/Todo';

//init state for todo
const initialState: ITodo[] = [
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
];

//create reducer for todo
const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<ITodo>) => {
				return [...state, action.payload];
			},
			prepare: (desc: string, deadline: string) => {
				const id = nanoid();
				const done = false;
				return { payload: { id, desc, deadline, done } };
			},
		},
		deleteTodo: (state, action: PayloadAction<ITodo>) => {
			return state.filter((todo) => todo.id.toLowerCase() !== action.payload.id.toLowerCase());
		},
		updateTodo: (state, action: PayloadAction<ITodo>) => {
			const todo = state.find((todo) => todo.id.toLowerCase() === action.payload.id.toLowerCase());
			if (todo) {
				todo.desc = action.payload.desc;
				todo.deadline = action.payload.deadline;
			}
		},
		toggleTodo: (state, action: PayloadAction<ITodo>) => {
			const todo = state.find((todo) => todo.id.toLowerCase() === action.payload.id.toLowerCase());
			if (todo) {
				todo.done = !todo.done;
			}
		},
	},
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
