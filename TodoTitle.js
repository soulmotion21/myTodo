export default function TodoTitle({ elementId, user }) {
  this.$target = document.querySelector(`#${elementId}`)
  this.user = user

  this.setState = (newUser) => {
    this.user = newUser
    this.render()
  }

  this.render = () => {
    const $user = document.createElement('h3')
    $user.innerHTML = this.user

    this.$target.innerHTML = ''
    this.$target.appendChild($user)
  }

  this.render()
}
