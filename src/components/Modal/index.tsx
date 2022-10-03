import React from 'react';

import Button from 'components/Button';

import * as S from './styles';

interface Props {
  title: string;
  subtitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<Props> = ({ title, subtitle, onCancel, onConfirm }) => {
  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.Title>{title}</S.Title>
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        </S.Header>
        <S.Buttons>
          <Button
            title="Cancelar"
            variant="secondary"
            isActive
            onClick={onCancel}
          />
          <Button
            title="Confirmar"
            variant="primary"
            isActive
            onClick={onConfirm}
          />
        </S.Buttons>
      </S.Content>
    </S.Container>
  );
};

export default Modal;
