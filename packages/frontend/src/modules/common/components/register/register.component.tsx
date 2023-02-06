import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';

export const RegisterComponent = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleConfirmButton = () => {
    const userData = {
      name,
      password
    };
    console.log(userData);
    if (confirmPass === password) {
      console.log(userData);
      alert('User Register!');
    } else {
      alert('Type password again!');
    }
    setConfirmPass('');
    setName('');
    setPassword('');
  };
  return (
    <Container
      sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      maxWidth="lg"
    >
      <div style={{ maxWidth: '300px' }}>
        <h1>Todo App</h1>
        <form>
          <TextField
            sx={{ display: 'block', mb: '.5rem' }}
            size="small"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            size="small"
            type="password"
            label="Password"
            sx={{ display: 'block', mb: '.5rem' }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            helperText="Type password again"
            size="small"
            type="password"
            label="Password"
            sx={{ display: 'block', mb: '.5rem' }}
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size="medium" variant="outlined">
              Back
            </Button>
            <Button size="medium" variant="contained" onClick={handleConfirmButton}>
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
