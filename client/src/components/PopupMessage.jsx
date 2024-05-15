import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

export const PopupMessage = ({ message }) => {
  const [show, setShow] = useState(true);
  useEffect(() => () => setTimeout(setShow(false), 2000), []);
  return (
    <Modal show={show}>
      <Modal.Body>
        <div></div>
      </Modal.Body>
    </Modal>
  );
};
