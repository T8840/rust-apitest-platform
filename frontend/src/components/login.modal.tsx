import ReactDom from "react-dom";
import React, { FC, useState } from "react";
import { loginFn, LoginInput } from "../api/authApi";
import Cookies from "js-cookie";

type ILoginModal = {
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

const LoginModal: FC<ILoginModal> = ({
  openLoginModal,
  setOpenLoginModal,
  setIsLoggedIn,
}) => {
  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const onLoginClick = async () => {
    try {
      const response = await loginFn(loginInput);
      Cookies.set('token', response.token);
      alert('登录成功');
      setOpenLoginModal(false);
      setIsLoggedIn(true);
    } catch (error) {
      alert('登录失败');
    }
  };

  if (!openLoginModal) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenLoginModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-0 lg:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        <div className="flex flex-col gap-4">
          <input
            className="p-2 border rounded-md"
            type="email"
            value={loginInput.email}
            onChange={e => setLoginInput(prev => ({ ...prev, email: e.target.value }))}
            placeholder="邮箱"
          />
          <input
            className="p-2 border rounded-md"
            type="password"
            value={loginInput.password}
            onChange={e => setLoginInput(prev => ({ ...prev, password: e.target.value }))}
            placeholder="密码"
          />
          <button 
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={onLoginClick}
          >
            登录
          </button>
        </div>
      </div>
    </>,
    document.getElementById("login-modal") as HTMLElement
  );
};

export default LoginModal;
