import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

import ProjectsList from "./components/ProjectsList.jsx";
import TasksList from "./components/TasksList.jsx";
import ProjectForm from "./components/ProjectForm.jsx";

export default function App() {
  return (
    <Box p={4}>
      {/* Top navigation */}
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">TaskFlow</Heading>
        <Flex gap={2}>
          <Button as={Link} to="/" variant="outline">
            Home
          </Button>
          <Button as={Link} to="/projects" variant="outline">
            Projects
          </Button>
          <Button as={Link} to="/tasks" variant="outline">
            Tasks
          </Button>
          <Button as={Link} to="/projects/new" colorScheme="teal">
            New Project
          </Button>
        </Flex>
      </Flex>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div>Welcome to TaskFlow </div>} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/:id/edit" element={<ProjectForm isEdit />} />
      </Routes>
    </Box>
  );
}
