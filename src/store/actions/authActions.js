import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

import TYPES from '../constants';

export const fetchLogout = () => {
  return async (dispatch) => {
    NavigationService.navigateAndReset('Login');
    dispatch(R_logout());
    try {
      await auth().signOut();
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
    const {email, password, callback} = data;
    // //console.log('===== fetchLogin');
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          callback();
        //   dispatch(fetchingLoginSuccess(user));
          navigate('Home');
        })
        .catch((error) => {
          const {code, message} = error;
          const errorMessage = message.replace(code, '').replace('[]', '');
          callback();
          Toast.show(errorMessage, Toast.SHORT);
        });
    } catch (e) {
      Toast.show(e, Toast.SHORT);
      callback();
    }
  };
};

export const fetchSignup = (data, navigate) => {
  return async (dispatch) => {
    const {
      email,
      password,
      displayName,
      selectedItem,
      contactNo,
      address,
      callback,
    } = data;
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          async ({
            user: {
              _user: {uid},
            },
          }) => {
            database()
              .ref(`users/${uid}`)
              .set({
                email,
                password,
                displayName,
                selectedItem,
                contactNo,
                address,
              })
              .then(() => {
                callback();
                Toast.show('Successfully created user', Toast.SHORT);
                navigate('Home');
              })
              .catch((err) => {
                callback();
                Toast.show(err, Toast.SHORT);
              });
          },
        )
        .catch((error) => {
          callback();
          const {code, message} = error;
          const errorMessage = message.replace(code, '').replace('[]', '');
          Toast.show(errorMessage, Toast.SHORT);
        });
    } catch (e) {
      callback();
      console.log(e, 'RREEERR');
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
