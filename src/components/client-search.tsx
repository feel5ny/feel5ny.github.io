'use client';

import { Search } from 'nextra/components';
import React from 'react';

type ClientSearchProps = {
  placeholder?: string;
};

const ClientSearch: React.FC<ClientSearchProps> = ({ placeholder = 'Search posts...' }) => {
  return <Search placeholder={placeholder} />;
};

export default ClientSearch;

