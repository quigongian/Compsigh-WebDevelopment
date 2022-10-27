import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export const Login = () => {
  return (
    <>
      <Header />
      <h1>pains</h1>
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
            <a href="signup_page.html">Don't have an account? Sign Up</a>
          </div>
        </form>
      </section>
      <section>
        {/* signup */}
        {/* Make it so that when already have an account is clicked, the signup section is rendered instead of this one. */}
      </section>
      <div>{/* Graphics content for the page */}</div>
      <Footer />
    </>
  );
};
