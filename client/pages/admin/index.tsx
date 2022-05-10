import {
  Avatar,
  Container,
  Row,
  Spacer,
  Text,
  useTheme,
  Card,
  Table,
  Col,
  Tooltip,
  User,
  Pagination,
  Grid,
  Input,
  FormElement,
} from "@nextui-org/react";
import { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  FaAlignCenter,
  FaUserAltSlash,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import { connect } from "react-redux";
import {
  getCount,
  getPostsIn3DaysNearby,
  getPostsPerDay,
} from "../../axiosClient/admin.api";
import {
  getAllUsers,
  getTopActiveUsers,
  updateUserStatus,
} from "../../axiosClient/user.api";
import Rightbar from "../../components/admin/Rightbar";
import Sidebar from "../../components/admin/Sidebar";
import TopBar from "../../components/admin/TopBar";
import { DeleteIcon } from "../../components/table/DeleteIcon";
import { EditIcon } from "../../components/table/EditIcon";
import { EyeIcon } from "../../components/table/EyeIcon";
import { IconButton } from "../../components/table/IconButton";
import { BarChart, BarChartItem } from "../../interface/BarChart.interface";
import { LineChart, LineChartItem } from "../../interface/LineChart.interface";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { IUser } from "../../store/interface/user.interface";
import { debounce } from "../../helpers/debouce";
import { toast } from "react-toastify";
import adminProtected from "../../hocs/adminProtected";

interface Props {
  authenticateReducer: IAuthenciateState;
}

interface TopActive {
  comments: number;
  posts: number;
  user: IUser;
}

interface AppCount {
  posts: number;
  users: number;
}

const Dashboard: NextPage<Props> = ({ authenticateReducer }) => {
  const { isDark } = useTheme();
  const [activeUsers, setActiveUsers] = useState<TopActive[]>([]);
  const [lineChartData, setLineChartData] = useState<LineChart>({
    series: [{ name: "posts", data: [] }],
    categories: [],
  });
  const [barChartData, setBarChartData] = useState<BarChart[]>([]);
  const [counting, setCouting] = useState<AppCount>({ posts: 0, users: 0 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("asc");
  const [users, setUsers] = useState<IUser[]>([]);

  const { token } = authenticateReducer;

  const loadChartData = useCallback(async () => {
    const [
      lineChartResponse,
      barChartResponse,
      activeUsersResponse,
      coutingResponse,
    ] = await Promise.all([
      await getPostsPerDay(token),
      await getPostsIn3DaysNearby(token),
      await getTopActiveUsers(token),
      await getCount(token),
    ]);
    if (activeUsersResponse.status === 200) {
      setActiveUsers(activeUsersResponse.data);
    }
    if (lineChartResponse.status === 200) {
      const dataMapping = lineChartResponse?.data?.map(
        (item: LineChartItem) => item.posts
      );
      const categoriesMapping = lineChartResponse.data.map(
        (item: LineChartItem) => item._id.date
      );
      setLineChartData({
        series: [
          {
            name: "Posts",
            data: dataMapping,
          },
        ],
        categories: categoriesMapping,
      });
    }

    if (barChartResponse.status === 200) {
      const barCharDataMapping = barChartResponse?.data?.map(
        (item: BarChartItem) => ({ x: item._id.date, y: item.posts })
      );

      setBarChartData(barCharDataMapping);
    }

    if (coutingResponse.status === 200) {
      setCouting(coutingResponse.data);
    }
  }, [token]);

  const loadUsers = useCallback(async () => {
    const { data, status } = await getAllUsers(token, "", currentPage, sort);
    if (status === 200) {
      setUsers(data?.data);
      setTotalPage(data?.totalPage);
    }
  }, [token, currentPage]);

  const handleSearch = async (e: ChangeEvent<FormElement>) => {
    setCurrentPage(1);
    const { data, status } = await getAllUsers(token, e.target.value, 1, sort);
    if (status === 200) {
      setUsers(data?.data);
      setTotalPage(data?.totalPage);
    }
  };

  const searchWithTimeout = debounce(handleSearch, 500);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  const sorting = () => {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  };

  const changeUserStatus = async (userId: string, status: boolean) => {
    const { status: responseStatus } = await updateUserStatus(
      userId,
      status,
      token
    );
    if (responseStatus === 200) {
      loadUsers();
      toast.success("Updated");
    }
  };

  const columns = [
    { name: "USER", uid: "name", allowsSorting: false },
    { name: "DATE OF BIRTH", uid: "dob", allowsSorting: true },
    { name: "ADDRESS", uid: "address", allowsSorting: false },
    { name: "ACTIONS", uid: "actions", allowsSorting: false },
  ];
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
      <Row aria-labelledby="TopBar">
        <TopBar />
      </Row>
      <Row aria-labelledby="Content">
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
                <Grid.Container
                  css={{
                    justifyContent: "space-between",
                    gap: 10,
                    flexWrap: "nowrap",
                  }}
                >
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
                    <div style={{ textAlign: "center" }}>
                      <Text size={14}>Total Users</Text>
                      <Text h4>{counting.users}</Text>
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
                    <div style={{ textAlign: "center" }}>
                      <Text size={14}>Total Posts</Text>
                      <Text h4>{counting.posts}</Text>
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
                  {activeUsers.map((item, index) => (
                    <Grid xs={4} key={index}>
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
                            padding: "0px 10px",
                            borderRadius: "$rounded",
                          }}
                        >
                          <Text b size={16} css={{ color: "$gray300" }}>
                            {index + 1}
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
                            src={item.user.avatar || "/images/default_avt.jpg"}
                            bordered
                            color={
                              index === 0
                                ? "primary"
                                : index === 1
                                ? "secondary"
                                : "warning"
                            }
                          />
                          <Text b>{item.user.fullname}</Text>
                          <Text>{item.user.email}</Text>
                          <Text>Total Post: {item.posts}</Text>
                          <Text>Total Comments: {item.comments}</Text>
                          {/* <Button
                            color={
                              index === 0
                                ? "primary"
                                : index === 1
                                ? "secondary"
                                : "warning"
                            }
                            light
                            bordered
                            size="sm"
                          >
                            View Detail
                          </Button> */}
                        </Card.Body>
                      </Card>
                    </Grid>
                  ))}
                </Grid.Container>
              </Row>
              <Row>
                <Text b>Users</Text>
              </Row>
              <Spacer y={0.5} />
              <Row
                css={{
                  display: "block",
                  background: isDark ? "$gray800" : "",
                  borderRadius: "$md",
                  paddingBottom: "$5",
                  boxShadow: "$md",
                }}
              >
                <Container
                  display="flex"
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Input
                    bordered
                    color="primary"
                    placeholder="search.."
                    aria-labelledby="Search"
                    onChange={(e) => searchWithTimeout(e)}
                    css={{ margin: "10px 20px 0" }}
                  />
                  <Pagination
                    total={totalPage}
                    page={currentPage}
                    onChange={(page) => {
                      setCurrentPage(page);
                    }}
                  />
                </Container>
                <Table
                  aria-label="User table"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                    paddingBottom: 0,
                  }}
                  selectionMode="none"
                  shadow={false}
                >
                  <Table.Header columns={columns}>
                    {(column) => (
                      <Table.Column
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                      >
                        {column.name}
                      </Table.Column>
                    )}
                  </Table.Header>
                  <Table.Body css={{ height: 300 }} items={users}>
                    {(user) => (
                      <Table.Row key={user._id} aria-labelledby="User Row">
                        <Table.Cell>
                          {
                            <User
                              squared
                              src={user.avatar || "/images/default_avt.jpg"}
                              name={user.fullname}
                            >
                              {user.email}
                            </User>
                          }
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{user.dateOfBirth}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{user.address}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Row justify="center" align="center">
                            <Tooltip
                              content={
                                user.isActive
                                  ? "Deactivate user"
                                  : "Reactivate User"
                              }
                            >
                              <IconButton
                                onClick={() =>
                                  changeUserStatus(user._id, !user.isActive)
                                }
                              >
                                {user.isActive ? (
                                  <FaUserAltSlash
                                    color="#F31260"
                                    size={20}
                                  />
                                ) : (
                                  <FaUserCheck
                                    color="#17C964"
                                    size={20}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Row>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Row>
            </Container>
          </Grid>
          <Grid xs={2} md={2} lg={2} alignItems="flex-start" justify="flex-end">
            <Rightbar
              barChartData={barChartData}
              lineChartData={lineChartData}
            />
          </Grid>
        </Grid.Container>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(adminProtected(Dashboard));
