import styled from 'styled-components';

const FullWidth = styled.div`
  height: 60vh;
`;

export const Content = ({ children }) => {
  return (
    <FullWidth>
      <div>{children}</div>
    </FullWidth>
  );
};
