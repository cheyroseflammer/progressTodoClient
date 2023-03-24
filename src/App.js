import React, { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';
const KEY = process.env.REACT_APP_API_URL;

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [todos, setTodos] = useState(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const getData = async () => {
    try {
      const response = await fetch(`${KEY}/todos/${userEmail}`);
      const json = await response.json();
      setTodos(json.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authToken) {
      getData();
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
