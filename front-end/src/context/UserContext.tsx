import { createContext, VNode } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { Amplify, Auth } from "aws-amplify";
import { ComponentChildren, FunctionalComponent, h } from "preact";
import {
  ISignUpResult,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

interface Props {
  children?: ComponentChildren;
}

import cognito from "../config/cognito";
import { BASE_URL } from "../config/api";

Amplify.configure({
  ...cognito,
});

interface UserContextI {
  user: CognitoUser | any;
  login: (uname: string, pwd: string) => any;
  logout: () => void;
  signUp: (props: SignUpPropsI) => Promise<ISignUpResult>;
  confirmSignUp: (
    username: string,
    tempPassword: string,
    code: string
  ) => Promise<any>;
  getToken: () => string | undefined;
}

interface SignUpPropsI {
  username: string;
  password: string;
}

const UserContext = createContext<UserContextI | null>(null);

const UserProvider: FunctionalComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [session, setSession] = useState<CognitoUserSession | null>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
    Auth.currentSession()
      .then((user) => setSession(user))
      .catch(() => setSession(null));
  }, []);

  const login = (usernameOrEmail: string, password: string) =>
    Auth.signIn(usernameOrEmail, password).then((cognitoUser: CognitoUser) => {
      setUser(cognitoUser);
      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          setSession(null);
        }
        setSession(session);
      });
    });
  const logout = () => Auth.signOut().then(() => setUser(null));
  const signUp = (props: SignUpPropsI) => Auth.signUp(props);
  const confirmSignUp = (
    username: string,
    tempPassword: string,
    code: string
  ) =>
    new Promise((resolve, reject) =>
      Auth.confirmSignUp(username, code)
        .then(() =>
          Auth.signIn(username, tempPassword).then(
            (cognitoUser: CognitoUser) => {
              cognitoUser.getSession(
                (err: any, session: CognitoUserSession) => {
                  if (err) {
                    setSession(null);
                    setUser(null);
                    reject(err);
                  }
                  setUser(cognitoUser);
                  setSession(session);
                  fetch(BASE_URL + "/create_profile", {
                    method: "PUT",
                    headers: {
                      Authorization: session.getIdToken().getJwtToken(),
                    },
                  });
                  resolve(session);
                }
              );
            }
          )
        )
        .catch((err) => reject(err))
    );

  const getToken = () => session?.getIdToken().getJwtToken();

  return (
    <UserContext.Provider
      value={{ user, login, logout, signUp, confirmSignUp, getToken }}
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
