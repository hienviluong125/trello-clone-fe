import type { AxiosResponse } from "axios"
import type { Task } from "./taskService"
import axios from "../common/axiosInstance"

export type List = {
  id: number
  name: string
  index: number
  tasks: Task[]
}

export type ListWithPaging = {
  data: List[]
  filter: any
  paging: {
    page: number
    limit: number
    total: number
  }
}

export const fetchListByBoardId = (boardId: number): Promise<AxiosResponse<ListWithPaging>> => {
  return axios.request({
    method: "GET",
    url: `/boards/${boardId}/lists`
  })
}

export const swapListOrder = (boardId: number, fromListId: number, fromListIndex: number, toListId: number, toListIndex: number): Promise<AxiosResponse> => {
  return axios.request({
    method: "POST",
    url: `/boards/${boardId}/lists/swap`,
    data: {
      fromListId,
      fromListIndex,
      toListId,
      toListIndex
    }
  })
}
