import { Modal, Form, Button } from 'react-bootstrap';

export const ModalSendForm = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Отправка заказа для сборки</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Имя" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>e-mail</Form.Label>
            <Form.Control type="email" placeholder="name@server.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="messageText">
            <Form.Label placeholder="Текст сообщения...">
              Комментарий к заказу
            </Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Отправить заказ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
