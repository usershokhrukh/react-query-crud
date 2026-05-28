import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const delReq = await axios.delete(`http://localhost:3001/todos/${id}`)
      return delReq
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']})
    }
  })
}