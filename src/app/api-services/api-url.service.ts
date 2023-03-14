import { environment } from '../../environments/environment';

export const APIURL = {
	// check server connection
	CHECK_SERVER_CONNECTION: environment.apiUrl + '/server',
	GET_TEST_AUTHORS_DATA: environment.apiUrl + '/get_test_authors',

	// Admin authentication & authorization API URL's
	ADD_NEW_ADMIN_DATA: environment.apiUrl + '/add_new_admin_data',
	ADMIN_LOGIN: environment.apiUrl + '/admin_login',
	CHECK_VALIDATE_ADMIN_LOGIN: environment.apiUrl + '/check_validate_login',
	ADMIN_RESIGNIN: environment.apiUrl + '/admin_resignin',
	ADMIN_AND_SETTINGS_LOGOUT: environment.apiUrl + '/admin_and_settings_logout',

	// Admin settings API URL's
	ADMIN_SETTINGS_LOGIN: environment.apiUrl + '/admin_settings_login',
	ADMIN_SETTINGS_LOGOUT: environment.apiUrl + '/admin_settings_logout',
	GET_ADMIN_SETTINGS_DATA: environment.apiUrl + '/get_admin_settings_data',
	GET_ADMIN_PROFILE_BY_ID: environment.apiUrl + '/get_admin_profile_by_id',
	UPDATE_ADMIN_PROFILE_DATA: environment.apiUrl + '/update_admin_profile_data',
	ADMIN_CHANGE_PASSWORD: environment.apiUrl + '/update_admin_password',
	GET_ADMIN_SETTINGS_HISTORY_DATA: environment.apiUrl + '/get_admin_settings_history_data'
}