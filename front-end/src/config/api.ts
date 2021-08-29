const BASE_URL = "http://localhost:8000";

const fetcher = (uri: string, opts: object, token: string = "") => {
  const headers = new Headers();
  if (token != "") {
    headers.append("Authorization", token);
  }
  fetch(BASE_URL + uri, {
    ...opts,
    headers,
  }).then((res) => res.json());
};

export { BASE_URL, fetcher };
