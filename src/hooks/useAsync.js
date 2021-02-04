import { useState } from 'react';

const useAsync = () => {
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const asyncRequest = async (callback, loading = true) => {
    if (loading === true) {
      setStatus('pending');
      setMsg('');
    }

    try {
      const response = await callback;
      const { data } = response;

      if (response.status === 200) {
        if (loading === true) {
          setStatus('success');
          setMsg(data.msg);
        }
        setTimeout(() => {
          setStatus('idle');
        }, 4500);
        return data;
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
      }, 4500);
      console.error(err);
      return 'err';
    }
  };

  return { asyncRequest, status, msg };
};

export default useAsync;
