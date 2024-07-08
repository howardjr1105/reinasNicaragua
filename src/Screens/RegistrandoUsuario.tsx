import React from "react";
import { Button, Form, Input, Flex } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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
      label="Email"
      name="Email"
      rules={[{ required: true, message: "Ingrese su correo" }]}
    >
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      label="Contraseña"
      name="Contraseña"
      rules={[{ required: true, message: " Ingrese la contraseña" }]}
    >
      <Input.Password placeholder="ingrese la contraseña " />
      <Input.Password
        placeholder="ingrese la contraseña"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
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
