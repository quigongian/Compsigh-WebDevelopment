import { HttpStatusCode } from "../services/http-client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import SignOut from "../image_content/signOut.png";
import {
    getCategories,
    getXpLevels,
    signIn,
    signUp,
} from "../services/requests";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Category, XPLevel } from "../services/models";

export const Login = () => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState("signIn");
    const [categories, setCategories] = useState<Category[]>([]);
    const [xpLevels, setXpLevels] = useState<XPLevel[]>([]);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const xpLevelIdRef = useRef<HTMLSelectElement>(null);
    const categoryIdRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        getCategories()
            .then((response) => {
                if (response.status === HttpStatusCode.Ok) {
                    setCategories(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        getXpLevels()
            .then((response) => {
                if (response.status === HttpStatusCode.Ok) {
                    setXpLevels(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const submitSignIn = (e: FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (email && password) {
            signIn({ email: "dummy@example.com", password: "Dummy123!" })
                // signIn({ email, password })
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
        }
    };

    const submitSignUp = (e: FormEvent) => {
        e.preventDefault();
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const xpLevelId = Number(xpLevelIdRef.current?.value);
        const categoryId = Number(categoryIdRef.current?.value);
        if (
            firstName &&
            lastName &&
            email &&
            password &&
            xpLevelId &&
            categoryId
        ) {
            signUp({
                firstName,
                lastName,
                email,
                password,
                categoryId,
                xpLevelId,
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
        }
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
                                    ref={emailRef}
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
                                    ref={passwordRef}
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
                                ref={firstNameRef}
                            />
                            <br />
                            <input
                                className="input"
                                id="input"
                                type="text"
                                name="lastname"
                                placeholder="Last Name *"
                                required
                                ref={lastNameRef}
                            />
                            <br />
                            <input
                                className="input"
                                id="input"
                                type="email"
                                name="email"
                                placeholder="E-Mail *"
                                required
                                ref={emailRef}
                            />
                            <br />
                            <input
                                className="input"
                                id="input"
                                type="password"
                                name="password"
                                placeholder="Password *"
                                required
                                ref={passwordRef}
                            />
                            <br />
                            <select
                                className="dropDown"
                                name="expLevel"
                                id="expLevel"
                                ref={xpLevelIdRef}
                            >
                                <option value="0">Experience Level</option>
                                {xpLevels.map((xpLevel) => (
                                    <option
                                        key={xpLevel.xpLevelId}
                                        value={xpLevel.xpLevelId}
                                    >
                                        {xpLevel.xpLevelName}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <select
                                className="dropDown"
                                name="careerPath"
                                id="careerPath"
                                ref={categoryIdRef}
                            >
                                <option value="0">Select a Career Path</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.categoryId}
                                        value={category.categoryId}
                                    >
                                        {category.categoryName}
                                    </option>
                                ))}
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
