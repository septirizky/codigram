import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    username: "",
    password: "",
  });
  const createHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const auth2 = async (e) => {
    e.preventDefault();
    const result = await axios({
      method: "POST",
      url: "http://localhost:3000/user/login",
      data: item,
    });
    // console.log(result);
    if (result.data.token) {
      //sessionStorage.setItem('id', result.data.data.id);
      //sessionStorage.setItem('role', result.data.data.role);
      localStorage.setItem("token", result.data.token);
      // const af = jwtDecode(localStorage.getItem("token"));
      // console.log(af);
      Swal.fire(
        "Username dan Password Benar!",
        "Berhasil LoginUsers",
        "success"
      );
      navigate("/dashboard");
    } else {
      Swal.fire("Username Atau Password Eror!", result.data.status, "warning");
      //console.log('aaaa')
      //alert(result.data.status);
    }
  };

  return (
    <section class="hero is-success has-background-grey-light is-fullheight is-fullwidth">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-4-desktop">
              <form className="box" onSubmit={(e) => auth2(e)}>
                <div className="field mt-5">
                  <label className="label">Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      name="username"
                      placeholder="Username"
                      onChange={(e) => createHandler(e)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => createHandler(e)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-link is-fullwidth">Login</button>
                </div>
                <br></br>
                <center>
                  <p>
                    Anda Belum Mempunyai Akun? Registrasi Disini{" "}
                    <Link to={"register"} style={{ color: "blue" }}>
                      Register
                    </Link>{" "}
                  </p>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
