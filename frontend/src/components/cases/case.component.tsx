import React, { FC, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import CaseModal from "../case.modal";
import UpdateCase from "./update.case";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NProgress from "nprogress";
import { ICase } from "../../api/types";
import { deleteCaseFn,testCaseFn } from "../../api/caseApi";

type CaseItemProps = {
  caseItem: ICase;
};

const CaseItem: FC<CaseItemProps> = ({ caseItem }) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openCaseModal, setOpenCaseModal] = useState(false);

  
  // console.log("CaseItem:",caseItem)
  // My addition
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = document.getElementById(`settings-dropdown-${caseItem.id}`);

      if (dropdown && !dropdown.contains(target)) {
        setOpenSettings(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [caseItem.id]);
  const queryClient = useQueryClient();
  const { mutate: deleteCase } = useMutation({
    mutationFn: (caseId: string) => deleteCaseFn(caseId),
    onMutate() {
      NProgress.start();
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["getCases"]);
      toast("Case deleted successfully", {
        type: "warning",
        position: "top-right",
      });
      NProgress.done();
    },
    onError(error: any) {
      const resMessage =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(resMessage, {
        type: "error",
        position: "top-right",
      });
      NProgress.done();
    },
  });

  const { mutate: testCase } = useMutation({
    mutationFn: (caseId: string) => testCaseFn(caseId),
    onMutate() {
      NProgress.start();
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["getCases"]);
      toast("Test Case successfully", {
        type: "warning",
        position: "top-right",
      });
      NProgress.done();
    },
    onError(error: any) {
      const resMessage =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(resMessage, {
        type: "error",
        position: "top-right",
      });
      NProgress.done();
    },
  });


  const onDeleteHandler = (caseId: string) => {
    if (window.confirm("Are you sure")) {
      deleteCase(caseId);
    }
  };
  const onTestHandler = (caseId: string) => {
    if (window.confirm("Begin Test?")) {
      testCase(caseId);
    }
  };
  
  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-between overflow-hidden">
        <div className="details">
          <h4 className="mb-2 pb-2 text-2xl font-semibold tracking-tight text-gray-900">
            {caseItem.title.length > 40
              ? caseItem.title.substring(0, 40) + "..."
              : caseItem.title}
          </h4>
          <p className="mb-3 font-normal text-ct-dark-200">
            URL: {caseItem.host}{caseItem.uri}
          </p>

          <p className="mb-3 font-normal text-ct-dark-200">
            METHOD: {caseItem.method.length > 210
              ? caseItem.method.substring(0, 210) + "..."
              : caseItem.method}
          </p>
          <p className="mb-3 font-normal text-ct-dark-200">
            Request Body: {caseItem.request_body.length > 210
              ? caseItem.request_body.substring(0, 210) + "..."
              : caseItem.request_body}
          </p>
          <p className="mb-3 font-normal text-ct-dark-200">
            EXPECTED RESULT: {caseItem.expected_result.length > 210
              ? caseItem.expected_result.substring(0, 210) + "..."
              : caseItem.expected_result}
          </p>
        </div>
 
        <div className="relative border-t border-slate-300 flex justify-between items-center">
          <span className="text-ct-dark-100 text-sm">
            {format(parseISO(String(caseItem.createdAt)), "PPP")}
          </span>
          <div
            onClick={() => setOpenSettings(!openSettings)}
            className="text-ct-dark-100 text-lg cursor-pointer"
          >
            <i className="bx bx-dots-horizontal-rounded"></i>
          </div>
          <div
            id={`settings-dropdown-${caseItem.id}`}
            className={twMerge(
              `absolute right-0 bottom-3 z-10 w-28 text-base list-none bg-white rounded divide-y divide-gray-100 shadow`,
              `${openSettings ? "block" : "hidden"}`
            )}
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li
                onClick={() => {
                  setOpenSettings(false);
                  setOpenCaseModal(true);
                }}
                className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-pencil"></i> Edit
              </li>
              <li
                onClick={() => {
                  setOpenSettings(false);
                  onTestHandler(caseItem.id);
                }}
                className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-play-circle"></i> Test
              </li>
              <li
                onClick={() => {
                  setOpenSettings(false);
                  setOpenCaseModal(true);
                }}
                className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-check-circle"></i> Result
              </li>
              <li
                onClick={() => {
                  setOpenSettings(false);
                  onDeleteHandler(caseItem.id);
                }}
                className="py-2 px-4 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                <i className="bx bx-trash"></i> Delete
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CaseModal
        openCaseModal={openCaseModal}
        setOpenCaseModal={setOpenCaseModal}
      >
        <UpdateCase caseData={caseItem} setOpenCaseModal={setOpenCaseModal} />

      </CaseModal>
    </>
  );
};

export default CaseItem;
