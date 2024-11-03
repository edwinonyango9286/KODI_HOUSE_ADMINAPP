import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon white.svg";
import { PiLightningBold } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { FiMail, FiUsers } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import {
  HiOutlineInboxIn,
  HiOutlineSpeakerphone,
  HiOutlineChartBar,
  HiOutlineLink,
  HiOutlineSupport,
  HiAdjustments,
} from "react-icons/hi";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { BsBellFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetState } from "../Features/auth/authSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [inactiveTimeout, setInactiveTimeout] = useState(null);
  const INACTIVITY_LIMIT = 20 * 60 * 1000;

  const resetInactivityTimer = () => {
    if (inactiveTimeout) {
      clearTimeout(inactiveTimeout);
    }
    setInactiveTimeout(setTimeout(handleLogout, INACTIVITY_LIMIT));
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);
    resetInactivityTimer();
    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
      if (inactiveTimeout) {
        clearTimeout(inactiveTimeout);
      }
    };
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isSuccess = useSelector((state) => state.auth.isSuccess.logoutUser);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetState());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className="flex items-center justify-center bg-blue-600 h-16 gap-2">
            <img className="w-8 h-8" src={logo} alt="logo" />
          </div>
        ) : (
          <div className="flex items-center justify-center bg-blue-600 h-16 gap-2">
            <img className="w-8 h-8" src={logo} alt="logo" />
            <h2 className="text-white text-base font-medium">Kodi House</h2>
          </div>
        )}

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "profile",
              icon: collapsed ? (
                <PiLightningBold className="text-sm" />
              ) : (
                <PiLightningBold className="text-sm" />
              ),
              label: collapsed ? (
                <span>Welcome {user.name.split(" ")[0]}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="capitalize">
                    Welcome {user?.name?.split(" ")[0]}
                  </span>
                  <RiLogoutBoxRLine
                    className="text-sm"
                    onClick={handleLogout}
                  />
                </div>
              ),
            },

            {
              key: "dashboard",
              icon: <AiOutlineHome className="text-sm" />,
              label: "Dashboard",
            },
            {
              key: "applications",
              icon: <FiMail className="text-sm" />,
              label: "Applications",
            },

            {
              key: "tenants",
              icon: <FiUsers className="text-sm" />,
              label: "Tenants",
            },

            {
              key: "users",
              icon: <BiUserCircle className="text-sm" />,
              label: "Users",
            },

            {
              key: "Properties",
              icon: <HiOutlineBuildingOffice2 className="text-sm" />,
              label: "Properties",
            },

            {
              key: "finances",
              icon: <BsBriefcase className="text-sm" />,
              label: "Finances",
              children: [
                {
                  key: "invoices",
                  label: "Invoices",
                },
                {
                  key: "leases",
                  label: "Leases",
                },
                {
                  key: "expences",
                  label: "Expenses",
                },
                {
                  key: "receipts",
                  label: "Receipts",
                },
              ],
            },
            {
              key: "tasks",
              icon: <FiServer className="text-sm" />,
              label: "Task",
            },
            {
              key: "messages",
              icon: <HiOutlineInboxIn className="text-sm" />,
              label: "Messages",
            },

            {
              key: "noticeboard",
              icon: <HiOutlineSpeakerphone className="text-sm" />,
              label: "Noticebaord",
            },

            {
              key: "Documents",
              icon: <HiOutlineDocumentChartBar className="text-sm" />,
              label: "Documents",
            },

            {
              key: "Reports",
              icon: <HiOutlineChartBar className="text-sm" />,
              label: "Reports",
              children: [
                {
                  key: "expenses-reports",
                  label: "Expenses",
                },
                {
                  key: "expenses-vs-income",
                  label: "Expenses vs Income",
                },
              ],
            },
            {
              key: "referrals",
              icon: <HiOutlineLink className="text-sm" />,
              label: "Referrals",
            },
            {
              key: "support-tickets",
              icon: <HiOutlineSupport className="text-sm" />,
              label: "Support Tickets",
            },
            {
              key: "setups",
              icon: <HiAdjustments className="text-sm" />,
              label: "Setups",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className="flex items-center justify-between relative"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div
            className={`${
              !collapsed
                ? "hidden md:flex gap-2 lg:gap-4 items-center justify-center mr-4 mr-lg-8"
                : "flex gap-2 lg:gap-4 items-center justify-center mr-4 mr-lg-8"
            }`}
          >
            <div className="position-relative">
              <MdEmail className="text-base" />
            </div>
            <div className="position-relative">
              <BsBellFill className="text-base" />
            </div>

            <div
              className={`flex gap-1 items-center justify-center cursor-pointer`}
              onClick={() => setOpen(!open)}
            >
              <img
                src={user?.avatar}
                alt="userimage"
                className="border rounded-full w-[32px] h-[32px] shrink"
              />
              <h5 className="mb-0 capitalize hidden md:block">{user?.name}</h5>
            </div>
          </div>
        </Header>

        {open && (
          <div className="absolute flex flex-col justify-between border rounded-lg w-24  h-24 bg-gray-100 p-2 top-md-12  right-md-16  lg:right-32  top-12 right-8 ">
            <Link
              to={"profile"}
              className="m-0 p-0 font-normal text-sm text-gray-950 hover:text-blue-600"
            >
              My Profile
            </Link>
            <Link
              to={"/"}
              className="m-0 p-0 font-normal text-sm text-gray-950 hover:text-blue-600"
            >
              Edit Profile
            </Link>
            <Link
              onClick={handleLogout}
              className="m-0 p-0 font-normal text-sm text-gray-950 hover:text-blue-600"
            >
              Logout
            </Link>
          </div>
        )}

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
