import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */

import {
	RESET_PASSWORD_LOAD,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from 'containers/ResetPassword/actions';


import {
	SET_PASSWORD_LOAD,
	SET_PASSWORD_SUCCESS,
	SET_PASSWORD_FAIL,
} from 'containers/SetPassword/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	loading: false,
	error: undefined,
	user: {},
	resetPasswordError: undefined,
	resetPasswordLoading: false,
	setPasswordError: undefined,
	setPasswordLoading: false
});


/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {

	switch (action.type) {

	case RESET_PASSWORD_LOAD:
		return state.merge({
			resetPasswordLoading: true,
			resetPasswordError: undefined,
		});
	case RESET_PASSWORD_SUCCESS:
		return state.merge({
			resetPasswordLoading: false,
			resetPasswordError: undefined,
		});
	case RESET_PASSWORD_FAIL:
		return state.merge({
			resetPasswordError: action.error,
			resetPasswordLoading: false,
		});

	case SET_PASSWORD_LOAD:
		return state.merge({
			setPasswordLoading: true,
			setPasswordError: undefined,
		});
	case SET_PASSWORD_SUCCESS:
		return state.merge({
			setPasswordLoading: false,
			user: {
				email: action.result.email
			}
		});
	case SET_PASSWORD_FAIL:
		return state.merge({
			setPasswordLoading: false,
			setPasswordError: true,
		});

	default:
		return ensureImmutable(state);
	}
}
