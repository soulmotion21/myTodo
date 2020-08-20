export const fetchUsers = async (delay = 0) => {
  const response = await fetch(
    `https://todo-api.roto.codes/users?delay=${delay}`
  )
  return await response.json()
}

export const fetchTodos = async (username, delay = 0) => {
  const response = await fetch(
    `https://todo-api.roto.codes/${username}?delay=${delay}`
  )
  return await response.json()
}

export const removeTodo = async (username, todoId) => {
  await fetch(`https://todo-api.roto.codes/${username}/${todoId}`, {
    method: 'DELETE',
  })
}

export const toggleTodo = async (username, todoId) => {
  await fetch(`https://todo-api.roto.codes/${username}/${todoId}/toggle`, {
    method: 'PUT',
  })
}

export const addTodo = async (username, todoText) => {
  await fetch(`https://todo-api.roto.codes/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: todoText,
    }),
  })
}

export const removeAllTodos = async (username) => {
  await fetch(`https://todo-api.roto.codes/${username}/all`, {
    method: 'DELETE',
  })
}
