const devCheck =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://server.tomaszkarpeta.pl';

export default devCheck;
