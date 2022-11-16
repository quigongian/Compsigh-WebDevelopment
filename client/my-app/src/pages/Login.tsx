
import { CenterFocusStrong } from "@mui/icons-material";
import { useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import SignIn from "../image_content/signIn.png";


export const Login = () => {

  const [display, setDisplay] = useState("signIn");

  return (
    <>
      <Header />
      {display === "signIn" && (
        <div style={{}}>
        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}} >
          <section style={{margin: "auto", textAlign: "center"}}>
            <h1 style={{fontSize: "50px"}}>Welcome Back!</h1>
            <form action="">
          
              <div>
                <input type="email" name="email" placeholder="E-Mail" required style={{fontSize: "18px", backgroundColor: "#D9D9D9", marginBottom: "15px", borderRadius: "8px", border: "none", padding: "2px 150px 2px 10px"}}/>
              </div>

              <div>
                <input type="password" name="password" placeholder="Password" required style={{fontSize: "18px", backgroundColor: "#D9D9D9", marginBottom: "15px", borderRadius: "8px", border: "none"}}/>
              </div>
            

              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
              <h2 onClick={() => setDisplay("forgotPassword")} style={{fontSize: "16px"}}>Forgot password?</h2>

              <div>
                <button>Sign in</button>
              </div>

              <div>
                <h4 onClick={() => setDisplay("signUp")} style={{ textDecoration: "underline" }}>
                  Don't have an account? Sign Up
                </h4>
              </div>
            </form>
          </section>
          <section style={{height:"920px"}}>
            <img src={SignIn} alt="" style= {{width: "600px", height: "920px"}} />
          </section>
        </section>
        </div>
      )}
      {display === "signUp" && (
        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <section style={{ marginLeft: "100px" }}>
          <h1 style={{}}>Welcome!</h1>
          <form action="">
            <input type="text" name="firstname" placeholder="First Name" required />
            <br />
            <input type="text" name="lastname" placeholder="Last Name" required />
            <br />
            <input type="email" name="email" placeholder="E-Mail" required />
            <br />
            <input type="password" name="password" placeholder="Password" required />
            <br />

            <select name="experiencelevel" id="explevel">
              <option value="">Experience Level</option>
              <option value="">Beginner</option>
              <option value="">Intermediate</option>
              <option value="">Advanced</option>
            </select>
            <br />

            {/* how do i make this required and have a placeholde */}
            <select name="careerpath" id="careerpath">
              <option value="careerpath">Select a Career Path</option>
              <option value="cs">Computer Science</option>
              <option value="ch">Computer Hardware</option>
              <option value="cyber">Cyber Security</option>
              <option value="webdev">Web Development</option>
              <option value="it">Information Technology</option>
              <option value="swe">Software Developer</option>
              <option value="uiux">UI/UX Design</option>
            </select>
            <br />

            <input type="checkbox" id="t&c" name="terms&conditions" />
            <label htmlFor="t&c" id="t&c">
              I read and agree to the{" "}
              {/* <h4 > 
                Terms & Conditions
              </h4>
                <a href="terms&conditions.html">Terms & Conditions</a> change */}
            </label>
            <br />

            <button>Sign Up</button>
            <br />
            <h4 onClick={() => setDisplay("signIn")} style={{ textDecoration: "underline" }}>
              Already have an account? Sign in
            </h4>
          </form>
        </section>
        <section style={{height:"920px"}}>
        <img src={SignIn} alt="" style= {{width: "600px", height: "920px"}}/>
      </section>
      </section>
      )}

      {/* make this a pop up screen with an 'x' to close it  */}
      {display === "forgotPassword" && (
        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <section style={{ marginLeft: "100px" }}>
          <h2>Reset Your Password</h2>
          {/* how do i add closeput 'x' */}

          <p>Enter you Compsigh email and we'll send you a link to reset your password.</p>
          <form action="">
            <input type="email" name="resetpassword" placeholder="E-Mail" required />
            <br />

            <button>Reset Password</button>
            {/* how do i make this close the popup */}
            <button onClick={() => setDisplay("signIn")}>Cancel</button>
          </form>
        </section>
        <section style={{height:"920px"}}>
           <img src={SignIn} alt="" style= {{width: "600px", height: "920px"}}/>
        </section>
        </section>
      )}
      <div>{/* Graphics content for the page */}</div>
      <Footer />
    </>
  );
};



