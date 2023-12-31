import ReactDom from "react-dom";
import React, { FC } from "react";

type ICaseModal = {
  openCaseModal: boolean;
  setOpenCaseModal: (open: boolean) => void;
  children: React.ReactNode;
};

const CaseModal: FC<ICaseModal> = ({
  openCaseModal,
  setOpenCaseModal,
  children,
}) => {
  if (!openCaseModal) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenCaseModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-0 lg:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("case-modal") as HTMLElement
  );
};

export default CaseModal;
