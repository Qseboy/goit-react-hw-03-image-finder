import { Component } from 'react';
import { ImageGalleryList } from './imageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { getPhotos } from 'services/pixibay-api';
import LoadMore from 'components/LoadMore/LoadMore';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    result: [],
    page: 1,
    total: null,
    loadMore: false,
    loader: false,
  };

  checkLimitPhotos = () => {
    const { total, result } = this.state;
    if (Math.round(total - result.length) === 0) {
      this.setState({ loadMore: false });
      return;
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ loader: true });
      try {
        const data = await getPhotos(this.props.searchValue, this.state.page);

        if (data.total === 0) {
          alert(`Not found images by this name - ${this.props.searchValue}`);
          this.setState({ loader: false });
          return;
        }

        this.setState(
          {
            result: data.hits,
            total: data.total,
            loadMore: true,
            loader: false,
          },
          () => {
            this.checkLimitPhotos();
            toast.success(`Was find ${this.state.total} images`);
          }
        );
      } catch (err) {
        alert(err);
      }
    }

    if (prevState.page !== this.state.page) {
      try {
        this.setState({ loader: true });
        const data = await getPhotos(this.props.searchValue, this.state.page);
        this.setState(
          {
            result: [...this.state.result, ...data.hits],
            loader: false,
          },
          this.checkLimitPhotos
        );
      } catch (err) {
        alert(err);
      }
    }
  }

  handleButton = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { result, loadMore, loader } = this.state;
    const { handleOpenModal } = this.props;
    return (
      <>
        {loader && <Loader />}
        {result.length > 0 && (
          <ImageGalleryList>
            {result &&
              result.map(el => (
                <ImageGalleryItem
                  key={el.id}
                  webformatURL={el.webformatURL}
                  largeImageURL={el.largeImageURL}
                  handleOpenModal={handleOpenModal}
                ></ImageGalleryItem>
              ))}
          </ImageGalleryList>
        )}
        {loadMore && <LoadMore handleButton={this.handleButton} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};
