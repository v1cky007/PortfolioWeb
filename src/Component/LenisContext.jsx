// LenisContext.js
import React, { createContext, useContext } from 'react';

export const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);
