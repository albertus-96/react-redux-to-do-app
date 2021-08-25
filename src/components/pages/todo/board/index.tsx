export const Board = ({ className = '', children, ...rest }) => {
	return (
		<div
			className={`w-full mx-auto rounded-lg border border-gray-700 p-8 lg:py-12 lg:px-14 text-gray-300 ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
};
