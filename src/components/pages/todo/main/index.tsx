import { useAppDispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { addTodo, deleteTodo, toggleTodo, updateTodo } from 'redux/actions';
import { ITodo } from 'interfaces/Todo';
import { Card } from '../card';
import { AddTodo } from '../newTodo';

export const Main = () => {
	// connect to redux
	const dispatch = useAppDispatch();
	const todo = useSelector((state: RootState) => state.todo);

	// create todo
	const handleCreate = (desc: string, deadline: Date) => {
		dispatch(addTodo(desc, deadline.toISOString()));
	};

	// delete todo
	const handleDelete = (selected: ITodo) => {
		dispatch(deleteTodo(selected));
	};

	// edit todo
	const handleEdit = (previous: ITodo, newDesc: string, newDeadline: Date) => {
		dispatch(updateTodo({ ...previous, desc: newDesc, deadline: newDeadline.toISOString() }));
	};

	// toggle todo
	const handleToggle = (selected: ITodo) => {
		dispatch(toggleTodo(selected));
	};

	return (
		<div className="py-5 font-light text-center bg-gray-700">
			<div className="container mx-auto">
				{/* to do list */}
				<div className="mb-3 text-lg text-white">
					{todo.map((data, idx) => {
						return (
							<div key={idx} className="px-4">
								<Card
									data={data}
									handleDelete={handleDelete}
									handleEdit={handleEdit}
									handleToggle={handleToggle}
								></Card>
							</div>
						);
					})}
				</div>
				{/* action add todo */}
				<div className="p-4">
					<AddTodo handleCreate={handleCreate}></AddTodo>
				</div>
			</div>
		</div>
	);
};
