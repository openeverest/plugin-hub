//#region src/runtime.ts
var e, t, n;
function r(r) {
	e = r.React, t = r.fetch.bind(r), n = r.basePath;
}
var i = (t, n, ...r) => e.createElement(t, n, ...r), a = {
	page: {
		padding: "1.5rem",
		maxWidth: 1280,
		margin: "0 auto"
	},
	headerRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "1rem",
		marginBottom: "1rem",
		flexWrap: "wrap"
	},
	title: {
		margin: 0,
		fontSize: "1.5rem",
		fontWeight: 600
	},
	subtitle: {
		margin: 0,
		color: "#6b7280",
		fontSize: "0.875rem"
	},
	toolbar: {
		display: "flex",
		gap: "0.75rem",
		alignItems: "center",
		flexWrap: "wrap",
		padding: "0.75rem 1rem",
		background: "#f9fafb",
		border: "1px solid #e5e7eb",
		borderRadius: 8,
		marginBottom: "1rem"
	},
	input: {
		flex: "1 1 240px",
		minWidth: 200,
		padding: "0.5rem 0.75rem",
		fontSize: "0.875rem",
		border: "1px solid #d1d5db",
		borderRadius: 6,
		background: "#fff"
	},
	chipGroup: {
		display: "flex",
		gap: "0.25rem"
	},
	chip: (e) => ({
		padding: "0.4rem 0.75rem",
		fontSize: "0.8125rem",
		border: "1px solid " + (e ? "#1f2937" : "#d1d5db"),
		background: e ? "#1f2937" : "#fff",
		color: e ? "#fff" : "#374151",
		borderRadius: 999,
		cursor: "pointer"
	}),
	checkboxRow: {
		display: "flex",
		alignItems: "center",
		gap: "0.4rem",
		fontSize: "0.875rem",
		color: "#374151",
		cursor: "pointer"
	},
	table: {
		width: "100%",
		borderCollapse: "collapse",
		background: "#fff",
		border: "1px solid #e5e7eb",
		borderRadius: 8,
		overflow: "hidden"
	},
	th: {
		textAlign: "left",
		padding: "0.75rem 1rem",
		fontSize: "0.75rem",
		textTransform: "uppercase",
		letterSpacing: "0.05em",
		color: "#6b7280",
		background: "#f9fafb",
		borderBottom: "1px solid #e5e7eb"
	},
	td: {
		padding: "0.75rem 1rem",
		fontSize: "0.875rem",
		borderBottom: "1px solid #f3f4f6",
		verticalAlign: "top"
	},
	iconCell: {
		width: 40,
		padding: "0.75rem",
		textAlign: "center"
	},
	iconImg: {
		width: 28,
		height: 28,
		objectFit: "contain"
	},
	statusInstalled: {
		display: "inline-block",
		padding: "0.15rem 0.55rem",
		background: "#dcfce7",
		color: "#166534",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600
	},
	statusOutdated: {
		display: "inline-block",
		padding: "0.15rem 0.55rem",
		background: "#fef3c7",
		color: "#92400e",
		border: "1px solid #fde68a",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600
	},
	statusAvailable: {
		display: "inline-block",
		padding: "0.15rem 0.55rem",
		background: "#e5e7eb",
		color: "#374151",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600
	},
	maturityChip: (e) => {
		let t = (e || "unknown").toLowerCase(), n = {
			alpha: {
				bg: "#ffedd5",
				fg: "#9a3412"
			},
			beta: {
				bg: "#dbeafe",
				fg: "#1e3a8a"
			},
			stable: {
				bg: "#dcfce7",
				fg: "#166534"
			},
			ga: {
				bg: "#dcfce7",
				fg: "#166534"
			},
			deprecated: {
				bg: "#fee2e2",
				fg: "#991b1b"
			},
			unknown: {
				bg: "#e5e7eb",
				fg: "#374151"
			}
		}, r = n[t] ?? n.unknown;
		return {
			display: "inline-block",
			padding: "0.15rem 0.55rem",
			background: r.bg,
			color: r.fg,
			borderRadius: 999,
			fontSize: "0.75rem",
			fontWeight: 600,
			textTransform: "capitalize"
		};
	},
	gatedChip: {
		display: "inline-block",
		padding: "0.15rem 0.55rem",
		background: "#ede9fe",
		color: "#5b21b6",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600
	},
	capChipYes: {
		display: "inline-flex",
		alignItems: "center",
		gap: 4,
		padding: "0.15rem 0.55rem",
		background: "#dcfce7",
		color: "#166534",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600,
		marginRight: 6,
		marginBottom: 6
	},
	capChipNo: {
		display: "inline-flex",
		alignItems: "center",
		gap: 4,
		padding: "0.15rem 0.55rem",
		background: "#f3f4f6",
		color: "#9ca3af",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600,
		marginRight: 6,
		marginBottom: 6,
		textDecoration: "line-through"
	},
	capRow: {
		display: "flex",
		gap: "0.5rem",
		alignItems: "baseline",
		marginBottom: 4,
		flexWrap: "wrap",
		fontSize: "0.875rem"
	},
	capKey: {
		color: "#6b7280",
		fontWeight: 500,
		minWidth: 120
	},
	typeChip: (e) => ({
		display: "inline-block",
		padding: "0.15rem 0.55rem",
		background: e === "provider" ? "#dbeafe" : "#ede9fe",
		color: e === "provider" ? "#1e3a8a" : "#5b21b6",
		borderRadius: 999,
		fontSize: "0.75rem",
		fontWeight: 600,
		textTransform: "capitalize"
	}),
	categoryTag: {
		display: "inline-block",
		padding: "0.1rem 0.5rem",
		fontSize: "0.7rem",
		background: "#f3f4f6",
		color: "#4b5563",
		borderRadius: 4,
		marginRight: 4
	},
	refreshBtn: {
		padding: "0.4rem 0.9rem",
		fontSize: "0.8125rem",
		border: "1px solid #d1d5db",
		background: "#fff",
		color: "#374151",
		borderRadius: 6,
		cursor: "pointer"
	},
	ctaBtn: {
		padding: "0.5rem 1rem",
		fontSize: "0.875rem",
		fontWeight: 500,
		border: "1px solid #2563eb",
		background: "#2563eb",
		color: "#fff",
		borderRadius: 6,
		cursor: "pointer",
		textDecoration: "none",
		display: "inline-block"
	},
	ctaLink: {
		fontSize: "0.8125rem",
		color: "#6b7280",
		textDecoration: "none"
	},
	headerActions: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		gap: "0.375rem"
	},
	empty: {
		padding: "3rem",
		textAlign: "center",
		color: "#6b7280"
	},
	errorBox: {
		padding: "0.75rem 1rem",
		background: "#fee2e2",
		color: "#991b1b",
		border: "1px solid #fecaca",
		borderRadius: 6,
		marginBottom: "1rem",
		fontSize: "0.875rem"
	},
	warnBox: {
		padding: "0.6rem 1rem",
		background: "#fef3c7",
		color: "#92400e",
		border: "1px solid #fde68a",
		borderRadius: 6,
		marginBottom: "1rem",
		fontSize: "0.8125rem"
	},
	drawerBackdrop: {
		position: "fixed",
		right: 0,
		bottom: 0,
		left: 0,
		background: "rgba(15, 23, 42, 0.4)",
		zIndex: 1200,
		display: "flex",
		justifyContent: "flex-end"
	},
	drawer: {
		width: "min(560px, 100%)",
		height: "100%",
		background: "#fff",
		boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.15)",
		overflowY: "auto",
		padding: "1.5rem",
		boxSizing: "border-box"
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		gap: "0.75rem",
		marginBottom: "1rem"
	},
	closeBtn: {
		marginLeft: "auto",
		border: "none",
		background: "transparent",
		fontSize: "1.5rem",
		cursor: "pointer",
		color: "#6b7280"
	},
	section: { marginTop: "1.25rem" },
	sectionTitle: {
		margin: "0 0 0.5rem",
		fontSize: "0.75rem",
		textTransform: "uppercase",
		color: "#6b7280",
		letterSpacing: "0.05em"
	},
	codeBlock: {
		background: "#0f172a",
		color: "#e2e8f0",
		padding: "0.75rem 1rem",
		borderRadius: 6,
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
		fontSize: "0.8125rem",
		whiteSpace: "pre-wrap",
		overflowWrap: "anywhere"
	},
	codeBlockWrap: { position: "relative" },
	copyBtn: {
		position: "absolute",
		top: "0.4rem",
		right: "0.4rem",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "0.25rem",
		color: "#e2e8f0",
		background: "rgba(30, 41, 59, 0.9)",
		border: "1px solid rgba(148, 163, 184, 0.5)",
		borderRadius: 4,
		cursor: "pointer",
		lineHeight: 0,
		transition: "opacity 0.15s ease"
	},
	prereqList: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem"
	},
	prereqCard: {
		border: "1px solid #e5e7eb",
		borderRadius: 8,
		padding: "0.625rem 0.75rem",
		background: "#f9fafb"
	},
	prereqHead: {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "space-between",
		gap: "0.5rem"
	},
	prereqName: {
		fontWeight: 600,
		color: "#111827",
		fontSize: "0.875rem"
	},
	prereqDesc: {
		color: "#374151",
		fontSize: "0.8125rem",
		marginTop: "0.2rem"
	},
	prereqLink: {
		fontSize: "0.75rem",
		color: "#2563eb",
		textDecoration: "none",
		whiteSpace: "nowrap"
	},
	prereqSummary: {
		cursor: "pointer",
		fontSize: "0.75rem",
		color: "#2563eb",
		marginTop: "0.5rem",
		userSelect: "none"
	}
};
//#endregion
//#region src/data.ts
async function o() {
	let e = await t("/api/catalog");
	if (!e.ok) {
		let t = await e.text().catch(() => "");
		throw Error(t || `HTTP ${e.status}`);
	}
	return {
		...await e.json(),
		stale: e.headers.get("X-Hub-Stale") === "true"
	};
}
async function s() {
	let e = await t("/api/installed");
	if (!e.ok) {
		let t = await e.text().catch(() => "");
		throw Error(t || `HTTP ${e.status}`);
	}
	return e.json();
}
function c(e, t) {
	return `${e}:${t}`;
}
//#endregion
//#region src/catalog.ts
function l(e, t) {
	if (t.type !== "all" && e.type !== t.type || t.installedOnly && !e.installed || t.hideGated && e.access === "gated") return !1;
	if (t.query) {
		let n = t.query.toLowerCase();
		if (![
			e.name,
			e.displayName ?? "",
			e.description ?? "",
			(e.categories ?? []).join(" "),
			(e.keywords ?? []).join(" ")
		].join(" ").toLowerCase().includes(n)) return !1;
	}
	return !0;
}
function u(e) {
	let t = e.artifacts?.chart;
	if (!t) return null;
	let n = t.defaultChannel ?? Object.keys(t.channels ?? {})[0];
	return n ? t.channels?.[n]?.version ?? null : null;
}
function d(e) {
	let t = e.artifacts?.chart, n = t?.defaultChannel ?? Object.keys(t?.channels ?? {})[0] ?? "", r = t?.channels?.[n]?.ref ?? "<chart-ref>", i = t?.channels?.[n]?.version ?? "<version>", a = e.install?.helm?.releaseName ?? e.name, o = e.install?.helm?.namespace ?? "everest-system";
	return [
		`helm install ${a} ${r} \\`,
		`  --version ${i} \\`,
		`  -n ${o}`
	].join("\n");
}
function f(e) {
	let [t, ...n] = e.trim().replace(/^v/i, "").split("+")[0].split("-");
	return {
		numbers: t.split(".").map((e) => parseInt(e, 10) || 0),
		prerelease: n.length > 0 ? n.join("-").split(".") : null
	};
}
function p(e, t) {
	let n = f(e), r = f(t), i = Math.max(n.numbers.length, r.numbers.length);
	for (let e = 0; e < i; e++) {
		let t = n.numbers[e] || 0, i = r.numbers[e] || 0;
		if (t < i) return -1;
		if (t > i) return 1;
	}
	if (!n.prerelease && r.prerelease) return 1;
	if (n.prerelease && !r.prerelease) return -1;
	if (!n.prerelease && !r.prerelease) return 0;
	let a = n.prerelease, o = r.prerelease, s = Math.max(a.length, o.length);
	for (let e = 0; e < s; e++) {
		let t = a[e], n = o[e];
		if (t === void 0) return -1;
		if (n === void 0) return 1;
		let r = /^\d+$/.test(t), i = /^\d+$/.test(n);
		if (r && i) {
			let e = parseInt(t, 10), r = parseInt(n, 10);
			if (e < r) return -1;
			if (e > r) return 1;
		} else if (r && !i) return -1;
		else if (!r && i) return 1;
		else {
			let e = t.localeCompare(n);
			if (e !== 0) return e < 0 ? -1 : 1;
		}
	}
	return 0;
}
function m(e, t) {
	return !e || !t ? !1 : p(e, t) < 0;
}
function h(e) {
	let t = e.artifacts?.chart, n = t?.defaultChannel ?? Object.keys(t?.channels ?? {})[0] ?? "", r = t?.channels?.[n]?.ref ?? "<chart-ref>", i = t?.channels?.[n]?.version ?? "<version>", a = e.install?.helm?.releaseName ?? e.name, o = e.install?.helm?.namespace ?? "everest-system";
	return [
		`helm upgrade ${a} ${r} \\`,
		`  --version ${i} \\`,
		`  -n ${o}`
	].join("\n");
}
//#endregion
//#region src/components/Toolbar.ts
function g(e) {
	let { filter: t, onChange: n, onRefresh: r, refreshing: o, lastRefreshed: s } = e;
	return i("div", { style: a.toolbar }, i("input", {
		type: "search",
		placeholder: "Search by name, description, category…",
		value: t.query,
		style: a.input,
		onChange: (e) => n({
			...t,
			query: e.target.value
		})
	}), i("div", { style: a.chipGroup }, ...[
		{
			key: "all",
			label: "All"
		},
		{
			key: "plugin",
			label: "Plugins"
		},
		{
			key: "provider",
			label: "Providers"
		}
	].map((e) => i("button", {
		key: e.key,
		type: "button",
		style: a.chip(t.type === e.key),
		onClick: () => n({
			...t,
			type: e.key
		})
	}, e.label))), i("label", { style: a.checkboxRow }, i("input", {
		type: "checkbox",
		checked: t.installedOnly,
		onChange: (e) => n({
			...t,
			installedOnly: e.target.checked
		})
	}), "Installed only"), i("label", { style: a.checkboxRow }, i("input", {
		type: "checkbox",
		checked: !t.hideGated,
		onChange: (e) => n({
			...t,
			hideGated: !e.target.checked
		})
	}), "Include gated"), i("button", {
		type: "button",
		style: a.refreshBtn,
		onClick: r,
		disabled: o
	}, o ? "Refreshing…" : "Refresh"), s ? i("span", { style: {
		fontSize: "0.75rem",
		color: "#6b7280"
	} }, `Updated ${s.toLocaleTimeString()}`) : null);
}
//#endregion
//#region src/icons.ts
var _ = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%25239ca3af'%20stroke-width%3D'1.75'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Crect%20x%3D'3'%20y%3D'3'%20width%3D'18'%20height%3D'18'%20rx%3D'3'%2F%3E%3Cpath%20d%3D'M3%209h18M9%203v18'%2F%3E%3C%2Fsvg%3E", v = /* @__PURE__ */ new Set();
function y(e) {
	return e ? e.startsWith("data:") || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("/") ? e : n ? `${n}/${e}` : _ : _;
}
function b(e) {
	return i("img", {
		src: v.has(e.src) ? _ : e.src,
		alt: e.alt ?? "",
		style: e.style,
		onError: (t) => {
			let n = t.currentTarget;
			n.dataset.failed !== "1" && (n.dataset.failed = "1", v.add(e.src), n.src !== "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%25239ca3af'%20stroke-width%3D'1.75'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Crect%20x%3D'3'%20y%3D'3'%20width%3D'18'%20height%3D'18'%20rx%3D'3'%2F%3E%3Cpath%20d%3D'M3%209h18M9%203v18'%2F%3E%3C%2Fsvg%3E" && (n.src = _));
		}
	});
}
//#endregion
//#region src/components/Row.ts
function x(e) {
	let { entry: t, onSelect: n } = e, r = u(t);
	return i("tr", {
		key: t.name,
		style: { cursor: "pointer" },
		onClick: () => n(t)
	}, i("td", { style: {
		...a.td,
		...a.iconCell
	} }, i(b, {
		src: y(t.icon),
		style: a.iconImg
	})), i("td", { style: a.td }, i("div", { style: { fontWeight: 600 } }, t.displayName || t.name), i("div", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem",
		marginTop: 2
	} }, t.name)), i("td", { style: a.td }, i("span", { style: a.typeChip(t.type) }, t.type)), i("td", { style: a.td }, r ?? "—"), i("td", { style: a.td }, ...(t.categories ?? []).map((e) => i("span", {
		key: e,
		style: a.categoryTag
	}, e))), i("td", { style: a.td }, i("div", { style: {
		display: "flex",
		flexDirection: "column",
		gap: 4,
		alignItems: "flex-start"
	} }, i("span", { style: a.maturityChip(t.maturity || "unknown") }, t.maturity || "unknown"), t.access === "gated" ? i("span", { style: a.gatedChip }, "Gated") : null, t.installed ? i("span", { style: m(t.installedVersion, r) ? a.statusOutdated : a.statusInstalled }, m(t.installedVersion, r) ? `Update available · ${t.installedVersion} → ${r}` : t.installedVersion ? `Installed · ${t.installedVersion}` : "Installed") : null)));
}
//#endregion
//#region src/components/CodeBlock.ts
function S() {
	return i("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": !0
	}, i("rect", {
		x: 9,
		y: 9,
		width: 11,
		height: 11,
		rx: 2,
		stroke: "currentColor",
		strokeWidth: 2
	}), i("path", {
		d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}));
}
function C() {
	return i("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": !0
	}, i("path", {
		d: "M20 6 9 17l-5-5",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}));
}
function w(t) {
	let { command: n } = t, [r, o] = e.useState(!1), [s, c] = e.useState(!1), l = e.useCallback(() => {
		let e = () => {
			o(!0), window.setTimeout(() => o(!1), 1500);
		};
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(n).then(e).catch(() => {});
			return;
		}
		e();
	}, [n]);
	return i("div", {
		style: {
			...a.codeBlockWrap,
			...t.style || {}
		},
		onMouseEnter: () => c(!0),
		onMouseLeave: () => c(!1)
	}, i("button", {
		type: "button",
		onClick: l,
		style: {
			...a.copyBtn,
			opacity: s || r ? 1 : 0,
			pointerEvents: s || r ? "auto" : "none"
		},
		title: r ? "Copied!" : "Copy to clipboard",
		"aria-label": r ? "Copied" : "Copy to clipboard"
	}, r ? C() : S()), i("pre", { style: {
		...a.codeBlock,
		margin: 0
	} }, n));
}
//#endregion
//#region src/components/Drawer.ts
function T(e) {
	return e.replace(/[._-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (e) => e.toUpperCase());
}
function E(e, t) {
	let n = T(e);
	return typeof t == "boolean" ? t ? i("span", {
		key: e,
		style: a.capChipYes
	}, `\u2713 ${n}`) : i("span", {
		key: e,
		style: a.capChipNo
	}, `\u2717 ${n}`) : Array.isArray(t) ? i("div", {
		key: e,
		style: a.capRow
	}, i("span", { style: a.capKey }, n), i("div", null, ...t.map((e, t) => i("span", {
		key: t,
		style: a.categoryTag
	}, String(e))))) : t == null ? null : typeof t == "object" ? i("div", {
		key: e,
		style: a.capRow
	}, i("span", { style: a.capKey }, n), i("code", { style: {
		fontSize: "0.8125rem",
		color: "#374151"
	} }, JSON.stringify(t))) : i("div", {
		key: e,
		style: a.capRow
	}, i("span", { style: a.capKey }, n), i("span", { style: { color: "#111827" } }, String(t)));
}
function D(e) {
	let t = e.helm, n = [`helm install ${e.name} ${t.oci} \\`];
	t.version && n.push(`  --version ${t.version} \\`), n.push(`  -n ${t.namespace}${t.createNamespace ? " --create-namespace" : ""}`);
	for (let [e, r] of Object.entries(t.defaultValues ?? {})) n[n.length - 1] += " \\", n.push(`  --set ${e}=${r}`);
	return n.join("\n");
}
function O(e, t) {
	return i("div", {
		key: t,
		style: a.prereqCard
	}, i("div", { style: a.prereqHead }, i("span", { style: a.prereqName }, e.name), e.installUrl ? i("a", {
		href: e.installUrl,
		target: "_blank",
		rel: "noopener noreferrer",
		style: a.prereqLink
	}, "Docs ↗") : null), e.description ? i("div", { style: a.prereqDesc }, e.description) : null, e.helm ? i("details", null, i("summary", { style: a.prereqSummary }, "Install command"), i(w, {
		command: D(e),
		style: { marginTop: "0.5rem" }
	})) : null);
}
function k(e) {
	return !e || !e.length ? null : i("div", { style: a.section }, i("h3", { style: a.sectionTitle }, "Prerequisites"), i("div", { style: a.prereqList }, ...e.map(O)));
}
function A(e) {
	let t = Object.entries(e);
	if (!t.length) return null;
	let n = t.filter(([, e]) => typeof e == "boolean"), r = t.filter(([, e]) => typeof e != "boolean");
	return i("div", null, n.length ? i("div", { style: { marginBottom: r.length ? "0.75rem" : 0 } }, ...n.map(([e, t]) => E(e, t))) : null, r.length ? i("div", null, ...r.map(([e, t]) => E(e, t))) : null);
}
function j() {
	if (typeof document > "u") return 64;
	let e = document.querySelector("header.MuiAppBar-root");
	if (!e) return 64;
	let t = Math.round(e.getBoundingClientRect().height);
	return t > 0 ? t : 64;
}
function M() {
	let [t, n] = e.useState(j);
	return e.useEffect(() => {
		let e = () => n(j());
		return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), t;
}
function N(e) {
	let { entry: t, onClose: n } = e, r = t.access === "gated", o = r ? null : u(t), s = r ? null : d(t), c = t.installed && m(t.installedVersion, o), l = c ? h(t) : null, f = t.plugin?.extensionPoints ?? [], p = t.provider?.supportedEngines ?? [], g = t.maintainers ?? [], _ = M();
	return i("div", {
		style: {
			...a.drawerBackdrop,
			top: _
		},
		onClick: n
	}, i("div", {
		style: a.drawer,
		onClick: (e) => e.stopPropagation()
	}, i("div", { style: a.drawerHeader }, i(b, {
		src: y(t.icon),
		style: {
			width: 40,
			height: 40
		}
	}), i("div", null, i("h2", { style: {
		margin: 0,
		fontSize: "1.25rem",
		fontWeight: 600
	} }, t.displayName || t.name), i("div", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem"
	} }, t.name, " · ", i("span", { style: a.typeChip(t.type) }, t.type), r ? i("span", { style: {
		...a.gatedChip,
		marginLeft: 6
	} }, "Gated") : null)), i("button", {
		type: "button",
		style: a.closeBtn,
		onClick: n
	}, "×")), t.installed ? i("div", { style: { marginBottom: "1rem" } }, i("span", { style: a.statusInstalled }, t.installedVersion ? `Installed · ${t.installedVersion}` : "Installed"), t.installedPhase ? i("span", { style: {
		marginLeft: 8,
		color: "#6b7280",
		fontSize: "0.8125rem"
	} }, `Phase: ${t.installedPhase}`) : null) : null, t.description ? i("p", { style: {
		color: "#374151",
		whiteSpace: "pre-line"
	} }, t.description) : null, i("div", { style: a.section }, i("h3", { style: a.sectionTitle }, "Metadata"), i("div", { style: {
		fontSize: "0.875rem",
		lineHeight: 1.7
	} }, o ? i("div", null, i("b", null, "Version: "), o) : null, t.maturity ? i("div", null, i("b", null, "Maturity: "), i("span", { style: a.maturityChip(t.maturity) }, t.maturity)) : null, t.compatibility?.openeverest ? i("div", null, i("b", null, "Requires OpenEverest: "), t.compatibility.openeverest) : null, t.license ? i("div", null, i("b", null, "License: "), t.license) : null, t.verified ? i("div", null, i("b", null, "Verified: "), "yes") : null)), f.length ? i("div", { style: a.section }, i("h3", { style: a.sectionTitle }, "Extension points"), i("div", null, ...f.map((e) => i("span", {
		key: e,
		style: a.categoryTag
	}, e)))) : null, p.length ? i("div", { style: a.section }, i("h3", { style: a.sectionTitle }, "Supported engines"), i("div", null, ...p.map((e) => i("span", {
		key: e,
		style: a.categoryTag
	}, e)))) : null, t.capabilities && Object.keys(t.capabilities).length ? i("div", { style: a.section }, i("h3", { style: a.sectionTitle }, "Capabilities"), A(t.capabilities)) : null, g.length ? i("div", { style: a.section }, i("h3", { style: a.sectionTitle }, "Maintainers"), i("ul", { style: {
		margin: 0,
		paddingLeft: "1.25rem",
		fontSize: "0.875rem"
	} }, ...g.map((e, t) => i("li", { key: t }, e.name || e.github || e.email || "unknown")))) : null, r ? null : k(t.install?.prerequisites), i("div", { style: a.section }, r ? i("div", null, i("h3", { style: a.sectionTitle }, "Access required"), i("p", { style: {
		color: "#374151",
		fontSize: "0.875rem",
		marginTop: 0
	} }, t.gated?.instructions || "This extension is not publicly available. Contact the vendor to request access."), t.gated?.provider ? i("p", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem",
		marginTop: "-0.5rem"
	} }, `Provided by ${t.gated.provider}`) : null, t.gated?.contactUrl ? i("a", {
		href: t.gated.contactUrl,
		target: "_blank",
		rel: "noopener noreferrer",
		style: a.ctaBtn
	}, "Contact vendor ↗") : i("div", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem"
	} }, "No contact URL configured. See the source repository for details.")) : c ? i("div", null, i("div", { style: a.warnBox }, `A newer version (${o}) is available. Currently installed: ${t.installedVersion}`), i("h3", { style: a.sectionTitle }, "Upgrade with Helm"), i("pre", { style: a.codeBlock }, l)) : i("div", null, i("h3", { style: a.sectionTitle }, "Install with Helm"), i(w, { command: s }))), i("div", { style: a.section }, i("div", { style: {
		display: "flex",
		gap: "0.75rem",
		flexWrap: "wrap"
	} }, t.sourceRepo ? i("a", {
		href: t.sourceRepo,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Source repository ↗") : null, t.homepage ? i("a", {
		href: t.homepage,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Homepage ↗") : null))));
}
//#endregion
//#region src/main.tsx
var P = () => {
	let [t, n] = e.useState(null), [r, u] = e.useState(null), [d, f] = e.useState(null), [p, m] = e.useState(null), [h, _] = e.useState(!0), [v, y] = e.useState(null), [b, S] = e.useState({
		query: "",
		type: "all",
		installedOnly: !1,
		hideGated: !1
	}), [C, w] = e.useState(null), T = e.useCallback(() => {
		_(!0), m(null), o().then((e) => {
			n(e), y(/* @__PURE__ */ new Date());
		}).catch((e) => m(e.message)).finally(() => _(!1)), u(null), f(null), s().then((e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.items ?? []) n?.name && t.set(c(n.type, n.name), n);
			u(t), e.error && f(e.error);
		}).catch((e) => {
			u(/* @__PURE__ */ new Map()), f(e.message);
		});
	}, []);
	e.useEffect(() => {
		T();
	}, [T]);
	let E = r === null, D = e.useMemo(() => {
		let e = t?.extensions ?? [];
		return r ? e.map((e) => {
			let t = r.get(c(e.type, e.name));
			return {
				...e,
				installed: !!t,
				installedVersion: t?.version || e.installedVersion
			};
		}) : e;
	}, [t, r]), O = D.filter((e) => l(e, b)), k = {
		total: D.length,
		plugin: D.filter((e) => e.type === "plugin").length,
		provider: D.filter((e) => e.type === "provider").length,
		installed: D.filter((e) => e.installed).length
	};
	return i("div", { style: a.page }, i("div", { style: a.headerRow }, i("div", null, i("h1", { style: a.title }, "The Hub"), i("p", { style: a.subtitle }, `Browse OpenEverest plugins and providers. ${k.total} available · ${E ? "checking installed…" : `${k.installed} installed`}.`)), i("div", { style: a.headerActions }, i("a", {
		href: "https://github.com/openeverest/hub",
		target: "_blank",
		rel: "noopener noreferrer",
		style: a.ctaBtn
	}, "Add extension"), i("a", {
		href: "https://github.com/openeverest/openeverest/issues/",
		target: "_blank",
		rel: "noopener noreferrer",
		style: a.ctaLink
	}, "Need other tech? →"))), p ? i("div", { style: a.errorBox }, `Failed to load catalog: ${p}`) : null, t?.stale ? i("div", { style: a.warnBox }, "Showing cached catalog — upstream hub index is currently unreachable.") : null, d ? i("div", { style: a.warnBox }, `Could not load installed extensions: ${d}. Showing catalog without install status.`) : null, i(g, {
		filter: b,
		onChange: S,
		onRefresh: T,
		refreshing: h,
		lastRefreshed: v
	}), h && !t ? i("div", { style: a.empty }, "Loading catalog…") : O.length === 0 ? i("div", { style: a.empty }, D.length === 0 ? "No extensions in the catalog." : "No extensions match the current filters.") : i("table", { style: a.table }, i("thead", null, i("tr", null, i("th", { style: {
		...a.th,
		...a.iconCell
	} }, ""), i("th", { style: a.th }, "Name"), i("th", { style: a.th }, "Type"), i("th", { style: a.th }, "Version"), i("th", { style: a.th }, "Categories"), i("th", { style: a.th }, "Maturity"))), i("tbody", null, ...O.map((e) => x({
		entry: e,
		onSelect: w
	})))), C ? i(N, {
		entry: C,
		onClose: () => w(null)
	}) : null);
}, F = (e) => {
	r(e), e.registerExtension({
		type: "sidebarItem",
		label: "Plugin Hub"
	}), e.registerExtension({
		type: "route",
		label: "Plugin Hub",
		component: P
	});
};
//#endregion
export { F as default };
