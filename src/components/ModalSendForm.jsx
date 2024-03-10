import { Modal, Form, Button } from 'react-bootstrap';
import { LoginContext, PriceContext } from '../App';
import { useContext, useState } from 'react';
import { postRequest } from '../services/serverRequest';

export const ModalSendForm = ({ show, setShow, selectedGoods }) => {
  const handleClose = () => setShow(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const { auth } = useContext(LoginContext);
  const { priceArray } = useContext(PriceContext);

  const handleSend = () => {
    const orderObj =
      priceArray &&
      priceArray
        .filter((goods) => Object.keys(selectedGoods).includes(goods.id))
        .map((good1) => [good1.id, good1, selectedGoods[good1.id]]);
    console.log(orderObj);
    postRequest('/send_order', auth.token, {
      customerName: name,
      customerEmail: email,
      message: JSON.stringify(selectedGoods),
    })
      .then(() => {
        alert('Email successfully sended!!!');
        setShow(false);
      })
      .catch((err) => {
        alert('неудачно!!!');
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Отправка заказа для сборки</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@server.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="messageText">
            <Form.Label placeholder="Текст сообщения...">
              Комментарий к заказу
            </Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setMessageText(e.target.value)}
              rows={3}
              value={messageText}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!(email || name)}
          >
            Отправить заказ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
