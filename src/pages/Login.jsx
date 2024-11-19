import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Container,
  Title,
  Text,
  Stack,
} from "@mantine/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "0 20px",
      }}
    >
      <Container size={360}>
        <Paper
          withBorder
          shadow="md"
          p={20}
          radius="md"
          style={{
            width: "100%",
            maxWidth: "320px",
            textAlign: "center",
          }}
        >
          {/* Título */}
          <Title
            align="center"
            style={{
              fontFamily: "Greycliff CF, sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            Bienvenido de vuelta
          </Title>
          <Text color="dimmed" size="xs" align="center" mt={10}>
            ¿Aún no tienes cuenta?{" "}
            <a
              href="/register"
              style={{ color: "#1c7ed6", textDecoration: "none" }}
            >
              Regístrate aquí
            </a>
          </Text>

          <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
            <Stack spacing="md">
              {" "}
              <TextInput
                label="Correo"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                radius="md"
                size="md"
                required
              />
              <PasswordInput
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                radius="md"
                size="md"
                required
                styles={{
                  visibilityToggle: {
                    display: "none",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                size="md"
                radius="md"
                color="blue"
                style={{
                  background: "linear-gradient(90deg, #1c7ed6, #339af0)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Ingresar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
