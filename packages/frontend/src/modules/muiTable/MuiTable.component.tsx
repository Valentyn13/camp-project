import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Switch,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { useMutation } from 'react-query';
import { ActionContainer } from './muiActionContainer.styled';
import { IResTodo } from '../common/types/todo.types';
import { TodoService } from '../app/services/todo.service';
import { ModalSetTodoWindow } from '../common/ModalSetTodoWindow/ModalSetTodo.component';

interface IMuiTableProps {
  todos: IResTodo[];
}
export const MuiTable = ({ todos }: IMuiTableProps) => {
  const { mutateAsync } = useMutation('delete todo', (id: string) => TodoService.deleteByID(id));
  const data = todos;
  const [pageActive, setPageActive] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<IResTodo>({} as IResTodo);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteTodo = async (id: string) => {
    await mutateAsync(id);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEditPage = (todo: IResTodo) => {
    setPageActive(true);
    setDataToEdit(todo);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Create at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const exRow = {
                ...row,
                viewed: false
              };
              return (
                <TableRow key={exRow._id}>
                  <TableCell>{exRow.title}</TableCell>
                  <TableCell>{exRow.content}</TableCell>
                  <TableCell>{exRow.createdAt}</TableCell>
                  <TableCell>
                    <ActionContainer>
                      <Switch />
                      <ModeIcon
                        component="svg"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleEditPage(row)}
                      />
                      <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => deleteTodo(row._id)} />
                    </ActionContainer>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ alignSelf: 'flex-end' }}
        component="div"
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {dataToEdit && (
        <ModalSetTodoWindow active={pageActive}>
          <div className="m-title">{dataToEdit.title}</div>
          <div className="m-content">
            <div className="m-description">Description:</div>
            <div className="m-data">{dataToEdit.content}</div>
            <div className="m-action-container">
              <div className="m-action-text" />
              <div className="m-actions" />
            </div>
            <div className="m-button-container">
              <Button
                onClick={() => {
                  setDataToEdit({} as IResTodo);
                  setPageActive(false);
                }}
              >
                Back
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        </ModalSetTodoWindow>
      )}
    </>
  );
};
