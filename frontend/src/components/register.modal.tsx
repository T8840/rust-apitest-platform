// 在 components/register.modal.tsx 中

import ReactDom from "react-dom";
import React, { FC, useState } from "react";
import { registerFn, RegisterInput } from "../api/authApi"; // 引入你之前写的 registerFn 函数
import Cookies from "js-cookie"; // 引入 js-cookie 库

type IRegisterModal = {
  openRegisterModal: boolean;
  setOpenRegisterModal: (open: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

const RegisterModal: FC<IRegisterModal> = ({
  openRegisterModal,
  setOpenRegisterModal,
//   setIsLoggedIn,
}) => {
  const [registerInput, setRegisterInput] = useState<RegisterInput>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    photo: "default.png",
  });

  const onRegisterClick = async () => {
    try {
      const response = await registerFn(registerInput);
      Cookies.set("token", response.data.user.id); // 将用户 id 存储到 cookie 中
      alert("注册成功");
      setOpenRegisterModal(false);
    //   setIsLoggedIn(true); // 更新登录状态
    } catch (error) {
      alert("注册失败");
    }
  };

  if (!openRegisterModal) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenRegisterModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-0 lg:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        <div className="flex flex-col gap-4">
          {/* 在这里添加注册的表单 */}
          <input
            className="p-2 border rounded-md"
            type="email"
            value={registerInput.email}
            onChange={(e) =>
              setRegisterInput((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="邮箱"
          />
          <input
            className="p-2 border rounded-md"
            type="password"
            value={registerInput.password}
            onChange={(e) =>
              setRegisterInput((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="密码"
          />
          <input
            className="p-2 border rounded-md"
            type="password"
            value={registerInput.passwordConfirm}
            onChange={(e) =>
              setRegisterInput((prev) => ({ ...prev, passwordConfirm: e.target.value }))
            }
            placeholder="确认密码"
          />
          <input
            className="p-2 border rounded-md"
            type="text"
            value={registerInput.name}
            onChange={(e) =>
              setRegisterInput((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="名称"
          />
          <button 
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={onRegisterClick}
          >
            注册
          </button>
        </div>
      </div>
    </>,
    document.getElementById("register-modal") as HTMLElement
  );
};

export default RegisterModal;
