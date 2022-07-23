import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Loading from '../component/loading';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../redux/actionCreator/loading';
import {failLogin} from '../../redux/actionCreator/login';
import {GenerateToken} from '../../modules/auth/checkAuth';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        // cek status login
        if (login.status === false) {
          dispatch(failLogin());
          return navigation.replace('Landing');
        }
        await GenerateToken(login.auth);

        if (user.status === 'inactive') {
          navigation.replace('Activation');
        } else {
          navigation.replace('Home', {
            screen: 'Home',
            params: {notif: 'Welcome'},
          });
        }
      } catch (error) {
        console.log(error);
        console.log(error.request.status);

        if (error.request.status !== 400) {
          if (error.request.status === 401) {
            dispatch(failLogin());
            navigation.navigate('Landing');
          }
          //   const screen = ErrorsHandler(error.request.status);
          //   console.log(screen);
          //   navigation.navigate(screen);
        }
      }
    };
    checkLogin();
  }, []);
  return (
    <>
      <Loading />
    </>
  );
};

export default Splash;
