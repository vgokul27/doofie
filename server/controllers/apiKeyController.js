import ApiKey from "../models/ApiKey.js";
import { generateApiKey } from "../utils/generateKey.js";

export const getApiKey = async (req, res) => {
  try {
    const userId = req.user.uid;
    let key = await ApiKey.findOne({ userId });

    if (!key) {
      const newKey = generateApiKey();
      key = await ApiKey.create({ userId, key: newKey });
    }

    res.json({ apiKey: key.key });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch key" });
  }
};

export const regenerateApiKey = async (req, res) => {
  try {
    const userId = req.user.uid;
    const newKey = generateApiKey();

    const updated = await ApiKey.findOneAndUpdate(
      { userId },
      { key: newKey },
      { new: true, upsert: true }
    );

    res.json({ apiKey: updated.key });
  } catch (err) {
    res.status(500).json({ message: "Failed to regenerate key" });
  }
};
