import { Container, Row } from "@nextui-org/react";
import { FC } from "react";
import Image from 'next/image'
const Footer: FC = () => {
  return (
    <Container md fluid>
      <Row justify="flex-end">
        ©Final Project
      </Row>
      <Row justify="flex-end" align="center">
        Power By
        <Image color="white" width={50} height={50} src={"/images/logo.png"} />
      </Row>
    </Container>
  );
};

export default Footer;
