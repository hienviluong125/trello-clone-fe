import type { AxiosResponse } from "axios"
import type { Task } from "./taskService"
import axios from "../common/axiosInstance"

export type Board = {
  id: number
  name: string
}

export type BoardWithPaging = {
  data: Board[]
  filter: any
  paging: {
    page: number
    limit: number
    total: number
  }
}

export const fetchBoards = (): Promise<AxiosResponse<BoardWithPaging>> => {
  return axios.request({
    method: "GET",
    url: "/boards/"
  })
}
