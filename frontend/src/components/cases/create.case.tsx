import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "../LoadingButton";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCaseFn } from "../../api/caseApi";
import NProgress from "nprogress";

type ICreateCaseProps = {
  setOpenCaseModal: (open: boolean) => void;
};

const createCaseSchema = object({
  title: string().min(1, "Title is required"),
  host: string().min(1, "Host is required"),
  uri: string().min(1, "URI is required"),
  method: string().min(1, "Method is required"),
  request_body: string(),
  expected_result: string(),
});

export type CreateCaseInput = TypeOf<typeof createCaseSchema>;

const CreateCase: FC<ICreateCaseProps> = ({ setOpenCaseModal }) => {
  const methods = useForm<CreateCaseInput>({
    resolver: zodResolver(createCaseSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const queryClient = useQueryClient();

  const { mutate: createCase } = useMutation({
    mutationFn: (caseInput: CreateCaseInput) => createCaseFn(caseInput),
    onMutate() {
      NProgress.start();
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["getCases"]);
      setOpenCaseModal(false);
      NProgress.done();
      toast("Case created successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error: any) {
      setOpenCaseModal(false);
      NProgress.done();
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

  const onSubmitHandler: SubmitHandler<CreateCaseInput> = async (data) => {
    createCase(data);
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
        <h2 className="text-2xl text-ct-dark-600 font-semibold">Create Case</h2>
        <div
          onClick={() => setOpenCaseModal(false)}
          className="text-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2  leading-tight focus:outline-none`,
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
            Host
          </label>
          <textarea
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors["host"] && "border-red-500"}`
            )}
            rows={6}
            {...register("host")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2`,
              `${errors["host"]  ? "visible" : "invisible"}`
            )}
          >
            {errors["host"]?.message as string}
          </p>
        </div> */}
        <LoadingButton loading={false}>Create Case</LoadingButton>
      </form>
    </section>
  );
};

export default CreateCase;
