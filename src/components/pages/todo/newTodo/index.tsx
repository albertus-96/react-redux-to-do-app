import { CheckIcon, XIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';

interface addTodoProps {
	handleCreate: (desc: string, deadline: Date) => void;
}

export const AddTodo = ({ handleCreate, ...rest }: addTodoProps) => {
	// local state for handling component
	const [desc, setDesc] = useState<string>('');
	const [deadline, setDeadline] = useState<Date>(new Date());
	const [isAdding, setIsAdding] = useState(false);

	// clear data after close add
	const clear = () => {
		setDesc('');
		setDeadline(new Date());
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleCreate(desc, deadline);
			}}
		>
			<div className="flex flex-row w-full gap-2 p-2 my-2 leading-none bg-gray-600" {...rest}>
				{isAdding ? (
					<>
						{/* description and deadline */}
						<textarea
							autoFocus={true}
							className="w-4/5 p-2 my-1 leading-none text-left text-white bg-gray-700 border border-gray-500 rounded-md bg-opacity-70 text-md "
							placeholder="new todo..."
							value={desc}
							required={true}
							onChange={(e) => {
								e.preventDefault();
								setDesc(e.target.value);
							}}
						></textarea>
						<input
							type="datetime-local"
							className="w-1/5 p-2 my-1 text-sm leading-none text-left text-white bg-gray-700 border border-gray-500 rounded-md bg-opacity-70 focus:outline-none"
							value={new Date(deadline.getTime() - deadline.getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
							min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
							required={true}
							onChange={(e) => {
								setDeadline(new Date(e.target.value));
							}}
						></input>

						{/* action */}
						<div className="flex flex-row items-center gap-2 mx-2">
							<button>
								<CheckIcon className="w-6 h-6 cursor-pointer hover:text-green-400" type="submit" />
							</button>
							<XIcon
								className="w-6 h-6 cursor-pointer hover:text-red-400"
								type="button"
								onClick={(e) => {
									e.preventDefault();
									setIsAdding(false);
								}}
							/>
						</div>
					</>
				) : (
					// action add to do
					<>
						<div className="flex justify-center w-full">
							<PlusIcon
								className="w-6 h-6 cursor-pointer hover:text-indigo-400"
								onClick={(e) => {
									e.preventDefault();
									clear();
									setIsAdding(true);
								}}
							/>
						</div>
					</>
				)}
			</div>
		</form>
	);
};
