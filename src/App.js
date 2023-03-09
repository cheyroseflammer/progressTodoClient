import React, { useEffect } from 'react';
import ListHeader from './components/ListHeader';

const App = () => {
  const getData = async () => {
    const userEmail = 'user1@test.com';
    try {
      const response = await fetch(`http://localhost:5000/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='app'>
      <ListHeader listName={'✅ Progress Tick List'} />
    </div>
  );
};

export default App;
