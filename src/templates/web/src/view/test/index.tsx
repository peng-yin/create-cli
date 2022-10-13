import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'antd';
import axios from 'axios';
import { getCount, increate, decreate } from './model';

const Test: React.FC = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('react');

  const count = useSelector(getCount);

  const dispatch = useDispatch();

  const fetch = useCallback(async () => {
    const result = await axios(`https://hn.algolia.com/api/v1/search?query=${query}`);

    setData(result.data);
  }, [query])

  useEffect(() => {
  if(window.location.search) {
      setQuery('red')
    }
    fetch()
  }, [fetch])

  return (
    <h1>
      <ul>
        <h2>{count}</h2>
        <Button type='primary' onClick={() => dispatch(increate({ count: 1}))}>增加</Button>
        <Button onClick={() => dispatch(decreate({ count: 1}))}>减少</Button>
        {data.hits.map(item => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
    </h1>
  );
};

export default Test;
