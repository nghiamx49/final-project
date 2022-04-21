import axios from "axios";
import { IApiResponse } from "../type/apiResponse.interface";

export const uploader = async (formData: FormData): Promise<IApiResponse> =>
  await axios.post(`https://api.cloudinary.com/v1_1/dppdudwq2/image/upload`, formData);