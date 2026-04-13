import Header from "../components/Header";
import Hero from "../components/Hero";
import WorkspacePanel from "../components/WorkspacePanel";
import AnalysisPanel from "../components/AnalysisPanel";
import PerformanceSection from "../components/PerformanceSection";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";

import { useState } from "react";

export default function Dashboard(){

  const [prediction,setPrediction]=useState(null);
  const [confidence,setConfidence]=useState(0);
  const [loading,setLoading]=useState(false);

  // ⭐ NEW STATE FOR REAL TIME ANALYTICS
  const [history,setHistory]=useState([]);

  // ⭐ ADD HISTORY FUNCTION
  const addToHistory = (pred, conf) => {
    if(!pred) return;

    setHistory(prev => [
      {
        prediction: pred,
        confidence: conf,
        time: new Date()
      },
      ...prev
    ]);
  };

  // ⭐ REAL TIME CALCULATIONS
  const totalScans = history.length;

  const fakeCount = history.filter(
    h => h.prediction === "FAKE"
  ).length;

  const realCount = history.filter(
    h => h.prediction === "REAL"
  ).length;

  const precision =
    totalScans === 0
      ? 0
      : Math.round((realCount / totalScans) * 100);

  const realPercent =
    totalScans === 0
      ? 0
      : Math.round((realCount / totalScans) * 100);

  return(
    <div className="grain">
      <CursorGlow />

      <Header/>
      <Hero/>

      <div id="workspace" style={{
        display:"grid",
        gridTemplateColumns:"2fr 1fr",
        gap:30,
        padding:"40px 60px"
      }}>
        <WorkspacePanel
          setPrediction={(p)=>setPrediction(p)}
          setConfidence={setConfidence}
          setHistory={setHistory}
          loading={loading}
          setLoading={setLoading}
        />

        <AnalysisPanel
          prediction={prediction}
          confidence={confidence}
          loading={loading}
        />
      </div>

      {/* ⭐ PASS REAL DATA TO PERFORMANCE SECTION */}
      <PerformanceSection
        totalScans={totalScans}
        fakeCount={fakeCount}
        realCount={realCount}
        precision={precision}
        realPercent={realPercent}
        history={history}
      />

      <Footer/>

    </div>
  );
}