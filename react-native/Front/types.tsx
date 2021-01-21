export type Todo = {
  id: number,
  name?: string,
  isComplete?: boolean
}

export type APIResponse = Array<Todo>