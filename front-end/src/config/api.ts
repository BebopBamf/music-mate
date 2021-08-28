const BASE_URL =
  "https://7a9ot7v4s0.execute-api.ap-southeast-2.amazonaws.com/api";

const fetcher = (uri: string, opts: object) =>
  fetch(BASE_URL + uri, opts).then((res) => res.json());

export { BASE_URL, fetcher };
