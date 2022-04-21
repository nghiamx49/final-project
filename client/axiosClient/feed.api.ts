import { apiClient } from ".";
import { ICreateFeed } from "../interface/feedItem.interface";
import { IApiResponse } from "../type/apiResponse.interface";


export const getUserPosts = async (
  token: string,
  userId: string
): Promise<IApiResponse> =>
  apiClient.get(`/feeds/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllPostsInNewFeed = async (
  token: string,
): Promise<IApiResponse> =>
  apiClient.get(`/feeds/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createdPost = async (token: string, data: ICreateFeed): Promise<IApiResponse> =>
  await apiClient.post(
    "/feeds/",
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const commentToPost = async (
  token: string,
  postId: string,
  content: string
): Promise<IApiResponse> =>
  await apiClient.post(
    `/feeds/posts/${postId}/comment`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const replyAComment = async (
  token: string,
  postId: string,
  commentId: string | undefined,
  content: string
): Promise<IApiResponse> =>
  await apiClient.post(
    `/feeds/posts/${postId}/${commentId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const reactToPost = async (
  token: string,
  postId: string,
  reactionType: string
): Promise<IApiResponse> =>
  await apiClient.post(
    `/feeds/posts/${postId}/reaction`,
    { reactionType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
