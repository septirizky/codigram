import logo from "../logo.svg";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdContactMail, MdOutlineContactMail } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlLogin, SlLogout } from "react-icons/sl";
import { BsPerson } from "react-icons/bs";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiAddBoxFill, RiAddBoxLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { RegisterUsers } from "../action/Actions";
import { useEffect } from "react";

export const Sidebar = () => {
  const pathname = useLocation();
  const navigate = useNavigate();

  const getDataSession = () => {
    const keyString = sessionStorage.getItem("userdata");
    return JSON.parse(keyString);
  };
  const data = getDataSession() ? getDataSession() : false;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container-fluid mb-0 position-relative min-vh-100">
      <div className="row">
        <div className="col-sm-2 border min-vh-100">
          <div className="my-3 mx-1 align-items-center justify-content-center d-flex">
            <img src={logo} className="w-50 h-auto" />
          </div>
          <div>
            <Link to="home">
              <button className={`w-100 btn btn-light p-2 mb-1`}>
                <div className="row w-100">
                  <div className="col-sm-2 m-0 p-0">
                    {pathname.pathname === "home" ||
                    pathname.pathname.toString().split("home")[1] ===
                      "posting" ? (
                      <AiFillHome size={30} className="ms-3" />
                    ) : (
                      <AiOutlineHome size={30} className="ms-3" />
                    )}
                  </div>
                  <div
                    className={`col-sm-10 text-start fs-5 ${
                      pathname.pathname === "/" ||
                      pathname.pathname.toString().split("/")[1] === "posting"
                        ? "fw-bold"
                        : ""
                    }`}
                  >
                    Home
                  </div>
                </div>
              </button>
            </Link>
            <Link to="AddPosting">
              <button className="w-100 btn btn-light p-2 mb-1">
                <div className="row w-100">
                  <div className="col-sm-2 m-0 p-0">
                    {pathname.pathname === "AddPosting" ? (
                      <RiAddBoxFill size={30} className="ms-3" />
                    ) : (
                      <RiAddBoxLine size={30} className="ms-3 fw-bold" />
                    )}
                  </div>
                  <div
                    className={`col-sm-10 text-start fs-5 ${
                      pathname.pathname === "AddPosting" ? "fw-bold" : ""
                    }`}
                  >
                    Posting
                  </div>
                </div>
              </button>
            </Link>
            <Link to="profile">
              <button className="w-100 btn btn-light p-2 mb-1">
                <div className="row w-100">
                  <div className="col-sm-2 m-0 p-0">
                    {pathname.pathname === "profile" ? (
                      <MdContactMail size={30} className="ms-3" />
                    ) : (
                      <MdOutlineContactMail size={30} className="ms-3" />
                    )}
                  </div>
                  <div
                    className={`col-sm-10 text-start fs-5 ${
                      pathname.pathname === "profile" ? "fw-bold" : ""
                    }`}
                  >
                    Profile
                  </div>
                </div>
              </button>
            </Link>
            {/* {data ? (
              <div className="dropdown">
                <button
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="w-100 btn btn-light p-2 mb-1"
                >
                  <div className="row w-100">
                    <div className="col-sm-2 m-0 p-0">
                      {pathname.pathname === "/profile" ? (
                        <img
                          src={
                            data
                              ? data.data.image
                              : "https://via.placeholder.com/100"
                          }
                          style={{ width: 30, height: 30 }}
                          className="rounded-circle ms-3 border border-2 border-black"
                          alt=""
                        />
                      ) : (
                        <img
                          src={
                            data
                              ? data.data.image
                              : "https://via.placeholder.com/100"
                          }
                          style={{ width: 30, height: 30 }}
                          className="rounded-circle ms-3"
                          alt=""
                        />
                      )}
                    </div>
                    <div
                      className={`col-sm-10 text-start fs-5 ${
                        pathname.pathname === "/profile" ? "fw-bold" : ""
                      }`}
                    >
                      {data ? data.data.username : "Name"}
                    </div>
                  </div>
                </button>
                <ul className="dropdown-menu shadow" style={{ width: "300px" }}>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <BsPerson /> Info Account
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                </ul>
              </div>
            ) : ( */}
            <Link to="logout">
              <button className="w-100 btn btn-light p-2 mb-1">
                <div className="row w-100">
                  <div className="col-sm-2 m-0 p-0">
                    <SlLogout size={30} className="ms-3 fw-bold" />
                  </div>
                  <div className={`col-sm-10 text-start fs-5`}>Logout</div>
                </div>
              </button>
            </Link>
            {/* )} */}
          </div>
        </div>
        <div className="col-sm-10 border overflow-auto vh-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
