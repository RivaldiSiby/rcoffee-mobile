export const successLogin = auth => {
  return {
    type: 'SUCCESS_LOGIN',
    payload: {...auth},
  };
};
export const failLogin = () => {
  return {
    type: 'FAIL_LOGIN',
  };
};
