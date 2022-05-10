import { Card, Container, FormElement, Input, Row, Text } from "@nextui-org/react";
import { SendButton } from "../SendButton";
import SendIcon from '../reactions/SendIcon'
import { KeyboardEvent, useState } from "react";
import { selectBroadcastMessages, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
const ChatPannel = () => {

    const [text, setText] = useState<string>("");
    const hmsActions = useHMSActions();
    const brodacastMessages = useHMSStore(selectBroadcastMessages);

    const onEnter = async (e: KeyboardEvent<FormElement>) => {
      if (e.key === "Enter" && (text?.length > 0)) {
       hmsActions.sendBroadcastMessage(text);
       setText("");
      }
    };

    const sendMessage = () => {
        hmsActions.sendBroadcastMessage(text);
        setText("");
    }

  return (
    <Container
      css={{
        height: 900,
        width: 400,
        padding: 0,
        position: "fixed",
        top: 70,
        right: 0,
      }}
    >
      <Card
        css={{
          height: "100%",
          borderBottomLeftRadius: "none",
          padding: 0,
          margin: 0,
          boxShadow: "$sm",
          background: "$gray900",
        }}
      >
        <Card.Body
          css={{
            height: "100%",
            overflow: "auto",
            padding: "10px 0",
            justifyContent: "flex-start",
          }}
        >
          <Container
            fluid
            css={{
              margin: "0",
              height: "fit-content",
              maxHeight: "100%",
              overflow: "auto",
              padding: 10,
              display: "flex",
              gap: 15,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {brodacastMessages.map((item) => (
              <Row key={item.id} css={{display: 'flex', gap: 5}}>
                <Text b>{item.senderName}: </Text>
                <Text>{item.message}</Text>
              </Row>
            ))}
          </Container>
        </Card.Body>
        <Card.Footer
          css={{
            padding: "5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Input
            animated={false}
            width="100%"
            bordered
            borderWeight="light"
            color="primary"
            aria-labelledby="message"
            placeholder="Message..."
            contentRightStyling={false}
            value={text}
            onKeyPress={onEnter}
            onChange={(e) => setText(e.target.value)}
            contentLeftStyling={false}
            contentRight={
              <SendButton onClick={sendMessage} disabled={!text.length}>
                <SendIcon />
              </SendButton>
            }
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatPannel;
