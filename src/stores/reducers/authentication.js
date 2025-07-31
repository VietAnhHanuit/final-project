import { createHandleReducer } from '../../helpers/reduxHelpers';
import {AuthenticationActions} from '../actions';

const initialState = {
  accessToken: undefined,
};
const setAuthenticationData = (
  state,
  action,
) => {
  const {payload} = action;
  state.userInfo = payload.userInfo;
  state.accessToken = payload.accessToken;
};

const logOut = (state) => {
  state.userInfo = undefined;
  state.accessToken = undefined;
};

const AuthenticationReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(AuthenticationActions.setAuthenticationData.request, setAuthenticationData)
    .addCase(AuthenticationActions.logout.request, logOut);
});

export default AuthenticationReducer;
