import { useState } from 'react';

export default function ProjectList({ projects }) {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);

  const toggleProject = (index) => {
    setExpandedProjectIndex(index === expandedProjectIndex ? null : index);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="mb-4 shadow-md rounded-2xl border">
          <div
            className="flex items-center justify-between p-4 bg-gray-100 rounded-t-2xl cursor-pointer"
            onClick={() => toggleProject(index)}
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <span>{expandedProjectIndex === index ? '▼' : '▶'}</span>
          </div>
          {expandedProjectIndex === index && (
            <div className="p-4">
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
                      <td className="py-2">{issue.customFields?.status || ''}</td>
                      <td className="py-2">{issue.customFields?.priority || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
