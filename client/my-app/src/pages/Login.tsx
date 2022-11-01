import { useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchLogin = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      {isLogin ? (
        <section>
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
            <a href="forgotpassword.html">Forgot password?</a>

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
              <a href="terms&conditions.html">Terms & Conditions</a>
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

      <section>
        <h1>Terms & Conditions</h1>
      </section>

      {/* make this a pop up screen with an 'x' to close it  */}
      <section>
        <h2>Reset Your Password</h2>
        {/* how do i add closeput 'x' */}

        <p>
          Enter you Compsigh email and we'll send you a link to r eset your
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
      </section>
      <div>{/* Graphics content for the page */}</div>
      <Footer />
    </>
  );
};
