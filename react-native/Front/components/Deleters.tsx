import { Todo } from '../types';
import API from '../api';

async function del<T>(
  path: string
): Promise<T> {
  try {
    const res = await API.delete(path);
    return res.data;
  } catch (e) {
    console.error('Failure:', JSON.stringify(e, null, 2))
    throw new Error(e);
  }
};

export async function delTodo(item : Todo){
  const resultPromise = new Promise<Todo>((resolve, reject) => {
    del<any>('/' + item.id).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err);
    })
  })
  return  resultPromise;
};