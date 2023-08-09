const API_KEY = '37744661-08f3a379c0cffb6ec7b2d5f40';

export function getPhotos(search, page) {
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('something wrong'));
  });
}
// return data in other format
export const handleApiData = hits => {
  const newData = hits.map(el => {
    return { id: el.id, webformatURL: el.webformatURL, largeImageURL: el.largeImageURL };
  });

  return newData;
};
