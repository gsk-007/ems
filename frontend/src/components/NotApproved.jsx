const NotApproved = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <h3 className="card-title">
            Welcome to IIT EMS! 🎉 We&apos;re thrilled to have you join our
            community.
          </h3>
          <p className="card-text">
            Your registration is currently pending approval from our admin team.
            We&apos;ll notify you as soon as your account has been approved. In
            the meantime, feel free to explore our website and get familiar with
            our features.
          </p>
          <p>
            If you have any questions or need assistance, don&apos;t hesitate to
            reach out to us at <b>[contact email/phone number]</b>. Thank you
            for your patience, and we look forward to having you onboard!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotApproved;
