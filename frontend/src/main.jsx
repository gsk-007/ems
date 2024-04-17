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

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import store from "./store.js";
import LoginPage from "./pages/LoginPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage.jsx";
import AttendencePage from "./pages/AttendencePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateUserPage from "./pages/CreateUserPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import EditPasswordPage from "./pages/EditPasswordPage.jsx";
import ManageUsersPage from "./pages/ManageUsersPage.jsx";
import UserRegisterPage from "./pages/UserRegistrationPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="profile/editpassword" element={<EditPasswordPage />} />
        <Route path="home/attendence" element={<AttendencePage />} />
        <Route path="home/create-user" element={<CreateUserPage />} />
        <Route path="home/manage-user" element={<ManageUsersPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
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
