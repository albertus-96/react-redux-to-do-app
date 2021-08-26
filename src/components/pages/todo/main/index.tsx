import { useAppDispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleSort, toggleTodo, updateTodo } from 'redux/actions';
import { ClipboardListIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import { ITodo } from 'interfaces/Todo';
import { Card } from '../card';
import { AddTodo } from '../newTodo';
import { sortedTodo } from 'redux/slices/todo/selector';
import { RootState } from 'redux/reducers';

export const Main = () => {
	// connect to redux
	const dispatch = useAppDispatch();

	//selector for todo and sorting
	const todo = useSelector(sortedTodo);

	const sort = useSelector((state: RootState) => state.todo.isAscending);

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

	const handleSort = () => {
		dispatch(toggleSort(!sort));
	};

	return (
		<div className="py-5 font-light text-center bg-gray-700">
			<div className="container flex flex-col gap-2 mx-auto">
				<div className="inline-flex items-center justify-center">
					<ClipboardListIcon className="w-10 h-10 mr-4 text-purple-400" />
					<h1 className="text-4xl font-bold">To Do List</h1>
				</div>
				{/* to do list */}
				<div className="inline-flex justify-between px-6">
					<p className="text-left"> *click to mark as done</p>
					<div className="inline-flex items-center">
						<p className="mr-2"> Sort By Deadline</p>
						{sort ? (
							<ArrowUpIcon
								className="w-4 h-4 text-white cursor-pointer hover:text-purple-400 "
								onClick={() => handleSort()}
							/>
						) : (
							<ArrowDownIcon
								className="w-4 h-4 text-white cursor-pointer hover:text-purple-400 "
								onClick={() => handleSort()}
							/>
						)}
					</div>
				</div>
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
