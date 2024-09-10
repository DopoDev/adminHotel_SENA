import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario, addUsuario } from "../api/usuarios.api";
import {Button, Flex, Space, Table, Modal, message, Form, Input} from 'antd';

const UsuariosComponent = () =>{
  const [usuarios, setUsuarios] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fechtUsuario = async () => {
      try {
        const response = await getUsuarios();
        setUsuarios(response);
      }catch(error) {
        console.error("Error al obtener datos", error);
        throw error;
      }
    };
    fechtUsuario();    
  }, []);

  const handleCreate = async(values) => {
    try{
      const newUser = await addUsuario(values);
      setUsuarios([...usuarios, newUser]);
      message.success('Usuario creado con exito');
    }catch(error){
      console.error("Error al crear usuario", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estas seguro de eliminar este usuario?',
      okText: 'Si',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteUsuario(id);
          setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
          message.success('Usuario eliminado con exito');
        }catch(error) {
          console.error("Error al Eliminar usuario", error);
          throw error;
      }
      }
    })
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    }, 
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Creado',
      dataIndex: 'creacion',
      key: 'creacion',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, usuario) => (
        <Space size={"middle"}>
          <Button type="link">Editar</Button>
          <Button type="link" danger onClick={() => handleDelete(usuario.id)}>Eliminar</Button>
        </Space>
      )
    }
  ]

  return(
    <div>
      <h1>Usuarios</h1>

      <Table columns={columns} dataSource={usuarios} rowKey={"name"} />

    <Flex justify="center">
      <Button type="primary" onClick={showModal}>Agregar Usuarios</Button>
    </Flex>

    <Modal title="Crear un nuevo usuario" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <Form layout="vertical" onFinish={handleCreate}>
        <Form.Item name={"name"} label="Nombre" rules={[{required: true, message: 'Por favor ingrese el nombre'}]}>
          <Input />
        </Form.Item>
        <Form.Item name={"email"} label="Email" rules={[{required: true, message: 'Por favor ingrese el email'}]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Agregar Usuario</Button>
        </Form.Item>
      </Form>
    </Modal>

    </div>
    
  )

}

export default UsuariosComponent;