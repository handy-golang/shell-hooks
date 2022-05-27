import React, { useState, createContext, useContext } from 'react';
import { CountContext } from './CountContext';
// 全新的组件
const Counter = () => {
  const count = useContext(CountContext);
  return <p>子组件获得的点击数量：{count}</p>;
};

export default Counter;
