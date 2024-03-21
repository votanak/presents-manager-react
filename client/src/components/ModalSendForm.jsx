import { Modal, Form, Button } from 'react-bootstrap';
import { LoginContext } from '../App';
import { useContext, useState } from 'react';
import { postRequest } from '../services/serverRequest';
import { v1 as uuidv1 } from 'uuid';
import { jsonToWb } from '../services/jsonToWb';
import * as XLSX from 'xlsx';

export const ModalSendForm = ({ show, setShow, selectedGoods }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const { auth } = useContext(LoginContext);
  const giftId = uuidv1().slice(0, 8);

  const handleSend = () => {
    console.log(giftId);
    postRequest('/send_order', auth.token, {
      customerName: name,
      giftId,
      customerEmail: email,
      selectedGoods: JSON.stringify(selectedGoods),
    })
      .then(() => {
        alert('Email successfully sended!!!');
        setShow(false);
      })
      .catch((err) => {
        alert('неудачно!!!');
      });
  };

  const handleSave = (selectedGoods, giftId) => {
    jsonToWb(selectedGoods).xlsx.writeFile(`Сборный подарок ${giftId}.xlsx`);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
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
          <Button variant="secondary" onClick={() => setShow(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={() => handleSave(selectedGoods)}>
            Сохранить Excel-файл
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!(email && name)}
          >
            Отправить заказ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
