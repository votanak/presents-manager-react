import { Modal, Form, Button } from 'react-bootstrap';
import { LoginContext } from '../App';
import { useContext, useState } from 'react';
import { postRequest } from '../services/serverRequest';
import { v1 as uuidv1 } from 'uuid';
import { jsonToWb } from '../services/jsonToWb';
import FileSaver from 'file-saver';
import { PhoneInput } from './PhoneInput';

export const ModalSendForm = ({ show, setShow, selectedGoods }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const { auth } = useContext(LoginContext);
  const giftId = uuidv1().slice(0, 8);
  const [isValid, setIsValid] = useState({
    email: false,
    phone: false,
    name: false,
  });
  const [promptToSend, setPromptToSend] = useState(false);
  const formIsValid = isValid.email && isValid.name && isValid.phone;

  const handleSend = async (e) => {
    if (!formIsValid) {
      e.preventDefault();
      e.stopPropagation();
      setPromptToSend(true);
    } else {
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
    }
  };

  const handleHide = () => {
    setShow(false);
    setIsValid({
      email: false,
      phone: false,
      name: false,
    });
    setPromptToSend(false);
    setCustomer({
      name: '',
      email: '',
      phone: '',
      message: '',
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

  const handlerChange = (e) => {
    let regExp = '';
    switch (e.target.name) {
      case 'name':
        regExp = /^.{3,17}$/;
        break;
      case 'phone':
        regExp = /^[^_]*$/;
        break;
      case 'email':
        regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        break;
      default:
        break;
    }
    if (regExp) {
      console.log(e.target.value.match(regExp));
      setIsValid({
        ...isValid,
        [e.target.name]: Boolean(e.target.value.match(regExp)),
      });
    }
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  console.log(promptToSend && !isValid.phone);

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Отправка заказа для сборки</Modal.Title>
      </Modal.Header>
      <Form noValidate>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Имя"
              value={customer.name}
              autoFocus
              onChange={handlerChange}
              isInvalid={promptToSend && !isValid.name}
            />
            <Form.Control.Feedback tooltip type="invalid">
              Поле "имя" не должно быть пустым.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Тилипон:</Form.Label>
            <PhoneInput
              name="phone"
              type="phone"
              value={customer.phone}
              onChange={handlerChange}
              isInvalid={promptToSend && !isValid.phone}
            />
            <Form.Control.Feedback tooltip type="invalid">
              Please enter a valid 10-digit phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>e-mail</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="name@server.com"
              value={customer.email}
              onChange={handlerChange}
              isInvalid={promptToSend && !isValid.email}
            />
            <Form.Control.Feedback tooltip type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="messageText">
            <Form.Label placeholder="Текст сообщения...">
              Комментарий к заказу
            </Form.Label>
            <Form.Control
              as="textarea"
              onChange={handlerChange}
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
            disabled={promptToSend && !formIsValid}
          >
            Сохранить Excel-файл
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={promptToSend && !formIsValid}
          >
            Отправить заказ
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
