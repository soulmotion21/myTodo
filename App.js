import * as api from './api.js'
import UserList from './UserList.js'
import TodoTitle from './TodoTitle.js'
import TodoList from './TodoList.js'
import TodoInput from './TodoInput.js'

export default function App() {
  this.state = {
    users: [],
    isFetchingUsers: false,
    selectedUser: '',
    todosOfSelectedUser: [],
    isFetchingTodos: false,
  }

  this.fetchUsers = async () => {
    this.setState({
      ...this.state,
      isFetchingUsers: true,
    })
    const users = await api.fetchUsers(1000)
    this.setState({
      ...this.state,
      isFetchingUsers: false,
      users,
    })
  }

  this.selectUser = async (user) => {
    this.fetchTodos(user)
  }

  this.fetchTodos = async (user) => {
    this.setState({
      ...this.state,
      isFetchingTodos: true,
    })
    const todos = await api.fetchTodos(user, 500)
    this.setState({
      ...this.state,
      selectedUser: user,
      todosOfSelectedUser: todos,
      isFetchingTodos: false,
    })
  }

  this.removeTodo = async (todoId) => {
    await api.removeTodo(this.state.selectedUser, todoId)
    this.fetchTodos(this.state.selectedUser)
  }

  this.toggleTodo = async (todoId) => {
    await api.toggleTodo(this.state.selectedUser, todoId)
    this.fetchTodos(this.state.selectedUser)
  }

  this.addTodo = async (todoText) => {
    await api.addTodo(this.state.selectedUser, todoText)
    this.fetchTodos(this.state.selectedUser)
  }

  this.removeAllTodos = async () => {
    await api.removeAllTodos(this.state.selectedUser)
    this.fetchTodos(this.state.selectedUser)
  }

  this.setState = (newState) => {
    this.state = newState
    this.render()
  }

  this.render = () => {
    this.userList.setState(this.state.users, this.state.isFetchingUsers)
    this.todoTitle.setState(this.state.selectedUser)
    this.todoList.setState(
      this.state.todosOfSelectedUser,
      this.state.isFetchingTodos
    )
    this.todoInput.setState(this.state.selectedUser)
  }

  try {
    this.userList = new UserList({
      elementId: 'user-list',
      users: this.state.users,
      selectUser: this.selectUser,
      isFetchingUsers: this.state.isFetchingUsers,
    })
    this.todoTitle = new TodoTitle({
      elementId: 'todo-title',
      user: this.state.selectedUser,
    })
    this.todoList = new TodoList({
      elementId: 'todo-list',
      todos: this.state.todosOfSelectedUser,
      removeTodo: this.removeTodo,
      toggleTodo: this.toggleTodo,
      isFetchingTodos: this.state.isFetchingTodos,
    })
    this.todoInput = new TodoInput({
      elementId: 'todo-input',
      addTodo: this.addTodo,
      removeAllTodos: this.removeAllTodos,
      selectedUser: this.state.selectedUser,
    })

    this.fetchUsers()
  } catch (error) {
    console.error(error)
  }
}
