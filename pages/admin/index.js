"use client";
import SignInWrapper from "../../components/SignInWrapper";
import { useState } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@components/layout"));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e, signIn) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <Layout>
      <SignInWrapper>
        {(signIn) => (
          <form
            onSubmit={(e) => handleSubmit(e, signIn)}
            className="form-container mx-auto py-5"
            style={{ maxWidth: "400px" }}
          >
            <div className="featured-property-rent-wrapper--title text-center">
              <h3>Admin login</h3>
            </div>
            <div>
              <label className="label-contact">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="form-control "
              />
            </div>
            <div className="mt-3">
              <label className="label-contact">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="form-control "
              />
            </div>
            <button
              type="submit"
              className="theme-button header-btn theme-primary-btn w-100 mt-4"
            >
              Sign In
            </button>
          </form>
        )}
      </SignInWrapper>
    </Layout>
  );
};

export default LoginPage;
