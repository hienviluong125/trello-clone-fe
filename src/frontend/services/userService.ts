import type { AxiosResponse } from "axios"
import axios from "../common/axiosInstance"

export type User = {
  id: number
  name: string | null
  email: string
}

export const getProfileService = (): Promise<AxiosResponse> => {
  return axios.request({
    method: "GET",
    url: "/users/profile"
  })
}
