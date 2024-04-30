import { useEffect, useState } from "react";
import NormalLayout from "../../layouts/NormalLayout";
import { FaPenToSquare, FaTrash, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getYear } from "date-fns";
import { useUpdateUserMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { setCredentials } from "../../slices/authSlice";

const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    about: "",
    qualifications: [],
    publications: [],
  });

  const [qualification, setQualification] = useState({
    degree: "",
    fieldOfStudy: "",
    university: "",
    graduationYear: getYear(new Date()),
  });
  const [publication, setPublication] = useState({
    title: "",
    journal: "",
    year: getYear(new Date()),
    url: "",
  });

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setUserData({
      ...userInfo,
      qualifications: sampleQualifications,
      publications: samplePublications,
    });
  }, [userInfo]);

  const sampleQualifications = [
    {
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      university: "Example University",
      graduationYear: 2022,
    },
    {
      degree: "Master of Business Administration",
      field_of_study: "Finance",
      university: "Another University",
      graduationYear: 2024,
    },
  ];

  const samplePublications = [
    {
      title: "Sample Publication Title",
      journal: "Sample Journal",
      year: "2024",
      url: "https://www.example.com/publication",
    },
  ];

  const addQualification = () => {
    setUserData({
      ...userData,
      qualifications: [...userData.qualifications, qualification],
    });
    setQualification({
      degree: "",
      fieldOfStudy: "",
      university: "",
      graduationYear: getYear(new Date()),
    });
  };

  const handleQualificationChange = (e) => {
    setQualification({ ...qualification, [e.target.name]: e.target.value });
  };

  const deleteQualification = (idx) => {
    setUserData({
      ...userData,
      qualifications: userData.qualifications.filter((_, i) => i !== idx),
    });
  };

  const addPublication = () => {
    setUserData({
      ...userData,
      publications: [...userData.publications, publication],
    });
    setPublication({
      title: "",
      journal: "",
      year: getYear(new Date()),
      url: "",
    });
  };

  const handlePublicationChange = (e) => {
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };

  const deletePublication = (idx) => {
    setUserData({
      ...userData,
      publications: userData.publications.filter((_, i) => i !== idx),
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(userData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <NormalLayout>
      <div>
        <form
          className="mx-auto py-5"
          onSubmit={handleFormSubmit}
          style={{ width: "60vw" }}
        >
          <div className="row">
            {/* Name */}
            <div className=" col-6 mb-3">
              <label htmlFor="name" className="form-label">
                name
              </label>
              <input
                name="name"
                type="text"
                value={userData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="name"
              />
            </div>
            {/* Phone Number */}
            <div className="col-6 mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={userData.phone || ""}
                onChange={handleChange}
                className="form-control"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="name@example.com"
            />
          </div>

          {/* About */}
          <div className="mb-3">
            <label htmlFor="about" className="form-label">
              About
            </label>
            <textarea
              name="about"
              value={userData.about || ""}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="About"
            />
          </div>
          {/* Qualifications Section */}
          <div className="mb-3">
            <div className="my-2">
              <label htmlFor="qulaification" className="form-label">
                Qualifications
              </label>
              <button
                className="btn btn-success btn-sm ms-2"
                data-bs-toggle="modal"
                data-bs-target="#qualificationModal"
              >
                <FaPlus /> Add Qualification
              </button>
            </div>
            <div className="d-flex flex-wrap">
              {userData.qualifications.map((item, idx) => (
                <div
                  key={idx}
                  className="card m-1"
                  style={{ maxWidth: "20vw" }}
                >
                  <div className="card-body">
                    <div style={{ minHeight: "60px" }}>
                      {item.degree} ({item.graduationYear})
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <div
                        className="bg-success-subtle p-1 rounded btn"
                        onClick={() => setQualification(item)}
                      >
                        <FaPenToSquare />
                      </div> */}
                      <div
                        className="bg-danger-subtle p-1 rounded btn"
                        onClick={() => deleteQualification(idx)}
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <!-- Add Modal --> */}
            <div
              className="modal fade"
              id="qualificationModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add Qualification
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="degree" className="form-label">
                        Degree
                      </label>
                      <input
                        name="degree"
                        value={qualification.degree}
                        onChange={handleQualificationChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldOfStudy" className="form-label">
                        Field of Study
                      </label>
                      <input
                        name="fieldOfStudy"
                        value={qualification.fieldOfStudy}
                        onChange={handleQualificationChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="university" className="form-label">
                        University
                      </label>
                      <input
                        name="university"
                        value={qualification.university}
                        onChange={handleQualificationChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="graduationYear" className="form-label">
                        Graduation Year
                      </label>
                      <input
                        name="graduationYear"
                        value={qualification.graduationYear}
                        onChange={handleQualificationChange}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={addQualification}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Publications Section */}
          <div className="mb-3">
            <div className="my-2">
              <label htmlFor="publications" className="form-label">
                Publications
              </label>
              <button
                className="btn btn-success btn-sm ms-2"
                data-bs-toggle="modal"
                data-bs-target="#publicationModal"
              >
                <FaPlus /> Add Publication
              </button>
            </div>
            <div className="d-flex flex-wrap">
              {userData.publications.map((item, idx) => (
                <div
                  key={idx}
                  className="card m-1"
                  style={{ maxWidth: "20vw" }}
                >
                  <div className="card-body">
                    <div style={{ minHeight: "60px" }}>
                      {item.title} ({item.year})
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <div className="bg-success-subtle p-1 rounded btn">
                        <FaPenToSquare />
                      </div> */}
                      <div
                        className="bg-danger-subtle p-1 rounded btn"
                        onClick={() => deletePublication(idx)}
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="publicationModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add Publication Details
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        name="title"
                        value={publication.title || ""}
                        onChange={handlePublicationChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="journal" className="form-label">
                        Journal
                      </label>
                      <input
                        name="journal"
                        value={publication.journal || ""}
                        onChange={handlePublicationChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="year" className="form-label">
                        Year
                      </label>
                      <input
                        name="year"
                        value={publication.year || ""}
                        onChange={handlePublicationChange}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="url" className="form-label">
                        Url
                      </label>
                      <input
                        name="url"
                        value={publication.url || ""}
                        onChange={handlePublicationChange}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={addPublication}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoading && <Spinner />}
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </NormalLayout>
  );
};

export default EditProfilePage;
