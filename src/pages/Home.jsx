import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Text,
  Title,
  Container,
  Stack,
  Textarea,
  Button,
  Group,
  Avatar,
  Menu,
} from "@mantine/core";
import EditUserModal from "../components/EditUserModal";
import useAuth from "../hooks/useAuth";
import apiClient from "../services/apiClient";

const Home = () => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPost.trim() || !newTitle.trim()) {
      alert("El título y el contenido son obligatorios.");
      return;
    }

    try {
      const response = await apiClient.post("/posts", {
        title: newTitle,
        content: newPost,
      });
      setPosts([response.data, ...posts]);
      setNewPost("");
      setNewTitle("");
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.user?.id === updatedUser.id
          ? { ...post, user: { ...post.user, name: updatedUser.name } }
          : post
      )
    );

    setEditModalOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <Group position="left">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              radius="xl"
              size="lg"
              src={user.avatar || undefined}
              alt="Foto de perfil"
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Opciones</Menu.Label>
            <Menu.Item onClick={() => setEditModalOpen(true)}>
              Editar perfil
            </Menu.Item>
            <Menu.Item color="red" onClick={handleLogout}>
              Cerrar sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <EditUserModal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onUpdate={handleUpdateUser}
      />

      <Title align="center" mt="md">
        Bienvenido a tu muro
      </Title>

      <Card
        shadow="md"
        padding="lg"
        radius="md"
        withBorder
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "20px auto",
        }}
      >
        <Text fw={500}>{user.name}</Text>
        <Textarea
          placeholder="Título del post"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autosize
          minRows={1}
          maxRows={2}
          mt="md"
        />
        <Textarea
          placeholder="Escribe algo..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          autosize
          minRows={2}
          maxRows={4}
          mt="md"
        />
        <Button
          mt="md"
          fullWidth
          color="blue"
          radius="md"
          onClick={handlePostSubmit}
        >
          Publicar
        </Button>
      </Card>

      <div style={{ marginTop: "40px" }} />

      <Container size="md">
        <Stack spacing="lg">
          {posts.map((post) => (
            <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text fw={500}>{post.title}</Text>
              </Group>
              <Text color="dimmed" size="sm">
                Publicado por: {post.user?.name || "Desconocido"}
              </Text>
              <Text mt="sm">{post.content}</Text>
            </Card>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
