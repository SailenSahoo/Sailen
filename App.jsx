import { useEffect, useState } from 'react';
import ProjectList from './components/ProjectList';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://127.0.0.1:8000/fetch-issues');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jira Copy Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
}
