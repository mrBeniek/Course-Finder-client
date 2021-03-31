import React, { useEffect } from 'react';
import authAxios from 'utils/authAxios';
import { useLocation, useHistory } from 'react-router-dom';

const Auth = () => {
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
          history.push('/');
        }
      } catch (err) {
        console.log('fetchToken error');
        console.log(err);
      }
    };
    fetchToken();
  }, []);
  return <div></div>;
};

export default Auth;
