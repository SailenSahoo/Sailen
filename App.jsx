import { useEffect, useState } from 'react';
import ProjectList from './components/ProjectList';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All Projects');

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProjectFilterChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const filteredProjects = projects
    .filter((project) => selectedProject === 'All Projects' || project.name === selectedProject)
    .map((project) => ({
      ...project,
      issues: project.issues.filter((issue) =>
        issue.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter((project) => project.issues.length > 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Jira Copy Dashboard</h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search issues..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={selectedProject}
          onChange={handleProjectFilterChange}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="All Projects">All Projects</option>
          {projects.map((project, idx) => (
            <option key={idx} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ProjectList projects={filteredProjects} />
      )}
    </div>
  );
}
