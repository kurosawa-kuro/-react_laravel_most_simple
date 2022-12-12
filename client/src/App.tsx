import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';

const url = "http://localhost:8000"

type task = {
  id: number;
  title: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
};

function App() {
  const [tasks, setTasks] = useState<task[]>([
    {
      id: 0,
      title: "",
      is_done: false,
      created_at: "",
      updated_at: "",
    }
  ]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${url}/api/tasks/`)
      console.log({ response })
      setTasks(response.data);
    }
    fetchData();
  }, []);

  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const createTask = async (): Promise<void> => {
    const response = await axios.post(`${url}/api/tasks/`, {
      title,
    })

    setTasks([response.data, ...tasks]);
    setTitle("");
  };

  return (
    <div className="App">
      <label>
        タイトル:
        <input value={title} onChange={handleTitleChange} />
      </label>
      <button onClick={createTask}>作成</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            タイトル:{task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
