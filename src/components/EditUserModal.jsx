/* eslint-disable react/prop-types */
import { Modal, TextInput, PasswordInput, Button, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

// eslint-disable-next-line react/prop-types
const EditUserModal = ({ opened, onClose, user, onUpdate }) => {
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setName(user?.name || "");
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }

    try {
      setLoading(true);

      const dataToUpdate = { name };
      if (password.trim()) {
        dataToUpdate.password = password;
      }

      const response = await apiClient.put("/profile/edit", dataToUpdate);
      console.log("Response from /profile/edit:", response.data);
      onUpdate(response.data.updatedUser);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar tus datos.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Editar perfil" centered>
      <TextInput
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingresa tu nombre"
        required
        mb="sm"
      />
      <PasswordInput
        label="Contraseña (opcional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresa una nueva contraseña"
        mb="sm"
      />
      <Group position="apart" mt="lg">
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="blue" loading={loading} onClick={handleSave}>
          Guardar
        </Button>
      </Group>
    </Modal>
  );
};

export default EditUserModal;
