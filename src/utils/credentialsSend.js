import axios from 'axios';

const credentialsSend = async (path, payload) => {
  try {
    const response = await axios.post(path, {
      data: payload,
    });
    const { data } = response;
    console.log('DATA IS');
    console.log(data);
    if (response.status === 200) {
      setTimeout(() => {
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify(data.userInfo)
        );
      }, 400);

      return { status: 200, msg: 'Login successful' };
    }
  } catch (err) {
    console.log(err);
  }
};

export default credentialsSend;
