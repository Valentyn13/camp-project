import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';

export const LoginComponent = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirmButton = () => {
    const userData = {
      name,
      password
    };
    alert('Login complete');
    console.log(userData);
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
