import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const ButtonRedirect = ({ label, link, style = null }) => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(link);
  };

  return (
    <React.Fragment>
      <Button className={style} onClick={handleRedirect}>
        {label}
      </Button>
    </React.Fragment>
  );
};

export default ButtonRedirect;
