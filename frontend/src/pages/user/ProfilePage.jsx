import { useSelector } from "react-redux";
import NormalLayout from "../../layouts/NormalLayout";
import { Link } from "react-router-dom";

const ProfilePage = () => {
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
  return (
    <NormalLayout>
      <div className="w-100 border border-primary py-5">
        <div className="card mb-3 mx-auto" style={{ width: "70vw" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src="..." className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">User Details</h5>
                <div className="card-text">
                  <ul>
                    <li>Name: {userInfo.name}</li>
                    <li>Email: {userInfo.email}</li>
                    <li>Phone: {userInfo.phone}</li>
                  </ul>
                </div>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto" style={{ width: "80vw" }}>
          <div className="">
            <h2>About</h2>
            <p>{userInfo.about}</p>
          </div>
          <div className="">
            <h2>Qualifications</h2>
            <div>
              {qualifications &&
                qualifications.map((qualification, index) => (
                  <div key={index}>
                    <h4>{qualification.degree}</h4>
                    <p>
                      <strong>Field of Study:</strong>{" "}
                      {qualification.fieldOfStudy}
                    </p>
                    <p>
                      <strong>University:</strong> {qualification.university}
                    </p>
                    <p>
                      <strong>Graduation Year:</strong>{" "}
                      {qualification.graduationYear}
                    </p>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
          <div className="">
            <h2>Publications</h2>
            {samplePublication &&
              samplePublication.map((item, idx) => (
                <div key={idx}>
                  <h4>{item.title}</h4>
                  <p>
                    <strong>Journal:</strong> {item.journal}
                  </p>
                  <p>
                    <strong>Year:</strong> {item.year}
                  </p>
                  <p>
                    <strong>URL:</strong> <a href={item.url}>{item.url}</a>
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="edit">
            <button className="  btn btn-primary">Edit Details</button>
          </Link>
          <Link to="editpassword">
            <button className="ms-2  btn btn-primary">Change Password</button>
          </Link>
        </div>
      </div>
    </NormalLayout>
  );
};

export default ProfilePage;
