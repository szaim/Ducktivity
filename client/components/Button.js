import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? '#91c5d4' : 'white'};
  color: ${props => props.primary ? 'white' : '#0891E8'};

  font-size: 1.5em;
  margin: 1em;
  padding: 1em 1.5em;
  border: 0.1em solid #0891E8
  border-radius: 1em;
`;

export default Button;
module.exports = Button;
