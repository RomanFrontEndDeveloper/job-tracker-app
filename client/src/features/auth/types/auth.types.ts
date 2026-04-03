export interface RegisterFormValues {
	name: string;
	email: string;
	password: string;
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface AuthUser {
	id: string;
	name: string;
	email: string;
}

export interface AuthResponse {
	message: string;
	success: boolean;
	token?: string;
	user?: AuthUser;
}
