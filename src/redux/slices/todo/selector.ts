import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/reducers';

export const mutatedTodo = createSelector(
	(state: RootState) => {
		return state.todo.isAscending
			? state.todo.todos
					.slice()
					.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
					.filter((todo) =>
						state.todo.filterBy === 'done' ? todo.done : state.todo.filterBy === 'ongoing' ? !todo.done : todo
					)
			: state.todo.todos
					.slice()
					.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
					.filter((todo) =>
						state.todo.filterBy === 'done' ? todo.done : state.todo.filterBy === 'ongoing' ? !todo.done : todo
					);
	},
	(result) => result
);
