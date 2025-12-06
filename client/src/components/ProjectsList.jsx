import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { getProjects, deleteProject } from "../api/projectsApi.js";

export default function ProjectsList() {
  const queryClient = useQueryClient();

  // --- FETCH PROJECTS ---
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const projects = data ?? [];

  // --- DELETE PROJECT MUTATION ---
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      alert("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      alert("Delete failed: " + err.message);
    },
  });

  // --- ERROR STATE ---
  if (isError) {
    return (
      <div
        style={{
          color: "red",
          padding: "1rem",
          fontSize: "1.1rem",
          background: "#ffe6e6",
          borderRadius: "6px",
          margin: "1rem",
        }}
      >
        Error loading projects: {error.message}
      </div>
    );
  }

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Projects
      </Heading>

      {/* LOADING STATE */}
      {isLoading && (
        <Stack spacing={4}>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      )}

      {/* NORMAL STATE */}
      {!isLoading && (
        <Stack spacing={4}>
          {projects.map((p) => (
            <Box
              key={p._id}
              border="1px solid #e2e8f0"
              borderRadius="md"
              p={4}
            >
              <Heading size="sm">{p.name}</Heading>
              <Text>{p.description}</Text>

              <Stack direction="row" mt={3}>
                <Button
                  as={Link}
                  to={`/projects/${p._id}/edit`}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>

                <Button
                  colorScheme="red"
                  size="sm"
                  isLoading={deleteMutation.isPending}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this project?")) {
                      deleteMutation.mutate(p._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
