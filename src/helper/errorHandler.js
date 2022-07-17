// import React from "react";
import {useDispatch} from 'react-redux';
import {failLogin} from '../redux/actionCreator/login';

export default function ErrorsHandler(status, Navigate) {
  const dispatch = useDispatch();

  //   auth error
  if (status === 401) {
    dispatch(failLogin());
    Navigate('/Login');
  }
  //   forbiden error
  if (status === 403) {
    Navigate('/Login');
  }
  // notfound error
  //   if (status === 404) {
  //     Navigate("*");
  //   }
}
