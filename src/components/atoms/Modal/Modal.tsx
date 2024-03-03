import { FloatingButton } from "@/components/atoms/Button";
import React, { ReactNode, useState } from "react";
interface Modal {
  children: ReactNode;
}
const Modal: React.FC<Modal> = ({ children }) => {
  const [isShowPopup, setIsShowPopup] = useState(false);

  return (
    <div>
      <div className="container">
        <FloatingButton
          onclick={() => setIsShowPopup(true)}
          position="bottom-left"
        >
          +
        </FloatingButton>

        {isShowPopup && (
          <>
            <div
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-xl w-9/12 p-6 rounded-lg shadow-lg bg-white ${
                isShowPopup ? "block" : "hidden"
              }`}
              onClick={() => setIsShowPopup(false)}
            >
              <div
                className="popup-content relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsShowPopup(false)}
                  className="absolute -top-8 -right-3 bg-gray-200 h-8 w-8 rounded-full text-black hover:bg-gray-300"
                >
                  &times;
                </button>
                <div className="mt-4">{children}</div>
              </div>
            </div>

            <div
              className="fixed inset-0 z-40 bg-black opacity-50"
              onClick={() => setIsShowPopup(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
