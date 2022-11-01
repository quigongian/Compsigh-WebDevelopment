import { useRef, useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import SignIn from "../image_content/signIn.png"

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const switchLogin = () => {
    setIsLogin((prevState) => !prevState);
  };

  const showDialog = () => {dialogRef.current?.showModal()}

  return (
    <>
    <Header />
      {isLogin ? (
        <section style={{display:"flex", flexDirection: "row"}}>
        <section style={{marginLeft: "100px", }}>
          <h1>Welcome Back!</h1>
          <form action="">
            <div>
              <input type="email" name="email" placeholder="E-Mail" required />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
            <h2 onClick={showDialog}>Forgot password?</h2>

            <div>
              <button>Sign in</button>
            </div>

            <div>
              <h4 onClick={switchLogin} style={{ textDecoration: "underline" }}>
                Don't have an account? Sign Up
              </h4>
            </div>
          </form>
        </section>
       <section>
        <img src={SignIn} alt="" />
       </section>
       </section>

      ) : (
        <section>
          <h1>Welcome!</h1>
          <form action="">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
            />
            <br />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
            />
            <br />
            <input type="email" name="email" placeholder="E-Mail" required />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <br />

            <select name="experiencelevel" id="explevel">
              <option value="">Experience Level</option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
            <br />

            {/* how do i make this required and have a placeholde */}
            <select name="careerpath" id="careerpath">
              <option value="careerpath">Career Path</option>
              <option value="cs">Computer Science</option>
              <option value="ch">Computer Hardware</option>
              <option value="cyber">Cyber Security</option>
              <option value="webdev">Full Stack Web Development</option>
              <option value="it">Information Technology</option>
              <option value="swe">Software Engineer</option>
              <option value="uiux">UI/UX</option>
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
            <h4 onClick={switchLogin} style={{ textDecoration: "underline" }}>
              Already have an account? Sign in
            </h4>
          </form>
        </section>
      )}

    

      {/* make this a pop up screen with an 'x' to close it  */}
      <dialog ref={dialogRef}>
        <h2>Reset Your Password</h2>
        {/* how do i add closeput 'x' */}

        <p>
          Enter you Compsigh email and we'll send you a link to reset your
          password.
        </p>
        <form action="">
          <input
            type="email"
            name="resetpassword"
            placeholder="E-Mail"
            required
          />
          <br />

          <button>Reset Password</button>
          {/* how do i make this close the popup */}
          <button>Cancel</button>
        </form>
      </dialog>
      <div>{/* Graphics content for the page */}</div>
    <Footer />
    </>
  );
};
