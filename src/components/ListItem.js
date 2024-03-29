import React, { useState } from 'react';
import TickIcon from './TickIcon';
import Modal from './Modal';
// import Auth from './Auth';

const ListItem = ({ todo, getData }) => {
  const KEY = process.env.REACT_APP_API_URL;
  const deleteData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${KEY}/todos/${todo.user_email}/${todo.todo_id}`, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.status === 204) {
        console.log('todo deleted successfully');
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <li className='list-item' key={todo.id}>
      <TickIcon />
      <div className='info-container'>
        <h2 className='task-title'>{todo.title}</h2>
        <p className='task-desc'>{todo.description}</p>
      </div>
      <div className='button-container'>
        <button className='edit' onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className='delete' onClick={deleteData}>
          Delete
        </button>
      </div>
      {/* setShowModal={setShowModal} prop is to control close state*/}
      {showModal && (
        <Modal mode={'edit'} setShowModal={setShowModal} todo={todo} getData={getData} />
      )}
    </li>
  );
};

export default ListItem;
