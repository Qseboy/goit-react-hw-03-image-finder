import { Component } from 'react';
import { ModalPhotoOverlay, ModalPhotoWindow, ModalPhotoBigImage } from './modalPhoto.styled';
import PropTypes from 'prop-types';

export default class ModalPhoto extends Component {
  // add and remove eventListener
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
  }

  // close modal by ESC
  closeModalEsc = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    const { largeImageURL, toggleModal } = this.props;
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
}

ModalPhoto.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
