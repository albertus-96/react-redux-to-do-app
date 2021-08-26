import { useAppDispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleFilterBy, toggleSort, toggleTodo, updateTodo } from 'redux/actions';
import { ClipboardListIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';
import { ITodo } from 'interfaces/Todo';
import { Card } from '../card';
import { AddTodo } from '../newTodo';
import { mutatedTodo } from 'redux/slices/todo/selector';
import { RootState } from 'redux/reducers';

export const Main = () => {
	// connect to redux
	const dispatch = useAppDispatch();

	//selector for todo, sorting, and filtering
	const todo = useSelector(mutatedTodo);

	const sort = useSelector((state: RootState) => state.todo.isAscending);

	const filter = useSelector((state: RootState) => state.todo.filterBy);

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

	const handleFilter = (filterBy: 'done' | 'ongoing' | 'all' = 'all') => {
		dispatch(toggleFilterBy(filterBy));
	};

	return (
		<div className="py-5 font-light text-center bg-gray-700">
			<div className="container flex flex-col gap-2 mx-auto">
				<div className="inline-flex items-center justify-center">
					<ClipboardListIcon className="w-10 h-10 mr-4 text-purple-400" />
					<h1 className="text-4xl font-bold">To Do List</h1>
				</div>
				{/* nb, filter & sort */}
				<div className="inline-flex justify-between px-6">
					<p className="text-left"> *click to mark as done</p>
					{/* sort & filter */}
					<div className="inline-flex items-center gap-1">
						{/* filter section */}
						<p className="mr-1 font-bold">Filter by:</p>
						<button
							className={`${
								filter === 'all'
									? 'text-purple-400 cursor-not-allowed font-bold'
									: 'text-white hover:text-purple-400 cursor-pointer'
							}`}
							onClick={() => filter !== 'all' && handleFilter()}
						>
							All
						</button>
						<button
							className={`${
								filter === 'done'
									? 'text-purple-400 cursor-not-allowed font-bold'
									: 'text-white hover:text-purple-400 cursor-pointer'
							}`}
							onClick={() => filter !== 'done' && handleFilter('done')}
						>
							Done
						</button>
						<button
							className={`${
								filter === 'ongoing'
									? 'text-purple-400 cursor-not-allowed font-bold'
									: 'text-white hover:text-purple-400 cursor-pointer'
							}`}
							onClick={() => filter !== 'ongoing' && handleFilter('ongoing')}
						>
							Ongoing
						</button>
						{/* separator between filter and sort */}
						<span id="separator" className="w-1 h-6 mx-4 bg-white rounded-lg" />
						{/* sort section */}
						<p className="font-bold"> Sort By Deadline</p>
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
