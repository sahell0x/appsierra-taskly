export const HOST =  import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const USER_BASE_ROUTE = "api";

export const USER_ROUTE = `${USER_BASE_ROUTE}/user`;

export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const TASKS_ROUTE = `${USER_BASE_ROUTE}/task`;

export const PROJECT_ROUTE = `${USER_BASE_ROUTE}/project`;

export const TASKS_STATUS_UPDATE_ROUTE = `${TASKS_ROUTE}/status`;
 