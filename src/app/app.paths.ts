const path = (root: string | Array<string>, sublink: string): Array<string> =>
  root instanceof Array ? [...root, sublink] : [root, sublink];

const ROOT = '/';

const ROOT_TODOS = path(ROOT, 'todos');

export const PATH = {
  root: ROOT,
  todos: {
    root: ROOT_TODOS,
    view: (id: string) => path(ROOT_TODOS, id),
  },
};
