import { APIResponse } from '../types';
import API from '../api';

async function get<T>(
  path: string
): Promise<T> {
  try {
    const res = await API.get(path);
    console.log('Success!');
    return res.data;
  } catch (e) {
    console.error('Failure:', JSON.stringify(e, null, 2))
    throw new Error(e);
  }
};

export async function todos(){
  const resultPromise = new Promise<APIResponse>((resolve, reject) => {
    get<APIResponse>('').then(response => {
      resolve(response)
    }).catch(err => {
      reject(err);
    })
  })
  return  resultPromise;
};