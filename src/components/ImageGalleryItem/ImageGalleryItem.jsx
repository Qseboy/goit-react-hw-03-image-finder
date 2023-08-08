import { ImageGalleryItemImage, ImageGalleryItemLi } from './imageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem(props) {
  const { largeImageURL, webformatURL, handleOpenModal } = props;

  return (
    <>
      <ImageGalleryItemLi onClick={() => handleOpenModal(largeImageURL)}>
        <ImageGalleryItemImage src={webformatURL} alt="image" />
      </ImageGalleryItemLi>
    </>
  );
}

ImageGalleryItem.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
