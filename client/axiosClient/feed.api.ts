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

export const getSinglPost = async (
  token: string,
  postId: string | string[] | undefined,
): Promise<IApiResponse> =>
  apiClient.get(`/feeds/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllPostsInNewFeed = async (
  token: string,
  page: number
): Promise<IApiResponse> =>
  apiClient.get(`/feeds/?page=${page}`, {
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

export const removeReaction = async (
  token: string,
  postId: string,
  reactionId: string
): Promise<IApiResponse> =>
  await apiClient.delete(
    `/feeds/posts/${postId}/reaction/${reactionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
