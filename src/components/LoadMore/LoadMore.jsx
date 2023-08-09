import { LoadMoreButton } from './loadMore.styled';

export default function LoadMore(props) {
  const { incrementPage } = props;
  return (
    <LoadMoreButton type="button" onClick={incrementPage}>
      Load More
    </LoadMoreButton>
  );
}
