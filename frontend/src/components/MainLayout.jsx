import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import { Outlet } from "react-router-dom";
// import BubblesBackground from "./BubblesBackground";

export default function MainLayout() {
  const [items, setItems] = useState([]);
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* <BubblesBackground /> */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-y-auto">
            <TopNavBar />
            <main className="flex-1 p-4 overflow-y-auto bg-transparent">
              <Outlet context={{ items, setItems }} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
