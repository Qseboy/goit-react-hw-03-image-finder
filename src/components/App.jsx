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
    loadMoreButton: false,
    loader: false,

    isPhotoModalOpen: false,
    largeImageURL: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue || prevState.page !== this.state.page) {
      this.setState({ loader: true });
      try {
        const data = await getPhotos(this.state.searchValue, this.state.page);
        const { totalHits, hits } = data;

        const formatData = handleApiData(hits);
        toast.success(`Was find ${totalHits} images`);

        // check loadMoreButton
        this.setState({ loadMoreButton: this.state.page < Math.ceil(totalHits / 12) });

        // check if API find no Images[]
        if (!totalHits) {
          toast.warn(`Not found images by this name - ${this.state.searchValue}`);
          return;
        }

        this.setState(prevState => ({
          photos: [...prevState.photos, ...formatData],
        }));
      } catch (err) {
        alert(err);
      } finally {
        this.setState({ loader: false });
      }
    }
  }

  // load more button
  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  // close \ open modal
  toggleModal = () => {
    this.setState({
      isPhotoModalOpen: !this.state.isPhotoModalOpen,
    });
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue, photos: [], page: 1 });
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
          incrementPage={this.incrementPage}
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
