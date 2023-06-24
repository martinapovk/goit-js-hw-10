import axios from 'axios';

const HOST = 'https://api.thecatapi.com';
const BREEDS_ENDPOINT = '/v1/breeds';
const CAT_INFORMATION_ENDPOINT = '/v1/images/search';

axios.defaults.headers.common['x-api-key'] =
  'live_JLHnMSQRBLe7HhcfVMFJHvkVM8wybpd86OliR8a8LJUG79DiSGjR37HBooru4m9H';

function fetchBreeds() {
  return axios.get(`${HOST}${BREEDS_ENDPOINT}`).then(({ data }) => data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${HOST}${CAT_INFORMATION_ENDPOINT}?breed_ids=${breedId}`)
    .then(({ data }) => data[0]);
}

export { fetchBreeds, fetchCatByBreed };
