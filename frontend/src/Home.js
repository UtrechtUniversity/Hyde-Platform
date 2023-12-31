/* Homepage of the HYDE portal.
Components used by this Homepage are stored within `homepage-components` folder */
import "./styles/HomePage.css";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HomeMap from "./home-components/HomeMap";
import Graph from "./home-components/Graph";
import Timeline from "./home-components/Timeline";
import Table from "./home-components/Table"

import { yearIndexToYear } from "./util/yearIndexToYear";
import { timelineObjects } from "./util/timelineObjects";
import {roundYear} from "./util/roundYear"

export default function Home() {
  /* The year 10000 bc is assigned 0, and start increasing from there  */
  const [currentYear, setCurrentYear] = useState(11500);
  return (
    /* Homepage, consisting of top part, and timeline at the bottom. The top consists of a jumbotron (left) and an infosection (right) */
    <div className="homepage">
      <div className="top-section">
        <Jumbotron />
        <InfoSection currentYear={currentYear} />
      </div>
      <div className="timeline-overlay">
        <Timeline currentYear={currentYear} setCurrentYear={setCurrentYear} />
      </div>
    </div>
  );
};

const Jumbotron = () => {
  return (
    <div className="jumbotron bg-primary text-white">
      <h1>Hyde Portal</h1>
      <p>
        Through this portal, data from the <strong>HYDE model</strong> can be
        accessed <br />
        The HYDE model is a mathematical model calculating change in <strong>Demographic</strong>, <strong>Land Use</strong> and <strong>Agricultural</strong> indicators, starting from the rise of
        humanity in 10000 B.C. untril our current time. <br />
        These indicators are calculated within each of the current national
        borders, generating timeseries and within 30kmx30km pixels for the globe generating maps.
      </p>
      <h4>Indicators</h4>
      <p>
        There are three main categories of indicators that can be retrieved through this portal:
        <ul>
          <li>Demographic: Population, Population Density, Urban Population and Rural Population</li>
          <li>Land use: Urban Area, Cropland, Pasture, Rangeland and Converted Rangeland</li>
          <li>Agricultural: Irrigated Rice, Rainfed Rice, Total Rice, Irrigated Other, Rainfed Other, Total Irrigated and Total Rainfed</li>
        </ul>
      </p>
      <h4> Repository </h4>
      The github repository can be entered <a href="https://github.com/UtrechtUniversity/Hyde-Platform">here</a>. This includes a booklet on how one can create such a webapplication themselves
      <p></p>
      {/* Link from react-router-dom, allows changing webpages  */}
      <Link to="/portal">
        <h1 style={{ fontWeight: 400 }}>Go to HYDE Portal</h1>
        <div style={{ width: "400px", borderRadius: "5px", overflow: "hidden" }}>
          <HomeMap />
        </div>
      </Link>
    </div>
  );
};


const InfoSection = ({ currentYear }) => {
  const [roundedYear, setRoundedYear] = useState(1500);
  const [previousYear, setPreviousYear] = useState(null)

  /* From this infosection we want the HomeMap to update after the slides has arived at it's final location, 
  since requesting it during the sliding process for each change in current Year is to memory intensive.
  For this reason, a variables previousYear is created which is equal to value of the currentYear a small time ago.
  If this is equal to currentYear, the sliding is stopped, and the HomeMap is updated. */
  useEffect(() => {
    const updatePreviousYear = () => {
      setPreviousYear(currentYear)
    }
    const timeout = setTimeout(updatePreviousYear, 100)
    return () => clearTimeout(timeout)
  }, [currentYear])

  useEffect(() => {
    if (currentYear === previousYear) {
      setRoundedYear(roundYear(currentYear));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousYear])

  /* The code is finding the timeline object whose end year is greater than or equal to the current year. */
  const currentTimeLineObject = timelineObjects.find(
    (timelineObject) => timelineObject.endYear >= currentYear
  );
  return (
    <div className="infosection" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <h1 style={{ color: currentTimeLineObject.color }}>
          {currentTimeLineObject.title}
        </h1>
        <h3 style={{ fontWeight: 300 }}>{yearIndexToYear(currentYear)}</h3>
      </div>
      <div className="periodText" >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {currentTimeLineObject.periodText}
          </div>
          <div style={{ flex: 1 }}>
            <HomeMap roundedYear={roundedYear} mapId={2} netCDF={true} />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "50% 50%", gap: 10 }}>
        <Graph roundedYear={roundYear(currentYear)} />
        <Table roundedYear={roundYear(currentYear)} />
      </div>
    </div>
  );
};