import { Row, Text, Link } from "@nextui-org/react";
import { FC, ReactChild } from "react";
import { IconType } from "react-icons";
import NextLink from "next/link";


interface SideBarItemProps {
    title: string,
    Icon: IconType,
    link: string
}

const SideBarItem: FC<SideBarItemProps> = ({title, Icon, link}) => {
    return (
      <Row fluid>
        <NextLink href={link} passHref>
          <Link block color="primary" css={{dislay: "flex", columnGap: 10, alignItems: 'center', width: 400, paddingTop: 20, paddingBottom: 20}}>
            <Icon size={30} />
            <Text h5>{title}</Text>
          </Link>
        </NextLink>
      </Row>
    );
}

export default SideBarItem;