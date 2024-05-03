import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({role}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(role.includes(userInfo.role))
    if(!role.includes(userInfo.role)){
      navigate(`/user/home`);
    }
  },[])

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
