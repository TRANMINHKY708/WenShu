import React from 'react';

const Input = ({ onChange }) => {
  return (
    <input
      type="text"
      placeholder="Tìm kiếm truyện"
      onChange={onChange}
    />
  );
};

export default Input;
