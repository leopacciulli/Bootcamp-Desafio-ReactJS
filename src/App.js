import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
    const [repositories, setRepository] = useState([]);

    useEffect(() => {
        getRepositories();
    }, []);

    function getRepositories() {
        api.get("/repositories").then((response) => {
            setRepository(response.data);
        });
    }

    async function handleAddRepository() {
        const response = await api.post("/repositories", {
            title: "Go Barber",
            url: "https://github.com/leopacciulli/Hair-Shop",
            techs: ["Node JS, ReactJS, React Native"],
            likes: 0,
        });
        const repo = response.data;

        setRepository([...repositories, repo]);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`/repositories/${id}`);

        setRepository(repositories.filter(repository => repository.id !== id))
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map((repo) => (
                    <li key={repo.id}>
                        {repo.title}
                        <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
