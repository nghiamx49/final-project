import { Children, createContext, Dispatch, FC, ReactChild, SetStateAction, useState } from "react";
import { IUser } from "../store/interface/user.interface";

interface Props {
    children: ReactChild
}

interface IContext {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  friend?: IUser | null;
  setFriend?: Dispatch<SetStateAction<IUser | null>>;
}

export const ChatWidgetContext = createContext<IContext>({});

    

export const ChatWidgetProvider: FC<Props> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [friend, setFriend] = useState<IUser | null>(null);
  return (
    <ChatWidgetContext.Provider
      value={{ open, setOpen, friend, setFriend }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
};
