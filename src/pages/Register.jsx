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
  Stack,
  Text,
} from "@mantine/core";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError("El nombre no debe contener números o caracteres especiales.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("El correo electrónico no tiene un formato válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await apiClient.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrarse");
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
      <Container size={420}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Title
            align="center"
            style={{
              fontFamily: "Greycliff CF, sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
            }}
          >
            Registro
          </Title>

          {error && (
            <Text color="red" align="center" mt="md">
              {error}
            </Text>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <Stack spacing="lg">
              <TextInput
                label="Nombre"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                radius="md"
                size="md"
                required
              />

              <TextInput
                label="Correo"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                radius="md"
                size="md"
                required
              />

              <PasswordInput
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
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
                Registrarse
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
