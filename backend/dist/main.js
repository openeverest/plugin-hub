//#region src/runtime.ts
var e, t;
function n(n) {
	e = n.React, t = n.fetch.bind(n);
}
var r = (t, n, ...r) => e.createElement(t, n, ...r), i = {
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
		whiteSpace: "pre",
		overflowX: "auto"
	}
};
//#endregion
//#region src/data.ts
async function a() {
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
async function o() {
	let e = await t("/api/installed");
	if (!e.ok) {
		let t = await e.text().catch(() => "");
		throw Error(t || `HTTP ${e.status}`);
	}
	return e.json();
}
function s(e, t) {
	return `${e}:${t}`;
}
//#endregion
//#region src/catalog.ts
function c(e, t) {
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
function l(e) {
	let t = e.artifacts?.chart;
	if (!t) return null;
	let n = t.defaultChannel ?? Object.keys(t.channels ?? {})[0];
	return n ? t.channels?.[n]?.version ?? null : null;
}
function u(e) {
	let t = e.artifacts?.chart, n = t?.defaultChannel ?? Object.keys(t?.channels ?? {})[0] ?? "", r = t?.channels?.[n]?.ref ?? "<chart-ref>", i = t?.channels?.[n]?.version ?? "<version>", a = e.install?.helm?.releaseName ?? e.name, o = e.install?.helm?.namespace ?? "everest-system";
	return [
		`helm install ${a} ${r} \\`,
		`  --version ${i} \\`,
		`  -n ${o}`
	].join("\n");
}
function d(e) {
	return e.replace(/^v/i, "").split(/[-+]/)[0].split(".").map((e) => parseInt(e, 10) || 0);
}
function f(e, t) {
	if (!e || !t) return !1;
	let n = d(e), r = d(t);
	for (let e = 0; e < Math.max(n.length, r.length); e++) {
		let t = n[e] || 0, i = r[e] || 0;
		if (i > t) return !0;
		if (i < t) return !1;
	}
	return !1;
}
function p(e) {
	let t = e.artifacts?.chart, n = t?.defaultChannel ?? Object.keys(t?.channels ?? {})[0] ?? "", r = t?.channels?.[n]?.ref ?? "<chart-ref>", i = t?.channels?.[n]?.version ?? "<version>", a = e.install?.helm?.releaseName ?? e.name, o = e.install?.helm?.namespace ?? "everest-system";
	return [
		`helm upgrade ${a} ${r} \\`,
		`  --version ${i} \\`,
		`  -n ${o}`
	].join("\n");
}
//#endregion
//#region src/components/Toolbar.ts
function m(e) {
	let { filter: t, onChange: n, onRefresh: a, refreshing: o, lastRefreshed: s } = e;
	return r("div", { style: i.toolbar }, r("input", {
		type: "search",
		placeholder: "Search by name, description, category…",
		value: t.query,
		style: i.input,
		onChange: (e) => n({
			...t,
			query: e.target.value
		})
	}), r("div", { style: i.chipGroup }, ...[
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
	].map((e) => r("button", {
		key: e.key,
		type: "button",
		style: i.chip(t.type === e.key),
		onClick: () => n({
			...t,
			type: e.key
		})
	}, e.label))), r("label", { style: i.checkboxRow }, r("input", {
		type: "checkbox",
		checked: t.installedOnly,
		onChange: (e) => n({
			...t,
			installedOnly: e.target.checked
		})
	}), "Installed only"), r("label", { style: i.checkboxRow }, r("input", {
		type: "checkbox",
		checked: !t.hideGated,
		onChange: (e) => n({
			...t,
			hideGated: !e.target.checked
		})
	}), "Include gated"), r("button", {
		type: "button",
		style: i.refreshBtn,
		onClick: a,
		disabled: o
	}, o ? "Refreshing…" : "Refresh"), s ? r("span", { style: {
		fontSize: "0.75rem",
		color: "#6b7280"
	} }, `Updated ${s.toLocaleTimeString()}`) : null);
}
//#endregion
//#region src/icons.ts
var h = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%25239ca3af'%20stroke-width%3D'1.75'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Crect%20x%3D'3'%20y%3D'3'%20width%3D'18'%20height%3D'18'%20rx%3D'3'%2F%3E%3Cpath%20d%3D'M3%209h18M9%203v18'%2F%3E%3C%2Fsvg%3E", g = /* @__PURE__ */ new Set();
function _(e, t) {
	return e ? e.startsWith("data:") || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("/") ? e : t ? `/v1/plugins/${t}/${e}` : h : h;
}
function v(e) {
	return r("img", {
		src: g.has(e.src) ? h : e.src,
		alt: e.alt ?? "",
		style: e.style,
		onError: (t) => {
			let n = t.currentTarget;
			n.dataset.failed !== "1" && (n.dataset.failed = "1", g.add(e.src), n.src !== "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%25239ca3af'%20stroke-width%3D'1.75'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Crect%20x%3D'3'%20y%3D'3'%20width%3D'18'%20height%3D'18'%20rx%3D'3'%2F%3E%3Cpath%20d%3D'M3%209h18M9%203v18'%2F%3E%3C%2Fsvg%3E" && (n.src = h));
		}
	});
}
//#endregion
//#region src/components/Row.ts
function y(e) {
	let { entry: t, pluginName: n, onSelect: a } = e, o = l(t);
	return r("tr", {
		key: t.name,
		style: { cursor: "pointer" },
		onClick: () => a(t)
	}, r("td", { style: {
		...i.td,
		...i.iconCell
	} }, r(v, {
		src: _(t.icon, n),
		style: i.iconImg
	})), r("td", { style: i.td }, r("div", { style: { fontWeight: 600 } }, t.displayName || t.name), r("div", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem",
		marginTop: 2
	} }, t.name)), r("td", { style: i.td }, r("span", { style: i.typeChip(t.type) }, t.type)), r("td", { style: i.td }, o ?? "—"), r("td", { style: i.td }, ...(t.categories ?? []).map((e) => r("span", {
		key: e,
		style: i.categoryTag
	}, e))), r("td", { style: i.td }, r("div", { style: {
		display: "flex",
		flexDirection: "column",
		gap: 4,
		alignItems: "flex-start"
	} }, r("span", { style: i.maturityChip(t.maturity || "unknown") }, t.maturity || "unknown"), t.access === "gated" ? r("span", { style: i.gatedChip }, "Gated") : null, t.installed ? r("span", { style: f(t.installedVersion, o) ? i.statusOutdated : i.statusInstalled }, f(t.installedVersion, o) ? `Update available · ${t.installedVersion} → ${o}` : t.installedVersion ? `Installed · ${t.installedVersion}` : "Installed") : null)));
}
//#endregion
//#region src/components/Drawer.ts
function b(e) {
	return e.replace(/[._-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (e) => e.toUpperCase());
}
function x(e, t) {
	let n = b(e);
	return typeof t == "boolean" ? t ? r("span", {
		key: e,
		style: i.capChipYes
	}, `\u2713 ${n}`) : r("span", {
		key: e,
		style: i.capChipNo
	}, `\u2717 ${n}`) : Array.isArray(t) ? r("div", {
		key: e,
		style: i.capRow
	}, r("span", { style: i.capKey }, n), r("div", null, ...t.map((e, t) => r("span", {
		key: t,
		style: i.categoryTag
	}, String(e))))) : t == null ? null : typeof t == "object" ? r("div", {
		key: e,
		style: i.capRow
	}, r("span", { style: i.capKey }, n), r("code", { style: {
		fontSize: "0.8125rem",
		color: "#374151"
	} }, JSON.stringify(t))) : r("div", {
		key: e,
		style: i.capRow
	}, r("span", { style: i.capKey }, n), r("span", { style: { color: "#111827" } }, String(t)));
}
function S(e) {
	let t = Object.entries(e);
	if (!t.length) return null;
	let n = t.filter(([, e]) => typeof e == "boolean"), i = t.filter(([, e]) => typeof e != "boolean");
	return r("div", null, n.length ? r("div", { style: { marginBottom: i.length ? "0.75rem" : 0 } }, ...n.map(([e, t]) => x(e, t))) : null, i.length ? r("div", null, ...i.map(([e, t]) => x(e, t))) : null);
}
function C() {
	if (typeof document > "u") return 64;
	let e = document.querySelector("header.MuiAppBar-root");
	if (!e) return 64;
	let t = Math.round(e.getBoundingClientRect().height);
	return t > 0 ? t : 64;
}
function w() {
	let [t, n] = e.useState(C);
	return e.useEffect(() => {
		let e = () => n(C());
		return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), t;
}
function T(e) {
	let { entry: t, pluginName: n, onClose: a } = e, o = t.access === "gated", s = o ? null : l(t), c = o ? null : u(t), d = t.installed && f(t.installedVersion, s), m = d ? p(t) : null, h = t.plugin?.extensionPoints ?? [], g = t.provider?.supportedEngines ?? [], y = t.maintainers ?? [], b = w();
	return r("div", {
		style: {
			...i.drawerBackdrop,
			top: b
		},
		onClick: a
	}, r("div", {
		style: i.drawer,
		onClick: (e) => e.stopPropagation()
	}, r("div", { style: i.drawerHeader }, r(v, {
		src: _(t.icon, n),
		style: {
			width: 40,
			height: 40
		}
	}), r("div", null, r("h2", { style: {
		margin: 0,
		fontSize: "1.25rem",
		fontWeight: 600
	} }, t.displayName || t.name), r("div", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem"
	} }, t.name, " · ", r("span", { style: i.typeChip(t.type) }, t.type), o ? r("span", { style: {
		...i.gatedChip,
		marginLeft: 6
	} }, "Gated") : null)), r("button", {
		type: "button",
		style: i.closeBtn,
		onClick: a
	}, "×")), t.installed ? r("div", { style: { marginBottom: "1rem" } }, r("span", { style: i.statusInstalled }, t.installedVersion ? `Installed · ${t.installedVersion}` : "Installed"), t.installedPhase ? r("span", { style: {
		marginLeft: 8,
		color: "#6b7280",
		fontSize: "0.8125rem"
	} }, `Phase: ${t.installedPhase}`) : null) : null, t.description ? r("p", { style: {
		color: "#374151",
		whiteSpace: "pre-line"
	} }, t.description) : null, r("div", { style: i.section }, r("h3", { style: i.sectionTitle }, "Metadata"), r("div", { style: {
		fontSize: "0.875rem",
		lineHeight: 1.7
	} }, s ? r("div", null, r("b", null, "Version: "), s) : null, t.maturity ? r("div", null, r("b", null, "Maturity: "), r("span", { style: i.maturityChip(t.maturity) }, t.maturity)) : null, t.compatibility?.openeverest ? r("div", null, r("b", null, "Requires OpenEverest: "), t.compatibility.openeverest) : null, t.license ? r("div", null, r("b", null, "License: "), t.license) : null, t.verified ? r("div", null, r("b", null, "Verified: "), "yes") : null)), h.length ? r("div", { style: i.section }, r("h3", { style: i.sectionTitle }, "Extension points"), r("div", null, ...h.map((e) => r("span", {
		key: e,
		style: i.categoryTag
	}, e)))) : null, g.length ? r("div", { style: i.section }, r("h3", { style: i.sectionTitle }, "Supported engines"), r("div", null, ...g.map((e) => r("span", {
		key: e,
		style: i.categoryTag
	}, e)))) : null, t.capabilities && Object.keys(t.capabilities).length ? r("div", { style: i.section }, r("h3", { style: i.sectionTitle }, "Capabilities"), S(t.capabilities)) : null, y.length ? r("div", { style: i.section }, r("h3", { style: i.sectionTitle }, "Maintainers"), r("ul", { style: {
		margin: 0,
		paddingLeft: "1.25rem",
		fontSize: "0.875rem"
	} }, ...y.map((e, t) => r("li", { key: t }, e.name || e.github || e.email || "unknown")))) : null, r("div", { style: i.section }, o ? r("div", null, r("h3", { style: i.sectionTitle }, "Access required"), r("p", { style: {
		color: "#374151",
		fontSize: "0.875rem",
		marginTop: 0
	} }, t.gated?.instructions || "This extension is not publicly available. Contact the vendor to request access."), t.gated?.provider ? r("p", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem",
		marginTop: "-0.5rem"
	} }, `Provided by ${t.gated.provider}`) : null, t.gated?.contactUrl ? r("a", {
		href: t.gated.contactUrl,
		target: "_blank",
		rel: "noopener noreferrer",
		style: i.ctaBtn
	}, "Contact vendor ↗") : r("div", { style: {
		color: "#6b7280",
		fontSize: "0.8125rem"
	} }, "No contact URL configured. See the source repository for details.")) : d ? r("div", null, r("div", { style: i.warnBox }, `A newer version (${s}) is available. Currently installed: ${t.installedVersion}`), r("h3", { style: i.sectionTitle }, "Upgrade with Helm"), r("pre", { style: i.codeBlock }, m)) : r("div", null, r("h3", { style: i.sectionTitle }, "Install with Helm"), r("pre", { style: i.codeBlock }, c))), r("div", { style: i.section }, r("div", { style: {
		display: "flex",
		gap: "0.75rem",
		flexWrap: "wrap"
	} }, t.sourceRepo ? r("a", {
		href: t.sourceRepo,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Source repository ↗") : null, t.homepage ? r("a", {
		href: t.homepage,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Homepage ↗") : null))));
}
//#endregion
//#region src/main.tsx
var E = (t) => {
	let [n, l] = e.useState(null), [u, d] = e.useState(null), [f, p] = e.useState(null), [h, g] = e.useState(null), [_, v] = e.useState(!0), [b, x] = e.useState(null), [S, C] = e.useState({
		query: "",
		type: "all",
		installedOnly: !1,
		hideGated: !1
	}), [w, E] = e.useState(null), D = e.useCallback(() => {
		v(!0), g(null), a().then((e) => {
			l(e), x(/* @__PURE__ */ new Date());
		}).catch((e) => g(e.message)).finally(() => v(!1)), d(null), p(null), o().then((e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.items ?? []) n?.name && t.set(s(n.type, n.name), n);
			d(t), e.error && p(e.error);
		}).catch((e) => {
			d(/* @__PURE__ */ new Map()), p(e.message);
		});
	}, []);
	e.useEffect(() => {
		D();
	}, [D]);
	let O = u === null, k = e.useMemo(() => {
		let e = n?.extensions ?? [];
		return u ? e.map((e) => {
			let t = u.get(s(e.type, e.name));
			return {
				...e,
				installed: !!t,
				installedVersion: t?.version || e.installedVersion
			};
		}) : e;
	}, [n, u]), A = k.filter((e) => c(e, S)), j = {
		total: k.length,
		plugin: k.filter((e) => e.type === "plugin").length,
		provider: k.filter((e) => e.type === "provider").length,
		installed: k.filter((e) => e.installed).length
	};
	return r("div", { style: i.page }, r("div", { style: i.headerRow }, r("div", null, r("h1", { style: i.title }, "The Hub"), r("p", { style: i.subtitle }, `Browse OpenEverest plugins and providers. ${j.total} available · ${O ? "checking installed…" : `${j.installed} installed`}.`)), r("div", { style: i.headerActions }, r("a", {
		href: "https://github.com/openeverest/hub",
		target: "_blank",
		rel: "noopener noreferrer",
		style: i.ctaBtn
	}, "Add extension"), r("a", {
		href: "https://github.com/openeverest/openeverest/issues/",
		target: "_blank",
		rel: "noopener noreferrer",
		style: i.ctaLink
	}, "Need other tech? →"))), h ? r("div", { style: i.errorBox }, `Failed to load catalog: ${h}`) : null, n?.stale ? r("div", { style: i.warnBox }, "Showing cached catalog — upstream hub index is currently unreachable.") : null, f ? r("div", { style: i.warnBox }, `Could not load installed extensions: ${f}. Showing catalog without install status.`) : null, r(m, {
		filter: S,
		onChange: C,
		onRefresh: D,
		refreshing: _,
		lastRefreshed: b
	}), _ && !n ? r("div", { style: i.empty }, "Loading catalog…") : A.length === 0 ? r("div", { style: i.empty }, k.length === 0 ? "No extensions in the catalog." : "No extensions match the current filters.") : r("table", { style: i.table }, r("thead", null, r("tr", null, r("th", { style: {
		...i.th,
		...i.iconCell
	} }, ""), r("th", { style: i.th }, "Name"), r("th", { style: i.th }, "Type"), r("th", { style: i.th }, "Version"), r("th", { style: i.th }, "Categories"), r("th", { style: i.th }, "Maturity"))), r("tbody", null, ...A.map((e) => y({
		entry: e,
		pluginName: t.pluginName,
		onSelect: E
	})))), w ? r(T, {
		entry: w,
		pluginName: t.pluginName,
		onClose: () => E(null)
	}) : null);
}, D = (e) => {
	n(e), e.registerExtension({
		type: "sidebarItem",
		label: "Plugin Hub"
	}), e.registerExtension({
		type: "route",
		label: "Plugin Hub",
		component: E
	});
};
//#endregion
export { D as default };
