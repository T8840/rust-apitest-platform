import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "../LoadingButton";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICase } from "../../api/types";
import { updateCaseFn } from "../../api/caseApi";

type IUpdateCaseProps = {
  caseData: ICase;
  setOpenCaseModal: (open: boolean) => void;
};

const updateCaseSchema = object({
  title: string().min(1, "Title is required"),
  host: string().min(1, "Host is required"),
  uri: string().min(1, "URI is required"),
  method: string().min(1, "Method is required"),
  request_body: string(),
  expected_result: string(),
  // response_code: string(),
  // response_body: string(),

});

export type UpdateCaseInput = TypeOf<typeof updateCaseSchema>;

const UpdateCase: FC<IUpdateCaseProps> = ({ caseData, setOpenCaseModal }) => {
  const methods = useForm<UpdateCaseInput>({
    resolver: zodResolver(updateCaseSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (caseData) {
      methods.reset(caseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();
  const { mutate: updateCase } = useMutation({
    mutationFn: ({ caseId, caseData }: { caseId: string; caseData: UpdateCaseInput }) =>
      updateCaseFn(caseId, caseData),
    onSuccess(data) {
      queryClient.invalidateQueries(["getCases"]);
      setOpenCaseModal(false);
      toast("Case updated successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error: any) {
      setOpenCaseModal(false);
      const resMessage =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(resMessage, {
        type: "error",
        position: "top-right",
      });
    },
  });

  const onSubmitHandler: SubmitHandler<UpdateCaseInput> = async (data) => {
    updateCase({ caseId: caseData.id, caseData: data });
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-ct-dark-600 font-semibold">Update Case</h2>
        <div
          onClick={() => setOpenCaseModal(false)}
          className="text-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </div>
      </div>{" "}
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors["title"] && "border-red-500"}`
            )}
            {...methods.register("title")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["title"] && "visible"}`
            )}
          >
            {errors["title"]?.message as string}
          </p>
        </div>
        
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            Host
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["host"] && "border-red-500"}`
            )}
            {...methods.register("host")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["host"] && "visible"}`
            )}
          >
            {errors["host"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            URI
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["uri"] && "border-red-500"}`
            )}
            {...methods.register("uri")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["uri"] && "visible"}`
            )}
          >
            {errors["uri"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            Method
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["method"] && "border-red-500"}`
            )}
            {...methods.register("method")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["method"] && "visible"}`
            )}
          >
            {errors["method"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
           Request Body
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["request_body"] && "border-red-500"}`
            )}
            {...methods.register("request_body")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["request_body"] && "visible"}`
            )}
          >
            {errors["request_body"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
           Expected Result
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
              `${errors["expected_result"] && "border-red-500"}`
            )}
            {...methods.register("expected_result")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["expected_result"] && "visible"}`
            )}
          >
            {errors["expected_result"]?.message as string}
          </p>
        </div>

        {/* <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
          Response Code
          </label>
          <textarea
            className={twMerge(
              `appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors.response_code ? "border-red-500" : "border-gray-400"}`
            )}
            rows={6}
            {...register("response_code")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2`,
              `${errors.response_code ? "visible" : "invisible"}`
            )}
          >
            {errors.response_code && errors.response_code.message}
          </p>
        </div> */}
        <LoadingButton loading={false}>Update Case</LoadingButton>
      </form>
    </section>
  );
};

export default UpdateCase;
