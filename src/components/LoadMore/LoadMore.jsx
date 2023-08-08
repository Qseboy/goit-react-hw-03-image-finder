import { LoadMoreButton } from './loadMore.styled';

export default function LoadMore(props) {
  const { handleLoadMoreButton } = props;
  return (
    <LoadMoreButton type="button" onClick={handleLoadMoreButton}>
      Load More
    </LoadMoreButton>
  );
}
