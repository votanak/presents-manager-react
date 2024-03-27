import { useContext, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { PriceContext } from '../App';
import { refreshArray } from '../services/refreshArray';

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

export const Img = ({ id, picture, forChange }) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const { packArray, priceArray, setPriceArray, setPackArray } =
    useContext(PriceContext);

  const handlerShowImg = (e) => {
    e.stopPropagation();
    console.log(e.isPropagationStopped());
    setShowImgModal(true);
  };

  const handlerLoadImg = () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.click();
      fileInput.addEventListener('change', async function () {
        const file = fileInput.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/write_img`,
          {
            method: 'POST',
            headers: {},
            body: formData,
          },
        );
        let pName;
        let pArray = [];
        if (id.slice(0, 2) === 'up') {
          pName = 'packArray';
          let i = packArray.find((el) => el.id === id);
          pArray = [
            packArray.slice(0, i),
            { ...packArray[i], picture: file },
            packArray.slice(i + 1),
          ];
        } else {
        }
        refreshArray(pName, pArray);
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
          src={`${process.env.REACT_APP_SERVER_URL}/static/good-pictures/${picture}`}
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
            id={`${process.env.REACT_APP_SERVER_URL}/static/good-pictures/${id}`}
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
