import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useAddTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const todoReq = await axios.post("http://localhost:3001/todos", payload)
      return todoReq
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })
}