// import React from "react";
import {useDispatch} from 'react-redux';
import {failLogin} from '../redux/actionCreator/login';

export default function ErrorsHandler(status) {
  const dispatch = useDispatch();

  //   auth error
  if (status === 401) {
    console.log('tes');
    dispatch(failLogin());
    return 'Login';
  }
  //   forbiden error
  if (status === 403) {
    return 'Login';
  }
  // notfound error
  //   if (status === 404) {
  //     Navigate("*");
  //   }
}
