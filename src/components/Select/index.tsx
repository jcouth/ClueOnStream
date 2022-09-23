import React, { useState } from 'react';

import * as S from './styles';

interface Props<T> {
  selected: T;
  onSelect: React.Dispatch<React.SetStateAction<T>>;
  options: T[];
  disabled?: boolean;
}

function Select<T = any>({
  selected,
  onSelect,
  options,
  disabled = false,
}: Props<T>) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleToggle = () => {
    setShowOptions((oldState) => !oldState);
  };

  const handleSelectOption = (selected: T) => {
    onSelect(selected);
    setShowOptions(false);
  };

  return (
    <S.Container>
      <S.SelectedOption
        disabled={disabled}
        onClick={handleToggle}
      >{`${selected}`}</S.SelectedOption>
      {showOptions && (
        <S.ListContainer>
          <S.ListContent>
            {options.map((option) => (
              <S.ListItem key={`${option}`}>
                <S.ListButton
                  onClick={() => handleSelectOption(option)}
                >{`${option}`}</S.ListButton>
              </S.ListItem>
            ))}
          </S.ListContent>
        </S.ListContainer>
      )}
    </S.Container>
  );
}

export default Select;
