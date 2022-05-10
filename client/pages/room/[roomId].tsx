import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { NextPage } from "next";
import { Container } from "@nextui-org/react";
import Conference from "../../components/videoRoom/conference";
import Join from "../../components/videoRoom/join";
import { useRouter } from "next/router";
import protectedRoute from "../../hocs/protectedRouter";


const JoinForm: NextPage = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const {query} = useRouter();

  useEffect(() => {
    return () => {
      if (isConnected) {
        hmsActions.leave();
      }
    }
  }, [hmsActions, isConnected]);

  return (
    <Container fluid css={{padding: 0, margin: 0}}>
      {isConnected ? <Conference /> : <Join roomId={query?.roomId || ''} />}
    </Container>
  );
}


export default protectedRoute(JoinForm);
