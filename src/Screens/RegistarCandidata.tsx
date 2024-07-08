import React from "react";
import { Button, Form, Input, InputNumber, Flex } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const App: React.FC = () => (
  <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item
      label="Nombre Completo"
      name="Nombre Completo"
      rules={[{ required: true, message: "Ingrese nombre completo" }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Edad"
      name="Edad"
      rules={[{ required: true, message: "Ingrese la Edad" }]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item
      label="Departamento"
      name="Departamento"
      rules={[{ required: true, message: "Ingrese el departamento" }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Peso"
      name="Peso"
      rules={[{ required: true, message: " Ingrese el Peso" }]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      label="Estatura"
      name="Estatura"
      rules={[{ required: true, message: " Ingrese la Estatura" }]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      label="Biografia"
      name="Biografia"
      rules={[{ required: true, message: "Inserte la Biografia" }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Registrar
      </Button>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Flex wrap gap="small">
        <Button type="primary" danger>
          Cancelar
        </Button>
      </Flex>
    </Form.Item>
  </Form>
);

export default App;
