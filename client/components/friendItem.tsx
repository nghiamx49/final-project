import { EventHandler, FC, MouseEventHandler, useState } from "react";
import NextLink from "next/link";
import {
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Spacer,
  Text,
  useTheme,
} from "@nextui-org/react";
import { IUser } from "../store/interface/user.interface";
import { FriendStatus } from "../type/friendStatus.enum";

interface ItemProps {
  user: IUser;
  addFriendHandler?: MouseEventHandler;
  aceptHandler?: MouseEventHandler;
  declineHandler?: MouseEventHandler;
  cancelRequestHandler?: MouseEventHandler;
  unfriendHandler?: Function;
}

const FriendItem: FC<ItemProps> = ({
  user,
  addFriendHandler,
  aceptHandler,
  cancelRequestHandler,
  declineHandler,
  unfriendHandler
}) => {
  const { isDark } = useTheme();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const onConfirm = async () => {
    unfriendHandler && await unfriendHandler();
    setConfirmOpen(false);
  }

  return (
    <>
      <Modal closeButton animated open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <Modal.Body
          css={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text>Are your sure to unfriend</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onClick={() => setConfirmOpen(false)}
          >
            Close
          </Button>
          <Button auto onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Grid xs={2} css={{ cursor: "pointer" }}>
        <NextLink href={`/profile/${user?.username || user?._id}`} passHref>
          <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
            <Card.Body css={{ padding: 0 }}>
              <Card.Image
                width="100%"
                height={250}
                objectFit="cover"
                src={user?.avatar || "/images/default_avt.jpg"}
              />
              <Spacer y={0.5} />
              <Text css={{ padding: "5px 15px" }} size={14} weight="medium">
                {user.fullname}
              </Text>
            </Card.Body>
            <Card.Footer>
              {user?.friendStatus?.status === FriendStatus.NOT_SENT && (
                <Button
                  css={{ backgroundColor: "$blue700", color: "$blue100" }}
                  onClick={addFriendHandler}
                >
                  Add Friend
                </Button>
              )}
              {user?.friendStatus?.status === FriendStatus.ACCEPTED && (
                <Button
                  css={{ backgroundColor: "$gray700", color: "white" }}
                  onClick={e => {e.preventDefault();setConfirmOpen(true);}}
                >
                  Unfriend
                </Button>
              )}
              {user?.friendStatus?.status === FriendStatus.PENDING && (
                <Container
                  fluid
                  display="flex"
                  css={{ padding: 0, margin: 0, gap: 10 }}
                >
                  {cancelRequestHandler ? (
                    <Button
                      css={{ backgroundColor: "$gray700", color: "white" }}
                      onClick={cancelRequestHandler}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <>
                      <Button
                        css={{ backgroundColor: "$blue700", color: "$blue100" }}
                        onClick={aceptHandler}
                      >
                        Accept
                      </Button>
                      <Button
                        css={{ backgroundColor: "$gray700", color: "white" }}
                        onClick={declineHandler}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                </Container>
              )}
            </Card.Footer>
          </Card>
        </NextLink>
      </Grid>
    </>
  );
};

export default FriendItem;
