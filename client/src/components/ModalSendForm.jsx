import { Modal, Form, Button } from 'react-bootstrap';
import { LoginContext } from '../App';
import { useContext, useState } from 'react';
import { postRequest } from '../services/serverRequest';
import { v1 as uuidv1 } from 'uuid';
import { jsonToWb } from '../services/jsonToWb';
import FileSaver from 'file-saver';

export const ModalSendForm = ({ show, setShow, selectedGoods }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const { auth } = useContext(LoginContext);
  const giftId = uuidv1().slice(0, 8);
  const [isValid, setIsValid] = useState(false);

  const handleSend = () => {
    postRequest('/send_order', auth.token, {
      customer: customer,
      giftId,
      selectedGoods: JSON.stringify(selectedGoods),
    })
      .then(() => {
        alert('Email successfully sended!!!');
        setShow(false);
      })
      .catch((err) => {
        alert('неудачная отправка email!!!');
        throw err;
      });
  };

  const handleSave = async () => {
    const buffer = await jsonToWb(
      selectedGoods,
      giftId,
      customer,
    ).xlsx.writeBuffer();
    FileSaver.saveAs(new Blob([buffer]), `Сборный подарок ${giftId}.xlsx`);
  };

  const handleBlur = (e) => {
    console.log(e.target.id);
    let regExp = '';
    switch (e.target.id) {
      case 'phone':
        regExp = /(?:\+|\d)[\d-() ]{9,}\d/g;
        break;
      case 'email':
        regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        break;
      default:
        break;
    }
    console.log(e.target.value.match(regExp));
    setCustomer({
      ...customer,
      [e.target.id]: e.target.value,
    });
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
              onBlur={handleBlur}
              value={customer.name}
              autoFocus
              controlId="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Тилипон:</Form.Label>
            <Form.Control
              type="phone"
              placeholder="+7"
              onBlur={handleBlur}
              value={customer.phone}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Please enter a valid 10-digit phone number.
          </Form.Control.Feedback>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@server.com"
              onBlur={handleBlur}
              value={customer.email}
              controlId="email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="messageText">
            <Form.Label placeholder="Текст сообщения...">
              Комментарий к заказу
            </Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) =>
                setCustomer({ ...customer, message: e.target.value })
              }
              rows={3}
              value={customer.message}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!(customer.email && customer.name)}
          >
            Сохранить Excel-файл
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!(customer.email && customer.name)}
          >
            Отправить заказ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
