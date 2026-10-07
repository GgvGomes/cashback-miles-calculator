import { ImageResponse } from "next/og";
import { BRAND_HEX, MARK_PATH, MARK_STROKE, MARK_VIEWBOX } from "@/components/brand/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS aplica a máscara arredondada sozinho: tile violeta full-bleed, sem rx.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_HEX.violeta,
        }}
      >
        <svg width="176" height="176" viewBox={MARK_VIEWBOX}>
          <path
            d={MARK_PATH}
            fill="none"
            stroke="#fff"
            strokeWidth={MARK_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
