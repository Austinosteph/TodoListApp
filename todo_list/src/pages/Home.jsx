import { useState, useEffect } from 'react';
import useFetch from '../component/useFetch';
import Add from '../component/Add';

const Home = () => {
	const { todos, error, isLoading } = useFetch('http://localhost:8000/todo');

	const [localTodos, setLocalTodos] = useState(todos);

	useEffect(() => {
		setLocalTodos(todos);
	}, [todos]);

	const handleDelete = (id) => {
		fetch(`http://localhost:8000/todo/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				setLocalTodos(localTodos.filter((todo) => todo.id !== id));
			})
			.catch((err) => console.error('Error deleting todo:', err));
	};

	const handleToggleStatus = (id, currentStatus) => {
		const newStatus = !currentStatus;

		fetch(`http://localhost:8000/todo/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ completed: newStatus }),
		})
			.then((res) => {
				if (res.ok) {
					setLocalTodos(
						localTodos.map((todo) =>
							todo.id === id ? { ...todo, completed: newStatus } : todo
						)
					);
				}
			})
			.catch((error) => {
				console.error('Error updating status:', error);
			});
	};

	return (
		<div className="bg-blue-700 min-h-screen bg-cover flex items-center justify-center">
			<div className="flex flex-col bg-white w-1/3 h-[500px] space-y-3 text-sm font-semibold rounded-md p-4">
				<h1 className="text-2xl font-semibold text-blue-800">To-Do List</h1>

				{/* Input Form */}
				<Add />

				{/* Handling error and Loading state */}
				{error && <div>{error}</div>}
				{isLoading && <div>Loading...</div>}

				{/* Mapping through todos */}
				{localTodos.map((todo) => (
					<div key={todo.id} className="flex flex-row space-x-3 items-center">
						<button
							className={`w-5 h-5 rounded-full border ${
								todo.completed ? 'bg-green-500' : 'bg-gray-300'
							}`}
							onClick={() => handleToggleStatus(todo.id, todo.completed)}
						></button>
						<p className={`text-xl ${todo.completed ? 'line-through' : ''}`}>
							{todo.title.toUpperCase()}
						</p>

						<button
							className="bg-red-400 text-white px-3 py-1 rounded-md"
							onClick={() => handleDelete(todo.id)}
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
