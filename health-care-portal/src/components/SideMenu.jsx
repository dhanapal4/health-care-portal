import { NavLink } from "react-router-dom";

export default function SideMenu(){
    const linkClass = ({isActive}) => isActive ? 'menu-item active' : 'menu-item'

    return (
        <aside className="menucontainer">
            <h2>Health</h2>
            <div className="flex flex-col">
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/dashboard/my-profile" className={linkClass}>My profile</NavLink>
            <NavLink to="/dashboard/wellness-goals" className={linkClass}>Wellness Goals</NavLink>
            <div className="menu-item">Messages</div>
            <div className="menu-item">Logout</div>
            </div>
            
        </aside>
    )
}
