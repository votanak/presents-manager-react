import { useContext, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { LoginContext } from '../App';
import { postRequest } from '../services/serverRequest';

const StyleImg = styled.div`
  .change-link {
    cursor: pointer;
    font-size: 14px;
  }
`;

export const Img = ({ src, forChange }) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const { auth } = useContext(LoginContext);

  const handlerShowImg = (e) => {
    e.stopPropagation();
    setShowImgModal(true);
  };

  const handlerLoadImg = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.click();
      fileInput.addEventListener('change', async function () {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await postRequest(
          'http://localhost:5000/upload-img',
          auth.token,
          { imgName: src, formData },
        );
        console.log('Результат загрузки файла:', response.data);
      });
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
  };

  return (
    <StyleImg>
      <Image
        src={`${process.env.REACT_APP_SERVER_URL}/static/good-pictures/${src}`}
        fluid
        rounded
        className="border mx-2"
        onClick={handlerShowImg}
      />
      {forChange && (
        <div className="change-link" onClick={handlerLoadImg}>
          Загрузить
        </div>
      )}
      <Modal
        show={showImgModal}
        onHide={() => setShowImgModal(false)}
        style={{ fontFamily: 'Montserrat' }}
        centered
        size="lg"
      >
        <Modal.Body className="d-flex justify-content-center">
          <Image
            src={`${process.env.REACT_APP_SERVER_URL}/static/good-pictures/${src}`}
            fluid
            rounded
            className="border"
            onClick={() => setShowImgModal(true)}
          />
          <div>{forChange}</div>
        </Modal.Body>
      </Modal>
    </StyleImg>
  );
};
