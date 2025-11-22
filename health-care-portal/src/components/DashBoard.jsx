import SideMenu from "./SideMenu";
import './dashboard.css';
import { Outlet } from 'react-router-dom'

export default function DashBoard() {
    return (
        <div className="dashboard-container">
            <SideMenu />
            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    )
}

