import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from 'interfaces/Todo';

interface todos {
	todos: ITodo[];
	isAscending: boolean;
	filterBy: 'all' | 'done' | 'ongoing';
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
	filterBy: 'all',
};

//create reducer for todo
const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<ITodo>) => {
				return { todos: [...state.todos, action.payload], isAscending: state.isAscending, filterBy: state.filterBy };
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
				filterBy: state.filterBy,
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
		toggleFilterBy: (state, action: PayloadAction<'all' | 'done' | 'ongoing'>) => {
			const todo = state;
			if (todo) {
				todo.filterBy = action.payload;
			}
		},
	},
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo, toggleSort, toggleFilterBy } = todoSlice.actions;

export default todoSlice.reducer;
