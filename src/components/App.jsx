import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ModalPhoto from './ModalPhoto/ModalPhoto';

export class App extends Component {
  state = {
    searchValue: '',
    isPhotoModalOpen: false,
    largeImageURL: '',
  };

  // add and remove eventListener
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEsc);
  }

  // close \ open modal
  toggleModal = () => {
    this.setState({
      isPhotoModalOpen: !this.state.isPhotoModalOpen,
    });
  };

  // close modal by ESC
  closeModalEsc = event => {
    if (this.state.isPhotoModalOpen && event.code === 'Escape') {
      this.toggleModal();
    }
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue });
  };

  handleOpenModal = largeImageURL => {
    this.setState({ largeImageURL, isPhotoModalOpen: true });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar submitForm={this.handleSubmit} />
        <ImageGallery searchValue={this.state.searchValue} handleOpenModal={this.handleOpenModal} />

        {this.state.isPhotoModalOpen && (
          <ModalPhoto largeImageURL={this.state.largeImageURL} toggleModal={this.toggleModal} />
        )}
      </div>
    );
  }
}
