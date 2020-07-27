import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-simple-toast';
import {CommonActions} from '@react-navigation/native';

import * as TYPES from '../constants';

export const fetchLogout = (navigationDispatch) => {
  return async (dispatch) => {
    try {
      dispatch(R_logout());
      await auth().signOut();
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });

      navigationDispatch(resetAction);

    } catch (e) {
      dispatch(isLoading(false));
    }
  };
};

export const updateProfile = (profileData, callback, userId) => {
  return async (dispatch) => {
    try {
      database()
        .ref(`users/${userId}`)
        .update(profileData)
        .then(() => {
          callback();
          Toast.show('Profile successfully updated!');
        })
        .catch((err) => {
          callback();
          Toast.show(err);
        });
    } catch (err) {
      callback();
      console.log(err);
    }
  };
};

export const uploadImage = (imageSrc, userId, callback) => {
  return async (dispatch) => {
    try {
      const sessionId = `images-${new Date().getTime()}`;
      const imageRef = firebase.storage().ref(sessionId);
      imageRef.putFile(imageSrc).then(async () => {
        let downloadUrl = await imageRef.getDownloadURL();

        database()
          .ref(`users/${userId}`)
          .update({
            thumbnail: downloadUrl,
          })
          .then(() => {
            callback();
            Toast.show('Profile Picture successfull updated!');
          })
          .catch((err) => {
            callback();
            Toast.show(err);
          });
      });
    } catch (err) {
      callback();
      Toast.show(err);
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
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          async ({
            user: {
              _user: {uid},
            },
          }) => {
            getUserDetails(uid, callback, navigate);
          },
        )
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

export const getUserDetails = (
  uid,
  callback = () => {},
  navigate = () => {},
) => {
  return async (dispatch) => {
    try {
      database()
        .ref(`users/${uid}`)
        .once('value')
        .then((snapshot) => {
          dispatch(fetchingLoginSuccess({...snapshot.val(), userId: uid}));
          callback();
          navigate('Home');
        });
    } catch (err) {
      console.log(err, 'ERROR');
    }
  };
};

export const fetchSignup = (data, navigate) => {
  return async (dispatch) => {
    const {
      email,
      password,
      displayName,
      userType,
      contactNo,
      address,
      callback,
      thumbnail,
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
                userType,
                contactNo,
                address,
                thumbnail,
                userId: uid
              })
              .then(() => {
                dispatch(
                  fetchingLoginSuccess({
                    email,
                    password,
                    displayName,
                    userType,
                    contactNo,
                    address,
                    thumbnail,
                    userId: uid,
                  }),
                );

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
      Toast.show(e);
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
