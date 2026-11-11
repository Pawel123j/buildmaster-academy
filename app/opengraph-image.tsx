import { ImageResponse } from "next/og";
export const alt = "BuildMaster Academy — Learn to build your PC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0b1120", color: "#fff", fontFamily: "sans-serif" }}><div style={{ color: "#68e4bd", fontSize: 32 }}>BUILDMASTER ACADEMY</div><div style={{ fontSize: 80, marginTop: 30, fontWeight: 700 }}>Build your first PC.</div><div style={{ fontSize: 32, marginTop: 30 }}>11 guided steps · Compatibility · Budgets · Quiz</div></div>, size);
}
