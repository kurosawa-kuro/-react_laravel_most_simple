import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';

const url = "http://localhost:8000"

type task = {
  id: number;
  title: string;
  image: File | null;
  original_image: string;
  created_at: string;
  updated_at: string;
};

function App() {
  const [tasks, setTasks] = useState<task[]>([
    {
      id: 0,
      title: "",
      image: null,
      original_image: "",
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

  const [image, setImage] = useState<File>()
  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const img: File = e.target.files[0]
    console.log({ img })
    setImage(img)
    console.log({ image })
  }

  const createTask = async (): Promise<void> => {
    console.log("createTask param")
    const submitData = new FormData()

    submitData.append("title", title)
    submitData.append("image", image as File)

    console.log(submitData)
    console.log("createTask param")
    const response = await axios.post(`${url}/api/tasks/`, submitData)

    setTasks([response.data, ...tasks]);
    setTitle("");
  };

  return (
    <div className="App">
      <label>
        タイトル:
        <input value={title} onChange={handleTitleChange} />
      </label>
      <div>
        <label>File</label>
        <input
          type="file"

          //   label="File"
          name="image"
          onChange={getImage}
        />
      </div>
      <button onClick={createTask}>作成</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} > <div style={{ width: 600, height: 50 }}> <img src="https://via.placeholder.com/360x360.png/00bb00?text=animals+cats+eligendi" width="30" height="30" alt="サンプル画像" /> タイトル : {task.title} </div></li>
        ))}
      </ul>
    </div>
  );

}

export default App;
