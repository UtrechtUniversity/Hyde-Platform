import "./styles/HomePage.css";
import React from "react";
import StaticMap from "./homepage-components/StaticMap";
import Timeline from "./homepage-components/Timeline";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="information-overlay">
        Information Hub Information HubInformation HubInformation Hub{" "}
      </div>
      <div className="graphs-overlay">
        Graphs Overlay Graphs Overlay Graphs Overlay Graphs OverlayGraphs
        Overlay Graphs Overlay
      </div>
      <div className="logo">
        Hyde Portal
        <StaticMap />
      </div>
      <div className="timeline-overlay">
        <Timeline />
      </div>
    </div>
  );
};

export default HomePage;
