import React, { useContext, useRef, useState } from "react";
import Mainlogo from "../header/logo/Mainlogo/Mainlogo";

import "./AdminMain.css";

import DashBoard from "./submenu/dashboard/DashBoard";
import RateChart from "./submenu/modules/RateChart";
import PieChart from "./submenu/modules/chart/PieChart";
import StackChart from "./submenu/modules/chart/StackChart";

import MainEvent from "./submenu/event/MainEvent";
import SlideEvent from "./submenu/event/SlideEvent";
import TotalList from "./submenu/stock/TotalList";
import UserList from "./submenu/user/UserList";
import StateList from "./submenu/deiliver/StateList";
import Notices from "./submenu/modules/Notices";
import Add from "./submenu/stock/Add";
import OrderList from "./submenu/order/orderList";
import RefundList from "./submenu/order/RefundList";
import Legacy from "./submenu/order/Legacy";

import Send from "./submenu/email/Send";
import Attendance from "./submenu/modules/Attendance";
import Calendar from './submenu/modules/Calendar';
import DashChart from "./submenu/modules/chart/DashChart";
import SnakeGame from "./submenu/modules/SnakeGame";
import { apiCall } from "../service/apiService";
import { Logincontext } from './../App';
import CelebList from "./submenu/user/CelebList";

export default function AdminMain() {

    const [subMenuVisible, setSubMenuVisible] = useState({});                                                           // 서브메뉴 토글용
    const dashboards = useRef([]);                                                                                      // DashBoard 컴포넌트의 prop스로 전달할 ref
    const [selectMenu, setSelectMenu] = useState(<DashBoard dashboards={dashboards.current.map((e) => e.component)} />);   // canvers에 보여질 컴포넌트를 담는 state
    const [iconColors, setIconColors] = useState(Array(8).fill('#7de4ff'));                                             // 아이콘의 개수에 맞게 초기 상태 배열 생성
    const [isLoggedIn, setIsloggedIn] = useContext(Logincontext);



    const toggleDashboard = (sub) => {
        const isDuplicateIndex = dashboards.current.findIndex(dashboard => dashboard.key === sub.key);
        if (isDuplicateIndex === -1) {
            // dashboards 안에 없으면 추가.
            dashboards.current = [...dashboards.current, sub];
        } else {
            // dashboards에 이미 존재하면 제거.
            dashboards.current = dashboards.current.filter((_, index) => index !== isDuplicateIndex);
        }
        setSelectMenu(<DashBoard dashboards={dashboards.current.map(item => item.component)} />);
    };


    const toggleIconColor = (index) => {
        setIconColors(prevColors => {
            const newColors = [...prevColors];
            newColors[index] = prevColors[index] === '#7de4ff' ? '#FE7CF3' : '#7de4ff'; // 해당 아이콘의 색상을 토글
            return newColors;
        });
    };

    const logOut = async () => {
        try {
          await apiCall('/api/user/logout', "GET", null, null);
          alert("Logged out.");
          sessionStorage.removeItem('loginID');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('nickname');
          setIsloggedIn(false);
          window.location.href='/'
        } catch (error) {
            console.error("Error occurred during logout : ", error);
          return false;
        }
      };


    const menuList = [
        {
            key: 0,
            icon: "xi-codepen",
            main: "DashBoard",
            subMenu: [{ key: 0, subkey: <i className="xi-chart-pie dicon" onClick={() => toggleIconColor(0)} style={{ color: iconColors[0] }}></i>, component: <PieChart /> }
                , { key: 1, subkey: <i className="xi-presentation dicon" onClick={() => toggleIconColor(1)} style={{ color: iconColors[1] }}></i>, component: <StackChart /> }
                , { key: 2, subkey: <i className="xi-chart-line dicon" onClick={() => toggleIconColor(2)} style={{ color: iconColors[2] }}></i>, component: <DashChart/> }
                , { key: 3, subkey: <i className="xi-dollar dicon" onClick={() => toggleIconColor(3)} style={{ color: iconColors[3] }}></i>, component: <RateChart /> }
                , { key: 4, subkey: <i className="xi-qr-code dicon" onClick={() => toggleIconColor(4)} style={{ color: iconColors[4] }}></i>, component: <Attendance/>}
                , { key: 5, subkey: <i className="xi-forum-o dicon" onClick={() => toggleIconColor(5)} style={{ color: iconColors[5] }}></i>, component: <Notices/> }
                , { key: 6, subkey: <i className="xi-calendar-check dicon" onClick={() => toggleIconColor(6)} style={{ color: iconColors[6] }}></i>, component: <Calendar/> }
                , { key: 7, subkey: <i className="xi-puzzle dicon" onClick={() => toggleIconColor(7)} style={{ color: iconColors[7] }}></i>, component: <SnakeGame /> }]
        },
        {
            key: 1,
            icon: "xi-users-o",
            main: "User",
            subMenu: [{ subkey: "User List", component: <UserList /> }
                , { subkey: "Celeb List", component: <CelebList /> }
            ]
        },
        {
            key: 2,
            icon: "xi-document",
            main: "Order",
            subMenu: [{ subkey: "Order List", component: () => <OrderList /> }
                , { subkey: "Refund List", component: () => <RefundList /> }
                , { subkey: "Legacy", component: () => <Legacy /> }]
        },
        {
            key: 3,
            icon: "xi-box",
            main: "Stock",
            subMenu: [{ subkey: "Total List", component: <TotalList /> }
                , { subkey: "Add", component: <Add /> }]
        },
        {
            key: 4,
            icon: "xi-truck",
            main: "Delivery",
            subMenu: [{ subkey: "State List", component: <StateList /> }]
        },
        {
            key: 5,
            icon: "xi-calendar",
            main: "Event",
            subMenu: [{ key: 1, subkey: "Slide Event", component: <SlideEvent /> }]
        },
        {
            key: 6,
            icon: "xi-mail-o",
            main: "Mail",
            subMenu: [{ subkey: "Send", component: () => <Send /> }]
        },
        {
            key: 7,
            icon: "xi-traffic",
            main: "Traffic",
            subMenu: []
        },
        {
            key: 8,
            icon: "xi-file-code-o",
            main: "Code",
            subMenu: []
        },
        {
            key: 9,
            icon: "xi-log-out",
            main: "Log-Out",
            subMenu: []
        },
    ]


    const showComponent = (sub) => {
        if (typeof sub === 'function') {
            // 컴포넌트가 함수인 경우 실행하여 JSX를 받음
            setSelectMenu(sub());
        } else {
            // 컴포넌트가 JSX인 경우 그대로 설정
            setSelectMenu(sub.component);
        }
    }

    const toggleSubMenu = (key) => {
        if(key!==9){
            setSubMenuVisible(prevState => ({
                ...prevState,
                [key]: !prevState[key]
            }));
        } else {
            logOut();
        }
    };

    const allHide = () => {
        setSubMenuVisible({});
        setSelectMenu(() => <DashBoard dashboards={dashboards.current.map((e) => e.component)} />)
    }

    return (
        <div className="adminMain_wrap">
            <div className="admin_controller">
                <div className="admin_menubar">
                    <div className="admin_logo"><Mainlogo /></div>
                    <div className="admin_homeBtn_wrap" onClick={allHide}><span>Admin</span><i className="xi-home-o"></i><span>Home</span></div>
                    <div className="admin_menu_upperWrap">
                        <div className="admin_menu_wrap">
                            {
                                menuList.map((menu, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <div key={i} className="admin_menu_slot_wrap" onClick={() => toggleSubMenu(menu.key)}>
                                                <i className={menu.icon}></i><span>{menu.main}</span>{menu.subMenu.length === 0 ? <></> : <i className={`xi-angle-down-min xi-x  ${subMenuVisible[menu.key] ? "" : "hide"}`}></i>}
                                            </div>
                                            <div key={`submenu_${menu.main}`} className={`admin_submenu_slot ${subMenuVisible[menu.key] ? "" : "hide"} ${menu.key === 0 ? "dashboard" : ""}`}>
                                                {menu.subMenu.map((sub, i) => (
                                                    <span
                                                        key={i}
                                                        className={`${subMenuVisible[menu.key] ? "" : "hide"}`}
                                                        onClick={menu.key === 0 ? () => toggleDashboard(sub) : () => showComponent(sub)}
                                                    >
                                                        {sub.subkey}
                                                    </span>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="admin_canvers">
                    {selectMenu}
                </div>
            </div>
        </div>
    );
}

