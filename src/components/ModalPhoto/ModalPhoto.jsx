import { ModalPhotoOverlay, ModalPhotoWindow, ModalPhotoBigImage } from './modalPhoto.styled';
import PropTypes from 'prop-types';

export default function ModalPhoto(props) {
  const { largeImageURL, toggleModal } = props;
  return (
    <ModalPhotoOverlay
      onClick={event => {
        if (event.target === event.currentTarget) {
          toggleModal();
        }
      }}
    >
      <ModalPhotoWindow>
        <ModalPhotoBigImage src={largeImageURL} alt="photo"></ModalPhotoBigImage>
      </ModalPhotoWindow>
    </ModalPhotoOverlay>
  );
}

ModalPhoto.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
