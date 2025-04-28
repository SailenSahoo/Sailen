import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);
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

  const toggleProject = (index) => {
    setExpandedProjectIndex(index === expandedProjectIndex ? null : index);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jira Copy Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        projects.map((project, index) => (
          <Card key={index} className="mb-4 shadow-md rounded-2xl">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-2xl">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <Button variant="ghost" onClick={() => toggleProject(index)}>
                {expandedProjectIndex === index ? <ChevronDown /> : <ChevronRight />}
              </Button>
            </div>
            {expandedProjectIndex === index && (
              <CardContent className="p-4">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="py-2">Issue Key</th>
                      <th className="py-2">Summary</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.issues.map((issue, idx) => (
                      <tr key={idx}>
                        <td className="py-2">{issue.key}</td>
                        <td className="py-2">{issue.summary}</td>
                        <td className="py-2">{issue.customFields.status}</td>
                        <td className="py-2">{issue.customFields.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  );
              }
