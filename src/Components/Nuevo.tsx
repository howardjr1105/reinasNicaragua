import React from "react";
import { Flex, Input } from "antd";

function Nuevo() {
  return (
    <Flex vertical gap={12}>
      <Input placeholder="Outlined" />
      <Input placeholder="Filled" variant="filled" />
      <Input placeholder="Borderless" variant="borderless" />
    </Flex>
  );
}

export default Nuevo;
