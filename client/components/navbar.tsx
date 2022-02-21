import { Grid, Container, Text, Row, Col, Link, Input, Avatar } from "@nextui-org/react";
import { FunctionComponent } from "react";
import NextLink from 'next/link';
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react';
import Image from "next/image";

const NavBar: FunctionComponent = () => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();
  return (
    <Container md fluid responsive={true}>
      <Grid.Container justify="space-between" alignItems="center">
        <Grid>
          <Link href="/">
            <Grid.Container alignItems="center">
              <Image
                color="white"
                width={50}
                height={50}
                src={"/images/logo.png"}
              />
              <Text h2>Final Project</Text>
            </Grid.Container>
          </Link>
        </Grid>
        <Grid>
          <Grid.Container gap={3} alignItems="center">
            <Grid>
              <NextLink href="/">
                <Link block css={{ fontWeight: "$bold" }}>
                  Home
                </Link>
              </NextLink>
            </Grid>
            <Grid>
              <NextLink href="/">
                <Link block color="text" css={{ fontWeight: "$bold" }}>
                  Products
                </Link>
              </NextLink>
            </Grid>
            <Grid>
              <NextLink href="/about">
                <Link block color="text" css={{ fontWeight: "$bold" }}>
                  About
                </Link>
              </NextLink>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid>
          <Grid.Container gap={2} alignItems="center">
            <Grid>
              <Input
                aria-labelledby="search"
                bordered
                borderWeight="light"
                placeholder={type}
              />
            </Grid>
            <Grid>
              <Switch
                checked={isDark}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              />
            </Grid>
            <Grid>
              <Avatar
                src={
                  "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/269891404_1557376167946818_8381890360866751040_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=-VBuQYN_NGoAX_kA96n&_nc_ht=scontent.fhan2-4.fna&oh=00_AT8iuW8Yng85KFlkBvwZW7y4bFQZmLj6rlO5iZnkaVYzoQ&oe=62188749"
                }
                size="lg"
                pointer
                bordered
                color="gradient"
              />
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default NavBar;
