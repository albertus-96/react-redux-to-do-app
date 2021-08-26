import { ITodo } from 'interfaces/Todo';
import { PencilAltIcon, TrashIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';

interface cardProp {
	data: ITodo;
	handleDelete: (selected: ITodo) => void;
	handleToggle: (selected: ITodo) => void;
	handleEdit: (previous: ITodo, newDesc: string, newDeadline: Date) => void;
}

export const Card = ({ data, handleDelete, handleEdit, handleToggle, ...rest }: cardProp) => {
	const [desc, setDesc] = useState(data.desc);
	const [deadline, setDeadline] = useState(new Date(data.deadline));
	const [isEditing, setIsEditing] = useState(false);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setIsEditing(false);
				handleEdit(data, desc, deadline);
			}}
		>
			<div className="flex flex-row w-full gap-2 p-2 my-2 leading-none bg-gray-600" {...rest}>
				{/* description and deadline */}
				{isEditing ? (
					<>
						{/* input mode */}
						<textarea
							required={true}
							autoFocus={true}
							className="w-4/5 p-2 my-1 leading-none text-left text-white bg-gray-700 border border-gray-500 rounded-md bg-opacity-70 text-md "
							placeholder={data.desc}
							defaultValue={desc}
							onChange={(e) => {
								e.preventDefault();
								setDesc(e.target.value);
							}}
						></textarea>
						<input
							required={true}
							type="datetime-local"
							className="w-1/5 p-2 my-1 text-sm leading-none text-left text-white bg-gray-700 border border-gray-500 rounded-md bg-opacity-70 focus:outline-none"
							defaultValue={new Date(
								new Date(data.deadline).getTime() - new Date(data.deadline).getTimezoneOffset() * 60000
							)
								.toISOString()
								.slice(0, 16)}
							min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
							onChange={(e) => {
								setDeadline(new Date(e.target.value));
							}}
						></input>
					</>
				) : (
					<div
						className="flex flex-row items-center w-full cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							handleToggle(data);
						}}
					>
						{/* display text */}
						<h3
							className={`w-4/5 px-2 my-1 leading-none text-left ${
								data.done ? 'text-gray-400 line-through' : 'text-white'
							} truncate text-md`}
						>
							{data.desc}
						</h3>
						<h3
							className={`w-1/5 px-2 my-1 leading-none text-left  ${
								data.done ? 'text-gray-400 line-through' : 'text-white'
							} truncate text-sm`}
						>
							{new Date(new Date(data.deadline).getTime() - new Date(data.deadline).getTimezoneOffset() * 60000)
								.toISOString()
								.slice(0, 16)
								.replace('T', ' ')}
						</h3>
					</div>
				)}

				{/* edit or save mode */}
				{isEditing ? (
					// save mode
					<div className="flex flex-row items-center gap-2 mx-2">
						<button>
							<CheckIcon className="w-5 h-5 cursor-pointer hover:text-green-400" type="submit" />
						</button>
						<XIcon
							className="w-5 h-5 cursor-pointer hover:text-red-400"
							onClick={(e) => {
								e.preventDefault();
								setIsEditing(false);
							}}
						/>
					</div>
				) : (
					<div className="flex flex-row items-center gap-2 mx-2">
						{/* action mode */}
						<PencilAltIcon
							className="w-5 h-5 cursor-pointer hover:text-green-400"
							onClick={(e) => {
								e.preventDefault();
								setIsEditing(true);
							}}
						/>
						<TrashIcon className="w-5 h-5 cursor-pointer hover:text-red-400" onClick={() => handleDelete(data)} />
					</div>
				)}
			</div>
		</form>
	);
};
