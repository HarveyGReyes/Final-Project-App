export interface AuthContext {
    authToken?: string|null;
    currentUser?: User|null;
    handleLogin: (username: string, password: string) => Promise<string>;
    handleLogout: () => Promise<void>;
};

export interface User {
    user_id: number;
    username: string;
    type: string;
    iat: number;
    exp: number;
    employee_id: number|null;
}

export interface Teacher extends User {
    teacher_id: number,
}

export interface Class {
    class_id: number,
    teacher_id: number,
    class_name: string,
    subject: string,
    last_lesson_time: Date,
    last_exam_date: Date
}