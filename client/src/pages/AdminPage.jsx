import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { PriceList } from '../components/PriceList';
import { PriceContext } from '../App';
import { translit } from '../services/translit';

const AdminStyle = styled.div`
  .col {
    // border: 1px grey solid;
  }
`;

export const AdminPage = () => {
  const [priceFile, setPriceFile] = useState();
  const { setPriceArray } = useContext(PriceContext);
  const handleChoosePrice = (e) => {
    setPriceFile(e.target.files[0]);
  };
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
              picture: `${translit(el.__EMPTY_1)}.png`,
            })
          : (category = el.__EMPTY_1);
      });
      setPriceArray(pArray);
    };
  };
  return (
    <AdminStyle>
      <h1 className="mt-2 h-100 text-center">Страница администратора</h1>
      <Container className="mw-100">
        <Row className="border-bottom border-3">
          <Col className="col-sm-6 flex-wrap mb-4 text-center">
            <Form onSubmit={handleLoadPrice}>
              <p className="btn-sm">Загрузить новый прайс-лист</p>
              <Form.Control
                type="file"
                id="file-input"
                text="Загрузка файла..."
                onChange={handleChoosePrice}
              />
              <Button type="submit" disabled={!priceFile}>
                Загрузить файл на сервер
              </Button>
            </Form>
          </Col>
          <Col className="col-sm-6 flex-wrap mb-4 text-center">
            <Link to="/" className="fs-3">
              Сборка подарка
            </Link>
          </Col>
        </Row>
        <PriceList forchange={true} />
      </Container>
    </AdminStyle>
  );
};
