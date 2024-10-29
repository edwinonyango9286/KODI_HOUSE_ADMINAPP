import React, { useState } from "react";
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
import { IoMenuSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

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
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              key: "user",
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
                    Welcome {user.name.split(" ")[0]}
                  </span>
                  <RiLogoutBoxRLine className="text-sm" />
                </div>
              ),
            },

            {
              key: "",
              icon: <AiOutlineHome className="text-sm" />,
              label: "Dashboard",
            },
            {
              key: "Applications",
              icon: <FiMail className="text-sm" />,
              label: "Applications",
            },

            {
              key: "Tenants",
              icon: <FiUsers className="text-sm" />,
              label: "Tenants",
            },

            {
              key: "Users",
              icon: <BiUserCircle className="text-sm" />,
              label: "Users",
            },

            {
              key: "Properties",
              icon: <HiOutlineBuildingOffice2 className="text-sm" />,
              label: "Properties",
            },

            {
              key: "Finances",
              icon: <BsBriefcase className="text-sm" />,
              label: "Finances",
              children: [
                {
                  key: "Invoices",
                  label: "Invoices",
                },
                {
                  key: "Leases",
                  label: "Leases",
                },
                {
                  key: "Expenses",
                  label: "Expenses",
                },
                {
                  key: "Receipts",
                  label: "Receipts",
                },
              ],
            },
            {
              key: "Task",
              icon: <FiServer className="text-sm" />,
              label: "Task",
            },
            {
              key: "Messages",
              icon: <HiOutlineInboxIn className="text-sm" />,
              label: "Messages",
            },

            {
              key: "Noticeboard",
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
                  key: "Payment Reports",
                  label: "Expenses",
                },
                {
                  key: "Expenses vs Income",
                  label: "Expenses vs Income",
                },
              ],
            },
            {
              key: "Referrals",
              icon: <HiOutlineLink className="text-sm" />,
              label: "Referrals",
            },
            {
              key: "Support Tickets",
              icon: <HiOutlineSupport className="text-sm" />,
              label: "Support Tickets",
            },
            {
              key: "Setups",
              icon: <HiAdjustments className="text-sm" />,
              label: "Setups",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className="flex  items-center justify-between relative"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <IoMenuSharp className="text-xl" />
              ) : (
                <IoMenuSharp className="text-xl" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            className="trigger ml-4"
          />

          <div>
            <input
              type="text"
              className="bg-gray-100 rounded-md border border-gray-200 focus:outline-none placeholder-gray-500 placeholder:text-sm relative pl-9"
              style={{ width: "450px", height: "32px" }}
              placeholder="Search"
            />
            <IoSearchSharp className="text-base absolute   text-gray-500" style={{ top : "26px",   left:"228px"}} />
          </div>

          <div className="flex gap-4 items-center justify-center mr-8">
            <div className="position-relative">
              <FiMail className="text-base" />
            </div>
            <div className="position-relative">
              <BsBellFill className="text-base" />
            </div>

            <div
              className="flex  gap-1 items-center justify-center cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                width={32}
                height={32}
                src={user.avatar}
                alt="userimage"
                className="border rounded-full"
                style={{ width: 32, height: 32 }}
              />
              <h5 className="mb-0 capitalize">{user.name}</h5>
            </div>
          </div>
        </Header>

        {open && (
          <div className=" absolute flex flex-col justify-between border rounded-lg w-24  h-24 bg-gray-100 p-2 top-12  right-16  gap-1">
            <Link
              to={"/"}
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
              to={"/"}
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
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
