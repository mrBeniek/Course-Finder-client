import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useAsync = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const history = useHistory();

  const snackbarClose = () => {
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 4500);

    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  const asyncRequest = async (callback, loading = true) => {
    if (loading === true) {
      setStatus('pending');
      setMsg('');
      setSnackbarOpen(true);
    }

    try {
      const response = await callback;
      const { data } = response;

      if (response.status === 200) {
        if (loading === true) {
          setStatus('success');
          setMsg(data.msg);
        }

        snackbarClose();

        return { ok: true, data: data };
      }
    } catch (err) {
      console.error(err);
      const { response } = err;
      if (response.status === 404) {
        history.replace('/404');
        return {
          ok: false,
          data: response,
        };
      }
      if (response.status === 403) {
        setMsg(response.data.msg);
      } else if (response.status === 401) {
        // invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expires');
        setMsg(response.data.msg);
        setTimeout(() => {
          history.push('/login');
        }, 1000);
      } else
        setMsg(
          'Sorry, something went wrong, try again later'
        );

      setStatus('error');
      snackbarClose();

      return {
        ok: false,
        data: response,
      };
    }
  };

  return { asyncRequest, snackbarOpen, status, msg };
};

export default useAsync;
