import { describe, expect, test } from "bun:test";

describe("server.url does not crash when unix socket path produces invalid URL", () => {
  test("with object", () => {
    // Passing an object as the unix socket path causes the URL formatter to produce
    // a string like "unix://[object Bun]" which is not a valid URL. Accessing
    // server.url should throw a proper JS error instead of crashing.
    using server = Bun.serve({
      // @ts-expect-error: intentionally passing invalid type
      unix: Bun,
      fetch() {
        return new Response("ok");
      },
    });
    expect(() => server.url).toThrow();
  });

  test("with constructor function", () => {
    // Passing a constructor as the unix socket path produces a URL like
    // "unix://function Int8Array() { [native code] }" which is not parseable.
    using server = Bun.serve({
      // @ts-expect-error: intentionally passing invalid type
      unix: Int8Array,
      fetch() {
        return new Response("ok");
      },
    });
    expect(() => server.url).toThrow();
  });
});
