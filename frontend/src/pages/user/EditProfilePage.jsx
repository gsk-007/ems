import { useEffect, useState } from "react";
import NormalLayout from "../../layouts/NormalLayout";
import { FaPenToSquare, FaTrash, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    about: "",
    qualifications: [
      {
        degree: "",
        fieldOfStudy: "",
        university: "",
        graduationYear: 2022,
      },
    ],
    publications: [
      {
        title: "",
        journal: "",
        year: "",
        url: "",
      },
    ],
  });
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  useEffect(() => {
    setUserData({ ...userInfo, qualifications, publications });
  }, []);
  const qualifications = [
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

  const publications = [
    {
      title: "Sample Publication Title",
      journal: "Sample Journal",
      year: "2024",
      url: "https://www.example.com/publication",
    },
  ];

  const handleSavePublication = () => {
    console.log("save Publication");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <NormalLayout>
      <div>
        <form className="w-50 mx-auto py-5" onSubmit={handleFormSubmit}>
          <div className="row">
            {/* Name */}
            <div className=" col-6 mb-3">
              <label htmlFor="name" className="form-label">
                name
              </label>
              <input
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
            <div className="d-flex ">
              {userData.qualifications.map((item, idx) => (
                <div key={idx} className="card mx-1">
                  <div className="card-body">
                    {item.degree} ({item.graduationYear})
                    <div className="d-flex w-10 justify-content-between align-items-center">
                      <div className="bg-success-subtle p-1 rounded">
                        <FaPenToSquare />
                      </div>
                      <div className="bg-danger-subtle p-1 rounded">
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
              id="qualificationModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Modal title
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
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fieldOfStudy" className="form-label">
                        Field of Study
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="university" className="form-label">
                        University
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="graduationYear" className="form-label">
                        Graduation Year
                      </label>
                      <input type="number" className="form-control" />
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
                    <button type="button" className="btn btn-primary">
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
            <div className="d-flex ">
              {userData.publications.map((item, idx) => (
                <div key={idx} className="card mx-1">
                  <div className="card-body">
                    {item.title} ({item.year})
                    <div className="d-flex w-10 justify-content-between align-items-center">
                      <div className="bg-success-subtle p-1 rounded">
                        <FaPenToSquare />
                      </div>
                      <div className="bg-danger-subtle p-1 rounded">
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
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="journal" className="form-label">
                        Journal
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="year" className="form-label">
                        Year
                      </label>
                      <input type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="url" className="form-label">
                        Url
                      </label>
                      <input type="text" className="form-control" />
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
                      onClick={handleSavePublication}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
