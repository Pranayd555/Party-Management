// const BASE_URL = 'https://ap.greatfuturetechno.com';

import { environment } from "src/environments/environment";



export const USERS_URL = environment.apiUrl;
export const PARTIES_URL = USERS_URL + 'party/';
export const LOGIN_URL = USERS_URL + 'login/';
export const LOGOUT_URL = USERS_URL + 'logout/';