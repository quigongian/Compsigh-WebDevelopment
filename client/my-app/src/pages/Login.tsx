
import { CenterFocusStrong } from "@mui/icons-material";
import { useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
// import  NewSignIn from "../image_content/newSignIn.png";
// sign in
import  SignOut from "../image_content/signOut.png";
import "./Login.css";


export const Login = () => {

  const [display, setDisplay] = useState("signIn");

  return (
    <>
      <Header />
      {display === "signIn" && (

        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}} >
          <section className="section">
            <h1>Welcome Back!</h1>
            <form action="">
          
              <div>
                <input className="input" type="email" name="email" placeholder="E-Mail *" required id="email"/>
              </div>

              <div>
                <input className="input" type="password" name="password" placeholder="Password *" required id="password"/>
              </div>
            
              <span>
              
                <div>
                <input type="checkbox" name="rememberMe" id="rememberMe"/>
                <label htmlFor="rememberMe">Remember me</label>
                </div>

                <button className="forgot" onClick={() => setDisplay("forgotPassword")}>Forgot password?</button>
                
              </span>

              <div style={{marginTop: "57px"}}>
                <button className="signIn">Sign in</button>
              </div>

              <button className="account" onClick={() => setDisplay("signUp")}>Don't have an account? Sign Up</button>

            </form>
          </section>

          <section style={{height: "740px"}}>
            <img src={SignOut} alt=""/>
          </section>

        </section>
      )}

      {display === "signUp" && (

        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <section className="section" id="section2">
          <h1 id="welcome">Welcome!</h1>
          <form action="">

            <input className="input" id="input" type="text" name="firstname" placeholder="First Name *" required />
            <br />
            <input className="input" id="input" type="text" name="lastname" placeholder="Last Name *" required />
            <br />
            <input className="input" id="input" type="email" name="email" placeholder="E-Mail *" required />
            <br />
            <input className="input" id="input" type="password" name="password" placeholder="Password *" required />
            <br />

            <select className="dropDown" name="experienceLevel" id="expLevel">
              <option value="">Experience Level</option>
              <option value="">Beginner</option>
              <option value="">Intermediate</option>
              <option value="">Advanced</option>
            </select>
            <br />

            {/* how do i make this required and have a placeholde */}
            {/* how do i change the padding on the arrow */}
            <select className="dropDown" name="careerPath" id="careerPath">
              <option value="careerPath">Select a Career Path</option>
              <option value="cs">Computer Science</option>
              <option value="ch">Computer Hardware</option>
              <option value="cyber">Cyber Security</option>
              <option value="webDev">Web Development</option>
              <option value="it">Information Technology</option>
              <option value="swe">Software Developer</option>
              <option value="uiux">UI/UX Design</option>
            </select>
            <br />

            <button className="signIn">Sign Up</button>
            <br />

            <button className="account"onClick={() => setDisplay("signIn")}>Already have an account? Sign in</button>
            
          </form>
        </section>

        <section style={{height:"740px"}}>
          <img src={SignOut} alt=""/>
        </section>

      </section>
      )}

      {display === "forgotPassword" && (
        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <section style={{ marginLeft: "100px" }}>
          <h2>Reset Your Password</h2>

          <p>Enter you Compsigh email and we'll send you a link to reset your password.</p>

          <form action="">
            <input type="email" name="resetpassword" placeholder="E-Mail" required />
            <br />

            <button>Reset Password</button>
            <button onClick={() => setDisplay("signIn")}>Cancel</button>

          </form>
        </section>

        <section style={{height:"700px"}}>
           <img src={SignOut} alt=""/>
        </section>

        </section>
      )}

      <Footer />
    </>
  );
};



