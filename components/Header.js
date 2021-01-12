import Nav from './Nav'

const Header = () => {
  return (
    <div>
      <div class="bar">
        <a>Sick Fits</a>
        <Nav />
      </div>
      <div class="subbar">
        <p>Search</p>
      </div>
      <div>
        Cart
      </div>
    </div>
  )
}

export default Header
