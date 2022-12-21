import styled from 'styled-components';
import { Black, LightGray100, LightGray350, White } from '../../utils/colors';
import { NavWidthTab } from '../organisms/Navigation';

const NavLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  height: ${75}px;
  color: ${(props) => (props.isActive === 'y' ? White : LightGray350)};
  background-color: ${(props) => (props.isActive === 'y' ? Black : White)};
  border-bottom: 1px solid
    ${(props) => (props.isActive === 'y' ? Black : LightGray100)};
  font-weight: ${(props) => (props.isActive === 'y' ? 700 : 400)};
  padding: 0 7px;
  text-align: center;
  word-break: keep-all;
  line-height: 18px;
`;

export default function NavIcon({ text, isActive }) {
  return <NavLi isActive={isActive}>{text}</NavLi>;
}
