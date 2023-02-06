/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button, ButtonGroup, TextField, Container } from '@mui/material';
import { useMutation } from 'react-query';
import { Wrapper } from './OptionsBar.styled';
import { SearchBar } from '../common/components/searchbar/SearchBar';
import { Modal } from '../common/components/Modal/Modal';
import { TodoService } from '../app/services/todo.service';
import { ICreate } from '../common/types/todo.types';

export const OptionsBar = () => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('text');
  const { mutateAsync } = useMutation('create todo', (data: ICreate) => TodoService.create(data));
  const handleCreate = async () => {
    const data = {
      title,
      content
    };
    await mutateAsync(data);
    setActive(false);
  };
  return (
    <Wrapper>
      <div>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="outlined">All</Button>
          <Button variant="outlined">Private</Button>
          <Button variant="outlined">Publick</Button>
          <Button variant="outlined">Completed</Button>
        </ButtonGroup>
        <Button
          onClick={() => setActive(true)}
          variant="contained"
          sx={{ alignSelf: 'flex-start', marginLeft: '20px' }}
        >
          Create
        </Button>
      </div>
      <Modal active={active}>
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div style={{ fontSize: '24px' }}>Title</div>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          />
          <div>Content</div>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="outlined-multiline-static"
            label="Content"
            multiline
            rows={4}
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          />
          <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button onClick={() => setActive(false)} variant="contained" color="error">
              Back
            </Button>
            <Button variant="contained" sx={{ display: 'block' }} onClick={handleCreate}>
              Create
            </Button>
          </Container>
        </form>
      </Modal>
      <SearchBar />
    </Wrapper>
  );
};
