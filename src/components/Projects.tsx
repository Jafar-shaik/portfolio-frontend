import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronRight, Plus, X, Trash2 } from "lucide-react";

type Project = {
  _id?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Modal states
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin credentials
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" });

  // Project form data
  const [formData, setFormData] = useState<Project>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    technologies: [],
    image: "",
    liveUrl: "",
    githubUrl: "",
  });

  // Selected project for deletion
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  // Open admin modal first
  const handleAddClick = () => {
    setAdminCredentials({ username: "", password: "" });
    setIsAdminModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedProjectId(id);
    setIsAdminModalOpen(true); // reuse admin modal for delete auth
  };

  // Handle project form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "technologies" ? value.split(",").map((t) => t.trim()) : value,
    }));
  };

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  // Authenticate admin by sending a dummy GET request to a protected endpoint
  const authenticateAdmin = (action: "add" | "delete") => {
    const { username, password } = adminCredentials;
    // Attempt to fetch projects (or you can hit DELETE with id if deleting)
    fetch("http://localhost:8080/api/projects", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid credentials");
        setIsAdminModalOpen(false);
        if (action === "add") {
          // Open project form modal
          setFormData({
            title: "",
            shortDescription: "",
            fullDescription: "",
            technologies: [],
            image: "",
            liveUrl: "",
            githubUrl: "",
          });
          setIsProjectModalOpen(true);
        }
        if (action === "delete" && selectedProjectId) {
          submitDeleteProject(selectedProjectId);
        }
      })
      .catch((err) => alert(err.message));
  };

  const submitAddProject = () => {
    const { username, password } = adminCredentials;
    setIsSubmitting(true);

    fetch("http://localhost:8080/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add project");
        return res.json();
      })
      .then((createdProject) => {
        setProjects((prev) => [...prev, createdProject]);
        setIsProjectModalOpen(false);
        setIsSubmitting(false);
      })
      .catch((err) => {
        alert(err.message);
        setIsSubmitting(false);
      });
  };

  const submitDeleteProject = (id: string) => {
    const { username, password } = adminCredentials;

    fetch(`http://localhost:8080/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or failed to delete project");
        setProjects((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-bounce-in">
            Featured <span className="hero-text-gradient">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className={`group scale-hover bg-card border border-border rounded-lg overflow-hidden hover-glow ${
                  index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">💻</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 whitespace-pre-line">
                    {expandedProject === index
                      ? project.fullDescription
                      : project.shortDescription}
                  </p>

                  {expandedProject === index && (
                    <div className="mb-4 animate-bounce-in">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs rounded-full skill-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 mb-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2 hover-glow"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2 hover-glow"
                          onClick={() => window.open(project.githubUrl, "_blank")}
                        >
                          <Github className="h-4 w-4" /> Source Code
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex items-center gap-2 hover-glow"
                          onClick={() => handleDeleteClick(project._id!)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => toggleProject(index)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80"
                  >
                    {expandedProject === index ? "Show Less" : "Read More"}
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        expandedProject === index ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add Project Card */}
            <div
              className="group scale-hover bg-card border border-dashed border-border rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center hover:border-primary/50 transition-colors animate-pulse-slow"
              onClick={handleAddClick}
            >
              <button
                className="flex flex-col items-center gap-4 p-8 text-muted-foreground hover:text-primary transition-colors"
                type="button"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Plus className="h-8 w-8" />
                </div>
                <span className="text-lg font-medium">Add New Project</span>
                <span className="text-sm text-center">
                  Click to add a new project to your portfolio
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Modal */}
      {/* Admin Modal */}
{isAdminModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button
        className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
        onClick={() => setIsAdminModalOpen(false)}
        type="button"
      >
        <X className="w-6 h-6" />
      </button>

      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Admin Login
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          authenticateAdmin(selectedProjectId ? "delete" : "add");
        }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={adminCredentials.username}
          onChange={(e) =>
            setAdminCredentials((prev) => ({ ...prev, username: e.target.value }))
          }
          className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
                     bg-white text-black placeholder-gray-500 
                     dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={adminCredentials.password}
          onChange={(e) =>
            setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
          className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
                     bg-white text-black placeholder-gray-500 
                     dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          required
        />
        <div className="flex justify-end gap-4 mt-4">
          <Button type="button" variant="outline" onClick={() => setIsAdminModalOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Project Form Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
              onClick={() => setIsProjectModalOpen(false)}
              type="button"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Add New Project
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); submitAddProject(); }} className="space-y-4">
  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Title"
    required
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <input
    type="text"
    name="shortDescription"
    value={formData.shortDescription}
    onChange={handleChange}
    placeholder="Short Description"
    required
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <textarea
    name="fullDescription"
    value={formData.fullDescription}
    onChange={handleChange}
    placeholder="Full Description"
    required
    rows={4}
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <input
    type="text"
    name="technologies"
    value={formData.technologies.join(", ")}
    onChange={handleChange}
    placeholder="Technologies (comma separated)"
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <input
    type="text"
    name="image"
    value={formData.image}
    onChange={handleChange}
    placeholder="Image URL"
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <input
    type="text"
    name="liveUrl"
    value={formData.liveUrl}
    onChange={handleChange}
    placeholder="Live Demo URL"
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <input
    type="text"
    name="githubUrl"
    value={formData.githubUrl}
    onChange={handleChange}
    placeholder="GitHub URL"
    className="border border-gray-400 rounded px-3 py-2 w-full resize-none 
               bg-white text-black placeholder-gray-500 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
  />
  <div className="flex justify-end gap-4 mt-4">
    <Button variant="outline" onClick={() => setIsProjectModalOpen(false)}>Cancel</Button>
    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
  </div>
</form>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
