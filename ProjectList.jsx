import { useState } from 'react';

export default function ProjectList({ projects }) {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState(null);

  const toggleProject = (index) => {
    setExpandedProjectIndex(index === expandedProjectIndex ? null : index);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="mb-6 shadow-md rounded-2xl border hover:shadow-lg transition">
          <div
            className="flex items-center justify-between p-4 bg-gray-100 rounded-t-2xl cursor-pointer hover:bg-gray-200"
            onClick={() => toggleProject(index)}
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <span className="text-2xl">
              {expandedProjectIndex === index ? '−' : '+'}
            </span>
          </div>
          {expandedProjectIndex === index && (
            <div className="p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4">Issue Key</th>
                    <th className="py-2 px-4">Summary</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {project.issues.map((issue, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-4">{issue.key}</td>
                      <td className="py-2 px-4">{issue.summary}</td>
                      <td className="py-2 px-4">{issue.customFields?.status || ''}</td>
                      <td className="py-2 px-4">{issue.customFields?.priority || ''}</td>
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
