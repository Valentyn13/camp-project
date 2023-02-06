import React, { ReactNode } from 'react';
import './ModalSetTodo.style.css';

interface IModalProps {
  active: boolean;
  children: ReactNode;
}
export const ModalSetTodoWindow = ({ active, children }: IModalProps) => (
  <div className={active ? 'modal-set modal-active-set' : 'modal-set'}>
    <div className={active ? 'modal-content-set modal-content-active-set' : 'modal-content-set'}>
      {children}
    </div>
  </div>
);
