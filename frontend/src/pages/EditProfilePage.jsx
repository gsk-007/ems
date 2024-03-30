import NormalLayout from "../layouts/NormalLayout";
import { FaPenToSquare, FaTrash, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

const EditProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

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

  const samplePublication = [
    {
      title: "Sample Publication Title",
      authors: ["Author 1", "Author 2"],
      journal: "Sample Journal",
      year: "2024",
      url: "https://www.example.com/publication",
    },
  ];
  const user = { userInfo, qualifications, samplePublication };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <NormalLayout>
      <div>
        <form className="w-50 mx-auto" onSubmit={handleFormSubmit}>
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
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input type="text" className="form-control" placeholder="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="qulaification" className="form-label">
              Qualifications
            </label>
            <div className="d-flex ">
              {user.qualifications.map((item, idx) => (
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
            <div className="my-2 w-25 mx-auto">
              <button
                className="btn btn-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#qualificationModal"
              >
                <FaPlus /> Add
              </button>
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
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </NormalLayout>
  );
};

export default EditProfilePage;
