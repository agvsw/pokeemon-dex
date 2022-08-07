import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';

const { Search } = Input;


const SearchForm = ({onSearch}) => {
  return (
    <Search placeholder="input name" onSearch={onSearch} enterButton />
  )
}

export default SearchForm;