import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useEditTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const req = await axios.put(`http://localhost:3001/todos/${payload.id}`, payload)
      return req
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })
}