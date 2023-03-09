import React, { useState } from 'react';

const Modal = ({ mode, setShowModal, todo, getData }) => {
  const editMode = mode === 'edit' ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? todo.user_email : 'user1@test.com',
    title: editMode ? todo.title : null,
    description: editMode ? todo.description : null,
    date: editMode ? '' : new Date(),
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
      const response = await fetch('http://localhost:5000/todos/', {
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
      const response = await fetch('http://localhost:5000/todos/');
    } catch {}
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
            value={data.title}
            onChange={handleChange}
          />
          <input
            type='text'
            maxLength={255}
            placeholder='Your todo description'
            name='description'
            value={data.description}
            onChange={handleChange}
          />
          <input
            className={mode}
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
