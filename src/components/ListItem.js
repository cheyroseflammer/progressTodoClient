import React, { useState } from 'react';
import TickIcon from './TickIcon';
import Modal from './Modal';

const ListItem = ({ todo, getData }) => {
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
        <button className='delete'>Delete</button>
      </div>
      {/* setShowModal={setShowModal} prop is to control close state*/}
      {showModal && (
        <Modal mode={'edit'} setShowModal={setShowModal} todo={todo} getData={getData} />
      )}
    </li>
  );
};

export default ListItem;
