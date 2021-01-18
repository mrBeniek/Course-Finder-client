import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputField = ({ ...props }) => {
  return (
    <React.Fragment>
      <TextField
        style={{ background: 'white' }}
        variant="filled"
        margin="normal"
        required
        fullWidth
        {...props}
      />
    </React.Fragment>
  );
};

export default InputField;
