import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import EditPassword from "./components/EditPassword.jsx";
import UserRegisterPage from "./pages/UserRegistrationPage.jsx";
import NewUserScreen from "./pages/admin/NewUserScreen.jsx";
import LeaveApplyPage from "./pages/user/LeaveApplyPage.jsx";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// React Date Picker Styles
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import LeaveStatusPage from "./pages/user/LeaveStatusPage.jsx";
import UserHomePage from "./pages/user/UserHomePage.jsx";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import EditProfilePage from "./pages/user/EditProfilePage.jsx";
import AttendencePage from "./pages/user/AttendencePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/admin" element={<PrivateRoute role="ADMIN" />}>
        <Route path="home" element={<AdminHomePage />} />
        <Route path="new-user" element={<NewUserScreen />} />
      </Route>
      <Route path="/user" element={<PrivateRoute role="USER" />}>
        <Route path="home" element={<UserHomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="attendence" element={<AttendencePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="profile/editpassword" element={<EditPassword />} />
        <Route path="leave/apply" element={<LeaveApplyPage />} />
        <Route path="leave/status" element={<LeaveStatusPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<UserRegisterPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
