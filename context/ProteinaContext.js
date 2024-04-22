import React, { createContext, useState } from 'react';

export const ProteinaContext = createContext();

export const ProteinaProvider = ({ children }) => {
  const [metaDiaria, setMetaDiaria] = useState('');
  const [registros, setRegistros] = useState([]);


  return (
    <ProteinaContext.Provider value={{ metaDiaria, setMetaDiaria, registros, setRegistros }}>
      {children}
    </ProteinaContext.Provider>
  );
};
