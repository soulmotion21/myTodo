export default function UserList({
                                   elementId,
                                   users,
                                   selectUser,
                                   isFetchingUsers,
                                 }) {
  this.$target = document.querySelector(`#${elementId}`)
  this.users = users
  this.isFetchingUsers = isFetchingUsers

  this.setState = (newUsers, isFetchingUsers) => {
    this.users = newUsers
    this.isFetchingUsers = isFetchingUsers
    this.render()
  }

  this.render = () => {
    if (this.isFetchingUsers) {
      const $loading = document.createElement('div')
      $loading.innerHTML = 'loading...'

      this.$target.innerHTML = ''
      this.$target.appendChild($loading)

      return
    }

    const $userList = document.createElement('ul')
    $userList.addEventListener('click', (event) => {
      if (!event.target || event.target.tagName !== 'LI') {
        return
      }

      const user = event.target.dataset.user
      selectUser(user)
    })

    for (const user of this.users) {
      const $userItem = document.createElement('li')
      $userItem.className = 'user-item'
      $userItem.setAttribute('data-user', user)
      $userItem.innerHTML = user
      $userList.appendChild($userItem)
    }

    this.$target.innerHTML = ''
    this.$target.appendChild($userList)
  }

  this.render()
}
