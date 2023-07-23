import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getCasesFn } from "./api/caseApi";
import CaseModal from "./components/case.modal";
import LoginModal from './components/login.modal';
import RegisterModal from './components/register.modal'; // 引入 RegisterModal 组件
import { logoutFn } from "./api/authApi"; 
import CreateCase from "./components/cases/create.case";
import CaseItem from "./components/cases/case.component";
import NProgress from "nprogress";
import Cookies from 'js-cookie'; // 在这里导入 Cookies 库

function AppContent() {
  const [openCaseModal, setOpenCaseModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token')); // 新的状态变量
  const [showRegisterModal, setShowRegisterModal] = useState(false); // 新的状态变量

  const {
    data: cases,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getCases"],
    queryFn: () => getCasesFn(),
    staleTime: 5 * 1000,
    select: (data) => data.cases,
    onSuccess() {
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

  const onLogoutClick = async () => {
    try {
      await logoutFn();
      Cookies.remove('token'); // 登出成功后移除 token
      setIsLoggedIn(false); // 更新登录状态
      alert('登出成功');
      window.location.reload(); // 刷新页面
    } catch (error) {
      alert('登出失败');
    }
  };

  useEffect(() => {
    if (isLoading || isFetching) {
      NProgress.start();
    }
  }, [isLoading, isFetching]);

  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
       {isLoggedIn ? (
        <button
          onClick={onLogoutClick}
          className="fixed top-4 right-4 bg-green-500 text-white rounded px-4 py-2"
        >
          登出
        </button>
      ) : (
        <div className="fixed top-4 right-4 flex">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-500 text-white rounded px-4 py-2 mr-4"
          >
            登录
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            注册
          </button>
        </div>
      )}
      <LoginModal 
        openLoginModal={showLoginModal} 
        setOpenLoginModal={setShowLoginModal} 
        setIsLoggedIn={setIsLoggedIn} 
      />
      <RegisterModal 
        openRegisterModal={showRegisterModal} 
        setOpenRegisterModal={setShowRegisterModal} 
        // setIsLoggedIn={setIsLoggedIn} 
      />
      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7 grid-rows-[1fr]">
        
        <div className="p-4 min-h-[18rem] bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center">
          
          <div
            onClick={() => setOpenCaseModal(true)}
            className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-ct-blue-600 rounded-full text-ct-blue-600 text-5xl cursor-pointer"
          >
            <i className="bx bx-plus"></i>
          </div>
          <h4
            onClick={() => setOpenCaseModal(true)}
            className="text-lg font-medium text-ct-blue-600 mt-5 cursor-pointer"
          >
            Add new case
          </h4>
        </div>
        {/* Case Items */}

        {cases?.map((caseItem) => (
          <CaseItem key={caseItem.id} caseItem={caseItem} />
        ))}
        {/* Create Case Modal */}
        <CaseModal
          openCaseModal={openCaseModal}
          setOpenCaseModal={setOpenCaseModal}
        >
          <CreateCase setOpenCaseModal={setOpenCaseModal} />
        </CaseModal>
      </div>
    </div>
  );
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
