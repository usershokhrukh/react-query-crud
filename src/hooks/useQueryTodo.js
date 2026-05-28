import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export const useGetTodo = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/todos");
      return res
    }
  })
}