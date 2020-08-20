export default function TodoInput({
                                    elementId,
                                    addTodo,
                                    selectedUser,
                                    removeAllTodos,
                                  }) {
  this.$target = document.querySelector(`#${elementId}`)
  this.selectedUser = selectedUser

  this.addTodo = () => {
    const inputValue = this.$todoInput.value.trim()
    if (!inputValue) {
      return
    }

    addTodo(inputValue)

    this.$todoInput.value = ''
    this.$todoInput.focus()
  }

  this.setState = (selectedUser) => {
    this.selectedUser = selectedUser
    this.render()
  }

  this.render = () => {
    if (!this.selectedUser) {
      return
    }

    this.$target.innerHTML = ''

    this.$todoInput = document.createElement('input')
    this.$todoInput.setAttribute('type', 'text')
    this.$todoInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.addTodo()
      }
    })
    this.$target.appendChild(this.$todoInput)

    this.$addTodoButton = document.createElement('button')
    this.$addTodoButton.innerHTML = '+'
    this.$addTodoButton.addEventListener('click', () => {
      this.addTodo()
    })
    this.$target.appendChild(this.$addTodoButton)

    this.$removeAllTodosButton = document.createElement('button')
    this.$removeAllTodosButton.innerHTML = 'Remove All'
    this.$removeAllTodosButton.addEventListener('click', (event) => {
      removeAllTodos()
    })
    this.$target.appendChild(this.$removeAllTodosButton)

    this.$todoInput.focus()
  }

  this.render()
}
