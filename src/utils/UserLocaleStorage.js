
export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const logoutUSer = () => {
  localStorage.removeItem('user');
}

export const getUserId = () => {
  return getUser()?.id;
}

export const setPosts = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts))
}
