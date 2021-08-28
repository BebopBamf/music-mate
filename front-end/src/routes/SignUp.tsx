import { FunctionalComponent, render } from "preact";
import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";

const SignUp: FunctionalComponent = () => {
  const [authStage, setAuthStage] = useState<number>(0);
  const [authStageError, setAuthStageError] = useState<string>();

  const authStages = [
    {
      inputs: [
        {
          label: "Enter your phone number",
          type: "tel",
          placeholder: "+XX XXXXXXXXX",
        },
      ],
      next: (event: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAuthStage((num) => num + 1);
      },
    },
    {
      inputs: [
        {
          label: "Enter your verification code",
          type: "number",
          placeholder: "XXXXXX",
        },
      ],
      next: (event: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {},
    },
  ];

  return (
    <div className="flex flex-col h-screen px-4 py-4 space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Sign Up for Music Mate
        </h1>
      </div>
      <form id="auth" className="flex flex-col items-stretch gap-4">
        {authStages[authStage].inputs.map(({ label, type, placeholder }) => (
          <>
            <label
              className="text-base font-medium text-center text-gray-600"
              for="stage-input"
            >
              {label}
            </label>
            <input
              type={type}
              name="stage-input"
              id="stage-input"
              className="p-3 border-b-2 border-gray-200 rounded-md shadow-sm outline-none"
              placeholder={placeholder}
            />
          </>
        ))}
        <button
          onClick={(event) => authStages[authStage].next(event)}
          type="button"
          class="w-full items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>Next</span>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
