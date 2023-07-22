import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Modal = ({ mode, setShowModal, todo, getData }) => {
  const KEY = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === 'edit' ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? todo.user_email : cookies.Email,
    title: editMode ? todo.title : null,
    description: editMode ? todo.description : null,
    date: editMode ? todo.date : new Date(),
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((data) => ({
      // setting whatever is in our "name" as the value
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${KEY}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      if (response.status === 201) {
        console.log('Todo posted sucessfully');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${KEY}/todos/${todo.user_email}/${todo.todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      if (response.status === 200) {
        console.log('Todo updated sucessfully');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title'>
          <h3>Let's {mode} a todo!</h3>
          <button onClick={() => setShowModal(false)}>x</button>
        </div>
        <form action='submit'>
          <input
            type='text'
            required
            maxLength={30}
            placeholder='Your todo title'
            name='title'
            id='title'
            //  added or '' for test cases
            value={data.title || ''}
            onChange={handleChange}
          />
          <input
            type='text'
            maxLength={255}
            placeholder='Your todo description'
            name='description'
            //  added or '' for test cases
            value={data.description || ''}
            onChange={handleChange}
            id='description'
          />
          <input
            className={mode}
            id='sumbit-button'
            type='submit'
            value='submit'
            onClick={editMode ? putData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
