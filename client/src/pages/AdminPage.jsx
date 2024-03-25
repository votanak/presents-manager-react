import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { PriceList } from '../components/PriceList';
import { LoginContext, PriceContext } from '../App';
import { postRequest } from '../services/serverRequest';

const AdminStyle = styled.div`
  .col {
    // border: 1px grey solid;
  }
`;

export const AdminPage = () => {
  const [priceFile, setPriceFile] = useState();
  const [packFile, setPackFile] = useState();
  const { setPriceArray, setPackArray } = useContext(PriceContext);
  const { auth } = useContext(LoginContext);

  const handleLoadPrice = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(priceFile);
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
              picture: `img-${el.__EMPTY}.png`,
            })
          : (category = el.__EMPTY_1);
      });
      postRequest('/write_json', auth.token, {
        filename: 'priceArray',
        data: pArray,
      });
      setPriceArray(pArray);
    };
  };

  const handleLoadPacks = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(packFile);
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
            picture: `img-${el.id}.png`,
          });
        }
      });
      console.log(pArray);
      postRequest('/write_json', auth.token, {
        filename: 'packArray',
        data: pArray,
      }).then(() => setPackArray(pArray));
    };
  };

  return (
    <AdminStyle>
      <h1 className="py-2 h-100 text-center sticky-top bg-white">
        Страница администратора
      </h1>
      <Container className="mw-100">
        <Row className="">
          <Col className="col-sm-12 flex-wrap mb-4 text-center">
            <Link to="/" className="fs-3">
              Сборка подарка
            </Link>
          </Col>
        </Row>
        <Row className="">
          <Col className="col-sm-6 mb-4 text-center">
            <p className="btn-sm fs-5">
              Загрузить новый прайс-лист на сладости
            </p>
            <div className="d-flex mx-4">
              <Form.Control
                type="file"
                id="file-input"
                text="Загрузка файла..."
                onChange={(e) => setPriceFile(e.target.files[0])}
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
          <Col className="col-sm-6 mb-4 text-center">
            <p className="btn-sm fs-5">
              Загрузить новый прайс-лист на упаковку
            </p>
            <div className="d-flex mx-4">
              <Form.Control
                type="file"
                id="file-input"
                text="Загрузка файла..."
                onChange={(e) => setPackFile(e.target.files[0])}
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
        </Row>
        <PriceList forChange={true} />
      </Container>
    </AdminStyle>
  );
};
