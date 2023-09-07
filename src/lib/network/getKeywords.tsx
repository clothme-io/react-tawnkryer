import axios from 'axios';

export const getKeyword = async () => {
  const response = await fetch('http://127.0.0.1:5000/ping');
  //   const response = await fetch("https://tawnkryer-gfmvm7kfdq-uc.a.run.app/ping")
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const getOutLineForMultiKeyword = async (
  input: never,
  account: never,
  project: never
) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, account, project }),
  };
  const response = await fetch(
    'http://127.0.0.1:5000/multi-Keyword-outline',
    requestOptions
  );

  const data = await response.json();
  console.log('This is the response ====', data);
};

export const adWordAuth = async () => {
  // const header = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': '*',
  //   'Access-Control-Allow-Headers': '*',
  //   'Content-Type': 'application/json'
  //   'Access-Control-Allow-Credentials': 'true',
  // };
  const response = await axios.get('http://127.0.0.1:5000/authorize', {
    // withCredentials: true,
    // headers: header,
  });
  //   const response = await fetch("https://tawnkryer-gfmvm7kfdq-uc.a.run.app/ping")
  if (!response) {
    console.log('the response ===', response);
    throw new Error('Failed to fetch data');
  }
  console.log('the response ===', response.data);
  // window.location = response.data;
  return response.data;
};
