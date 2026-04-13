import { useState } from "react";
import { predictText, predictURL, predictImage } from "../services/api";

export default function WorkspacePanel({
    setPrediction,
    setConfidence,
    setHistory,
    loading,
    setLoading,
}) {
    const [activeTab, setActiveTab] = useState("text");
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);

    const handleAnalyze = async () => {

        try {

            // ⭐ VALIDATION
            if (activeTab === "text" && (!text || text.trim().length < 20)) {
                alert("Enter proper news text");
                return;
            }

            if (activeTab === "url" && (!url || url.trim() === "")) {
                alert("Enter valid URL");
                return;
            }

            if (activeTab === "image" && !file) {
                alert("Upload image first");
                return;
            }

            setLoading(true);

            let res;

            if (activeTab === "text") res = await predictText(text);
            if (activeTab === "url") res = await predictURL(url);
            if (activeTab === "image") res = await predictImage(file);

            console.log("FULL RESPONSE:", res);

            // ⭐ VERY SAFE RESPONSE EXTRACTION
            const pred = res?.data?.prediction;
            const conf = res?.data?.confidence;

            if (!pred && pred !== "FAKE" && pred !== "REAL") {
                throw new Error("Invalid prediction response");
            }

            setPrediction(pred);
            setConfidence(conf);

            // ⭐ HISTORY UPDATE ONLY IF PROP EXISTS
            if (setHistory) {
                setHistory(prev => [
                    {
                        prediction: pred,
                        confidence: conf,
                        time: new Date()
                    },
                    ...prev
                ]);
            }

        } catch (err) {
            console.error("Prediction Error:", err);
            alert("Prediction Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="glass"
            style={{
                padding: 32,
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* TABS */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 20,
                }}
            >
                <button
                    onClick={() => setActiveTab("text")}
                    style={tabStyle(activeTab === "text")}
                >
                    Text Analysis
                </button>

                <button
                    onClick={() => setActiveTab("image")}
                    style={tabStyle(activeTab === "image")}
                >
                    Image
                </button>

                <button
                    onClick={() => setActiveTab("url")}
                    style={tabStyle(activeTab === "url")}
                >
                    URL Check
                </button>
            </div>

            {/* INPUT AREA */}
            <div style={{ flexGrow: 1 }}>
                {activeTab === "text" && (
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste article content to begin analysis..."
                        style={textareaStyle}
                    />
                )}

                {activeTab === "url" && (
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste news URL..."
                        style={inputStyle}
                    />
                )}

                {activeTab === "image" && (
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ marginTop: 20 }}
                    />
                )}
            </div>

            {/* FOOTER */}
            <div
                style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    paddingTop: 20,
                }}
            >
                <p style={{ fontSize: 12, color: "#86868b" }}>
                    Maximum 5,000 characters for deep scanning.
                </p>

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{
                        padding: "12px 28px",
                        borderRadius: 30,
                        border: "none",
                        background: "#fff",
                        color: "#000",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.6 : 1,
                        transition: ".2s"
                    }}
                >
                    {loading ? "Analyzing..." : "Analyze Now"}
                </button>
            </div>
        </div>
    );
}

/* ---------- STYLES ---------- */

const textareaStyle = {
    width: "100%",
    minHeight: 260,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: 20,
    lineHeight: 1.6,
    resize: "none",
};

const inputStyle = {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "#fff",
};

const tabStyle = (active) => ({
    padding: "8px 14px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 600 : 500,
    background: active ? "rgba(255,255,255,0.1)" : "transparent",
    color: active ? "#fff" : "#86868b",
});