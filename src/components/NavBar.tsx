import { Link } from "react-router-dom"



export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </nav>
  )
}