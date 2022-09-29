import React from 'react';

import * as S from './styles';

type Props = S.ButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> &
  (
    | {
        title?: never;
        children: React.ReactNode;
      }
    | {
        title: string | number;
        children?: never;
      }
  );

const Button: React.FC<Props> = ({
  title,
  children,
  variant,
  isActive,
  onClick,
  ...rest
}) => (
  <S.Button variant={variant} isActive={isActive} onClick={onClick} {...rest}>
    {title ? <S.ButtonText>{title}</S.ButtonText> : children}
  </S.Button>
);

export default Button;
