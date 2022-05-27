import React, { useState, createContext, useContext } from 'react';

import { CountContext } from './CountContext';

import Counter from './counter';

const ContextDemo = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>父组件点击数量：{count}</p>
      <button onClick={() => setCount(count + 1)}>点击+1</button>
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  );
};

export default ContextDemo;
