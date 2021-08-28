import { createContext, VNode } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { Amplify, Auth } from "aws-amplify";
import { ComponentChildren, FunctionalComponent, h } from "preact";
import { ISignUpResult } from "amazon-cognito-identity-js";

interface Props {
  children?: ComponentChildren;
}

import cognito from "../config/cognito";

Amplify.configure({
  ...cognito,
});

interface UserContextI {
  user: any;
  login: (uname: string, pwd: string) => any;
  logout: () => void;
  signUp: (props: SignUpPropsI) => Promise<ISignUpResult>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
}

interface SignUpPropsI {
  username: string;
  password: string;
}

const UserContext = createContext<UserContextI | null>(null);

const UserProvider: FunctionalComponent<Props> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const login = (usernameOrEmail: string, password: string) =>
    Auth.signIn(usernameOrEmail, password).then((cognitoUser) =>
      setUser(cognitoUser)
    );
  const logout = () => Auth.signOut().then(() => setUser(null));
  const signUp = (props: SignUpPropsI) => Auth.signUp(props);
  const confirmSignUp = (username: string, code: string) =>
    Auth.confirmSignUp(username, code);

  return (
    <UserContext.Provider
      value={{ user, login, logout, signUp, confirmSignUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("`useUser` must be within a `UserProvider`");
  }
  return context;
};

export { useUser, UserProvider, UserContext };
