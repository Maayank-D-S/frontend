import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";

const GalleryCategory = () => {
  const { projectId, category } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project || !project.gallery || !project.gallery[category]) {
    return (
      <div className="p-10 text-center text-xl">
        Category not found.
        <br />
        <Link to={`/projects/${projectId}`} className="text-blue-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {project.gallery[category].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${category}-${i}`}
            className="w-full h-64 object-cover rounded-lg shadow"
          />
        ))}
      </div>
      <div className="mt-8">
        <Link
          to={`/projects/${projectId}`}
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Project
        </Link>
      </div>
    </div>
  );
};

export default GalleryCategory;
