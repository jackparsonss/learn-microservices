import axios from 'axios';

const url: string = 'https://jsonplaceholder.typicode.com/todos/1';

const fetchTodo = async (): Promise<void> => {
  const res = await axios.get(url);
  console.log(res.data);
};

fetchTodo();
