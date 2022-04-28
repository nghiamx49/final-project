import { useHMSActions } from "@100mslive/react-sdk";
import { connect } from "react-redux";
import { FC, SyntheticEvent } from "react";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { genToken } from "../../axiosClient/video-call.api";

interface Props {
  authenticateReducer: IAuthenciateState;
} 
const JoineRoom: FC<Props> = ({authenticateReducer}) => {
    const {user, token} = authenticateReducer;
    const hmsActions = useHMSActions();


  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const {data, status} = await genToken('host', '', token);
     if(status === 201) {
       hmsActions.join({
         userName: user.fullname,
         authToken: data.token,
       });
     }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <label>{user.fullname}</label>
      </div>
      <button onClick={handleSubmit} className="btn-primary">Join</button>
    </form>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(JoineRoom)