import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ModalPhoto from './ModalPhoto/ModalPhoto';
import { getPhotos, handleApiData } from 'services/pixibay-api';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    searchValue: '',
    photos: [],
    page: 1,
    total: null,
    loadMoreButton: false,
    loader: false,

    isPhotoModalOpen: false,
    largeImageURL: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ loader: true });
      try {
        const data = await getPhotos(this.state.searchValue, 1);
        const formatData = handleApiData(data);

        // check total photos
        if (!data.total) {
          toast.warn(`Not found images by this name - ${this.state.searchValue}`);
          this.setState({ loader: false, photos: [], loadMoreButton: false });
          return;
        }

        this.setState(
          { photos: formatData, loadMoreButton: true, total: data.total, loader: false, page: 1 },
          () => {
            this.handleCheckLoadMoreButton();
            toast.success(`Was find ${this.state.total} images`);
          }
        );
      } catch (err) {
        alert(err);
      }
    }

    if (prevState.page !== this.state.page) {
      if (this.state.page === 1) return;

      this.setState({ loader: true });
      const nextPage = this.state.page + 1;
      try {
        const data = await getPhotos(this.state.searchValue, nextPage);
        const formatData = handleApiData(data);

        this.setState(
          { photos: [...this.state.photos, ...formatData], loader: false },
          this.handleCheckLoadMoreButton
        );
      } catch (err) {
        alert(err);
      }
    }
  }

  // check collection photos, and hide loadMoreButton if need
  handleCheckLoadMoreButton = () => {
    const { total, photos } = this.state;
    if (Math.round(total - photos.length) === 0) {
      this.setState({ loadMoreButton: false });
      return;
    }
  };

  // load more button
  handleLoadMoreButton = () => {
    this.setState({ page: this.state.page + 1 });
  };

  // descturct
  handleApiData = data => {
    const newData = data.hits.map(el => {
      return { id: el.id, webformatURL: el.webformatURL, largeImageURL: el.largeImageURL };
    });

    return newData;
  };

  // close \ open modal
  toggleModal = () => {
    this.setState({
      isPhotoModalOpen: !this.state.isPhotoModalOpen,
    });
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue });
  };

  handleOpenModal = largeImageURL => {
    this.setState({ largeImageURL, isPhotoModalOpen: true });
  };

  render() {
    return (
      <>
        <Searchbar submitForm={this.handleSubmit} />
        {this.state.loader && <Loader />}
        <ImageGallery
          photos={this.state.photos}
          handleLoadMoreButton={this.handleLoadMoreButton}
          loadMoreButton={this.state.loadMoreButton}
          handleOpenModal={this.handleOpenModal}
        />

        {this.state.isPhotoModalOpen && (
          <ModalPhoto largeImageURL={this.state.largeImageURL} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}
