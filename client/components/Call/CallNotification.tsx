import { Avatar, Button, Grid, Modal, Text } from "@nextui-org/react";
import { useContext } from "react";
import { ISocketContext, SocketContext } from "../../hocs/socketContext";


const CallNotification = () => {
    const {  isReceivingCall,answerCall, from } = useContext(
      SocketContext
    ) as ISocketContext;
    
    return (
      <Modal open={isReceivingCall}>
        <Modal.Header>
          <Text h4>New Video Call</Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={1} alignItems="center">
            <Grid xs={2}>
              <Avatar
                size="lg"
                color="gradient"
                bordered
                src={from?.avatar || "/images/default_avt.jpg"}
              />
            </Grid>
            <Grid xs={10}>
              <Text b>{from?.fullname}</Text>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error">
            Declined
          </Button>
          <Button auto onClick={answerCall}>
            Answer
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default CallNotification