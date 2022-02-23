import type { User } from "./userService"
import type { AxiosResponse } from "axios"
import axios from "../common/axiosInstance"

export type Task = {
  id: number
  index: number
  title: string
  body: string | null
  assignee: User | null
  reportedBy: User | null
}

export const swapTaskOrder = (fromTaskId: number, toTaskId: number): Promise<AxiosResponse> => {
  console.log({fromTaskId, toTaskId})
  return axios.request({
    method: "POST",
    url: `/tasks/swap`,
    data: {
      fromTaskId,
      toTaskId,
    }
  })
}
