import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { PriceList } from '../components/PriceList';
import { PriceContext } from '../App';

const AdminStyle = styled.div`
  .col {
    // border: 1px grey solid;
  }
`;

export const AdminPage = () => {
  const [priceFile, setPriceFile] = useState();
  const { priceObject, setPriceObject } = useContext(PriceContext);
  const handleChoosePrice = (e) => {
    setPriceFile(e.target.files[0]);
  };
  const handleLoadPrice = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(priceFile);
    fileReader.onload = (e) => {
      let workbook = XLSX.read(e.target.result, { type: 'binary' });
      let pObject = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets['Подарок'],
      );
      setPriceObject(pObject);
      console.log(priceObject);
    };
  };
  return (
    <AdminStyle>
      <h1 className="mt-2 h-100 text-center">Страница администратора</h1>
      <Container className="mw-100">
        <Row className="border-bottom border-3">
          <Col className="col-sm-6 flex-wrap mb-4 text-center">
            <Form onSubmit={handleLoadPrice}>
              <p className="btn-sm">Загрузить Excel-файл прайс-листа</p>
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
            <Link to="/">Сборка подарка</Link>
          </Col>
        </Row>
        <PriceList forchange={true} />
      </Container>
    </AdminStyle>
  );
};
