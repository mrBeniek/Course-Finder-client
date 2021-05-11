import styles from './Info.module.scss';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';

const Info = ({ status, msg, redirect = null }) => {
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        history.push(redirect[0]);
      }, redirect[1]);
    }
  });

  return (
    <div className={styles.main}>
      {status === 'success' ? (
        <CheckCircleOutlinedIcon
          className={styles.icon}
          style={{ color: 'green' }}
        />
      ) : status === 'error' ? (
        <ErrorOutlineIcon
          className={styles.icon}
          style={{ color: 'red' }}
        />
      ) : (
        <WarningIcon
          className={styles.icon}
          style={{ color: 'orange' }}
        />
      )}

      <div className={styles.text}>
        <Typography variant="h6">{msg}</Typography>
      </div>
    </div>
  );
};

export default Info;
