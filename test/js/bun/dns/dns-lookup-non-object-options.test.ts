import { dns } from "bun";
import { describe, expect, test } from "bun:test";

describe("dns.lookup", () => {
  test("does not crash when options argument is a non-object cell", async () => {
    let result: any;
    try {
      result = await dns.lookup("localhost", "not-an-object" as any);
    } catch {
      return; // DNS errors are acceptable — the test only verifies no crash.
    }
    expect(result).toBeArray();
  });
});
