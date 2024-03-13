import { RESULTS_COUNT } from "@/constants/constants"
import { GetUsersResponse } from "./randomUserApi.types"

const BASE_URL = `https://randomuser.me/api/?results=${RESULTS_COUNT}&seed=custom_seed`

interface GetUsersParams {
  page?: number
  results?: number
}

export const getUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
  const url = new URL(BASE_URL)
  if (params.page) {
    url.searchParams.set('page', params.page.toString())
  }
  if (params.results) {
    url.searchParams.set('results', params.results.toString())
  }

  return fetch(url.toString()).then(res => res.json())
}