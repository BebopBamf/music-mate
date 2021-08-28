import { FunctionalComponent, render } from "preact";
import { useRef, useState } from "preact/hooks";
import { h } from "preact";
import { JSXInternal } from "preact/src/jsx";

const SignUp: FunctionalComponent = () => {
  const [authStage, setAuthStage] = useState<number>(0);
  const [authStageError, setAuthStageError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const authStages = [
    {
      label: "Enter your phone number",
      type: "tel",
      placeholder: "+XX XXXXXXXXX",
      pattern: /^/,
      next: (
        event: JSXInternal.TargetedEvent<HTMLFormElement, Event>,
        validate: RegExp
      ) => {
        setAuthStageError("undefined");
        event.preventDefault();
        if (inputRef.current) {
          if (!validate.test(inputRef.current.value)) {
            setAuthStageError(
              "Whoops! Your phone number looks odd, please try again."
            );
          }
          // setAuthStage((num) => num + 1);
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
      ) => {},
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
        <span>{authStageError}</span>
        <button
          type="submit"
          class="w-full items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>Next</span>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
