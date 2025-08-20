import { useEffect, useState } from "react";
import { fetchApiKey, regenerateKey } from "../services/apiKey";
import "../styles/apikey.css";

function ApiKey() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApiKey().then((key) => {
      setApiKey(key);
      setLoading(false);
    });
  }, []);

  const handleRegenerate = async () => {
    const newKey = await regenerateKey();
    setApiKey(newKey);
    setCopied(false); // Reset copy state
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="page">
      <div className="form-wrapper">
        <h2 className="form-title">Your API Key</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="key-box-container">
              <input
                className="box"
                type="text"
                value={apiKey}
                readOnly
              />
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <button className="regenerate-btn" onClick={handleRegenerate}>
              Regenerate Key
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ApiKey;
