let p, S;
const e = (l, t, ...r) => p.createElement(l, t, ...r), n = {
  page: { padding: "1.5rem", maxWidth: 1280, margin: "0 auto" },
  headerRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap"
  },
  title: { margin: 0, fontSize: "1.5rem", fontWeight: 600 },
  subtitle: { margin: 0, color: "#6b7280", fontSize: "0.875rem" },
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
  chipGroup: { display: "flex", gap: "0.25rem" },
  chip: (l) => ({
    padding: "0.4rem 0.75rem",
    fontSize: "0.8125rem",
    border: "1px solid " + (l ? "#1f2937" : "#d1d5db"),
    background: l ? "#1f2937" : "#fff",
    color: l ? "#fff" : "#374151",
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
  iconCell: { width: 40, padding: "0.75rem", textAlign: "center" },
  iconImg: { width: 28, height: 28, objectFit: "contain" },
  statusInstalled: {
    display: "inline-block",
    padding: "0.15rem 0.55rem",
    background: "#dcfce7",
    color: "#166534",
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
  typeChip: (l) => ({
    display: "inline-block",
    padding: "0.15rem 0.55rem",
    background: l === "provider" ? "#dbeafe" : "#ede9fe",
    color: l === "provider" ? "#1e3a8a" : "#5b21b6",
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
    inset: 0,
    background: "rgba(15, 23, 42, 0.4)",
    zIndex: 1e3,
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
}, x = "/v1/plugins/plugin-hub/icon.png";
async function C() {
  const l = await S("/api/summary");
  if (!l.ok) {
    const t = await l.text().catch(() => "");
    throw new Error(t || `HTTP ${l.status}`);
  }
  return l.json();
}
function R(l, t) {
  if (t.type !== "all" && l.type !== t.type || t.installedOnly && !l.installed) return !1;
  if (t.query) {
    const r = t.query.toLowerCase();
    if (![
      l.name,
      l.displayName ?? "",
      l.description ?? "",
      (l.categories ?? []).join(" "),
      (l.keywords ?? []).join(" ")
    ].join(" ").toLowerCase().includes(r)) return !1;
  }
  return !0;
}
function w(l) {
  var a, o, d;
  const t = (a = l.artifacts) == null ? void 0 : a.chart;
  if (!t) return null;
  const r = t.defaultChannel ?? Object.keys(t.channels ?? {})[0];
  return r ? ((d = (o = t.channels) == null ? void 0 : o[r]) == null ? void 0 : d.version) ?? null : null;
}
function z(l) {
  var s, f, g, y, i, b, h, m, v;
  const t = (s = l.artifacts) == null ? void 0 : s.chart, r = (t == null ? void 0 : t.defaultChannel) ?? Object.keys((t == null ? void 0 : t.channels) ?? {})[0] ?? "", a = ((g = (f = t == null ? void 0 : t.channels) == null ? void 0 : f[r]) == null ? void 0 : g.ref) ?? "<chart-ref>", o = ((i = (y = t == null ? void 0 : t.channels) == null ? void 0 : y[r]) == null ? void 0 : i.version) ?? "<version>", d = ((h = (b = l.install) == null ? void 0 : b.helm) == null ? void 0 : h.releaseName) ?? l.name, u = ((v = (m = l.install) == null ? void 0 : m.helm) == null ? void 0 : v.namespace) ?? "everest-system";
  return [
    `helm install ${d} ${a} \\`,
    `  --version ${o} \\`,
    `  -n ${u}`
  ].join(`
`);
}
function B(l) {
  const { filter: t, onChange: r, onRefresh: a, refreshing: o, lastRefreshed: d } = l, u = [
    { key: "all", label: "All" },
    { key: "plugin", label: "Plugins" },
    { key: "provider", label: "Providers" }
  ];
  return e(
    "div",
    { style: n.toolbar },
    e("input", {
      type: "search",
      placeholder: "Search by name, description, category…",
      value: t.query,
      style: n.input,
      onChange: (s) => r({ ...t, query: s.target.value })
    }),
    e(
      "div",
      { style: n.chipGroup },
      ...u.map(
        (s) => e(
          "button",
          {
            key: s.key,
            type: "button",
            style: n.chip(t.type === s.key),
            onClick: () => r({ ...t, type: s.key })
          },
          s.label
        )
      )
    ),
    e(
      "label",
      { style: n.checkboxRow },
      e("input", {
        type: "checkbox",
        checked: t.installedOnly,
        onChange: (s) => r({ ...t, installedOnly: s.target.checked })
      }),
      "Installed only"
    ),
    e(
      "button",
      {
        type: "button",
        style: n.refreshBtn,
        onClick: a,
        disabled: o
      },
      o ? "Refreshing…" : "Refresh"
    ),
    d ? e(
      "span",
      { style: { fontSize: "0.75rem", color: "#6b7280" } },
      `Updated ${d.toLocaleTimeString()}`
    ) : null
  );
}
function T(l) {
  const { entry: t, onSelect: r } = l, a = w(t);
  return e(
    "tr",
    {
      key: t.name,
      style: { cursor: "pointer" },
      onClick: () => r(t)
    },
    e(
      "td",
      { style: { ...n.td, ...n.iconCell } },
      e("img", {
        src: t.icon || x,
        alt: "",
        style: n.iconImg,
        onError: (o) => {
          o.currentTarget.src = x;
        }
      })
    ),
    e(
      "td",
      { style: n.td },
      e("div", { style: { fontWeight: 600 } }, t.displayName || t.name),
      e(
        "div",
        { style: { color: "#6b7280", fontSize: "0.8125rem", marginTop: 2 } },
        t.name
      )
    ),
    e("td", { style: n.td }, e("span", { style: n.typeChip(t.type) }, t.type)),
    e("td", { style: n.td }, a ?? "—"),
    e(
      "td",
      { style: n.td },
      ...(t.categories ?? []).map(
        (o) => e("span", { key: o, style: n.categoryTag }, o)
      )
    ),
    e(
      "td",
      { style: n.td },
      t.installed ? e(
        "span",
        { style: n.statusInstalled },
        t.installedVersion ? `Installed · ${t.installedVersion}` : "Installed"
      ) : e("span", { style: n.statusAvailable }, "Available")
    )
  );
}
function I(l) {
  var f, g, y;
  const { entry: t, onClose: r } = l, a = w(t), o = z(t), d = ((f = t.plugin) == null ? void 0 : f.extensionPoints) ?? [], u = ((g = t.provider) == null ? void 0 : g.supportedEngines) ?? [], s = t.maintainers ?? [];
  return e(
    "div",
    { style: n.drawerBackdrop, onClick: r },
    e(
      "div",
      {
        style: n.drawer,
        onClick: (i) => i.stopPropagation()
      },
      e(
        "div",
        { style: n.drawerHeader },
        e("img", { src: t.icon || x, alt: "", style: { width: 40, height: 40 } }),
        e(
          "div",
          null,
          e(
            "h2",
            { style: { margin: 0, fontSize: "1.25rem", fontWeight: 600 } },
            t.displayName || t.name
          ),
          e(
            "div",
            { style: { color: "#6b7280", fontSize: "0.8125rem" } },
            t.name,
            " · ",
            e("span", { style: n.typeChip(t.type) }, t.type)
          )
        ),
        e("button", { type: "button", style: n.closeBtn, onClick: r }, "×")
      ),
      t.installed ? e(
        "div",
        { style: { marginBottom: "1rem" } },
        e(
          "span",
          { style: n.statusInstalled },
          t.installedVersion ? `Installed · ${t.installedVersion}` : "Installed"
        ),
        t.installedPhase ? e(
          "span",
          { style: { marginLeft: 8, color: "#6b7280", fontSize: "0.8125rem" } },
          `Phase: ${t.installedPhase}`
        ) : null
      ) : e("div", { style: { marginBottom: "1rem" } }, e("span", { style: n.statusAvailable }, "Available")),
      t.description ? e(
        "p",
        { style: { color: "#374151", whiteSpace: "pre-line" } },
        t.description
      ) : null,
      e(
        "div",
        { style: n.section },
        e("h3", { style: n.sectionTitle }, "Metadata"),
        e(
          "div",
          { style: { fontSize: "0.875rem", lineHeight: 1.7 } },
          a ? e("div", null, e("b", null, "Version: "), a) : null,
          (y = t.compatibility) != null && y.openeverest ? e("div", null, e("b", null, "Requires OpenEverest: "), t.compatibility.openeverest) : null,
          t.license ? e("div", null, e("b", null, "License: "), t.license) : null,
          t.verified ? e("div", null, e("b", null, "Verified: "), "yes") : null
        )
      ),
      d.length ? e(
        "div",
        { style: n.section },
        e("h3", { style: n.sectionTitle }, "Extension points"),
        e(
          "div",
          null,
          ...d.map((i) => e("span", { key: i, style: n.categoryTag }, i))
        )
      ) : null,
      u.length ? e(
        "div",
        { style: n.section },
        e("h3", { style: n.sectionTitle }, "Supported engines"),
        e(
          "div",
          null,
          ...u.map((i) => e("span", { key: i, style: n.categoryTag }, i))
        )
      ) : null,
      s.length ? e(
        "div",
        { style: n.section },
        e("h3", { style: n.sectionTitle }, "Maintainers"),
        e(
          "ul",
          { style: { margin: 0, paddingLeft: "1.25rem", fontSize: "0.875rem" } },
          ...s.map(
            (i, b) => e("li", { key: b }, i.name || i.github || i.email || "unknown")
          )
        )
      ) : null,
      e(
        "div",
        { style: n.section },
        e("h3", { style: n.sectionTitle }, "Install with Helm"),
        e("pre", { style: n.codeBlock }, o)
      ),
      e(
        "div",
        { style: n.section },
        e(
          "div",
          { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" } },
          t.sourceRepo ? e(
            "a",
            { href: t.sourceRepo, target: "_blank", rel: "noopener noreferrer" },
            "Source repository ↗"
          ) : null,
          t.homepage ? e(
            "a",
            { href: t.homepage, target: "_blank", rel: "noopener noreferrer" },
            "Homepage ↗"
          ) : null
        )
      )
    )
  );
}
const E = (l) => {
  const [t, r] = p.useState(null), [a, o] = p.useState(null), [d, u] = p.useState(!0), [s, f] = p.useState(null), [g, y] = p.useState({
    query: "",
    type: "all",
    installedOnly: !1
  }), [i, b] = p.useState(null), h = p.useCallback(() => {
    u(!0), o(null), C().then((c) => {
      r(c), f(/* @__PURE__ */ new Date());
    }).catch((c) => o(c.message)).finally(() => u(!1));
  }, []);
  p.useEffect(() => {
    h();
  }, [h]);
  const m = (t == null ? void 0 : t.extensions) ?? [], v = m.filter((c) => R(c, g)), k = {
    total: m.length,
    plugin: m.filter((c) => c.type === "plugin").length,
    provider: m.filter((c) => c.type === "provider").length,
    installed: m.filter((c) => c.installed).length
  };
  return e(
    "div",
    { style: n.page },
    e(
      "div",
      { style: n.headerRow },
      e(
        "div",
        null,
        e("h1", { style: n.title }, "Plugin Hub"),
        e(
          "p",
          { style: n.subtitle },
          `Browse OpenEverest plugins and providers. ${k.total} available · ${k.installed} installed.`
        )
      ),
      l.pluginName ? e(
        "span",
        { style: { fontSize: "0.75rem", color: "#9ca3af" } },
        `plugin: ${l.pluginName}`
      ) : null
    ),
    a ? e("div", { style: n.errorBox }, `Failed to load catalog: ${a}`) : null,
    t != null && t.stale ? e(
      "div",
      { style: n.warnBox },
      "Showing cached catalog — upstream hub index is currently unreachable."
    ) : null,
    t != null && t.installedError ? e(
      "div",
      { style: n.warnBox },
      `Could not load installed extensions: ${t.installedError}. Showing catalog without install status.`
    ) : null,
    e(B, {
      filter: g,
      onChange: y,
      onRefresh: h,
      refreshing: d,
      lastRefreshed: s
    }),
    d && !t ? e("div", { style: n.empty }, "Loading catalog…") : v.length === 0 ? e(
      "div",
      { style: n.empty },
      m.length === 0 ? "No extensions in the catalog." : "No extensions match the current filters."
    ) : e(
      "table",
      { style: n.table },
      e(
        "thead",
        null,
        e(
          "tr",
          null,
          e("th", { style: { ...n.th, ...n.iconCell } }, ""),
          e("th", { style: n.th }, "Name"),
          e("th", { style: n.th }, "Type"),
          e("th", { style: n.th }, "Version"),
          e("th", { style: n.th }, "Categories"),
          e("th", { style: n.th }, "Status")
        )
      ),
      e("tbody", null, ...v.map((c) => T({ entry: c, onSelect: b })))
    ),
    i ? e(I, { entry: i, onClose: () => b(null) }) : null
  );
}, $ = (l) => {
  p = l.React, S = l.fetch.bind(l), l.registerExtension({
    type: "sidebarItem",
    label: "Plugin Hub"
  }), l.registerExtension({
    type: "route",
    label: "Plugin Hub",
    component: E
  });
};
export {
  $ as default
};
