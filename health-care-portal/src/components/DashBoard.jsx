import SideMenu from "./SideMenu";
import './dashboard.css';
import WellnessGoals from "./WellnessGoals";

export default function DashBoard() {
    return (
        <>
            <div class="dashboard-container">
                <SideMenu />
                <main class="dashboard-main">
                    <h2>Welcome, David</h2>
                    <WellnessGoals />
                </main>
            </div>
        </>
    )
}

