import { FunctionalComponent, render } from "preact";
import { useRef, useState } from "preact/hooks";
import { h, Fragment } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../config/api";

function getRandomString(bytes: number) {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join("") + "A@";
}

function intToHex(nr: number) {
  return nr.toString(32).padStart(2, "0");
}

const SignUp: FunctionalComponent = () => {
  const user = useUser();
  const [unconfirmedUser, setUnconfirmedUser] = useState<string>("");
  const [tempPass, setTempPass] = useState<string>("");
  const [authStage, setAuthStage] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [authStageError, setAuthStageError] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  if (user?.user) {
    window.session = user?.getToken();
    window.baseurl = BASE_URL;
  }
  const authStages = [
    {
      label: "Enter your name",
      type: "name",
      placeholder: "Name",
      pattern: /^.{4,64}/,
      next: (
        event: JSXInternal.TargetedEvent<HTMLFormElement, Event>,
        validate: RegExp
      ) => {
        event.preventDefault();
        if (inputRef.current) {
          const validationCode = inputRef.current.value;
          if (!validate.test(validationCode)) {
            setAuthStageError("Whoops! Your name looks odd. Try again");
            return;
          }
          setName(inputRef.current.value);
          inputRef.current.value = "";
          setAuthStage((num) => num + 1);
        }
      },
    },
    {
      label: "Enter your phone number",
      type: "tel",
      placeholder: "+XX XXXXXXXXX",
      pattern: /^[0-9+\s]{8,12}$/,
      next: (
        event: JSXInternal.TargetedEvent<HTMLFormElement, Event>,
        validate: RegExp
      ) => {
        setAuthStageError(null);
        event.preventDefault();
        if (inputRef.current) {
          const username = inputRef.current.value;
          if (!validate.test(username)) {
            setAuthStageError(
              "Whoops! Your phone number looks odd, please try again."
            );
            return;
          }
          const password = getRandomString(30);
          setTempPass(password);
          user
            ?.signUp({
              username: username,
              password: password,
            })
            .then((data) => {
              setUnconfirmedUser(username);
              setAuthStage((num) => num + 1);
            });
        }
      },
    },
    {
      label: "Enter your verification code",
      type: "number",
      placeholder: "XXXXXX",
      pattern: /^[0-9]{6}/,
      next: (
        event: JSXInternal.TargetedEvent<HTMLFormElement, Event>,
        validate: RegExp
      ) => {
        event.preventDefault();
        if (inputRef.current) {
          const validationCode = inputRef.current.value;
          if (!validate.test(validationCode)) {
            setAuthStageError(
              "Whoops! Your verification number looks odd, please try again."
            );
            return;
          }
          user
            ?.confirmSignUp(unconfirmedUser, tempPass, validationCode)
            .then(() => setAuthStage((num) => num + 1))
            .catch((err) => {
              console.log(err);
              setAuthStageError(err.message);
            });
        }
      },
    },
    {
      label: "Connect with Spotify",
      type: "none",
      placeholder: "",
      pattern: /^.*/,
      next: (
        event: JSXInternal.TargetedEvent<HTMLFormElement, Event>,
        validate: RegExp
      ) => {
        event.preventDefault();
        const headers = new Headers();
        headers.append("Authorization", user?.getToken() || "");
        fetch(BASE_URL + "/spotify/connect", {
          headers: headers,
        })
          .then((data) => data.json())
          .then(({ auth_url }) => {
            console.log(auth_url);
            window.location = auth_url;
          })
          .catch((err) => console.log(err));
      },
    },
  ];

  const { label, type, placeholder, pattern, next } = authStages[authStage];

  return (
    <div className="flex flex-col h-screen px-4 py-4 space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Sign Up for Music Mate
        </h1>
      </div>
      <form
        id="auth"
        className="flex flex-col items-stretch gap-4"
        onSubmit={(event) => next(event, pattern)}
      >
        {type != "none" && (
          <Fragment>
            <label
              className="text-base font-medium text-center text-gray-600"
              for="stageinput"
            >
              {label}
            </label>
            <input
              type={type}
              name="stageinput"
              id="stageinput"
              ref={inputRef}
              className="p-3 border-b-2 border-gray-200 rounded-md shadow-sm outline-none"
              placeholder={placeholder}
            />
            {authStageError && (
              <span className="p-2 text-center text-red-600 border-2 border-red-600 rounded-md">
                {authStageError}
              </span>
            )}
          </Fragment>
        )}
        <button
          type="submit"
          className="items-center w-full px-8 py-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>Next</span>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
