import React from 'react';
import { useQuery } from 'react-query';
import { TodoService } from '../../../app/services/todo.service';
import ButtonAppBar from '../../../MuiAppBar/MuiAppBar.component';
import { MuiTable } from '../../../muiTable/MuiTable.component';
import { OptionsBar } from '../../../OptionsBar/OptionsBar.component';
import { IResTodo } from '../../types/todo.types';
import { Container } from './home.styled';

export const HomeComponent = () => {
  const { isLoading, data: todos, error } = useQuery('todo list', () => TodoService.getAll());
  return (
    <Container>
      <ButtonAppBar />
      <OptionsBar />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error as any}</div>}
      {todos && <MuiTable todos={todos.data as IResTodo[]} />}
    </Container>
  );
};
