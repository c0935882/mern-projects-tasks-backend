import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Skeleton,
} from "@chakra-ui/react";

import { getTasks, deleteTask } from "../api/tasksApi.js";

export default function TasksList() {
  const queryClient = useQueryClient();

  // Fetch all tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // ERROR STATE (no Chakra Alert, just plain div)
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
        Error loading tasks: {error.message}
      </div>
    );
  }

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Tasks
      </Heading>

      {/* LOADING STATE */}
      {isLoading && (
        <Stack spacing={4}>
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      )}

      {/* LIST OF TASKS */}
      {!isLoading && (
        <Stack spacing={4}>
          {tasks.map((t) => (
            <Box
              key={t._id}
              border="1px solid #e2e8f0"
              borderRadius="md"
              p={4}
            >
              <Heading size="sm">{t.title}</Heading>

              {t.description && <Text>{t.description}</Text>}

              {t.state && (
                <Text fontSize="sm" color="gray.600">
                  State: {t.state}
                </Text>
              )}

              <Stack direction="row" mt={3}>
                <Button
                  as={Link}
                  to={`/tasks/${t._id}/edit`}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>

                <Button
                  colorScheme="red"
                  size="sm"
                  isLoading={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(t._id)}
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
