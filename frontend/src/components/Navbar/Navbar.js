import React from "react";

const Navbar = () => {
  return <div>Navbar</div>;
};

const Navigation = () => {
  return (
    <div>
      {/* <Nav style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Nav.Item>
          <Nav.Link href="/register"> Register</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login"> Login</Nav.Link>
        </Nav.Item>
      </Nav> */}
    </div>
  );
};

const DashboardNavigation = () => {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link to="/dashboard"> Dashboard </Link>
      <Link to="/login" onClick={Logout}>
        Logout
      </Link>
    </div>
  );
};

export default Navbar;
