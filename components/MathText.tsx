import React from "react";
import katex from "katex";

interface MathTextProps {
  content: string;
  className?: string;
}

/**
 * Parses a string containing LaTeX markers ($...$ for inline, $$...$$ for block)
 * and renders high-quality KaTeX math.
 */
export function MathText({ content, className = "" }: MathTextProps) {
  if (!content) return null;

  // Split by $$...$$ first, then by $...$
  const parts: React.ReactNode[] = [];
  // Regex to match $$block math$$ or $inline math$
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    // Push preceding plain text
    if (matchStart > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.substring(lastIndex, matchStart)}
        </span>
      );
    }

    const raw = match[0];
    const isBlock = raw.startsWith("$$") && raw.endsWith("$$");
    const formula = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();

    try {
      const html = katex.renderToString(formula, {
        displayMode: isBlock,
        throwOnError: false,
        output: "htmlAndMathml",
      });

      if (isBlock) {
        parts.push(
          <div
            key={`math-block-${matchStart}`}
            className="my-3 overflow-x-auto py-1 text-center font-normal text-[#F4ECE1]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } else {
        parts.push(
          <span
            key={`math-inline-${matchStart}`}
            className="inline-math font-normal text-[#F4ECE1] px-0.5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    } catch {
      // Fallback in case of parsing error
      parts.push(<code key={`err-${matchStart}`} className="text-red-400">{raw}</code>);
    }

    lastIndex = matchEnd;
  }

  // Push remaining plain text
  if (lastIndex < content.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>
        {content.substring(lastIndex)}
      </span>
    );
  }

  return <span className={className}>{parts}</span>;
}

export default MathText;
