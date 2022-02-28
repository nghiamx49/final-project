import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { FunctionComponent, ReactChild } from "react";
import { Container } from "@nextui-org/react";

interface ApplicationLayoutProps {
    children: ReactChild
}

const ApplicationLayout: FunctionComponent<ApplicationLayoutProps> = (props) => {
    return (
      <>
        <NavBar />
        <Container fluid as="main">{props.children}</Container>
      </>
    );
}

export default ApplicationLayout;