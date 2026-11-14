// Smoke check: import the plugin, drive setup() with a fake ctx,
// assert all packaged skills register with an id and description.
// Run: node smoke-test.mjs
const mod = await import("./.opencode/plugins/index.js");
const def = mod.default ?? mod;
if (def.id !== "agent-skills") throw new Error(`FAIL: expected plugin id agent-skills, got ${def.id}`);

import fs from "fs";
const pluginManifest = JSON.parse(fs.readFileSync(".claude-plugin/plugin.json", "utf8"));
if (pluginManifest.name !== "agent-skills" || !pluginManifest.version || !pluginManifest.author)
  throw new Error("FAIL: incomplete .claude-plugin/plugin.json (need name, version, author)");
const marketplace = JSON.parse(fs.readFileSync(".claude-plugin/marketplace.json", "utf8"));
if (marketplace.plugins?.[0]?.name !== "agent-skills" || !marketplace.description)
  throw new Error("FAIL: incomplete .claude-plugin/marketplace.json (need plugin entry, description)");
const setup = def.setup ?? def;

const added = [];
const ctx = {
  skill: {
    transform: async (fn) => {
      await fn({ add: (s) => added.push(s) });
    },
  },
};

await setup(ctx);

const ids = added.map((s) => s.id).sort();
console.log("registered:", ids.join(", "));

const missing = added.filter((s) => !s.id || !s.description || !s.content);
if (added.length === 0) throw new Error("FAIL: no skills registered");
if (missing.length > 0) throw new Error(`FAIL: incomplete skills: ${missing.map((s) => s.id)}`);
console.log("OK");
