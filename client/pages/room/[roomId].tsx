import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { IRootState } from "../../store/interface/root.interface";
import { connect } from "react-redux";
import { NextPage } from "next";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { Container } from "@nextui-org/react";
import Conference from "../../components/videoRoom/conference";
import Join from "../../components/videoRoom/join";


const JoinForm: NextPage = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <Container fluid>
        {isConnected ? <Conference /> : <Join />}
    </Container>
  );
}


export default JoinForm;
