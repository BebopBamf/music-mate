const APIUrl = 'https://7a9ot7v4s0.execute-api.ap-southeast-2.amazonaws.com/api';

export const getData = (path: string) => async () => {
    const res = await fetch(APIUrl + path, {
        method: 'GET',
        mode: 'cors'
    });

    return res.json();
}