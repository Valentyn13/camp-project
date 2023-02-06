import styled from 'styled-components';
import { SPACES } from '../../../theme/spaces.const';
// import { COLORS } from '../../../theme/colors.const';

export const Container = styled('div')`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${SPACES.l};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
