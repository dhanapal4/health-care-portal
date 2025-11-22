import { Link } from "react-router-dom";

export default function SideMenu(){
    return (
        <aside class="menucontainer">
                    <h2>Health</h2>
                    <div class="menu-item active">Dashboard</div>
                    <div class="menu-item">My profile</div>
                    <Link className="menu-item" to={"/list-goals"}>Wellness Goals</Link>
                    <div class="menu-item">Messages</div>
                    <div class="menu-item">Logout</div>
                </aside>
    )
}
