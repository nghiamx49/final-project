import { createContext, FC, ReactChild, ReactChildren, useEffect } from "react";
import { connect } from "react-redux";
import {io} from "socket.io-client";
import { IAuthenciateState } from "../store/interface/authenticate.interface";
import { IRootState } from "../store/interface/root.interface";

export const socket = io("http://localhost:5000", { autoConnect: false });
export const SocketContext = createContext(socket);

interface Props {
    children: ReactChild | ReactChildren;
    authenticateReducer: IAuthenciateState
}

const SocketProvider: FC<Props> = ({children, authenticateReducer}) => {

  const {user, isAuthenticated} = authenticateReducer;

    useEffect(() => {
      socket.connect();
      socket.emit("online", user._id);
      return () => {
        socket.emit('offline', user._id);
      };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer
  }
}

export default connect(mapStateToProps)(SocketProvider);