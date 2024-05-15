import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { PriceList } from '../components/PriceList';
import { LoginContext, PriceContext } from '../App';
import { postRequest, getRequest } from '../services/serverRequest';

const AdminStyle = styled.div`
  .col {
    // border: 1px grey solid;
  }
  a,
  #change-pass-ref {
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
  #file-input-goods,
  #file-input-pack {
    max-width: 300px;
  }
`;

export const AdminPage = () => {
  const [priceFile, setPriceFile] = useState('');
  const [packFile, setPackFile] = useState('');
  const { setPriceArray, setPackArray } = useContext(PriceContext);
  const { auth } = useContext(LoginContext);

  const handleLoadPrice = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(priceFile);
    fileReader.onload = (e) => {
      let workbook = XLSX.read(e.target.result, { type: 'binary' });
      let pArr = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets['Подарок'],
      );
      let pArray = [];
      let category = '';
      pArr.forEach((el) => {
        if (el.__EMPTY === 'Упаковка') return;
        typeof el.__EMPTY === 'number'
          ? pArray.push({
              id: el.__EMPTY,
              category: category,
              name: el.__EMPTY_1,
              producer: el.__EMPTY_2,
              weight1: el.__EMPTY_3,
              price1: el.__EMPTY_8,
            })
          : (category = el.__EMPTY_1);
      });
      postRequest('/write_json', auth.token, {
        filename: 'priceArray',
        data: pArray,
      }).then(async () => {
        let data = await getRequest('/get_json', '', {
          filename: 'priceArray',
        });
        setPriceArray(data);
        setPriceFile('');
        document.querySelector('#file-input-goods').value = '';
      });
    };
  };

  const handleLoadPacks = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(packFile);
    fileReader.onload = (e) => {
      let workbook = XLSX.read(e.target.result, { type: 'binary' });
      let pArr = XLSX.utils.sheet_to_json(workbook.Sheets['Упаковка']);
      let pArray = [];
      pArr.forEach((el) => {
        if (el.id && el.id.slice(0, 1) === 'u') {
          pArray.push({
            id: el.id,
            name: el.name,
            producer: el.producer,
            weight1: el.weight1,
            giftWeight: el.giftWeight,
            price1: el.price1,
          });
        }
      });
      postRequest('/write_json', auth.token, {
        filename: 'packArray',
        data: pArray,
      }).then(async () => {
        let data = await getRequest('/get_json', '', {
          filename: 'packArray',
        });
        setPackArray(data);
        setPackFile();
        document.querySelector('#file-input-pack').value = '';
      });
    };
  };

  const handlePassChangeEmail = async (e) => {
    postRequest('/send_change_email', auth.token, {})
      .then(() => {
        alert(
          `На Email администратора отправлена ссылка для смены пароля. Срок годности ссылки - 1 час`,
        );
      })
      .catch((err) => {
        alert('неудачная отправка email!!!');
        throw err;
      });
  };

  return (
    <AdminStyle>
      <div onClick={handlePassChangeEmail} id="change-pass-ref" className="m-2">
        Смена пароля
      </div>
      <h1 className="py-2 h-100 text-center sticky-top bg-white">
        Страница администратора
      </h1>
      <div className="d-flex flex-wrap mb-4 me-4 justify-content-end align-item-center">
        <Link to="/">Вернуться к сборке подарка</Link>
      </div>
      <Container className="mw-100">
        <Row>
          <Col className="col-sm-6 mb-4 text-center">
            <p className="btn-sm fs-5">
              Загрузить новый прайс-лист на упаковку
            </p>
            <div className="d-flex mx-4 justify-content-center">
              <Form.Control
                type="file"
                id="file-input-pack"
                text="Загрузка файла..."
                onChange={(e) => setPackFile(e.target.files[0])}
                filename={packFile}
                size={20}
              />
              <Button
                disabled={!packFile}
                onClick={handleLoadPacks}
                className="ms-2"
              >
                Загрузить
              </Button>
            </div>
          </Col>
          <Col className="col-sm-6 mb-4 text-center">
            <p className="btn-sm fs-5">
              Загрузить новый прайс-лист на сладости
            </p>
            <div className="d-flex mx-4 justify-content-center">
              <Form.Control
                type="file"
                id="file-input-goods"
                text="Загрузка файла..."
                onChange={(e) => setPriceFile(e.target.files[0])}
                filename={priceFile}
              />
              <Button
                disabled={!priceFile}
                onClick={handleLoadPrice}
                className="ms-2"
              >
                Загрузить
              </Button>
            </div>
          </Col>
        </Row>
        <PriceList forChange={true} />
      </Container>
    </AdminStyle>
  );
};
