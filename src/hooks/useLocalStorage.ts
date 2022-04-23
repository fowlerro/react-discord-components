import { useState } from 'react';

interface UseLocalStorageProps<T> {
	key: string;
	initialValue?: T;
}

export default function useLocalStorage<T>({
	key,
	initialValue,
}: UseLocalStorageProps<T>): readonly [T, (value: T | ((value: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') return initialValue;

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (err) {
			console.error(err);
			return initialValue;
		}
	});

	const setValue = (value: T | ((value: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== 'undefined')
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue] as const;
}
