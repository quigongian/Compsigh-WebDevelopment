import { HttpStatusCode } from "../services/http-client";
import { FormEvent, useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import SignOut from "../image_content/signOut.png";
import { signIn, signUp } from "../services/requests";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState("signIn");

    const submitSignIn = (e: FormEvent) => {
        e.preventDefault();
        signIn({ email: "dummy@example.com", password: "Dummy123!" })
            .then((res) => {
                if (res.status === HttpStatusCode.Ok) {
                    console.log("User signed in successfully");
                    navigate("/dashboard");
                } else {
                    console.log("User sign in failed", res.statusText);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const submitSignUp = (e: FormEvent) => {
        e.preventDefault();
        signUp({
            firstName: "John",
            lastName: "Doe",
            email: "jdoe@example.com",
            password: "Password-123",
            categoryId: 1,
            xpLevelId: 1,
        })
            .then((res) => {
                if (res.status === HttpStatusCode.Ok) {
                    console.log("User created successfully");
                    navigate("/dashboard");
                } else {
                    console.log("User creation failed", res.statusText);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Header />
            {display === "signIn" && (
                <section
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <section className="section">
                        <h1>Welcome Back!</h1>
                        <form onSubmit={submitSignIn}>
                            <div>
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    placeholder="E-Mail *"
                                    required
                                    id="email"
                                />
                            </div>

                            <div>
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    placeholder="Password *"
                                    required
                                    id="password"
                                />
                            </div>

                            <span>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        id="rememberMe"
                                    />
                                    <label htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>

                                <button
                                    className="forgot"
                                    onClick={() => setDisplay("forgotPassword")}
                                >
                                    Forgot password?
                                </button>
                            </span>

                            <div style={{ marginTop: "57px" }}>
                                <button className="signIn">Sign in</button>
                            </div>

                            <button
                                className="accountSignIn"
                                onClick={() => setDisplay("signUp")}
                            >
                                Don't have an account? Sign Up
                            </button>
                        </form>
                    </section>

                    <section style={{ height: "740px" }}>
                        <img src={SignOut} alt="" />
                    </section>
                </section>
            )}

            {display === "signUp" && (
                <section
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <section className="section" id="section2">
                        <h1 id="welcome">Welcome!</h1>
                        <form onSubmit={submitSignUp}>
                            <input
                                className="input"
                                id="input"
                                type="text"
                                name="firstname"
                                placeholder="First Name *"
                                required
                            />
                            <br />
                            <input
                                className="input"
                                id="input"
                                type="text"
                                name="lastname"
                                placeholder="Last Name *"
                                required
                            />
                            <br />
                            <input
                                className="input"
                                id="input"
                                type="email"
                                name="email"
                                placeholder="E-Mail *"
                                required
                            />
                            <br />
                            <input
                                className="input"
                                id="input"
                                type="password"
                                name="password"
                                placeholder="Password *"
                                required
                            />
                            <br />

                            <select
                                className="dropDown"
                                name="experienceLevel"
                                id="expLevel"
                            >
                                <option
                                    value="experienceLevel"
                                    disabled
                                    selected
                                >
                                    Experience Level
                                </option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <br />

                            <select
                                className="dropDown"
                                name="careerPath"
                                id="careerPath"
                            >
                                <option value="careerPath" disabled selected>
                                    Select a Career Path
                                </option>
                                <option value="cs">Computer Science</option>
                                <option value="ch">Computer Hardware</option>
                                <option value="cyber">Cyber Security</option>
                                <option value="webDev">Web Development</option>
                                <option value="it">
                                    Information Technology
                                </option>
                                <option value="swe">Software Developer</option>
                                <option value="uiux">UI/UX Design</option>
                            </select>
                            <br />

                            <button className="signIn">Sign Up</button>
                            <br />

                            <button
                                className="accountSignIn"
                                onClick={() => setDisplay("signIn")}
                            >
                                Already have an account? Sign in
                            </button>
                        </form>
                    </section>

                    <section style={{ height: "740px" }}>
                        <img src={SignOut} alt="" />
                    </section>
                </section>
            )}

            {display === "forgotPassword" && (
                <section
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <section className="section">
                        <h1>Reset Password</h1>

                        <p id="confirm">
                            Confirm email to recieve instructions
                            <br /> on resetting your password.
                        </p>

                        <form action="">
                            <input
                                className="input"
                                id="reset"
                                type="email"
                                name="resetpassword"
                                placeholder="E-Mail *"
                                required
                            />
                            <br />

                            <button
                                className="signIn"
                                id="cancel"
                                onClick={() => setDisplay("signIn")}
                            >
                                Cancel
                            </button>
                            <button className="signIn">Reset Password</button>
                        </form>
                    </section>

                    <section style={{ height: "740px" }}>
                        <img src={SignOut} alt="" />
                    </section>
                </section>
            )}

            <Footer />
        </>
    );
};
