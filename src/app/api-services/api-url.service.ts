import { environment } from '../../environments/environment';

export const APIURL = {
	// check server connection
	CHECK_SERVER_CONNECTION: environment.apiUrl + '/server',

	// Admin authentication & authorization API URL's
	ADMIN_LOGIN: environment.apiUrl + '/admin_login',
	ADD_NEW_ADMIN_DATA: environment.apiUrl + '/add_new_admin_data',
	ADMIN_RESIGNIN: environment.apiUrl + '/admin_resignin',
	CHECK_VALIDATE_ADMIN_LOGIN: environment.apiUrl + '/check_validate_login',

	GET_ADMIN_PROFILE_BY_ID: environment.apiUrl + '/get_admin_profile_by_id',
	UPDATE_ADMIN_PROFILE_DATA: environment.apiUrl + '/update_admin_profile_data',
	ADMIN_CHANGE_PASSWORD: environment.apiUrl + '/update_admin_password'
}