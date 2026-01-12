import assert from "node:assert";
import { Redis } from "@upstash/redis";

assert(
  process.env.UPSTASH_REDIS_REST_URL,
  "UPSTASH_REDIS_REST_URL is not defined",
);
assert(
  process.env.UPSTASH_REDIS_REST_TOKEN,
  "UPSTASH_REDIS_REST_TOKEN is not defined",
);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
