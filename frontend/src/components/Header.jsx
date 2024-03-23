import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
   const { userInfo } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [logoutApiCall] = useLogoutMutation();
   const logoutHandler = async () => {
     try {
       await logoutApiCall().unwrap();
       dispatch(logout());
       navigate("/");
     } catch (err) {
       console.log(err);
     }
   };
  return (
    <nav className="navbar bg-body-tertiary h-100">
      <div className="container-sm">
        <a className="navbar-brand">IIIT EMS</a>
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {userInfo.email}
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a onClick={logoutHandler} className="dropdown-item" >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
