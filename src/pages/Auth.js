import React, { useEffect } from 'react';
import authAxios from 'utils/authAxios';
import { useLocation, useHistory } from 'react-router-dom';

const AuthPage = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const fetchToken = async () => {
      const code = query.get('code');

      try {
        const response = await authAxios.post(
          '/api/auth/github/login',
          {
            data: code,
          }
        );

        const { data } = response;

        if (response.status === 200) {
          localStorage.setItem('token', data.token);
          localStorage.setItem(
            'userInfo',
            JSON.stringify(data.userInfo)
          );
          console.log('fetchToken done');
          if (data.msg === 'Login successful') {
            history.replace('/home');
          } else {
            history.replace('/auth/github/info/username');
          }
        }
      } catch (err) {
        console.log('fetchToken error');
        console.log(err);
        localStorage.removeItem('token');
        const { response } = err;
        if (response.status === 403) {
          if (response.data.msg === 'email') {
            history.replace('/auth/github/info/email');
          }
        }
      }
    };
    fetchToken();
  }, []);
  return <div></div>;
};

export default AuthPage;
