import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Skeleton } from "@chakra-ui/react";

import {
  getProject,
  createProject,
  updateProject,
} from "../api/projectsApi.js";

export default function ProjectForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  // Load existing project when editing
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
    enabled: isEdit,
  });

  useEffect(() => {
    if (isEdit && data) {
      setValues({
        name: data.name || "",
        description: data.description || "",
      });
    }
  }, [isEdit, data]);

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      alert("Project created");
      queryClient.invalidateQueries(["projects"]);
      navigate("/projects");
    },
    onError: (err) => {
      alert("Create failed: " + err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateProject(id, updatedData),
    onSuccess: () => {
      alert("Project updated");
      queryClient.invalidateQueries(["projects"]);
      navigate("/projects");
    },
    onError: (err) => {
      alert("Update failed: " + err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateMutation.mutate({ id, updatedData: values });
    } else {
      createMutation.mutate(values);
    }
  };

  if (isEdit && isLoading) {
    return (
      <Box p={4}>
        <Skeleton height="40px" mb={4} />
        <Skeleton height="120px" />
      </Box>
    );
  }

  if (isEdit && isError) {
    return (
      <Box p={4} color="red">
        Failed to load project: {error.message}
      </Box>
    );
  }

  return (
    <Box p={4}>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
        {isEdit ? "Edit Project" : "New Project"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{ display: "block", marginBottom: "0.25rem" }}
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            style={{ width: "100%", padding: "8px" }}
            value={values.name}
            onChange={(e) =>
              setValues((v) => ({ ...v, name: e.target.value }))
            }
            required
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label
            style={{ display: "block", marginBottom: "0.25rem" }}
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            style={{ width: "100%", padding: "8px", minHeight: "80px" }}
            value={values.description}
            onChange={(e) =>
              setValues((v) => ({ ...v, description: e.target.value }))
            }
          />
        </div>

        <Button
          colorScheme="teal"
          type="submit"
          width="100%"
          isLoading={
            createMutation.isPending || updateMutation.isPending
          }
        >
          {isEdit ? "Save Changes" : "Create Project"}
        </Button>
      </form>
    </Box>
  );
}
