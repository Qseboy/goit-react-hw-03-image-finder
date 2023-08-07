import { LoadMoreButton } from './loadMore.styled';

export default function LoadMore(props) {
  const { handleButton } = props;
  return (
    <LoadMoreButton type="button" onClick={handleButton}>
      Load More
    </LoadMoreButton>
  );
}
