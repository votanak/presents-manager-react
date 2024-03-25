import { useContext, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { LoginContext } from '../App';
import { postRequest } from '../services/serverRequest';

const StyleImg = styled.div`
  .change-link {
    cursor: pointer;
    font-size: 12px;
  }
  .img-container {
    width: 50px;
    height: 50px;
  }

  .good-modal {
    min-height: 400px;
    max-height: 80vw;
  }
`;

export const Img = ({ src, forChange }) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const { auth } = useContext(LoginContext);

  const handlerShowImg = (e) => {
    e.stopPropagation();
    console.log(e.isPropagationStopped());
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
          `${process.env.REACT_APP_SERVER_URL}/upload_img`,
          auth.token,
          { imgName: src, formData: formData },
        );
        console.log('Результат загрузки файла:', response.data);
      });
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
  };

  return (
    <StyleImg>
      <div className="d-flex img-container justify-content-center mx-2">
        <Image
          src={`${process.env.REACT_APP_SERVER_URL}/static/good-pictures/${src}`}
          fluid
          rounded
          className="mx-2 object-fit-contain"
          onClick={handlerShowImg}
        />
      </div>
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
        // size="lg"
        dialogClassName="good-modal"
      >
        <Modal.Body className="d-flex justify-content-center">
          <Image
            src={`${process.env.REACT_APP_SERVER_URL}/static/good-pictures/${src}`}
            fluid
            rounded
            // onClick={() => setShowImgModal(true)}
          />
          <div>{forChange}</div>
        </Modal.Body>
      </Modal>
    </StyleImg>
  );
};
