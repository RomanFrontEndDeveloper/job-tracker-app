import { API_URL } from '@/lib/api';
import type {
	AuthResponse,
	LoginFormValues,
	RegisterFormValues,
} from '../types/auth.types';

export async function registerUser(
	data: RegisterFormValues,
): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result: AuthResponse = await response.json();

	// якщо backend повернув помилку — кидаємо її в catch
	if (!response.ok) {
		throw new Error(result.message || 'Registration failed');
	}

	return result;
}

export async function loginUser(data: LoginFormValues): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result: AuthResponse = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Login failed');
	}

	return result;
}
