import {
  Avatar,
  Card,
  Container,
  Grid,
  Modal,
  Row,
  Spacer,
  useTheme,
  Text,
  Divider,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { ChangeEvent, FC, SyntheticEvent, useRef, useState } from "react";
import { IUser } from "../store/interface/user.interface";
import {FaImage, FaSmile} from 'react-icons/fa';
import "emoji-mart/css/emoji-mart.css";
import {NimblePicker, BaseEmoji} from "emoji-mart";
import data from 'emoji-mart/data/facebook.json'
import { ICreateFeed } from "../interface/feedItem.interface";
import { createdPost } from "../axiosClient/feed.api";
import { toast } from "react-toastify";


interface Props {
  user: IUser;
  reload?: Function;
  token: string;
}

const CreatePost: FC<Props> = ({ user, reload, token }) => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICreateFeed>({
      content: "",
      contentMedia: []
  });
const [pickerShow, setPickerShow] = useState<boolean>(false);

  const onClose = () => {setPickerShow(false);setOpen(false)};
  const onOpen = () => setOpen(true);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({...formData, content: e.target?.value})
  }

  const onEmojiClick = (emojiObject: BaseEmoji) => {
      setFormData({...formData, content: formData.content + emojiObject.native});
  };

  const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const {status} = await createdPost(token, formData);
      if(status === 201) {
          toast.success('Your post had been created');
          onClose();
      }
  }

  return (
    <>
      <Modal
        closeButton
        onClose={onClose}
        open={open}
        style={
          isDark
            ? { backgroundColor: "#1F1F1E", position: "relative" }
            : { position: "relative" }
        }
        width="600px"
      >
        <Modal.Header>
          <Text h4>Create Post</Text>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <Grid.Container>
            <Grid xs={12} css={{ display: "flex", alignItems: "center" }}>
              <Avatar
                bordered
                color="gradient"
                src={user.avatar || "/images/default_avt.jpg"}
              />
              <Text b>{user.fullname}</Text>
            </Grid>
            <Spacer x={5} />
            <Grid xs={11}>
              <textarea
                rows={10}
                value={formData.content}
                onFocus={() => setPickerShow(false)}
                onChange={onTextChange}
                style={{
                  width: "100%",
                  outline: "none",
                  padding: "0 20px 0 0",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                placeholder="What are you thinking?"
              ></textarea>
            </Grid>
            <Grid
              xs={1}
              css={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: 'center'
              }}
            >
              <FaSmile
                size={20}
                cursor={"pointer"}
                onClick={() => setPickerShow(true)}
              />
              <NimblePicker
                onSelect={onEmojiClick}
                set="facebook"
                data={data}
                style={{
                  position: "absolute",
                  right: 0,
                  display: pickerShow ? "block" : "none",
                }}
              />
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Container fluid>
            <Row
              css={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <FaImage size={30} />
              <Text b>Image/Video</Text>
            </Row>
            <Spacer y={0.5} />
            <Row>
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.content.length && !formData.contentMedia?.length
                }
                css={{ width: "100%" }}
              >
                Create
              </Button>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
      <Row>
        <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
          <Card.Body>
            <Grid.Container alignItems="center">
              <Grid xs={1}>
                <Avatar
                  bordered
                  color="gradient"
                  src={user.avatar || "/images/default_avt.jpg"}
                />
              </Grid>
              <Grid xs={11}>
                <Container
                  as="button"
                  onClick={onOpen}
                  css={{
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    backgroundColor: isDark ? "$gray800" : "",
                    padding: "7px 10px",
                    borderRadius: 20,
                    boxShadow: "$md",
                  }}
                >
                  <Text css={{ color: "$gray400" }}>
                    What are you thinking?
                  </Text>
                </Container>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      </Row>
      <Spacer y={1} />
    </>
  );
};

export default CreatePost;
