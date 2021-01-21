import { Todo } from '../types';
import API from '../api';

async function set<T>(
  path: string,
  body: any
): Promise<T> {
  try {
    const res = await API.put(path, body);
    return res.data;
  } catch (e) {
    console.error('Failure:', JSON.stringify(e, null, 2))
    throw new Error(e);
  }
};

async function post<T>(
  path: string,
  body: any
): Promise<T> {
  try {
    const res = await API.post(path, body);
    return res.data;
  } catch (e) {
    console.error('Failure:', JSON.stringify(e, null, 2))
    throw new Error(e);
  }
};

export async function setTodo(item : Todo){
  const resultPromise = new Promise<Todo>((resolve, reject) => {
    set<Todo>('/' + item.id, item).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err);
    })
  })
  return  resultPromise;
};

export async function postTodo(item : string){
  const resultPromise = new Promise<Todo>((resolve, reject) => {
    post<any>('', {name: item} ).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err);
    })
  })
  return  resultPromise;
};
