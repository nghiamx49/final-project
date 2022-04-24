import {
  Container,
  Grid,
  Avatar,
  Button,
  Text,
  Modal,
  Checkbox,
  Row,
  Input,
  Spacer,
  Divider,
} from "@nextui-org/react";
import { FC, MouseEventHandler, useState } from "react";
import {
  FaEdit,
  FaUserCheck,
  FaUserPlus,
  FaUserTimes,
  FaFacebookMessenger,
  FaFileUpload,
  FaCamera
} from "react-icons/fa/";
import Image from "next/image";
import { IUser } from "../../store/interface/user.interface";
import ActiveProfileTab from "./ActiveProfileTab";
import styles from "../../styles/UserProfile.module.css";
import { FriendStatus } from "../../store/interface/friendStatus.interface";
import { CheckingStatus } from "../../type/CheckingStatus.interface";
import { uploader } from "../../axiosClient/cloudinary.api";
import { IApiResponse } from "../../type/apiResponse.interface";
import { updateProfile } from "../../axiosClient/profile.api";
import Link from "next/link";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from 'dayjs';
import { toast } from "react-toastify";

interface UserProfileProps {
  isYou: boolean;
  profile: IUser;
  friendStatus?: CheckingStatus;
  handleAddFriend: MouseEventHandler;
  userId?: string;
  handleAccept: MouseEventHandler;
  handleDecline: MouseEventHandler;
  user: IUser;
  token: string;
  updateGlobalState: Function;
  handleUnfriend: MouseEventHandler;
  handleCancel: MouseEventHandler;
  setProfile: Function
}

const validationSchema = yup.object().shape({
  fullname: yup.string().required("Fullname cannot empty"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is required")
    .min(new Date(1950, 0, 1))
    .max(new Date(2004, 0, 1)),
});

interface IUpdateUser {
  username?: string;
  fullname: string;
  dateOfBirth: string;
  email: string;
  address?: string;
}

const UserProfileHeader: FC<UserProfileProps> = ({
  isYou,
  profile,
  friendStatus,
  handleAddFriend,
  userId,
  handleAccept,
  handleDecline,
  user,
  token,
  updateGlobalState,
  handleCancel,
  handleUnfriend,
  setProfile
}) => {
  const [editAvatarOpen, setEditAvatarOpen] = useState<boolean>(false);
  const [editCoverOpen, setEditCoverOpen] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | string>("");
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUser>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      fullname: user.fullname,
      dateOfBirth: dayjs(user.dateOfBirth).format("YYYY-MM-DD"),
      email: user.email,
      username: user.username,
    },
  });

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", "981384291441175");
    formData.append("upload_preset", "kck9kpuk");
    const response: IApiResponse = await uploader(formData);
    if (response.status === 200) {
      const { status } = await updateProfile(token, {
        avatar: response.data.url,
      });
      if (status === 200) {
        updateGlobalState({ avatar: response.data.url });
        setFile("");
        setPreviewAvatar("");
        setEditAvatarOpen(false);
      }
    }
  };

  const handleSaveProfile = async (formData: IUpdateUser) => {
     const { status } = await updateProfile(token, {
       ...formData     });
     if (status === 200) {
       updateGlobalState({
         ...formData,
         dateOfBirth: new Date(formData.dateOfBirth),
       });
       toast.success("Profile Updated")
       setEditProfileOpen(false);
     }
  }

  const handleSaveCover = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", "981384291441175");
    formData.append("upload_preset", "kck9kpuk");
    const response: IApiResponse = await uploader(formData);
    if (response.status === 200) {
      const { status } = await updateProfile(token, {
        cover: response.data.url,
      });
      if (status === 200) {
        updateGlobalState({ cover: response.data.url });
        setFile("");
        setPreviewAvatar("");
        setEditCoverOpen(false);
      }
    }
  };

  const handleConfirmToggle = (): void => {
    setConfirmModalOpen(prevState => !prevState);
  }

  const handleEditProfileOpen = () => setEditProfileOpen(true);
  const handleEditProfileClose = () => setEditProfileOpen(false);


  const onConfirm = (): void => {
    setConfirmModalOpen(false);
    setEditAvatarOpen(false);
    setEditCoverOpen(false);
    setEditProfileOpen(false);
    setPreviewAvatar("");
    setFile("");
  }
 
  const handleAvatarEditOpen = (): void => setEditAvatarOpen(true);

  const handleAvatarEditClose = (): void => {
    if(previewAvatar.length > 0) {
      handleConfirmToggle();
    }
    else {
      setEditAvatarOpen(false);
    }
  }
  const handleCoverEditClose = (): void => {
    if(previewAvatar.length > 0) {
      handleConfirmToggle();
    }
    else {
      setEditCoverOpen(false);
    }
  };

  const handleUpload = (e: any): void => {
    const file = e.target.files[0];
    const objUrl = URL.createObjectURL(file);
    setFile(file);
    setPreviewAvatar(objUrl);
  };

  return (
    <Container fluid xl css={{ position: "relative" }}>
      <Modal
        closeButton
        animated={false}
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <Modal.Body
          css={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text>Your change will not be saved</Text>
        </Modal.Body>
        <>
          <Modal.Footer>
            <Button
              auto
              flat
              color="error"
              onClick={() => setConfirmModalOpen(false)}
            >
              Close
            </Button>
            <Button auto onClick={onConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </>
      </Modal>
      <Modal
        closeButton
        animated={false}
        open={editAvatarOpen}
        onClose={handleAvatarEditClose}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Upload Avatar
          </Text>
        </Modal.Header>
        <Modal.Body
          css={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          {previewAvatar.length > 0 ? (
            <Avatar src={previewAvatar} css={{ size: "$60" }} />
          ) : (
            <>
              <input
                type="file"
                id="avatar"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
              <label
                htmlFor="avatar"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <FaFileUpload size={30} /> Upload Image
              </label>
            </>
          )}
        </Modal.Body>
        {previewAvatar.length > 0 && (
          <>
            <Modal.Footer>
              <Button auto flat color="error" onClick={handleAvatarEditClose}>
                Close
              </Button>
              <Button auto onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Modal
        closeButton
        animated={false}
        open={editCoverOpen}
        width="1268px"
        onClose={handleCoverEditClose}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Upload Cover
          </Text>
        </Modal.Header>
        <Modal.Body
          css={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          {previewAvatar.length > 0 ? (
            <Image
              src={previewAvatar}
              width={1200}
              height={500}
              objectFit="cover"
              className={styles.image}
            />
          ) : (
            <>
              <input
                type="file"
                id="avatar"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
              <label
                htmlFor="avatar"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <FaFileUpload size={30} /> Upload Image
              </label>
            </>
          )}
        </Modal.Body>
        {previewAvatar.length > 0 && (
          <>
            <Modal.Footer>
              <Button auto flat color="error" onClick={handleCoverEditClose}>
                Close
              </Button>
              <Button auto onClick={handleSaveCover}>
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Grid.Container direction="column" alignItems="center">
        <Grid css={{ positon: "relative", overflow: "auto" }}>
          <div style={{ borderRadius: 0 }}>
            <Image
              src={
                (isYou ? user?.cover : profile?.cover) ||
                "/images/default_cover.jpg"
              }
              width={1200}
              height={500}
              objectFit="cover"
              className={styles.image}
            />
          </div>
          {isYou && (
            <Button
              css={{
                position: "absolute",
                right: 100,
                bottom: "200px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                color: "#000",
              }}
              onClick={() => setEditCoverOpen(true)}
            >
              <FaCamera size={20} />
              <Spacer x={0.5} />{" "}
              <Text color="black" weight="medium">
                Edit Cover
              </Text>
            </Button>
          )}
        </Grid>
        <Grid>
          <Grid.Container
            justify="space-between"
            alignItems="flex-end"
            css={{ width: 1100, marginTop: "-40px" }}
          >
            <Grid css={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
              <div style={{ position: "relative" }}>
                <Avatar
                  src={
                    (isYou ? user?.avatar : profile?.avatar) ||
                    "/images/default_avt.jpg"
                  }
                  bordered
                  zoomed
                  size="xl"
                  color="gradient"
                  css={{ size: "$40", borderWidth: "5px" }}
                />
                {isYou && (
                  <div
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      zIndex: 100,
                      backgroundColor: "#444",
                      width: 30,
                      height: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100%",
                      cursor: "pointer",
                    }}
                    onClick={handleAvatarEditOpen}
                  >
                    <FaEdit size={20} style={{ color: "#fff" }} />
                  </div>
                )}
              </div>
              <div className={styles.infoContainer}>
                <Text h2>{isYou ? user.fullname : profile?.fullname}</Text>
                <Text b>{profile?.allFriends?.length || 0} friends</Text>
                <Avatar.Group
                  count={
                    (profile.allFriends?.slice(5, profile.allFriends?.length))
                      .length || undefined
                  }
                >
                  {profile?.allFriends?.slice(0, 5).map((friend, index) => (
                    <Link
                      key={index}
                      href={`/profile/${friend?.username || friend._id}`}
                    >
                      <Avatar
                        src={friend?.avatar || "/images/default_avt.jpg"}
                        pointer
                        bordered
                        color="gradient"
                      />
                    </Link>
                  ))}
                </Avatar.Group>
              </div>
            </Grid>
            <Grid css={{ display: "flex", alignItems: "flex-end" }}>
              {isYou ? (
                <>
                  <Modal
                    closeButton
                    width="600px"
                    blur
                    open={editProfileOpen}
                    onClose={handleEditProfileClose}
                  >
                    <Modal.Header>
                      <Text h3>Edit Your Profile</Text>
                    </Modal.Header>
                    <Divider />
                    <Modal.Body>
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="500px"
                            aria-labelledby="email"
                            placeholder="username"
                            {...register("email")}
                            disabled
                            bordered
                          />
                        </Grid>
                        <Grid>
                          <ErrorMessage
                            name="email"
                            errors={errors}
                            render={({ message }) => (
                              <Text color="red">{message}</Text>
                            )}
                          />
                        </Grid>
                      </Grid.Container>
                      <Spacer y={1} />
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="500px"
                            aria-labelledby="username"
                            placeholder="username (custom profile link)"
                            {...register("username")}
                            clearable
                            bordered
                          />
                        </Grid>
                        <Grid>
                          <ErrorMessage
                            name="username"
                            errors={errors}
                            render={({ message }) => (
                              <Text color="red">{message}</Text>
                            )}
                          />
                        </Grid>
                      </Grid.Container>
                      <Spacer y={1} />
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="500px"
                            type="date"
                            aria-labelledby="date of birth"
                            placeholder="date of bith"
                            {...register("dateOfBirth", { valueAsDate: true })}
                            bordered
                          />
                        </Grid>
                        <Grid>
                          <ErrorMessage
                            name="dateOfBirth"
                            errors={errors}
                            render={({ message }) => (
                              <Text color="red">{message}</Text>
                            )}
                          />
                        </Grid>
                      </Grid.Container>
                      <Spacer y={1} />
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="500px"
                            aria-labelledby="fullname"
                            placeholder="fullname"
                            {...register("fullname")}
                            clearable
                            bordered
                          />
                        </Grid>
                        <Grid>
                          <ErrorMessage
                            name="fullname"
                            errors={errors}
                            render={({ message }) => (
                              <Text color="red">{message}</Text>
                            )}
                          />
                        </Grid>
                      </Grid.Container>
                      <Spacer y={1} />
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="500px"
                            aria-labelledby="address"
                            placeholder="address"
                            {...register("address")}
                            clearable
                            bordered
                          />
                        </Grid>
                        <Grid>
                          <ErrorMessage
                            name="address"
                            errors={errors}
                            render={({ message }) => (
                              <Text color="red">{message}</Text>
                            )}
                          />
                        </Grid>
                      </Grid.Container>
                      <Spacer y={1} />
                    </Modal.Body>
                    <Divider />
                    <Modal.Footer>
                      <Button
                        auto
                        flat
                        color="error"
                        onClick={handleEditProfileClose}
                      >
                        Close
                      </Button>
                      <Button auto onClick={handleSubmit(handleSaveProfile)}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Button onClick={handleEditProfileOpen} size="sm">
                    <FaEdit size={20} />
                    Edit Profile
                  </Button>
                </>
              ) : friendStatus?.status === FriendStatus.NOT_SENT ? (
                <Button size="sm" onClick={handleAddFriend}>
                  <FaUserPlus size={20} />
                  Add Friend
                </Button>
              ) : friendStatus?.status === FriendStatus.PENDING ? (
                userId === friendStatus?.senderId ? (
                  <Button
                    size="sm"
                    css={{ backgroundColor: "$gray500" }}
                    onClick={handleCancel}
                  >
                    <FaUserTimes size={20} />
                    Requested
                  </Button>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button size="sm" onClick={handleAccept}>
                      <FaUserCheck size={20} />
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      css={{ backgroundColor: "$gray500" }}
                      onClick={handleDecline}
                    >
                      <FaUserTimes size={20} />
                      Decline
                    </Button>
                  </div>
                )
              ) : friendStatus?.status === FriendStatus.ACCEPTED ? (
                <div style={{ display: "flex", gap: 10 }}>
                  <Button
                    onClick={handleUnfriend}
                    size="sm"
                    css={{ backgroundColor: "$gray500" }}
                  >
                    <FaUserCheck size={20} />
                    Unfriend
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={handleAddFriend}>
                  <FaUserPlus size={20} />
                  Add Friend
                </Button>
              )}
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid
          css={{
            alignSelf: "flex-start",
            marginLeft: "40px",
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
          }}
        >
          <ActiveProfileTab>Home</ActiveProfileTab>
          <Button light>Friends</Button>
          <Button light>Friends</Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default UserProfileHeader;
