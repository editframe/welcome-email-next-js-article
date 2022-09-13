import { useState } from "react";
import { useSession, signIn, getProviders } from "next-auth/react";

import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";

const Auth = () => {
  const { data: session } = useSession();
  const [authType, setAuthType] = useState("Login");
  const oppAuthType = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };

  const loginUser = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };

  const formSubmit = (actions) => {
    actions.setSubmitting(false);

    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Formik
          initialValues={{}}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(_, actions) => {
            formSubmit(actions);
          }}
          className="mt-8 space-y-6"
        >
          {(props) => (
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  {authType === "Register"
                    ? "Create a new account"
                    : "Login to your account"}
                </h2>
              </div>
              <Form className="-space-y-px rounded-md shadow-sm">
                {authType === "Register" && (
                  <Field name="username">
                    {() => (
                      <div>
                        <label htmlFor="username" className="sr-only">
                          Username
                        </label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Username"
                        />
                      </div>
                    )}
                  </Field>
                )}
                <Field name="email">
                  {() => (
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {() => (
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  )}
                </Field>

                <div className="text-sm py-4 block">
                  <div>
                    <button
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setAuthType(oppAuthType[authType])}
                    >
                      <p>
                        {" "}
                        {authType === "Login"
                          ? "Not registered yet? "
                          : "Already have an account? "}{" "}
                        {oppAuthType[authType]}
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={props.isSubmitting}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {authType}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Auth;