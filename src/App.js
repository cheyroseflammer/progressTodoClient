import React, { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';

const App = () => {
  console.log(process.env.REACT_API_URL);
  const [todos, setTodos] = useState(null);
  const authToken = true;
  const getData = async () => {
    const userEmail = 'user1@test.com';
    try {
      const response = await fetch(`http://localhost:5000/todos/${userEmail}`);
      const json = await response.json();
      setTodos(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((authToken) => {
    if (authToken) {
      getData();
      console.log('I am being reached');
    }
  }, []);

  // Sort todo by date
  const sortedTodos = todos?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'✅ Progress Tick List'} getData={getData} />
          {sortedTodos?.map((todo, index) => (
            <ListItem todo={todo} key={index} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
