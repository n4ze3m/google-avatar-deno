import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.4/mod.ts";

export default function handler(req: Request) {
	const { searchParams } = new URL(req.url);
	const name = searchParams.get("name") || "No Name";

	const size = searchParams.get("size")
		? parseInt(searchParams.get("size") || "0")
		: 200

    const validHex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    const bg = searchParams.get("bg") ? validHex.test(searchParams.get("bg") || "") : false;
    const backgroundColor = bg ? `#${searchParams.get("bg")}` : randomHex();
    const color = generateFontColor( backgroundColor);

	function generateFontColor(hexcolor: string) {
        const r = parseInt(hexcolor.substr(1, 2), 16);
        const g = parseInt(hexcolor.substr(3, 2), 16);
        const b = parseInt(hexcolor.substr(5, 2), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 168 ? "#000000" : "#FFFFFF";
	}

	function randomHex() {
		const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(
			16,
		)}`;
		return backgroundColor
	}

	return new ImageResponse(
		<div
			style={{
				width: `${size}px`,
				height: `${size}px`,
				backgroundColor,
				color,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
                fontSize: `${size / 2}px`,
				fontWeight: "bold",
				textTransform: "uppercase",
				fontFamily: "sans-serif",
			}}
		>
			{name
				.split(" ")
				.map((word) => word[0])
				.join("")}

		</div>,
		{
			width: size,
			height: size,
		},
	);
}
