import { Fragment, ComponentChildren, FunctionalComponent, h } from "preact";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  children: ComponentChildren;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const SlideUp: FunctionalComponent<Props> = (props: Props) => {
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={props.setIsOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed w-screen h-[90vh] mt-[10vh] flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-700"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-700"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              {props.children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideUp;
