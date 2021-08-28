import { Dialog, Transition } from "@headlessui/react";
import { ComponentChildren, Fragment, FunctionalComponent, h } from "preact";

interface Props {
  children: ComponentChildren;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  cancelButtonText: string;
  onCancel: () => void;
  isActionEnabled: boolean;
  actionButonText: string;
  onAction: () => void;
}

const Modal: FunctionalComponent<Props> = ({
  children,
  isOpen,
  setIsOpen,
  cancelButtonText,
  onCancel,
  isActionEnabled,
  onAction,
  actionButonText,
}: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setIsOpen}
      >
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full">
              <div className="">{children}</div>
              <div className="bg-gray-50 px-4 py-3 flex flex-row space-x-3">
                <button
                  type="button"
                  className="flex-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-sm text-gray-700 hover:bg-gray-50 outline-none"
                  onClick={() => {
                    setIsOpen(false);
                    onCancel();
                  }}
                >
                  {cancelButtonText}
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-sm text-white hover:bg-green-700 outline-none disabled:bg-gray-600"
                  onClick={() => {
                    setIsOpen(false);
                    onAction();
                  }}
                  disabled={!isActionEnabled}
                >
                  {actionButonText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
