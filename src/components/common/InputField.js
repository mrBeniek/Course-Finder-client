import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputField = ({ ...props }) => {
  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        {...props}
      />
    </React.Fragment>
  );
};

export default InputField;
