import { useContext, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { PriceContext, LoginContext } from '../App';
import { refreshJson } from '../services/refreshJson.js';

const StyleImg = styled.div`
  .change-link {
    cursor: pointer;
    font-size: 12px;
  }
  .img-container {
    width: 50px;
    height: 50px;
  }
`;

export const Img = ({ id, picture, forChange }) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const { auth } = useContext(LoginContext);
  const { setPackArray, setPriceArray, upd, setUpd } = useContext(PriceContext);
  const handlerShowImg = (e) => {
    e.stopPropagation();
    setShowImgModal(true);
  };

  const handlerLoadImg = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', id);
      fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/write_img`, {
        method: 'POST',
        headers: {},
        body: formData,
      })
        .then(() => {
          refreshJson(id, auth.token, setPackArray, setPriceArray);
          setUpd(upd + 1);
        })
        .catch((error) => {
          console.error('Ошибка загрузки файла:', error);
        });
    });
  };

  return (
    <StyleImg>
      <div className="d-flex img-container justify-content-center mx-2">
        <Image
          src={`${
            import.meta.env.VITE_REACT_APP_SERVER_URL
          }/static/good-pictures/${picture}`}
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
        contentClassName="my-modal"
      >
        <Modal.Body className="d-flex justify-content-center my-modal">
          <Image
            src={`${
              import.meta.env.VITE_REACT_APP_SERVER_URL
            }/static/good-pictures/${picture}`}
            fluid
            rounded
            onClick={() => setShowImgModal(false)}
          />
          <div>{forChange}</div>
        </Modal.Body>
      </Modal>
    </StyleImg>
  );
};
