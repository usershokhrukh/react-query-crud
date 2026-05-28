import { useQueries, useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetOneTodo = (id) => {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: async ({queryKey}) => {
      const todoId = (Number(queryKey[1]) || queryKey[1]);

      const req = await axios.get(`http://localhost:3001/todos/${todoId}`)
      return req
    }
  })
}