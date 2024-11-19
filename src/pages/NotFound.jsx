import { Link } from "react-router-dom";
import { Container, Title, Text, Button } from "@mantine/core";

const NotFound = () => {
  return (
    <Container
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <Title order={1} style={{ fontSize: "3rem", color: "#1c7ed6" }}>
        404
      </Title>
      <Text size="lg" style={{ marginBottom: "20px", color: "#495057" }}>
        Oops, no pudimos encontrar la página que buscabas.
      </Text>
      <Button
        component={Link}
        to="/"
        variant="light"
        color="blue"
        size="md"
        radius="xl"
      >
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFound;
