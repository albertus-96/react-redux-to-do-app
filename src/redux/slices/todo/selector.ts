import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/reducers';

export const sortedTodo = createSelector(
	(state: RootState) => {
		return state.todo.isAscending
			? state.todo.todos.slice().sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
			: state.todo.todos.slice().sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
	},
	(result) => result
);
