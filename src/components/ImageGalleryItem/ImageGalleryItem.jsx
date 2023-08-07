import { ImageGalleryItemImage, ImageGalleryItemLi } from './imageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem(props) {
  const { largeImageURL, webformatURL } = props;

  return (
    <>
      <ImageGalleryItemLi
        onClick={() => {
          props.handleOpenModal(largeImageURL);
        }}
      >
        <ImageGalleryItemImage src={webformatURL} alt="image" />
      </ImageGalleryItemLi>
    </>
  );
}

ImageGalleryItem.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.number.isRequired,
  webformatURL: PropTypes.number.isRequired,
};
