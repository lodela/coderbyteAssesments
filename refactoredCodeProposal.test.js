const { deterministicPartitionKey } = require("./refactoredCodeProposal");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("returns the trivial partition key if no event is provided", () => {
    const result = deterministicPartitionKey(null);
    expect(result).toBe("0");
  });

  it("uses the event's partitionKey if present", () => {
    const event = { partitionKey: "test" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("test");
  });

  it("hashes the event data if partitionKey is not present", () => {
    const event = { data: "test" };
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  it("hashes the partition key if it is too long", () => {
    const event = { partitionKey: "a".repeat(257) };
    const hash = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  it("returns a string partition key", () => {
    const event = { data: { foo: "bar" } };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe("string");
  });
});
