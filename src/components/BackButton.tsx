import styled from 'styled-components';
import arrow from '../assets/left-arrow.svg';

export const Image = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  top: 2.5rem;
  left: 1.5rem;
  cursor: pointer;
  border: solid 1px;
  border-color: #111;
  border-radius: 15px;
  padding: 0.3rem;
  background-color: #8b734c;
`;

export type BackButtonProps = {
  onClick: () => void;
};

export const BackButton = (props: BackButtonProps) => {
  const { onClick } = props;
  return <Image src={arrow} onClick={onClick} />;
};
