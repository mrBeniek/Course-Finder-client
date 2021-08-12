import styles from './OpeningModal.module.scss';
import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { Container, Typography } from '@material-ui/core';

const OpeningModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.openingModal) setOpen(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem('openingModal', true);
    setOpen(false);
  };

  return (
    <Modal
      className={styles.modal}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Container className={styles.container}>
        <Typography variant="h5">
          Welcome to Course Finder(beta)!
        </Typography>
        <br />
        <Typography variant="h6">
          If you find any bugs (and you will) or have any
          suggestions, please use the 'Report Bug' option
          from top-right menu, after you log in.
        </Typography>
        <br />
        <Typography variant="h6" align="right">
          Thanks!
          <br />
          Tomasz Karpeta
        </Typography>
      </Container>
    </Modal>
  );
};

export default OpeningModal;
