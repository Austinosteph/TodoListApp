import { useState } from 'react';

const Add = () => {
	const [data, setData] = useState('');
	const [error, setError] = useState(null);

	const addTodo = async (e) => {
		const title = data;
		try {
			const response = await fetch('http://localhost:8000/todo', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, completed: false }),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to add data : ${response.status} : ${response.statusText}`
				);
			}

			setError(null);
		} catch (error) {
			setError(error.message);
			console.log(error.message);
		}
	};

	return (
		<div className="flex flex-col">
			<form onSubmit={addTodo}>
				<div className="flex">
					<input
						type="text"
						required
						onChange={(e) => setData(e.target.value)}
						className="bg-gray-400 opacity-40 rounded-3xl w-[450px] h-9 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
					/>
					<button
						type="submit"
						className="bg-orange-500 h-9 rounded-full w-20 p-2 relative right-10"
					>
						ADD
					</button>
				</div>
			</form>

			{error && <div className="text-red-600">{error}</div>}
		</div>
	);
};

export default Add;
