import { client } from '@/utils/fetchClient'

export const createUser = async (email, name) => {
  const user = await client.post('/users', { email, name })

  return user.data
}

export const getUserById = async (email) => {
  const user = await client.get(`/users?email=${email}`)

  return user.data
}


export const getUsers = () => {
  return client.get(`/users`);
};
