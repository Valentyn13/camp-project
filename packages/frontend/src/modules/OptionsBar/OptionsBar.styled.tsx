import styled from 'styled-components';
import { SPACES } from '../theme/spaces.const';

export const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${SPACES.s};
  margin-botoom: ${SPACES.l};
`;

export const OptionsContainer = styled('div')`
  display: flex;
  width: 400px;
  justify-content: space-evenly;s
`;

export const Option = styled('div')`
  width: 20%;
  border: 1px solid black;
`;
