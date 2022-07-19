import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Loading from '../loading';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../redux/actionCreator/loading';
import {failLogin} from '../../redux/actionCreator/login';
import {GenerateToken} from '../../modules/auth/checkAuth';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await GenerateToken(login.auth);

        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
        console.log(error.request.status);

        if (error.request.status !== 400) {
          if (error.request.status === 401) {
            dispatch(failLogin());
            navigation.navigate('Login');
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
