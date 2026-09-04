import React from "react";
import katex from "katex";

interface MathTextProps {
  content: string;
  className?: string;
}

/**
 * Safely renders LaTeX math using KaTeX
 */
function renderKaTeX(formula: string, isBlock: boolean, key: string | number): React.ReactNode {
  try {
    const html = katex.renderToString(formula, {
      displayMode: isBlock,
      throwOnError: false,
      output: "htmlAndMathml",
    });

    if (isBlock) {
      return (
        <div
          key={key}
          className="my-3 overflow-x-auto py-1 text-center font-normal text-[#F4ECE1]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return (
      <span
        key={key}
        className="inline-math font-normal text-[#F4ECE1] px-0.5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <code key={key} className="text-red-400 font-mono text-xs">
        {isBlock ? `$$${formula}$$` : `$${formula}$`}
      </code>
    );
  }
}

/**
 * Parses markdown inline tokens and math:
 * - $$block math$$
 * - $inline math$
 * - **bold** / __bold__
 * - *italic* / _italic_
 * - `code`
 * - ~~strikethrough~~
 */
function parseTokens(text: string, depth = 0, keyPrefix = "tok"): React.ReactNode[] {
  if (!text) return [];
  if (depth > 4) return [text]; // Prevent infinite recursion

  // Match:
  // 1: $$block math$$
  // 2: **bold**
  // 3: __bold__
  // 4: `code`
  // 5: ~~strikethrough~~
  // 6: $inline math$
  // 7: *italic*
  // 8: _italic_
  const regex = /(\$\$[\s\S]*?\$\$)|(\*\*(.+?)\*\*)|(__(.+?)__)|(`([^`]+)`)|(~~(.+?)~~)|(\$[^$\n]+?\$)|(\*([^*\n]+?)\*)|(_([^_\n]+?)_)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    // Plain text before token
    if (matchStart > lastIndex) {
      nodes.push(
        <span key={`${keyPrefix}-txt-${lastIndex}`}>
          {text.substring(lastIndex, matchStart)}
        </span>
      );
    }

    const fullMatch = match[0];
    const key = `${keyPrefix}-m-${matchStart}`;

    if (fullMatch.startsWith("$$") && fullMatch.endsWith("$$")) {
      // Block math
      const formula = fullMatch.slice(2, -2).trim();
      nodes.push(renderKaTeX(formula, true, key));
    } else if (fullMatch.startsWith("**") && fullMatch.endsWith("**")) {
      // Bold **
      const inner = fullMatch.slice(2, -2);
      nodes.push(
        <strong key={key} className="font-bold text-[#FAF6EE]">
          {parseTokens(inner, depth + 1, `${key}-b`)}
        </strong>
      );
    } else if (fullMatch.startsWith("__") && fullMatch.endsWith("__")) {
      // Bold __
      const inner = fullMatch.slice(2, -2);
      nodes.push(
        <strong key={key} className="font-bold text-[#FAF6EE]">
          {parseTokens(inner, depth + 1, `${key}-b`)}
        </strong>
      );
    } else if (fullMatch.startsWith("`") && fullMatch.endsWith("`")) {
      // Inline code
      const inner = fullMatch.slice(1, -1);
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-[#4F6B57]/40 text-[#D9CBB6] font-mono text-xs border border-[#7A8F73]/30"
        >
          {inner}
        </code>
      );
    } else if (fullMatch.startsWith("~~") && fullMatch.endsWith("~~")) {
      // Strikethrough
      const inner = fullMatch.slice(2, -2);
      nodes.push(
        <del key={key} className="line-through text-[#D9CBB6]/60">
          {parseTokens(inner, depth + 1, `${key}-s`)}
        </del>
      );
    } else if (fullMatch.startsWith("$") && fullMatch.endsWith("$")) {
      // Inline math
      const formula = fullMatch.slice(1, -1).trim();
      nodes.push(renderKaTeX(formula, false, key));
    } else if (fullMatch.startsWith("*") && fullMatch.endsWith("*")) {
      // Italic *
      const inner = fullMatch.slice(1, -1);
      nodes.push(
        <em key={key} className="italic text-[#EAE0D2]">
          {parseTokens(inner, depth + 1, `${key}-i`)}
        </em>
      );
    } else if (fullMatch.startsWith("_") && fullMatch.endsWith("_")) {
      // Italic _
      const inner = fullMatch.slice(1, -1);
      nodes.push(
        <em key={key} className="italic text-[#EAE0D2]">
          {parseTokens(inner, depth + 1, `${key}-i`)}
        </em>
      );
    } else {
      nodes.push(<span key={key}>{fullMatch}</span>);
    }

    lastIndex = matchEnd;
  }

  // Trailing plain text
  if (lastIndex < text.length) {
    nodes.push(
      <span key={`${keyPrefix}-txt-${lastIndex}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }

  return nodes;
}

/**
 * Parses a string containing LaTeX markers ($...$, $$...$$)
 * and Markdown formatting (**bold**, *italic*, `code`, ~~strike~~)
 * and renders high-quality KaTeX math + rich typography.
 */
export function MathText({ content, className = "" }: MathTextProps) {
  if (!content) return null;
  return <span className={className}>{parseTokens(content)}</span>;
}

export default MathText;

