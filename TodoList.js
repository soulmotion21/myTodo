export default function TodoList({
                                   elementId,
                                   todos,
                                   removeTodo,
                                   toggleTodo,
                                   isFetchingTodos,
                                 }) {
  this.$target = document.querySelector(`#${elementId}`)
  this.todos = todos
  this.isFetchingTodos = isFetchingTodos

  this.setState = (newTodos, isFetchingTodos) => {
    this.todos = newTodos
    this.isFetchingTodos = isFetchingTodos
    this.render()
  }

  this.render = () => {
    if (this.isFetchingTodos) {
      const $loading = document.createElement('div')
      $loading.innerHTML = 'loading...'

      this.$target.innerHTML = ''
      this.$target.appendChild($loading)

      return
    }

    const $todoList = document.createElement('ul')
    $todoList.addEventListener('click', (event) => {
      if (!event.target) {
        return
      }

      const className = event.target.className
      const todoId = event.target.dataset.todoId

      switch (className) {
        case 'remove-button': {
          removeTodo(todoId)
          break
        }

        case 'todo-checkbox':
        case 'todo-content': {
          toggleTodo(todoId)
          break
        }
      }
    })

    for (const { _id, content, isCompleted } of this.todos) {
      const $todoItem = document.createElement('li')
      $todoItem.className = 'todo-item'
      $todoItem.setAttribute('data-todo-id', _id)

      const $todoCheckbox = document.createElement('input')
      $todoCheckbox.className = 'todo-checkbox'
      $todoCheckbox.setAttribute('type', 'checkbox')
      $todoCheckbox.setAttribute('data-todo-id', _id)
      $todoCheckbox.checked = isCompleted
      $todoItem.appendChild($todoCheckbox)

      const tag = isCompleted ? 'del' : 'span'
      const $todoContent = document.createElement(tag)
      $todoContent.className = 'todo-content'
      $todoContent.innerHTML = content
      $todoContent.setAttribute('data-todo-id', _id)
      $todoItem.appendChild($todoContent)

      const $removeButton = document.createElement('button')
      $removeButton.className = 'remove-button'
      $removeButton.setAttribute('data-todo-id', _id)
      $removeButton.innerHTML = 'remove'
      $todoItem.appendChild($removeButton)

      $todoList.appendChild($todoItem)
    }

    this.$target.innerHTML = ''
    this.$target.appendChild($todoList)
  }

  this.render()
}
