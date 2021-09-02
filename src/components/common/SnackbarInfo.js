import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
  return (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
}

const SnackbarInfo = ({ open, msg, status }) => {
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
      >
        {status === 'success' ? (
          <Alert severity="success">{msg}</Alert>
        ) : status === 'pending' ? (
          <div>
            <CircularProgress />
            <div>{msg}</div>
          </div>
        ) : (
          <Alert severity="error">{msg}</Alert>
        )}
      </Snackbar>
    </React.Fragment>
  );
};

export default SnackbarInfo;
