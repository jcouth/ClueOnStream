import React, { useCallback, useEffect, useState } from 'react';

import Button from 'components/Button';

import * as S from './styles';

enum Status {
  VISIBLE,
  HIDDEN,
}

interface Props {
  isVisible: boolean;
  title: string;
  subtitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<Props> = ({
  isVisible,
  title,
  subtitle,
  onCancel,
  onConfirm,
}) => {
  const [status, setStatus] = useState<Status>(Status.HIDDEN);
  const [dismissModal, setDismissModal] = useState<boolean>(false);

  const handleAnimationEnd = () => {
    if (status === Status.HIDDEN && dismissModal) {
      onCancel();
    }
  };

  const getStatus = useCallback(() => {
    if (isVisible) {
      setStatus(Status.VISIBLE);
      setDismissModal(true);
    }
  }, [isVisible]);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return (
    <S.Wrapper
      className={
        status === Status.VISIBLE
          ? 'visible'
          : dismissModal
          ? 'visible hidden'
          : ''
      }
      onAnimationEnd={handleAnimationEnd}
    >
      <S.Container
        className={
          status === Status.VISIBLE
            ? 'visible'
            : dismissModal
            ? 'visible hidden'
            : ''
        }
      >
        <S.Title>{title}</S.Title>
        <S.Content>
          <S.Subtitle>{subtitle}</S.Subtitle>
          <S.Buttons>
            <Button
              title="Cancelar"
              variant="secondary"
              isActive
              onClick={() => setStatus(Status.HIDDEN)}
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
    </S.Wrapper>
  );
};

export default Modal;
