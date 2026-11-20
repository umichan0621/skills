// umichan-skills — OpenCode V2 plugin that registers every skill
// packaged under skills/<id>/SKILL.md via ctx.skill.transform.
// skills/ is the single source of truth for every harness: Claude Code
// discovers it natively from .claude-plugin/, OpenCode loads this module
// (auto-discovered at .opencode/plugins/, or via package.json main).
//
// Zero dependencies (superpowers pattern): Plugin.define is sugar, a plain
// { id, setup } default export is the V2 contract. No @opencode/plugin
// import means plugin installs never touch the npm registry.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const skillsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "skills",
);

// ponytail: single-line `key: value` frontmatter only — switch to a real
// YAML parser if a skill ever needs multiline/block-scalar frontmatter.
function parseFrontmatter(file) {
  const content = fs.readFileSync(file, "utf8");
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const fm = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0 && !/^\s/.test(line)) {
        fm[line.slice(0, i).trim()] = line
          .slice(i + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
      }
    }
  }
  return { fm, body: m ? m[2] : content };
}

function skills() {
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const location = path.join(skillsDir, e.name, "SKILL.md");
      return { id: e.name, location, ...parseFrontmatter(location) };
    })
    .filter((s) => s.fm.description && fs.existsSync(s.location));
}

export default {
  id: "umichan-skills",
  async setup(ctx) {
    await ctx.skill.transform((editor) => {
      for (const skill of skills()) {
        editor.add({
          id: skill.id,
          name: skill.fm.name || skill.id,
          description: skill.fm.description,
          path: skill.location,
          content: skill.body,
        });
      }
    });
  },
};
