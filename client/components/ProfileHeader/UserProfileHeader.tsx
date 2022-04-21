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
}) => {
  const [editAvatarOpen, setEditAvatarOpen] = useState<boolean>(false);
  const [editCoverOpen, setEditCoverOpen] = useState<boolean>(false);
  const [file, setFile] = useState<Blob | string>("");
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

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

  const onConfirm = (): void => {
    setConfirmModalOpen(false);
    setEditAvatarOpen(false);
    setEditCoverOpen(false);
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
    <Container fluid css={{ position: "relative" }}>
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
                <Text h2>{profile?.fullname}</Text>
                <Text b>{profile?.allFriends?.length || 0} friends</Text>
                <Avatar.Group
                  count={
                    (profile.allFriends?.slice(5, profile.allFriends?.length))
                      .length || undefined
                  }
                >
                  {profile?.allFriends?.slice(0, 5).map((friend) => (
                    <Link href={`/profile/${friend?.username || friend._id}`}>
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
                <Button size="sm">
                  <FaEdit size={20} />
                  Edit Profile
                </Button>
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
                    onClick={handleAddFriend}
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
                  <Button size="sm" css={{ backgroundColor: "$gray500" }}>
                    <FaUserCheck size={20} />
                    Friend
                  </Button>
                  <Button size="sm">
                    <FaFacebookMessenger size={20} />
                    Message
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
