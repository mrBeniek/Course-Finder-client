import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useCredentials = () => {
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const history = useHistory();

  const credentialsSend = async (path, payload) => {
    setStatus('pending');
    setMsg('');

    try {
      const response = await axios.post(path, {
        data: payload,
      });
      const { data } = response;
      console.log('DATA IS');
      console.log(data);
      if (response.status === 200) {
        setStatus('success');
        setMsg(data.msg);
        setTimeout(() => {
          localStorage.setItem('token', data.token);
          localStorage.setItem(
            'userInfo',
            JSON.stringify(data.userInfo)
          );
          history.replace('/');
        }, 700);
      }
    } catch (err) {
      const { response } = err;
      if (response.status === 403) {
        setMsg(response.data.msg);
      } else
        setMsg(
          'Sorry, something went wrong, try again later'
        );

      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
      console.error(err);
    }
  };

  return { credentialsSend, status, msg };
};

export default useCredentials;
