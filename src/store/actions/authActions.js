export const fetchLogout = () => {
  return async (dispatch) => {
    NavigationService.navigateAndReset('Start');
    dispatch(R_logout());
    let keys = ['$leppiUserId', '$leppiSkipWelcome', '$leppiFCMToken'];
    try {
      await AsyncStorage.multiRemove(keys);
      await firebase.auth().signOut();
    } catch (e) {
      dispatch(isLoading(false));
    }
  };
};

export const fetchingLoginRequest = () => ({
  type: TYPES.FETCHING_LOGIN_REQUEST,
});

export const fetchingLoginSuccess = (json) => ({
  type: TYPES.FETCHING_LOGIN_SUCCESS,
  payload: json,
});

export const fetchingLoginFailure = (error) => ({
  type: TYPES.FETCHING_LOGIN_FAILURE,
  payload: error,
});

export const fetchLogin = (data, navigate) => {
  return async (dispatch) => {
    dispatch(fetchingLoginRequest());
    const {email, password} = data;
    // //console.log('===== fetchLogin');
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          await AsyncStorage.setItem('$leppiUserId', user.user.uid);
          dispatch(fetchingLoginSuccess(user));
          let skipWelcome = await AsyncStorage.getItem('$leppiSkipWelcome');
          if (skipWelcome === '1') {
            dispatch(updateMenu(MENU_TYPES.HOME));
            navigate('Home');
          } else {
            navigate('Welcome');
          }
        })
        .catch((error) => {
          const {code, message} = error;
          const errorMessage = message.replace(code, '').replace('[]', '');
          dispatch(fetchingLoginFailure(errorMessage));
          Toast.show(errorMessage, Toast.SHORT);
        });
    } catch (e) {
      dispatch(isLoading(false));
    }
  };
};

export const R_logout = () => ({
  type: TYPES.LOG_OUT,
});

export const isLoading = (loading) => ({
  type: TYPES.IS_LOADING,
  payload: loading,
});
