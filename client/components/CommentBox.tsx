import { Avatar, FormElement, Grid, Input, Tooltip } from "@nextui-org/react";
import { BaseEmoji, NimblePicker } from "emoji-mart";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { commentToPost, replyAComment } from "../axiosClient/feed.api";
import { IUser } from "../store/interface/user.interface";
import data from "emoji-mart/data/facebook.json";
import { FaSmile } from "react-icons/fa";
import { SendButton } from "./SendButton";
import SendIcon from "./reactions/SendIcon";

interface Props {
    currentUser: IUser;
    setCommentList: Function;
    postId: string;
    token: string;
    type?: 'comment' | 'reply';
    commentId?: string;
}

const CommentBox: FC<Props> = ({currentUser, setCommentList, postId, token, commentId, type = 'comment'}) => {
      const [commentContent, setCommentContent] = useState<string>("");

    const onCommentChange = (e: ChangeEvent<FormElement>) =>
      setCommentContent(e.target.value);

    const handleSubmitComment = async (e: SyntheticEvent) => {
      e.preventDefault();
      const { data, status } =
        type === "comment"
          ? await commentToPost(token, postId, commentContent)
          : await replyAComment(token, postId,commentId, commentContent);
      if (status === 201) {
        setCommentContent("");
        setCommentList(type === "comment" ? [...data.data] : [...data.data.replies]);
      }
    };

      const onEmojiClick = (emojiObject: BaseEmoji) => {
        setCommentContent(commentContent + emojiObject.native);
      };

    return (
      <Grid.Container gap={1} justify="space-around">
        <Grid xs={1}>
          <Avatar
            bordered
            color="primary"
            src={currentUser.avatar || "/images/default_avt.jpg"}
          />
        </Grid>
        <Grid xs={10} justify="flex-end">
          <Input
            width="100%"
            bordered
            borderWeight="normal"
            color="primary"
            value={commentContent}
            onChange={onCommentChange}
            aria-labelledby="comment"
            //onFocus={() => setPickerShow(false)}
            placeholder="Comment anything"
            contentRightStyling={false}
            contentRight={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Tooltip
                  placement="topEnd"
                  css={{
                    width: "fit-content",
                  }}
                  content={
                    <NimblePicker
                      onSelect={onEmojiClick}
                      set="facebook"
                      data={data}
                      showPreview={false}
                    />
                  }
                >
                  <FaSmile cursor={"pointer"} size={20} color="#F5A263" />
                </Tooltip>
                <SendButton
                  onClick={handleSubmitComment}
                  disabled={!commentContent.length}
                >
                  <SendIcon />
                </SendButton>
              </div>
            }
          />
        </Grid>
      </Grid.Container>
    );
}

export default CommentBox;