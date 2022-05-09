import {
  Avatar,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
  Link,
  Image,
  Input,
  useTheme,
  Switch,
  Card,
  Button,
  Table,
  Col,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import NextLink from "next/link";
import { Key } from "react";
import {
  FaAlignCenter,
  FaUsers,
} from "react-icons/fa";
import Rightbar from "../../components/admin/Rightbar";
import Sidebar from "../../components/admin/Sidebar";
import { StyledBadge } from "../../components/table/Badget";
import { DeleteIcon } from "../../components/table/DeleteIcon";
import { EditIcon } from "../../components/table/EditIcon";
import { EyeIcon } from "../../components/table/EyeIcon";
import { IconButton } from "../../components/table/IconButton";

interface User {
  [key: string]: string;
}

const Dashboard = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users: User[] = [
    {
      id: "1",
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
    {
      id: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
    },
    {
      id: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
    },
    {
      id: "4",
      name: "William Howard",
      role: "Community Manager",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
    },
    {
      id: "5",
      name: "Kristen Copper",
      role: "Sales Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com",
    },
  ];
  const renderCell = (user: User, columnKey: Key) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            squared
            src={user.avatar}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents3" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
      return <StyledBadge css={{'@type': `$${user.status}`}}>{cellValue}</StyledBadge>;
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", user.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Container
      fluid
      xl
      css={{
        minHeight: "100vh",
        maxHeight: "100vh",
        padding: "5px 20px 0 10px",
        margin: 0,
      }}
    >
      <Row>
        <Grid.Container justify="space-between">
          <Grid xs={2} md={2} lg={2} alignItems="center" justify="flex-start">
            <Image src="/images/logo.png" height={50} width={50} />
          </Grid>
          <Grid xs={10} md={10} lg={10} alignItems="center">
            <Text h2>Dashboard</Text>
          </Grid>
        </Grid.Container>
      </Row>
      <Row>
        <Grid.Container justify="space-between">
          <Grid
            xs={2}
            md={2}
            lg={2}
            alignItems="flex-start"
            css={{ paddingTop: "$10" }}
          >
            <Sidebar />
          </Grid>
          <Grid xs={8} md={8} lg={8} alignItems="center">
            <Container
              fluid
              css={{
                backgroundColor: isDark ? "$accents1" : "",
                padding: 10,
                borderRadius: "$sm",
                boxShadow: "$md",
              }}
            >
              <Row>
                <Grid.Container css={{justifyContent: 'space-between', gap: 10, flexWrap: 'nowrap'}}>
                  <Grid
                    xs={6}
                    md={6}
                    lg={6}
                    css={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      justifyContent: "center",
                      backgroundColor: isDark ? "$gray800" : "",
                      padding: 10,
                      borderRadius: "$sm",
                      boxShadow: "$md",
                    }}
                  >
                    <div>
                      <Text size={14}>Total Users</Text>
                      <Text h4>60</Text>
                    </div>
                    <FaUsers size={50} />
                  </Grid>
                  <Grid
                    xs={6}
                    md={6}
                    lg={6}
                    css={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      justifyContent: "center",
                      backgroundColor: isDark ? "$gray800" : "",
                      padding: 10,
                      borderRadius: "$sm",
                      boxShadow: "$md",
                    }}
                  >
                    <div>
                      <Text size={14}>Total Posts</Text>
                      <Text h4>128</Text>
                    </div>
                    <FaAlignCenter size={50} />
                  </Grid>
                </Grid.Container>
              </Row>
              <Row>
                <Text b>Most Active Users</Text>
              </Row>
              <Row>
                <Grid.Container gap={3} css={{ minHeight: "320px" }}>
                  <Grid xs={4}>
                    <Card
                      css={{
                        backgroundColor: isDark ? "$gray800" : "",
                        position: "relative",
                      }}
                    >
                      <Card.Header
                        css={{
                          position: "absolute",
                          right: 25,
                          top: 25,
                          display: "inline-block",
                          width: "fit-content",
                          zIndex: 10,
                          background: "$gray700",
                          height: "fit-content",
                          padding: "1px 5px",
                          borderRadius: "$rounded",
                        }}
                      >
                        <Text b size={16} css={{ color: "$gray300" }}>
                          1st
                        </Text>
                      </Card.Header>
                      <Card.Body
                        css={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "$xl $sm",
                          overflow: "hidden",
                        }}
                      >
                        <Avatar
                          css={{ size: "$20" }}
                          src="/images/default_avt.jpg"
                          bordered
                          color={"primary"}
                        />
                        <Text b>Mai Xuan Nghia</Text>
                        <Text>mxnghia49@gmail.com</Text>
                        <Text>Total Post: 20</Text>
                        <Button light bordered size="sm">
                          View Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid xs={4}>
                    <Card
                      css={{
                        backgroundColor: isDark ? "$gray800" : "",
                        position: "relative",
                      }}
                    >
                      <Card.Header
                        css={{
                          position: "absolute",
                          right: 25,
                          top: 25,
                          display: "inline-block",
                          width: "fit-content",
                          zIndex: 10,
                          background: "$gray700",
                          height: "fit-content",
                          padding: "1px 5px",
                          borderRadius: "$rounded",
                        }}
                      >
                        <Text b size={16} css={{ color: "$gray300" }}>
                          2nd
                        </Text>
                      </Card.Header>
                      <Card.Body
                        css={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "$xl $sm",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Avatar
                          css={{ size: "$20" }}
                          src="/images/default_avt.jpg"
                          bordered
                          color={"secondary"}
                        />
                        <Text b>Mai Xuan Nghia</Text>
                        <Text>mxnghia49@gmail.com</Text>
                        <Text>Total Post: 20</Text>
                        <Button light bordered size="sm" color="secondary">
                          View Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid xs={4}>
                    <Card
                      css={{
                        backgroundColor: isDark ? "$gray800" : "",
                        position: "relative",
                      }}
                    >
                      <Card.Header
                        css={{
                          position: "absolute",
                          right: 25,
                          top: 25,
                          display: "inline-block",
                          width: "fit-content",
                          zIndex: 10,
                          background: "$gray700",
                          height: "fit-content",
                          padding: "1px 5px",
                          borderRadius: "$rounded",
                        }}
                      >
                        <Text b size={16} css={{ color: "$gray300" }}>
                          3rd
                        </Text>
                      </Card.Header>
                      <Card.Body
                        css={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "$xl $sm",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Avatar
                          css={{ size: "$20" }}
                          src="/images/default_avt.jpg"
                          bordered
                          color={"warning"}
                        />
                        <Text b>Mai Xuan Nghia</Text>
                        <Text>mxnghia49@gmail.com</Text>
                        <Text>Total Post: 10</Text>
                        <Button light bordered size="sm" color="warning">
                          View Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container>
              </Row>
              <Row>
                <Text b>Users</Text>
              </Row>
              <Spacer y={0.5} />

              <Row css={{ display: "block" }}>
                <Table
                  aria-label="Example table with custom cells"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                    background: isDark ? "$gray800" : "",
                  }}
                  selectionMode="none"
                >
                  <Table.Header columns={columns}>
                    {(column) => (
                      <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                      >
                        {column.name}
                      </Table.Column>
                    )}
                  </Table.Header>
                  <Table.Body items={users}>
                    {(item) => (
                      <Table.Row>
                        {(columnKey: Key) => (
                          <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Row>
            </Container>
          </Grid>
          <Grid xs={2} md={2} lg={2} alignItems="flex-start" justify="flex-end">
            <Rightbar />
          </Grid>
        </Grid.Container>
      </Row>
    </Container>
  );
};

export default Dashboard;
