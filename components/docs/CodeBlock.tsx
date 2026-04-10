"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

// ─── Token types ─────────────────────────────────────────────────────────────
type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "builtin"
  | "function"
  | "property"
  | "operator"
  | "default";

type Token = { type: TokenType; value: string };

// ─── Token colors (inline styles so Tailwind purge doesn't strip them) ───────
const TOKEN_COLOR: Record<TokenType, string> = {
  keyword: "#60a5fa",   // blue-400  — import, export, const, async …
  string: "#fbbf24",    // amber-400 — "...", '...', `...`
  comment: "#52525b",   // zinc-600  — // … and /* … */
  number: "#f97316",    // orange-500
  builtin: "#f87171",   // red-400   — true, false, null, undefined
  function: "#a78bfa",  // violet-400 — identifiers followed by (
  property: "#86efac",  // green-300 — identifiers after .
  operator: "#94a3b8",  // slate-400 — = : ; , { } [ ] ( )
  default: "#d4d4d8",   // zinc-300  — everything else
};

const KEYWORDS = new Set([
  "import", "export", "from", "as", "default",
  "const", "let", "var", "function", "async", "await", "return",
  "if", "else", "throw", "new", "type", "interface", "class", "extends",
  "implements", "static", "public", "private", "readonly", "protected",
  "in", "of", "for", "while", "do", "switch", "case", "break", "continue",
  "try", "catch", "finally", "delete", "typeof", "instanceof", "void",
]);

const BUILTINS = new Set([
  "true", "false", "null", "undefined", "NaN", "Infinity",
]);

// ─── Tokenizer ───────────────────────────────────────────────────────────────
function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Single-line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const val = code.slice(i, end === -1 ? code.length : end);
      tokens.push({ type: "comment", value: val });
      i += val.length;
      continue;
    }

    // Block comment
    if (code[i] === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const val = code.slice(i, end === -1 ? code.length : end + 2);
      tokens.push({ type: "comment", value: val });
      i += val.length;
      continue;
    }

    // Hash comment (bash / shell)
    if (code[i] === "#" && (i === 0 || code[i - 1] === "\n" || code[i - 1] === " ")) {
      const end = code.indexOf("\n", i);
      const val = code.slice(i, end === -1 ? code.length : end);
      tokens.push({ type: "comment", value: val });
      i += val.length;
      continue;
    }

    // Strings: double quote
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Strings: single quote
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Strings: template literal
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i]) && (i === 0 || !/[a-zA-Z_$]/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[\d._xXa-fA-FoObB]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers, keywords, builtins
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      // Look ahead: is the next non-space char a `(`? → function call
      const after = code.slice(j).trimStart();
      const isPropAccess = i > 0 && code[i - 1] === ".";

      let type: TokenType;
      if (KEYWORDS.has(word)) type = "keyword";
      else if (BUILTINS.has(word)) type = "builtin";
      else if (isPropAccess) type = "property";
      else if (after.startsWith("(")) type = "function";
      else type = "default";

      tokens.push({ type, value: word });
      i = j;
      continue;
    }

    // Operators and punctuation — give them a subtler colour
    if (/[=:;,<>!+\-*/&|^~%?.@]/.test(code[i])) {
      tokens.push({ type: "operator", value: code[i] });
    } else {
      tokens.push({ type: "default", value: code[i] });
    }
    i++;
  }

  return tokens;
}

// ─── Rendered line with syntax highlight ─────────────────────────────────────
function HighlightedLine({ line }: { line: string }) {
  const tokens = tokenize(line);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: TOKEN_COLOR[tok.type] }}>
          {tok.value}
        </span>
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface CodeBlockProps {
  children: string;
  filename?: string;
  language?: string;
  /** Pass true to disable syntax highlighting (plain text / terminal output) */
  plain?: boolean;
}

export function CodeBlock({
  children,
  filename,
  language = "typescript",
  plain = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  const lines = children.trim().split("\n");

  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] my-6 group">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#111111]">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          {filename && (
            <span className="text-[12px] text-zinc-500 font-mono">{filename}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Language badge */}
          <span className="text-[11px] text-zinc-600 border border-white/[0.06] px-2 py-0.5 rounded font-mono select-none">
            {language}
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            title="Copy code"
            className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors px-2 py-1 rounded border border-transparent hover:border-white/[0.08] hover:bg-white/[0.04] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Code body ── */}
      <div className="overflow-x-auto bg-[#0a0a0a]">
        <table className="w-full border-collapse text-[13px] font-mono leading-6">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                {/* Line number */}
                <td
                  className="select-none text-right pr-5 pl-5 py-0 w-10 text-zinc-700 align-top"
                  style={{ userSelect: "none", minWidth: 48 }}
                >
                  {idx + 1}
                </td>
                {/* Code */}
                <td className="pr-6 py-0 w-full align-top whitespace-pre">
                  {plain ? (
                    <span style={{ color: TOKEN_COLOR.default }}>{line}</span>
                  ) : (
                    <HighlightedLine line={line} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
