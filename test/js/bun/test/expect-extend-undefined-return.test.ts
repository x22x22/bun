import { describe, expect, test } from "bun:test";

describe("expect.extend", () => {
  test("custom matcher returning undefined throws InvalidMatcherError", () => {
    expect.extend({
      _returnsUndefined() {
        // Returns undefined instead of {pass, message}
      },
    });

    expect(() => expect(42)._returnsUndefined()).toThrow("Unexpected return from matcher function");
  });

  test("custom asymmetric matcher returning undefined does not crash", () => {
    expect.extend({
      _asyncReturnsUndefined() {
        // Returns undefined instead of {pass, message}
      },
    });

    // Using a custom matcher as an asymmetric matcher inside toEqual
    // exercises the ExpectCustomAsymmetricMatcher.execute() path
    // which previously left a pending JS exception causing an assertion failure.
    expect({ a: 1 }).not.toEqual({
      a: expect._asyncReturnsUndefined(),
    });
  });
});
