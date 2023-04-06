const crypto = require("crypto");

/**
 * Returns a deterministic partition key for an event.
 * @param {Object} event - The event to generate a partition key for.
 * @returns {string} The deterministic partition key for the event.
 */
function deterministicPartitionKey(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate =
      event.partitionKey ||
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  candidate =
    typeof candidate === "string" ? candidate : JSON.stringify(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
}

module.exports = { deterministicPartitionKey };
