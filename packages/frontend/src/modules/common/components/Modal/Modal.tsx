import React, { ReactNode } from 'react';
import './Modal.css';

interface IModalProps {
  active: boolean;
  children: ReactNode;
}
export const Modal = ({ active, children }: IModalProps) => (
  <div className={active ? 'modal modal-active' : 'modal'}>
    <div className={active ? 'modal-content modal-content-active' : 'modal-content'}>
      {children}
    </div>
  </div>
);
