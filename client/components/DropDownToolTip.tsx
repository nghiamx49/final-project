import { Avatar, Grid, Text, Card, Row, useTheme, Link, Divider, Col, Switch } from "@nextui-org/react";
import NextLink from "next/link";
import { FC, MouseEventHandler } from "react";
import {IoMdMoon, IoMdSunny, IoMdSettings} from 'react-icons/io'
import {FaSignOutAlt, FaChevronRight} from 'react-icons/fa'
import styles from '../styles/custom.module.css'
import { useTheme as useNextTheme } from "next-themes";

interface DropDownPanelProps {
    avatar?: string
    fullname?: string,
    profileLink: string,
    logoutHandler: MouseEventHandler
}

const DropDownPanel: FC<DropDownPanelProps> = ({avatar, fullname, profileLink, logoutHandler}) => {
    const {isDark} = useTheme();
  const { setTheme } = useNextTheme();
    return (
      <Card
        css={
          isDark ? { backgroundColor: "#1F1F1E", padding: 0 } : { padding: 0 }
        }
      >
        <NextLink href={profileLink}>
          <Link block color="primary">
            <Card.Header>
              <Grid.Container gap={0} alignItems="center">
                <Grid xs={3}>
                  <Avatar src={avatar} size="lg" />
                </Grid>
                <Grid xs={8}>
                  <Row fluid css={{ display: "flex", flexDirection: "column" }}>
                    <Text h4 css={{ padding: 0, margin: 0 }}>
                      {fullname}
                    </Text>
                    <Text>View Your Profile</Text>
                  </Row>
                </Grid>
              </Grid.Container>
            </Card.Header>
          </Link>
        </NextLink>
        <Divider />
        <Card.Body css={{ padding: 0 }}>
          <Row fluid className={styles.tooltipItems}>
            <Col css={{ display: "flex", alignItems: "center" }}>
              <IoMdSettings size={30} />
              <Text h5 css={{ marginLeft: 5 }}>
                Settings
              </Text>
            </Col>
            <Col css={{ display: "flex", justifyContent: "flex-end" }}>
              <FaChevronRight size={25} />
            </Col>
          </Row>
          <Row fluid className={styles.tooltipItems}>
            <Col css={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={isDark}
                iconOff={<IoMdMoon />}
                iconOn={<IoMdMoon />}
                color="primary"
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              />
              <Text h5 css={{ marginLeft: 5 }}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </Text>
            </Col>
            <Col css={{ display: "flex", justifyContent: "flex-end" }}>
              <FaChevronRight size={25} />
            </Col>
          </Row>
          <Row fluid className={styles.tooltipItems} onClick={logoutHandler}>
            <Col css={{ display: "flex", alignItems: "center" }}>
              <FaSignOutAlt size={30} />
              <Text h5 css={{ marginLeft: 5 }}>
                Sign Out
              </Text>
            </Col>
            <Col css={{ display: "flex", justifyContent: "flex-end" }}>
              <FaChevronRight size={25} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
}

export default DropDownPanel;