import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import XLSX from 'xlsx';

const AdminStyle = styled.div`
  .col {
    // border: 1px grey solid;
  }
`;

async function handleFileAsync(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  console.log(workbook);
}

export const AdminPage = () => {
  const input_dom_element = document.querySelector('#input_dom_element');
  input_dom_element.addEventListener('change', handleFileAsync, false);
  const navigate = useNavigate();
  return (
    <AdminStyle>
      <h1 className="mt-2 h-100 text-center">Страница администратора</h1>
      <Container className="mw-100">
        <Row className="border-bottom border-3">
          <Col className="col-sm-6 flex-wrap mb-4 text-center">
            <Button className="btn-sm">Загрузить Excel-файл прайс-листа</Button>
            <input
              text="Загрузка файла..."
              type="file"
              id="input_dom_element"
            />
          </Col>
          <Col className="col-sm-6 flex-wrap mb-4 text-center">
            <Button className="btn-sm" onClick={() => navigate('/')}>
              Сборка подарка
            </Button>
          </Col>
        </Row>
        <Row className="mt-2 text-center">
          <h2>Прайс-лист</h2>
        </Row>
        {}
      </Container>
    </AdminStyle>
  );
};
