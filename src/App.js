import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: "New Repository",
      url: "https://github.com/ysmello/likerepositoriesfront",
      tech: ["Nodejs"]
    };

    api.post("/repositories", repository).then(res => {
      if (res.data && res.data.id) {
        setRepositories([...respositories, res.data]);
      }
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const FilteredRespositories = respositories.filter(
        repository => repository.id !== id
      );

      setRepositories(FilteredRespositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(({ id, title }) => (
          <li key={`key_${id}`}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
