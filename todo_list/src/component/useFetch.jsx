import { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);

				// If the response is not ok, throw an error
				if (!response.ok) {
					throw new Error(
						`Failed to fetch Url : ${response.status} : ${response.statusText}`
					);
				}
				const data = await response.json();
				setTodos(data);
				setIsloading(false);
				setError(null);
			} catch (error) {
				setError(error.message);
				setIsloading(false);
			}
		};
		fetchData();
	}, [url]);

	return { todos, error, isLoading };
};

export default useFetch;
