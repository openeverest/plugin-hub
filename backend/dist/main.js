import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as n from "react";
import r, { Children as i, cloneElement as a, forwardRef as o, isValidElement as s, useContext as c, useEffect as l, useMemo as u, useState as d } from "react";
import * as f from "react-dom";
import p from "react-dom";
//#region \0rolldown/runtime.js
var m = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), h, g, _, v;
function y(e) {
	h = e.React, g = e.fetch.bind(e), _ = e.basePath, v = e.cssNonce;
}
var b = (e, t, ...n) => h.createElement(e, t, ...n), x = {
	page: {
		p: 3,
		maxWidth: 1280,
		mx: "auto"
	},
	headerRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 2,
		mb: 2,
		flexWrap: "wrap"
	},
	headerActions: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		gap: .75
	},
	primaryAction: {
		borderRadius: 128,
		px: 1.5,
		py: 1
	},
	subtitle: { color: "text.secondary" },
	toolbar: {
		display: "flex",
		gap: 1.5,
		alignItems: "center",
		flexWrap: "wrap",
		p: 1.5,
		bgcolor: "background.paper",
		border: 1,
		borderColor: "divider",
		borderRadius: 1,
		mb: 2
	},
	empty: {
		p: 6,
		textAlign: "center",
		color: "text.secondary"
	},
	section: { mt: 2.5 },
	sectionTitle: {
		textTransform: "uppercase",
		color: "text.secondary",
		letterSpacing: "0.05em",
		fontSize: "0.75rem",
		mb: 1
	},
	codeBlock: {
		bgcolor: "grey.900",
		color: "grey.100",
		p: 1.5,
		borderRadius: 1,
		fontFamily: "monospace",
		fontSize: "0.8125rem",
		whiteSpace: "pre-wrap",
		overflowWrap: "anywhere"
	},
	codeBlockWrap: {
		position: "relative",
		"&:hover .copy-btn": { opacity: 1 }
	},
	copyBtn: {
		position: "absolute",
		top: 4,
		right: 4,
		color: "grey.100",
		opacity: 0,
		transition: "opacity 0.15s ease"
	},
	prereqList: {
		display: "flex",
		flexDirection: "column",
		gap: 1
	},
	prereqCard: {
		px: 1.5,
		py: 1.25
	},
	prereqHead: {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "space-between",
		gap: 1
	},
	prereqSummary: {
		display: "block",
		cursor: "pointer",
		color: "primary.main",
		mt: 1,
		userSelect: "none"
	},
	iconImg: {
		width: 28,
		height: 28,
		objectFit: "contain"
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		gap: 1.5,
		mb: 2
	},
	capRow: {
		display: "flex",
		gap: 1,
		alignItems: "baseline",
		mb: .5,
		flexWrap: "wrap"
	},
	capKey: {
		color: "text.secondary",
		fontWeight: 500,
		minWidth: 120
	}
};
function S(e) {
	return e.toLowerCase() === "deprecated" ? "error" : "default";
}
function C(e) {
	return e === "provider" ? "info" : "secondary";
}
//#endregion
//#region node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
function w(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function T(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var E = /*#__PURE__*/ function() {
	function e(e) {
		var t = this;
		this._insertTag = function(e) {
			var n = t.tags.length === 0 ? t.insertionPoint ? t.insertionPoint.nextSibling : t.prepend ? t.container.firstChild : t.before : t.tags[t.tags.length - 1].nextSibling;
			t.container.insertBefore(e, n), t.tags.push(e);
		}, this.isSpeedy = e.speedy === void 0 || e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
	}
	var t = e.prototype;
	return t.hydrate = function(e) {
		e.forEach(this._insertTag);
	}, t.insert = function(e) {
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(T(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = w(t);
			try {
				n.insertRule(e, n.cssRules.length);
			} catch {}
		} else t.appendChild(document.createTextNode(e));
		this.ctr++;
	}, t.flush = function() {
		this.tags.forEach(function(e) {
			return e.parentNode?.removeChild(e);
		}), this.tags = [], this.ctr = 0;
	}, e;
}(), D = "-ms-", O = "-moz-", k = "-webkit-", A = "comm", j = "rule", M = "decl", N = "@import", P = "@keyframes", F = "@layer", ee = Math.abs, I = String.fromCharCode, te = Object.assign;
function L(e, t) {
	return z(e, 0) ^ 45 ? (((t << 2 ^ z(e, 0)) << 2 ^ z(e, 1)) << 2 ^ z(e, 2)) << 2 ^ z(e, 3) : 0;
}
function ne(e) {
	return e.trim();
}
function re(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function R(e, t, n) {
	return e.replace(t, n);
}
function ie(e, t) {
	return e.indexOf(t);
}
function z(e, t) {
	return e.charCodeAt(t) | 0;
}
function ae(e, t, n) {
	return e.slice(t, n);
}
function oe(e) {
	return e.length;
}
function se(e) {
	return e.length;
}
function ce(e, t) {
	return t.push(e), e;
}
function le(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var ue = 1, de = 1, B = 0, V = 0, H = 0, fe = "";
function pe(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: ue,
		column: de,
		length: o,
		return: ""
	};
}
function me(e, t) {
	return te(pe("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function he() {
	return H;
}
function ge() {
	return H = V > 0 ? z(fe, --V) : 0, de--, H === 10 && (de = 1, ue--), H;
}
function _e() {
	return H = V < B ? z(fe, V++) : 0, de++, H === 10 && (de = 1, ue++), H;
}
function ve() {
	return z(fe, V);
}
function ye() {
	return V;
}
function be(e, t) {
	return ae(fe, e, t);
}
function xe(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function Se(e) {
	return ue = de = 1, B = oe(fe = e), V = 0, [];
}
function Ce(e) {
	return fe = "", e;
}
function we(e) {
	return ne(be(V - 1, De(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Te(e) {
	for (; (H = ve()) && H < 33;) _e();
	return xe(e) > 2 || xe(H) > 3 ? "" : " ";
}
function Ee(e, t) {
	for (; --t && _e() && !(H < 48 || H > 102 || H > 57 && H < 65 || H > 70 && H < 97););
	return be(e, ye() + (t < 6 && ve() == 32 && _e() == 32));
}
function De(e) {
	for (; _e();) switch (H) {
		case e: return V;
		case 34:
		case 39:
			e !== 34 && e !== 39 && De(H);
			break;
		case 40:
			e === 41 && De(e);
			break;
		case 92:
			_e();
			break;
	}
	return V;
}
function Oe(e, t) {
	for (; _e() && e + H !== 57 && (e + H !== 84 || ve() !== 47););
	return "/*" + be(t, V - 1) + "*" + I(e === 47 ? e : _e());
}
function ke(e) {
	for (; !xe(ve());) _e();
	return be(e, V);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function Ae(e) {
	return Ce(je("", null, null, null, [""], e = Se(e), 0, [0], e));
}
function je(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = _e()) {
		case 40: if (m != 108 && z(C, d - 1) == 58) {
			ie(C += R(we(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += we(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += Te(m);
			break;
		case 92:
			C += Ee(ye() - 1, 7);
			continue;
		case 47:
			switch (ve()) {
				case 42:
				case 47:
					ce(Ne(Oe(_e(), ye()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = oe(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = R(C, /\f/g, "")), p > 0 && oe(C) - d && ce(p > 32 ? Pe(C + ";", r, n, d - 1) : Pe(R(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (ce(S = Me(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) {
					if (u === 0) je(C, t, S, S, b, a, d, s, x);
					else switch (f === 99 && z(C, 3) === 110 ? 100 : f) {
						case 100:
						case 108:
						case 109:
						case 115:
							je(e, S, S, r && ce(Me(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
							break;
						default: je(C, S, S, S, [""], x, 0, s, x);
					}
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + oe(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && ge() == 125) continue;
			}
			switch (C += I(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (oe(C) - 1) * _, _ = 1;
					break;
				case 64:
					ve() === 45 && (C += we(_e())), f = ve(), u = d = oe(y = C += ke(ye())), v++;
					break;
				case 45: m === 45 && oe(C) == 2 && (h = 0);
			}
	}
	return a;
}
function Me(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = se(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = ae(e, d + 1, d = ee(h = o[m])), y = e; _ < p; ++_) (y = ne(h > 0 ? f[_] + " " + v : R(v, /&\f/g, f[_]))) && (c[g++] = y);
	return pe(e, t, n, i === 0 ? j : s, c, l, u);
}
function Ne(e, t, n) {
	return pe(e, t, n, A, I(he()), ae(e, 2, -2), 0);
}
function Pe(e, t, n, r) {
	return pe(e, t, n, M, ae(e, 0, r), ae(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Fe(e, t) {
	for (var n = "", r = se(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Ie(e, t, n, r) {
	switch (e.type) {
		case F: if (e.children.length) break;
		case N:
		case M: return e.return = e.return || e.value;
		case A: return "";
		case P: return e.return = e.value + "{" + Fe(e.children, r) + "}";
		case j: e.value = e.props.join(",");
	}
	return oe(n = Fe(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Le(e) {
	var t = se(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Re(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function ze(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Be = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = ve(), r === 38 && i === 12 && (t[n] = 1), !xe(i);) _e();
	return be(e, V);
}, Ve = function(e, t) {
	var n = -1, r = 44;
	do
		switch (xe(r)) {
			case 0:
				r === 38 && ve() === 12 && (t[n] = 1), e[n] += Be(V - 1, t, n);
				break;
			case 2:
				e[n] += we(r);
				break;
			case 4: if (r === 44) {
				e[++n] = ve() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += I(r);
		}
	while (r = _e());
	return e;
}, He = function(e, t) {
	return Ce(Ve(Se(e), t));
}, Ue = /* #__PURE__ */ new WeakMap(), We = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !Ue.get(n)) && !r) {
			Ue.set(e, !0);
			for (var i = [], a = He(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, Ge = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Ke(e, t) {
	switch (L(e, t)) {
		case 5103: return k + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return k + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return k + e + O + e + D + e + e;
		case 6828:
		case 4268: return k + e + D + e + e;
		case 6165: return k + e + D + "flex-" + e + e;
		case 5187: return k + e + R(e, /(\w+).+(:[^]+)/, k + "box-$1$2" + D + "flex-$1$2") + e;
		case 5443: return k + e + D + "flex-item-" + R(e, /flex-|-self/, "") + e;
		case 4675: return k + e + D + "flex-line-pack" + R(e, /align-content|flex-|-self/, "") + e;
		case 5548: return k + e + D + R(e, "shrink", "negative") + e;
		case 5292: return k + e + D + R(e, "basis", "preferred-size") + e;
		case 6060: return k + "box-" + R(e, "-grow", "") + k + e + D + R(e, "grow", "positive") + e;
		case 4554: return k + R(e, /([^-])(transform)/g, "$1" + k + "$2") + e;
		case 6187: return R(R(R(e, /(zoom-|grab)/, k + "$1"), /(image-set)/, k + "$1"), e, "") + e;
		case 5495:
		case 3959: return R(e, /(image-set\([^]*)/, k + "$1$`$1");
		case 4968: return R(R(e, /(.+:)(flex-)?(.*)/, k + "box-pack:$3" + D + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + k + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return R(e, /(.+)-inline(.+)/, k + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (oe(e) - 1 - t > 6) switch (z(e, t + 1)) {
				case 109: if (z(e, t + 4) !== 45) break;
				case 102: return R(e, /(.+:)(.+)-([^]+)/, "$1" + k + "$2-$3$1" + O + (z(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~ie(e, "stretch") ? Ke(R(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (z(e, t + 1) !== 115) break;
		case 6444:
			switch (z(e, oe(e) - 3 - (~ie(e, "!important") && 10))) {
				case 107: return R(e, ":", ":" + k) + e;
				case 101: return R(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + k + (z(e, 14) === 45 ? "inline-" : "") + "box$3$1" + k + "$2$3$1" + D + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (z(e, t + 11)) {
				case 114: return k + e + D + R(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return k + e + D + R(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return k + e + D + R(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return k + e + D + e + e;
	}
	return e;
}
var qe = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case M:
			e.return = Ke(e.value, e.length);
			break;
		case P: return Fe([me(e, { value: R(e.value, "@", "@" + k) })], r);
		case j: if (e.length) return le(e.props, function(t) {
			switch (re(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return Fe([me(e, { props: [R(t, /:(read-\w+)/, ":" + O + "$1")] })], r);
				case "::placeholder": return Fe([
					me(e, { props: [R(t, /:(plac\w+)/, ":" + k + "input-$1")] }),
					me(e, { props: [R(t, /:(plac\w+)/, ":" + O + "$1")] }),
					me(e, { props: [R(t, /:(plac\w+)/, D + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Je = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || qe, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [We, Ge], l, u = [Ie, Re(function(e) {
		l.insert(e);
	})], d = Le(c.concat(r, u)), f = function(e) {
		return Fe(Ae(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new E({
			key: t,
			container: a,
			nonce: e.nonce,
			speedy: e.speedy,
			prepend: e.prepend,
			insertionPoint: e.insertionPoint
		}),
		nonce: e.nonce,
		inserted: i,
		registered: {},
		insert: s
	};
	return p.sheet.hydrate(o), p;
};
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/extends.js
function Ye() {
	return Ye = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ye.apply(null, arguments);
}
//#endregion
//#region node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js
var Xe = /* @__PURE__ */ m(((e) => {
	var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
	function b(e) {
		if (typeof e == "object" && e) {
			var t = e.$$typeof;
			switch (t) {
				case n: switch (e = e.type, e) {
					case l:
					case u:
					case i:
					case o:
					case a:
					case f: return e;
					default: switch (e &&= e.$$typeof, e) {
						case c:
						case d:
						case h:
						case m:
						case s: return e;
						default: return t;
					}
				}
				case r: return t;
			}
		}
	}
	function x(e) {
		return b(e) === u;
	}
	e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) {
		return x(e) || b(e) === l;
	}, e.isConcurrentMode = x, e.isContextConsumer = function(e) {
		return b(e) === c;
	}, e.isContextProvider = function(e) {
		return b(e) === s;
	}, e.isElement = function(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}, e.isForwardRef = function(e) {
		return b(e) === d;
	}, e.isFragment = function(e) {
		return b(e) === i;
	}, e.isLazy = function(e) {
		return b(e) === h;
	}, e.isMemo = function(e) {
		return b(e) === m;
	}, e.isPortal = function(e) {
		return b(e) === r;
	}, e.isProfiler = function(e) {
		return b(e) === o;
	}, e.isStrictMode = function(e) {
		return b(e) === a;
	}, e.isSuspense = function(e) {
		return b(e) === f;
	}, e.isValidElementType = function(e) {
		return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
	}, e.typeOf = b;
})), Ze = /* @__PURE__ */ m(((e, t) => {
	t.exports = Xe();
})), Qe = /* @__PURE__ */ m(((e, t) => {
	var n = Ze(), r = {
		childContextTypes: !0,
		contextType: !0,
		contextTypes: !0,
		defaultProps: !0,
		displayName: !0,
		getDefaultProps: !0,
		getDerivedStateFromError: !0,
		getDerivedStateFromProps: !0,
		mixins: !0,
		propTypes: !0,
		type: !0
	}, i = {
		name: !0,
		length: !0,
		prototype: !0,
		caller: !0,
		callee: !0,
		arguments: !0,
		arity: !0
	}, a = {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	}, o = {
		$$typeof: !0,
		compare: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0,
		type: !0
	}, s = {};
	s[n.ForwardRef] = a, s[n.Memo] = o;
	function c(e) {
		return n.isMemo(e) ? o : s[e.$$typeof] || r;
	}
	var l = Object.defineProperty, u = Object.getOwnPropertyNames, d = Object.getOwnPropertySymbols, f = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, m = Object.prototype;
	function h(e, t, n) {
		if (typeof t != "string") {
			if (m) {
				var r = p(t);
				r && r !== m && h(e, r, n);
			}
			var a = u(t);
			d && (a = a.concat(d(t)));
			for (var o = c(e), s = c(t), g = 0; g < a.length; ++g) {
				var _ = a[g];
				if (!i[_] && !(n && n[_]) && !(s && s[_]) && !(o && o[_])) {
					var v = f(t, _);
					try {
						l(e, _, v);
					} catch {}
				}
			}
		}
		return e;
	}
	t.exports = h;
}));
//#endregion
//#region node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function $e(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var et = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, tt = function(e, t, n) {
	et(e, t, n);
	var r = e.key + "-" + t.name;
	if (e.inserted[t.name] === void 0) {
		var i = t;
		do
			e.insert(t === i ? "." + r : "", i, e.sheet, !0), i = i.next;
		while (i !== void 0);
	}
};
//#endregion
//#region node_modules/@emotion/hash/dist/emotion-hash.esm.js
function nt(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
//#endregion
//#region node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var rt = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
}, it = /[A-Z]|^ms/g, at = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ot = function(e) {
	return e.charCodeAt(1) === 45;
}, st = function(e) {
	return e != null && typeof e != "boolean";
}, ct = /* #__PURE__ */ ze(function(e) {
	return ot(e) ? e : e.replace(it, "-$&").toLowerCase();
}), lt = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(at, function(e, t, n) {
			return pt = {
				name: t,
				styles: n,
				next: pt
			}, t;
		});
	}
	return rt[e] !== 1 && !ot(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function ut(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return pt = {
				name: i.name,
				styles: i.styles,
				next: pt
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) pt = {
					name: o.name,
					styles: o.styles,
					next: pt
				}, o = o.next;
				return a.styles + ";";
			}
			return dt(e, t, n);
		case "function": if (e !== void 0) {
			var s = pt, c = n(e);
			return pt = s, ut(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function dt(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += ut(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : st(s) && (r += ct(a) + ":" + lt(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) st(o[c]) && (r += ct(a) + ":" + lt(a, o[c]) + ";");
		else {
			var l = ut(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += ct(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var ft = /label:\s*([^\s;{]+)\s*(;|$)/g, pt;
function mt(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	pt = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += ut(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += ut(n, t, e[o]), r && (i += a[o]);
	ft.lastIndex = 0;
	for (var s = "", c; (c = ft.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: nt(i) + s,
		styles: i,
		next: pt
	};
}
//#endregion
//#region node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var ht = function(e) {
	return e();
}, gt = n.useInsertionEffect ? n.useInsertionEffect : !1, _t = gt || ht, vt = gt || n.useLayoutEffect, yt = /* #__PURE__ */ n.createContext(typeof HTMLElement < "u" ? /* #__PURE__ */ Je({ key: "css" }) : null), bt = yt.Provider, xt = function(e) {
	return /*#__PURE__*/ o(function(t, n) {
		return e(t, c(yt), n);
	});
}, St = /* #__PURE__ */ n.createContext({}), Ct = {}.hasOwnProperty, wt = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Tt = function(e, t) {
	var n = {};
	for (var r in t) Ct.call(t, r) && (n[r] = t[r]);
	return n[wt] = e, n;
}, Et = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return et(t, n, r), _t(function() {
		return tt(t, n, r);
	}), null;
}, Dt = /* @__PURE__ */ xt(function(e, t, r) {
	var i = e.css;
	typeof i == "string" && t.registered[i] !== void 0 && (i = t.registered[i]);
	var a = e[wt], o = [i], s = "";
	typeof e.className == "string" ? s = $e(t.registered, o, e.className) : e.className != null && (s = e.className + " ");
	var c = mt(o, void 0, n.useContext(St));
	s += t.key + "-" + c.name;
	var l = {};
	for (var u in e) Ct.call(e, u) && u !== "css" && u !== wt && (l[u] = e[u]);
	return l.className = s, r && (l.ref = r), /*#__PURE__*/ n.createElement(n.Fragment, null, /*#__PURE__*/ n.createElement(Et, {
		cache: t,
		serialized: c,
		isStringTag: typeof a == "string"
	}), /*#__PURE__*/ n.createElement(a, l));
});
Qe();
var Ot = function(e, t) {
	var r = arguments;
	if (t == null || !Ct.call(t, "css")) return n.createElement.apply(void 0, r);
	var i = r.length, a = Array(i);
	a[0] = Dt, a[1] = Tt(e, t);
	for (var o = 2; o < i; o++) a[o] = r[o];
	return n.createElement.apply(null, a);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(Ot ||= {});
var kt = /* #__PURE__ */ xt(function(e, t) {
	var r = e.styles, i = mt([r], void 0, n.useContext(St)), a = n.useRef();
	return vt(function() {
		var e = t.key + "-global", n = new t.sheet.constructor({
			key: e,
			nonce: t.sheet.nonce,
			container: t.sheet.container,
			speedy: t.sheet.isSpeedy
		}), r = !1, o = document.querySelector("style[data-emotion=\"" + e + " " + i.name + "\"]");
		return t.sheet.tags.length && (n.before = t.sheet.tags[0]), o !== null && (r = !0, o.setAttribute("data-emotion", e), n.hydrate([o])), a.current = [n, r], function() {
			n.flush();
		};
	}, [t]), vt(function() {
		var e = a.current, n = e[0];
		if (e[1]) {
			e[1] = !1;
			return;
		}
		i.next !== void 0 && tt(t, i.next, !0), n.tags.length && (n.before = n.tags[n.tags.length - 1].nextElementSibling, n.flush()), t.insert("", i, n, !1);
	}, [t, i.name]), null;
});
function At() {
	return mt([...arguments]);
}
function jt() {
	var e = At.apply(void 0, arguments), t = "animation-" + e.name;
	return {
		name: t,
		styles: "@keyframes " + t + "{" + e.styles + "}",
		anim: 1,
		toString: function() {
			return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
		}
	};
}
//#endregion
//#region node_modules/@mui/material/esm/colors/common.js
var Mt = {
	black: "#000",
	white: "#fff"
}, Nt = {
	50: "#ffebee",
	100: "#ffcdd2",
	200: "#ef9a9a",
	300: "#e57373",
	400: "#ef5350",
	500: "#f44336",
	600: "#e53935",
	700: "#d32f2f",
	800: "#c62828",
	900: "#b71c1c",
	A100: "#ff8a80",
	A200: "#ff5252",
	A400: "#ff1744",
	A700: "#d50000"
}, Pt = {
	50: "#f3e5f5",
	100: "#e1bee7",
	200: "#ce93d8",
	300: "#ba68c8",
	400: "#ab47bc",
	500: "#9c27b0",
	600: "#8e24aa",
	700: "#7b1fa2",
	800: "#6a1b9a",
	900: "#4a148c",
	A100: "#ea80fc",
	A200: "#e040fb",
	A400: "#d500f9",
	A700: "#aa00ff"
}, Ft = {
	50: "#e3f2fd",
	100: "#bbdefb",
	200: "#90caf9",
	300: "#64b5f6",
	400: "#42a5f5",
	500: "#2196f3",
	600: "#1e88e5",
	700: "#1976d2",
	800: "#1565c0",
	900: "#0d47a1",
	A100: "#82b1ff",
	A200: "#448aff",
	A400: "#2979ff",
	A700: "#2962ff"
}, It = {
	50: "#e1f5fe",
	100: "#b3e5fc",
	200: "#81d4fa",
	300: "#4fc3f7",
	400: "#29b6f6",
	500: "#03a9f4",
	600: "#039be5",
	700: "#0288d1",
	800: "#0277bd",
	900: "#01579b",
	A100: "#80d8ff",
	A200: "#40c4ff",
	A400: "#00b0ff",
	A700: "#0091ea"
}, Lt = {
	50: "#e8f5e9",
	100: "#c8e6c9",
	200: "#a5d6a7",
	300: "#81c784",
	400: "#66bb6a",
	500: "#4caf50",
	600: "#43a047",
	700: "#388e3c",
	800: "#2e7d32",
	900: "#1b5e20",
	A100: "#b9f6ca",
	A200: "#69f0ae",
	A400: "#00e676",
	A700: "#00c853"
}, Rt = {
	50: "#fff3e0",
	100: "#ffe0b2",
	200: "#ffcc80",
	300: "#ffb74d",
	400: "#ffa726",
	500: "#ff9800",
	600: "#fb8c00",
	700: "#f57c00",
	800: "#ef6c00",
	900: "#e65100",
	A100: "#ffd180",
	A200: "#ffab40",
	A400: "#ff9100",
	A700: "#ff6d00"
}, zt = {
	50: "#fafafa",
	100: "#f5f5f5",
	200: "#eeeeee",
	300: "#e0e0e0",
	400: "#bdbdbd",
	500: "#9e9e9e",
	600: "#757575",
	700: "#616161",
	800: "#424242",
	900: "#212121",
	A100: "#f5f5f5",
	A200: "#eeeeee",
	A400: "#bdbdbd",
	A700: "#616161"
};
//#endregion
//#region node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js
function Bt(e, ...t) {
	let n = new URL(`https://mui.com/production-error/?code=${e}`);
	return t.forEach((e) => n.searchParams.append("args[]", e)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/identifier.js
var Vt = "$$material", Ht = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Ut = /* @__PURE__ */ ze(function(e) {
	return Ht.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
}), Wt = function(e) {
	return e !== "theme";
}, Gt = function(e) {
	return typeof e == "string" && e.charCodeAt(0) > 96 ? Ut : Wt;
}, Kt = function(e, t, n) {
	var r;
	if (t) {
		var i = t.shouldForwardProp;
		r = e.__emotion_forwardProp && i ? function(t) {
			return e.__emotion_forwardProp(t) && i(t);
		} : i;
	}
	return typeof r != "function" && n && (r = e.__emotion_forwardProp), r;
}, qt = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return et(t, n, r), _t(function() {
		return tt(t, n, r);
	}), null;
}, Jt = function e(t, r) {
	var i = t.__emotion_real === t, a = i && t.__emotion_base || t, o, s;
	r !== void 0 && (o = r.label, s = r.target);
	var c = Kt(t, r, i), l = c || Gt(a), u = !l("as");
	return function() {
		var d = arguments, f = i && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
		if (o !== void 0 && f.push("label:" + o + ";"), d[0] == null || d[0].raw === void 0) f.push.apply(f, d);
		else {
			var p = d[0];
			f.push(p[0]);
			for (var m = d.length, h = 1; h < m; h++) f.push(d[h], p[h]);
		}
		var g = xt(function(e, t, r) {
			var i = u && e.as || a, o = "", d = [], p = e;
			if (e.theme == null) {
				for (var m in p = {}, e) p[m] = e[m];
				p.theme = n.useContext(St);
			}
			typeof e.className == "string" ? o = $e(t.registered, d, e.className) : e.className != null && (o = e.className + " ");
			var h = mt(f.concat(d), t.registered, p);
			o += t.key + "-" + h.name, s !== void 0 && (o += " " + s);
			var g = u && c === void 0 ? Gt(i) : l, _ = {};
			for (var v in e) u && v === "as" || g(v) && (_[v] = e[v]);
			return _.className = o, r && (_.ref = r), /*#__PURE__*/ n.createElement(n.Fragment, null, /*#__PURE__*/ n.createElement(qt, {
				cache: t,
				serialized: h,
				isStringTag: typeof i == "string"
			}), /*#__PURE__*/ n.createElement(i, _));
		});
		return g.displayName = o === void 0 ? "Styled(" + (typeof a == "string" ? a : a.displayName || a.name || "Component") + ")" : o, g.defaultProps = t.defaultProps, g.__emotion_real = g, g.__emotion_base = a, g.__emotion_styles = f, g.__emotion_forwardProp = c, Object.defineProperty(g, "toString", { value: function() {
			return "." + s;
		} }), g.withComponent = function(t, n) {
			return e(t, Ye({}, r, n, { shouldForwardProp: Kt(g, n, !0) })).apply(void 0, f);
		}, g;
	};
}, Yt = /* @__PURE__ */ "a.abbr.address.area.article.aside.audio.b.base.bdi.bdo.big.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.keygen.label.legend.li.link.main.map.mark.marquee.menu.menuitem.meta.meter.nav.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strong.style.sub.summary.sup.table.tbody.td.textarea.tfoot.th.thead.time.title.tr.track.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.foreignObject.g.image.line.linearGradient.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.text.tspan".split("."), Xt = Jt.bind(null);
Yt.forEach(function(e) {
	Xt[e] = Xt(e);
});
//#endregion
//#region node_modules/@mui/styled-engine/esm/GlobalStyles/GlobalStyles.js
function Zt(e) {
	return e == null || Object.keys(e).length === 0;
}
function Qt(t) {
	let { styles: n, defaultTheme: r = {} } = t;
	return /*#__PURE__*/ e(kt, { styles: typeof n == "function" ? (e) => n(Zt(e) ? r : e) : n });
}
//#endregion
//#region node_modules/@mui/styled-engine/esm/index.js
function $t(e, t) {
	return Xt(e, t);
}
function en(e, t) {
	Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
var tn = [];
function nn(e) {
	return tn[0] = e, mt(tn);
}
//#endregion
//#region node_modules/react-is/cjs/react-is.production.js
var rn = /* @__PURE__ */ m(((e) => {
	var t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), a = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), d = Symbol.for("react.view_transition"), f = Symbol.for("react.client.reference");
	e.isValidElementType = function(e) {
		return !!(typeof e == "string" || typeof e == "function" || e === t || e === r || e === n || e === s || e === c || e === d || typeof e == "object" && e && (e.$$typeof === u || e.$$typeof === l || e.$$typeof === a || e.$$typeof === i || e.$$typeof === o || e.$$typeof === f || e.getModuleId !== void 0));
	};
})), an = (/* @__PURE__ */ m(((e, t) => {
	t.exports = rn();
})))();
function on(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function sn(e) {
	if (/*#__PURE__*/ n.isValidElement(e) || (0, an.isValidElementType)(e) || !on(e)) return e;
	let t = {};
	return Object.keys(e).forEach((n) => {
		t[n] = sn(e[n]);
	}), t;
}
function cn(e, t, r = { clone: !0 }) {
	let i = r.clone ? { ...e } : e;
	return on(e) && on(t) && Object.keys(t).forEach((a) => {
		/*#__PURE__*/ n.isValidElement(t[a]) || (0, an.isValidElementType)(t[a]) ? i[a] = t[a] : on(t[a]) && Object.prototype.hasOwnProperty.call(e, a) && on(e[a]) ? i[a] = cn(e[a], t[a], r) : r.clone ? i[a] = on(t[a]) ? sn(t[a]) : t[a] : i[a] = t[a];
	}), i;
}
//#endregion
//#region node_modules/@mui/system/esm/createBreakpoints/createBreakpoints.js
var ln = (e) => {
	let t = Object.keys(e).map((t) => ({
		key: t,
		val: e[t]
	})) || [];
	return t.sort((e, t) => e.val - t.val), t.reduce((e, t) => ({
		...e,
		[t.key]: t.val
	}), {});
};
function un(e) {
	let { values: t = {
		xs: 0,
		sm: 600,
		md: 900,
		lg: 1200,
		xl: 1536
	}, unit: n = "px", step: r = 5, ...i } = e, a = ln(t), o = Object.keys(a);
	function s(e) {
		return `@media (min-width:${typeof t[e] == "number" ? t[e] : e}${n})`;
	}
	function c(e) {
		return `@media (max-width:${(typeof t[e] == "number" ? t[e] : e) - r / 100}${n})`;
	}
	function l(e, i) {
		let a = o.indexOf(i);
		return `@media (min-width:${typeof t[e] == "number" ? t[e] : e}${n}) and (max-width:${(a !== -1 && typeof t[o[a]] == "number" ? t[o[a]] : i) - r / 100}${n})`;
	}
	function u(e) {
		return o.indexOf(e) + 1 < o.length ? l(e, o[o.indexOf(e) + 1]) : s(e);
	}
	function d(e) {
		let t = o.indexOf(e);
		return t === 0 ? s(o[1]) : t === o.length - 1 ? c(o[t]) : l(e, o[o.indexOf(e) + 1]).replace("@media", "@media not all and");
	}
	return {
		keys: o,
		values: a,
		up: s,
		down: c,
		between: l,
		only: u,
		not: d,
		unit: n,
		...i
	};
}
//#endregion
//#region node_modules/@mui/system/esm/cssContainerQueries/cssContainerQueries.js
function dn(e, t) {
	if (!e.containerQueries) return t;
	let n = Object.keys(t).filter((e) => e.startsWith("@container")).sort((e, t) => {
		let n = /min-width:\s*([0-9.]+)/;
		return (e.match(n)?.[1] || 0) - +(t.match(n)?.[1] || 0);
	});
	return n.length ? n.reduce((e, n) => {
		let r = t[n];
		return delete e[n], e[n] = r, e;
	}, { ...t }) : t;
}
function fn(e, t) {
	return t === "@" || t.startsWith("@") && (e.some((e) => t.startsWith(`@${e}`)) || !!t.match(/^@\d/));
}
function pn(e, t) {
	let n = t.match(/^@([^/]+)?\/?(.+)?$/);
	if (!n) return null;
	let [, r, i] = n, a = Number.isNaN(+r) ? r || 0 : +r;
	return e.containerQueries(i).up(a);
}
function mn(e) {
	let t = (e, t) => e.replace("@media", t ? `@container ${t}` : "@container");
	function n(n, r) {
		n.up = (...n) => t(e.breakpoints.up(...n), r), n.down = (...n) => t(e.breakpoints.down(...n), r), n.between = (...n) => t(e.breakpoints.between(...n), r), n.only = (...n) => t(e.breakpoints.only(...n), r), n.not = (...n) => {
			let i = t(e.breakpoints.not(...n), r);
			return i.includes("not all and") ? i.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : i;
		};
	}
	let r = {}, i = (e) => (n(r, e), r);
	return n(i), {
		...e,
		containerQueries: i
	};
}
//#endregion
//#region node_modules/@mui/system/esm/createTheme/shape.js
var hn = { borderRadius: 4 };
//#endregion
//#region node_modules/@mui/system/esm/merge/merge.js
function gn(e, t) {
	return t ? cn(e, t, { clone: !1 }) : e;
}
//#endregion
//#region node_modules/@mui/system/esm/breakpoints/breakpoints.js
var _n = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536
}, vn = {
	keys: [
		"xs",
		"sm",
		"md",
		"lg",
		"xl"
	],
	up: (e) => `@media (min-width:${_n[e]}px)`
}, yn = { containerQueries: (e) => ({ up: (t) => {
	let n = typeof t == "number" ? t : _n[t] || t;
	return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
} }) };
function bn(e, t, n) {
	let r = e.theme || {};
	if (Array.isArray(t)) {
		let e = r.breakpoints || vn;
		return t.reduce((r, i, a) => (r[e.up(e.keys[a])] = n(t[a]), r), {});
	}
	if (typeof t == "object") {
		let e = r.breakpoints || vn;
		return Object.keys(t).reduce((i, a) => {
			if (fn(e.keys, a)) {
				let e = pn(r.containerQueries ? r : yn, a);
				e && (i[e] = n(t[a], a));
			} else if (Object.keys(e.values || _n).includes(a)) {
				let r = e.up(a);
				i[r] = n(t[a], a);
			} else {
				let e = a;
				i[e] = t[e];
			}
			return i;
		}, {});
	}
	return n(t);
}
function xn(e = {}) {
	return e.keys?.reduce((t, n) => {
		let r = e.up(n);
		return t[r] = {}, t;
	}, {}) || {};
}
function Sn(e, t) {
	return e.reduce((e, t) => {
		let n = e[t];
		return (!n || Object.keys(n).length === 0) && delete e[t], e;
	}, t);
}
//#endregion
//#region node_modules/@mui/utils/esm/capitalize/capitalize.js
function Cn(e) {
	if (typeof e != "string") throw Error(Bt(7));
	return e.charAt(0).toUpperCase() + e.slice(1);
}
//#endregion
//#region node_modules/@mui/system/esm/style/style.js
function wn(e, t, n = !0) {
	if (!t || typeof t != "string") return null;
	if (e && e.vars && n) {
		let n = `vars.${t}`.split(".").reduce((e, t) => e && e[t] ? e[t] : null, e);
		if (n != null) return n;
	}
	return t.split(".").reduce((e, t) => e && e[t] != null ? e[t] : null, e);
}
function Tn(e, t, n, r = n) {
	let i;
	return i = typeof e == "function" ? e(n) : Array.isArray(e) ? e[n] || r : wn(e, n) || r, t && (i = t(i, r, e)), i;
}
function En(e) {
	let { prop: t, cssProperty: n = e.prop, themeKey: r, transform: i } = e, a = (e) => {
		if (e[t] == null) return null;
		let a = e[t], o = e.theme, s = wn(o, r) || {};
		return bn(e, a, (e) => {
			let r = Tn(s, i, e);
			return e === r && typeof e == "string" && (r = Tn(s, i, `${t}${e === "default" ? "" : Cn(e)}`, e)), n === !1 ? r : { [n]: r };
		});
	};
	return a.propTypes = {}, a.filterProps = [t], a;
}
//#endregion
//#region node_modules/@mui/system/esm/memoize/memoize.js
function Dn(e) {
	let t = {};
	return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
//#endregion
//#region node_modules/@mui/system/esm/spacing/spacing.js
var On = {
	m: "margin",
	p: "padding"
}, kn = {
	t: "Top",
	r: "Right",
	b: "Bottom",
	l: "Left",
	x: ["Left", "Right"],
	y: ["Top", "Bottom"]
}, An = {
	marginX: "mx",
	marginY: "my",
	paddingX: "px",
	paddingY: "py"
}, jn = Dn((e) => {
	if (e.length > 2) {
		if (An[e]) e = An[e];
		else return [e];
	}
	let [t, n] = e.split(""), r = On[t], i = kn[n] || "";
	return Array.isArray(i) ? i.map((e) => r + e) : [r + i];
}), Mn = [
	"m",
	"mt",
	"mr",
	"mb",
	"ml",
	"mx",
	"my",
	"margin",
	"marginTop",
	"marginRight",
	"marginBottom",
	"marginLeft",
	"marginX",
	"marginY",
	"marginInline",
	"marginInlineStart",
	"marginInlineEnd",
	"marginBlock",
	"marginBlockStart",
	"marginBlockEnd"
], Nn = [
	"p",
	"pt",
	"pr",
	"pb",
	"pl",
	"px",
	"py",
	"padding",
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
	"paddingX",
	"paddingY",
	"paddingInline",
	"paddingInlineStart",
	"paddingInlineEnd",
	"paddingBlock",
	"paddingBlockStart",
	"paddingBlockEnd"
];
[...Mn, ...Nn];
function Pn(e, t, n, r) {
	let i = wn(e, t, !0) ?? n;
	return typeof i == "number" || typeof i == "string" ? (e) => typeof e == "string" ? e : typeof i == "string" ? i.startsWith("var(") && e === 0 ? 0 : i.startsWith("var(") && e === 1 ? i : `calc(${e} * ${i})` : i * e : Array.isArray(i) ? (e) => {
		if (typeof e == "string") return e;
		let t = i[Math.abs(e)];
		return e >= 0 ? t : typeof t == "number" ? -t : typeof t == "string" && t.startsWith("var(") ? `calc(-1 * ${t})` : `-${t}`;
	} : typeof i == "function" ? i : () => void 0;
}
function Fn(e) {
	return Pn(e, "spacing", 8, "spacing");
}
function In(e, t) {
	return typeof t == "string" || t == null ? t : e(t);
}
function Ln(e, t) {
	return (n) => e.reduce((e, r) => (e[r] = In(t, n), e), {});
}
function Rn(e, t, n, r) {
	if (!t.includes(n)) return null;
	let i = Ln(jn(n), r), a = e[n];
	return bn(e, a, i);
}
function zn(e, t) {
	let n = Fn(e.theme);
	return Object.keys(e).map((r) => Rn(e, t, r, n)).reduce(gn, {});
}
function Bn(e) {
	return zn(e, Mn);
}
Bn.propTypes = {}, Bn.filterProps = Mn;
function Vn(e) {
	return zn(e, Nn);
}
Vn.propTypes = {}, Vn.filterProps = Nn;
//#endregion
//#region node_modules/@mui/system/esm/createTheme/createSpacing.js
function Hn(e = 8, t = Fn({ spacing: e })) {
	if (e.mui) return e;
	let n = (...e) => (e.length === 0 ? [1] : e).map((e) => {
		let n = t(e);
		return typeof n == "number" ? `${n}px` : n;
	}).join(" ");
	return n.mui = !0, n;
}
//#endregion
//#region node_modules/@mui/system/esm/compose/compose.js
function Un(...e) {
	let t = e.reduce((e, t) => (t.filterProps.forEach((n) => {
		e[n] = t;
	}), e), {}), n = (e) => Object.keys(e).reduce((n, r) => t[r] ? gn(n, t[r](e)) : n, {});
	return n.propTypes = {}, n.filterProps = e.reduce((e, t) => e.concat(t.filterProps), []), n;
}
//#endregion
//#region node_modules/@mui/system/esm/borders/borders.js
function Wn(e) {
	return typeof e == "number" ? `${e}px solid` : e;
}
function Gn(e, t) {
	return En({
		prop: e,
		themeKey: "borders",
		transform: t
	});
}
var Kn = Gn("border", Wn), qn = Gn("borderTop", Wn), Jn = Gn("borderRight", Wn), Yn = Gn("borderBottom", Wn), Xn = Gn("borderLeft", Wn), Zn = Gn("borderColor"), Qn = Gn("borderTopColor"), $n = Gn("borderRightColor"), er = Gn("borderBottomColor"), tr = Gn("borderLeftColor"), nr = Gn("outline", Wn), rr = Gn("outlineColor"), ir = (e) => {
	if (e.borderRadius !== void 0 && e.borderRadius !== null) {
		let t = Pn(e.theme, "shape.borderRadius", 4, "borderRadius");
		return bn(e, e.borderRadius, (e) => ({ borderRadius: In(t, e) }));
	}
	return null;
};
ir.propTypes = {}, ir.filterProps = ["borderRadius"], Un(Kn, qn, Jn, Yn, Xn, Zn, Qn, $n, er, tr, ir, nr, rr);
//#endregion
//#region node_modules/@mui/system/esm/cssGrid/cssGrid.js
var ar = (e) => {
	if (e.gap !== void 0 && e.gap !== null) {
		let t = Pn(e.theme, "spacing", 8, "gap");
		return bn(e, e.gap, (e) => ({ gap: In(t, e) }));
	}
	return null;
};
ar.propTypes = {}, ar.filterProps = ["gap"];
var or = (e) => {
	if (e.columnGap !== void 0 && e.columnGap !== null) {
		let t = Pn(e.theme, "spacing", 8, "columnGap");
		return bn(e, e.columnGap, (e) => ({ columnGap: In(t, e) }));
	}
	return null;
};
or.propTypes = {}, or.filterProps = ["columnGap"];
var sr = (e) => {
	if (e.rowGap !== void 0 && e.rowGap !== null) {
		let t = Pn(e.theme, "spacing", 8, "rowGap");
		return bn(e, e.rowGap, (e) => ({ rowGap: In(t, e) }));
	}
	return null;
};
sr.propTypes = {}, sr.filterProps = ["rowGap"], Un(ar, or, sr, En({ prop: "gridColumn" }), En({ prop: "gridRow" }), En({ prop: "gridAutoFlow" }), En({ prop: "gridAutoColumns" }), En({ prop: "gridAutoRows" }), En({ prop: "gridTemplateColumns" }), En({ prop: "gridTemplateRows" }), En({ prop: "gridTemplateAreas" }), En({ prop: "gridArea" }));
//#endregion
//#region node_modules/@mui/system/esm/palette/palette.js
function cr(e, t) {
	return t === "grey" ? t : e;
}
Un(En({
	prop: "color",
	themeKey: "palette",
	transform: cr
}), En({
	prop: "bgcolor",
	cssProperty: "backgroundColor",
	themeKey: "palette",
	transform: cr
}), En({
	prop: "backgroundColor",
	themeKey: "palette",
	transform: cr
}));
//#endregion
//#region node_modules/@mui/system/esm/sizing/sizing.js
function lr(e) {
	return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
var ur = En({
	prop: "width",
	transform: lr
}), dr = (e) => e.maxWidth !== void 0 && e.maxWidth !== null ? bn(e, e.maxWidth, (t) => {
	let n = e.theme?.breakpoints?.values?.[t] || _n[t];
	return n ? e.theme?.breakpoints?.unit === "px" ? { maxWidth: n } : { maxWidth: `${n}${e.theme.breakpoints.unit}` } : { maxWidth: lr(t) };
}) : null;
dr.filterProps = ["maxWidth"];
var fr = En({
	prop: "minWidth",
	transform: lr
}), pr = En({
	prop: "height",
	transform: lr
}), mr = En({
	prop: "maxHeight",
	transform: lr
}), hr = En({
	prop: "minHeight",
	transform: lr
});
En({
	prop: "size",
	cssProperty: "width",
	transform: lr
}), En({
	prop: "size",
	cssProperty: "height",
	transform: lr
}), Un(ur, dr, fr, pr, mr, hr, En({ prop: "boxSizing" }));
//#endregion
//#region node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js
var gr = {
	border: {
		themeKey: "borders",
		transform: Wn
	},
	borderTop: {
		themeKey: "borders",
		transform: Wn
	},
	borderRight: {
		themeKey: "borders",
		transform: Wn
	},
	borderBottom: {
		themeKey: "borders",
		transform: Wn
	},
	borderLeft: {
		themeKey: "borders",
		transform: Wn
	},
	borderColor: { themeKey: "palette" },
	borderTopColor: { themeKey: "palette" },
	borderRightColor: { themeKey: "palette" },
	borderBottomColor: { themeKey: "palette" },
	borderLeftColor: { themeKey: "palette" },
	outline: {
		themeKey: "borders",
		transform: Wn
	},
	outlineColor: { themeKey: "palette" },
	borderRadius: {
		themeKey: "shape.borderRadius",
		style: ir
	},
	color: {
		themeKey: "palette",
		transform: cr
	},
	bgcolor: {
		themeKey: "palette",
		cssProperty: "backgroundColor",
		transform: cr
	},
	backgroundColor: {
		themeKey: "palette",
		transform: cr
	},
	p: { style: Vn },
	pt: { style: Vn },
	pr: { style: Vn },
	pb: { style: Vn },
	pl: { style: Vn },
	px: { style: Vn },
	py: { style: Vn },
	padding: { style: Vn },
	paddingTop: { style: Vn },
	paddingRight: { style: Vn },
	paddingBottom: { style: Vn },
	paddingLeft: { style: Vn },
	paddingX: { style: Vn },
	paddingY: { style: Vn },
	paddingInline: { style: Vn },
	paddingInlineStart: { style: Vn },
	paddingInlineEnd: { style: Vn },
	paddingBlock: { style: Vn },
	paddingBlockStart: { style: Vn },
	paddingBlockEnd: { style: Vn },
	m: { style: Bn },
	mt: { style: Bn },
	mr: { style: Bn },
	mb: { style: Bn },
	ml: { style: Bn },
	mx: { style: Bn },
	my: { style: Bn },
	margin: { style: Bn },
	marginTop: { style: Bn },
	marginRight: { style: Bn },
	marginBottom: { style: Bn },
	marginLeft: { style: Bn },
	marginX: { style: Bn },
	marginY: { style: Bn },
	marginInline: { style: Bn },
	marginInlineStart: { style: Bn },
	marginInlineEnd: { style: Bn },
	marginBlock: { style: Bn },
	marginBlockStart: { style: Bn },
	marginBlockEnd: { style: Bn },
	displayPrint: {
		cssProperty: !1,
		transform: (e) => ({ "@media print": { display: e } })
	},
	display: {},
	overflow: {},
	textOverflow: {},
	visibility: {},
	whiteSpace: {},
	flexBasis: {},
	flexDirection: {},
	flexWrap: {},
	justifyContent: {},
	alignItems: {},
	alignContent: {},
	order: {},
	flex: {},
	flexGrow: {},
	flexShrink: {},
	alignSelf: {},
	justifyItems: {},
	justifySelf: {},
	gap: { style: ar },
	rowGap: { style: sr },
	columnGap: { style: or },
	gridColumn: {},
	gridRow: {},
	gridAutoFlow: {},
	gridAutoColumns: {},
	gridAutoRows: {},
	gridTemplateColumns: {},
	gridTemplateRows: {},
	gridTemplateAreas: {},
	gridArea: {},
	position: {},
	zIndex: { themeKey: "zIndex" },
	top: {},
	right: {},
	bottom: {},
	left: {},
	boxShadow: { themeKey: "shadows" },
	width: { transform: lr },
	maxWidth: { style: dr },
	minWidth: { transform: lr },
	height: { transform: lr },
	maxHeight: { transform: lr },
	minHeight: { transform: lr },
	boxSizing: {},
	font: { themeKey: "font" },
	fontFamily: { themeKey: "typography" },
	fontSize: { themeKey: "typography" },
	fontStyle: { themeKey: "typography" },
	fontWeight: { themeKey: "typography" },
	letterSpacing: {},
	textTransform: {},
	lineHeight: {},
	textAlign: {},
	typography: {
		cssProperty: !1,
		themeKey: "typography"
	}
};
//#endregion
//#region node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function _r(...e) {
	let t = e.reduce((e, t) => e.concat(Object.keys(t)), []), n = new Set(t);
	return e.every((e) => n.size === Object.keys(e).length);
}
function vr(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function yr() {
	function e(e, t, n, r) {
		let i = {
			[e]: t,
			theme: n
		}, a = r[e];
		if (!a) return { [e]: t };
		let { cssProperty: o = e, themeKey: s, transform: c, style: l } = a;
		if (t == null) return null;
		if (s === "typography" && t === "inherit") return { [e]: t };
		let u = wn(n, s) || {};
		return l ? l(i) : bn(i, t, (t) => {
			let n = Tn(u, c, t);
			return t === n && typeof t == "string" && (n = Tn(u, c, `${e}${t === "default" ? "" : Cn(t)}`, t)), o === !1 ? n : { [o]: n };
		});
	}
	function t(n) {
		let { sx: r, theme: i = {}, nested: a } = n || {};
		if (!r) return null;
		let o = i.unstable_sxConfig ?? gr;
		function s(n) {
			let r = n;
			if (typeof n == "function") r = n(i);
			else if (typeof n != "object") return n;
			if (!r) return null;
			let s = xn(i.breakpoints), c = Object.keys(s), l = s;
			return Object.keys(r).forEach((n) => {
				let a = vr(r[n], i);
				if (a != null) {
					if (typeof a == "object") {
						if (o[n]) l = gn(l, e(n, a, i, o));
						else {
							let e = bn({ theme: i }, a, (e) => ({ [n]: e }));
							_r(e, a) ? l[n] = t({
								sx: a,
								theme: i,
								nested: !0
							}) : l = gn(l, e);
						}
					} else l = gn(l, e(n, a, i, o));
				}
			}), !a && i.modularCssLayers ? { "@layer sx": dn(i, Sn(c, l)) } : dn(i, Sn(c, l));
		}
		return Array.isArray(r) ? r.map(s) : s(r);
	}
	return t;
}
var br = yr();
br.filterProps = ["sx"];
//#endregion
//#region node_modules/@mui/system/esm/createTheme/applyStyles.js
function xr(e, t) {
	let n = this;
	if (n.vars) {
		if (!n.colorSchemes?.[e] || typeof n.getColorSchemeSelector != "function") return {};
		let r = n.getColorSchemeSelector(e);
		return r === "&" ? t : ((r.includes("data-") || r.includes(".")) && (r = `*:where(${r.replace(/\s*&$/, "")}) &`), { [r]: t });
	}
	return n.palette.mode === e ? t : {};
}
//#endregion
//#region node_modules/@mui/system/esm/createTheme/createTheme.js
function Sr(e = {}, ...t) {
	let { breakpoints: n = {}, palette: r = {}, spacing: i, shape: a = {}, ...o } = e, s = un(n), c = Hn(i), l = cn({
		breakpoints: s,
		direction: "ltr",
		components: {},
		palette: {
			mode: "light",
			...r
		},
		spacing: c,
		shape: {
			...hn,
			...a
		}
	}, o);
	return l = mn(l), l.applyStyles = xr, l = t.reduce((e, t) => cn(e, t), l), l.unstable_sxConfig = {
		...gr,
		...o?.unstable_sxConfig
	}, l.unstable_sx = function(e) {
		return br({
			sx: e,
			theme: this
		});
	}, l;
}
//#endregion
//#region node_modules/@mui/system/esm/useThemeWithoutDefault/useThemeWithoutDefault.js
function Cr(e) {
	return Object.keys(e).length === 0;
}
function wr(e = null) {
	let t = n.useContext(St);
	return !t || Cr(t) ? e : t;
}
//#endregion
//#region node_modules/@mui/system/esm/useTheme/useTheme.js
var Tr = Sr();
function Er(e = Tr) {
	return wr(e);
}
//#endregion
//#region node_modules/@mui/system/esm/GlobalStyles/GlobalStyles.js
function Dr(e) {
	let t = nn(e);
	return e !== t && t.styles ? (t.styles.match(/^@layer\s+[^{]*$/) || (t.styles = `@layer global{${t.styles}}`), t) : e;
}
function Or({ styles: t, themeId: n, defaultTheme: r = {} }) {
	let i = Er(r), a = n && i[n] || i, o = typeof t == "function" ? t(a) : t;
	return a.modularCssLayers && (o = Array.isArray(o) ? o.map((e) => Dr(typeof e == "function" ? e(a) : e)) : Dr(o)), /*#__PURE__*/ e(Qt, { styles: o });
}
//#endregion
//#region node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
var kr = (e) => {
	let t = {
		systemProps: {},
		otherProps: {}
	}, n = e?.theme?.unstable_sxConfig ?? gr;
	return Object.keys(e).forEach((r) => {
		n[r] ? t.systemProps[r] = e[r] : t.otherProps[r] = e[r];
	}), t;
};
function Ar(e) {
	let { sx: t, ...n } = e, { systemProps: r, otherProps: i } = kr(n), a;
	return a = Array.isArray(t) ? [r, ...t] : typeof t == "function" ? (...e) => {
		let n = t(...e);
		return on(n) ? {
			...r,
			...n
		} : r;
	} : {
		...r,
		...t
	}, {
		...i,
		sx: a
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var jr = (e) => e, Mr = (() => {
	let e = jr;
	return {
		configure(t) {
			e = t;
		},
		generate(t) {
			return e(t);
		},
		reset() {
			e = jr;
		}
	};
})();
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function Nr(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Nr(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function U() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Nr(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/@mui/system/esm/createBox/createBox.js
function Pr(t = {}) {
	let { themeId: r, defaultTheme: i, defaultClassName: a = "MuiBox-root", generateClassName: o } = t, s = $t("div", { shouldForwardProp: (e) => e !== "theme" && e !== "sx" && e !== "as" })(br);
	return /* @__PURE__ */ n.forwardRef(function(t, n) {
		let c = Er(i), { className: l, component: u = "div", ...d } = Ar(t);
		return /*#__PURE__*/ e(s, {
			as: u,
			ref: n,
			className: U(l, o ? o(a) : a),
			theme: r && c[r] || c,
			...d
		});
	});
}
//#endregion
//#region node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
var Fr = {
	active: "active",
	checked: "checked",
	completed: "completed",
	disabled: "disabled",
	error: "error",
	expanded: "expanded",
	focused: "focused",
	focusVisible: "focusVisible",
	open: "open",
	readOnly: "readOnly",
	required: "required",
	selected: "selected"
};
function W(e, t, n = "Mui") {
	let r = Fr[t];
	return r ? `${n}-${r}` : `${Mr.generate(e)}-${t}`;
}
//#endregion
//#region node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function G(e, t, n = "Mui") {
	let r = {};
	return t.forEach((t) => {
		r[t] = W(e, t, n);
	}), r;
}
//#endregion
//#region node_modules/@mui/system/esm/preprocessStyles.js
function Ir(e) {
	let { variants: t, ...n } = e, r = {
		variants: t,
		style: nn(n),
		isProcessed: !0
	};
	return r.style === n || t && t.forEach((e) => {
		typeof e.style != "function" && (e.style = nn(e.style));
	}), r;
}
//#endregion
//#region node_modules/@mui/system/esm/createStyled/createStyled.js
var Lr = Sr();
function Rr(e) {
	return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function zr(e, t) {
	return t && e && typeof e == "object" && e.styles && !e.styles.startsWith("@layer") && (e.styles = `@layer ${t}{${String(e.styles)}}`), e;
}
function Br(e) {
	return e ? (t, n) => n[e] : null;
}
function Vr(e, t, n) {
	e.theme = Gr(e.theme) ? n : e.theme[t] || e.theme;
}
function Hr(e, t, n) {
	let r = typeof t == "function" ? t(e) : t;
	if (Array.isArray(r)) return r.flatMap((t) => Hr(e, t, n));
	if (Array.isArray(r?.variants)) {
		let t;
		if (r.isProcessed) t = n ? zr(r.style, n) : r.style;
		else {
			let { variants: e, ...i } = r;
			t = n ? zr(nn(i), n) : i;
		}
		return Ur(e, r.variants, [t], n);
	}
	return r?.isProcessed ? n ? zr(nn(r.style), n) : r.style : n ? zr(nn(r), n) : r;
}
function Ur(e, t, n = [], r = void 0) {
	let i;
	variantLoop: for (let a = 0; a < t.length; a += 1) {
		let o = t[a];
		if (typeof o.props == "function") {
			if (i ??= {
				...e,
				...e.ownerState,
				ownerState: e.ownerState
			}, !o.props(i)) continue;
		} else for (let t in o.props) if (e[t] !== o.props[t] && e.ownerState?.[t] !== o.props[t]) continue variantLoop;
		typeof o.style == "function" ? (i ??= {
			...e,
			...e.ownerState,
			ownerState: e.ownerState
		}, n.push(r ? zr(nn(o.style(i)), r) : o.style(i))) : n.push(r ? zr(nn(o.style), r) : o.style);
	}
	return n;
}
function Wr(e = {}) {
	let { themeId: t, defaultTheme: n = Lr, rootShouldForwardProp: r = Rr, slotShouldForwardProp: i = Rr } = e;
	function a(e) {
		Vr(e, t, n);
	}
	return (e, t = {}) => {
		en(e, (e) => e.filter((e) => e !== br));
		let { name: n, slot: o, skipVariantsResolver: s, skipSx: c, overridesResolver: l = Br(qr(o)), ...u } = t, d = n && n.startsWith("Mui") || o ? "components" : "custom", f = s === void 0 ? o && o !== "Root" && o !== "root" || !1 : s, p = c || !1, m = Rr;
		o === "Root" || o === "root" ? m = r : o ? m = i : Kr(e) && (m = void 0);
		let h = $t(e, {
			shouldForwardProp: m,
			label: void 0,
			...u
		}), g = (e) => {
			if (e.__emotion_real === e) return e;
			if (typeof e == "function") return function(t) {
				return Hr(t, e, t.theme.modularCssLayers ? d : void 0);
			};
			if (on(e)) {
				let t = Ir(e);
				return function(e) {
					return t.variants ? Hr(e, t, e.theme.modularCssLayers ? d : void 0) : e.theme.modularCssLayers ? zr(t.style, d) : t.style;
				};
			}
			return e;
		}, _ = (...t) => {
			let r = [], i = t.map(g), o = [];
			if (r.push(a), n && l && o.push(function(e) {
				let t = e.theme.components?.[n]?.styleOverrides;
				if (!t) return null;
				let r = {};
				for (let n in t) r[n] = Hr(e, t[n], e.theme.modularCssLayers ? "theme" : void 0);
				return l(e, r);
			}), n && !f && o.push(function(e) {
				let t = e.theme?.components?.[n]?.variants;
				return t ? Ur(e, t, [], e.theme.modularCssLayers ? "theme" : void 0) : null;
			}), p || o.push(br), Array.isArray(i[0])) {
				let e = i.shift(), t = Array(r.length).fill(""), n = Array(o.length).fill(""), a;
				a = [
					...t,
					...e,
					...n
				], a.raw = [
					...t,
					...e.raw,
					...n
				], r.unshift(a);
			}
			let s = [
				...r,
				...i,
				...o
			], c = h(...s);
			return e.muiName && (c.muiName = e.muiName), c;
		};
		return h.withConfig && (_.withConfig = h.withConfig), _;
	};
}
function Gr(e) {
	for (let t in e) return !1;
	return !0;
}
function Kr(e) {
	return typeof e == "string" && e.charCodeAt(0) > 96;
}
function qr(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region node_modules/@mui/utils/esm/resolveProps/resolveProps.js
function Jr(e, t, n = !1) {
	let r = { ...t };
	for (let i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
		let a = i;
		if (a === "components" || a === "slots") r[a] = {
			...e[a],
			...r[a]
		};
		else if (a === "componentsProps" || a === "slotProps") {
			let i = e[a], o = t[a];
			if (!o) r[a] = i || {};
			else if (!i) r[a] = o;
			else {
				r[a] = { ...o };
				for (let e in i) if (Object.prototype.hasOwnProperty.call(i, e)) {
					let t = e;
					r[a][t] = Jr(i[t], o[t], n);
				}
			}
		} else a === "className" && n && t.className ? r.className = U(e?.className, t?.className) : a === "style" && n && t.style ? r.style = {
			...e?.style,
			...t?.style
		} : r[a] === void 0 && (r[a] = e[a]);
	}
	return r;
}
//#endregion
//#region node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var Yr = typeof window < "u" ? n.useLayoutEffect : n.useEffect;
//#endregion
//#region node_modules/@mui/utils/esm/clamp/clamp.js
function Xr(e, t = -(2 ** 53 - 1), n = 2 ** 53 - 1) {
	return Math.max(t, Math.min(e, n));
}
//#endregion
//#region node_modules/@mui/system/esm/colorManipulator/colorManipulator.js
function Zr(e, t = 0, n = 1) {
	return Xr(e, t, n);
}
function Qr(e) {
	e = e.slice(1);
	let t = RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g"), n = e.match(t);
	return n && n[0].length === 1 && (n = n.map((e) => e + e)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((e, t) => t < 3 ? parseInt(e, 16) : Math.round(parseInt(e, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function $r(e) {
	if (e.type) return e;
	if (e.charAt(0) === "#") return $r(Qr(e));
	let t = e.indexOf("("), n = e.substring(0, t);
	if (![
		"rgb",
		"rgba",
		"hsl",
		"hsla",
		"color"
	].includes(n)) throw Error(Bt(9, e));
	let r = e.substring(t + 1, e.length - 1), i;
	if (n === "color") {
		if (r = r.split(" "), i = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ![
			"srgb",
			"display-p3",
			"a98-rgb",
			"prophoto-rgb",
			"rec-2020"
		].includes(i)) throw Error(Bt(10, i));
	} else r = r.split(",");
	return r = r.map((e) => parseFloat(e)), {
		type: n,
		values: r,
		colorSpace: i
	};
}
var ei = (e) => {
	let t = $r(e);
	return t.values.slice(0, 3).map((e, n) => t.type.includes("hsl") && n !== 0 ? `${e}%` : e).join(" ");
}, ti = (e, t) => {
	try {
		return ei(e);
	} catch {
		return e;
	}
};
function ni(e) {
	let { type: t, colorSpace: n } = e, { values: r } = e;
	return t.includes("rgb") ? r = r.map((e, t) => t < 3 ? parseInt(e, 10) : e) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), r = t.includes("color") ? `${n} ${r.join(" ")}` : `${r.join(", ")}`, `${t}(${r})`;
}
function ri(e) {
	e = $r(e);
	let { values: t } = e, n = t[0], r = t[1] / 100, i = t[2] / 100, a = r * Math.min(i, 1 - i), o = (e, t = (e + n / 30) % 12) => i - a * Math.max(Math.min(t - 3, 9 - t, 1), -1), s = "rgb", c = [
		Math.round(o(0) * 255),
		Math.round(o(8) * 255),
		Math.round(o(4) * 255)
	];
	return e.type === "hsla" && (s += "a", c.push(t[3])), ni({
		type: s,
		values: c
	});
}
function ii(e) {
	e = $r(e);
	let t = e.type === "hsl" || e.type === "hsla" ? $r(ri(e)).values : e.values;
	return t = t.map((t) => (e.type !== "color" && (t /= 255), t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4)), Number((.2126 * t[0] + .7152 * t[1] + .0722 * t[2]).toFixed(3));
}
function ai(e, t) {
	let n = ii(e), r = ii(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function oi(e, t) {
	return e = $r(e), t = Zr(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, ni(e);
}
function si(e, t, n) {
	try {
		return oi(e, t);
	} catch {
		return e;
	}
}
function ci(e, t) {
	if (e = $r(e), t = Zr(t), e.type.includes("hsl")) e.values[2] *= 1 - t;
	else if (e.type.includes("rgb") || e.type.includes("color")) for (let n = 0; n < 3; n += 1) e.values[n] *= 1 - t;
	return ni(e);
}
function li(e, t, n) {
	try {
		return ci(e, t);
	} catch {
		return e;
	}
}
function ui(e, t) {
	if (e = $r(e), t = Zr(t), e.type.includes("hsl")) e.values[2] += (100 - e.values[2]) * t;
	else if (e.type.includes("rgb")) for (let n = 0; n < 3; n += 1) e.values[n] += (255 - e.values[n]) * t;
	else if (e.type.includes("color")) for (let n = 0; n < 3; n += 1) e.values[n] += (1 - e.values[n]) * t;
	return ni(e);
}
function di(e, t, n) {
	try {
		return ui(e, t);
	} catch {
		return e;
	}
}
function fi(e, t = .15) {
	return ii(e) > .5 ? ci(e, t) : ui(e, t);
}
function pi(e, t, n) {
	try {
		return fi(e, t);
	} catch {
		return e;
	}
}
//#endregion
//#region node_modules/@mui/private-theming/esm/useTheme/ThemeContext.js
var mi = /*#__PURE__*/ n.createContext(null);
//#endregion
//#region node_modules/@mui/private-theming/esm/useTheme/useTheme.js
function hi() {
	return n.useContext(mi);
}
var gi = typeof Symbol == "function" && Symbol.for ? Symbol.for("mui.nested") : "__THEME_NESTED__";
//#endregion
//#region node_modules/@mui/private-theming/esm/ThemeProvider/ThemeProvider.js
function _i(e, t) {
	return typeof t == "function" ? t(e) : {
		...e,
		...t
	};
}
function vi(t) {
	let { children: r, theme: i } = t, a = hi(), o = n.useMemo(() => {
		let e = a === null ? { ...i } : _i(a, i);
		return e != null && (e[gi] = a !== null), e;
	}, [i, a]);
	return /*#__PURE__*/ e(mi.Provider, {
		value: o,
		children: r
	});
}
//#endregion
//#region node_modules/@mui/system/esm/RtlProvider/index.js
var yi = /*#__PURE__*/ n.createContext();
function bi({ value: t, ...n }) {
	return /*#__PURE__*/ e(yi.Provider, {
		value: t ?? !0,
		...n
	});
}
var xi = () => n.useContext(yi) ?? !1, Si = /*#__PURE__*/ n.createContext(void 0);
function Ci({ value: t, children: n }) {
	return /*#__PURE__*/ e(Si.Provider, {
		value: t,
		children: n
	});
}
function wi(e) {
	let { theme: t, name: n, props: r } = e;
	if (!t || !t.components || !t.components[n]) return r;
	let i = t.components[n];
	return i.defaultProps ? Jr(i.defaultProps, r, t.components.mergeClassNameAndStyle) : !i.styleOverrides && !i.variants ? Jr(i, r, t.components.mergeClassNameAndStyle) : r;
}
function Ti({ props: e, name: t }) {
	return wi({
		props: e,
		name: t,
		theme: { components: n.useContext(Si) }
	});
}
//#endregion
//#region node_modules/@mui/utils/esm/useId/useId.js
var Ei = 0;
function Di(e) {
	let [t, r] = n.useState(e), i = e || t;
	return n.useEffect(() => {
		t ?? (Ei += 1, r(`mui-${Ei}`));
	}, [t]), i;
}
var Oi = { ...n }.useId;
function ki(e) {
	if (Oi !== void 0) {
		let t = Oi();
		return e ?? t;
	}
	return Di(e);
}
//#endregion
//#region node_modules/@mui/system/esm/ThemeProvider/useLayerOrder.js
function Ai(t) {
	let n = wr(), r = ki() || "", { modularCssLayers: i } = t, a = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
	return a = !i || n !== null ? "" : typeof i == "string" ? i.replace(/mui(?!\.)/g, a) : `@layer ${a};`, Yr(() => {
		let e = document.querySelector("head");
		if (!e) return;
		let t = e.firstChild;
		if (a) {
			if (t && t.hasAttribute?.("data-mui-layer-order") && t.getAttribute("data-mui-layer-order") === r) return;
			let n = document.createElement("style");
			n.setAttribute("data-mui-layer-order", r), n.textContent = a, e.prepend(n);
		} else e.querySelector(`style[data-mui-layer-order="${r}"]`)?.remove();
	}, [a, r]), a ? /*#__PURE__*/ e(Or, { styles: a }) : null;
}
//#endregion
//#region node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js
var ji = {};
function Mi(e, t, r, i = !1) {
	return n.useMemo(() => {
		let n = e && t[e] || t;
		if (typeof r == "function") {
			let a = r(n), o = e ? {
				...t,
				[e]: a
			} : a;
			return i ? () => o : o;
		}
		return e ? {
			...t,
			[e]: r
		} : {
			...t,
			...r
		};
	}, [
		e,
		t,
		r,
		i
	]);
}
function Ni(n) {
	let { children: r, theme: i, themeId: a } = n, o = wr(ji), s = hi() || ji, c = Mi(a, o, i), l = Mi(a, s, i, !0), u = (a ? c[a] : c).direction === "rtl", d = Ai(c);
	return /*#__PURE__*/ e(vi, {
		theme: l,
		children: /*#__PURE__*/ e(St.Provider, {
			value: c,
			children: /*#__PURE__*/ e(bi, {
				value: u,
				children: /*#__PURE__*/ t(Ci, {
					value: a ? c[a].components : c.components,
					children: [d, r]
				})
			})
		})
	});
}
//#endregion
//#region node_modules/@mui/system/esm/memoTheme.js
var Pi = { theme: void 0 };
function Fi(e) {
	let t, n;
	return function(r) {
		let i = t;
		return (i === void 0 || r.theme !== n) && (Pi.theme = r.theme, i = Ir(e(Pi)), t = i, n = r.theme), i;
	};
}
//#endregion
//#region node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js
var Ii = "mode", Li = "color-scheme", Ri = "data-color-scheme";
function zi(t) {
	let { defaultMode: n = "system", defaultLightColorScheme: r = "light", defaultDarkColorScheme: i = "dark", modeStorageKey: a = Ii, colorSchemeStorageKey: o = Li, attribute: s = Ri, colorSchemeNode: c = "document.documentElement", nonce: l } = t || {}, u = "", d = s;
	if (s === "class" && (d = ".%s"), s === "data" && (d = "[data-%s]"), d.startsWith(".")) {
		let e = d.substring(1);
		u += `${c}.classList.remove('${e}'.replace('%s', light), '${e}'.replace('%s', dark));
      ${c}.classList.add('${e}'.replace('%s', colorScheme));`;
	}
	let f = d.match(/\[([^[\]]+)\]/);
	if (f) {
		let [e, t] = f[1].split("=");
		t || (u += `${c}.removeAttribute('${e}'.replace('%s', light));
      ${c}.removeAttribute('${e}'.replace('%s', dark));`), u += `
      ${c}.setAttribute('${e}'.replace('%s', colorScheme), ${t ? `${t}.replace('%s', colorScheme)` : "\"\""});`;
	} else d !== ".%s" && (u += `${c}.setAttribute('${d}', colorScheme);`);
	return /*#__PURE__*/ e("script", {
		suppressHydrationWarning: !0,
		nonce: typeof window > "u" ? l : "",
		dangerouslySetInnerHTML: { __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${a}') || '${n}';
  const dark = localStorage.getItem('${o}-dark') || '${i}';
  const light = localStorage.getItem('${o}-light') || '${r}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${u}
  }
} catch(e){}})();` }
	}, "mui-color-scheme-init");
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/localStorageManager.js
function Bi() {}
var Vi = ({ key: e, storageWindow: t }) => (!t && typeof window < "u" && (t = window), {
	get(n) {
		if (typeof window > "u") return;
		if (!t) return n;
		let r;
		try {
			r = t.localStorage.getItem(e);
		} catch {}
		return r || n;
	},
	set: (n) => {
		if (t) try {
			t.localStorage.setItem(e, n);
		} catch {}
	},
	subscribe: (n) => {
		if (!t) return Bi;
		let r = (t) => {
			let r = t.newValue;
			t.key === e && n(r);
		};
		return t.addEventListener("storage", r), () => {
			t.removeEventListener("storage", r);
		};
	}
});
//#endregion
//#region node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
function Hi() {}
function Ui(e) {
	if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Wi(e, t) {
	if (e.mode === "light" || e.mode === "system" && e.systemMode === "light") return t("light");
	if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark") return t("dark");
}
function Gi(e) {
	return Wi(e, (t) => {
		if (t === "light") return e.lightColorScheme;
		if (t === "dark") return e.darkColorScheme;
	});
}
function Ki(e) {
	let { defaultMode: t = "light", defaultLightColorScheme: r, defaultDarkColorScheme: i, supportedColorSchemes: a = [], modeStorageKey: o = Ii, colorSchemeStorageKey: s = Li, storageWindow: c = typeof window > "u" ? void 0 : window, storageManager: l = Vi, noSsr: u = !1 } = e, d = a.join(","), f = a.length > 1, p = n.useMemo(() => l?.({
		key: o,
		storageWindow: c
	}), [
		l,
		o,
		c
	]), m = n.useMemo(() => l?.({
		key: `${s}-light`,
		storageWindow: c
	}), [
		l,
		s,
		c
	]), h = n.useMemo(() => l?.({
		key: `${s}-dark`,
		storageWindow: c
	}), [
		l,
		s,
		c
	]), [g, _] = n.useState(() => {
		let e = p?.get(t) || t, n = m?.get(r) || r, a = h?.get(i) || i;
		return {
			mode: e,
			systemMode: Ui(e),
			lightColorScheme: n,
			darkColorScheme: a
		};
	}), [v, y] = n.useState(u || !f);
	n.useEffect(() => {
		y(!0);
	}, []);
	let b = Gi(g), x = n.useCallback((e) => {
		_((n) => {
			if (e === n.mode) return n;
			let r = e ?? t;
			return p?.set(r), {
				...n,
				mode: r,
				systemMode: Ui(r)
			};
		});
	}, [p, t]), S = n.useCallback((e) => {
		e ? typeof e == "string" ? e && !d.includes(e) ? console.error(`\`${e}\` does not exist in \`theme.colorSchemes\`.`) : _((t) => {
			let n = { ...t };
			return Wi(t, (t) => {
				t === "light" && (m?.set(e), n.lightColorScheme = e), t === "dark" && (h?.set(e), n.darkColorScheme = e);
			}), n;
		}) : _((t) => {
			let n = { ...t }, a = e.light === null ? r : e.light, o = e.dark === null ? i : e.dark;
			return a && (d.includes(a) ? (n.lightColorScheme = a, m?.set(a)) : console.error(`\`${a}\` does not exist in \`theme.colorSchemes\`.`)), o && (d.includes(o) ? (n.darkColorScheme = o, h?.set(o)) : console.error(`\`${o}\` does not exist in \`theme.colorSchemes\`.`)), n;
		}) : _((e) => (m?.set(r), h?.set(i), {
			...e,
			lightColorScheme: r,
			darkColorScheme: i
		}));
	}, [
		d,
		m,
		h,
		r,
		i
	]), C = n.useCallback((e) => {
		g.mode === "system" && _((t) => {
			let n = e?.matches ? "dark" : "light";
			return t.systemMode === n ? t : {
				...t,
				systemMode: n
			};
		});
	}, [g.mode]), w = n.useRef(C);
	return w.current = C, n.useEffect(() => {
		if (typeof window.matchMedia != "function" || !f) return;
		let e = (...e) => w.current(...e), t = window.matchMedia("(prefers-color-scheme: dark)");
		return t.addListener(e), e(t), () => {
			t.removeListener(e);
		};
	}, [f]), n.useEffect(() => {
		if (f) {
			let e = p?.subscribe((e) => {
				(!e || [
					"light",
					"dark",
					"system"
				].includes(e)) && x(e || t);
			}) || Hi, n = m?.subscribe((e) => {
				(!e || d.match(e)) && S({ light: e });
			}) || Hi, r = h?.subscribe((e) => {
				(!e || d.match(e)) && S({ dark: e });
			}) || Hi;
			return () => {
				e(), n(), r();
			};
		}
	}, [
		S,
		x,
		d,
		t,
		c,
		f,
		p,
		m,
		h
	]), {
		...g,
		mode: v ? g.mode : void 0,
		systemMode: v ? g.systemMode : void 0,
		colorScheme: v ? b : void 0,
		setMode: x,
		setColorScheme: S
	};
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
var qi = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function Ji(r) {
	let { themeId: i, theme: a = {}, modeStorageKey: o = Ii, colorSchemeStorageKey: s = Li, disableTransitionOnChange: c = !1, defaultColorScheme: l, resolveTheme: u } = r, d = {
		allColorSchemes: [],
		colorScheme: void 0,
		darkColorScheme: void 0,
		lightColorScheme: void 0,
		mode: void 0,
		setColorScheme: () => {},
		setMode: () => {},
		systemMode: void 0
	}, f = /*#__PURE__*/ n.createContext(void 0), p = () => n.useContext(f) || d, m = {}, h = {};
	function g(r) {
		let { children: d, theme: p, modeStorageKey: g = o, colorSchemeStorageKey: _ = s, disableTransitionOnChange: v = c, storageManager: y, storageWindow: b = typeof window > "u" ? void 0 : window, documentNode: x = typeof document > "u" ? void 0 : document, colorSchemeNode: S = typeof document > "u" ? void 0 : document.documentElement, disableNestedContext: C = !1, disableStyleSheetGeneration: w = !1, defaultMode: T = "system", forceThemeRerender: E = !1, noSsr: D } = r, O = n.useRef(!1), k = hi(), A = n.useContext(f), j = !!A && !C, M = n.useMemo(() => p || (typeof a == "function" ? a() : a), [p]), N = M[i], P = N || M, { colorSchemes: F = m, components: ee = h, cssVarPrefix: I } = P, te = Object.keys(F).filter((e) => !!F[e]).join(","), L = n.useMemo(() => te.split(","), [te]), ne = typeof l == "string" ? l : l.light, re = typeof l == "string" ? l : l.dark, { mode: R, setMode: ie, systemMode: z, lightColorScheme: ae, darkColorScheme: oe, colorScheme: se, setColorScheme: ce } = Ki({
			supportedColorSchemes: L,
			defaultLightColorScheme: ne,
			defaultDarkColorScheme: re,
			modeStorageKey: g,
			colorSchemeStorageKey: _,
			defaultMode: F[ne] && F[re] ? T : F[P.defaultColorScheme]?.palette?.mode || P.palette?.mode,
			storageManager: y,
			storageWindow: b,
			noSsr: D
		}), le = R, ue = se;
		j && (le = A.mode, ue = A.colorScheme);
		let de = ue || P.defaultColorScheme;
		P.vars && !E && (de = P.defaultColorScheme);
		let B = n.useMemo(() => {
			let e = P.generateThemeVars?.() || P.vars, t = {
				...P,
				components: ee,
				colorSchemes: F,
				cssVarPrefix: I,
				vars: e
			};
			if (typeof t.generateSpacing == "function" && (t.spacing = t.generateSpacing()), de) {
				let e = F[de];
				e && typeof e == "object" && Object.keys(e).forEach((n) => {
					e[n] && typeof e[n] == "object" ? t[n] = {
						...t[n],
						...e[n]
					} : t[n] = e[n];
				});
			}
			return u ? u(t) : t;
		}, [
			P,
			de,
			ee,
			F,
			I
		]), V = P.colorSchemeSelector;
		Yr(() => {
			if (ue && S && V && V !== "media") {
				let e = V, t = V;
				if (e === "class" && (t = ".%s"), e === "data" && (t = "[data-%s]"), e?.startsWith("data-") && !e.includes("%s") && (t = `[${e}="%s"]`), t.startsWith(".")) S.classList.remove(...L.map((e) => t.substring(1).replace("%s", e))), S.classList.add(t.substring(1).replace("%s", ue));
				else {
					let e = t.replace("%s", ue).match(/\[([^\]]+)\]/);
					if (e) {
						let [t, n] = e[1].split("=");
						n || L.forEach((e) => {
							S.removeAttribute(t.replace(ue, e));
						}), S.setAttribute(t, n ? n.replace(/"|'/g, "") : "");
					} else S.setAttribute(t, ue);
				}
			}
		}, [
			ue,
			V,
			S,
			L
		]), n.useEffect(() => {
			let e;
			if (v && O.current && x) {
				let t = x.createElement("style");
				t.appendChild(x.createTextNode(qi)), x.head.appendChild(t), window.getComputedStyle(x.body), e = setTimeout(() => {
					x.head.removeChild(t);
				}, 1);
			}
			return () => {
				clearTimeout(e);
			};
		}, [
			ue,
			v,
			x
		]), n.useEffect(() => (O.current = !0, () => {
			O.current = !1;
		}), []);
		let H = n.useMemo(() => ({
			allColorSchemes: L,
			colorScheme: ue,
			darkColorScheme: oe,
			lightColorScheme: ae,
			mode: le,
			setColorScheme: ce,
			setMode: ie,
			systemMode: z
		}), [
			L,
			ue,
			oe,
			ae,
			le,
			ce,
			ie,
			z,
			B.colorSchemeSelector
		]), fe = !0;
		(w || P.cssVariables === !1 || j && k?.cssVarPrefix === I) && (fe = !1);
		let pe = /*#__PURE__*/ t(n.Fragment, { children: [/*#__PURE__*/ e(Ni, {
			themeId: N ? i : void 0,
			theme: B,
			children: d
		}), fe && /*#__PURE__*/ e(Qt, { styles: B.generateStyleSheets?.() || [] })] });
		return j ? pe : /*#__PURE__*/ e(f.Provider, {
			value: H,
			children: pe
		});
	}
	let _ = typeof l == "string" ? l : l.light, v = typeof l == "string" ? l : l.dark;
	return {
		CssVarsProvider: g,
		useColorScheme: p,
		getInitColorSchemeScript: (e) => zi({
			colorSchemeStorageKey: s,
			defaultLightColorScheme: _,
			defaultDarkColorScheme: v,
			modeStorageKey: o,
			...e
		})
	};
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/createGetCssVar.js
function Yi(e = "") {
	function t(...n) {
		if (!n.length) return "";
		let r = n[0];
		return typeof r == "string" && !r.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${r}${t(...n.slice(1))})` : `, ${r}`;
	}
	return (n, ...r) => `var(--${e ? `${e}-` : ""}${n}${t(...r)})`;
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/cssVarsParser.js
var Xi = (e, t, n, r = []) => {
	let i = e;
	t.forEach((e, a) => {
		a === t.length - 1 ? Array.isArray(i) ? i[Number(e)] = n : i && typeof i == "object" && (i[e] = n) : i && typeof i == "object" && (i[e] || (i[e] = r.includes(e) ? [] : {}), i = i[e]);
	});
}, Zi = (e, t, n) => {
	function r(e, i = [], a = []) {
		Object.entries(e).forEach(([e, o]) => {
			(!n || n && !n([...i, e])) && o != null && (typeof o == "object" && Object.keys(o).length > 0 ? r(o, [...i, e], Array.isArray(o) ? [...a, e] : a) : t([...i, e], o, a));
		});
	}
	r(e);
}, Qi = (e, t) => typeof t == "number" ? [
	"lineHeight",
	"fontWeight",
	"opacity",
	"zIndex"
].some((t) => e.includes(t)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function $i(e, t) {
	let { prefix: n, shouldSkipGeneratingVar: r } = t || {}, i = {}, a = {}, o = {};
	return Zi(e, (e, t, s) => {
		if ((typeof t == "string" || typeof t == "number") && (!r || !r(e, t))) {
			let r = `--${n ? `${n}-` : ""}${e.join("-")}`, c = Qi(e, t);
			Object.assign(i, { [r]: c }), Xi(a, e, `var(${r})`, s), Xi(o, e, `var(${r}, ${c})`, s);
		}
	}, (e) => e[0] === "vars"), {
		css: i,
		vars: a,
		varsWithDefaults: o
	};
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/prepareCssVars.js
function ea(e, t = {}) {
	let { getSelector: n = _, disableCssColorScheme: r, colorSchemeSelector: i, enableContrastVars: a } = t, { colorSchemes: o = {}, components: s, defaultColorScheme: c = "light", ...l } = e, { vars: u, css: d, varsWithDefaults: f } = $i(l, t), p = f, m = {}, { [c]: h, ...g } = o;
	if (Object.entries(g || {}).forEach(([e, n]) => {
		let { vars: r, css: i, varsWithDefaults: a } = $i(n, t);
		p = cn(p, a), m[e] = {
			css: i,
			vars: r
		};
	}), h) {
		let { css: e, vars: n, varsWithDefaults: r } = $i(h, t);
		p = cn(p, r), m[c] = {
			css: e,
			vars: n
		};
	}
	function _(t, n) {
		let r = i;
		if (i === "class" && (r = ".%s"), i === "data" && (r = "[data-%s]"), i?.startsWith("data-") && !i.includes("%s") && (r = `[${i}="%s"]`), t) {
			if (r === "media") return e.defaultColorScheme === t ? ":root" : { [`@media (prefers-color-scheme: ${o[t]?.palette?.mode || t})`]: { ":root": n } };
			if (r) return e.defaultColorScheme === t ? `:root, ${r.replace("%s", String(t))}` : r.replace("%s", String(t));
		}
		return ":root";
	}
	return {
		vars: p,
		generateThemeVars: () => {
			let e = { ...u };
			return Object.entries(m).forEach(([, { vars: t }]) => {
				e = cn(e, t);
			}), e;
		},
		generateStyleSheets: () => {
			let t = [], i = e.defaultColorScheme || "light";
			function s(e, n) {
				Object.keys(n).length && t.push(typeof e == "string" ? { [e]: { ...n } } : e);
			}
			s(n(void 0, { ...d }), d);
			let { [i]: c, ...l } = m;
			if (c) {
				let { css: e } = c, t = o[i]?.palette?.mode, a = !r && t ? {
					colorScheme: t,
					...e
				} : { ...e };
				s(n(i, { ...a }), a);
			}
			return Object.entries(l).forEach(([e, { css: t }]) => {
				let i = o[e]?.palette?.mode, a = !r && i ? {
					colorScheme: i,
					...t
				} : { ...t };
				s(n(e, { ...a }), a);
			}), a && t.push({ ":root": {
				"--__l-threshold": "0.7",
				"--__l": "clamp(0, (l / var(--__l-threshold) - 1) * -infinity, 1)",
				"--__a": "clamp(0.87, (l / var(--__l-threshold) - 1) * -infinity, 1)"
			} }), t;
		}
	};
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/getColorSchemeSelector.js
function ta(e) {
	return function(t) {
		return e === "media" ? `@media (prefers-color-scheme: ${t})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${t}"] &` : e === "class" ? `.${t} &` : e === "data" ? `[data-${t}] &` : `${e.replace("%s", t)} &` : "&";
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function K(e, t, n = void 0) {
	let r = {};
	for (let i in e) {
		let a = e[i], o = "", s = !0;
		for (let e = 0; e < a.length; e += 1) {
			let r = a[e];
			r && (o += (s === !0 ? "" : " ") + t(r), s = !1, n && n[r] && (o += " " + n[r]));
		}
		r[i] = o;
	}
	return r;
}
//#endregion
//#region node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
function na(e, t) {
	return /*#__PURE__*/ n.isValidElement(e) && t.indexOf(e.type.muiName ?? e.type?._payload?.value?.muiName) !== -1;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/createPalette.js
function ra() {
	return {
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)"
		},
		divider: "rgba(0, 0, 0, 0.12)",
		background: {
			paper: Mt.white,
			default: Mt.white
		},
		action: {
			active: "rgba(0, 0, 0, 0.54)",
			hover: "rgba(0, 0, 0, 0.04)",
			hoverOpacity: .04,
			selected: "rgba(0, 0, 0, 0.08)",
			selectedOpacity: .08,
			disabled: "rgba(0, 0, 0, 0.26)",
			disabledBackground: "rgba(0, 0, 0, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(0, 0, 0, 0.12)",
			focusOpacity: .12,
			activatedOpacity: .12
		}
	};
}
var ia = ra();
function aa() {
	return {
		text: {
			primary: Mt.white,
			secondary: "rgba(255, 255, 255, 0.7)",
			disabled: "rgba(255, 255, 255, 0.5)",
			icon: "rgba(255, 255, 255, 0.5)"
		},
		divider: "rgba(255, 255, 255, 0.12)",
		background: {
			paper: "#121212",
			default: "#121212"
		},
		action: {
			active: Mt.white,
			hover: "rgba(255, 255, 255, 0.08)",
			hoverOpacity: .08,
			selected: "rgba(255, 255, 255, 0.16)",
			selectedOpacity: .16,
			disabled: "rgba(255, 255, 255, 0.3)",
			disabledBackground: "rgba(255, 255, 255, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(255, 255, 255, 0.12)",
			focusOpacity: .12,
			activatedOpacity: .24
		}
	};
}
var oa = aa();
function sa(e, t, n, r) {
	let i = r.light || r, a = r.dark || r * 1.5;
	e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = ui(e.main, i) : t === "dark" && (e.dark = ci(e.main, a)));
}
function ca(e, t, n, r, i) {
	let a = i.light || i, o = i.dark || i * 1.5;
	t[n] || (t.hasOwnProperty(r) ? t[n] = t[r] : n === "light" ? t.light = `color-mix(in ${e}, ${t.main}, #fff ${(a * 100).toFixed(0)}%)` : n === "dark" && (t.dark = `color-mix(in ${e}, ${t.main}, #000 ${(o * 100).toFixed(0)}%)`));
}
function la(e = "light") {
	return e === "dark" ? {
		main: Ft[200],
		light: Ft[50],
		dark: Ft[400]
	} : {
		main: Ft[700],
		light: Ft[400],
		dark: Ft[800]
	};
}
function ua(e = "light") {
	return e === "dark" ? {
		main: Pt[200],
		light: Pt[50],
		dark: Pt[400]
	} : {
		main: Pt[500],
		light: Pt[300],
		dark: Pt[700]
	};
}
function da(e = "light") {
	return e === "dark" ? {
		main: Nt[500],
		light: Nt[300],
		dark: Nt[700]
	} : {
		main: Nt[700],
		light: Nt[400],
		dark: Nt[800]
	};
}
function fa(e = "light") {
	return e === "dark" ? {
		main: It[400],
		light: It[300],
		dark: It[700]
	} : {
		main: It[700],
		light: It[500],
		dark: It[900]
	};
}
function pa(e = "light") {
	return e === "dark" ? {
		main: Lt[400],
		light: Lt[300],
		dark: Lt[700]
	} : {
		main: Lt[800],
		light: Lt[500],
		dark: Lt[900]
	};
}
function ma(e = "light") {
	return e === "dark" ? {
		main: Rt[400],
		light: Rt[300],
		dark: Rt[700]
	} : {
		main: "#ed6c02",
		light: Rt[500],
		dark: Rt[900]
	};
}
function ha(e) {
	return `oklch(from ${e} var(--__l) 0 h / var(--__a))`;
}
function ga(e) {
	let { mode: t = "light", contrastThreshold: n = 3, tonalOffset: r = .2, colorSpace: i, ...a } = e, o = e.primary || la(t), s = e.secondary || ua(t), c = e.error || da(t), l = e.info || fa(t), u = e.success || pa(t), d = e.warning || ma(t);
	function f(e) {
		return i ? ha(e) : ai(e, oa.text.primary) >= n ? oa.text.primary : ia.text.primary;
	}
	let p = ({ color: e, name: t, mainShade: n = 500, lightShade: a = 300, darkShade: o = 700 }) => {
		if (e = { ...e }, !e.main && e[n] && (e.main = e[n]), !e.hasOwnProperty("main")) throw Error(Bt(11, t ? ` (${t})` : "", n));
		if (typeof e.main != "string") throw Error(Bt(12, t ? ` (${t})` : "", JSON.stringify(e.main)));
		return i ? (ca(i, e, "light", a, r), ca(i, e, "dark", o, r)) : (sa(e, "light", a, r), sa(e, "dark", o, r)), e.contrastText || (e.contrastText = f(e.main)), e;
	}, m;
	return t === "light" ? m = ra() : t === "dark" && (m = aa()), cn({
		common: { ...Mt },
		mode: t,
		primary: p({
			color: o,
			name: "primary"
		}),
		secondary: p({
			color: s,
			name: "secondary",
			mainShade: "A400",
			lightShade: "A200",
			darkShade: "A700"
		}),
		error: p({
			color: c,
			name: "error"
		}),
		warning: p({
			color: d,
			name: "warning"
		}),
		info: p({
			color: l,
			name: "info"
		}),
		success: p({
			color: u,
			name: "success"
		}),
		grey: zt,
		contrastThreshold: n,
		getContrastText: f,
		augmentColor: p,
		tonalOffset: r,
		...m
	}, a);
}
//#endregion
//#region node_modules/@mui/system/esm/cssVars/prepareTypographyVars.js
function _a(e) {
	let t = {};
	return Object.entries(e).forEach((e) => {
		let [n, r] = e;
		typeof r == "object" && (t[n] = `${r.fontStyle ? `${r.fontStyle} ` : ""}${r.fontVariant ? `${r.fontVariant} ` : ""}${r.fontWeight ? `${r.fontWeight} ` : ""}${r.fontStretch ? `${r.fontStretch} ` : ""}${r.fontSize || ""}${r.lineHeight ? `/${r.lineHeight} ` : ""}${r.fontFamily || ""}`);
	}), t;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/createMixins.js
function va(e, t) {
	return {
		toolbar: {
			minHeight: 56,
			[e.up("xs")]: { "@media (orientation: landscape)": { minHeight: 48 } },
			[e.up("sm")]: { minHeight: 64 }
		},
		...t
	};
}
//#endregion
//#region node_modules/@mui/material/esm/styles/createTypography.js
function ya(e) {
	return Math.round(e * 1e5) / 1e5;
}
var ba = { textTransform: "uppercase" }, xa = "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif";
function Sa(e, t) {
	let { fontFamily: n = xa, fontSize: r = 14, fontWeightLight: i = 300, fontWeightRegular: a = 400, fontWeightMedium: o = 500, fontWeightBold: s = 700, htmlFontSize: c = 16, allVariants: l, pxToRem: u, ...d } = typeof t == "function" ? t(e) : t, f = r / 14, p = u || ((e) => `${e / c * f}rem`), m = (e, t, r, i, a) => ({
		fontFamily: n,
		fontWeight: e,
		fontSize: p(t),
		lineHeight: r,
		...n === xa ? { letterSpacing: `${ya(i / t)}em` } : {},
		...a,
		...l
	});
	return cn({
		htmlFontSize: c,
		pxToRem: p,
		fontFamily: n,
		fontSize: r,
		fontWeightLight: i,
		fontWeightRegular: a,
		fontWeightMedium: o,
		fontWeightBold: s,
		h1: m(i, 96, 1.167, -1.5),
		h2: m(i, 60, 1.2, -.5),
		h3: m(a, 48, 1.167, 0),
		h4: m(a, 34, 1.235, .25),
		h5: m(a, 24, 1.334, 0),
		h6: m(o, 20, 1.6, .15),
		subtitle1: m(a, 16, 1.75, .15),
		subtitle2: m(o, 14, 1.57, .1),
		body1: m(a, 16, 1.5, .15),
		body2: m(a, 14, 1.43, .15),
		button: m(o, 14, 1.75, .4, ba),
		caption: m(a, 12, 1.66, .4),
		overline: m(a, 12, 2.66, 1, ba),
		inherit: {
			fontFamily: "inherit",
			fontWeight: "inherit",
			fontSize: "inherit",
			lineHeight: "inherit",
			letterSpacing: "inherit"
		}
	}, d, { clone: !1 });
}
//#endregion
//#region node_modules/@mui/material/esm/styles/shadows.js
var Ca = .2, wa = .14, Ta = .12;
function Ea(...e) {
	return [
		`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ca})`,
		`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${wa})`,
		`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ta})`
	].join(",");
}
var Da = [
	"none",
	Ea(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
	Ea(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
	Ea(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
	Ea(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
	Ea(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
	Ea(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
	Ea(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
	Ea(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
	Ea(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
	Ea(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
	Ea(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
	Ea(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
	Ea(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
	Ea(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
	Ea(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
	Ea(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
	Ea(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
	Ea(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
	Ea(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
	Ea(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
	Ea(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
	Ea(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
	Ea(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
	Ea(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
], Oa = {
	easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
	easeIn: "cubic-bezier(0.4, 0, 1, 1)",
	sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ka = {
	shortest: 150,
	shorter: 200,
	short: 250,
	standard: 300,
	complex: 375,
	enteringScreen: 225,
	leavingScreen: 195
};
function Aa(e) {
	return `${Math.round(e)}ms`;
}
function ja(e) {
	if (!e) return 0;
	let t = e / 36;
	return Math.min(Math.round((4 + 15 * t ** .25 + t / 5) * 10), 3e3);
}
function Ma(e) {
	let t = {
		...Oa,
		...e.easing
	}, n = {
		...ka,
		...e.duration
	};
	return {
		getAutoHeightDuration: ja,
		create: (e = ["all"], r = {}) => {
			let { duration: i = n.standard, easing: a = t.easeInOut, delay: o = 0, ...s } = r;
			return (Array.isArray(e) ? e : [e]).map((e) => `${e} ${typeof i == "string" ? i : Aa(i)} ${a} ${typeof o == "string" ? o : Aa(o)}`).join(",");
		},
		...e,
		easing: t,
		duration: n
	};
}
//#endregion
//#region node_modules/@mui/material/esm/styles/zIndex.js
var Na = {
	mobileStepper: 1e3,
	fab: 1050,
	speedDial: 1050,
	appBar: 1100,
	drawer: 1200,
	modal: 1300,
	snackbar: 1400,
	tooltip: 1500
};
//#endregion
//#region node_modules/@mui/material/esm/styles/stringifyTheme.js
function Pa(e) {
	return on(e) || e === void 0 || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function Fa(e = {}) {
	let t = { ...e };
	function n(e) {
		let t = Object.entries(e);
		for (let r = 0; r < t.length; r++) {
			let [i, a] = t[r];
			!Pa(a) || i.startsWith("unstable_") ? delete e[i] : on(a) && (e[i] = { ...a }, n(e[i]));
		}
	}
	return n(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/createThemeNoVars.js
function Ia(e) {
	return typeof e == "number" ? `${(e * 100).toFixed(0)}%` : `calc((${e}) * 100%)`;
}
var La = (e) => {
	if (!Number.isNaN(+e)) return +e;
	let t = e.match(/\d*\.?\d+/g);
	if (!t) return 0;
	let n = 0;
	for (let e = 0; e < t.length; e += 1) n += +t[e];
	return n;
};
function Ra(e) {
	Object.assign(e, {
		alpha(t, n) {
			let r = this || e;
			return r.colorSpace ? `oklch(from ${t} l c h / ${typeof n == "string" ? `calc(${n})` : n})` : r.vars ? `rgba(${t.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof n == "string" ? `calc(${n})` : n})` : oi(t, La(n));
		},
		lighten(t, n) {
			let r = this || e;
			return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #fff ${Ia(n)})` : ui(t, n);
		},
		darken(t, n) {
			let r = this || e;
			return r.colorSpace ? `color-mix(in ${r.colorSpace}, ${t}, #000 ${Ia(n)})` : ci(t, n);
		}
	});
}
function za(e = {}, ...t) {
	let { breakpoints: n, mixins: r = {}, spacing: i, palette: a = {}, transitions: o = {}, typography: s = {}, shape: c, colorSpace: l, ...u } = e;
	if (e.vars && e.generateThemeVars === void 0) throw Error(Bt(20));
	let d = ga({
		...a,
		colorSpace: l
	}), f = Sr(e), p = cn(f, {
		mixins: va(f.breakpoints, r),
		palette: d,
		shadows: Da.slice(),
		typography: Sa(d, s),
		transitions: Ma(o),
		zIndex: { ...Na }
	});
	return p = cn(p, u), p = t.reduce((e, t) => cn(e, t), p), p.unstable_sxConfig = {
		...gr,
		...u?.unstable_sxConfig
	}, p.unstable_sx = function(e) {
		return br({
			sx: e,
			theme: this
		});
	}, p.toRuntimeSource = Fa, Ra(p), p;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/getOverlayAlpha.js
function Ba(e) {
	let t;
	return t = e < 1 ? 5.11916 * e ** 2 : 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/createColorScheme.js
var Va = [...Array(25)].map((e, t) => {
	if (t === 0) return "none";
	let n = Ba(t);
	return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function Ha(e) {
	return {
		inputPlaceholder: e === "dark" ? .5 : .42,
		inputUnderline: e === "dark" ? .7 : .42,
		switchTrackDisabled: e === "dark" ? .2 : .12,
		switchTrack: e === "dark" ? .3 : .38
	};
}
function Ua(e) {
	return e === "dark" ? Va : [];
}
function Wa(e) {
	let { palette: t = { mode: "light" }, opacity: n, overlays: r, colorSpace: i, ...a } = e, o = ga({
		...t,
		colorSpace: i
	});
	return {
		palette: o,
		opacity: {
			...Ha(o.mode),
			...n
		},
		overlays: r || Ua(o.mode),
		...a
	};
}
//#endregion
//#region node_modules/@mui/material/esm/styles/shouldSkipGeneratingVar.js
function Ga(e) {
	return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || e[0] === "palette" && !!e[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
//#endregion
//#region node_modules/@mui/material/esm/styles/excludeVariablesFromRoot.js
var Ka = (e) => [
	...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`),
	`--${e ? `${e}-` : ""}palette-AppBar-darkBg`,
	`--${e ? `${e}-` : ""}palette-AppBar-darkColor`
], qa = (e) => (t, n) => {
	let r = e.rootSelector || ":root", i = e.colorSchemeSelector, a = i;
	if (i === "class" && (a = ".%s"), i === "data" && (a = "[data-%s]"), i?.startsWith("data-") && !i.includes("%s") && (a = `[${i}="%s"]`), e.defaultColorScheme === t) {
		if (t === "dark") {
			let i = {};
			return Ka(e.cssVarPrefix).forEach((e) => {
				i[e] = n[e], delete n[e];
			}), a === "media" ? {
				[r]: n,
				"@media (prefers-color-scheme: dark)": { [r]: i }
			} : a ? {
				[a.replace("%s", t)]: i,
				[`${r}, ${a.replace("%s", t)}`]: n
			} : { [r]: {
				...n,
				...i
			} };
		}
		if (a && a !== "media") return `${r}, ${a.replace("%s", String(t))}`;
	} else if (t) {
		if (a === "media") return { [`@media (prefers-color-scheme: ${String(t)})`]: { [r]: n } };
		if (a) return a.replace("%s", String(t));
	}
	return r;
};
//#endregion
//#region node_modules/@mui/material/esm/styles/createThemeWithVars.js
function Ja(e, t) {
	t.forEach((t) => {
		e[t] || (e[t] = {});
	});
}
function q(e, t, n) {
	!e[t] && n && (e[t] = n);
}
function Ya(e) {
	return typeof e != "string" || !e.startsWith("hsl") ? e : ri(e);
}
function Xa(e, t) {
	`${t}Channel` in e || (e[`${t}Channel`] = ti(Ya(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function Za(e) {
	return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
var Qa = (e) => {
	try {
		return e();
	} catch {}
}, $a = (e = "mui") => Yi(e);
function eo(e, t, n, r, i) {
	if (!n) return;
	n = n === !0 ? {} : n;
	let a = i === "dark" ? "dark" : "light";
	if (!r) {
		t[i] = Wa({
			...n,
			palette: {
				mode: a,
				...n?.palette
			},
			colorSpace: e
		});
		return;
	}
	let { palette: o, ...s } = za({
		...r,
		palette: {
			mode: a,
			...n?.palette
		},
		colorSpace: e
	});
	return t[i] = {
		...n,
		palette: o,
		opacity: {
			...Ha(a),
			...n?.opacity
		},
		overlays: n?.overlays || Ua(a)
	}, s;
}
function to(e = {}, ...t) {
	let { colorSchemes: n = { light: !0 }, defaultColorScheme: r, disableCssColorScheme: i = !1, cssVarPrefix: a = "mui", nativeColor: o = !1, shouldSkipGeneratingVar: s = Ga, colorSchemeSelector: c = n.light && n.dark ? "media" : void 0, rootSelector: l = ":root", ...u } = e, d = Object.keys(n)[0], f = r || (n.light && d !== "light" ? "light" : d), p = $a(a), { [f]: m, light: h, dark: g, ..._ } = n, v = { ..._ }, y = m;
	if ((f === "dark" && !("dark" in n) || f === "light" && !("light" in n)) && (y = !0), !y) throw Error(Bt(21, f));
	let b;
	o && (b = "oklch");
	let x = eo(b, v, y, u, f);
	h && !v.light && eo(b, v, h, void 0, "light"), g && !v.dark && eo(b, v, g, void 0, "dark");
	let S = {
		defaultColorScheme: f,
		...x,
		cssVarPrefix: a,
		colorSchemeSelector: c,
		rootSelector: l,
		getCssVar: p,
		colorSchemes: v,
		font: {
			..._a(x.typography),
			...x.font
		},
		spacing: Za(u.spacing)
	};
	Object.keys(S.colorSchemes).forEach((e) => {
		let t = S.colorSchemes[e].palette, n = (e) => {
			let n = e.split("-"), r = n[1], i = n[2];
			return p(e, t[r][i]);
		};
		t.mode === "light" && (q(t.common, "background", "#fff"), q(t.common, "onBackground", "#000")), t.mode === "dark" && (q(t.common, "background", "#000"), q(t.common, "onBackground", "#fff"));
		function r(e, t, n) {
			if (b) {
				let r;
				return e === si && (r = `transparent ${((1 - n) * 100).toFixed(0)}%`), e === li && (r = `#000 ${(n * 100).toFixed(0)}%`), e === di && (r = `#fff ${(n * 100).toFixed(0)}%`), `color-mix(in ${b}, ${t}, ${r})`;
			}
			return e(t, n);
		}
		if (Ja(t, [
			"Alert",
			"AppBar",
			"Avatar",
			"Button",
			"Chip",
			"FilledInput",
			"LinearProgress",
			"Skeleton",
			"Slider",
			"SnackbarContent",
			"SpeedDialAction",
			"StepConnector",
			"StepContent",
			"Switch",
			"TableCell",
			"Tooltip"
		]), t.mode === "light") {
			q(t.Alert, "errorColor", r(li, o ? p("palette-error-light") : t.error.light, .6)), q(t.Alert, "infoColor", r(li, o ? p("palette-info-light") : t.info.light, .6)), q(t.Alert, "successColor", r(li, o ? p("palette-success-light") : t.success.light, .6)), q(t.Alert, "warningColor", r(li, o ? p("palette-warning-light") : t.warning.light, .6)), q(t.Alert, "errorFilledBg", n("palette-error-main")), q(t.Alert, "infoFilledBg", n("palette-info-main")), q(t.Alert, "successFilledBg", n("palette-success-main")), q(t.Alert, "warningFilledBg", n("palette-warning-main")), q(t.Alert, "errorFilledColor", Qa(() => t.getContrastText(t.error.main))), q(t.Alert, "infoFilledColor", Qa(() => t.getContrastText(t.info.main))), q(t.Alert, "successFilledColor", Qa(() => t.getContrastText(t.success.main))), q(t.Alert, "warningFilledColor", Qa(() => t.getContrastText(t.warning.main))), q(t.Alert, "errorStandardBg", r(di, o ? p("palette-error-light") : t.error.light, .9)), q(t.Alert, "infoStandardBg", r(di, o ? p("palette-info-light") : t.info.light, .9)), q(t.Alert, "successStandardBg", r(di, o ? p("palette-success-light") : t.success.light, .9)), q(t.Alert, "warningStandardBg", r(di, o ? p("palette-warning-light") : t.warning.light, .9)), q(t.Alert, "errorIconColor", n("palette-error-main")), q(t.Alert, "infoIconColor", n("palette-info-main")), q(t.Alert, "successIconColor", n("palette-success-main")), q(t.Alert, "warningIconColor", n("palette-warning-main")), q(t.AppBar, "defaultBg", n("palette-grey-100")), q(t.Avatar, "defaultBg", n("palette-grey-400")), q(t.Button, "inheritContainedBg", n("palette-grey-300")), q(t.Button, "inheritContainedHoverBg", n("palette-grey-A100")), q(t.Chip, "defaultBorder", n("palette-grey-400")), q(t.Chip, "defaultAvatarColor", n("palette-grey-700")), q(t.Chip, "defaultIconColor", n("palette-grey-700")), q(t.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), q(t.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), q(t.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), q(t.LinearProgress, "primaryBg", r(di, o ? p("palette-primary-main") : t.primary.main, .62)), q(t.LinearProgress, "secondaryBg", r(di, o ? p("palette-secondary-main") : t.secondary.main, .62)), q(t.LinearProgress, "errorBg", r(di, o ? p("palette-error-main") : t.error.main, .62)), q(t.LinearProgress, "infoBg", r(di, o ? p("palette-info-main") : t.info.main, .62)), q(t.LinearProgress, "successBg", r(di, o ? p("palette-success-main") : t.success.main, .62)), q(t.LinearProgress, "warningBg", r(di, o ? p("palette-warning-light") : t.warning.main, .62)), q(t.Skeleton, "bg", b ? r(si, o ? p("palette-text-primary") : t.text.primary, .11) : `rgba(${n("palette-text-primaryChannel")} / 0.11)`), q(t.Slider, "primaryTrack", r(di, o ? p("palette-primary-main") : t.primary.main, .62)), q(t.Slider, "secondaryTrack", r(di, o ? p("palette-secondary-main") : t.secondary.main, .62)), q(t.Slider, "errorTrack", r(di, o ? p("palette-error-main") : t.error.main, .62)), q(t.Slider, "infoTrack", r(di, o ? p("palette-info-main") : t.info.main, .62)), q(t.Slider, "successTrack", r(di, o ? p("palette-success-main") : t.success.main, .62)), q(t.Slider, "warningTrack", r(di, o ? p("palette-warning-main") : t.warning.main, .62));
			let e = b ? r(li, o ? p("palette-background-default") : t.background.default, .6825) : pi(t.background.default, .8);
			q(t.SnackbarContent, "bg", e), q(t.SnackbarContent, "color", Qa(() => b ? oa.text.primary : t.getContrastText(e))), q(t.SpeedDialAction, "fabHoverBg", pi(t.background.paper, .15)), q(t.StepConnector, "border", n("palette-grey-400")), q(t.StepContent, "border", n("palette-grey-400")), q(t.Switch, "defaultColor", n("palette-common-white")), q(t.Switch, "defaultDisabledColor", n("palette-grey-100")), q(t.Switch, "primaryDisabledColor", r(di, o ? p("palette-primary-main") : t.primary.main, .62)), q(t.Switch, "secondaryDisabledColor", r(di, o ? p("palette-secondary-main") : t.secondary.main, .62)), q(t.Switch, "errorDisabledColor", r(di, o ? p("palette-error-main") : t.error.main, .62)), q(t.Switch, "infoDisabledColor", r(di, o ? p("palette-info-main") : t.info.main, .62)), q(t.Switch, "successDisabledColor", r(di, o ? p("palette-success-main") : t.success.main, .62)), q(t.Switch, "warningDisabledColor", r(di, o ? p("palette-warning-main") : t.warning.main, .62)), q(t.TableCell, "border", r(di, si(o ? p("palette-divider") : t.divider, 1), .88)), q(t.Tooltip, "bg", r(si, o ? p("palette-grey-700") : t.grey[700], .92));
		}
		if (t.mode === "dark") {
			q(t.Alert, "errorColor", r(di, o ? p("palette-error-light") : t.error.light, .6)), q(t.Alert, "infoColor", r(di, o ? p("palette-info-light") : t.info.light, .6)), q(t.Alert, "successColor", r(di, o ? p("palette-success-light") : t.success.light, .6)), q(t.Alert, "warningColor", r(di, o ? p("palette-warning-light") : t.warning.light, .6)), q(t.Alert, "errorFilledBg", n("palette-error-dark")), q(t.Alert, "infoFilledBg", n("palette-info-dark")), q(t.Alert, "successFilledBg", n("palette-success-dark")), q(t.Alert, "warningFilledBg", n("palette-warning-dark")), q(t.Alert, "errorFilledColor", Qa(() => t.getContrastText(t.error.dark))), q(t.Alert, "infoFilledColor", Qa(() => t.getContrastText(t.info.dark))), q(t.Alert, "successFilledColor", Qa(() => t.getContrastText(t.success.dark))), q(t.Alert, "warningFilledColor", Qa(() => t.getContrastText(t.warning.dark))), q(t.Alert, "errorStandardBg", r(li, o ? p("palette-error-light") : t.error.light, .9)), q(t.Alert, "infoStandardBg", r(li, o ? p("palette-info-light") : t.info.light, .9)), q(t.Alert, "successStandardBg", r(li, o ? p("palette-success-light") : t.success.light, .9)), q(t.Alert, "warningStandardBg", r(li, o ? p("palette-warning-light") : t.warning.light, .9)), q(t.Alert, "errorIconColor", n("palette-error-main")), q(t.Alert, "infoIconColor", n("palette-info-main")), q(t.Alert, "successIconColor", n("palette-success-main")), q(t.Alert, "warningIconColor", n("palette-warning-main")), q(t.AppBar, "defaultBg", n("palette-grey-900")), q(t.AppBar, "darkBg", n("palette-background-paper")), q(t.AppBar, "darkColor", n("palette-text-primary")), q(t.Avatar, "defaultBg", n("palette-grey-600")), q(t.Button, "inheritContainedBg", n("palette-grey-800")), q(t.Button, "inheritContainedHoverBg", n("palette-grey-700")), q(t.Chip, "defaultBorder", n("palette-grey-700")), q(t.Chip, "defaultAvatarColor", n("palette-grey-300")), q(t.Chip, "defaultIconColor", n("palette-grey-300")), q(t.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), q(t.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), q(t.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), q(t.LinearProgress, "primaryBg", r(li, o ? p("palette-primary-main") : t.primary.main, .5)), q(t.LinearProgress, "secondaryBg", r(li, o ? p("palette-secondary-main") : t.secondary.main, .5)), q(t.LinearProgress, "errorBg", r(li, o ? p("palette-error-main") : t.error.main, .5)), q(t.LinearProgress, "infoBg", r(li, o ? p("palette-info-main") : t.info.main, .5)), q(t.LinearProgress, "successBg", r(li, o ? p("palette-success-main") : t.success.main, .5)), q(t.LinearProgress, "warningBg", r(li, o ? p("palette-warning-main") : t.warning.main, .5)), q(t.Skeleton, "bg", b ? r(si, o ? p("palette-text-primary") : t.text.primary, .13) : `rgba(${n("palette-text-primaryChannel")} / 0.13)`), q(t.Slider, "primaryTrack", r(li, o ? p("palette-primary-main") : t.primary.main, .5)), q(t.Slider, "secondaryTrack", r(li, o ? p("palette-secondary-main") : t.secondary.main, .5)), q(t.Slider, "errorTrack", r(li, o ? p("palette-error-main") : t.error.main, .5)), q(t.Slider, "infoTrack", r(li, o ? p("palette-info-main") : t.info.main, .5)), q(t.Slider, "successTrack", r(li, o ? p("palette-success-main") : t.success.main, .5)), q(t.Slider, "warningTrack", r(li, o ? p("palette-warning-light") : t.warning.main, .5));
			let e = b ? r(di, o ? p("palette-background-default") : t.background.default, .985) : pi(t.background.default, .98);
			q(t.SnackbarContent, "bg", e), q(t.SnackbarContent, "color", Qa(() => b ? ia.text.primary : t.getContrastText(e))), q(t.SpeedDialAction, "fabHoverBg", pi(t.background.paper, .15)), q(t.StepConnector, "border", n("palette-grey-600")), q(t.StepContent, "border", n("palette-grey-600")), q(t.Switch, "defaultColor", n("palette-grey-300")), q(t.Switch, "defaultDisabledColor", n("palette-grey-600")), q(t.Switch, "primaryDisabledColor", r(li, o ? p("palette-primary-main") : t.primary.main, .55)), q(t.Switch, "secondaryDisabledColor", r(li, o ? p("palette-secondary-main") : t.secondary.main, .55)), q(t.Switch, "errorDisabledColor", r(li, o ? p("palette-error-main") : t.error.main, .55)), q(t.Switch, "infoDisabledColor", r(li, o ? p("palette-info-main") : t.info.main, .55)), q(t.Switch, "successDisabledColor", r(li, o ? p("palette-success-main") : t.success.main, .55)), q(t.Switch, "warningDisabledColor", r(li, o ? p("palette-warning-light") : t.warning.main, .55)), q(t.TableCell, "border", r(li, si(o ? p("palette-divider") : t.divider, 1), .68)), q(t.Tooltip, "bg", r(si, o ? p("palette-grey-700") : t.grey[700], .92));
		}
		o || (Xa(t.background, "default"), Xa(t.background, "paper"), Xa(t.common, "background"), Xa(t.common, "onBackground"), Xa(t, "divider")), Object.keys(t).forEach((e) => {
			let n = t[e];
			e !== "tonalOffset" && !o && n && typeof n == "object" && (n.main && q(t[e], "mainChannel", ti(Ya(n.main))), n.light && q(t[e], "lightChannel", ti(Ya(n.light))), n.dark && q(t[e], "darkChannel", ti(Ya(n.dark))), n.contrastText && q(t[e], "contrastTextChannel", ti(Ya(n.contrastText))), e === "text" && (Xa(t[e], "primary"), Xa(t[e], "secondary")), e === "action" && (n.active && Xa(t[e], "active"), n.selected && Xa(t[e], "selected")));
		});
	}), S = t.reduce((e, t) => cn(e, t), S);
	let C = {
		prefix: a,
		disableCssColorScheme: i,
		shouldSkipGeneratingVar: s,
		getSelector: qa(S),
		enableContrastVars: o
	}, { vars: w, generateThemeVars: T, generateStyleSheets: E } = ea(S, C);
	return S.vars = w, Object.entries(S.colorSchemes[S.defaultColorScheme]).forEach(([e, t]) => {
		S[e] = t;
	}), S.generateThemeVars = T, S.generateStyleSheets = E, S.generateSpacing = function() {
		return Hn(u.spacing, Fn(this));
	}, S.getColorSchemeSelector = ta(c), S.spacing = S.generateSpacing(), S.shouldSkipGeneratingVar = s, S.unstable_sxConfig = {
		...gr,
		...u?.unstable_sxConfig
	}, S.unstable_sx = function(e) {
		return br({
			sx: e,
			theme: this
		});
	}, S.toRuntimeSource = Fa, S;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/createTheme.js
function no(e, t, n) {
	e.colorSchemes && n && (e.colorSchemes[t] = {
		...n !== !0 && n,
		palette: ga({
			...n === !0 ? {} : n.palette,
			mode: t
		})
	});
}
function ro(e = {}, ...t) {
	let { palette: n, cssVariables: r = !1, colorSchemes: i = n ? void 0 : { light: !0 }, defaultColorScheme: a = n?.mode, ...o } = e, s = a || "light", c = i?.[s], l = {
		...i,
		...n ? { [s]: {
			...typeof c != "boolean" && c,
			palette: n
		} } : void 0
	};
	if (r === !1) {
		if (!("colorSchemes" in e)) return za(e, ...t);
		let r = n;
		"palette" in e || l[s] && (l[s] === !0 ? s === "dark" && (r = { mode: "dark" }) : r = l[s].palette);
		let i = za({
			...e,
			palette: r
		}, ...t);
		return i.defaultColorScheme = s, i.colorSchemes = l, i.palette.mode === "light" && (i.colorSchemes.light = {
			...l.light !== !0 && l.light,
			palette: i.palette
		}, no(i, "dark", l.dark)), i.palette.mode === "dark" && (i.colorSchemes.dark = {
			...l.dark !== !0 && l.dark,
			palette: i.palette
		}, no(i, "light", l.light)), i;
	}
	return !n && !("light" in l) && s === "light" && (l.light = !0), to({
		...o,
		colorSchemes: l,
		defaultColorScheme: s,
		...typeof r != "boolean" && r
	}, ...t);
}
//#endregion
//#region node_modules/@mui/material/esm/styles/defaultTheme.js
var io = ro();
//#endregion
//#region node_modules/@mui/material/esm/styles/useTheme.js
function ao() {
	let e = Er(io);
	return e.$$material || e;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/slotShouldForwardProp.js
function oo(e) {
	return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
//#endregion
//#region node_modules/@mui/material/esm/styles/rootShouldForwardProp.js
var so = (e) => oo(e) && e !== "classes", J = Wr({
	themeId: Vt,
	defaultTheme: io,
	rootShouldForwardProp: so
});
//#endregion
//#region node_modules/@mui/material/esm/styles/ThemeProviderNoVars.js
function co({ theme: t, ...n }) {
	let r = "$$material" in t ? t[Vt] : void 0;
	return /*#__PURE__*/ e(Ni, {
		...n,
		themeId: r ? Vt : void 0,
		theme: r || t
	});
}
//#endregion
//#region node_modules/@mui/material/esm/InitColorSchemeScript/InitColorSchemeScript.js
var lo = {
	attribute: "data-mui-color-scheme",
	colorSchemeStorageKey: "mui-color-scheme",
	defaultLightColorScheme: "light",
	defaultDarkColorScheme: "dark",
	modeStorageKey: "mui-mode"
}, { CssVarsProvider: uo, useColorScheme: fo, getInitColorSchemeScript: po } = Ji({
	themeId: Vt,
	theme: () => ro({ cssVariables: !0 }),
	colorSchemeStorageKey: lo.colorSchemeStorageKey,
	modeStorageKey: lo.modeStorageKey,
	defaultColorScheme: {
		light: lo.defaultLightColorScheme,
		dark: lo.defaultDarkColorScheme
	},
	resolveTheme: (e) => {
		let t = {
			...e,
			typography: Sa(e.palette, e.typography)
		};
		return t.unstable_sx = function(e) {
			return br({
				sx: e,
				theme: this
			});
		}, t;
	}
}), mo = uo;
//#endregion
//#region node_modules/@mui/material/esm/styles/ThemeProvider.js
function ho({ theme: t, ...r }) {
	let i = n.useMemo(() => {
		if (typeof t == "function") return t;
		let e = "$$material" in t ? t[Vt] : t;
		return "colorSchemes" in e ? null : "vars" in e ? t : {
			...t,
			vars: null
		};
	}, [t]);
	return i ? /*#__PURE__*/ e(co, {
		theme: i,
		...r
	}) : /*#__PURE__*/ e(mo, {
		theme: t,
		...r
	});
}
//#endregion
//#region node_modules/@mui/material/esm/utils/capitalize.js
var Y = Cn;
//#endregion
//#region node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
function go(...e) {
	return e.reduce((e, t) => t == null ? e : function(...n) {
		e.apply(this, n), t.apply(this, n);
	}, () => {});
}
//#endregion
//#region node_modules/@mui/material/esm/GlobalStyles/GlobalStyles.js
function _o(t) {
	return /*#__PURE__*/ e(Or, {
		...t,
		defaultTheme: io,
		themeId: Vt
	});
}
//#endregion
//#region node_modules/@mui/material/esm/zero-styled/index.js
function vo(t) {
	return function(n) {
		return /*#__PURE__*/ e(_o, { styles: typeof t == "function" ? (e) => t({
			theme: e,
			...n
		}) : t });
	};
}
function yo() {
	return Ar;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/memoTheme.js
var X = Fi;
//#endregion
//#region node_modules/@mui/material/esm/DefaultPropsProvider/DefaultPropsProvider.js
function Z(e) {
	return Ti(e);
}
//#endregion
//#region node_modules/@mui/material/esm/SvgIcon/svgIconClasses.js
function bo(e) {
	return W("MuiSvgIcon", e);
}
G("MuiSvgIcon", [
	"root",
	"colorPrimary",
	"colorSecondary",
	"colorAction",
	"colorError",
	"colorDisabled",
	"fontSizeInherit",
	"fontSizeSmall",
	"fontSizeMedium",
	"fontSizeLarge"
]);
//#endregion
//#region node_modules/@mui/material/esm/SvgIcon/SvgIcon.js
var xo = (e) => {
	let { color: t, fontSize: n, classes: r } = e;
	return K({ root: [
		"root",
		t !== "inherit" && `color${Y(t)}`,
		`fontSize${Y(n)}`
	] }, bo, r);
}, So = J("svg", {
	name: "MuiSvgIcon",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.color !== "inherit" && t[`color${Y(n.color)}`],
			t[`fontSize${Y(n.fontSize)}`]
		];
	}
})(X(({ theme: e }) => ({
	userSelect: "none",
	width: "1em",
	height: "1em",
	display: "inline-block",
	flexShrink: 0,
	transition: e.transitions?.create?.("fill", { duration: (e.vars ?? e).transitions?.duration?.shorter }),
	variants: [
		{
			props: (e) => !e.hasSvgAsChild,
			style: { fill: "currentColor" }
		},
		{
			props: { fontSize: "inherit" },
			style: { fontSize: "inherit" }
		},
		{
			props: { fontSize: "small" },
			style: { fontSize: e.typography?.pxToRem?.(20) || "1.25rem" }
		},
		{
			props: { fontSize: "medium" },
			style: { fontSize: e.typography?.pxToRem?.(24) || "1.5rem" }
		},
		{
			props: { fontSize: "large" },
			style: { fontSize: e.typography?.pxToRem?.(35) || "2.1875rem" }
		},
		...Object.entries((e.vars ?? e).palette).filter(([, e]) => e && e.main).map(([t]) => ({
			props: { color: t },
			style: { color: (e.vars ?? e).palette?.[t]?.main }
		})),
		{
			props: { color: "action" },
			style: { color: (e.vars ?? e).palette?.action?.active }
		},
		{
			props: { color: "disabled" },
			style: { color: (e.vars ?? e).palette?.action?.disabled }
		},
		{
			props: { color: "inherit" },
			style: { color: void 0 }
		}
	]
}))), Co = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiSvgIcon"
	}), { children: o, className: s, color: c = "inherit", component: l = "svg", fontSize: u = "medium", htmlColor: d, inheritViewBox: f = !1, titleAccess: p, viewBox: m = "0 0 24 24", ...h } = a, g = /*#__PURE__*/ n.isValidElement(o) && o.type === "svg", _ = {
		...a,
		color: c,
		component: l,
		fontSize: u,
		instanceFontSize: r.fontSize,
		inheritViewBox: f,
		viewBox: m,
		hasSvgAsChild: g
	}, v = {};
	f || (v.viewBox = m);
	let y = xo(_);
	return /*#__PURE__*/ t(So, {
		as: l,
		className: U(y.root, s),
		focusable: "false",
		color: d,
		"aria-hidden": !p || void 0,
		role: p ? "img" : void 0,
		ref: i,
		...v,
		...h,
		...g && o.props,
		ownerState: _,
		children: [g ? o.props.children : o, p ? /*#__PURE__*/ e("title", { children: p }) : null]
	});
});
Co.muiName = "SvgIcon";
//#endregion
//#region node_modules/@mui/material/esm/utils/createSvgIcon.js
function wo(t, r) {
	function i(n, r) {
		return /*#__PURE__*/ e(Co, {
			"data-testid": void 0,
			ref: r,
			...n,
			children: t
		});
	}
	return i.muiName = Co.muiName, /*#__PURE__*/ n.memo(/*#__PURE__*/ n.forwardRef(i));
}
//#endregion
//#region node_modules/@mui/utils/esm/debounce/debounce.js
function To(e, t = 166) {
	let n;
	function r(...r) {
		clearTimeout(n), n = setTimeout(() => {
			e.apply(this, r);
		}, t);
	}
	return r.clear = () => {
		clearTimeout(n);
	}, r;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/debounce.js
var Eo = To, Do = na;
//#endregion
//#region node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function Oo(e) {
	return e && e.ownerDocument || document;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/ownerDocument.js
var ko = Oo;
//#endregion
//#region node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function Ao(e) {
	return Oo(e).defaultView || window;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/ownerWindow.js
var jo = Ao;
//#endregion
//#region node_modules/@mui/utils/esm/setRef/setRef.js
function Mo(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useEnhancedEffect.js
var No = Yr, Po = ki;
//#endregion
//#region node_modules/@mui/utils/esm/useControlled/useControlled.js
function Fo(e) {
	let { controlled: t, default: r, name: i, state: a = "value" } = e, { current: o } = n.useRef(t !== void 0), [s, c] = n.useState(r);
	return [o ? t : s, n.useCallback((e) => {
		o || c(e);
	}, [])];
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useControlled.js
var Io = Fo;
//#endregion
//#region node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
function Lo(e) {
	let t = n.useRef(e);
	return Yr(() => {
		t.current = e;
	}), n.useRef((...e) => (0, t.current)(...e)).current;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useEventCallback.js
var Ro = Lo;
//#endregion
//#region node_modules/@mui/utils/esm/useForkRef/useForkRef.js
function zo(...e) {
	let t = n.useRef(void 0), r = n.useCallback((t) => {
		let n = e.map((e) => {
			if (e == null) return null;
			if (typeof e == "function") {
				let n = e, r = n(t);
				return typeof r == "function" ? r : () => {
					n(null);
				};
			}
			return e.current = t, () => {
				e.current = null;
			};
		});
		return () => {
			n.forEach((e) => e?.());
		};
	}, e);
	return n.useMemo(() => e.every((e) => e == null) ? null : (e) => {
		t.current &&= (t.current(), void 0), e != null && (t.current = r(e));
	}, e);
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useForkRef.js
var Bo = zo;
//#endregion
//#region node_modules/@mui/material/esm/utils/mergeSlotProps.js
function Vo(e, t) {
	let n = e.charCodeAt(2);
	return e[0] === "o" && e[1] === "n" && n >= 65 && n <= 90 && typeof t == "function";
}
function Ho(e, t) {
	if (!e) return t;
	function n(e, t) {
		let n = {};
		return Object.keys(t).forEach((r) => {
			Vo(r, t[r]) && typeof e[r] == "function" && (n[r] = (...n) => {
				e[r](...n), t[r](...n);
			});
		}), n;
	}
	if (typeof e == "function" || typeof t == "function") return (r) => {
		let i = typeof t == "function" ? t(r) : t, a = typeof e == "function" ? e({
			...r,
			...i
		}) : e, o = U(r?.className, i?.className, a?.className), s = n(a, i);
		return {
			...i,
			...a,
			...s,
			...!!o && { className: o },
			...i?.style && a?.style && { style: {
				...i.style,
				...a.style
			} },
			...i?.sx && a?.sx && { sx: [...Array.isArray(i.sx) ? i.sx : [i.sx], ...Array.isArray(a.sx) ? a.sx : [a.sx]] }
		};
	};
	let r = t, i = n(e, r), a = U(r?.className, e?.className);
	return {
		...t,
		...e,
		...i,
		...!!a && { className: a },
		...r?.style && e?.style && { style: {
			...r.style,
			...e.style
		} },
		...r?.sx && e?.sx && { sx: [...Array.isArray(r.sx) ? r.sx : [r.sx], ...Array.isArray(e.sx) ? e.sx : [e.sx]] }
	};
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function Uo(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function Wo(e, t) {
	return Wo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, Wo(e, t);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function Go(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Wo(e, t);
}
//#endregion
//#region node_modules/react-transition-group/esm/config.js
var Ko = { disabled: !1 }, qo = r.createContext(null), Jo = function(e) {
	return e.scrollTop;
}, Yo = "unmounted", Xo = "exited", Zo = "entering", Qo = "entered", $o = "exiting", es = /*#__PURE__*/ function(e) {
	Go(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this, i = n, a = i && !i.isMounting ? t.enter : t.appear, o;
		return r.appearStatus = null, t.in ? a ? (o = Xo, r.appearStatus = Zo) : o = Qo : o = t.unmountOnExit || t.mountOnEnter ? Yo : Xo, r.state = { status: o }, r.nextCallback = null, r;
	}
	t.getDerivedStateFromProps = function(e, t) {
		return e.in && t.status === "unmounted" ? { status: Xo } : null;
	};
	var n = t.prototype;
	return n.componentDidMount = function() {
		this.updateStatus(!0, this.appearStatus);
	}, n.componentDidUpdate = function(e) {
		var t = null;
		if (e !== this.props) {
			var n = this.state.status;
			this.props.in ? n !== "entering" && n !== "entered" && (t = Zo) : (n === "entering" || n === "entered") && (t = $o);
		}
		this.updateStatus(!1, t);
	}, n.componentWillUnmount = function() {
		this.cancelNextCallback();
	}, n.getTimeouts = function() {
		var e = this.props.timeout, t = n = r = e, n, r;
		return e != null && typeof e != "number" && (t = e.exit, n = e.enter, r = e.appear === void 0 ? n : e.appear), {
			exit: t,
			enter: n,
			appear: r
		};
	}, n.updateStatus = function(e, t) {
		if (e === void 0 && (e = !1), t !== null) {
			if (this.cancelNextCallback(), t === "entering") {
				if (this.props.unmountOnExit || this.props.mountOnEnter) {
					var n = this.props.nodeRef ? this.props.nodeRef.current : p.findDOMNode(this);
					n && Jo(n);
				}
				this.performEnter(e);
			} else this.performExit();
		} else this.props.unmountOnExit && this.state.status === "exited" && this.setState({ status: Yo });
	}, n.performEnter = function(e) {
		var t = this, n = this.props.enter, r = this.context ? this.context.isMounting : e, i = this.props.nodeRef ? [r] : [p.findDOMNode(this), r], a = i[0], o = i[1], s = this.getTimeouts(), c = r ? s.appear : s.enter;
		if (!e && !n || Ko.disabled) {
			this.safeSetState({ status: Qo }, function() {
				t.props.onEntered(a);
			});
			return;
		}
		this.props.onEnter(a, o), this.safeSetState({ status: Zo }, function() {
			t.props.onEntering(a, o), t.onTransitionEnd(c, function() {
				t.safeSetState({ status: Qo }, function() {
					t.props.onEntered(a, o);
				});
			});
		});
	}, n.performExit = function() {
		var e = this, t = this.props.exit, n = this.getTimeouts(), r = this.props.nodeRef ? void 0 : p.findDOMNode(this);
		if (!t || Ko.disabled) {
			this.safeSetState({ status: Xo }, function() {
				e.props.onExited(r);
			});
			return;
		}
		this.props.onExit(r), this.safeSetState({ status: $o }, function() {
			e.props.onExiting(r), e.onTransitionEnd(n.exit, function() {
				e.safeSetState({ status: Xo }, function() {
					e.props.onExited(r);
				});
			});
		});
	}, n.cancelNextCallback = function() {
		this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
	}, n.safeSetState = function(e, t) {
		t = this.setNextCallback(t), this.setState(e, t);
	}, n.setNextCallback = function(e) {
		var t = this, n = !0;
		return this.nextCallback = function(r) {
			n && (n = !1, t.nextCallback = null, e(r));
		}, this.nextCallback.cancel = function() {
			n = !1;
		}, this.nextCallback;
	}, n.onTransitionEnd = function(e, t) {
		this.setNextCallback(t);
		var n = this.props.nodeRef ? this.props.nodeRef.current : p.findDOMNode(this), r = e == null && !this.props.addEndListener;
		if (!n || r) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var i = this.props.nodeRef ? [this.nextCallback] : [n, this.nextCallback], a = i[0], o = i[1];
			this.props.addEndListener(a, o);
		}
		e != null && setTimeout(this.nextCallback, e);
	}, n.render = function() {
		var e = this.state.status;
		if (e === "unmounted") return null;
		var t = this.props, n = t.children;
		t.in, t.mountOnEnter, t.unmountOnExit, t.appear, t.enter, t.exit, t.timeout, t.addEndListener, t.onEnter, t.onEntering, t.onEntered, t.onExit, t.onExiting, t.onExited, t.nodeRef;
		var i = Uo(t, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /*#__PURE__*/ r.createElement(qo.Provider, { value: null }, typeof n == "function" ? n(e, i) : r.cloneElement(r.Children.only(n), i));
	}, t;
}(r.Component);
es.contextType = qo, es.propTypes = {};
function ts() {}
es.defaultProps = {
	in: !1,
	mountOnEnter: !1,
	unmountOnExit: !1,
	appear: !1,
	enter: !0,
	exit: !0,
	onEnter: ts,
	onEntering: ts,
	onEntered: ts,
	onExit: ts,
	onExiting: ts,
	onExited: ts
}, es.UNMOUNTED = Yo, es.EXITED = Xo, es.ENTERING = Zo, es.ENTERED = Qo, es.EXITING = $o;
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function ns(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
//#endregion
//#region node_modules/react-transition-group/esm/utils/ChildMapping.js
function rs(e, t) {
	var n = function(e) {
		return t && s(e) ? t(e) : e;
	}, r = Object.create(null);
	return e && i.map(e, function(e) {
		return e;
	}).forEach(function(e) {
		r[e.key] = n(e);
	}), r;
}
function is(e, t) {
	e ||= {}, t ||= {};
	function n(n) {
		return n in t ? t[n] : e[n];
	}
	var r = Object.create(null), i = [];
	for (var a in e) a in t ? i.length && (r[a] = i, i = []) : i.push(a);
	var o, s = {};
	for (var c in t) {
		if (r[c]) for (o = 0; o < r[c].length; o++) {
			var l = r[c][o];
			s[r[c][o]] = n(l);
		}
		s[c] = n(c);
	}
	for (o = 0; o < i.length; o++) s[i[o]] = n(i[o]);
	return s;
}
function as(e, t, n) {
	return n[t] == null ? e.props[t] : n[t];
}
function os(e, t) {
	return rs(e.children, function(n) {
		return a(n, {
			onExited: t.bind(null, n),
			in: !0,
			appear: as(n, "appear", e),
			enter: as(n, "enter", e),
			exit: as(n, "exit", e)
		});
	});
}
function ss(e, t, n) {
	var r = rs(e.children), i = is(t, r);
	return Object.keys(i).forEach(function(o) {
		var c = i[o];
		if (s(c)) {
			var l = o in t, u = o in r, d = t[o], f = s(d) && !d.props.in;
			u && (!l || f) ? i[o] = a(c, {
				onExited: n.bind(null, c),
				in: !0,
				exit: as(c, "exit", e),
				enter: as(c, "enter", e)
			}) : !u && l && !f ? i[o] = a(c, { in: !1 }) : u && l && s(d) && (i[o] = a(c, {
				onExited: n.bind(null, c),
				in: d.props.in,
				exit: as(c, "exit", e),
				enter: as(c, "enter", e)
			}));
		}
	}), i;
}
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroup.js
var cs = Object.values || function(e) {
	return Object.keys(e).map(function(t) {
		return e[t];
	});
}, ls = {
	component: "div",
	childFactory: function(e) {
		return e;
	}
}, us = /*#__PURE__*/ function(e) {
	Go(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this;
		return r.state = {
			contextValue: { isMounting: !0 },
			handleExited: r.handleExited.bind(ns(r)),
			firstRender: !0
		}, r;
	}
	var n = t.prototype;
	return n.componentDidMount = function() {
		this.mounted = !0, this.setState({ contextValue: { isMounting: !1 } });
	}, n.componentWillUnmount = function() {
		this.mounted = !1;
	}, t.getDerivedStateFromProps = function(e, t) {
		var n = t.children, r = t.handleExited;
		return {
			children: t.firstRender ? os(e, r) : ss(e, n, r),
			firstRender: !1
		};
	}, n.handleExited = function(e, t) {
		var n = rs(this.props.children);
		e.key in n || (e.props.onExited && e.props.onExited(t), this.mounted && this.setState(function(t) {
			var n = Ye({}, t.children);
			return delete n[e.key], { children: n };
		}));
	}, n.render = function() {
		var e = this.props, t = e.component, n = e.childFactory, i = Uo(e, ["component", "childFactory"]), a = this.state.contextValue, o = cs(this.state.children).map(n);
		return delete i.appear, delete i.enter, delete i.exit, t === null ? /*#__PURE__*/ r.createElement(qo.Provider, { value: a }, o) : /*#__PURE__*/ r.createElement(qo.Provider, { value: a }, /*#__PURE__*/ r.createElement(t, i, o));
	}, t;
}(r.Component);
us.propTypes = {}, us.defaultProps = ls;
//#endregion
//#region node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
var ds = {};
function fs(e, t) {
	let r = n.useRef(ds);
	return r.current === ds && (r.current = e(t)), r;
}
//#endregion
//#region node_modules/@mui/utils/esm/useOnMount/useOnMount.js
var ps = [];
function ms(e) {
	n.useEffect(e, ps);
}
//#endregion
//#region node_modules/@mui/utils/esm/useTimeout/useTimeout.js
var hs = class e {
	static create() {
		return new e();
	}
	currentId = null;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = null, t();
		}, e);
	}
	clear = () => {
		this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
	};
	disposeEffect = () => this.clear;
};
function gs() {
	let e = fs(hs.create).current;
	return ms(e.disposeEffect), e;
}
//#endregion
//#region node_modules/@mui/material/esm/transitions/utils.js
var _s = (e) => e.scrollTop;
function vs(e, t) {
	return (n) => {
		if (t) {
			let r = e.current;
			n === void 0 ? t(r) : t(r, n);
		}
	};
}
function ys(e, t, n, r, i, a) {
	let o = e === "exited" && !t ? r : n[e] || n.exited;
	return i || a ? {
		...o,
		...i,
		...a
	} : o;
}
function bs(e, t) {
	let { timeout: n, easing: r, style: i = {} } = e;
	return {
		duration: i.transitionDuration ?? (typeof n == "number" ? n : n[t.mode] || 0),
		easing: i.transitionTimingFunction ?? (typeof r == "object" ? r[t.mode] : r),
		delay: i.transitionDelay
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
function xs(e) {
	return typeof e == "string";
}
//#endregion
//#region node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
function Ss(e, t, n) {
	return e === void 0 || xs(e) ? t : {
		...t,
		ownerState: {
			...t.ownerState,
			...n
		}
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
function Cs(e, t, n) {
	return typeof e == "function" ? e(t, n) : e;
}
//#endregion
//#region node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
function ws(e, t = []) {
	if (e === void 0) return {};
	let n = {};
	return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((t) => {
		n[t] = e[t];
	}), n;
}
//#endregion
//#region node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
function Ts(e) {
	if (e === void 0) return {};
	let t = {};
	return Object.keys(e).filter((t) => !(t.match(/^on[A-Z]/) && typeof e[t] == "function")).forEach((n) => {
		t[n] = e[n];
	}), t;
}
//#endregion
//#region node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
function Es(e) {
	let { getSlotProps: t, additionalProps: n, externalSlotProps: r, externalForwardedProps: i, className: a } = e;
	if (!t) {
		let e = U(n?.className, a, i?.className, r?.className), t = {
			...n?.style,
			...i?.style,
			...r?.style
		}, o = {
			...n,
			...i,
			...r
		};
		return e.length > 0 && (o.className = e), Object.keys(t).length > 0 && (o.style = t), {
			props: o,
			internalRef: void 0
		};
	}
	let o = ws({
		...i,
		...r
	}), s = Ts(r), c = Ts(i), l = t(o), u = U(l?.className, n?.className, a, i?.className, r?.className), d = {
		...l?.style,
		...n?.style,
		...i?.style,
		...r?.style
	}, f = {
		...l,
		...n,
		...c,
		...s
	};
	return u.length > 0 && (f.className = u), Object.keys(d).length > 0 && (f.style = d), {
		props: f,
		internalRef: l.ref
	};
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useSlot.js
function Q(e, t) {
	let { className: n, elementType: r, ownerState: i, externalForwardedProps: a, internalForwardedProps: o, shouldForwardComponentProp: s = !1, ...c } = t, { component: l, slots: u = { [e]: void 0 }, slotProps: d = { [e]: void 0 }, ...f } = a, p = u[e] || r, m = Cs(d[e], i), { props: { component: h, ...g }, internalRef: _ } = Es({
		className: n,
		...c,
		externalForwardedProps: e === "root" ? f : void 0,
		externalSlotProps: m
	}), v = zo(_, m?.ref, t.ref), y = e === "root" ? h || l : h;
	return [p, Ss(p, {
		...e === "root" && !l && !u[e] && o,
		...e !== "root" && !u[e] && o,
		...g,
		...y && !s && { as: y },
		...y && s && { component: y },
		ref: v
	}, i)];
}
//#endregion
//#region node_modules/@mui/material/esm/Paper/paperClasses.js
function Ds(e) {
	return W("MuiPaper", e);
}
G("MuiPaper", /* @__PURE__ */ "root.rounded.outlined.elevation.elevation0.elevation1.elevation2.elevation3.elevation4.elevation5.elevation6.elevation7.elevation8.elevation9.elevation10.elevation11.elevation12.elevation13.elevation14.elevation15.elevation16.elevation17.elevation18.elevation19.elevation20.elevation21.elevation22.elevation23.elevation24".split("."));
//#endregion
//#region node_modules/@mui/material/esm/Paper/Paper.js
var Os = (e) => {
	let { square: t, elevation: n, variant: r, classes: i } = e;
	return K({ root: [
		"root",
		r,
		!t && "rounded",
		r === "elevation" && `elevation${n}`
	] }, Ds, i);
}, ks = J("div", {
	name: "MuiPaper",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			!n.square && t.rounded,
			n.variant === "elevation" && t[`elevation${n.elevation}`]
		];
	}
})(X(({ theme: e }) => ({
	backgroundColor: (e.vars || e).palette.background.paper,
	color: (e.vars || e).palette.text.primary,
	transition: e.transitions.create("box-shadow"),
	variants: [
		{
			props: ({ ownerState: e }) => !e.square,
			style: { borderRadius: e.shape.borderRadius }
		},
		{
			props: { variant: "outlined" },
			style: { border: `1px solid ${(e.vars || e).palette.divider}` }
		},
		{
			props: { variant: "elevation" },
			style: {
				boxShadow: "var(--Paper-shadow)",
				backgroundImage: "var(--Paper-overlay)"
			}
		}
	]
}))), As = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiPaper"
	}), i = ao(), { className: a, component: o = "div", elevation: s = 1, square: c = !1, variant: l = "elevation", ...u } = r, d = {
		...r,
		component: o,
		elevation: s,
		square: c,
		variant: l
	}, f = Os(d);
	return /*#__PURE__*/ e(ks, {
		as: o,
		ownerState: d,
		className: U(f.root, a),
		ref: n,
		...u,
		style: {
			...l === "elevation" && {
				"--Paper-shadow": (i.vars || i).shadows[s],
				...i.vars && { "--Paper-overlay": i.vars.overlays?.[s] },
				...!i.vars && i.palette.mode === "dark" && { "--Paper-overlay": `linear-gradient(${oi("#fff", Ba(s))}, ${oi("#fff", Ba(s))})` }
			},
			...u.style
		}
	});
});
//#endregion
//#region node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js
function js(e) {
	try {
		return e.matches(":focus-visible");
	} catch {}
	return !1;
}
//#endregion
//#region node_modules/@mui/material/esm/useLazyRipple/useLazyRipple.js
var Ms = class e {
	static create() {
		return new e();
	}
	static use() {
		let t = fs(e.create).current, [r, i] = n.useState(!1);
		return t.shouldMount = r, t.setShouldMount = i, n.useEffect(t.mountEffect, [r]), t;
	}
	constructor() {
		this.ref = { current: null }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
	}
	mount() {
		return this.mounted || (this.mounted = Ps(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
	}
	mountEffect = () => {
		this.shouldMount && !this.didMount && this.ref.current !== null && (this.didMount = !0, this.mounted.resolve());
	};
	start(...e) {
		this.mount().then(() => this.ref.current?.start(...e));
	}
	stop(...e) {
		this.mount().then(() => this.ref.current?.stop(...e));
	}
	pulsate(...e) {
		this.mount().then(() => this.ref.current?.pulsate(...e));
	}
};
function Ns() {
	return Ms.use();
}
function Ps() {
	let e, t, n = new Promise((n, r) => {
		e = n, t = r;
	});
	return n.resolve = e, n.reject = t, n;
}
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/Ripple.js
function Fs(t) {
	let { className: r, classes: i, pulsate: a = !1, rippleX: o, rippleY: s, rippleSize: c, in: l, onExited: u, timeout: d } = t, [f, p] = n.useState(!1), m = U(r, i.ripple, i.rippleVisible, a && i.ripplePulsate), h = {
		width: c,
		height: c,
		top: -(c / 2) + s,
		left: -(c / 2) + o
	}, g = U(i.child, f && i.childLeaving, a && i.childPulsate);
	return !l && !f && p(!0), n.useEffect(() => {
		if (!l && u != null) {
			let e = setTimeout(u, d);
			return () => {
				clearTimeout(e);
			};
		}
	}, [
		u,
		l,
		d
	]), /*#__PURE__*/ e("span", {
		className: m,
		style: h,
		children: /*#__PURE__*/ e("span", { className: g })
	});
}
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/touchRippleClasses.js
var Is = G("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]), Ls = 550, Rs = jt`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, zs = jt`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, Bs = jt`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, Vs = J("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
}), Hs = J(Fs, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${Is.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Rs};
    animation-duration: ${Ls}ms;
    animation-timing-function: ${({ theme: e }) => e.transitions.easing.easeInOut};
  }

  &.${Is.ripplePulsate} {
    animation-duration: ${({ theme: e }) => e.transitions.duration.shorter}ms;
  }

  & .${Is.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${Is.childLeaving} {
    opacity: 0;
    animation-name: ${zs};
    animation-duration: ${Ls}ms;
    animation-timing-function: ${({ theme: e }) => e.transitions.easing.easeInOut};
  }

  & .${Is.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Bs};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme: e }) => e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, Us = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let { center: i = !1, classes: a = {}, className: o, ...s } = Z({
		props: t,
		name: "MuiTouchRipple"
	}), [c, l] = n.useState([]), u = n.useRef(0), d = n.useRef(null);
	n.useEffect(() => {
		d.current &&= (d.current(), null);
	}, [c]);
	let f = n.useRef(!1), p = gs(), m = n.useRef(null), h = n.useRef(null), g = n.useCallback((t) => {
		let { pulsate: n, rippleX: r, rippleY: i, rippleSize: o, cb: s } = t;
		l((t) => [...t, /*#__PURE__*/ e(Hs, {
			classes: {
				ripple: U(a.ripple, Is.ripple),
				rippleVisible: U(a.rippleVisible, Is.rippleVisible),
				ripplePulsate: U(a.ripplePulsate, Is.ripplePulsate),
				child: U(a.child, Is.child),
				childLeaving: U(a.childLeaving, Is.childLeaving),
				childPulsate: U(a.childPulsate, Is.childPulsate)
			},
			timeout: Ls,
			pulsate: n,
			rippleX: r,
			rippleY: i,
			rippleSize: o
		}, u.current)]), u.current += 1, d.current = s;
	}, [a]), _ = n.useCallback((e = {}, t = {}, n = () => {}) => {
		let { pulsate: r = !1, center: a = i || t.pulsate, fakeElement: o = !1 } = t;
		if (e?.type === "mousedown" && f.current) {
			f.current = !1;
			return;
		}
		e?.type === "touchstart" && (f.current = !0);
		let s = o ? null : h.current, c = s ? s.getBoundingClientRect() : {
			width: 0,
			height: 0,
			left: 0,
			top: 0
		}, l, u, d;
		if (a || e === void 0 || e.clientX === 0 && e.clientY === 0 || !e.clientX && !e.touches) l = Math.round(c.width / 2), u = Math.round(c.height / 2);
		else {
			let { clientX: t, clientY: n } = e.touches && e.touches.length > 0 ? e.touches[0] : e;
			l = Math.round(t - c.left), u = Math.round(n - c.top);
		}
		if (a) d = Math.sqrt((2 * c.width ** 2 + c.height ** 2) / 3), d % 2 == 0 && (d += 1);
		else {
			let e = Math.max(Math.abs((s ? s.clientWidth : 0) - l), l) * 2 + 2, t = Math.max(Math.abs((s ? s.clientHeight : 0) - u), u) * 2 + 2;
			d = Math.sqrt(e ** 2 + t ** 2);
		}
		e?.touches ? m.current === null && (m.current = () => {
			g({
				pulsate: r,
				rippleX: l,
				rippleY: u,
				rippleSize: d,
				cb: n
			});
		}, p.start(80, () => {
			m.current &&= (m.current(), null);
		})) : g({
			pulsate: r,
			rippleX: l,
			rippleY: u,
			rippleSize: d,
			cb: n
		});
	}, [
		i,
		g,
		p
	]), v = n.useCallback(() => {
		_({}, { pulsate: !0 });
	}, [_]), y = n.useCallback((e, t) => {
		if (p.clear(), e?.type === "touchend" && m.current) {
			m.current(), m.current = null, p.start(0, () => {
				y(e, t);
			});
			return;
		}
		m.current = null, l((e) => e.length > 0 ? e.slice(1) : e), d.current = t;
	}, [p]);
	return n.useImperativeHandle(r, () => ({
		pulsate: v,
		start: _,
		stop: y
	}), [
		v,
		_,
		y
	]), /*#__PURE__*/ e(Vs, {
		className: U(Is.root, a.root, o),
		ref: h,
		...s,
		children: /*#__PURE__*/ e(us, {
			component: null,
			exit: !0,
			children: c
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/buttonBaseClasses.js
function Ws(e) {
	return W("MuiButtonBase", e);
}
var Gs = G("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]), Ks = (e) => {
	let { disabled: t, focusVisible: n, focusVisibleClassName: r, classes: i } = e, a = K({ root: [
		"root",
		t && "disabled",
		n && "focusVisible"
	] }, Ws, i);
	return n && r && (a.root += ` ${r}`), a;
}, qs = J("button", {
	name: "MuiButtonBase",
	slot: "Root"
})({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	backgroundColor: "transparent",
	outline: 0,
	border: 0,
	margin: 0,
	borderRadius: 0,
	padding: 0,
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	MozAppearance: "none",
	WebkitAppearance: "none",
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${Gs.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" }
}), Js = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiButtonBase"
	}), { action: o, centerRipple: s = !1, children: c, className: l, component: u = "button", disabled: d = !1, disableRipple: f = !1, disableTouchRipple: p = !1, focusRipple: m = !1, focusVisibleClassName: h, LinkComponent: g = "a", onBlur: _, onClick: v, onContextMenu: y, onDragLeave: b, onFocus: x, onFocusVisible: S, onKeyDown: C, onKeyUp: w, onMouseDown: T, onMouseLeave: E, onMouseUp: D, onTouchEnd: O, onTouchMove: k, onTouchStart: A, tabIndex: j = 0, TouchRippleProps: M, touchRippleRef: N, type: P, ...F } = a, ee = n.useRef(null), I = Ns(), te = Bo(I.ref, N), [L, ne] = n.useState(!1);
	d && L && ne(!1), n.useImperativeHandle(o, () => ({ focusVisible: () => {
		ne(!0), ee.current.focus();
	} }), []);
	let re = I.shouldMount && !f && !d;
	n.useEffect(() => {
		L && m && !f && I.pulsate();
	}, [
		f,
		m,
		L,
		I
	]);
	let R = Ys(I, "start", T, p), ie = Ys(I, "stop", y, p), z = Ys(I, "stop", b, p), ae = Ys(I, "stop", D, p), oe = Ys(I, "stop", (e) => {
		L && e.preventDefault(), E && E(e);
	}, p), se = Ys(I, "start", A, p), ce = Ys(I, "stop", O, p), le = Ys(I, "stop", k, p), ue = Ys(I, "stop", (e) => {
		js(e.target) || ne(!1), _ && _(e);
	}, !1), de = Ro((e) => {
		ee.current ||= e.currentTarget, js(e.target) && (ne(!0), S && S(e)), x && x(e);
	}), B = () => {
		let e = ee.current;
		return e ? e.tagName !== "BUTTON" && !(e.tagName === "A" && e.href) : u && u !== "button";
	}, V = Ro((e) => {
		m && !e.repeat && L && e.key === " " && I.stop(e, () => {
			I.start(e);
		}), e.target === e.currentTarget && B() && e.key === " " && e.preventDefault(), C && C(e), e.target === e.currentTarget && B() && e.key === "Enter" && !d && (e.preventDefault(), v && v(e));
	}), H = Ro((e) => {
		m && e.key === " " && L && !e.defaultPrevented && I.stop(e, () => {
			I.pulsate(e);
		}), w && w(e), v && e.target === e.currentTarget && B() && e.key === " " && !e.defaultPrevented && !d && v(e);
	}), fe = u;
	fe === "button" && (F.href || F.to) && (fe = g);
	let pe = {};
	if (fe === "button") {
		let e = !!F.formAction;
		pe.type = P === void 0 && !e ? "button" : P, pe.disabled = d;
	} else !F.href && !F.to && (pe.role = "button"), d && (pe["aria-disabled"] = d);
	let me = Bo(i, ee), he = {
		...a,
		centerRipple: s,
		component: u,
		disabled: d,
		disableRipple: f,
		disableTouchRipple: p,
		focusRipple: m,
		tabIndex: j,
		focusVisible: L
	}, ge = Ks(he);
	return /*#__PURE__*/ t(qs, {
		as: fe,
		className: U(ge.root, l),
		ownerState: he,
		onBlur: ue,
		onClick: v,
		onContextMenu: ie,
		onFocus: de,
		onKeyDown: V,
		onKeyUp: H,
		onMouseDown: R,
		onMouseLeave: oe,
		onMouseUp: ae,
		onDragLeave: z,
		onTouchEnd: ce,
		onTouchMove: le,
		onTouchStart: se,
		ref: me,
		tabIndex: d ? -1 : j,
		type: P,
		...pe,
		...F,
		children: [c, re ? /*#__PURE__*/ e(Us, {
			ref: te,
			center: s,
			...M
		}) : null]
	});
});
function Ys(e, t, n, r = !1) {
	return Ro((i) => (n && n(i), r || e[t](i), !0));
}
//#endregion
//#region node_modules/@mui/material/esm/utils/createSimplePaletteValueFilter.js
function Xs(e) {
	return typeof e.main == "string";
}
function Zs(e, t = []) {
	if (!Xs(e)) return !1;
	for (let n of t) if (!e.hasOwnProperty(n) || typeof e[n] != "string") return !1;
	return !0;
}
function Qs(e = []) {
	return ([, t]) => t && Zs(t, e);
}
//#endregion
//#region node_modules/@mui/material/esm/Alert/alertClasses.js
function $s(e) {
	return W("MuiAlert", e);
}
var ec = G("MuiAlert", [
	"root",
	"action",
	"icon",
	"message",
	"filled",
	"colorSuccess",
	"colorInfo",
	"colorWarning",
	"colorError",
	"filledSuccess",
	"filledInfo",
	"filledWarning",
	"filledError",
	"outlined",
	"outlinedSuccess",
	"outlinedInfo",
	"outlinedWarning",
	"outlinedError",
	"standard",
	"standardSuccess",
	"standardInfo",
	"standardWarning",
	"standardError"
]);
//#endregion
//#region node_modules/@mui/material/esm/CircularProgress/circularProgressClasses.js
function tc(e) {
	return W("MuiCircularProgress", e);
}
G("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDeterminate",
	"circleIndeterminate",
	"circleDisableShrink"
]);
//#endregion
//#region node_modules/@mui/material/esm/CircularProgress/CircularProgress.js
var nc = 44, rc = jt`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`, ic = jt`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`, ac = typeof rc == "string" ? null : At`
        animation: ${rc} 1.4s linear infinite;
      `, oc = typeof ic == "string" ? null : At`
        animation: ${ic} 1.4s ease-in-out infinite;
      `, sc = (e) => {
	let { classes: t, variant: n, color: r, disableShrink: i } = e;
	return K({
		root: [
			"root",
			n,
			`color${Y(r)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: [
			"circle",
			`circle${Y(n)}`,
			i && "circleDisableShrink"
		]
	}, tc, t);
}, cc = J("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			t[`color${Y(n.color)}`]
		];
	}
})(X(({ theme: e }) => ({
	display: "inline-block",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: e.transitions.create("transform") }
		},
		{
			props: { variant: "indeterminate" },
			style: ac || { animation: `${rc} 1.4s linear infinite` }
		},
		...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
			props: { color: t },
			style: { color: (e.vars || e).palette[t].main }
		}))
	]
}))), lc = J("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" }), uc = J("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.circle,
			t[`circle${Y(n.variant)}`],
			n.disableShrink && t.circleDisableShrink
		];
	}
})(X(({ theme: e }) => ({
	stroke: "currentColor",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: e.transitions.create("stroke-dashoffset") }
		},
		{
			props: { variant: "indeterminate" },
			style: {
				strokeDasharray: "80px, 200px",
				strokeDashoffset: 0
			}
		},
		{
			props: ({ ownerState: e }) => e.variant === "indeterminate" && !e.disableShrink,
			style: oc || { animation: `${ic} 1.4s ease-in-out infinite` }
		}
	]
}))), dc = J("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(X(({ theme: e }) => ({
	stroke: "currentColor",
	opacity: (e.vars || e).palette.action.activatedOpacity
}))), fc = /*#__PURE__*/ n.forwardRef(function(n, r) {
	let i = Z({
		props: n,
		name: "MuiCircularProgress"
	}), { className: a, color: o = "primary", disableShrink: s = !1, enableTrackSlot: c = !1, size: l = 40, style: u, thickness: d = 3.6, value: f = 0, variant: p = "indeterminate", ...m } = i, h = {
		...i,
		color: o,
		disableShrink: s,
		size: l,
		thickness: d,
		value: f,
		variant: p,
		enableTrackSlot: c
	}, g = sc(h), _ = {}, v = {}, y = {};
	if (p === "determinate") {
		let e = 2 * Math.PI * ((nc - d) / 2);
		_.strokeDasharray = e.toFixed(3), y["aria-valuenow"] = Math.round(f), _.strokeDashoffset = `${((100 - f) / 100 * e).toFixed(3)}px`, v.transform = "rotate(-90deg)";
	}
	return /*#__PURE__*/ e(cc, {
		className: U(g.root, a),
		style: {
			width: l,
			height: l,
			...v,
			...u
		},
		ownerState: h,
		ref: r,
		role: "progressbar",
		...y,
		...m,
		children: /*#__PURE__*/ t(lc, {
			className: g.svg,
			ownerState: h,
			viewBox: `${nc / 2} ${nc / 2} ${nc} ${nc}`,
			children: [c ? /*#__PURE__*/ e(dc, {
				className: g.track,
				ownerState: h,
				cx: nc,
				cy: nc,
				r: (nc - d) / 2,
				fill: "none",
				strokeWidth: d,
				"aria-hidden": "true"
			}) : null, /*#__PURE__*/ e(uc, {
				className: g.circle,
				style: _,
				ownerState: h,
				cx: nc,
				cy: nc,
				r: (nc - d) / 2,
				fill: "none",
				strokeWidth: d
			})]
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/IconButton/iconButtonClasses.js
function pc(e) {
	return W("MuiIconButton", e);
}
var mc = G("MuiIconButton", [
	"root",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"edgeStart",
	"edgeEnd",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"loading",
	"loadingIndicator",
	"loadingWrapper"
]), hc = (e) => {
	let { classes: t, disabled: n, color: r, edge: i, size: a, loading: o } = e;
	return K({
		root: [
			"root",
			o && "loading",
			n && "disabled",
			r !== "default" && `color${Y(r)}`,
			i && `edge${Y(i)}`,
			`size${Y(a)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, pc, t);
}, gc = J(Js, {
	name: "MuiIconButton",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.loading && t.loading,
			n.color !== "default" && t[`color${Y(n.color)}`],
			n.edge && t[`edge${Y(n.edge)}`],
			t[`size${Y(n.size)}`]
		];
	}
})(X(({ theme: e }) => ({
	textAlign: "center",
	flex: "0 0 auto",
	fontSize: e.typography.pxToRem(24),
	padding: 8,
	borderRadius: "50%",
	color: (e.vars || e).palette.action.active,
	transition: e.transitions.create("background-color", { duration: e.transitions.duration.shortest }),
	variants: [
		{
			props: (e) => !e.disableRipple,
			style: {
				"--IconButton-hoverBg": e.alpha((e.vars || e).palette.action.active, (e.vars || e).palette.action.hoverOpacity),
				"&:hover": {
					backgroundColor: "var(--IconButton-hoverBg)",
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: { edge: "start" },
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		}
	]
})), X(({ theme: e }) => ({
	variants: [
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		},
		...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
			props: { color: t },
			style: { color: (e.vars || e).palette[t].main }
		})),
		...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
			props: { color: t },
			style: { "--IconButton-hoverBg": e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity) }
		})),
		{
			props: { size: "small" },
			style: {
				padding: 5,
				fontSize: e.typography.pxToRem(18)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 12,
				fontSize: e.typography.pxToRem(28)
			}
		}
	],
	[`&.${mc.disabled}`]: {
		backgroundColor: "transparent",
		color: (e.vars || e).palette.action.disabled
	},
	[`&.${mc.loading}`]: { color: "transparent" }
}))), _c = J("span", {
	name: "MuiIconButton",
	slot: "LoadingIndicator"
})(({ theme: e }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: (e.vars || e).palette.action.disabled,
	variants: [{
		props: { loading: !0 },
		style: { display: "flex" }
	}]
})), vc = /*#__PURE__*/ n.forwardRef(function(n, r) {
	let i = Z({
		props: n,
		name: "MuiIconButton"
	}), { edge: a = !1, children: o, className: s, color: c = "default", disabled: l = !1, disableFocusRipple: u = !1, size: d = "medium", id: f, loading: p = null, loadingIndicator: m, ...h } = i, g = Po(f), _ = m ?? /*#__PURE__*/ e(fc, {
		"aria-labelledby": g,
		color: "inherit",
		size: 16
	}), v = {
		...i,
		edge: a,
		color: c,
		disabled: l,
		disableFocusRipple: u,
		loading: p,
		loadingIndicator: _,
		size: d
	}, y = hc(v);
	return /*#__PURE__*/ t(gc, {
		id: p ? g : f,
		className: U(y.root, s),
		centerRipple: !0,
		focusRipple: !u,
		disabled: l || p,
		ref: r,
		...h,
		ownerState: v,
		children: [typeof p == "boolean" && /*#__PURE__*/ e("span", {
			className: y.loadingWrapper,
			style: { display: "contents" },
			children: /*#__PURE__*/ e(_c, {
				className: y.loadingIndicator,
				ownerState: v,
				children: p && _
			})
		}), o]
	});
}), yc = wo(/*#__PURE__*/ e("path", { d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" }), "SuccessOutlined"), bc = wo(/*#__PURE__*/ e("path", { d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" }), "ReportProblemOutlined"), xc = wo(/*#__PURE__*/ e("path", { d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), "ErrorOutline"), Sc = wo(/*#__PURE__*/ e("path", { d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z" }), "InfoOutlined"), Cc = wo(/*#__PURE__*/ e("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Close"), wc = (e) => {
	let { variant: t, color: n, severity: r, classes: i } = e;
	return K({
		root: [
			"root",
			`color${Y(n || r)}`,
			`${t}${Y(n || r)}`,
			`${t}`
		],
		icon: ["icon"],
		message: ["message"],
		action: ["action"]
	}, $s, i);
}, Tc = J(As, {
	name: "MuiAlert",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			t[`${n.variant}${Y(n.color || n.severity)}`]
		];
	}
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light" ? e.darken : e.lighten, n = e.palette.mode === "light" ? e.lighten : e.darken;
	return {
		...e.typography.body2,
		backgroundColor: "transparent",
		display: "flex",
		padding: "6px 16px",
		variants: [
			...Object.entries(e.palette).filter(Qs(["light"])).map(([r]) => ({
				props: {
					colorSeverity: r,
					variant: "standard"
				},
				style: {
					color: e.vars ? e.vars.palette.Alert[`${r}Color`] : t(e.palette[r].light, .6),
					backgroundColor: e.vars ? e.vars.palette.Alert[`${r}StandardBg`] : n(e.palette[r].light, .9),
					[`& .${ec.icon}`]: e.vars ? { color: e.vars.palette.Alert[`${r}IconColor`] } : { color: e.palette[r].main }
				}
			})),
			...Object.entries(e.palette).filter(Qs(["light"])).map(([n]) => ({
				props: {
					colorSeverity: n,
					variant: "outlined"
				},
				style: {
					color: e.vars ? e.vars.palette.Alert[`${n}Color`] : t(e.palette[n].light, .6),
					border: `1px solid ${(e.vars || e).palette[n].light}`,
					[`& .${ec.icon}`]: e.vars ? { color: e.vars.palette.Alert[`${n}IconColor`] } : { color: e.palette[n].main }
				}
			})),
			...Object.entries(e.palette).filter(Qs(["dark"])).map(([t]) => ({
				props: {
					colorSeverity: t,
					variant: "filled"
				},
				style: {
					fontWeight: e.typography.fontWeightMedium,
					...e.vars ? {
						color: e.vars.palette.Alert[`${t}FilledColor`],
						backgroundColor: e.vars.palette.Alert[`${t}FilledBg`]
					} : {
						backgroundColor: e.palette.mode === "dark" ? e.palette[t].dark : e.palette[t].main,
						color: e.palette.getContrastText(e.palette[t].main)
					}
				}
			}))
		]
	};
})), Ec = J("div", {
	name: "MuiAlert",
	slot: "Icon"
})({
	marginRight: 12,
	padding: "7px 0",
	display: "flex",
	fontSize: 22,
	opacity: .9
}), Dc = J("div", {
	name: "MuiAlert",
	slot: "Message"
})({
	padding: "8px 0",
	minWidth: 0,
	overflow: "auto"
}), Oc = J("div", {
	name: "MuiAlert",
	slot: "Action"
})({
	display: "flex",
	alignItems: "flex-start",
	padding: "4px 0 0 16px",
	marginLeft: "auto",
	marginRight: -8
}), kc = {
	success: /*#__PURE__*/ e(yc, { fontSize: "inherit" }),
	warning: /*#__PURE__*/ e(bc, { fontSize: "inherit" }),
	error: /*#__PURE__*/ e(xc, { fontSize: "inherit" }),
	info: /*#__PURE__*/ e(Sc, { fontSize: "inherit" })
}, Ac = /*#__PURE__*/ n.forwardRef(function(n, r) {
	let i = Z({
		props: n,
		name: "MuiAlert"
	}), { action: a, children: o, className: s, closeText: c = "Close", color: l, components: u = {}, componentsProps: d = {}, icon: f, iconMapping: p = kc, onClose: m, role: h = "alert", severity: g = "success", slotProps: _ = {}, slots: v = {}, variant: y = "standard", ...b } = i, x = {
		...i,
		color: l,
		severity: g,
		variant: y,
		colorSeverity: l || g
	}, S = wc(x), C = {
		slots: {
			closeButton: u.CloseButton,
			closeIcon: u.CloseIcon,
			...v
		},
		slotProps: {
			...d,
			..._
		}
	}, [w, T] = Q("root", {
		ref: r,
		shouldForwardComponentProp: !0,
		className: U(S.root, s),
		elementType: Tc,
		externalForwardedProps: {
			...C,
			...b
		},
		ownerState: x,
		additionalProps: {
			role: h,
			elevation: 0
		}
	}), [E, D] = Q("icon", {
		className: S.icon,
		elementType: Ec,
		externalForwardedProps: C,
		ownerState: x
	}), [O, k] = Q("message", {
		className: S.message,
		elementType: Dc,
		externalForwardedProps: C,
		ownerState: x
	}), [A, j] = Q("action", {
		className: S.action,
		elementType: Oc,
		externalForwardedProps: C,
		ownerState: x
	}), [M, N] = Q("closeButton", {
		elementType: vc,
		externalForwardedProps: C,
		ownerState: x
	}), [P, F] = Q("closeIcon", {
		elementType: Cc,
		externalForwardedProps: C,
		ownerState: x
	});
	return /*#__PURE__*/ t(w, {
		...T,
		children: [
			f === !1 ? null : /*#__PURE__*/ e(E, {
				...D,
				children: f || p[g] || kc[g]
			}),
			/*#__PURE__*/ e(O, {
				...k,
				children: o
			}),
			a == null ? null : /*#__PURE__*/ e(A, {
				...j,
				children: a
			}),
			a == null && m ? /*#__PURE__*/ e(A, {
				...j,
				children: /*#__PURE__*/ e(M, {
					size: "small",
					"aria-label": c,
					title: c,
					color: "inherit",
					onClick: m,
					...N,
					children: /*#__PURE__*/ e(P, {
						fontSize: "small",
						...F
					})
				})
			}) : null
		]
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Typography/typographyClasses.js
function jc(e) {
	return W("MuiTypography", e);
}
G("MuiTypography", [
	"root",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"inherit",
	"button",
	"caption",
	"overline",
	"alignLeft",
	"alignRight",
	"alignCenter",
	"alignJustify",
	"noWrap",
	"gutterBottom",
	"paragraph"
]);
//#endregion
//#region node_modules/@mui/material/esm/Typography/Typography.js
var Mc = {
	primary: !0,
	secondary: !0,
	error: !0,
	info: !0,
	success: !0,
	warning: !0,
	textPrimary: !0,
	textSecondary: !0,
	textDisabled: !0
}, Nc = yo(), Pc = (e) => {
	let { align: t, gutterBottom: n, noWrap: r, paragraph: i, variant: a, classes: o } = e;
	return K({ root: [
		"root",
		a,
		e.align !== "inherit" && `align${Y(t)}`,
		n && "gutterBottom",
		r && "noWrap",
		i && "paragraph"
	] }, jc, o);
}, Fc = J("span", {
	name: "MuiTypography",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.variant && t[n.variant],
			n.align !== "inherit" && t[`align${Y(n.align)}`],
			n.noWrap && t.noWrap,
			n.gutterBottom && t.gutterBottom,
			n.paragraph && t.paragraph
		];
	}
})(X(({ theme: e }) => ({
	margin: 0,
	variants: [
		{
			props: { variant: "inherit" },
			style: {
				font: "inherit",
				lineHeight: "inherit",
				letterSpacing: "inherit"
			}
		},
		...Object.entries(e.typography).filter(([e, t]) => e !== "inherit" && t && typeof t == "object").map(([e, t]) => ({
			props: { variant: e },
			style: t
		})),
		...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
			props: { color: t },
			style: { color: (e.vars || e).palette[t].main }
		})),
		...Object.entries(e.palette?.text || {}).filter(([, e]) => typeof e == "string").map(([t]) => ({
			props: { color: `text${Y(t)}` },
			style: { color: (e.vars || e).palette.text[t] }
		})),
		{
			props: ({ ownerState: e }) => e.align !== "inherit",
			style: { textAlign: "var(--Typography-textAlign)" }
		},
		{
			props: ({ ownerState: e }) => e.noWrap,
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			}
		},
		{
			props: ({ ownerState: e }) => e.gutterBottom,
			style: { marginBottom: "0.35em" }
		},
		{
			props: ({ ownerState: e }) => e.paragraph,
			style: { marginBottom: 16 }
		}
	]
}))), Ic = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p"
}, Lc = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let { color: r, ...i } = Z({
		props: t,
		name: "MuiTypography"
	}), a = !Mc[r], o = Nc({
		...i,
		...a && { color: r }
	}), { align: s = "inherit", className: c, component: l, gutterBottom: u = !1, noWrap: d = !1, paragraph: f = !1, variant: p = "body1", variantMapping: m = Ic, ...h } = o, g = {
		...o,
		align: s,
		color: r,
		className: c,
		component: l,
		gutterBottom: u,
		noWrap: d,
		paragraph: f,
		variant: p,
		variantMapping: m
	}, _ = l || (f ? "p" : m[p] || Ic[p]) || "span", v = Pc(g);
	return /*#__PURE__*/ e(Fc, {
		as: _,
		ref: n,
		className: U(v.root, c),
		...h,
		ownerState: g,
		style: {
			...s !== "inherit" && { "--Typography-textAlign": s },
			...h.style
		}
	});
});
//#endregion
//#region node_modules/@mui/utils/esm/contains/contains.js
function Rc(e, t) {
	if (!e || !t) return !1;
	if (e.contains(t)) return !0;
	let n = t.getRootNode?.();
	if (n && n instanceof ShadowRoot) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode ?? n.host ?? null;
		}
	}
	return !1;
}
var zc = "bottom", Bc = "right", Vc = "left", Hc = "auto", Uc = [
	"top",
	zc,
	Bc,
	Vc
], Wc = "start", Gc = "clippingParents", Kc = "viewport", qc = "popper", Jc = "reference", Yc = /*#__PURE__*/ Uc.reduce(function(e, t) {
	return e.concat([t + "-" + Wc, t + "-end"]);
}, []), Xc = /*#__PURE__*/ [].concat(Uc, [Hc]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + Wc,
		t + "-end"
	]);
}, []), Zc = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function Qc(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function $c(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function el(e) {
	return e instanceof $c(e).Element || e instanceof Element;
}
function tl(e) {
	return e instanceof $c(e).HTMLElement || e instanceof HTMLElement;
}
function nl(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof $c(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function rl(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!tl(i) || !Qc(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function il(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var r = t.elements[e], i = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			!tl(r) || !Qc(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var al = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: rl,
	effect: il,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function ol(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var sl = Math.max, cl = Math.min, ll = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function ul() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function dl() {
	return !/^((?!chrome|android).)*safari/i.test(ul());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function fl(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && tl(e) && (i = e.offsetWidth > 0 && ll(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && ll(r.height) / e.offsetHeight || 1);
	var o = (el(e) ? $c(e) : window).visualViewport, s = !dl() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
	return {
		width: u,
		height: d,
		top: l,
		right: c + u,
		bottom: l + d,
		left: c,
		x: c,
		y: l
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function pl(e) {
	var t = fl(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function ml(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && nl(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function hl(e) {
	return $c(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function gl(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(Qc(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function _l(e) {
	return ((el(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function vl(e) {
	return Qc(e) === "html" ? e : e.assignedSlot || e.parentNode || (nl(e) ? e.host : null) || _l(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function yl(e) {
	return !tl(e) || hl(e).position === "fixed" ? null : e.offsetParent;
}
function bl(e) {
	var t = /firefox/i.test(ul());
	if (/Trident/i.test(ul()) && tl(e) && hl(e).position === "fixed") return null;
	var n = vl(e);
	for (nl(n) && (n = n.host); tl(n) && ["html", "body"].indexOf(Qc(n)) < 0;) {
		var r = hl(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function xl(e) {
	for (var t = $c(e), n = yl(e); n && gl(n) && hl(n).position === "static";) n = yl(n);
	return n && (Qc(n) === "html" || Qc(n) === "body" && hl(n).position === "static") ? t : n || bl(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function Sl(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function Cl(e, t, n) {
	return sl(e, cl(t, n));
}
function wl(e, t, n) {
	var r = Cl(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function Tl() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function El(e) {
	return Object.assign({}, Tl(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function Dl(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var Ol = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, El(typeof e == "number" ? Dl(e, Uc) : e);
};
function kl(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = ol(n.placement), c = Sl(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = Ol(i.padding, n), d = pl(a), f = c === "y" ? "top" : Vc, p = c === "y" ? zc : Bc, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = xl(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = Cl(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function Al(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || ml(t.elements.popper, r) && (t.elements.arrow = r));
}
var jl = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: kl,
	effect: Al,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function Ml(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var Nl = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function Pl(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: ll(n * i) / i || 0,
		y: ll(r * i) / i || 0
	};
}
function Fl(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = Vc, b = "top", x = window;
	if (l) {
		var S = xl(n), C = "clientHeight", w = "clientWidth";
		if (S === $c(n) && (S = _l(n), hl(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = zc;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = Bc;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var D = Object.assign({ position: s }, l && Nl), O = u === !0 ? Pl({
		x: p,
		y: h
	}, $c(n)) : {
		x: p,
		y: h
	};
	if (p = O.x, h = O.y, c) {
		var k;
		return Object.assign({}, D, (k = {}, k[b] = v ? "0" : "", k[y] = _ ? "0" : "", k.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", k));
	}
	return Object.assign({}, D, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function Il(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: ol(t.placement),
		variation: Ml(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Fl(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Fl(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Ll = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: Il,
	data: {}
}, Rl = { passive: !0 };
function zl(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = $c(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, Rl);
	}), s && c.addEventListener("resize", n.update, Rl), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, Rl);
		}), s && c.removeEventListener("resize", n.update, Rl);
	};
}
var Bl = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: zl,
	data: {}
}, Vl = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Hl(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return Vl[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var Ul = {
	start: "end",
	end: "start"
};
function Wl(e) {
	return e.replace(/start|end/g, function(e) {
		return Ul[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function Gl(e) {
	var t = $c(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function Kl(e) {
	return fl(_l(e)).left + Gl(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function ql(e, t) {
	var n = $c(e), r = _l(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = dl();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + Kl(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function Jl(e) {
	var t = _l(e), n = Gl(e), r = e.ownerDocument?.body, i = sl(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = sl(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + Kl(e), s = -n.scrollTop;
	return hl(r || t).direction === "rtl" && (o += sl(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function Yl(e) {
	var t = hl(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function Xl(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(Qc(e)) >= 0 ? e.ownerDocument.body : tl(e) && Yl(e) ? e : Xl(vl(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function Zl(e, t) {
	t === void 0 && (t = []);
	var n = Xl(e), r = n === e.ownerDocument?.body, i = $c(n), a = r ? [i].concat(i.visualViewport || [], Yl(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(Zl(vl(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function Ql(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function $l(e, t) {
	var n = fl(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function eu(e, t, n) {
	return t === "viewport" ? Ql(ql(e, n)) : el(t) ? $l(t, n) : Ql(Jl(_l(e)));
}
function tu(e) {
	var t = Zl(vl(e)), n = ["absolute", "fixed"].indexOf(hl(e).position) >= 0 && tl(e) ? xl(e) : e;
	return el(n) ? t.filter(function(e) {
		return el(e) && ml(e, n) && Qc(e) !== "body";
	}) : [];
}
function nu(e, t, n, r) {
	var i = t === "clippingParents" ? tu(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = eu(e, n, r);
		return t.top = sl(i.top, t.top), t.right = cl(i.right, t.right), t.bottom = cl(i.bottom, t.bottom), t.left = sl(i.left, t.left), t;
	}, eu(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function ru(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? ol(r) : null, a = r ? Ml(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case zc:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case Bc:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case Vc:
			c = {
				x: t.x - n.width,
				y: s
			};
			break;
		default: c = {
			x: t.x,
			y: t.y
		};
	}
	var l = i ? Sl(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case Wc:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end": c[l] = c[l] + (t[u] / 2 - n[u] / 2);
		}
	}
	return c;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function iu(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? Gc : s, l = n.rootBoundary, u = l === void 0 ? Kc : l, d = n.elementContext, f = d === void 0 ? qc : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = El(typeof g == "number" ? Dl(g, Uc) : g), v = f === "popper" ? Jc : qc, y = e.rects.popper, b = e.elements[m ? v : f], x = nu(el(b) ? b : b.contextElement || _l(e.elements.popper), c, u, o), S = fl(e.elements.reference), C = ru({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = Ql(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, D = e.modifiersData.offset;
	if (f === "popper" && D) {
		var O = D[i];
		Object.keys(E).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			E[e] += O[n] * t;
		});
	}
	return E;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function au(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? Xc : c, u = Ml(r), d = u ? s ? Yc : Yc.filter(function(e) {
		return Ml(e) === u;
	}) : Uc, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = iu(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[ol(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function ou(e) {
	if (ol(e) === "auto") return [];
	var t = Hl(e);
	return [
		Wl(e),
		t,
		Wl(t)
	];
}
function su(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, _ = ol(g) === g, v = c || (_ || !m ? [Hl(g)] : ou(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(ol(n) === "auto" ? au(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], D = ol(E), O = Ml(E) === Wc, k = ["top", zc].indexOf(D) >= 0, A = k ? "width" : "height", j = iu(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), M = k ? O ? Bc : Vc : O ? zc : "top";
			b[A] > x[A] && (M = Hl(M));
			var N = Hl(M), P = [];
			if (a && P.push(j[D] <= 0), s && P.push(j[M] <= 0, j[N] <= 0), P.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, P);
		}
		if (C) for (var F = m ? 3 : 1, ee = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, I = F; I > 0 && ee(I) !== "break"; I--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var cu = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: su,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function lu(e, t, n) {
	return n === void 0 && (n = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - n.y,
		right: e.right - t.width + n.x,
		bottom: e.bottom - t.height + n.y,
		left: e.left - t.width - n.x
	};
}
function uu(e) {
	return [
		"top",
		Bc,
		zc,
		Vc
	].some(function(t) {
		return e[t] >= 0;
	});
}
function du(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = iu(t, { elementContext: "reference" }), s = iu(t, { altBoundary: !0 }), c = lu(o, r), l = lu(s, i, a), u = uu(c), d = uu(l);
	t.modifiersData[n] = {
		referenceClippingOffsets: c,
		popperEscapeOffsets: l,
		isReferenceHidden: u,
		hasPopperEscaped: d
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": u,
		"data-popper-escaped": d
	});
}
var fu = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: du
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function pu(e, t, n) {
	var r = ol(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function mu(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = Xc.reduce(function(e, n) {
		return e[n] = pu(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var hu = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: mu
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function gu(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = ru({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var _u = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: gu,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function vu(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function yu(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = iu(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = ol(t.placement), v = Ml(t.placement), y = !v, b = Sl(_), x = vu(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
		mainAxis: T,
		altAxis: T
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, T), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, O = {
		x: 0,
		y: 0
	};
	if (S) {
		if (a) {
			var k = b === "y" ? "top" : Vc, A = b === "y" ? zc : Bc, j = b === "y" ? "height" : "width", M = S[b], N = M + g[k], P = M - g[A], F = p ? -w[j] / 2 : 0, ee = v === "start" ? C[j] : w[j], I = v === "start" ? -w[j] : -C[j], te = t.elements.arrow, L = p && te ? pl(te) : {
				width: 0,
				height: 0
			}, ne = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Tl(), re = ne[k], R = ne[A], ie = Cl(0, C[j], L[j]), z = y ? C[j] / 2 - F - ie - re - E.mainAxis : ee - ie - re - E.mainAxis, ae = y ? -C[j] / 2 + F + ie + R + E.mainAxis : I + ie + R + E.mainAxis, oe = t.elements.arrow && xl(t.elements.arrow), se = oe ? b === "y" ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, ce = D?.[b] ?? 0, le = M + z - ce - se, ue = M + ae - ce, de = Cl(p ? cl(N, le) : N, M, p ? sl(P, ue) : P);
			S[b] = de, O[b] = de - M;
		}
		if (s) {
			var B = b === "x" ? "top" : Vc, V = b === "x" ? zc : Bc, H = S[x], fe = x === "y" ? "height" : "width", pe = H + g[B], me = H - g[V], he = ["top", Vc].indexOf(_) !== -1, ge = D?.[x] ?? 0, _e = he ? pe : H - C[fe] - w[fe] - ge + E.altAxis, ve = he ? H + C[fe] + w[fe] - ge - E.altAxis : me, ye = p && he ? wl(_e, H, ve) : Cl(p ? _e : pe, H, p ? ve : me);
			S[x] = ye, O[x] = ye - H;
		}
		t.modifiersData[r] = O;
	}
}
var bu = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: yu,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function xu(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function Su(e) {
	return e === $c(e) || !tl(e) ? Gl(e) : xu(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function Cu(e) {
	var t = e.getBoundingClientRect(), n = ll(t.width) / e.offsetWidth || 1, r = ll(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function wu(e, t, n) {
	n === void 0 && (n = !1);
	var r = tl(t), i = tl(t) && Cu(t), a = _l(t), o = fl(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((Qc(t) !== "body" || Yl(a)) && (s = Su(t)), tl(t) ? (c = fl(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Kl(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function Tu(e) {
	var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function i(e) {
		n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!n.has(e)) {
				var r = t.get(e);
				r && i(r);
			}
		}), r.push(e);
	}
	return e.forEach(function(e) {
		n.has(e.name) || i(e);
	}), r;
}
function Eu(e) {
	var t = Tu(e);
	return Zc.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function Du(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function Ou(e) {
	var t = e.reduce(function(e, t) {
		var n = e[t.name];
		return e[t.name] = n ? Object.assign({}, n, t, {
			options: Object.assign({}, n.options, t.options),
			data: Object.assign({}, n.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var ku = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function Au() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function ju(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? ku : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, ku, a),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, o = [], s = !1, c = {
			state: i,
			setOptions: function(n) {
				var o = typeof n == "function" ? n(i.options) : n;
				u(), i.options = Object.assign({}, a, i.options, o), i.scrollParents = {
					reference: el(e) ? Zl(e) : e.contextElement ? Zl(e.contextElement) : [],
					popper: Zl(t)
				};
				var s = Eu(Ou([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (Au(t, n)) {
						i.rects = {
							reference: wu(t, xl(n), i.options.strategy === "fixed"),
							popper: pl(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) {
							if (i.reset === !0) {
								i.reset = !1, r = -1;
								continue;
							}
							var a = i.orderedModifiers[r], o = a.fn, l = a.options, u = l === void 0 ? {} : l, d = a.name;
							typeof o == "function" && (i = o({
								state: i,
								options: u,
								name: d,
								instance: c
							}) || i);
						}
					}
				}
			},
			update: Du(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!Au(e, t)) return c;
		c.setOptions(n).then(function(e) {
			!s && n.onFirstUpdate && n.onFirstUpdate(e);
		});
		function l() {
			i.orderedModifiers.forEach(function(e) {
				var t = e.name, n = e.options, r = n === void 0 ? {} : n, a = e.effect;
				if (typeof a == "function") {
					var s = a({
						state: i,
						name: t,
						instance: c,
						options: r
					});
					o.push(s || function() {});
				}
			});
		}
		function u() {
			o.forEach(function(e) {
				return e();
			}), o = [];
		}
		return c;
	};
}
var Mu = /*#__PURE__*/ ju({ defaultModifiers: [
	Bl,
	_u,
	Ll,
	al,
	hu,
	cu,
	bu,
	jl,
	fu
] });
//#endregion
//#region node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
function Nu(e) {
	let { elementType: t, externalSlotProps: n, ownerState: r, skipResolvingSlotProps: i = !1, ...a } = e, o = i ? {} : Cs(n, r), { props: s, internalRef: c } = Es({
		...a,
		externalSlotProps: o
	}), l = zo(c, o?.ref, e.additionalProps?.ref);
	return Ss(t, {
		...s,
		ref: l
	}, r);
}
//#endregion
//#region node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js
function Pu(e) {
	return parseInt(n.version, 10) >= 19 ? e?.props?.ref || null : e?.ref || null;
}
//#endregion
//#region node_modules/@mui/material/esm/Portal/Portal.js
function Fu(e) {
	return typeof e == "function" ? e() : e;
}
var Iu = /*#__PURE__*/ n.forwardRef(function(e, t) {
	let { children: r, container: i, disablePortal: a = !1 } = e, [o, s] = n.useState(null), c = zo(/*#__PURE__*/ n.isValidElement(r) ? Pu(r) : null, t);
	if (Yr(() => {
		a || s(Fu(i) || document.body);
	}, [i, a]), Yr(() => {
		if (o && !a) return Mo(t, o), () => {
			Mo(t, null);
		};
	}, [
		t,
		o,
		a
	]), a) {
		if (/*#__PURE__*/ n.isValidElement(r)) {
			let e = { ref: c };
			return /*#__PURE__*/ n.cloneElement(r, e);
		}
		return r;
	}
	return o && /*#__PURE__*/ f.createPortal(r, o);
});
//#endregion
//#region node_modules/@mui/material/esm/Popper/popperClasses.js
function Lu(e) {
	return W("MuiPopper", e);
}
G("MuiPopper", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/Popper/BasePopper.js
function Ru(e, t) {
	if (t === "ltr") return e;
	switch (e) {
		case "bottom-end": return "bottom-start";
		case "bottom-start": return "bottom-end";
		case "top-end": return "top-start";
		case "top-start": return "top-end";
		default: return e;
	}
}
function zu(e) {
	return typeof e == "function" ? e() : e;
}
function Bu(e) {
	return e.nodeType !== void 0;
}
var Vu = (e) => {
	let { classes: t } = e;
	return K({ root: ["root"] }, Lu, t);
}, Hu = {}, Uu = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let { anchorEl: i, children: a, direction: o, disablePortal: s, modifiers: c, open: l, placement: u, popperOptions: d, popperRef: f, slotProps: p = {}, slots: m = {}, TransitionProps: h, ownerState: g, ..._ } = t, v = n.useRef(null), y = zo(v, r), b = n.useRef(null), x = zo(b, f), S = n.useRef(x);
	Yr(() => {
		S.current = x;
	}, [x]), n.useImperativeHandle(f, () => b.current, []);
	let C = Ru(u, o), [w, T] = n.useState(C), [E, D] = n.useState(zu(i));
	n.useEffect(() => {
		b.current && b.current.forceUpdate();
	}), n.useEffect(() => {
		i && D(zu(i));
	}, [i]), Yr(() => {
		if (!E || !l) return;
		let e = (e) => {
			T(e.placement);
		}, t = [
			{
				name: "preventOverflow",
				options: { altBoundary: s }
			},
			{
				name: "flip",
				options: { altBoundary: s }
			},
			{
				name: "onUpdate",
				enabled: !0,
				phase: "afterWrite",
				fn: ({ state: t }) => {
					e(t);
				}
			}
		];
		c != null && (t = t.concat(c)), d && d.modifiers != null && (t = t.concat(d.modifiers));
		let n = Mu(E, v.current, {
			placement: C,
			...d,
			modifiers: t
		});
		S.current(n);
		let r = v.current;
		return () => {
			if (r) {
				let { style: e } = r, t = e.position, i = e.top, a = e.left, o = e.transform;
				n.destroy(), e.position = t, e.top = i, e.left = a, e.transform = o;
			} else n.destroy();
			S.current(null);
		};
	}, [
		E,
		s,
		c,
		l,
		d,
		C
	]);
	let O = { placement: w };
	h !== null && (O.TransitionProps = h);
	let k = Vu(t), A = m.root ?? "div", j = Nu({
		elementType: A,
		externalSlotProps: p.root,
		externalForwardedProps: _,
		additionalProps: {
			role: "tooltip",
			ref: y
		},
		ownerState: t,
		className: k.root
	});
	return /*#__PURE__*/ e(A, {
		...j,
		children: typeof a == "function" ? a(O) : a
	});
}), Wu = J(/* @__PURE__ */ n.forwardRef(function(t, r) {
	let { anchorEl: i, children: a, container: o, direction: s = "ltr", disablePortal: c = !1, keepMounted: l = !1, modifiers: u, open: d, placement: f = "bottom", popperOptions: p = Hu, popperRef: m, style: h, transition: g = !1, slotProps: _ = {}, slots: v = {}, ...y } = t, [b, x] = n.useState(!0), S = () => {
		x(!1);
	}, C = () => {
		x(!0);
	};
	if (!l && !d && (!g || b)) return null;
	let w;
	if (o) w = o;
	else if (i) {
		let e = zu(i);
		w = e && Bu(e) ? Oo(e).body : Oo(null).body;
	}
	let T = !d && l && (!g || b) ? "none" : void 0, E = g ? {
		in: d,
		onEnter: S,
		onExited: C
	} : void 0;
	return /*#__PURE__*/ e(Iu, {
		disablePortal: c,
		container: w,
		children: /*#__PURE__*/ e(Uu, {
			anchorEl: i,
			direction: s,
			disablePortal: c,
			modifiers: u,
			ref: r,
			open: g ? !b : d,
			placement: f,
			popperOptions: p,
			popperRef: m,
			slotProps: _,
			slots: v,
			...y,
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				display: T,
				...h
			},
			TransitionProps: E,
			children: a
		})
	});
}), {
	name: "MuiPopper",
	slot: "Root"
})({}), Gu = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = xi(), { anchorEl: i, component: a, components: o, componentsProps: s, container: c, disablePortal: l, keepMounted: u, modifiers: d, open: f, placement: p, popperOptions: m, popperRef: h, transition: g, slots: _, slotProps: v, ...y } = Z({
		props: t,
		name: "MuiPopper"
	}), b = _?.root ?? o?.Root, x = {
		anchorEl: i,
		container: c,
		disablePortal: l,
		keepMounted: u,
		modifiers: d,
		open: f,
		placement: p,
		popperOptions: m,
		popperRef: h,
		transition: g,
		...y
	};
	return /*#__PURE__*/ e(Wu, {
		as: a,
		direction: r ? "rtl" : "ltr",
		slots: { root: b },
		slotProps: v ?? s,
		...x,
		ref: n
	});
}), Ku = wo(/*#__PURE__*/ e("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" }), "Cancel");
//#endregion
//#region node_modules/@mui/material/esm/Chip/chipClasses.js
function qu(e) {
	return W("MuiChip", e);
}
var Ju = G("MuiChip", /* @__PURE__ */ "root.sizeSmall.sizeMedium.colorDefault.colorError.colorInfo.colorPrimary.colorSecondary.colorSuccess.colorWarning.disabled.clickable.clickableColorPrimary.clickableColorSecondary.deletable.deletableColorPrimary.deletableColorSecondary.outlined.filled.outlinedPrimary.outlinedSecondary.filledPrimary.filledSecondary.avatar.avatarSmall.avatarMedium.avatarColorPrimary.avatarColorSecondary.icon.iconSmall.iconMedium.iconColorPrimary.iconColorSecondary.label.labelSmall.labelMedium.deleteIcon.deleteIconSmall.deleteIconMedium.deleteIconColorPrimary.deleteIconColorSecondary.deleteIconOutlinedColorPrimary.deleteIconOutlinedColorSecondary.deleteIconFilledColorPrimary.deleteIconFilledColorSecondary.focusVisible".split(".")), Yu = (e) => {
	let { classes: t, disabled: n, size: r, color: i, iconColor: a, onDelete: o, clickable: s, variant: c } = e;
	return K({
		root: [
			"root",
			c,
			n && "disabled",
			`size${Y(r)}`,
			`color${Y(i)}`,
			s && "clickable",
			s && `clickableColor${Y(i)}`,
			o && "deletable",
			o && `deletableColor${Y(i)}`,
			`${c}${Y(i)}`
		],
		label: ["label", `label${Y(r)}`],
		avatar: [
			"avatar",
			`avatar${Y(r)}`,
			`avatarColor${Y(i)}`
		],
		icon: [
			"icon",
			`icon${Y(r)}`,
			`iconColor${Y(a)}`
		],
		deleteIcon: [
			"deleteIcon",
			`deleteIcon${Y(r)}`,
			`deleteIconColor${Y(i)}`,
			`deleteIcon${Y(c)}Color${Y(i)}`
		]
	}, qu, t);
}, Xu = J("div", {
	name: "MuiChip",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e, { color: r, iconColor: i, clickable: a, onDelete: o, size: s, variant: c } = n;
		return [
			{ [`& .${Ju.avatar}`]: t.avatar },
			{ [`& .${Ju.avatar}`]: t[`avatar${Y(s)}`] },
			{ [`& .${Ju.avatar}`]: t[`avatarColor${Y(r)}`] },
			{ [`& .${Ju.icon}`]: t.icon },
			{ [`& .${Ju.icon}`]: t[`icon${Y(s)}`] },
			{ [`& .${Ju.icon}`]: t[`iconColor${Y(i)}`] },
			{ [`& .${Ju.deleteIcon}`]: t.deleteIcon },
			{ [`& .${Ju.deleteIcon}`]: t[`deleteIcon${Y(s)}`] },
			{ [`& .${Ju.deleteIcon}`]: t[`deleteIconColor${Y(r)}`] },
			{ [`& .${Ju.deleteIcon}`]: t[`deleteIcon${Y(c)}Color${Y(r)}`] },
			t.root,
			t[`size${Y(s)}`],
			t[`color${Y(r)}`],
			a && t.clickable,
			a && r !== "default" && t[`clickableColor${Y(r)}`],
			o && t.deletable,
			o && r !== "default" && t[`deletableColor${Y(r)}`],
			t[c],
			t[`${c}${Y(r)}`]
		];
	}
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light" ? e.palette.grey[700] : e.palette.grey[300];
	return {
		maxWidth: "100%",
		fontFamily: e.typography.fontFamily,
		fontSize: e.typography.pxToRem(13),
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		lineHeight: 1.5,
		color: (e.vars || e).palette.text.primary,
		backgroundColor: (e.vars || e).palette.action.selected,
		borderRadius: 16,
		whiteSpace: "nowrap",
		transition: e.transitions.create(["background-color", "box-shadow"]),
		cursor: "unset",
		outline: 0,
		textDecoration: "none",
		border: 0,
		padding: 0,
		verticalAlign: "middle",
		boxSizing: "border-box",
		[`&.${Ju.disabled}`]: {
			opacity: (e.vars || e).palette.action.disabledOpacity,
			pointerEvents: "none"
		},
		[`& .${Ju.avatar}`]: {
			marginLeft: 5,
			marginRight: -6,
			width: 24,
			height: 24,
			color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : t,
			fontSize: e.typography.pxToRem(12)
		},
		[`& .${Ju.avatarColorPrimary}`]: {
			color: (e.vars || e).palette.primary.contrastText,
			backgroundColor: (e.vars || e).palette.primary.dark
		},
		[`& .${Ju.avatarColorSecondary}`]: {
			color: (e.vars || e).palette.secondary.contrastText,
			backgroundColor: (e.vars || e).palette.secondary.dark
		},
		[`& .${Ju.avatarSmall}`]: {
			marginLeft: 4,
			marginRight: -4,
			width: 18,
			height: 18,
			fontSize: e.typography.pxToRem(10)
		},
		[`& .${Ju.icon}`]: {
			marginLeft: 5,
			marginRight: -6
		},
		[`& .${Ju.deleteIcon}`]: {
			WebkitTapHighlightColor: "transparent",
			color: e.alpha((e.vars || e).palette.text.primary, .26),
			fontSize: 22,
			cursor: "pointer",
			margin: "0 5px 0 -6px",
			"&:hover": { color: e.alpha((e.vars || e).palette.text.primary, .4) }
		},
		variants: [
			{
				props: { size: "small" },
				style: {
					height: 24,
					[`& .${Ju.icon}`]: {
						fontSize: 18,
						marginLeft: 4,
						marginRight: -4
					},
					[`& .${Ju.deleteIcon}`]: {
						fontSize: 16,
						marginRight: 4,
						marginLeft: -4
					}
				}
			},
			...Object.entries(e.palette).filter(Qs(["contrastText"])).map(([t]) => ({
				props: { color: t },
				style: {
					backgroundColor: (e.vars || e).palette[t].main,
					color: (e.vars || e).palette[t].contrastText,
					[`& .${Ju.deleteIcon}`]: {
						color: e.alpha((e.vars || e).palette[t].contrastText, .7),
						"&:hover, &:active": { color: (e.vars || e).palette[t].contrastText }
					}
				}
			})),
			{
				props: (e) => e.iconColor === e.color,
				style: { [`& .${Ju.icon}`]: { color: e.vars ? e.vars.palette.Chip.defaultIconColor : t } }
			},
			{
				props: (e) => e.iconColor === e.color && e.color !== "default",
				style: { [`& .${Ju.icon}`]: { color: "inherit" } }
			},
			{
				props: { onDelete: !0 },
				style: { [`&.${Ju.focusVisible}`]: { backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`) } }
			},
			...Object.entries(e.palette).filter(Qs(["dark"])).map(([t]) => ({
				props: {
					color: t,
					onDelete: !0
				},
				style: { [`&.${Ju.focusVisible}`]: { background: (e.vars || e).palette[t].dark } }
			})),
			{
				props: { clickable: !0 },
				style: {
					userSelect: "none",
					WebkitTapHighlightColor: "transparent",
					cursor: "pointer",
					"&:hover": { backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`) },
					[`&.${Ju.focusVisible}`]: { backgroundColor: e.alpha((e.vars || e).palette.action.selected, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.focusOpacity}`) },
					"&:active": { boxShadow: (e.vars || e).shadows[1] }
				}
			},
			...Object.entries(e.palette).filter(Qs(["dark"])).map(([t]) => ({
				props: {
					color: t,
					clickable: !0
				},
				style: { [`&:hover, &.${Ju.focusVisible}`]: { backgroundColor: (e.vars || e).palette[t].dark } }
			})),
			{
				props: { variant: "outlined" },
				style: {
					backgroundColor: "transparent",
					border: e.vars ? `1px solid ${e.vars.palette.Chip.defaultBorder}` : `1px solid ${e.palette.mode === "light" ? e.palette.grey[400] : e.palette.grey[700]}`,
					[`&.${Ju.clickable}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
					[`&.${Ju.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
					[`& .${Ju.avatar}`]: { marginLeft: 4 },
					[`& .${Ju.avatarSmall}`]: { marginLeft: 2 },
					[`& .${Ju.icon}`]: { marginLeft: 4 },
					[`& .${Ju.iconSmall}`]: { marginLeft: 2 },
					[`& .${Ju.deleteIcon}`]: { marginRight: 5 },
					[`& .${Ju.deleteIconSmall}`]: { marginRight: 3 }
				}
			},
			...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
				props: {
					variant: "outlined",
					color: t
				},
				style: {
					color: (e.vars || e).palette[t].main,
					border: `1px solid ${e.alpha((e.vars || e).palette[t].main, .7)}`,
					[`&.${Ju.clickable}:hover`]: { backgroundColor: e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity) },
					[`&.${Ju.focusVisible}`]: { backgroundColor: e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.focusOpacity) },
					[`& .${Ju.deleteIcon}`]: {
						color: e.alpha((e.vars || e).palette[t].main, .7),
						"&:hover, &:active": { color: (e.vars || e).palette[t].main }
					}
				}
			}))
		]
	};
})), Zu = J("span", {
	name: "MuiChip",
	slot: "Label",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e, { size: r } = n;
		return [t.label, t[`label${Y(r)}`]];
	}
})({
	overflow: "hidden",
	textOverflow: "ellipsis",
	paddingLeft: 12,
	paddingRight: 12,
	whiteSpace: "nowrap",
	variants: [
		{
			props: { variant: "outlined" },
			style: {
				paddingLeft: 11,
				paddingRight: 11
			}
		},
		{
			props: { size: "small" },
			style: {
				paddingLeft: 8,
				paddingRight: 8
			}
		},
		{
			props: {
				size: "small",
				variant: "outlined"
			},
			style: {
				paddingLeft: 7,
				paddingRight: 7
			}
		}
	]
});
function Qu(e) {
	return e.key === "Backspace" || e.key === "Delete";
}
var $u = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiChip"
	}), { avatar: o, className: s, clickable: c, color: l = "default", component: u, deleteIcon: d, disabled: f = !1, icon: p, label: m, onClick: h, onDelete: g, onKeyDown: _, onKeyUp: v, size: y = "medium", variant: b = "filled", tabIndex: x, skipFocusWhenDisabled: S = !1, slots: C = {}, slotProps: w = {}, ...T } = a, E = Bo(n.useRef(null), i), D = (e) => {
		e.stopPropagation(), g(e);
	}, O = (e) => {
		e.currentTarget === e.target && Qu(e) && e.preventDefault(), _ && _(e);
	}, k = (e) => {
		e.currentTarget === e.target && g && Qu(e) && g(e), v && v(e);
	}, A = c !== !1 && h ? !0 : c, j = A || g ? Js : u || "div", M = {
		...a,
		component: j,
		disabled: f,
		size: y,
		color: l,
		iconColor: /*#__PURE__*/ n.isValidElement(p) && p.props.color || l,
		onDelete: !!g,
		clickable: A,
		variant: b
	}, N = Yu(M), P = j === Js ? {
		component: u || "div",
		focusVisibleClassName: N.focusVisible,
		...g && { disableRipple: !0 }
	} : {}, F = null;
	g && (F = d && /*#__PURE__*/ n.isValidElement(d) ? /*#__PURE__*/ n.cloneElement(d, {
		className: U(d.props.className, N.deleteIcon),
		onClick: D
	}) : /*#__PURE__*/ e(Ku, {
		className: N.deleteIcon,
		onClick: D
	}));
	let ee = null;
	o && /*#__PURE__*/ n.isValidElement(o) && (ee = /*#__PURE__*/ n.cloneElement(o, { className: U(N.avatar, o.props.className) }));
	let I = null;
	p && /*#__PURE__*/ n.isValidElement(p) && (I = /*#__PURE__*/ n.cloneElement(p, { className: U(N.icon, p.props.className) }));
	let te = {
		slots: C,
		slotProps: w
	}, [L, ne] = Q("root", {
		elementType: Xu,
		externalForwardedProps: {
			...te,
			...T
		},
		ownerState: M,
		shouldForwardComponentProp: !0,
		ref: E,
		className: U(N.root, s),
		additionalProps: {
			disabled: A && f ? !0 : void 0,
			tabIndex: S && f ? -1 : x,
			...P
		},
		getSlotProps: (e) => ({
			...e,
			onClick: (t) => {
				e.onClick?.(t), h?.(t);
			},
			onKeyDown: (t) => {
				e.onKeyDown?.(t), O(t);
			},
			onKeyUp: (t) => {
				e.onKeyUp?.(t), k(t);
			}
		})
	}), [re, R] = Q("label", {
		elementType: Zu,
		externalForwardedProps: te,
		ownerState: M,
		className: N.label
	});
	return /*#__PURE__*/ t(L, {
		as: j,
		...ne,
		children: [
			ee || I,
			/*#__PURE__*/ e(re, {
				...R,
				children: m
			}),
			F
		]
	});
});
//#endregion
//#region node_modules/@mui/material/esm/TextareaAutosize/TextareaAutosize.js
function ed(e) {
	return parseInt(e, 10) || 0;
}
var td = { shadow: {
	visibility: "hidden",
	position: "absolute",
	overflow: "hidden",
	height: 0,
	top: 0,
	left: 0,
	transform: "translateZ(0)"
} };
function nd(e) {
	for (let t in e) return !1;
	return !0;
}
function rd(e) {
	return nd(e) || e.outerHeightStyle === 0 && !e.overflowing;
}
var id = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let { onChange: a, maxRows: o, minRows: s = 1, style: c, value: l, ...u } = r, { current: d } = n.useRef(l != null), f = n.useRef(null), p = zo(i, f), m = n.useRef(null), h = n.useRef(null), g = n.useCallback(() => {
		let e = f.current, t = h.current;
		if (!e || !t) return;
		let n = Ao(e).getComputedStyle(e);
		if (n.width === "0px") return {
			outerHeightStyle: 0,
			overflowing: !1
		};
		t.style.width = n.width, t.value = e.value || r.placeholder || "x", t.value.slice(-1) === "\n" && (t.value += " ");
		let i = n.boxSizing, a = ed(n.paddingBottom) + ed(n.paddingTop), c = ed(n.borderBottomWidth) + ed(n.borderTopWidth), l = t.scrollHeight;
		t.value = "x";
		let u = t.scrollHeight, d = l;
		return s && (d = Math.max(Number(s) * u, d)), o && (d = Math.min(Number(o) * u, d)), d = Math.max(d, u), {
			outerHeightStyle: d + (i === "border-box" ? a + c : 0),
			overflowing: Math.abs(d - l) <= 1
		};
	}, [
		o,
		s,
		r.placeholder
	]), _ = Lo(() => {
		let e = f.current, t = g();
		if (!e || !t || rd(t)) return !1;
		let n = t.outerHeightStyle;
		return m.current != null && m.current !== n;
	}), v = n.useCallback(() => {
		let e = f.current, t = g();
		if (!e || !t || rd(t)) return;
		let n = t.outerHeightStyle;
		m.current !== n && (m.current = n, e.style.height = `${n}px`), e.style.overflow = t.overflowing ? "hidden" : "";
	}, [g]), y = n.useRef(-1);
	return Yr(() => {
		let e = To(v), t = f?.current;
		if (!t) return;
		let n = Ao(t);
		n.addEventListener("resize", e);
		let r;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(() => {
			_() && (r.unobserve(t), cancelAnimationFrame(y.current), v(), y.current = requestAnimationFrame(() => {
				r.observe(t);
			}));
		}), r.observe(t)), () => {
			e.clear(), cancelAnimationFrame(y.current), n.removeEventListener("resize", e), r && r.disconnect();
		};
	}, [
		g,
		v,
		_
	]), Yr(() => {
		v();
	}), /*#__PURE__*/ t(n.Fragment, { children: [/*#__PURE__*/ e("textarea", {
		value: l,
		onChange: (e) => {
			d || v();
			let t = e.target, n = t.value.length, r = t.value.endsWith("\n"), i = t.selectionStart === n;
			r && i && t.setSelectionRange(n, n), a && a(e);
		},
		ref: p,
		rows: s,
		style: c,
		...u
	}), /*#__PURE__*/ e("textarea", {
		"aria-hidden": !0,
		className: r.className,
		readOnly: !0,
		ref: h,
		tabIndex: -1,
		style: {
			...td.shadow,
			...c,
			paddingTop: 0,
			paddingBottom: 0
		}
	})] });
});
//#endregion
//#region node_modules/@mui/material/esm/FormControl/formControlState.js
function ad({ props: e, states: t, muiFormControl: n }) {
	return t.reduce((t, r) => (t[r] = e[r], n && e[r] === void 0 && (t[r] = n[r]), t), {});
}
//#endregion
//#region node_modules/@mui/material/esm/FormControl/FormControlContext.js
var od = /*#__PURE__*/ n.createContext(void 0);
//#endregion
//#region node_modules/@mui/material/esm/FormControl/useFormControl.js
function sd() {
	return n.useContext(od);
}
//#endregion
//#region node_modules/@mui/utils/esm/getActiveElement/getActiveElement.js
function cd(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/getActiveElement.js
var ld = cd;
//#endregion
//#region node_modules/@mui/material/esm/InputBase/utils.js
function ud(e) {
	return e != null && !(Array.isArray(e) && e.length === 0);
}
function dd(e, t = !1) {
	return e && (ud(e.value) && e.value !== "" || t && ud(e.defaultValue) && e.defaultValue !== "");
}
function fd(e) {
	return e.startAdornment;
}
//#endregion
//#region node_modules/@mui/material/esm/InputBase/inputBaseClasses.js
function pd(e) {
	return W("MuiInputBase", e);
}
var md = G("MuiInputBase", [
	"root",
	"formControl",
	"focused",
	"disabled",
	"adornedStart",
	"adornedEnd",
	"error",
	"sizeSmall",
	"multiline",
	"colorSecondary",
	"fullWidth",
	"hiddenLabel",
	"readOnly",
	"input",
	"inputSizeSmall",
	"inputMultiline",
	"inputTypeSearch",
	"inputAdornedStart",
	"inputAdornedEnd",
	"inputHiddenLabel"
]), hd, gd = "mui-auto-fill", _d = "mui-auto-fill-cancel", vd = (e, t) => {
	let { ownerState: n } = e;
	return [
		t.root,
		n.formControl && t.formControl,
		n.startAdornment && t.adornedStart,
		n.endAdornment && t.adornedEnd,
		n.error && t.error,
		n.size === "small" && t.sizeSmall,
		n.multiline && t.multiline,
		n.color && t[`color${Y(n.color)}`],
		n.fullWidth && t.fullWidth,
		n.hiddenLabel && t.hiddenLabel
	];
}, yd = (e, t) => {
	let { ownerState: n } = e;
	return [
		t.input,
		n.size === "small" && t.inputSizeSmall,
		n.multiline && t.inputMultiline,
		n.type === "search" && t.inputTypeSearch,
		n.startAdornment && t.inputAdornedStart,
		n.endAdornment && t.inputAdornedEnd,
		n.hiddenLabel && t.inputHiddenLabel
	];
}, bd = (e) => {
	let { classes: t, color: n, disabled: r, error: i, endAdornment: a, focused: o, formControl: s, fullWidth: c, hiddenLabel: l, multiline: u, readOnly: d, size: f, startAdornment: p, type: m } = e;
	return K({
		root: [
			"root",
			`color${Y(n)}`,
			r && "disabled",
			i && "error",
			c && "fullWidth",
			o && "focused",
			s && "formControl",
			f && f !== "medium" && `size${Y(f)}`,
			u && "multiline",
			p && "adornedStart",
			a && "adornedEnd",
			l && "hiddenLabel",
			d && "readOnly"
		],
		input: [
			"input",
			r && "disabled",
			m === "search" && "inputTypeSearch",
			u && "inputMultiline",
			f === "small" && "inputSizeSmall",
			l && "inputHiddenLabel",
			p && "inputAdornedStart",
			a && "inputAdornedEnd",
			d && "readOnly"
		]
	}, pd, t);
}, xd = J("div", {
	name: "MuiInputBase",
	slot: "Root",
	overridesResolver: vd
})(X(({ theme: e }) => ({
	...e.typography.body1,
	color: (e.vars || e).palette.text.primary,
	lineHeight: "1.4375em",
	boxSizing: "border-box",
	position: "relative",
	cursor: "text",
	display: "inline-flex",
	alignItems: "center",
	[`&.${md.disabled}`]: {
		color: (e.vars || e).palette.text.disabled,
		cursor: "default"
	},
	variants: [
		{
			props: ({ ownerState: e }) => e.multiline,
			style: { padding: "4px 0 5px" }
		},
		{
			props: ({ ownerState: e, size: t }) => e.multiline && t === "small",
			style: { paddingTop: 1 }
		},
		{
			props: ({ ownerState: e }) => e.fullWidth,
			style: { width: "100%" }
		}
	]
}))), Sd = J("input", {
	name: "MuiInputBase",
	slot: "Input",
	overridesResolver: yd
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light", n = {
		color: "currentColor",
		...e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: t ? .42 : .5 },
		transition: e.transitions.create("opacity", { duration: e.transitions.duration.shorter })
	}, r = { opacity: "0 !important" }, i = e.vars ? { opacity: e.vars.opacity.inputPlaceholder } : { opacity: t ? .42 : .5 };
	return {
		font: "inherit",
		letterSpacing: "inherit",
		color: "currentColor",
		padding: "4px 0 5px",
		border: 0,
		boxSizing: "content-box",
		background: "none",
		height: "1.4375em",
		margin: 0,
		WebkitTapHighlightColor: "transparent",
		display: "block",
		minWidth: 0,
		width: "100%",
		"&::-webkit-input-placeholder": n,
		"&::-moz-placeholder": n,
		"&::-ms-input-placeholder": n,
		"&:focus": { outline: 0 },
		"&:invalid": { boxShadow: "none" },
		"&::-webkit-search-decoration": { WebkitAppearance: "none" },
		[`label[data-shrink=false] + .${md.formControl} &`]: {
			"&::-webkit-input-placeholder": r,
			"&::-moz-placeholder": r,
			"&::-ms-input-placeholder": r,
			"&:focus::-webkit-input-placeholder": i,
			"&:focus::-moz-placeholder": i,
			"&:focus::-ms-input-placeholder": i
		},
		[`&.${md.disabled}`]: {
			opacity: 1,
			WebkitTextFillColor: (e.vars || e).palette.text.disabled
		},
		variants: [
			{
				props: ({ ownerState: e }) => !e.disableInjectingGlobalStyles,
				style: {
					animationName: _d,
					animationDuration: "10ms",
					"&:-webkit-autofill": {
						animationDuration: "5000s",
						animationName: gd
					}
				}
			},
			{
				props: { size: "small" },
				style: { paddingTop: 1 }
			},
			{
				props: ({ ownerState: e }) => e.multiline,
				style: {
					height: "auto",
					resize: "none",
					padding: 0,
					paddingTop: 0
				}
			},
			{
				props: { type: "search" },
				style: { MozAppearance: "textfield" }
			}
		]
	};
})), Cd = vo({
	[`@keyframes ${gd}`]: { from: { animationName: gd } },
	[`@keyframes ${_d}`]: { from: { animationName: _d } }
}), wd = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiInputBase"
	}), { "aria-describedby": o, autoComplete: s, autoFocus: c, className: l, color: u, components: d = {}, componentsProps: f = {}, defaultValue: p, disabled: m, disableInjectingGlobalStyles: h, endAdornment: g, error: _, fullWidth: v = !1, id: y, inputComponent: b = "input", inputProps: x = {}, inputRef: S, margin: C, maxRows: w, minRows: T, multiline: E = !1, name: D, onBlur: O, onChange: k, onClick: A, onFocus: j, onKeyDown: M, onKeyUp: N, placeholder: P, readOnly: F, renderSuffix: ee, rows: I, size: te, slotProps: L = {}, slots: ne = {}, startAdornment: re, type: R = "text", value: ie, ...z } = a, ae = x.value == null ? ie : x.value, { current: oe } = n.useRef(ae != null), se = n.useRef(), ce = n.useCallback((e) => {}, []), le = Bo(se, S, x.ref, ce), [ue, de] = n.useState(!1), B = sd(), V = ad({
		props: a,
		muiFormControl: B,
		states: [
			"color",
			"disabled",
			"error",
			"hiddenLabel",
			"size",
			"required",
			"filled"
		]
	});
	V.focused = B ? B.focused : ue, n.useEffect(() => {
		!B && m && ue && (de(!1), O && O());
	}, [
		B,
		m,
		ue,
		O
	]);
	let H = B && B.onFilled, fe = B && B.onEmpty, pe = n.useCallback((e) => {
		dd(e) ? H && H() : fe && fe();
	}, [H, fe]);
	No(() => {
		oe && pe({ value: ae });
	}, [
		ae,
		pe,
		oe
	]), No(() => {
		if (!c) return;
		let e = se.current;
		if (!e) return;
		let t = ko(e), n = ld(t), r = n == null || n === t.body || n === t.documentElement;
		e === n ? B && B.onFocus ? B.onFocus() : de(!0) : r && e.focus();
	}, [c]);
	let me = (e) => {
		j && j(e), x.onFocus && x.onFocus(e), B && B.onFocus ? B.onFocus(e) : de(!0);
	}, he = (e) => {
		O && O(e), x.onBlur && x.onBlur(e), B && B.onBlur ? B.onBlur(e) : de(!1);
	}, ge = (e, ...t) => {
		if (!oe) {
			let t = e.target || se.current;
			if (t == null) throw Error(Bt(1));
			pe({ value: t.value });
		}
		x.onChange && x.onChange(e, ...t), k && k(e, ...t);
	};
	n.useEffect(() => {
		pe(se.current);
	}, []);
	let _e = (e) => {
		se.current && e.currentTarget === e.target && se.current.focus(), A && A(e);
	}, ve = b, ye = x;
	E && ve === "input" && (ye = I ? {
		type: void 0,
		minRows: I,
		maxRows: I,
		...ye
	} : {
		type: void 0,
		maxRows: w,
		minRows: T,
		...ye
	}, ve = id);
	let be = (e) => {
		pe(e.animationName === _d ? se.current : { value: "x" });
	};
	n.useEffect(() => {
		B && B.setAdornedStart(!!re);
	}, [B, re]);
	let xe = {
		...a,
		color: V.color || "primary",
		disabled: V.disabled,
		endAdornment: g,
		error: V.error,
		focused: V.focused,
		formControl: B,
		fullWidth: v,
		hiddenLabel: V.hiddenLabel,
		multiline: E,
		size: V.size,
		startAdornment: re,
		type: R
	}, Se = bd(xe), Ce = ne.root || d.Root || xd, we = L.root || f.root || {}, Te = ne.input || d.Input || Sd;
	return ye = {
		...ye,
		...L.input ?? f.input
	}, /*#__PURE__*/ t(n.Fragment, { children: [!h && typeof Cd == "function" && (hd ||= /*#__PURE__*/ e(Cd, {})), /*#__PURE__*/ t(Ce, {
		...we,
		ref: i,
		onClick: _e,
		...z,
		...!xs(Ce) && { ownerState: {
			...xe,
			...we.ownerState
		} },
		className: U(Se.root, we.className, l, F && "MuiInputBase-readOnly"),
		children: [
			re,
			/*#__PURE__*/ e(od.Provider, {
				value: null,
				children: /*#__PURE__*/ e(Te, {
					"aria-invalid": V.error,
					"aria-describedby": o,
					autoComplete: s,
					autoFocus: c,
					defaultValue: p,
					disabled: V.disabled,
					id: y,
					onAnimationStart: be,
					name: D,
					placeholder: P,
					readOnly: F,
					required: V.required,
					rows: I,
					value: ae,
					onKeyDown: M,
					onKeyUp: N,
					type: R,
					...ye,
					...!xs(Te) && {
						as: ve,
						ownerState: {
							...xe,
							...ye.ownerState
						}
					},
					ref: le,
					className: U(Se.input, ye.className, F && "MuiInputBase-readOnly"),
					onBlur: he,
					onChange: ge,
					onFocus: me
				})
			}),
			g,
			ee ? ee({
				...V,
				startAdornment: re
			}) : null
		]
	})] });
});
//#endregion
//#region node_modules/@mui/material/esm/Input/inputClasses.js
function Td(e) {
	return W("MuiInput", e);
}
var Ed = {
	...md,
	...G("MuiInput", [
		"root",
		"underline",
		"input"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/OutlinedInput/outlinedInputClasses.js
function Dd(e) {
	return W("MuiOutlinedInput", e);
}
var Od = {
	...md,
	...G("MuiOutlinedInput", [
		"root",
		"notchedOutline",
		"input"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/FilledInput/filledInputClasses.js
function kd(e) {
	return W("MuiFilledInput", e);
}
var Ad = {
	...md,
	...G("MuiFilledInput", [
		"root",
		"underline",
		"input",
		"adornedStart",
		"adornedEnd",
		"sizeSmall",
		"multiline",
		"hiddenLabel"
	])
}, jd = wo(/*#__PURE__*/ e("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown"), Md = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 }
}, Nd = {
	opacity: 0,
	visibility: "hidden"
}, Pd = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = ao(), a = {
		enter: i.transitions.duration.enteringScreen,
		exit: i.transitions.duration.leavingScreen
	}, { addEndListener: o, appear: s = !0, children: c, easing: l, in: u, onEnter: d, onEntered: f, onEntering: p, onExit: m, onExited: h, onExiting: g, style: _, timeout: v = a, ...y } = t, b = n.useRef(null), x = Bo(b, Pu(c), r), S = vs(b, p), C = vs(b, (e, t) => {
		_s(e);
		let n = bs({
			style: _,
			timeout: v,
			easing: l
		}, { mode: "enter" });
		e.style.transition = i.transitions.create("opacity", n), d && d(e, t);
	}), w = vs(b, f), T = vs(b, g), E = vs(b, (e) => {
		let t = bs({
			style: _,
			timeout: v,
			easing: l
		}, { mode: "exit" });
		e.style.transition = i.transitions.create("opacity", t), m && m(e);
	}), D = vs(b, (e) => {
		e.style.transition = "", h && h(e);
	});
	return /*#__PURE__*/ e(es, {
		appear: s,
		in: u,
		nodeRef: b,
		onEnter: C,
		onEntered: w,
		onEntering: S,
		onExit: E,
		onExited: D,
		onExiting: T,
		addEndListener: (e) => {
			o && o(b.current, e);
		},
		timeout: v,
		...y,
		children: (e, { ownerState: t, ...r }) => {
			let i = ys(e, u, Md, Nd, _, c.props.style);
			return /*#__PURE__*/ n.cloneElement(c, {
				style: i,
				ref: x,
				...r
			});
		}
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Backdrop/backdropClasses.js
function Fd(e) {
	return W("MuiBackdrop", e);
}
G("MuiBackdrop", ["root", "invisible"]);
//#endregion
//#region node_modules/@mui/material/esm/Backdrop/Backdrop.js
var Id = (e) => {
	let { classes: t, invisible: n } = e;
	return K({ root: ["root", n && "invisible"] }, Fd, t);
}, Ld = J("div", {
	name: "MuiBackdrop",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, n.invisible && t.invisible];
	}
})({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	WebkitTapHighlightColor: "transparent",
	variants: [{
		props: { invisible: !0 },
		style: { backgroundColor: "transparent" }
	}]
}), Rd = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiBackdrop"
	}), { children: i, className: a, component: o = "div", invisible: s = !1, open: c, components: l = {}, componentsProps: u = {}, slotProps: d = {}, slots: f = {}, TransitionComponent: p, transitionDuration: m, ...h } = r, g = {
		...r,
		component: o,
		invisible: s
	}, _ = Id(g), v = {
		component: o,
		slots: {
			transition: p,
			root: l.Root,
			...f
		},
		slotProps: {
			...u,
			...d
		}
	}, [y, b] = Q("root", {
		elementType: Ld,
		externalForwardedProps: v,
		className: U(_.root, a),
		ownerState: g
	}), [x, S] = Q("transition", {
		elementType: Pd,
		externalForwardedProps: v,
		ownerState: g
	});
	return /*#__PURE__*/ e(x, {
		in: c,
		timeout: m,
		...h,
		...S,
		children: /*#__PURE__*/ e(y, {
			"aria-hidden": !0,
			...b,
			ref: n,
			children: i
		})
	});
}), zd = G("MuiBox", ["root"]), $ = Pr({
	themeId: Vt,
	defaultTheme: ro(),
	defaultClassName: zd.root,
	generateClassName: Mr.generate
});
//#endregion
//#region node_modules/@mui/material/esm/Button/buttonClasses.js
function Bd(e) {
	return W("MuiButton", e);
}
var Vd = G("MuiButton", /* @__PURE__ */ "root.text.textInherit.textPrimary.textSecondary.textSuccess.textError.textInfo.textWarning.outlined.outlinedInherit.outlinedPrimary.outlinedSecondary.outlinedSuccess.outlinedError.outlinedInfo.outlinedWarning.contained.containedInherit.containedPrimary.containedSecondary.containedSuccess.containedError.containedInfo.containedWarning.disableElevation.focusVisible.disabled.colorInherit.colorPrimary.colorSecondary.colorSuccess.colorError.colorInfo.colorWarning.textSizeSmall.textSizeMedium.textSizeLarge.outlinedSizeSmall.outlinedSizeMedium.outlinedSizeLarge.containedSizeSmall.containedSizeMedium.containedSizeLarge.sizeMedium.sizeSmall.sizeLarge.fullWidth.startIcon.endIcon.icon.iconSizeSmall.iconSizeMedium.iconSizeLarge.loading.loadingWrapper.loadingIconPlaceholder.loadingIndicator.loadingPositionCenter.loadingPositionStart.loadingPositionEnd".split(".")), Hd = /*#__PURE__*/ n.createContext({}), Ud = /*#__PURE__*/ n.createContext(void 0), Wd = (e) => {
	let { color: t, disableElevation: n, fullWidth: r, size: i, variant: a, loading: o, loadingPosition: s, classes: c } = e, l = K({
		root: [
			"root",
			o && "loading",
			a,
			`${a}${Y(t)}`,
			`size${Y(i)}`,
			`${a}Size${Y(i)}`,
			`color${Y(t)}`,
			n && "disableElevation",
			r && "fullWidth",
			o && `loadingPosition${Y(s)}`
		],
		startIcon: [
			"icon",
			"startIcon",
			`iconSize${Y(i)}`
		],
		endIcon: [
			"icon",
			"endIcon",
			`iconSize${Y(i)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, Bd, c);
	return {
		...c,
		...l
	};
}, Gd = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
], Kd = J(Js, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			t[`${n.variant}${Y(n.color)}`],
			t[`size${Y(n.size)}`],
			t[`${n.variant}Size${Y(n.size)}`],
			n.color === "inherit" && t.colorInherit,
			n.disableElevation && t.disableElevation,
			n.fullWidth && t.fullWidth,
			n.loading && t.loading
		];
	}
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], n = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
	return {
		...e.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (e.vars || e).shape.borderRadius,
		transition: e.transitions.create([
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: e.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${Vd.disabled}`]: { color: (e.vars || e).palette.action.disabled },
		variants: [
			{
				props: ({ ownerState: e }) => e.startIcon || e.loading && e.loadingPosition === "start",
				style: { "&::before": {
					content: "\"\\200b\"",
					width: 0,
					overflow: "hidden"
				} }
			},
			{
				props: { variant: "contained" },
				style: {
					color: "var(--variant-containedColor)",
					backgroundColor: "var(--variant-containedBg)",
					boxShadow: (e.vars || e).shadows[2],
					"&:hover": {
						boxShadow: (e.vars || e).shadows[4],
						"@media (hover: none)": { boxShadow: (e.vars || e).shadows[2] }
					},
					"&:active": { boxShadow: (e.vars || e).shadows[8] },
					[`&.${Vd.focusVisible}`]: { boxShadow: (e.vars || e).shadows[6] },
					[`&.${Vd.disabled}`]: {
						color: (e.vars || e).palette.action.disabled,
						boxShadow: (e.vars || e).shadows[0],
						backgroundColor: (e.vars || e).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: "var(--variant-outlinedBorder, currentColor)",
					backgroundColor: "var(--variant-outlinedBg)",
					color: "var(--variant-outlinedColor)",
					[`&.${Vd.disabled}`]: { border: `1px solid ${(e.vars || e).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: "var(--variant-textColor)",
					backgroundColor: "var(--variant-textBg)"
				}
			},
			...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
				props: { color: t },
				style: {
					"--variant-textColor": (e.vars || e).palette[t].main,
					"--variant-outlinedColor": (e.vars || e).palette[t].main,
					"--variant-outlinedBorder": e.alpha((e.vars || e).palette[t].main, .5),
					"--variant-containedColor": (e.vars || e).palette[t].contrastText,
					"--variant-containedBg": (e.vars || e).palette[t].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (e.vars || e).palette[t].dark,
						"--variant-textBg": e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (e.vars || e).palette[t].main,
						"--variant-outlinedBg": e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedBg : t,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : n,
						"--variant-textBg": e.alpha((e.vars || e).palette.text.primary, (e.vars || e).palette.action.hoverOpacity),
						"--variant-outlinedBg": e.alpha((e.vars || e).palette.text.primary, (e.vars || e).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: e.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: e.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: e.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: e.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: e.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: e.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: !0 },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${Vd.focusVisible}`]: { boxShadow: "none" },
					"&:active": { boxShadow: "none" },
					[`&.${Vd.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: !0 },
				style: { width: "100%" }
			},
			{
				props: { loadingPosition: "center" },
				style: {
					transition: e.transitions.create([
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: e.transitions.duration.short }),
					[`&.${Vd.loading}`]: { color: "transparent" }
				}
			}
		]
	};
})), qd = J("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.startIcon,
			n.loading && t.startIconLoadingStart,
			t[`iconSize${Y(n.size)}`]
		];
	}
})(({ theme: e }) => ({
	display: "inherit",
	marginRight: 8,
	marginLeft: -4,
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: !0
			},
			style: {
				transition: e.transitions.create(["opacity"], { duration: e.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: !0,
				fullWidth: !0
			},
			style: { marginRight: -8 }
		},
		...Gd
	]
})), Jd = J("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.endIcon,
			n.loading && t.endIconLoadingEnd,
			t[`iconSize${Y(n.size)}`]
		];
	}
})(({ theme: e }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: !0
			},
			style: {
				transition: e.transitions.create(["opacity"], { duration: e.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: !0,
				fullWidth: !0
			},
			style: { marginLeft: -8 }
		},
		...Gd
	]
})), Yd = J("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme: e }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: !0 },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (e.vars || e).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: !0
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: !0
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
})), Xd = J("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
}), Zd = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = n.useContext(Hd), o = n.useContext(Ud), s = Z({
		props: Jr(a, r),
		name: "MuiButton"
	}), { children: c, color: l = "primary", component: u = "button", className: d, disabled: f = !1, disableElevation: p = !1, disableFocusRipple: m = !1, endIcon: h, focusVisibleClassName: g, fullWidth: _ = !1, id: v, loading: y = null, loadingIndicator: b, loadingPosition: x = "center", size: S = "medium", startIcon: C, type: w, variant: T = "text", ...E } = s, D = Po(v), O = b ?? /*#__PURE__*/ e(fc, {
		"aria-labelledby": D,
		color: "inherit",
		size: 16
	}), k = {
		...s,
		color: l,
		component: u,
		disabled: f,
		disableElevation: p,
		disableFocusRipple: m,
		fullWidth: _,
		loading: y,
		loadingIndicator: O,
		loadingPosition: x,
		size: S,
		type: w,
		variant: T
	}, A = Wd(k), j = (C || y && x === "start") && /*#__PURE__*/ e(qd, {
		className: A.startIcon,
		ownerState: k,
		children: C || /*#__PURE__*/ e(Xd, {
			className: A.loadingIconPlaceholder,
			ownerState: k
		})
	}), M = (h || y && x === "end") && /*#__PURE__*/ e(Jd, {
		className: A.endIcon,
		ownerState: k,
		children: h || /*#__PURE__*/ e(Xd, {
			className: A.loadingIconPlaceholder,
			ownerState: k
		})
	}), N = o || "", P = typeof y == "boolean" ? /*#__PURE__*/ e("span", {
		className: A.loadingWrapper,
		style: { display: "contents" },
		children: y && /*#__PURE__*/ e(Yd, {
			className: A.loadingIndicator,
			ownerState: k,
			children: O
		})
	}) : null, { root: F, ...ee } = A;
	return /*#__PURE__*/ t(Kd, {
		ownerState: k,
		className: U(a.className, A.root, d, N),
		component: u,
		disabled: f || y,
		focusRipple: !m,
		focusVisibleClassName: U(A.focusVisible, g),
		ref: i,
		type: w,
		id: y ? D : v,
		...E,
		classes: ee,
		children: [
			j,
			x !== "end" && P,
			c,
			x === "end" && P,
			M
		]
	});
});
//#endregion
//#region node_modules/@mui/material/esm/internal/switchBaseClasses.js
function Qd(e) {
	return W("PrivateSwitchBase", e);
}
G("PrivateSwitchBase", [
	"root",
	"checked",
	"disabled",
	"input",
	"edgeStart",
	"edgeEnd"
]);
//#endregion
//#region node_modules/@mui/material/esm/internal/SwitchBase.js
var $d = (e) => {
	let { classes: t, checked: n, disabled: r, edge: i } = e;
	return K({
		root: [
			"root",
			n && "checked",
			r && "disabled",
			i && `edge${Y(i)}`
		],
		input: ["input"]
	}, Qd, t);
}, ef = J(Js, { name: "MuiSwitchBase" })({
	padding: 9,
	borderRadius: "50%",
	variants: [
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: ({ edge: e, ownerState: t }) => e === "start" && t.size !== "small",
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		},
		{
			props: ({ edge: e, ownerState: t }) => e === "end" && t.size !== "small",
			style: { marginRight: -12 }
		}
	]
}), tf = J("input", {
	name: "MuiSwitchBase",
	shouldForwardProp: so
})({
	cursor: "inherit",
	position: "absolute",
	opacity: 0,
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	margin: 0,
	padding: 0,
	zIndex: 1
}), nf = /*#__PURE__*/ n.forwardRef(function(n, r) {
	let { autoFocus: i, checked: a, checkedIcon: o, defaultChecked: s, disabled: c, disableFocusRipple: l = !1, edge: u = !1, icon: d, id: f, inputProps: p, inputRef: m, name: h, onBlur: g, onChange: _, onFocus: v, readOnly: y, required: b = !1, tabIndex: x, type: S, value: C, slots: w = {}, slotProps: T = {}, ...E } = n, [D, O] = Io({
		controlled: a,
		default: !!s,
		name: "SwitchBase",
		state: "checked"
	}), k = sd(), A = (e) => {
		v && v(e), k && k.onFocus && k.onFocus(e);
	}, j = (e) => {
		g && g(e), k && k.onBlur && k.onBlur(e);
	}, M = (e) => {
		if (e.nativeEvent.defaultPrevented || y) return;
		let t = e.target.checked;
		O(t), _ && _(e, t);
	}, N = c;
	k && N === void 0 && (N = k.disabled);
	let P = S === "checkbox" || S === "radio", F = {
		...n,
		checked: D,
		disabled: N,
		disableFocusRipple: l,
		edge: u
	}, ee = $d(F), I = {
		slots: w,
		slotProps: {
			input: p,
			...T
		}
	}, [te, L] = Q("root", {
		ref: r,
		elementType: ef,
		className: ee.root,
		shouldForwardComponentProp: !0,
		externalForwardedProps: {
			...I,
			component: "span",
			...E
		},
		getSlotProps: (e) => ({
			...e,
			onFocus: (t) => {
				e.onFocus?.(t), A(t);
			},
			onBlur: (t) => {
				e.onBlur?.(t), j(t);
			}
		}),
		ownerState: F,
		additionalProps: {
			centerRipple: !0,
			focusRipple: !l,
			role: void 0,
			tabIndex: null
		}
	}), [ne, re] = Q("input", {
		ref: m,
		elementType: tf,
		className: ee.input,
		externalForwardedProps: I,
		getSlotProps: (e) => ({
			...e,
			onChange: (t) => {
				e.onChange?.(t), M(t);
			}
		}),
		ownerState: F,
		additionalProps: {
			autoFocus: i,
			checked: a,
			defaultChecked: s,
			disabled: N,
			id: P ? f : void 0,
			name: h,
			readOnly: y,
			required: b,
			tabIndex: x,
			type: S,
			...S === "checkbox" && C === void 0 ? {} : { value: C }
		}
	});
	return /*#__PURE__*/ t(te, {
		...L,
		children: [/*#__PURE__*/ e(ne, { ...re }), D ? o : d]
	});
}), rf = wo(/*#__PURE__*/ e("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }), "CheckBoxOutlineBlank"), af = wo(/*#__PURE__*/ e("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }), "CheckBox"), of = wo(/*#__PURE__*/ e("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" }), "IndeterminateCheckBox");
//#endregion
//#region node_modules/@mui/material/esm/Checkbox/checkboxClasses.js
function sf(e) {
	return W("MuiCheckbox", e);
}
var cf = G("MuiCheckbox", [
	"root",
	"checked",
	"disabled",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"sizeSmall",
	"sizeMedium"
]), lf = (e) => {
	let { classes: t, indeterminate: n, color: r, size: i } = e, a = K({ root: [
		"root",
		n && "indeterminate",
		`color${Y(r)}`,
		`size${Y(i)}`
	] }, sf, t);
	return {
		...t,
		...a
	};
}, uf = J(nf, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiCheckbox",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.indeterminate && t.indeterminate,
			t[`size${Y(n.size)}`],
			n.color !== "default" && t[`color${Y(n.color)}`]
		];
	}
})(X(({ theme: e }) => ({
	color: (e.vars || e).palette.text.secondary,
	variants: [
		{
			props: {
				color: "default",
				disableRipple: !1
			},
			style: { "&:hover": { backgroundColor: e.alpha((e.vars || e).palette.action.active, (e.vars || e).palette.action.hoverOpacity) } }
		},
		...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
			props: {
				color: t,
				disableRipple: !1
			},
			style: { "&:hover": { backgroundColor: e.alpha((e.vars || e).palette[t].main, (e.vars || e).palette.action.hoverOpacity) } }
		})),
		...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
			props: { color: t },
			style: {
				[`&.${cf.checked}, &.${cf.indeterminate}`]: { color: (e.vars || e).palette[t].main },
				[`&.${cf.disabled}`]: { color: (e.vars || e).palette.action.disabled }
			}
		})),
		{
			props: { disableRipple: !1 },
			style: { "&:hover": { "@media (hover: none)": { backgroundColor: "transparent" } } }
		}
	]
}))), df = /*#__PURE__*/ e(af, {}), ff = /*#__PURE__*/ e(rf, {}), pf = /*#__PURE__*/ e(of, {}), mf = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiCheckbox"
	}), { checkedIcon: a = df, color: o = "primary", icon: s = ff, indeterminate: c = !1, indeterminateIcon: l = pf, inputProps: u, size: d = "medium", disableRipple: f = !1, className: p, slots: m = {}, slotProps: h = {}, ...g } = i, _ = c ? l : s, v = c ? l : a, y = {
		...i,
		disableRipple: f,
		color: o,
		indeterminate: c,
		size: d
	}, b = lf(y), x = h.input ?? u, [S, C] = Q("root", {
		ref: r,
		elementType: uf,
		className: U(b.root, p),
		shouldForwardComponentProp: !0,
		externalForwardedProps: {
			slots: m,
			slotProps: h,
			...g
		},
		ownerState: y,
		additionalProps: {
			type: "checkbox",
			icon: /*#__PURE__*/ n.cloneElement(_, { fontSize: _.props.fontSize ?? d }),
			checkedIcon: /*#__PURE__*/ n.cloneElement(v, { fontSize: v.props.fontSize ?? d }),
			disableRipple: f,
			slots: m,
			slotProps: { input: Ho(typeof x == "function" ? x(y) : x, {
				"data-indeterminate": c,
				"aria-checked": c ? "mixed" : void 0
			}) }
		}
	});
	return /*#__PURE__*/ e(S, {
		...C,
		classes: b
	});
});
//#endregion
//#region node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
function hf(e = window) {
	let t = e.document.documentElement.clientWidth;
	return e.innerWidth - t;
}
//#endregion
//#region node_modules/@mui/material/esm/Modal/ModalManager.js
function gf(e) {
	let t = Oo(e);
	return t.body === e ? Ao(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function _f(e, t) {
	t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function vf(e) {
	return parseFloat(Ao(e).getComputedStyle(e).paddingRight) || 0;
}
function yf(e) {
	let t = [
		"TEMPLATE",
		"SCRIPT",
		"STYLE",
		"LINK",
		"MAP",
		"META",
		"NOSCRIPT",
		"PICTURE",
		"COL",
		"COLGROUP",
		"PARAM",
		"SLOT",
		"SOURCE",
		"TRACK"
	].includes(e.tagName), n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
	return t || n;
}
function bf(e, t, n, r, i) {
	let a = [
		t,
		n,
		...r
	];
	[].forEach.call(e.children, (e) => {
		let t = !a.includes(e), n = !yf(e);
		t && n && _f(e, i);
	});
}
function xf(e, t) {
	let n = -1;
	return e.some((e, r) => t(e) ? (n = r, !0) : !1), n;
}
function Sf(e, t) {
	let n = [], r = e.container;
	if (!t.disableScrollLock) {
		if (gf(r)) {
			let e = hf(Ao(r));
			n.push({
				value: r.style.paddingRight,
				property: "padding-right",
				el: r
			}), r.style.paddingRight = `${vf(r) + e}px`;
			let t = Oo(r).querySelectorAll(".mui-fixed");
			[].forEach.call(t, (t) => {
				n.push({
					value: t.style.paddingRight,
					property: "padding-right",
					el: t
				}), t.style.paddingRight = `${vf(t) + e}px`;
			});
		}
		let e;
		if (r.parentNode instanceof DocumentFragment) e = Oo(r).body;
		else {
			let t = r.parentElement, n = Ao(r);
			e = t?.nodeName === "HTML" && n.getComputedStyle(t).overflowY === "scroll" ? t : r;
		}
		n.push({
			value: e.style.overflow,
			property: "overflow",
			el: e
		}, {
			value: e.style.overflowX,
			property: "overflow-x",
			el: e
		}, {
			value: e.style.overflowY,
			property: "overflow-y",
			el: e
		}), e.style.overflow = "hidden";
	}
	return () => {
		n.forEach(({ value: e, el: t, property: n }) => {
			e ? t.style.setProperty(n, e) : t.style.removeProperty(n);
		});
	};
}
function Cf(e) {
	let t = [];
	return [].forEach.call(e.children, (e) => {
		e.getAttribute("aria-hidden") === "true" && t.push(e);
	}), t;
}
var wf = class {
	constructor() {
		this.modals = [], this.containers = [];
	}
	add(e, t) {
		let n = this.modals.indexOf(e);
		if (n !== -1) return n;
		n = this.modals.length, this.modals.push(e), e.modalRef && _f(e.modalRef, !1);
		let r = Cf(t);
		bf(t, e.mount, e.modalRef, r, !0);
		let i = xf(this.containers, (e) => e.container === t);
		return i === -1 ? (this.containers.push({
			modals: [e],
			container: t,
			restore: null,
			hiddenSiblings: r
		}), n) : (this.containers[i].modals.push(e), n);
	}
	mount(e, t) {
		let n = xf(this.containers, (t) => t.modals.includes(e)), r = this.containers[n];
		r.restore ||= Sf(r, t);
	}
	remove(e, t = !0) {
		let n = this.modals.indexOf(e);
		if (n === -1) return n;
		let r = xf(this.containers, (t) => t.modals.includes(e)), i = this.containers[r];
		if (i.modals.splice(i.modals.indexOf(e), 1), this.modals.splice(n, 1), i.modals.length === 0) i.restore && i.restore(), e.modalRef && _f(e.modalRef, t), bf(i.container, e.mount, e.modalRef, i.hiddenSiblings, !1), this.containers.splice(r, 1);
		else {
			let e = i.modals[i.modals.length - 1];
			e.modalRef && _f(e.modalRef, !1);
		}
		return n;
	}
	isTopModal(e) {
		return this.modals.length > 0 && this.modals[this.modals.length - 1] === e;
	}
}, Tf = Rc, Ef = "data-mui-focusable";
function Df(e) {
	return e ? e.hasAttribute("data-mui-focusable") ? e : e.querySelector(`[${Ef}]`) : null;
}
//#endregion
//#region node_modules/@mui/material/esm/Unstable_TrapFocus/FocusTrap.js
var Of = [
	"input",
	"select",
	"textarea",
	"a[href]",
	"button",
	"[tabindex]",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable=\"false\"])"
].join(",");
function kf(e) {
	let t = parseInt(e.getAttribute("tabindex") || "", 10);
	return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Af(e) {
	if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name) return !1;
	let t = (t) => e.ownerDocument.querySelector(`input[type="radio"]${t}`), n = t(`[name="${e.name}"]:checked`);
	return n ||= t(`[name="${e.name}"]`), n !== e;
}
function jf(e) {
	return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Af(e));
}
function Mf(e) {
	let t = [], n = [];
	return Array.from(e.querySelectorAll(Of)).forEach((e, r) => {
		let i = kf(e);
		i === -1 || !jf(e) || (i === 0 ? t.push(e) : n.push({
			documentOrder: r,
			tabIndex: i,
			node: e
		}));
	}), n.sort((e, t) => e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex).map((e) => e.node).concat(t);
}
function Nf() {
	return !0;
}
function Pf(r) {
	let { children: i, disableAutoFocus: a = !1, disableEnforceFocus: o = !1, disableRestoreFocus: s = !1, getTabbable: c = Mf, isEnabled: l = Nf, open: u } = r, d = n.useRef(!1), f = n.useRef(null), p = n.useRef(null), m = n.useRef(null), h = n.useRef(null), g = n.useRef(!1), _ = n.useRef(null), v = zo(Pu(i), _), y = n.useRef(null);
	n.useEffect(() => {
		!u || !_.current || (g.current = !a);
	}, [a, u]), n.useEffect(() => {
		if (d.current = !1, !u || !_.current) return;
		let e = ld(Oo(_.current)), t = Df(_.current) ?? _.current;
		return Tf(_.current, e) || (t.hasAttribute("tabIndex") || t.setAttribute("tabIndex", "-1"), g.current && t.focus()), () => {
			s || (m.current && m.current.focus && (d.current = !0, m.current.focus()), m.current = null);
		};
	}, [u]), n.useEffect(() => {
		if (!u || !_.current) return;
		let e = Oo(_.current), t = (t) => {
			y.current = t, !(o || !l() || t.key !== "Tab") && ld(e) === _.current && t.shiftKey && (d.current = !0, p.current && p.current.focus());
		}, n = () => {
			let t = _.current;
			if (t === null) return;
			let n = ld(e);
			if (!e.hasFocus() || !l() || d.current) {
				d.current = !1;
				return;
			}
			if (Tf(t, n) || o && n !== f.current && n !== p.current) return;
			if (n !== h.current) h.current = null;
			else if (h.current !== null) return;
			if (!g.current) return;
			let r = [];
			if ((n === f.current || n === p.current) && (r = c(_.current)), r.length > 0) {
				let e = !!(y.current?.shiftKey && y.current?.key === "Tab"), t = r[0], n = r[r.length - 1];
				typeof t != "string" && typeof n != "string" && (e ? n.focus() : t.focus());
			} else t.focus();
		};
		e.addEventListener("focusin", n), e.addEventListener("keydown", t, !0);
		let r = setInterval(() => {
			let t = ld(e);
			t && t.tagName === "BODY" && n();
		}, 50);
		return () => {
			clearInterval(r), e.removeEventListener("focusin", n), e.removeEventListener("keydown", t, !0);
		};
	}, [
		a,
		o,
		s,
		l,
		u,
		c
	]);
	let b = (e) => {
		m.current === null && (m.current = e.relatedTarget), g.current = !0, h.current = e.target;
		let t = i.props.onFocus;
		t && t(e);
	}, x = (e) => {
		m.current === null && (m.current = e.relatedTarget), g.current = !0;
	};
	return /*#__PURE__*/ t(n.Fragment, { children: [
		/*#__PURE__*/ e("div", {
			tabIndex: u ? 0 : -1,
			onFocus: x,
			ref: f,
			"data-testid": "sentinelStart"
		}),
		/*#__PURE__*/ n.cloneElement(i, {
			ref: v,
			onFocus: b
		}),
		/*#__PURE__*/ e("div", {
			tabIndex: u ? 0 : -1,
			onFocus: x,
			ref: p,
			"data-testid": "sentinelEnd"
		})
	] });
}
//#endregion
//#region node_modules/@mui/material/esm/Modal/useModal.js
function Ff(e) {
	return typeof e == "function" ? e() : e;
}
function If(e) {
	return e ? e.props.hasOwnProperty("in") : !1;
}
var Lf = () => {}, Rf = new wf();
function zf(e) {
	let { container: t, disableEscapeKeyDown: r = !1, disableScrollLock: i = !1, closeAfterTransition: a = !1, onTransitionEnter: o, onTransitionExited: s, children: c, onClose: l, open: u, rootRef: d } = e, f = n.useRef({}), p = n.useRef(null), m = n.useRef(null), h = zo(m, d), [g, _] = n.useState(!u), v = If(c), y = !0;
	(e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
	let b = () => Oo(p.current), x = () => (f.current.modalRef = m.current, f.current.mount = p.current, f.current), S = () => {
		Rf.mount(x(), { disableScrollLock: i }), m.current && (m.current.scrollTop = 0);
	}, C = Lo(() => {
		let e = Ff(t) || b().body;
		Rf.add(x(), e), m.current && S();
	}), w = () => Rf.isTopModal(x()), T = Lo((e) => {
		p.current = e, e && (u && w() ? S() : m.current && _f(m.current, y));
	}), E = n.useCallback(() => {
		Rf.remove(x(), y);
	}, [y]);
	n.useEffect(() => () => {
		E();
	}, [E]), n.useEffect(() => {
		u ? C() : (!v || !a) && E();
	}, [
		u,
		E,
		v,
		a,
		C
	]);
	let D = (e) => (t) => {
		e.onKeyDown?.(t), !(t.key !== "Escape" || t.which === 229 || !w()) && (r || (t.stopPropagation(), l && l(t, "escapeKeyDown")));
	}, O = (e) => (t) => {
		e.onClick?.(t), t.target === t.currentTarget && l && l(t, "backdropClick");
	};
	return {
		getRootProps: (t = {}) => {
			let n = ws(e);
			delete n.onTransitionEnter, delete n.onTransitionExited;
			let r = {
				...n,
				...t
			};
			return {
				role: "presentation",
				...r,
				onKeyDown: D(r),
				ref: h
			};
		},
		getBackdropProps: (e = {}) => {
			let t = e;
			return {
				"aria-hidden": !0,
				...t,
				onClick: O(t),
				open: u
			};
		},
		getTransitionProps: () => ({
			onEnter: go(() => {
				_(!1), o && o();
			}, c?.props.onEnter ?? Lf),
			onExited: go(() => {
				_(!0), s && s(), a && E();
			}, c?.props.onExited ?? Lf)
		}),
		rootRef: h,
		portalRef: T,
		isTopModal: w,
		exited: g,
		hasTransition: v
	};
}
//#endregion
//#region node_modules/@mui/material/esm/Modal/modalClasses.js
function Bf(e) {
	return W("MuiModal", e);
}
G("MuiModal", [
	"root",
	"hidden",
	"backdrop"
]);
//#endregion
//#region node_modules/@mui/material/esm/Modal/Modal.js
var Vf = (e) => {
	let { open: t, exited: n, classes: r } = e;
	return K({
		root: ["root", !t && n && "hidden"],
		backdrop: ["backdrop"]
	}, Bf, r);
}, Hf = J("div", {
	name: "MuiModal",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, !n.open && n.exited && t.hidden];
	}
})(X(({ theme: e }) => ({
	position: "fixed",
	zIndex: (e.vars || e).zIndex.modal,
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	variants: [{
		props: ({ ownerState: e }) => !e.open && e.exited,
		style: { visibility: "hidden" }
	}]
}))), Uf = J(Rd, {
	name: "MuiModal",
	slot: "Backdrop"
})({ zIndex: -1 }), Wf = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		name: "MuiModal",
		props: r
	}), { BackdropComponent: o = Uf, BackdropProps: s, classes: c, className: l, closeAfterTransition: u = !1, children: d, container: f, component: p, components: m = {}, componentsProps: h = {}, disableAutoFocus: g = !1, disableEnforceFocus: _ = !1, disableEscapeKeyDown: v = !1, disablePortal: y = !1, disableRestoreFocus: b = !1, disableScrollLock: x = !1, hideBackdrop: S = !1, keepMounted: C = !1, onClose: w, onTransitionEnter: T, onTransitionExited: E, open: D, slotProps: O = {}, slots: k = {}, theme: A, ...j } = a, M = {
		...a,
		closeAfterTransition: u,
		disableAutoFocus: g,
		disableEnforceFocus: _,
		disableEscapeKeyDown: v,
		disablePortal: y,
		disableRestoreFocus: b,
		disableScrollLock: x,
		hideBackdrop: S,
		keepMounted: C
	}, { getRootProps: N, getBackdropProps: P, getTransitionProps: F, portalRef: ee, isTopModal: I, exited: te, hasTransition: L } = zf({
		...M,
		rootRef: i
	}), ne = {
		...M,
		exited: te
	}, re = Vf(ne), R = {};
	if (d.props.tabIndex === void 0 && (R.tabIndex = "-1"), L) {
		let { onEnter: e, onExited: t } = F();
		R.onEnter = e, R.onExited = t;
	}
	let ie = {
		slots: {
			root: m.Root,
			backdrop: m.Backdrop,
			...k
		},
		slotProps: {
			...h,
			...O
		}
	}, [z, ae] = Q("root", {
		ref: i,
		elementType: Hf,
		externalForwardedProps: {
			...ie,
			...j,
			component: p
		},
		getSlotProps: N,
		ownerState: ne,
		className: U(l, re?.root, !ne.open && ne.exited && re?.hidden)
	}), [oe, se] = Q("backdrop", {
		ref: s?.ref,
		elementType: o,
		externalForwardedProps: ie,
		shouldForwardComponentProp: !0,
		additionalProps: s,
		getSlotProps: (e) => P({
			...e,
			onClick: (t) => {
				e?.onClick && e.onClick(t);
			}
		}),
		className: U(s?.className, re?.backdrop),
		ownerState: ne
	});
	return !C && !D && (!L || te) ? null : /*#__PURE__*/ e(Iu, {
		ref: ee,
		container: f,
		disablePortal: y,
		children: /*#__PURE__*/ t(z, {
			...ae,
			children: [!S && o ? /*#__PURE__*/ e(oe, { ...se }) : null, /*#__PURE__*/ e(Pf, {
				disableEnforceFocus: _,
				disableAutoFocus: g,
				disableRestoreFocus: b,
				isEnabled: I,
				open: D,
				children: /*#__PURE__*/ n.cloneElement(d, R)
			})]
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Dialog/dialogClasses.js
function Gf(e) {
	return W("MuiDialog", e);
}
var Kf = G("MuiDialog", [
	"root",
	"backdrop",
	"scrollPaper",
	"scrollBody",
	"container",
	"paper",
	"paperScrollPaper",
	"paperScrollBody",
	"paperWidthFalse",
	"paperWidthXs",
	"paperWidthSm",
	"paperWidthMd",
	"paperWidthLg",
	"paperWidthXl",
	"paperFullWidth",
	"paperFullScreen"
]), qf = /*#__PURE__*/ n.createContext({}), Jf = J(Rd, {
	name: "MuiDialog",
	slot: "Backdrop"
})({ zIndex: -1 }), Yf = (e) => {
	let { classes: t, scroll: n, maxWidth: r, fullWidth: i, fullScreen: a } = e;
	return K({
		root: ["root"],
		backdrop: ["backdrop"],
		container: ["container", `scroll${Y(n)}`],
		paper: [
			"paper",
			`paperScroll${Y(n)}`,
			`paperWidth${Y(String(r))}`,
			i && "paperFullWidth",
			a && "paperFullScreen"
		]
	}, Gf, t);
}, Xf = J(Wf, {
	name: "MuiDialog",
	slot: "Root"
})({ "@media print": { position: "absolute !important" } }), Zf = J("div", {
	name: "MuiDialog",
	slot: "Container",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.container, t[`scroll${Y(n.scroll)}`]];
	}
})({
	height: "100%",
	"@media print": { height: "auto" },
	outline: 0,
	variants: [{
		props: { scroll: "paper" },
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}
	}, {
		props: { scroll: "body" },
		style: {
			overflowY: "auto",
			overflowX: "hidden",
			textAlign: "center",
			"&::after": {
				content: "\"\"",
				display: "inline-block",
				verticalAlign: "middle",
				height: "100%",
				width: "0"
			}
		}
	}]
}), Qf = J(As, {
	name: "MuiDialog",
	slot: "Paper",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.paper,
			t[`scrollPaper${Y(n.scroll)}`],
			t[`paperWidth${Y(String(n.maxWidth))}`],
			n.fullWidth && t.paperFullWidth,
			n.fullScreen && t.paperFullScreen
		];
	}
})(X(({ theme: e }) => ({
	margin: 32,
	position: "relative",
	overflowY: "auto",
	"@media print": {
		overflowY: "visible",
		boxShadow: "none"
	},
	variants: [
		{
			props: { scroll: "paper" },
			style: {
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100% - 64px)"
			}
		},
		{
			props: { scroll: "body" },
			style: {
				display: "inline-block",
				verticalAlign: "middle",
				textAlign: "initial"
			}
		},
		{
			props: ({ ownerState: e }) => !e.maxWidth,
			style: { maxWidth: "calc(100% - 64px)" }
		},
		{
			props: { maxWidth: "xs" },
			style: {
				maxWidth: e.breakpoints.unit === "px" ? Math.max(e.breakpoints.values.xs, 444) : `max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,
				[`&.${Kf.paperScrollBody}`]: { [e.breakpoints.down(Math.max(e.breakpoints.values.xs, 444) + 64)]: { maxWidth: "calc(100% - 64px)" } }
			}
		},
		...Object.keys(e.breakpoints.values).filter((e) => e !== "xs").map((t) => ({
			props: { maxWidth: t },
			style: {
				maxWidth: `${e.breakpoints.values[t]}${e.breakpoints.unit}`,
				[`&.${Kf.paperScrollBody}`]: { [e.breakpoints.down(e.breakpoints.values[t] + 64)]: { maxWidth: "calc(100% - 64px)" } }
			}
		})),
		{
			props: ({ ownerState: e }) => e.fullWidth,
			style: { width: "calc(100% - 64px)" }
		},
		{
			props: ({ ownerState: e }) => e.fullScreen,
			style: {
				margin: 0,
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "none",
				borderRadius: 0,
				[`&.${Kf.paperScrollBody}`]: {
					margin: 0,
					maxWidth: "100%"
				}
			}
		}
	]
}))), $f = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiDialog"
	}), a = ao(), o = {
		enter: a.transitions.duration.enteringScreen,
		exit: a.transitions.duration.leavingScreen
	}, { "aria-describedby": s, "aria-labelledby": c, "aria-modal": l = !0, BackdropComponent: u, BackdropProps: d, children: f, className: p, disableEscapeKeyDown: m = !1, fullScreen: h = !1, fullWidth: g = !1, maxWidth: _ = "sm", onClick: v, onClose: y, open: b, PaperComponent: x = As, PaperProps: S = {}, role: C = "dialog", scroll: w = "paper", slots: T = {}, slotProps: E = {}, TransitionComponent: D = Pd, transitionDuration: O = o, TransitionProps: k, ...A } = i, j = {
		...i,
		disableEscapeKeyDown: m,
		fullScreen: h,
		fullWidth: g,
		maxWidth: _,
		scroll: w
	}, M = Yf(j), N = n.useRef(), P = (e) => {
		N.current = e.target === e.currentTarget;
	}, F = (e) => {
		v && v(e), N.current && (N.current = null, y && y(e, "backdropClick"));
	}, ee = ki(c), I = n.useMemo(() => ({ titleId: ee }), [ee]), te = {
		slots: {
			transition: D,
			...T
		},
		slotProps: {
			transition: k,
			paper: S,
			backdrop: d,
			...E
		}
	}, [L, ne] = Q("root", {
		elementType: Xf,
		shouldForwardComponentProp: !0,
		externalForwardedProps: te,
		ownerState: j,
		className: U(M.root, p),
		ref: r
	}), [re, R] = Q("backdrop", {
		elementType: Jf,
		shouldForwardComponentProp: !0,
		externalForwardedProps: te,
		ownerState: j,
		className: M.backdrop
	}), [ie, z] = Q("paper", {
		elementType: Qf,
		shouldForwardComponentProp: !0,
		externalForwardedProps: te,
		ownerState: j,
		className: M.paper,
		additionalProps: {
			elevation: 24,
			role: C,
			"aria-describedby": s,
			"aria-labelledby": ee,
			"aria-modal": l,
			tabIndex: -1,
			[Ef]: ""
		}
	}), [ae, oe] = Q("container", {
		elementType: Zf,
		externalForwardedProps: te,
		ownerState: j,
		className: M.container
	}), [se, ce] = Q("transition", {
		elementType: Pd,
		externalForwardedProps: te,
		ownerState: j,
		additionalProps: {
			appear: !0,
			in: b,
			timeout: O,
			role: "presentation"
		}
	});
	return /*#__PURE__*/ e(L, {
		closeAfterTransition: !0,
		slots: { backdrop: re },
		slotProps: { backdrop: {
			transitionDuration: O,
			as: u,
			...R
		} },
		disableEscapeKeyDown: m,
		onClose: y,
		open: b,
		onClick: F,
		...ne,
		...A,
		children: /*#__PURE__*/ e(se, {
			...ce,
			children: /*#__PURE__*/ e(ae, {
				onMouseDown: P,
				...oe,
				children: /*#__PURE__*/ e(ie, {
					as: x,
					...z,
					children: /*#__PURE__*/ e(qf.Provider, {
						value: I,
						children: f
					})
				})
			})
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/DialogActions/dialogActionsClasses.js
function ep(e) {
	return W("MuiDialogActions", e);
}
G("MuiDialogActions", ["root", "spacing"]);
//#endregion
//#region node_modules/@mui/material/esm/DialogActions/DialogActions.js
var tp = (e) => {
	let { classes: t, disableSpacing: n } = e;
	return K({ root: ["root", !n && "spacing"] }, ep, t);
}, np = J("div", {
	name: "MuiDialogActions",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, !n.disableSpacing && t.spacing];
	}
})({
	display: "flex",
	alignItems: "center",
	padding: 8,
	justifyContent: "flex-end",
	flex: "0 0 auto",
	variants: [{
		props: ({ ownerState: e }) => !e.disableSpacing,
		style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } }
	}]
}), rp = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiDialogActions"
	}), { className: i, disableSpacing: a = !1, ...o } = r, s = {
		...r,
		disableSpacing: a
	}, c = tp(s);
	return /*#__PURE__*/ e(np, {
		className: U(c.root, i),
		ownerState: s,
		ref: n,
		...o
	});
});
//#endregion
//#region node_modules/@mui/material/esm/DialogContent/dialogContentClasses.js
function ip(e) {
	return W("MuiDialogContent", e);
}
G("MuiDialogContent", ["root", "dividers"]);
//#endregion
//#region node_modules/@mui/material/esm/DialogTitle/dialogTitleClasses.js
function ap(e) {
	return W("MuiDialogTitle", e);
}
var op = G("MuiDialogTitle", ["root"]), sp = (e) => {
	let { classes: t, dividers: n } = e;
	return K({ root: ["root", n && "dividers"] }, ip, t);
}, cp = J("div", {
	name: "MuiDialogContent",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, n.dividers && t.dividers];
	}
})(X(({ theme: e }) => ({
	flex: "1 1 auto",
	WebkitOverflowScrolling: "touch",
	overflowY: "auto",
	padding: "20px 24px",
	variants: [{
		props: ({ ownerState: e }) => e.dividers,
		style: {
			padding: "16px 24px",
			borderTop: `1px solid ${(e.vars || e).palette.divider}`,
			borderBottom: `1px solid ${(e.vars || e).palette.divider}`
		}
	}, {
		props: ({ ownerState: e }) => !e.dividers,
		style: { [`.${op.root} + &`]: { paddingTop: 0 } }
	}]
}))), lp = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiDialogContent"
	}), { className: i, dividers: a = !1, ...o } = r, s = {
		...r,
		dividers: a
	}, c = sp(s);
	return /*#__PURE__*/ e(cp, {
		className: U(c.root, i),
		ownerState: s,
		ref: n,
		...o
	});
}), up = (e) => {
	let { classes: t } = e;
	return K({ root: ["root"] }, ap, t);
}, dp = J(Lc, {
	name: "MuiDialogTitle",
	slot: "Root"
})({
	padding: "16px 24px",
	flex: "0 0 auto"
}), fp = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiDialogTitle"
	}), { className: a, id: o, ...s } = i, c = i, l = up(c), { titleId: u = o } = n.useContext(qf);
	return /*#__PURE__*/ e(dp, {
		component: "h2",
		className: U(l.root, a),
		ownerState: c,
		ref: r,
		variant: "h6",
		id: o ?? u,
		...s
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Divider/dividerClasses.js
function pp(e) {
	return W("MuiDivider", e);
}
G("MuiDivider", [
	"root",
	"absolute",
	"fullWidth",
	"inset",
	"middle",
	"flexItem",
	"light",
	"vertical",
	"withChildren",
	"withChildrenVertical",
	"textAlignRight",
	"textAlignLeft",
	"wrapper",
	"wrapperVertical"
]);
//#endregion
//#region node_modules/@mui/material/esm/Divider/Divider.js
var mp = (e) => {
	let { absolute: t, children: n, classes: r, flexItem: i, light: a, orientation: o, textAlign: s, variant: c } = e;
	return K({
		root: [
			"root",
			t && "absolute",
			c,
			a && "light",
			o === "vertical" && "vertical",
			i && "flexItem",
			n && "withChildren",
			n && o === "vertical" && "withChildrenVertical",
			s === "right" && o !== "vertical" && "textAlignRight",
			s === "left" && o !== "vertical" && "textAlignLeft"
		],
		wrapper: ["wrapper", o === "vertical" && "wrapperVertical"]
	}, pp, r);
}, hp = J("div", {
	name: "MuiDivider",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.absolute && t.absolute,
			t[n.variant],
			n.light && t.light,
			n.orientation === "vertical" && t.vertical,
			n.flexItem && t.flexItem,
			n.children && t.withChildren,
			n.children && n.orientation === "vertical" && t.withChildrenVertical,
			n.textAlign === "right" && n.orientation !== "vertical" && t.textAlignRight,
			n.textAlign === "left" && n.orientation !== "vertical" && t.textAlignLeft
		];
	}
})(X(({ theme: e }) => ({
	margin: 0,
	flexShrink: 0,
	borderWidth: 0,
	borderStyle: "solid",
	borderColor: (e.vars || e).palette.divider,
	borderBottomWidth: "thin",
	variants: [
		{
			props: { absolute: !0 },
			style: {
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%"
			}
		},
		{
			props: { light: !0 },
			style: { borderColor: e.alpha((e.vars || e).palette.divider, .08) }
		},
		{
			props: { variant: "inset" },
			style: { marginLeft: 72 }
		},
		{
			props: {
				variant: "middle",
				orientation: "horizontal"
			},
			style: {
				marginLeft: e.spacing(2),
				marginRight: e.spacing(2)
			}
		},
		{
			props: {
				variant: "middle",
				orientation: "vertical"
			},
			style: {
				marginTop: e.spacing(1),
				marginBottom: e.spacing(1)
			}
		},
		{
			props: { orientation: "vertical" },
			style: {
				height: "100%",
				borderBottomWidth: 0,
				borderRightWidth: "thin"
			}
		},
		{
			props: { flexItem: !0 },
			style: {
				alignSelf: "stretch",
				height: "auto"
			}
		},
		{
			props: ({ ownerState: e }) => !!e.children,
			style: {
				display: "flex",
				textAlign: "center",
				border: 0,
				borderTopStyle: "solid",
				borderLeftStyle: "solid",
				"&::before, &::after": {
					content: "\"\"",
					alignSelf: "center"
				}
			}
		},
		{
			props: ({ ownerState: e }) => e.children && e.orientation !== "vertical",
			style: { "&::before, &::after": {
				width: "100%",
				borderTop: `thin solid ${(e.vars || e).palette.divider}`,
				borderTopStyle: "inherit"
			} }
		},
		{
			props: ({ ownerState: e }) => e.orientation === "vertical" && e.children,
			style: {
				flexDirection: "column",
				"&::before, &::after": {
					height: "100%",
					borderLeft: `thin solid ${(e.vars || e).palette.divider}`,
					borderLeftStyle: "inherit"
				}
			}
		},
		{
			props: ({ ownerState: e }) => e.textAlign === "right" && e.orientation !== "vertical",
			style: {
				"&::before": { width: "90%" },
				"&::after": { width: "10%" }
			}
		},
		{
			props: ({ ownerState: e }) => e.textAlign === "left" && e.orientation !== "vertical",
			style: {
				"&::before": { width: "10%" },
				"&::after": { width: "90%" }
			}
		}
	]
}))), gp = J("span", {
	name: "MuiDivider",
	slot: "Wrapper",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.wrapper, n.orientation === "vertical" && t.wrapperVertical];
	}
})(X(({ theme: e }) => ({
	display: "inline-block",
	paddingLeft: `calc(${e.spacing(1)} * 1.2)`,
	paddingRight: `calc(${e.spacing(1)} * 1.2)`,
	whiteSpace: "nowrap",
	variants: [{
		props: { orientation: "vertical" },
		style: {
			paddingTop: `calc(${e.spacing(1)} * 1.2)`,
			paddingBottom: `calc(${e.spacing(1)} * 1.2)`
		}
	}]
}))), _p = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiDivider"
	}), { absolute: i = !1, children: a, className: o, orientation: s = "horizontal", component: c = a || s === "vertical" ? "div" : "hr", flexItem: l = !1, light: u = !1, role: d = c === "hr" ? void 0 : "separator", textAlign: f = "center", variant: p = "fullWidth", ...m } = r, h = {
		...r,
		absolute: i,
		component: c,
		flexItem: l,
		light: u,
		orientation: s,
		role: d,
		textAlign: f,
		variant: p
	}, g = mp(h);
	return /*#__PURE__*/ e(hp, {
		as: c,
		className: U(g.root, o),
		role: d,
		ref: n,
		ownerState: h,
		"aria-orientation": d === "separator" && (c !== "hr" || s === "vertical") ? s : void 0,
		...m,
		children: a ? /*#__PURE__*/ e(gp, {
			className: g.wrapper,
			ownerState: h,
			children: a
		}) : null
	});
});
_p && (_p.muiSkipListHighlight = !0);
//#endregion
//#region node_modules/@mui/material/esm/Slide/Slide.js
var vp = { visibility: "hidden" };
function yp(e, t, n) {
	let r = n && n.getBoundingClientRect(), i = jo(t), a = t.style.transform, o = t.style.transition;
	t.style.transition = "", t.style.transform = "";
	let s = t.getBoundingClientRect(), c = i.getComputedStyle(t).getPropertyValue("transform");
	t.style.transform = a, t.style.transition = o;
	let l = 0, u = 0;
	if (c && c !== "none" && typeof c == "string") {
		let e = c.split("(")[1].split(")")[0].split(",");
		l = parseInt(e[4], 10), u = parseInt(e[5], 10);
	}
	return e === "left" ? r ? `translateX(${r.right + l - s.left}px)` : `translateX(${i.innerWidth + l - s.left}px)` : e === "right" ? r ? `translateX(-${s.right - r.left - l}px)` : `translateX(-${s.left + s.width - l}px)` : e === "up" ? r ? `translateY(${r.bottom + u - s.top}px)` : `translateY(${i.innerHeight + u - s.top}px)` : r ? `translateY(-${s.top - r.top + s.height - u}px)` : `translateY(-${s.top + s.height - u}px)`;
}
function bp(e) {
	return typeof e == "function" ? e() : e;
}
function xp(e, t, n) {
	let r = yp(e, t, bp(n));
	r && (t.style.transform = r);
}
var Sp = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = ao(), a = {
		enter: i.transitions.easing.easeOut,
		exit: i.transitions.easing.sharp
	}, o = {
		enter: i.transitions.duration.enteringScreen,
		exit: i.transitions.duration.leavingScreen
	}, { addEndListener: s, appear: c = !0, children: l, container: u, direction: d = "down", easing: f = a, in: p, onEnter: m, onEntered: h, onEntering: g, onExit: _, onExited: v, onExiting: y, style: b, timeout: x = o, ...S } = t, C = n.useRef(null), w = Bo(Pu(l), C, r), T = vs(C, (e, t) => {
		xp(d, e, u), _s(e), m && m(e, t);
	}), E = vs(C, (e, t) => {
		let n = bs({
			timeout: x,
			style: b,
			easing: f
		}, { mode: "enter" });
		e.style.transition = i.transitions.create("transform", n), e.style.transform = "none", g && g(e, t);
	}), D = vs(C, h), O = vs(C, y), k = vs(C, (e) => {
		let t = bs({
			timeout: x,
			style: b,
			easing: f
		}, { mode: "exit" });
		e.style.transition = i.transitions.create("transform", t), xp(d, e, u), _ && _(e);
	}), A = vs(C, (e) => {
		e.style.transition = "", v && v(e);
	}), j = (e) => {
		s && s(C.current, e);
	}, M = n.useCallback(() => {
		C.current && xp(d, C.current, u);
	}, [d, u]);
	return n.useEffect(() => {
		if (p || d === "down" || d === "right") return;
		let e = Eo(() => {
			C.current && xp(d, C.current, u);
		}), t = jo(C.current);
		return t.addEventListener("resize", e), () => {
			e.clear(), t.removeEventListener("resize", e);
		};
	}, [
		d,
		p,
		u
	]), n.useEffect(() => {
		p || M();
	}, [p, M]), /*#__PURE__*/ e(es, {
		nodeRef: C,
		onEnter: T,
		onEntered: D,
		onEntering: E,
		onExit: k,
		onExited: A,
		onExiting: O,
		addEndListener: j,
		appear: c,
		in: p,
		timeout: x,
		...S,
		children: (e, { ownerState: t, ...r }) => {
			let i;
			return i = e === "exited" && !p ? b || l.props.style ? {
				visibility: "hidden",
				...b,
				...l.props.style
			} : vp : b && l.props.style ? {
				...b,
				...l.props.style
			} : b || l.props.style, /*#__PURE__*/ n.cloneElement(l, {
				ref: w,
				style: i,
				...r
			});
		}
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Drawer/drawerClasses.js
function Cp(e) {
	return W("MuiDrawer", e);
}
G("MuiDrawer", [
	"root",
	"docked",
	"paper",
	"anchorLeft",
	"anchorRight",
	"anchorTop",
	"anchorBottom",
	"paperAnchorLeft",
	"paperAnchorRight",
	"paperAnchorTop",
	"paperAnchorBottom",
	"paperAnchorDockedLeft",
	"paperAnchorDockedRight",
	"paperAnchorDockedTop",
	"paperAnchorDockedBottom",
	"modal"
]);
//#endregion
//#region node_modules/@mui/material/esm/Drawer/Drawer.js
var wp = (e, t) => {
	let { ownerState: n } = e;
	return [
		t.root,
		(n.variant === "permanent" || n.variant === "persistent") && t.docked,
		n.variant === "temporary" && t.modal
	];
}, Tp = (e) => {
	let { classes: t, anchor: n, variant: r } = e;
	return K({
		root: ["root", `anchor${Y(n)}`],
		docked: [(r === "permanent" || r === "persistent") && "docked"],
		modal: ["modal"],
		paper: [
			"paper",
			`paperAnchor${Y(n)}`,
			r !== "temporary" && `paperAnchorDocked${Y(n)}`
		]
	}, Cp, t);
}, Ep = J(Wf, {
	name: "MuiDrawer",
	slot: "Root",
	overridesResolver: wp
})(X(({ theme: e }) => ({ zIndex: (e.vars || e).zIndex.drawer }))), Dp = J("div", {
	shouldForwardProp: so,
	name: "MuiDrawer",
	slot: "Docked",
	skipVariantsResolver: !1,
	overridesResolver: wp
})({ flex: "0 0 auto" }), Op = J(As, {
	name: "MuiDrawer",
	slot: "Paper",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.paper,
			t[`paperAnchor${Y(n.anchor)}`],
			n.variant !== "temporary" && t[`paperAnchorDocked${Y(n.anchor)}`]
		];
	}
})(X(({ theme: e }) => ({
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	height: "100%",
	flex: "1 0 auto",
	zIndex: (e.vars || e).zIndex.drawer,
	WebkitOverflowScrolling: "touch",
	position: "fixed",
	top: 0,
	outline: 0,
	variants: [
		{
			props: { anchor: "left" },
			style: { left: 0 }
		},
		{
			props: { anchor: "top" },
			style: {
				top: 0,
				left: 0,
				right: 0,
				height: "auto",
				maxHeight: "100%"
			}
		},
		{
			props: { anchor: "right" },
			style: { right: 0 }
		},
		{
			props: { anchor: "bottom" },
			style: {
				top: "auto",
				left: 0,
				bottom: 0,
				right: 0,
				height: "auto",
				maxHeight: "100%"
			}
		},
		{
			props: ({ ownerState: e }) => e.anchor === "left" && e.variant !== "temporary",
			style: { borderRight: `1px solid ${(e.vars || e).palette.divider}` }
		},
		{
			props: ({ ownerState: e }) => e.anchor === "top" && e.variant !== "temporary",
			style: { borderBottom: `1px solid ${(e.vars || e).palette.divider}` }
		},
		{
			props: ({ ownerState: e }) => e.anchor === "right" && e.variant !== "temporary",
			style: { borderLeft: `1px solid ${(e.vars || e).palette.divider}` }
		},
		{
			props: ({ ownerState: e }) => e.anchor === "bottom" && e.variant !== "temporary",
			style: { borderTop: `1px solid ${(e.vars || e).palette.divider}` }
		}
	]
}))), kp = {
	left: "right",
	right: "left",
	top: "down",
	bottom: "up"
};
function Ap(e) {
	return ["left", "right"].includes(e);
}
function jp({ direction: e }, t) {
	return e === "rtl" && Ap(t) ? kp[t] : t;
}
var Mp = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiDrawer"
	}), a = ao(), o = xi(), s = {
		enter: a.transitions.duration.enteringScreen,
		exit: a.transitions.duration.leavingScreen
	}, { anchor: c = "left", BackdropProps: l, children: u, className: d, elevation: f = 16, hideBackdrop: p = !1, ModalProps: { BackdropProps: m, ...h } = {}, onClose: g, open: _ = !1, PaperProps: v = {}, SlideProps: y, TransitionComponent: b, transitionDuration: x = s, variant: S = "temporary", slots: C = {}, slotProps: w = {}, ...T } = i, E = n.useRef(!1), D = n.useRef(null), O = Bo(r, D);
	n.useEffect(() => {
		E.current = !0;
	}, []);
	let k = n.useCallback(() => D.current, []), A = jp({ direction: o ? "rtl" : "ltr" }, c), j = c, M = {
		...i,
		anchor: j,
		elevation: f,
		open: _,
		variant: S,
		...T
	}, N = Tp(M), P = {
		slots: {
			transition: b,
			...C
		},
		slotProps: {
			paper: v,
			transition: y,
			...w,
			backdrop: Ho(w.backdrop || {
				...l,
				...m
			}, { transitionDuration: x })
		}
	}, [F, ee] = Q("root", {
		ref: O,
		elementType: Ep,
		className: U(N.root, N.modal, d),
		shouldForwardComponentProp: !0,
		ownerState: M,
		externalForwardedProps: {
			...P,
			...T,
			...h
		},
		additionalProps: {
			closeAfterTransition: !0,
			open: _,
			onClose: g,
			hideBackdrop: p,
			slots: { backdrop: P.slots.backdrop },
			slotProps: { backdrop: P.slotProps.backdrop }
		}
	}), [I, te] = Q("paper", {
		elementType: Op,
		shouldForwardComponentProp: !0,
		className: U(N.paper, v.className),
		ownerState: M,
		externalForwardedProps: P,
		additionalProps: {
			elevation: S === "temporary" ? f : 0,
			square: !0,
			...S === "temporary" && {
				role: "dialog",
				"aria-modal": "true",
				"data-mui-focusable": "",
				tabIndex: -1
			}
		}
	}), [L, ne] = Q("docked", {
		elementType: Dp,
		ref: O,
		className: U(N.root, N.docked, d),
		ownerState: M,
		externalForwardedProps: P,
		additionalProps: T
	}), [re, R] = Q("transition", {
		elementType: Sp,
		ownerState: M,
		externalForwardedProps: P,
		additionalProps: {
			in: _,
			direction: kp[A],
			timeout: x,
			appear: E.current,
			...S === "temporary" && (C.transition == null || C.transition === Sp) && { container: k }
		}
	}), ie = /*#__PURE__*/ e(I, {
		...te,
		children: u
	});
	if (S === "permanent") return /*#__PURE__*/ e(L, {
		...ne,
		children: ie
	});
	let z = /*#__PURE__*/ e(re, {
		...R,
		children: ie
	});
	return S === "persistent" ? /*#__PURE__*/ e(L, {
		...ne,
		children: z
	}) : /*#__PURE__*/ e(F, {
		...ee,
		children: z
	});
}), Np = (e) => {
	let { classes: t, disableUnderline: n, startAdornment: r, endAdornment: i, size: a, hiddenLabel: o, multiline: s } = e, c = K({
		root: [
			"root",
			!n && "underline",
			r && "adornedStart",
			i && "adornedEnd",
			a === "small" && `size${Y(a)}`,
			o && "hiddenLabel",
			s && "multiline"
		],
		input: ["input"]
	}, kd, t);
	return {
		...t,
		...c
	};
}, Pp = J(xd, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiFilledInput",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [...vd(e, t), !n.disableUnderline && t.underline];
	}
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light", n = t ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)", r = t ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)", i = t ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)", a = t ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
	return {
		position: "relative",
		backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r,
		borderTopLeftRadius: (e.vars || e).shape.borderRadius,
		borderTopRightRadius: (e.vars || e).shape.borderRadius,
		transition: e.transitions.create("background-color", {
			duration: e.transitions.duration.shorter,
			easing: e.transitions.easing.easeOut
		}),
		"&:hover": {
			backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : i,
			"@media (hover: none)": { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r }
		},
		[`&.${Ad.focused}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : r },
		[`&.${Ad.disabled}`]: { backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : a },
		variants: [
			{
				props: ({ ownerState: e }) => !e.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: e.transitions.create("transform", {
							duration: e.transitions.duration.shorter,
							easing: e.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${Ad.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${Ad.error}`]: { "&::before, &::after": { borderBottomColor: (e.vars || e).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${e.vars ? e.alpha(e.vars.palette.common.onBackground, e.vars.opacity.inputUnderline) : n}`,
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transition: e.transitions.create("border-bottom-color", { duration: e.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${Ad.disabled}, .${Ad.error}):before`]: { borderBottom: `1px solid ${(e.vars || e).palette.text.primary}` },
					[`&.${Ad.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
				props: {
					disableUnderline: !1,
					color: t
				},
				style: { "&::after": { borderBottom: `2px solid ${(e.vars || e).palette[t]?.main}` } }
			})),
			{
				props: ({ ownerState: e }) => e.startAdornment,
				style: { paddingLeft: 12 }
			},
			{
				props: ({ ownerState: e }) => e.endAdornment,
				style: { paddingRight: 12 }
			},
			{
				props: ({ ownerState: e }) => e.multiline,
				style: { padding: "25px 12px 8px" }
			},
			{
				props: ({ ownerState: e, size: t }) => e.multiline && t === "small",
				style: {
					paddingTop: 21,
					paddingBottom: 4
				}
			},
			{
				props: ({ ownerState: e }) => e.multiline && e.hiddenLabel,
				style: {
					paddingTop: 16,
					paddingBottom: 17
				}
			},
			{
				props: ({ ownerState: e }) => e.multiline && e.hiddenLabel && e.size === "small",
				style: {
					paddingTop: 8,
					paddingBottom: 9
				}
			}
		]
	};
})), Fp = J(Sd, {
	name: "MuiFilledInput",
	slot: "Input",
	overridesResolver: yd
})(X(({ theme: e }) => ({
	paddingTop: 25,
	paddingRight: 12,
	paddingBottom: 8,
	paddingLeft: 12,
	...!e.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
		caretColor: e.palette.mode === "light" ? null : "#fff",
		borderTopLeftRadius: "inherit",
		borderTopRightRadius: "inherit"
	} },
	...e.vars && {
		"&:-webkit-autofill": {
			borderTopLeftRadius: "inherit",
			borderTopRightRadius: "inherit"
		},
		[e.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: {
				paddingTop: 21,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState: e }) => e.hiddenLabel,
			style: {
				paddingTop: 16,
				paddingBottom: 17
			}
		},
		{
			props: ({ ownerState: e }) => e.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState: e }) => e.endAdornment,
			style: { paddingRight: 0 }
		},
		{
			props: ({ ownerState: e }) => e.hiddenLabel && e.size === "small",
			style: {
				paddingTop: 8,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState: e }) => e.multiline,
			style: {
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				paddingRight: 0
			}
		}
	]
}))), Ip = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiFilledInput"
	}), { disableUnderline: i = !1, components: a = {}, componentsProps: o, fullWidth: s = !1, hiddenLabel: c, inputComponent: l = "input", multiline: u = !1, slotProps: d, slots: f = {}, type: p = "text", ...m } = r, h = {
		...r,
		disableUnderline: i,
		fullWidth: s,
		inputComponent: l,
		multiline: u,
		type: p
	}, g = Np(r), _ = {
		root: { ownerState: h },
		input: { ownerState: h }
	}, v = d ?? o ? cn(_, d ?? o) : _, y = f.root ?? a.Root ?? Pp, b = f.input ?? a.Input ?? Fp;
	return /*#__PURE__*/ e(wd, {
		slots: {
			root: y,
			input: b
		},
		slotProps: v,
		fullWidth: s,
		inputComponent: l,
		multiline: u,
		ref: n,
		type: p,
		...m,
		classes: g
	});
});
Ip.muiName = "Input";
//#endregion
//#region node_modules/@mui/material/esm/FormControl/formControlClasses.js
function Lp(e) {
	return W("MuiFormControl", e);
}
G("MuiFormControl", [
	"root",
	"marginNone",
	"marginNormal",
	"marginDense",
	"fullWidth",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/material/esm/FormControl/FormControl.js
var Rp = (e) => {
	let { classes: t, margin: n, fullWidth: r } = e;
	return K({ root: [
		"root",
		n !== "none" && `margin${Y(n)}`,
		r && "fullWidth"
	] }, Lp, t);
}, zp = J("div", {
	name: "MuiFormControl",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[`margin${Y(n.margin)}`],
			n.fullWidth && t.fullWidth
		];
	}
})({
	display: "inline-flex",
	flexDirection: "column",
	position: "relative",
	minWidth: 0,
	padding: 0,
	margin: 0,
	border: 0,
	verticalAlign: "top",
	variants: [
		{
			props: { margin: "normal" },
			style: {
				marginTop: 16,
				marginBottom: 8
			}
		},
		{
			props: { margin: "dense" },
			style: {
				marginTop: 8,
				marginBottom: 4
			}
		},
		{
			props: { fullWidth: !0 },
			style: { width: "100%" }
		}
	]
}), Bp = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiFormControl"
	}), { children: a, className: o, color: s = "primary", component: c = "div", disabled: l = !1, error: u = !1, focused: d, fullWidth: f = !1, hiddenLabel: p = !1, margin: m = "none", required: h = !1, size: g = "medium", variant: _ = "outlined", ...v } = i, y = {
		...i,
		color: s,
		component: c,
		disabled: l,
		error: u,
		fullWidth: f,
		hiddenLabel: p,
		margin: m,
		required: h,
		size: g,
		variant: _
	}, b = Rp(y), [x, S] = n.useState(() => {
		let e = !1;
		return a && n.Children.forEach(a, (t) => {
			if (!Do(t, ["Input", "Select"])) return;
			let n = Do(t, ["Select"]) ? t.props.input : t;
			n && fd(n.props) && (e = !0);
		}), e;
	}), [C, w] = n.useState(() => {
		let e = !1;
		return a && n.Children.forEach(a, (t) => {
			Do(t, ["Input", "Select"]) && (dd(t.props, !0) || dd(t.props.inputProps, !0)) && (e = !0);
		}), e;
	}), [T, E] = n.useState(!1);
	l && T && E(!1);
	let D = d !== void 0 && !l ? d : T, O;
	n.useRef(!1);
	let k = n.useCallback(() => {
		w(!0);
	}, []), A = n.useCallback(() => {
		w(!1);
	}, []), j = n.useMemo(() => ({
		adornedStart: x,
		setAdornedStart: S,
		color: s,
		disabled: l,
		error: u,
		filled: C,
		focused: D,
		fullWidth: f,
		hiddenLabel: p,
		size: g,
		onBlur: () => {
			E(!1);
		},
		onFocus: () => {
			E(!0);
		},
		onEmpty: A,
		onFilled: k,
		registerEffect: O,
		required: h,
		variant: _
	}), [
		x,
		s,
		l,
		u,
		C,
		D,
		f,
		p,
		O,
		A,
		k,
		h,
		g,
		_
	]);
	return /*#__PURE__*/ e(od.Provider, {
		value: j,
		children: /*#__PURE__*/ e(zp, {
			as: c,
			ownerState: y,
			className: U(b.root, o),
			ref: r,
			...v,
			children: a
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/FormControlLabel/formControlLabelClasses.js
function Vp(e) {
	return W("MuiFormControlLabel", e);
}
var Hp = G("MuiFormControlLabel", [
	"root",
	"labelPlacementStart",
	"labelPlacementTop",
	"labelPlacementBottom",
	"disabled",
	"label",
	"error",
	"required",
	"asterisk"
]), Up = (e) => {
	let { classes: t, disabled: n, labelPlacement: r, error: i, required: a } = e;
	return K({
		root: [
			"root",
			n && "disabled",
			`labelPlacement${Y(r)}`,
			i && "error",
			a && "required"
		],
		label: ["label", n && "disabled"],
		asterisk: ["asterisk", i && "error"]
	}, Vp, t);
}, Wp = J("label", {
	name: "MuiFormControlLabel",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			{ [`& .${Hp.label}`]: t.label },
			t.root,
			t[`labelPlacement${Y(n.labelPlacement)}`]
		];
	}
})(X(({ theme: e }) => ({
	display: "inline-flex",
	alignItems: "center",
	cursor: "pointer",
	verticalAlign: "middle",
	WebkitTapHighlightColor: "transparent",
	marginLeft: -11,
	marginRight: 16,
	[`&.${Hp.disabled}`]: { cursor: "default" },
	[`& .${Hp.label}`]: { [`&.${Hp.disabled}`]: { color: (e.vars || e).palette.text.disabled } },
	variants: [
		{
			props: { labelPlacement: "start" },
			style: {
				flexDirection: "row-reverse",
				marginRight: -11
			}
		},
		{
			props: { labelPlacement: "top" },
			style: { flexDirection: "column-reverse" }
		},
		{
			props: { labelPlacement: "bottom" },
			style: { flexDirection: "column" }
		},
		{
			props: ({ labelPlacement: e }) => e === "start" || e === "top" || e === "bottom",
			style: { marginLeft: 16 }
		}
	]
}))), Gp = J("span", {
	name: "MuiFormControlLabel",
	slot: "Asterisk"
})(X(({ theme: e }) => ({ [`&.${Hp.error}`]: { color: (e.vars || e).palette.error.main } }))), Kp = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiFormControlLabel"
	}), { checked: o, className: s, componentsProps: c = {}, control: l, disabled: u, disableTypography: d, inputRef: f, label: p, labelPlacement: m = "end", name: h, onChange: g, required: _, slots: v = {}, slotProps: y = {}, value: b, ...x } = a, S = sd(), C = u ?? l.props.disabled ?? S?.disabled, w = _ ?? l.props.required, T = {
		disabled: C,
		required: w
	};
	[
		"checked",
		"name",
		"onChange",
		"value",
		"inputRef"
	].forEach((e) => {
		l.props[e] === void 0 && a[e] !== void 0 && (T[e] = a[e]);
	});
	let E = ad({
		props: a,
		muiFormControl: S,
		states: ["error"]
	}), D = {
		...a,
		disabled: C,
		labelPlacement: m,
		required: w,
		error: E.error
	}, O = Up(D), [k, A] = Q("typography", {
		elementType: Lc,
		externalForwardedProps: {
			slots: v,
			slotProps: {
				...c,
				...y
			}
		},
		ownerState: D
	}), j = p;
	return j != null && j.type !== Lc && !d && (j = /*#__PURE__*/ e(k, {
		component: "span",
		...A,
		className: U(O.label, A?.className),
		children: j
	})), /*#__PURE__*/ t(Wp, {
		className: U(O.root, s),
		ownerState: D,
		ref: i,
		...x,
		children: [/*#__PURE__*/ n.cloneElement(l, T), w ? /*#__PURE__*/ t("div", { children: [j, /*#__PURE__*/ t(Gp, {
			ownerState: D,
			"aria-hidden": !0,
			className: O.asterisk,
			children: [" ", "*"]
		})] }) : j]
	});
});
//#endregion
//#region node_modules/@mui/material/esm/FormHelperText/formHelperTextClasses.js
function qp(e) {
	return W("MuiFormHelperText", e);
}
var Jp = G("MuiFormHelperText", [
	"root",
	"error",
	"disabled",
	"sizeSmall",
	"sizeMedium",
	"contained",
	"focused",
	"filled",
	"required"
]), Yp, Xp = (e) => {
	let { classes: t, contained: n, size: r, disabled: i, error: a, filled: o, focused: s, required: c } = e;
	return K({ root: [
		"root",
		i && "disabled",
		a && "error",
		r && `size${Y(r)}`,
		n && "contained",
		s && "focused",
		o && "filled",
		c && "required"
	] }, qp, t);
}, Zp = J("p", {
	name: "MuiFormHelperText",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.size && t[`size${Y(n.size)}`],
			n.contained && t.contained,
			n.filled && t.filled
		];
	}
})(X(({ theme: e }) => ({
	color: (e.vars || e).palette.text.secondary,
	...e.typography.caption,
	textAlign: "left",
	marginTop: 3,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0,
	[`&.${Jp.disabled}`]: { color: (e.vars || e).palette.text.disabled },
	[`&.${Jp.error}`]: { color: (e.vars || e).palette.error.main },
	variants: [{
		props: { size: "small" },
		style: { marginTop: 4 }
	}, {
		props: ({ ownerState: e }) => e.contained,
		style: {
			marginLeft: 14,
			marginRight: 14
		}
	}]
}))), Qp = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiFormHelperText"
	}), { children: i, className: a, component: o = "p", disabled: s, error: c, filled: l, focused: u, margin: d, required: f, variant: p, ...m } = r, h = ad({
		props: r,
		muiFormControl: sd(),
		states: [
			"variant",
			"size",
			"disabled",
			"error",
			"filled",
			"focused",
			"required"
		]
	}), g = {
		...r,
		component: o,
		contained: h.variant === "filled" || h.variant === "outlined",
		variant: h.variant,
		size: h.size,
		disabled: h.disabled,
		error: h.error,
		filled: h.filled,
		focused: h.focused,
		required: h.required
	};
	delete g.ownerState;
	let _ = Xp(g);
	return /*#__PURE__*/ e(Zp, {
		as: o,
		className: U(_.root, a),
		ref: n,
		...m,
		ownerState: g,
		children: i === " " ? Yp ||= /*#__PURE__*/ e("span", {
			className: "notranslate",
			"aria-hidden": !0,
			children: "​"
		}) : i
	});
});
//#endregion
//#region node_modules/@mui/material/esm/FormLabel/formLabelClasses.js
function $p(e) {
	return W("MuiFormLabel", e);
}
var em = G("MuiFormLabel", [
	"root",
	"colorSecondary",
	"focused",
	"disabled",
	"error",
	"filled",
	"required",
	"asterisk"
]), tm = (e) => {
	let { classes: t, color: n, focused: r, disabled: i, error: a, filled: o, required: s } = e;
	return K({
		root: [
			"root",
			`color${Y(n)}`,
			i && "disabled",
			a && "error",
			o && "filled",
			r && "focused",
			s && "required"
		],
		asterisk: ["asterisk", a && "error"]
	}, $p, t);
}, nm = J("label", {
	name: "MuiFormLabel",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.color === "secondary" && t.colorSecondary,
			n.filled && t.filled
		];
	}
})(X(({ theme: e }) => ({
	color: (e.vars || e).palette.text.secondary,
	...e.typography.body1,
	lineHeight: "1.4375em",
	padding: 0,
	position: "relative",
	variants: [...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
		props: { color: t },
		style: { [`&.${em.focused}`]: { color: (e.vars || e).palette[t].main } }
	})), {
		props: {},
		style: {
			[`&.${em.disabled}`]: { color: (e.vars || e).palette.text.disabled },
			[`&.${em.error}`]: { color: (e.vars || e).palette.error.main }
		}
	}]
}))), rm = J("span", {
	name: "MuiFormLabel",
	slot: "Asterisk"
})(X(({ theme: e }) => ({ [`&.${em.error}`]: { color: (e.vars || e).palette.error.main } }))), im = /*#__PURE__*/ n.forwardRef(function(e, n) {
	let r = Z({
		props: e,
		name: "MuiFormLabel"
	}), { children: i, className: a, color: o, component: s = "label", disabled: c, error: l, filled: u, focused: d, required: f, ...p } = r, m = ad({
		props: r,
		muiFormControl: sd(),
		states: [
			"color",
			"required",
			"focused",
			"disabled",
			"error",
			"filled"
		]
	}), h = {
		...r,
		color: m.color || "primary",
		component: s,
		disabled: m.disabled,
		error: m.error,
		filled: m.filled,
		focused: m.focused,
		required: m.required
	}, g = tm(h);
	return /*#__PURE__*/ t(nm, {
		as: s,
		ownerState: h,
		className: U(g.root, a),
		ref: n,
		...p,
		children: [i, m.required && /*#__PURE__*/ t(rm, {
			ownerState: h,
			"aria-hidden": !0,
			className: g.asterisk,
			children: [" ", "*"]
		})]
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Grow/Grow.js
function am(e) {
	return `scale(${e}, ${e ** 2})`;
}
var om = {
	entering: {
		opacity: 1,
		transform: am(1)
	},
	entered: {
		opacity: 1,
		transform: "none"
	},
	exiting: {
		opacity: 0,
		transform: am(.75)
	},
	exited: {
		opacity: 0,
		transform: am(.75)
	}
}, sm = {
	opacity: 0,
	transform: am(.75),
	visibility: "hidden"
}, cm = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let { addEndListener: i, appear: a = !0, children: o, easing: s, in: c, onEnter: l, onEntered: u, onEntering: d, onExit: f, onExited: p, onExiting: m, style: h, timeout: g = "auto", ..._ } = t, v = gs(), y = n.useRef(), b = ao(), x = n.useRef(null), S = Bo(x, Pu(o), r), C = vs(x, d), w = vs(x, (e, t) => {
		_s(e);
		let { duration: n, delay: r, easing: i } = bs({
			style: h,
			timeout: g,
			easing: s
		}, { mode: "enter" }), a;
		g === "auto" ? (a = b.transitions.getAutoHeightDuration(e.clientHeight), y.current = a) : a = n, e.style.transition = [b.transitions.create("opacity", {
			duration: a,
			delay: r
		}), b.transitions.create("transform", {
			duration: a * .666,
			delay: r,
			easing: i
		})].join(","), l && l(e, t);
	}), T = vs(x, u), E = vs(x, m), D = vs(x, (e) => {
		let { duration: t, delay: n, easing: r } = bs({
			style: h,
			timeout: g,
			easing: s
		}, { mode: "exit" }), i;
		g === "auto" ? (i = b.transitions.getAutoHeightDuration(e.clientHeight), y.current = i) : i = t, e.style.transition = [b.transitions.create("opacity", {
			duration: i,
			delay: n
		}), b.transitions.create("transform", {
			duration: i * .666,
			delay: n || i * .333,
			easing: r
		})].join(","), e.style.opacity = 0, e.style.transform = am(.75), f && f(e);
	}), O = vs(x, (e) => {
		e.style.transition = "", p && p(e);
	});
	return /*#__PURE__*/ e(es, {
		appear: a,
		in: c,
		nodeRef: x,
		onEnter: w,
		onEntered: T,
		onEntering: C,
		onExit: D,
		onExited: O,
		onExiting: E,
		addEndListener: (e) => {
			g === "auto" && v.start(y.current || 0, e), i && i(x.current, e);
		},
		timeout: g === "auto" ? null : g,
		..._,
		children: (e, { ownerState: t, ...r }) => {
			let i = ys(e, c, om, sm, h, o.props.style);
			return /*#__PURE__*/ n.cloneElement(o, {
				style: i,
				ref: S,
				...r
			});
		}
	});
});
cm && (cm.muiSupportAuto = !0);
//#endregion
//#region node_modules/@mui/material/esm/Input/Input.js
var lm = (e) => {
	let { classes: t, disableUnderline: n } = e, r = K({
		root: ["root", !n && "underline"],
		input: ["input"]
	}, Td, t);
	return {
		...t,
		...r
	};
}, um = J(xd, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiInput",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [...vd(e, t), !n.disableUnderline && t.underline];
	}
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	return e.vars && (t = e.alpha(e.vars.palette.common.onBackground, e.vars.opacity.inputUnderline)), {
		position: "relative",
		variants: [
			{
				props: ({ ownerState: e }) => e.formControl,
				style: { "label + &": { marginTop: 16 } }
			},
			{
				props: ({ ownerState: e }) => !e.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: e.transitions.create("transform", {
							duration: e.transitions.duration.shorter,
							easing: e.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${Ed.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${Ed.error}`]: { "&::before, &::after": { borderBottomColor: (e.vars || e).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${t}`,
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transition: e.transitions.create("border-bottom-color", { duration: e.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${Ed.disabled}, .${Ed.error}):before`]: {
						borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
						"@media (hover: none)": { borderBottom: `1px solid ${t}` }
					},
					[`&.${Ed.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
				props: {
					color: t,
					disableUnderline: !1
				},
				style: { "&::after": { borderBottom: `2px solid ${(e.vars || e).palette[t].main}` } }
			}))
		]
	};
})), dm = J(Sd, {
	name: "MuiInput",
	slot: "Input",
	overridesResolver: yd
})({}), fm = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiInput"
	}), { disableUnderline: i = !1, components: a = {}, componentsProps: o, fullWidth: s = !1, inputComponent: c = "input", multiline: l = !1, slotProps: u, slots: d = {}, type: f = "text", ...p } = r, m = lm(r), h = { root: { ownerState: { disableUnderline: i } } }, g = u ?? o ? cn(u ?? o, h) : h, _ = d.root ?? a.Root ?? um, v = d.input ?? a.Input ?? dm;
	return /*#__PURE__*/ e(wd, {
		slots: {
			root: _,
			input: v
		},
		slotProps: g,
		fullWidth: s,
		inputComponent: c,
		multiline: l,
		ref: n,
		type: f,
		...p,
		classes: m
	});
});
fm.muiName = "Input";
//#endregion
//#region node_modules/@mui/material/esm/InputLabel/inputLabelClasses.js
function pm(e) {
	return W("MuiInputLabel", e);
}
G("MuiInputLabel", [
	"root",
	"focused",
	"disabled",
	"error",
	"required",
	"asterisk",
	"formControl",
	"sizeSmall",
	"shrink",
	"animated",
	"standard",
	"filled",
	"outlined"
]);
//#endregion
//#region node_modules/@mui/material/esm/InputLabel/InputLabel.js
var mm = (e) => {
	let { classes: t, formControl: n, size: r, shrink: i, disableAnimation: a, variant: o, required: s } = e, c = K({
		root: [
			"root",
			n && "formControl",
			!a && "animated",
			i && "shrink",
			r && r !== "medium" && `size${Y(r)}`,
			o
		],
		asterisk: [s && "asterisk"]
	}, pm, t);
	return {
		...t,
		...c
	};
}, hm = J(im, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiInputLabel",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			{ [`& .${em.asterisk}`]: t.asterisk },
			t.root,
			n.formControl && t.formControl,
			n.size === "small" && t.sizeSmall,
			n.shrink && t.shrink,
			!n.disableAnimation && t.animated,
			n.focused && t.focused,
			t[n.variant]
		];
	}
})(X(({ theme: e }) => ({
	display: "block",
	transformOrigin: "top left",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	maxWidth: "100%",
	variants: [
		{
			props: ({ ownerState: e }) => e.formControl,
			style: {
				position: "absolute",
				left: 0,
				top: 0,
				transform: "translate(0, 20px) scale(1)"
			}
		},
		{
			props: { size: "small" },
			style: { transform: "translate(0, 17px) scale(1)" }
		},
		{
			props: ({ ownerState: e }) => e.shrink,
			style: {
				transform: "translate(0, -1.5px) scale(0.75)",
				transformOrigin: "top left",
				maxWidth: "133%"
			}
		},
		{
			props: ({ ownerState: e }) => !e.disableAnimation,
			style: { transition: e.transitions.create([
				"color",
				"transform",
				"max-width"
			], {
				duration: e.transitions.duration.shorter,
				easing: e.transitions.easing.easeOut
			}) }
		},
		{
			props: { variant: "filled" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(12px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "filled",
				size: "small"
			},
			style: { transform: "translate(12px, 13px) scale(1)" }
		},
		{
			props: ({ variant: e, ownerState: t }) => e === "filled" && t.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				transform: "translate(12px, 7px) scale(0.75)",
				maxWidth: "calc(133% - 24px)"
			}
		},
		{
			props: ({ variant: e, ownerState: t, size: n }) => e === "filled" && t.shrink && n === "small",
			style: { transform: "translate(12px, 4px) scale(0.75)" }
		},
		{
			props: { variant: "outlined" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(14px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "outlined",
				size: "small"
			},
			style: { transform: "translate(14px, 9px) scale(1)" }
		},
		{
			props: ({ variant: e, ownerState: t }) => e === "outlined" && t.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				maxWidth: "calc(133% - 32px)",
				transform: "translate(14px, -9px) scale(0.75)"
			}
		}
	]
}))), gm = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		name: "MuiInputLabel",
		props: t
	}), { disableAnimation: i = !1, margin: a, shrink: o, variant: s, className: c, ...l } = r, u = sd(), d = o;
	d === void 0 && u && (d = u.filled || u.focused || u.adornedStart);
	let f = ad({
		props: r,
		muiFormControl: u,
		states: [
			"size",
			"variant",
			"required",
			"focused"
		]
	}), p = {
		...r,
		disableAnimation: i,
		formControl: u,
		shrink: d,
		size: f.size,
		variant: f.variant,
		required: f.required,
		focused: f.focused
	}, m = mm(p);
	return /*#__PURE__*/ e(hm, {
		"data-shrink": d,
		ref: n,
		className: U(m.root, c),
		...l,
		ownerState: p,
		classes: m
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Link/linkClasses.js
function _m(e) {
	return W("MuiLink", e);
}
var vm = G("MuiLink", [
	"root",
	"underlineNone",
	"underlineHover",
	"underlineAlways",
	"button",
	"focusVisible"
]), ym = ({ theme: e, ownerState: t }) => {
	let n = t.color;
	if ("colorSpace" in e && e.colorSpace) {
		let r = wn(e, `palette.${n}.main`) || wn(e, `palette.${n}`) || t.color;
		return e.alpha(r, .4);
	}
	let r = wn(e, `palette.${n}.main`, !1) || wn(e, `palette.${n}`, !1) || t.color, i = wn(e, `palette.${n}.mainChannel`) || wn(e, `palette.${n}Channel`);
	return "vars" in e && i ? `rgba(${i} / 0.4)` : oi(r, .4);
}, bm = {
	primary: !0,
	secondary: !0,
	error: !0,
	info: !0,
	success: !0,
	warning: !0,
	textPrimary: !0,
	textSecondary: !0,
	textDisabled: !0
}, xm = (e) => {
	let { classes: t, component: n, focusVisible: r, underline: i } = e;
	return K({ root: [
		"root",
		`underline${Y(i)}`,
		n === "button" && "button",
		r && "focusVisible"
	] }, _m, t);
}, Sm = J(Lc, {
	name: "MuiLink",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[`underline${Y(n.underline)}`],
			n.component === "button" && t.button
		];
	}
})(X(({ theme: e }) => ({ variants: [
	{
		props: { underline: "none" },
		style: { textDecoration: "none" }
	},
	{
		props: { underline: "hover" },
		style: {
			textDecoration: "none",
			"&:hover": { textDecoration: "underline" }
		}
	},
	{
		props: { underline: "always" },
		style: {
			textDecoration: "underline",
			"&:hover": { textDecorationColor: "inherit" }
		}
	},
	{
		props: ({ underline: e, ownerState: t }) => e === "always" && t.color !== "inherit",
		style: { textDecorationColor: "var(--Link-underlineColor)" }
	},
	{
		props: ({ underline: e, ownerState: t }) => e === "always" && t.color === "inherit",
		style: e.colorSpace ? { textDecorationColor: e.alpha("currentColor", .4) } : null
	},
	...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
		props: {
			underline: "always",
			color: t
		},
		style: { "--Link-underlineColor": e.alpha((e.vars || e).palette[t].main, .4) }
	})),
	{
		props: {
			underline: "always",
			color: "textPrimary"
		},
		style: { "--Link-underlineColor": e.alpha((e.vars || e).palette.text.primary, .4) }
	},
	{
		props: {
			underline: "always",
			color: "textSecondary"
		},
		style: { "--Link-underlineColor": e.alpha((e.vars || e).palette.text.secondary, .4) }
	},
	{
		props: {
			underline: "always",
			color: "textDisabled"
		},
		style: { "--Link-underlineColor": (e.vars || e).palette.text.disabled }
	},
	{
		props: { component: "button" },
		style: {
			position: "relative",
			WebkitTapHighlightColor: "transparent",
			backgroundColor: "transparent",
			outline: 0,
			border: 0,
			margin: 0,
			borderRadius: 0,
			padding: 0,
			cursor: "pointer",
			userSelect: "none",
			verticalAlign: "middle",
			MozAppearance: "none",
			WebkitAppearance: "none",
			"&::-moz-focus-inner": { borderStyle: "none" },
			[`&.${vm.focusVisible}`]: { outline: "auto" }
		}
	}
] }))), Cm = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiLink"
	}), a = ao(), { className: o, color: s = "primary", component: c = "a", onBlur: l, onFocus: u, TypographyClasses: d, underline: f = "always", variant: p = "inherit", sx: m, ...h } = i, [g, _] = n.useState(!1), v = (e) => {
		js(e.target) || _(!1), l && l(e);
	}, y = (e) => {
		js(e.target) && _(!0), u && u(e);
	}, b = {
		...i,
		color: s,
		component: c,
		focusVisible: g,
		underline: f,
		variant: p
	}, x = xm(b);
	return /*#__PURE__*/ e(Sm, {
		color: s,
		className: U(x.root, o),
		classes: d,
		component: c,
		onBlur: v,
		onFocus: y,
		ref: r,
		ownerState: b,
		variant: p,
		...h,
		sx: [...bm[s] === void 0 ? [{ color: s }] : [], ...Array.isArray(m) ? m : [m]],
		style: {
			...h.style,
			...f === "always" && s !== "inherit" && !bm[s] && { "--Link-underlineColor": ym({
				theme: a,
				ownerState: b
			}) }
		}
	});
}), wm = /*#__PURE__*/ n.createContext({});
//#endregion
//#region node_modules/@mui/material/esm/List/listClasses.js
function Tm(e) {
	return W("MuiList", e);
}
G("MuiList", [
	"root",
	"padding",
	"dense",
	"subheader"
]);
//#endregion
//#region node_modules/@mui/material/esm/List/List.js
var Em = (e) => {
	let { classes: t, disablePadding: n, dense: r, subheader: i } = e;
	return K({ root: [
		"root",
		!n && "padding",
		r && "dense",
		i && "subheader"
	] }, Tm, t);
}, Dm = J("ul", {
	name: "MuiList",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			!n.disablePadding && t.padding,
			n.dense && t.dense,
			n.subheader && t.subheader
		];
	}
})({
	listStyle: "none",
	margin: 0,
	padding: 0,
	position: "relative",
	variants: [{
		props: ({ ownerState: e }) => !e.disablePadding,
		style: {
			paddingTop: 8,
			paddingBottom: 8
		}
	}, {
		props: ({ ownerState: e }) => e.subheader,
		style: { paddingTop: 0 }
	}]
}), Om = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiList"
	}), { children: o, className: s, component: c = "ul", dense: l = !1, disablePadding: u = !1, subheader: d, ...f } = a, p = n.useMemo(() => ({ dense: l }), [l]), m = {
		...a,
		component: c,
		dense: l,
		disablePadding: u
	}, h = Em(m);
	return /*#__PURE__*/ e(wm.Provider, {
		value: p,
		children: /*#__PURE__*/ t(Dm, {
			as: c,
			className: U(h.root, s),
			ref: i,
			ownerState: m,
			...f,
			children: [d, o]
		})
	});
}), km = hf;
//#endregion
//#region node_modules/@mui/material/esm/MenuList/MenuList.js
function Am(e, t, n) {
	return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function jm(e, t, n) {
	return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Mm(e, t) {
	if (t === void 0) return !0;
	let n = e.innerText;
	return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.startsWith(t.keys.join(""));
}
function Nm(e, t, n, r, i, a) {
	let o = !1, s = i(e, t, t ? n : !1);
	for (; s;) {
		if (s === e.firstChild) {
			if (o) return !1;
			o = !0;
		}
		let t = r ? !1 : s.disabled || s.getAttribute("aria-disabled") === "true";
		if (!s.hasAttribute("tabindex") || !Mm(s, a) || t) s = i(e, s, n);
		else return s.focus(), !0;
	}
	return !1;
}
var Pm = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let { actions: i, autoFocus: a = !1, autoFocusItem: o = !1, children: s, className: c, disabledItemsFocusable: l = !1, disableListWrap: u = !1, onKeyDown: d, variant: f = "selectedMenu", ...p } = t, m = n.useRef(null), h = n.useRef({
		keys: [],
		repeating: !0,
		previousKeyMatched: !0,
		lastTime: null
	});
	No(() => {
		a && m.current.focus();
	}, [a]), n.useImperativeHandle(i, () => ({ adjustStyleForScrollbar: (e, { direction: t }) => {
		let n = !m.current.style.width;
		if (e.clientHeight < m.current.clientHeight && n) {
			let n = `${km(jo(e))}px`;
			m.current.style[t === "rtl" ? "paddingLeft" : "paddingRight"] = n, m.current.style.width = `calc(100% + ${n})`;
		}
		return m.current;
	} }), []);
	let g = (e) => {
		let t = m.current, n = e.key;
		if (e.ctrlKey || e.metaKey || e.altKey) {
			d && d(e);
			return;
		}
		let r = ld(ko(t));
		if (n === "ArrowDown") e.preventDefault(), Nm(t, r, u, l, Am);
		else if (n === "ArrowUp") e.preventDefault(), Nm(t, r, u, l, jm);
		else if (n === "Home") e.preventDefault(), Nm(t, null, u, l, Am);
		else if (n === "End") e.preventDefault(), Nm(t, null, u, l, jm);
		else if (n.length === 1) {
			let i = h.current, a = n.toLowerCase(), o = performance.now();
			i.keys.length > 0 && (o - i.lastTime > 500 ? (i.keys = [], i.repeating = !0, i.previousKeyMatched = !0) : i.repeating && a !== i.keys[0] && (i.repeating = !1)), i.lastTime = o, i.keys.push(a);
			let s = r && !i.repeating && Mm(r, i);
			i.previousKeyMatched && (s || Nm(t, r, !1, l, Am, i)) ? e.preventDefault() : i.previousKeyMatched = !1;
		}
		d && d(e);
	}, _ = Bo(m, r), v = -1;
	n.Children.forEach(s, (e, t) => {
		if (!/*#__PURE__*/ n.isValidElement(e)) {
			v === t && (v += 1, v >= s.length && (v = -1));
			return;
		}
		e.props.disabled || (f === "selectedMenu" && e.props.selected || v === -1) && (v = t), v === t && (e.props.disabled || e.props.muiSkipListHighlight || e.type.muiSkipListHighlight) && (v += 1, v >= s.length && (v = -1));
	});
	let y = n.Children.map(s, (e, t) => {
		if (t === v) {
			let t = {};
			return o && (t.autoFocus = !0), e.props.tabIndex === void 0 && f === "selectedMenu" && (t.tabIndex = 0), /*#__PURE__*/ n.cloneElement(e, t);
		}
		return e;
	});
	return /*#__PURE__*/ e(Om, {
		role: "menu",
		ref: _,
		className: c,
		onKeyDown: g,
		tabIndex: a ? 0 : -1,
		...p,
		children: y
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Popover/popoverClasses.js
function Fm(e) {
	return W("MuiPopover", e);
}
G("MuiPopover", ["root", "paper"]);
//#endregion
//#region node_modules/@mui/material/esm/Popover/Popover.js
function Im(e, t) {
	let n = 0;
	return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Lm(e, t) {
	let n = 0;
	return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Rm(e) {
	return [e.horizontal, e.vertical].map((e) => typeof e == "number" ? `${e}px` : e).join(" ");
}
function zm(e) {
	return typeof e == "function" ? e() : e;
}
var Bm = (e) => {
	let { classes: t } = e;
	return K({
		root: ["root"],
		paper: ["paper"]
	}, Fm, t);
}, Vm = J(Wf, {
	name: "MuiPopover",
	slot: "Root"
})({}), Hm = J(As, {
	name: "MuiPopover",
	slot: "Paper"
})({
	position: "absolute",
	overflowY: "auto",
	overflowX: "hidden",
	minWidth: 16,
	minHeight: 16,
	maxWidth: "calc(100% - 32px)",
	maxHeight: "calc(100% - 32px)",
	outline: 0
}), Um = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiPopover"
	}), { action: a, anchorEl: o, anchorOrigin: s = {
		vertical: "top",
		horizontal: "left"
	}, anchorPosition: c, anchorReference: l = "anchorEl", children: u, className: d, container: f, elevation: p = 8, marginThreshold: m = 16, open: h, PaperProps: g = {}, slots: _ = {}, slotProps: v = {}, transformOrigin: y = {
		vertical: "top",
		horizontal: "left"
	}, TransitionComponent: b, transitionDuration: x = "auto", TransitionProps: S = {}, disableScrollLock: C = !1, ...w } = i, T = n.useRef(), E = {
		...i,
		anchorOrigin: s,
		anchorReference: l,
		elevation: p,
		marginThreshold: m,
		transformOrigin: y,
		TransitionComponent: b,
		transitionDuration: x,
		TransitionProps: S
	}, D = Bm(E), O = n.useCallback(() => {
		if (l === "anchorPosition") return c;
		let e = zm(o), t = (e && e.nodeType === 1 ? e : ko(T.current).body).getBoundingClientRect();
		return {
			top: t.top + Im(t, s.vertical),
			left: t.left + Lm(t, s.horizontal)
		};
	}, [
		o,
		s.horizontal,
		s.vertical,
		c,
		l
	]), k = n.useCallback((e) => ({
		vertical: Im(e, y.vertical),
		horizontal: Lm(e, y.horizontal)
	}), [y.horizontal, y.vertical]), A = n.useCallback((e) => {
		let t = {
			width: e.offsetWidth,
			height: e.offsetHeight
		}, n = k(t);
		if (l === "none") return {
			top: null,
			left: null,
			transformOrigin: Rm(n)
		};
		let r = O(), i = r.top - n.vertical, a = r.left - n.horizontal, s = i + t.height, c = a + t.width, u = jo(zm(o)), d = u.innerHeight - m, f = u.innerWidth - m;
		if (m !== null && i < m) {
			let e = i - m;
			i -= e, n.vertical += e;
		} else if (m !== null && s > d) {
			let e = s - d;
			i -= e, n.vertical += e;
		}
		if (m !== null && a < m) {
			let e = a - m;
			a -= e, n.horizontal += e;
		} else if (c > f) {
			let e = c - f;
			a -= e, n.horizontal += e;
		}
		return {
			top: `${Math.round(i)}px`,
			left: `${Math.round(a)}px`,
			transformOrigin: Rm(n)
		};
	}, [
		o,
		l,
		O,
		k,
		m
	]), [j, M] = n.useState(h), N = n.useCallback(() => {
		let e = T.current;
		if (!e) return;
		let t = A(e);
		t.top !== null && e.style.setProperty("top", t.top), t.left !== null && (e.style.left = t.left), e.style.transformOrigin = t.transformOrigin, M(!0);
	}, [A]);
	n.useEffect(() => (C && window.addEventListener("scroll", N), () => window.removeEventListener("scroll", N)), [
		o,
		C,
		N
	]);
	let P = () => {
		N();
	}, F = () => {
		M(!1);
	};
	n.useEffect(() => {
		h && N();
	}), n.useImperativeHandle(a, () => h ? { updatePosition: () => {
		N();
	} } : null, [h, N]), n.useEffect(() => {
		if (!h) return;
		let e = Eo(() => {
			N();
		}), t = jo(zm(o));
		return t.addEventListener("resize", e), () => {
			e.clear(), t.removeEventListener("resize", e);
		};
	}, [
		o,
		h,
		N
	]);
	let ee = x, I = {
		slots: {
			transition: b,
			..._
		},
		slotProps: {
			transition: S,
			paper: g,
			...v
		}
	}, [te, L] = Q("transition", {
		elementType: cm,
		externalForwardedProps: I,
		ownerState: E,
		getSlotProps: (e) => ({
			...e,
			onEntering: (t, n) => {
				e.onEntering?.(t, n), P();
			},
			onExited: (t) => {
				e.onExited?.(t), F();
			}
		}),
		additionalProps: {
			appear: !0,
			in: h
		}
	});
	x === "auto" && !te.muiSupportAuto && (ee = void 0);
	let ne = f || (o ? ko(zm(o)).body : void 0), [re, { slots: R, slotProps: ie, ...z }] = Q("root", {
		ref: r,
		elementType: Vm,
		externalForwardedProps: {
			...I,
			...w
		},
		shouldForwardComponentProp: !0,
		additionalProps: {
			slots: { backdrop: _.backdrop },
			slotProps: { backdrop: Ho(typeof v.backdrop == "function" ? v.backdrop(E) : v.backdrop, { invisible: !0 }) },
			container: ne,
			open: h
		},
		ownerState: E,
		className: U(D.root, d)
	}), [ae, oe] = Q("paper", {
		ref: T,
		className: D.paper,
		elementType: Hm,
		externalForwardedProps: I,
		shouldForwardComponentProp: !0,
		additionalProps: {
			elevation: p,
			style: j ? void 0 : { opacity: 0 }
		},
		ownerState: E
	});
	return /*#__PURE__*/ e(re, {
		...z,
		...!xs(re) && {
			slots: R,
			slotProps: ie,
			disableScrollLock: C
		},
		children: /*#__PURE__*/ e(te, {
			...L,
			timeout: ee,
			children: /*#__PURE__*/ e(ae, {
				...oe,
				children: u
			})
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/Menu/menuClasses.js
function Wm(e) {
	return W("MuiMenu", e);
}
G("MuiMenu", [
	"root",
	"paper",
	"list"
]);
//#endregion
//#region node_modules/@mui/material/esm/Menu/Menu.js
var Gm = {
	vertical: "top",
	horizontal: "right"
}, Km = {
	vertical: "top",
	horizontal: "left"
}, qm = (e) => {
	let { classes: t } = e;
	return K({
		root: ["root"],
		paper: ["paper"],
		list: ["list"]
	}, Wm, t);
}, Jm = J(Um, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiMenu",
	slot: "Root"
})({}), Ym = J(Hm, {
	name: "MuiMenu",
	slot: "Paper"
})({
	maxHeight: "calc(100% - 96px)",
	WebkitOverflowScrolling: "touch"
}), Xm = J(Pm, {
	name: "MuiMenu",
	slot: "List"
})({ outline: 0 }), Zm = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiMenu"
	}), { autoFocus: a = !0, children: o, className: s, disableAutoFocusItem: c = !1, MenuListProps: l = {}, onClose: u, open: d, PaperProps: f = {}, PopoverClasses: p, transitionDuration: m = "auto", TransitionProps: { onEntering: h, ...g } = {}, variant: _ = "selectedMenu", slots: v = {}, slotProps: y = {}, ...b } = i, x = xi(), S = {
		...i,
		autoFocus: a,
		disableAutoFocusItem: c,
		MenuListProps: l,
		onEntering: h,
		PaperProps: f,
		transitionDuration: m,
		TransitionProps: g,
		variant: _
	}, C = qm(S), w = a && !c && d, T = n.useRef(null), E = (e, t) => {
		T.current && T.current.adjustStyleForScrollbar(e, { direction: x ? "rtl" : "ltr" }), h && h(e, t);
	}, D = (e) => {
		e.key === "Tab" && (e.preventDefault(), u && u(e, "tabKeyDown"));
	}, O = -1;
	n.Children.map(o, (e, t) => {
		/*#__PURE__*/ n.isValidElement(e) && (e.props.disabled || (_ === "selectedMenu" && e.props.selected || O === -1) && (O = t));
	});
	let k = {
		slots: v,
		slotProps: {
			list: l,
			transition: g,
			paper: f,
			...y
		}
	}, A = Nu({
		elementType: v.root,
		externalSlotProps: y.root,
		ownerState: S,
		className: [C.root, s]
	}), [j, M] = Q("paper", {
		className: C.paper,
		elementType: Ym,
		externalForwardedProps: k,
		shouldForwardComponentProp: !0,
		ownerState: S
	}), [N, P] = Q("list", {
		className: U(C.list, l.className),
		elementType: Xm,
		shouldForwardComponentProp: !0,
		externalForwardedProps: k,
		getSlotProps: (e) => ({
			...e,
			onKeyDown: (t) => {
				D(t), e.onKeyDown?.(t);
			}
		}),
		ownerState: S
	}), F = typeof k.slotProps.transition == "function" ? k.slotProps.transition(S) : k.slotProps.transition;
	return /*#__PURE__*/ e(Jm, {
		onClose: u,
		anchorOrigin: {
			vertical: "bottom",
			horizontal: x ? "right" : "left"
		},
		transformOrigin: x ? Gm : Km,
		slots: {
			root: v.root,
			paper: j,
			backdrop: v.backdrop,
			...v.transition && { transition: v.transition }
		},
		slotProps: {
			root: A,
			paper: M,
			backdrop: typeof y.backdrop == "function" ? y.backdrop(S) : y.backdrop,
			transition: {
				...F,
				onEntering: (...e) => {
					E(...e), F?.onEntering?.(...e);
				}
			}
		},
		open: d,
		ref: r,
		transitionDuration: m,
		ownerState: S,
		...b,
		classes: p,
		children: /*#__PURE__*/ e(N, {
			actions: T,
			autoFocus: a && (O === -1 || c),
			autoFocusItem: w,
			variant: _,
			...P,
			children: o
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/NativeSelect/nativeSelectClasses.js
function Qm(e) {
	return W("MuiNativeSelect", e);
}
var $m = G("MuiNativeSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]), eh = (e) => {
	let { classes: t, variant: n, disabled: r, multiple: i, open: a, error: o } = e;
	return K({
		select: [
			"select",
			n,
			r && "disabled",
			i && "multiple",
			o && "error"
		],
		icon: [
			"icon",
			`icon${Y(n)}`,
			a && "iconOpen",
			r && "disabled"
		]
	}, Qm, t);
}, th = J("select", { name: "MuiNativeSelect" })(({ theme: e }) => ({
	MozAppearance: "none",
	WebkitAppearance: "none",
	userSelect: "none",
	borderRadius: 0,
	cursor: "pointer",
	"&:focus": { borderRadius: 0 },
	[`&.${$m.disabled}`]: { cursor: "default" },
	"&[multiple]": { height: "auto" },
	"&:not([multiple]) option, &:not([multiple]) optgroup": { backgroundColor: (e.vars || e).palette.background.paper },
	variants: [
		{
			props: ({ ownerState: e }) => e.variant !== "filled" && e.variant !== "outlined",
			style: { "&&&": {
				paddingRight: 24,
				minWidth: 16
			} }
		},
		{
			props: { variant: "filled" },
			style: { "&&&": { paddingRight: 32 } }
		},
		{
			props: { variant: "outlined" },
			style: {
				borderRadius: (e.vars || e).shape.borderRadius,
				"&:focus": { borderRadius: (e.vars || e).shape.borderRadius },
				"&&&": { paddingRight: 32 }
			}
		}
	]
})), nh = J(th, {
	name: "MuiNativeSelect",
	slot: "Select",
	shouldForwardProp: so,
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.select,
			t[n.variant],
			n.error && t.error,
			{ [`&.${$m.multiple}`]: t.multiple }
		];
	}
})({}), rh = J("svg", { name: "MuiNativeSelect" })(({ theme: e }) => ({
	position: "absolute",
	right: 0,
	top: "calc(50% - .5em)",
	pointerEvents: "none",
	color: (e.vars || e).palette.action.active,
	[`&.${$m.disabled}`]: { color: (e.vars || e).palette.action.disabled },
	variants: [
		{
			props: ({ ownerState: e }) => e.open,
			style: { transform: "rotate(180deg)" }
		},
		{
			props: { variant: "filled" },
			style: { right: 7 }
		},
		{
			props: { variant: "outlined" },
			style: { right: 7 }
		}
	]
})), ih = J(rh, {
	name: "MuiNativeSelect",
	slot: "Icon",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.icon,
			n.variant && t[`icon${Y(n.variant)}`],
			n.open && t.iconOpen
		];
	}
})({}), ah = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let { className: a, disabled: o, error: s, IconComponent: c, inputRef: l, variant: u = "standard", ...d } = r, f = {
		...r,
		disabled: o,
		variant: u,
		error: s
	}, p = eh(f);
	return /*#__PURE__*/ t(n.Fragment, { children: [/*#__PURE__*/ e(nh, {
		ownerState: f,
		className: U(p.select, a),
		disabled: o,
		ref: l || i,
		...d
	}), r.multiple ? null : /*#__PURE__*/ e(ih, {
		as: c,
		ownerState: f,
		className: p.icon
	})] });
});
//#endregion
//#region node_modules/@mui/material/esm/Select/selectClasses.js
function oh(e) {
	return W("MuiSelect", e);
}
var sh = G("MuiSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"focused",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
//#endregion
//#region node_modules/@mui/material/esm/Select/utils/getOpenInteractionType.js
function ch(e) {
	return e ? e.type === "mousedown" || e.type === "pointerdown" || e.type === "touchstart" ? "pointer" : e.type === "keydown" || e.type === "click" && e.detail === 0 ? "keyboard" : null : null;
}
//#endregion
//#region node_modules/@mui/material/esm/Select/utils/isEmpty.js
function lh(e) {
	return e == null || typeof e == "string" && !e.trim();
}
//#endregion
//#region node_modules/@mui/material/esm/Select/utils/areEqualValues.js
function uh(e, t) {
	return typeof t == "object" && t ? e === t : String(e) === String(t);
}
var dh = (/* @__PURE__ */ n.createContext(null)).Provider, fh, ph = J(th, {
	name: "MuiSelect",
	slot: "Select",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			{ [`&.${sh.select}`]: t.select },
			{ [`&.${sh.select}`]: t[n.variant] },
			{ [`&.${sh.error}`]: t.error },
			{ [`&.${sh.multiple}`]: t.multiple }
		];
	}
})({ [`&.${sh.select}`]: {
	height: "auto",
	minHeight: "1.4375em",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	overflow: "hidden"
} }), mh = J(rh, {
	name: "MuiSelect",
	slot: "Icon",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.icon,
			n.variant && t[`icon${Y(n.variant)}`],
			n.open && t.iconOpen
		];
	}
})({}), hh = J("input", {
	shouldForwardProp: (e) => oo(e) && e !== "classes",
	name: "MuiSelect",
	slot: "NativeInput"
})({
	bottom: 0,
	left: 0,
	position: "absolute",
	opacity: 0,
	pointerEvents: "none",
	width: "100%",
	boxSizing: "border-box"
}), gh = (e) => {
	let { classes: t, variant: n, disabled: r, multiple: i, open: a, error: o } = e;
	return K({
		select: [
			"select",
			n,
			r && "disabled",
			i && "multiple",
			o && "error"
		],
		icon: [
			"icon",
			`icon${Y(n)}`,
			a && "iconOpen",
			r && "disabled"
		],
		nativeInput: ["nativeInput"]
	}, oh, t);
}, _h = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let { "aria-describedby": a, "aria-label": o, autoFocus: s, autoWidth: c, children: l, className: u, defaultOpen: d, defaultValue: f, disabled: p, displayEmpty: m, error: h = !1, IconComponent: g, inputRef: _, labelId: v, MenuProps: y = {}, multiple: b, name: x, onBlur: S, onChange: C, onClose: w, onFocus: T, onKeyDown: E, onMouseDown: D, onOpen: O, open: k, readOnly: A, renderValue: j, required: M, SelectDisplayProps: N = {}, tabIndex: P, type: F, value: ee, variant: I = "standard", ...te } = r, [L, ne] = Io({
		controlled: ee,
		default: f,
		name: "Select"
	}), [re, R] = Io({
		controlled: k,
		default: d,
		name: "Select"
	}), ie = n.useRef(null), z = n.useRef(null), [ae, oe] = n.useState(null), { current: se } = n.useRef(k != null), [ce, le] = n.useState(), [ue, de] = n.useState(null), B = Bo(i, _), V = n.useCallback((e) => {
		z.current = e, e && oe(e);
	}, []), H = ae?.parentNode;
	n.useImperativeHandle(B, () => ({
		focus: () => {
			z.current.focus();
		},
		node: ie.current,
		value: L
	}), [L]);
	let fe = ae !== null && re;
	n.useEffect(() => {
		if (!fe || !H || c || typeof ResizeObserver > "u") return;
		let e = new ResizeObserver(() => {
			le(H.clientWidth);
		});
		return e.observe(H), () => {
			e.disconnect();
		};
	}, [
		fe,
		H,
		c
	]), n.useEffect(() => {
		d && re && ae && !se && (le(c ? null : H.clientWidth), z.current.focus());
	}, [ae, c]), n.useEffect(() => {
		s && z.current.focus();
	}, [s]), n.useEffect(() => {
		if (!v) return;
		let e = ko(z.current).getElementById(v);
		if (e) {
			let t = () => {
				getSelection().isCollapsed && z.current.focus();
			};
			return e.addEventListener("click", t), () => {
				e.removeEventListener("click", t);
			};
		}
	}, [v]);
	let pe = (e, t) => {
		e ? (de(ch(t)), O && O(t)) : (de(null), w && w(t)), se || (le(c ? null : H.clientWidth), R(e));
	}, me = (e) => {
		D?.(e), e.button === 0 && (e.preventDefault(), z.current.focus(), pe(!0, e));
	}, he = (e) => {
		pe(!1, e);
	}, ge = n.Children.toArray(l), _e = (e) => {
		let t = ge.find((t) => t.props.value === e.target.value);
		t !== void 0 && (ne(t.props.value), C && C(e, t));
	}, ve = (e) => (t) => {
		let n;
		if (t.currentTarget.hasAttribute("tabindex")) {
			if (b) {
				n = Array.isArray(L) ? L.slice() : [];
				let t = L.indexOf(e.props.value);
				t === -1 ? n.push(e.props.value) : n.splice(t, 1);
			} else n = e.props.value;
			if (e.props.onClick && e.props.onClick(t), L !== n && (ne(n), C)) {
				let r = t.nativeEvent || t, i = new r.constructor(r.type, r);
				Object.defineProperty(i, "target", {
					writable: !0,
					value: {
						value: n,
						name: x
					}
				}), C(i, e);
			}
			b || pe(!1, t);
		}
	}, ye = (e) => {
		A || ([
			" ",
			"ArrowUp",
			"ArrowDown",
			"Enter"
		].includes(e.key) && (e.preventDefault(), pe(!0, e)), E?.(e));
	}, be = (e) => {
		!fe && S && (Object.defineProperty(e, "target", {
			writable: !0,
			value: {
				value: L,
				name: x
			}
		}), S(e));
	};
	delete te["aria-invalid"];
	let xe, Se, Ce = [], we = !1;
	(dd({ value: L }) || m) && (j ? xe = j(L) : we = !0);
	let Te = ge.map((e) => {
		if (!/*#__PURE__*/ n.isValidElement(e)) return null;
		let t;
		if (b) {
			if (!Array.isArray(L)) throw Error(Bt(2));
			t = L.some((t) => uh(t, e.props.value)), t && we && Ce.push(e.props.children);
		} else t = uh(L, e.props.value), t && we && (Se = e.props.children);
		return /*#__PURE__*/ n.cloneElement(e, {
			"aria-selected": t ? "true" : "false",
			onClick: ve(e),
			onKeyUp: (t) => {
				t.key === " " && t.preventDefault(), e.props.onKeyUp && e.props.onKeyUp(t);
			},
			role: "option",
			selected: t,
			value: void 0,
			"data-value": e.props.value
		});
	});
	we && (xe = b ? Ce.length === 0 ? null : Ce.reduce((e, t, n) => (e.push(t), n < Ce.length - 1 && e.push(", "), e), []) : Se);
	let Ee = ce;
	!c && se && ae && (Ee = H.clientWidth);
	let De;
	De = P === void 0 ? p ? null : 0 : P;
	let Oe = N.id || (x ? `mui-component-select-${x}` : void 0), ke = {
		...r,
		variant: I,
		value: L,
		open: fe,
		error: h
	}, Ae = gh(ke), je = {
		...y.PaperProps,
		...typeof y.slotProps?.paper == "function" ? y.slotProps.paper(ke) : y.slotProps?.paper
	}, Me = {
		...y.MenuListProps,
		...typeof y.slotProps?.list == "function" ? y.slotProps.list(ke) : y.slotProps?.list
	}, Ne = ki();
	return /*#__PURE__*/ t(n.Fragment, { children: [
		/*#__PURE__*/ e(ph, {
			as: "div",
			ref: V,
			tabIndex: De,
			role: "combobox",
			"aria-controls": fe ? Ne : void 0,
			"aria-disabled": p ? "true" : void 0,
			"aria-expanded": fe ? "true" : "false",
			"aria-haspopup": "listbox",
			"aria-label": o,
			"aria-labelledby": [v, Oe].filter(Boolean).join(" ") || void 0,
			"aria-describedby": a,
			"aria-required": M ? "true" : void 0,
			"aria-invalid": h ? "true" : void 0,
			onKeyDown: ye,
			onMouseDown: p || A ? null : me,
			onBlur: be,
			onFocus: T,
			...N,
			ownerState: ke,
			className: U(N.className, Ae.select, u),
			id: Oe,
			children: lh(xe) ? fh ||= /*#__PURE__*/ e("span", {
				className: "notranslate",
				"aria-hidden": !0,
				children: "​"
			}) : xe
		}),
		/*#__PURE__*/ e(hh, {
			"aria-invalid": h,
			value: Array.isArray(L) ? L.join(",") : L,
			name: x,
			ref: ie,
			"aria-hidden": !0,
			onChange: _e,
			tabIndex: -1,
			disabled: p,
			className: Ae.nativeInput,
			autoFocus: s,
			required: M,
			...te,
			ownerState: ke
		}),
		/*#__PURE__*/ e(mh, {
			as: g,
			className: Ae.icon,
			ownerState: ke
		}),
		/*#__PURE__*/ e(dh, {
			value: ue,
			children: /*#__PURE__*/ e(Zm, {
				id: `menu-${x || ""}`,
				anchorEl: H,
				open: fe,
				onClose: he,
				anchorOrigin: {
					vertical: "bottom",
					horizontal: "center"
				},
				transformOrigin: {
					vertical: "top",
					horizontal: "center"
				},
				...y,
				slotProps: {
					...y.slotProps,
					list: {
						"aria-labelledby": v,
						role: "listbox",
						"aria-multiselectable": b ? "true" : void 0,
						disableListWrap: !0,
						id: Ne,
						...Me
					},
					paper: {
						...je,
						style: {
							minWidth: Ee,
							...je == null ? null : je.style
						}
					}
				},
				children: Te
			})
		})
	] });
}), vh, yh = J("fieldset", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: so
})({
	textAlign: "left",
	position: "absolute",
	bottom: 0,
	right: 0,
	top: -5,
	left: 0,
	margin: 0,
	padding: "0 8px",
	pointerEvents: "none",
	borderRadius: "inherit",
	borderStyle: "solid",
	borderWidth: 1,
	overflow: "hidden",
	minWidth: "0%"
}), bh = J("legend", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: so
})(X(({ theme: e }) => ({
	float: "unset",
	width: "auto",
	overflow: "hidden",
	variants: [
		{
			props: ({ ownerState: e }) => !e.withLabel,
			style: {
				padding: 0,
				lineHeight: "11px",
				transition: e.transitions.create("width", {
					duration: 150,
					easing: e.transitions.easing.easeOut
				})
			}
		},
		{
			props: ({ ownerState: e }) => e.withLabel,
			style: {
				display: "block",
				padding: 0,
				height: 11,
				fontSize: "0.75em",
				visibility: "hidden",
				maxWidth: .01,
				transition: e.transitions.create("max-width", {
					duration: 50,
					easing: e.transitions.easing.easeOut
				}),
				whiteSpace: "nowrap",
				"& > span": {
					paddingLeft: 5,
					paddingRight: 5,
					display: "inline-block",
					opacity: 0,
					visibility: "visible"
				}
			}
		},
		{
			props: ({ ownerState: e }) => e.withLabel && e.notched,
			style: {
				maxWidth: "100%",
				transition: e.transitions.create("max-width", {
					duration: 100,
					easing: e.transitions.easing.easeOut,
					delay: 50
				})
			}
		}
	]
})));
function xh(t) {
	let { children: n, classes: r, className: i, label: a, notched: o, ...s } = t, c = a != null && a !== "", l = {
		...t,
		notched: o,
		withLabel: c
	};
	return /*#__PURE__*/ e(yh, {
		"aria-hidden": !0,
		className: i,
		ownerState: l,
		...s,
		children: /*#__PURE__*/ e(bh, {
			ownerState: l,
			children: c ? /*#__PURE__*/ e("span", { children: a }) : vh ||= /*#__PURE__*/ e("span", {
				className: "notranslate",
				"aria-hidden": !0,
				children: "​"
			})
		})
	});
}
//#endregion
//#region node_modules/@mui/material/esm/OutlinedInput/OutlinedInput.js
var Sh = (e) => {
	let { classes: t } = e, n = K({
		root: ["root"],
		notchedOutline: ["notchedOutline"],
		input: ["input"]
	}, Dd, t);
	return {
		...t,
		...n
	};
}, Ch = J(xd, {
	shouldForwardProp: (e) => so(e) || e === "classes",
	name: "MuiOutlinedInput",
	slot: "Root",
	overridesResolver: vd
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		position: "relative",
		borderRadius: (e.vars || e).shape.borderRadius,
		[`&:hover .${Od.notchedOutline}`]: { borderColor: (e.vars || e).palette.text.primary },
		"@media (hover: none)": { [`&:hover .${Od.notchedOutline}`]: { borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, .23) : t } },
		[`&.${Od.focused} .${Od.notchedOutline}`]: { borderWidth: 2 },
		variants: [
			...Object.entries(e.palette).filter(Qs()).map(([t]) => ({
				props: { color: t },
				style: { [`&.${Od.focused} .${Od.notchedOutline}`]: { borderColor: (e.vars || e).palette[t].main } }
			})),
			{
				props: {},
				style: {
					[`&.${Od.error} .${Od.notchedOutline}`]: { borderColor: (e.vars || e).palette.error.main },
					[`&.${Od.disabled} .${Od.notchedOutline}`]: { borderColor: (e.vars || e).palette.action.disabled }
				}
			},
			{
				props: ({ ownerState: e }) => e.startAdornment,
				style: { paddingLeft: 14 }
			},
			{
				props: ({ ownerState: e }) => e.endAdornment,
				style: { paddingRight: 14 }
			},
			{
				props: ({ ownerState: e }) => e.multiline,
				style: { padding: "16.5px 14px" }
			},
			{
				props: ({ ownerState: e, size: t }) => e.multiline && t === "small",
				style: { padding: "8.5px 14px" }
			}
		]
	};
})), wh = J(xh, {
	name: "MuiOutlinedInput",
	slot: "NotchedOutline"
})(X(({ theme: e }) => {
	let t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return { borderColor: e.vars ? e.alpha(e.vars.palette.common.onBackground, .23) : t };
})), Th = J(Sd, {
	name: "MuiOutlinedInput",
	slot: "Input",
	overridesResolver: yd
})(X(({ theme: e }) => ({
	padding: "16.5px 14px",
	...!e.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
		caretColor: e.palette.mode === "light" ? null : "#fff",
		borderRadius: "inherit"
	} },
	...e.vars && {
		"&:-webkit-autofill": { borderRadius: "inherit" },
		[e.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: { padding: "8.5px 14px" }
		},
		{
			props: ({ ownerState: e }) => e.multiline,
			style: { padding: 0 }
		},
		{
			props: ({ ownerState: e }) => e.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState: e }) => e.endAdornment,
			style: { paddingRight: 0 }
		}
	]
}))), Eh = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiOutlinedInput"
	}), { components: o = {}, fullWidth: s = !1, inputComponent: c = "input", label: l, multiline: u = !1, notched: d, slots: f = {}, slotProps: p = {}, type: m = "text", ...h } = a, g = Sh(a), _ = sd(), v = ad({
		props: a,
		muiFormControl: _,
		states: [
			"color",
			"disabled",
			"error",
			"focused",
			"hiddenLabel",
			"size",
			"required"
		]
	}), y = {
		...a,
		color: v.color || "primary",
		disabled: v.disabled,
		error: v.error,
		focused: v.focused,
		formControl: _,
		fullWidth: s,
		hiddenLabel: v.hiddenLabel,
		multiline: u,
		size: v.size,
		type: m
	}, b = f.root ?? o.Root ?? Ch, x = f.input ?? o.Input ?? Th, [S, C] = Q("notchedOutline", {
		elementType: wh,
		className: g.notchedOutline,
		shouldForwardComponentProp: !0,
		ownerState: y,
		externalForwardedProps: {
			slots: f,
			slotProps: p
		},
		additionalProps: { label: l != null && l !== "" && v.required ? /*#__PURE__*/ t(n.Fragment, { children: [
			l,
			" ",
			"*"
		] }) : l }
	});
	return /*#__PURE__*/ e(wd, {
		slots: {
			root: b,
			input: x
		},
		slotProps: p,
		renderSuffix: (t) => /*#__PURE__*/ e(S, {
			...C,
			notched: d === void 0 ? !!(t.startAdornment || t.filled || t.focused) : d
		}),
		fullWidth: s,
		inputComponent: c,
		multiline: u,
		ref: i,
		type: m,
		...h,
		classes: {
			...g,
			notchedOutline: null
		}
	});
});
Eh.muiName = "Input";
//#endregion
//#region node_modules/@mui/material/esm/Select/Select.js
var Dh = (e) => {
	let { classes: t } = e, n = K({ root: ["root"] }, oh, t);
	return {
		...t,
		...n
	};
}, Oh = {
	name: "MuiSelect",
	slot: "Root",
	shouldForwardProp: (e) => so(e) && e !== "variant"
}, kh = J(fm, Oh)(""), Ah = J(Eh, Oh)(""), jh = J(Ip, Oh)(""), Mh = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		name: "MuiSelect",
		props: t
	}), { autoWidth: a = !1, children: o, classes: s = {}, className: c, defaultOpen: l = !1, displayEmpty: u = !1, IconComponent: d = jd, id: f, input: p, inputProps: m, label: h, labelId: g, MenuProps: _, multiple: v = !1, native: y = !1, onClose: b, onOpen: x, open: S, renderValue: C, SelectDisplayProps: w, variant: T = "outlined", ...E } = i, D = y ? ah : _h, O = ad({
		props: i,
		muiFormControl: sd(),
		states: ["variant", "error"]
	}), k = O.variant || T, A = {
		...i,
		variant: k,
		classes: s
	}, j = Dh(A), { root: M, ...N } = j, P = p || {
		standard: /*#__PURE__*/ e(kh, { ownerState: A }),
		outlined: /*#__PURE__*/ e(Ah, {
			label: h,
			ownerState: A
		}),
		filled: /*#__PURE__*/ e(jh, { ownerState: A })
	}[k], F = Bo(r, Pu(P));
	return /*#__PURE__*/ e(n.Fragment, { children: /*#__PURE__*/ n.cloneElement(P, {
		inputComponent: D,
		inputProps: {
			children: o,
			error: O.error,
			IconComponent: d,
			variant: k,
			type: void 0,
			multiple: v,
			...y ? { id: f } : {
				autoWidth: a,
				defaultOpen: l,
				displayEmpty: u,
				labelId: g,
				MenuProps: _,
				onClose: b,
				onOpen: x,
				open: S,
				renderValue: C,
				SelectDisplayProps: {
					id: f,
					...w
				}
			},
			...m,
			classes: m ? cn(N, m.classes) : N,
			...p ? p.props.inputProps : {}
		},
		...(v && y || u) && k === "outlined" ? { notched: !0 } : {},
		ref: F,
		className: U(P.props.className, c, j.root),
		...!p && { variant: k },
		...E
	}) });
});
Mh.muiName = "Select";
//#endregion
//#region node_modules/@mui/material/esm/Tooltip/tooltipClasses.js
function Nh(e) {
	return W("MuiTooltip", e);
}
var Ph = G("MuiTooltip", [
	"popper",
	"popperInteractive",
	"popperArrow",
	"popperClose",
	"tooltip",
	"tooltipArrow",
	"touch",
	"tooltipPlacementLeft",
	"tooltipPlacementRight",
	"tooltipPlacementTop",
	"tooltipPlacementBottom",
	"arrow"
]);
//#endregion
//#region node_modules/@mui/material/esm/Tooltip/Tooltip.js
function Fh(e) {
	return Math.round(e * 1e5) / 1e5;
}
var Ih = (e) => {
	let { classes: t, disableInteractive: n, arrow: r, touch: i, placement: a } = e;
	return K({
		popper: [
			"popper",
			!n && "popperInteractive",
			r && "popperArrow"
		],
		tooltip: [
			"tooltip",
			r && "tooltipArrow",
			i && "touch",
			`tooltipPlacement${Y(a.split("-")[0])}`
		],
		arrow: ["arrow"]
	}, Nh, t);
}, Lh = J(Gu, {
	name: "MuiTooltip",
	slot: "Popper",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.popper,
			!n.disableInteractive && t.popperInteractive,
			n.arrow && t.popperArrow,
			!n.open && t.popperClose
		];
	}
})(X(({ theme: e }) => ({
	zIndex: (e.vars || e).zIndex.tooltip,
	pointerEvents: "none",
	variants: [
		{
			props: ({ ownerState: e }) => !e.disableInteractive,
			style: { pointerEvents: "auto" }
		},
		{
			props: ({ open: e }) => !e,
			style: { pointerEvents: "none" }
		},
		{
			props: ({ ownerState: e }) => e.arrow,
			style: {
				[`&[data-popper-placement*="bottom"] .${Ph.arrow}`]: {
					top: 0,
					marginTop: "-0.71em",
					"&::before": { transformOrigin: "0 100%" }
				},
				[`&[data-popper-placement*="top"] .${Ph.arrow}`]: {
					bottom: 0,
					marginBottom: "-0.71em",
					"&::before": { transformOrigin: "100% 0" }
				},
				[`&[data-popper-placement*="right"] .${Ph.arrow}`]: {
					height: "1em",
					width: "0.71em",
					"&::before": { transformOrigin: "100% 100%" }
				},
				[`&[data-popper-placement*="left"] .${Ph.arrow}`]: {
					height: "1em",
					width: "0.71em",
					"&::before": { transformOrigin: "0 0" }
				}
			}
		},
		{
			props: ({ ownerState: e }) => e.arrow && !e.isRtl,
			style: { [`&[data-popper-placement*="right"] .${Ph.arrow}`]: {
				left: 0,
				marginLeft: "-0.71em"
			} }
		},
		{
			props: ({ ownerState: e }) => e.arrow && !!e.isRtl,
			style: { [`&[data-popper-placement*="right"] .${Ph.arrow}`]: {
				right: 0,
				marginRight: "-0.71em"
			} }
		},
		{
			props: ({ ownerState: e }) => e.arrow && !e.isRtl,
			style: { [`&[data-popper-placement*="left"] .${Ph.arrow}`]: {
				right: 0,
				marginRight: "-0.71em"
			} }
		},
		{
			props: ({ ownerState: e }) => e.arrow && !!e.isRtl,
			style: { [`&[data-popper-placement*="left"] .${Ph.arrow}`]: {
				left: 0,
				marginLeft: "-0.71em"
			} }
		}
	]
}))), Rh = J("div", {
	name: "MuiTooltip",
	slot: "Tooltip",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.tooltip,
			n.touch && t.touch,
			n.arrow && t.tooltipArrow,
			t[`tooltipPlacement${Y(n.placement.split("-")[0])}`]
		];
	}
})(X(({ theme: e }) => ({
	backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : e.alpha(e.palette.grey[700], .92),
	borderRadius: (e.vars || e).shape.borderRadius,
	color: (e.vars || e).palette.common.white,
	fontFamily: e.typography.fontFamily,
	padding: "4px 8px",
	fontSize: e.typography.pxToRem(11),
	maxWidth: 300,
	margin: 2,
	wordWrap: "break-word",
	fontWeight: e.typography.fontWeightMedium,
	[`.${Ph.popper}[data-popper-placement*="left"] &`]: { transformOrigin: "right center" },
	[`.${Ph.popper}[data-popper-placement*="right"] &`]: { transformOrigin: "left center" },
	[`.${Ph.popper}[data-popper-placement*="top"] &`]: {
		transformOrigin: "center bottom",
		marginBottom: "14px"
	},
	[`.${Ph.popper}[data-popper-placement*="bottom"] &`]: {
		transformOrigin: "center top",
		marginTop: "14px"
	},
	variants: [
		{
			props: ({ ownerState: e }) => e.arrow,
			style: {
				position: "relative",
				margin: 0
			}
		},
		{
			props: ({ ownerState: e }) => e.touch,
			style: {
				padding: "8px 16px",
				fontSize: e.typography.pxToRem(14),
				lineHeight: `${Fh(16 / 14)}em`,
				fontWeight: e.typography.fontWeightRegular
			}
		},
		{
			props: ({ ownerState: e }) => !e.isRtl,
			style: {
				[`.${Ph.popper}[data-popper-placement*="left"] &`]: { marginRight: "14px" },
				[`.${Ph.popper}[data-popper-placement*="right"] &`]: { marginLeft: "14px" }
			}
		},
		{
			props: ({ ownerState: e }) => !e.isRtl && e.touch,
			style: {
				[`.${Ph.popper}[data-popper-placement*="left"] &`]: { marginRight: "24px" },
				[`.${Ph.popper}[data-popper-placement*="right"] &`]: { marginLeft: "24px" }
			}
		},
		{
			props: ({ ownerState: e }) => !!e.isRtl,
			style: {
				[`.${Ph.popper}[data-popper-placement*="left"] &`]: { marginLeft: "14px" },
				[`.${Ph.popper}[data-popper-placement*="right"] &`]: { marginRight: "14px" }
			}
		},
		{
			props: ({ ownerState: e }) => !!e.isRtl && e.touch,
			style: {
				[`.${Ph.popper}[data-popper-placement*="left"] &`]: { marginLeft: "24px" },
				[`.${Ph.popper}[data-popper-placement*="right"] &`]: { marginRight: "24px" }
			}
		},
		{
			props: ({ ownerState: e }) => e.touch,
			style: { [`.${Ph.popper}[data-popper-placement*="top"] &`]: { marginBottom: "24px" } }
		},
		{
			props: ({ ownerState: e }) => e.touch,
			style: { [`.${Ph.popper}[data-popper-placement*="bottom"] &`]: { marginTop: "24px" } }
		}
	]
}))), zh = J("span", {
	name: "MuiTooltip",
	slot: "Arrow"
})(X(({ theme: e }) => ({
	overflow: "hidden",
	position: "absolute",
	width: "1em",
	height: "0.71em",
	boxSizing: "border-box",
	color: e.vars ? e.vars.palette.Tooltip.bg : e.alpha(e.palette.grey[700], .9),
	"&::before": {
		content: "\"\"",
		margin: "auto",
		display: "block",
		width: "100%",
		height: "100%",
		backgroundColor: "currentColor",
		transform: "rotate(45deg)"
	}
}))), Bh = !1, Vh = new hs(), Hh = {
	x: 0,
	y: 0
};
function Uh(e, t) {
	return (n, ...r) => {
		t && t(n, ...r), e(n, ...r);
	};
}
var Wh = /*#__PURE__*/ n.forwardRef(function(r, i) {
	let a = Z({
		props: r,
		name: "MuiTooltip"
	}), { arrow: o = !1, children: s, classes: c, components: l = {}, componentsProps: u = {}, describeChild: d = !1, disableFocusListener: f = !1, disableHoverListener: p = !1, disableInteractive: m = !1, disableTouchListener: h = !1, enterDelay: g = 100, enterNextDelay: _ = 0, enterTouchDelay: v = 700, followCursor: y = !1, id: b, leaveDelay: x = 0, leaveTouchDelay: S = 1500, onClose: C, onOpen: w, open: T, placement: E = "bottom", PopperComponent: D, PopperProps: O = {}, slotProps: k = {}, slots: A = {}, title: j, TransitionComponent: M, TransitionProps: N, ...P } = a, F = /*#__PURE__*/ n.isValidElement(s) ? s : /*#__PURE__*/ e("span", { children: s }), ee = ao(), I = xi(), [te, L] = n.useState(), [ne, re] = n.useState(null), R = n.useRef(!1), ie = m || y, z = gs(), ae = gs(), oe = gs(), se = gs(), [ce, le] = Io({
		controlled: T,
		default: !1,
		name: "Tooltip",
		state: "open"
	}), ue = ce, de = Po(b), B = n.useRef(), V = Ro(() => {
		B.current !== void 0 && (document.body.style.WebkitUserSelect = B.current, B.current = void 0), se.clear();
	});
	n.useEffect(() => V, [V]);
	let H = (e) => {
		Vh.clear(), Bh = !0, le(!0), w && !ue && w(e);
	}, fe = Ro((e) => {
		Vh.start(800 + x, () => {
			Bh = !1;
		}), le(!1), C && ue && C(e), z.start(ee.transitions.duration.shortest, () => {
			R.current = !1;
		});
	}), pe = (e) => {
		R.current && e.type !== "touchstart" || (te && te.removeAttribute("title"), ae.clear(), oe.clear(), g || Bh && _ ? ae.start(Bh ? _ : g, () => {
			H(e);
		}) : H(e));
	}, me = (e) => {
		ae.clear(), oe.start(x, () => {
			fe(e);
		});
	}, [, he] = n.useState(!1), ge = (e) => {
		let t = e?.target ?? te;
		if (!t || !js(t)) {
			he(!1);
			let n = e ?? new Event("blur");
			!e && t && (Object.defineProperty(n, "target", { value: t }), Object.defineProperty(n, "currentTarget", { value: t })), me(n);
		}
	}, _e = (e) => {
		te || L(e.currentTarget), js(e.target) && (he(!0), pe(e));
	}, ve = (e) => {
		R.current = !0;
		let t = F.props;
		t.onTouchStart && t.onTouchStart(e);
	}, ye = (e) => {
		ve(e), oe.clear(), z.clear(), V(), B.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", se.start(v, () => {
			document.body.style.WebkitUserSelect = B.current, pe(e);
		});
	}, be = (e) => {
		F.props.onTouchEnd && F.props.onTouchEnd(e), V(), oe.start(S, () => {
			fe(e);
		});
	};
	n.useEffect(() => {
		if (!ue) return;
		function e(e) {
			e.key === "Escape" && fe(e);
		}
		return document.addEventListener("keydown", e), () => {
			document.removeEventListener("keydown", e);
		};
	}, [fe, ue]);
	let xe = Bo(Pu(F), L, i);
	!j && j !== 0 && (ue = !1);
	let Se = n.useRef(), Ce = (e) => {
		let t = F.props;
		t.onMouseMove && t.onMouseMove(e), Hh = {
			x: e.clientX,
			y: e.clientY
		}, Se.current && Se.current.update();
	}, we = {}, Te = typeof j == "string";
	d ? (we.title = !ue && Te && !p ? j : null, we["aria-describedby"] = ue ? de : null) : (we["aria-label"] = Te ? j : null, we["aria-labelledby"] = ue && !Te ? de : null);
	let Ee = {
		...we,
		...P,
		...F.props,
		className: U(P.className, F.props.className),
		onTouchStart: ve,
		ref: xe,
		...y ? { onMouseMove: Ce } : {}
	}, De = {};
	h || (Ee.onTouchStart = ye, Ee.onTouchEnd = be), p || (Ee.onMouseOver = Uh(pe, Ee.onMouseOver), Ee.onMouseLeave = Uh(me, Ee.onMouseLeave), ie || (De.onMouseOver = pe, De.onMouseLeave = me)), f || (Ee.onFocus = Uh(_e, Ee.onFocus), Ee.onBlur = Uh(ge, Ee.onBlur), ie || (De.onFocus = _e, De.onBlur = ge));
	let Oe = {
		...a,
		isRtl: I,
		arrow: o,
		disableInteractive: ie,
		placement: E,
		PopperComponentProp: D,
		touch: R.current
	}, ke = typeof k.popper == "function" ? k.popper(Oe) : k.popper, Ae = n.useMemo(() => {
		let e = [{
			name: "arrow",
			enabled: !!ne,
			options: {
				element: ne,
				padding: 4
			}
		}];
		return O.popperOptions?.modifiers && (e = e.concat(O.popperOptions.modifiers)), ke?.popperOptions?.modifiers && (e = e.concat(ke.popperOptions.modifiers)), {
			...O.popperOptions,
			...ke?.popperOptions,
			modifiers: e
		};
	}, [
		ne,
		O.popperOptions,
		ke?.popperOptions
	]), je = Ih(Oe), Me = typeof k.transition == "function" ? k.transition(Oe) : k.transition, Ne = {
		slots: {
			popper: l.Popper,
			transition: l.Transition ?? M,
			tooltip: l.Tooltip,
			arrow: l.Arrow,
			...A
		},
		slotProps: {
			arrow: k.arrow ?? u.arrow,
			popper: {
				...O,
				...ke ?? u.popper
			},
			tooltip: k.tooltip ?? u.tooltip,
			transition: {
				...N,
				...Me ?? u.transition
			}
		}
	}, [Pe, Fe] = Q("popper", {
		elementType: Lh,
		externalForwardedProps: Ne,
		ownerState: Oe,
		className: U(je.popper, O?.className)
	}), [Ie, Le] = Q("transition", {
		elementType: cm,
		externalForwardedProps: Ne,
		ownerState: Oe
	}), [Re, ze] = Q("tooltip", {
		elementType: Rh,
		className: je.tooltip,
		externalForwardedProps: Ne,
		ownerState: Oe
	}), [Be, Ve] = Q("arrow", {
		elementType: zh,
		className: je.arrow,
		externalForwardedProps: Ne,
		ownerState: Oe,
		ref: re
	});
	return /*#__PURE__*/ t(n.Fragment, { children: [/*#__PURE__*/ n.cloneElement(F, Ee), /*#__PURE__*/ e(Pe, {
		as: D ?? Gu,
		placement: E,
		anchorEl: y ? { getBoundingClientRect: () => ({
			top: Hh.y,
			left: Hh.x,
			right: Hh.x,
			bottom: Hh.y,
			width: 0,
			height: 0
		}) } : te,
		popperRef: Se,
		open: te ? ue : !1,
		id: de,
		transition: !0,
		...De,
		...Fe,
		popperOptions: Ae,
		children: ({ TransitionProps: n }) => /*#__PURE__*/ e(Ie, {
			timeout: ee.transitions.duration.shorter,
			...n,
			...Le,
			children: /*#__PURE__*/ t(Re, {
				...ze,
				children: [j, o ? /*#__PURE__*/ e(Be, { ...Ve }) : null]
			})
		})
	})] });
}), Gh = /*#__PURE__*/ n.createContext();
//#endregion
//#region node_modules/@mui/material/esm/Table/tableClasses.js
function Kh(e) {
	return W("MuiTable", e);
}
G("MuiTable", ["root", "stickyHeader"]);
//#endregion
//#region node_modules/@mui/material/esm/Table/Table.js
var qh = (e) => {
	let { classes: t, stickyHeader: n } = e;
	return K({ root: ["root", n && "stickyHeader"] }, Kh, t);
}, Jh = J("table", {
	name: "MuiTable",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [t.root, n.stickyHeader && t.stickyHeader];
	}
})(X(({ theme: e }) => ({
	display: "table",
	width: "100%",
	borderCollapse: "collapse",
	borderSpacing: 0,
	"& caption": {
		...e.typography.body2,
		padding: e.spacing(2),
		color: (e.vars || e).palette.text.secondary,
		textAlign: "left",
		captionSide: "bottom"
	},
	variants: [{
		props: ({ ownerState: e }) => e.stickyHeader,
		style: { borderCollapse: "separate" }
	}]
}))), Yh = "table", Xh = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiTable"
	}), { className: a, component: o = Yh, padding: s = "normal", size: c = "medium", stickyHeader: l = !1, ...u } = i, d = {
		...i,
		component: o,
		padding: s,
		size: c,
		stickyHeader: l
	}, f = qh(d), p = n.useMemo(() => ({
		padding: s,
		size: c,
		stickyHeader: l
	}), [
		s,
		c,
		l
	]);
	return /*#__PURE__*/ e(Gh.Provider, {
		value: p,
		children: /*#__PURE__*/ e(Jh, {
			as: o,
			role: o === Yh ? null : "table",
			ref: r,
			className: U(f.root, a),
			ownerState: d,
			...u
		})
	});
}), Zh = /*#__PURE__*/ n.createContext();
//#endregion
//#region node_modules/@mui/material/esm/TableBody/tableBodyClasses.js
function Qh(e) {
	return W("MuiTableBody", e);
}
G("MuiTableBody", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/TableBody/TableBody.js
var $h = (e) => {
	let { classes: t } = e;
	return K({ root: ["root"] }, Qh, t);
}, eg = J("tbody", {
	name: "MuiTableBody",
	slot: "Root"
})({ display: "table-row-group" }), tg = { variant: "body" }, ng = "tbody", rg = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiTableBody"
	}), { className: i, component: a = ng, ...o } = r, s = {
		...r,
		component: a
	}, c = $h(s);
	return /*#__PURE__*/ e(Zh.Provider, {
		value: tg,
		children: /*#__PURE__*/ e(eg, {
			className: U(c.root, i),
			as: a,
			ref: n,
			role: a === ng ? null : "rowgroup",
			ownerState: s,
			...o
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/TableCell/tableCellClasses.js
function ig(e) {
	return W("MuiTableCell", e);
}
var ag = G("MuiTableCell", [
	"root",
	"head",
	"body",
	"footer",
	"sizeSmall",
	"sizeMedium",
	"paddingCheckbox",
	"paddingNone",
	"alignLeft",
	"alignCenter",
	"alignRight",
	"alignJustify",
	"stickyHeader"
]), og = (e) => {
	let { classes: t, variant: n, align: r, padding: i, size: a, stickyHeader: o } = e;
	return K({ root: [
		"root",
		n,
		o && "stickyHeader",
		r !== "inherit" && `align${Y(r)}`,
		i !== "normal" && `padding${Y(i)}`,
		`size${Y(a)}`
	] }, ig, t);
}, sg = J("td", {
	name: "MuiTableCell",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			t[n.variant],
			t[`size${Y(n.size)}`],
			n.padding !== "normal" && t[`padding${Y(n.padding)}`],
			n.align !== "inherit" && t[`align${Y(n.align)}`],
			n.stickyHeader && t.stickyHeader
		];
	}
})(X(({ theme: e }) => ({
	...e.typography.body2,
	display: "table-cell",
	verticalAlign: "inherit",
	borderBottom: e.vars ? `1px solid ${e.vars.palette.TableCell.border}` : `1px solid
    ${e.palette.mode === "light" ? e.lighten(e.alpha(e.palette.divider, 1), .88) : e.darken(e.alpha(e.palette.divider, 1), .68)}`,
	textAlign: "left",
	padding: 16,
	variants: [
		{
			props: { variant: "head" },
			style: {
				color: (e.vars || e).palette.text.primary,
				lineHeight: e.typography.pxToRem(24),
				fontWeight: e.typography.fontWeightMedium
			}
		},
		{
			props: { variant: "body" },
			style: { color: (e.vars || e).palette.text.primary }
		},
		{
			props: { variant: "footer" },
			style: {
				color: (e.vars || e).palette.text.secondary,
				lineHeight: e.typography.pxToRem(21),
				fontSize: e.typography.pxToRem(12)
			}
		},
		{
			props: { size: "small" },
			style: {
				padding: "6px 16px",
				[`&.${ag.paddingCheckbox}`]: {
					width: 24,
					padding: "0 12px 0 16px",
					"& > *": { padding: 0 }
				}
			}
		},
		{
			props: { padding: "checkbox" },
			style: {
				width: 48,
				padding: "0 0 0 4px"
			}
		},
		{
			props: { padding: "none" },
			style: { padding: 0 }
		},
		{
			props: { align: "left" },
			style: { textAlign: "left" }
		},
		{
			props: { align: "center" },
			style: { textAlign: "center" }
		},
		{
			props: { align: "right" },
			style: {
				textAlign: "right",
				flexDirection: "row-reverse"
			}
		},
		{
			props: { align: "justify" },
			style: { textAlign: "justify" }
		},
		{
			props: ({ ownerState: e }) => e.stickyHeader,
			style: {
				position: "sticky",
				top: 0,
				zIndex: 2,
				backgroundColor: (e.vars || e).palette.background.default
			}
		}
	]
}))), cg = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiTableCell"
	}), { align: a = "inherit", className: o, component: s, padding: c, scope: l, size: u, sortDirection: d, variant: f, ...p } = i, m = n.useContext(Gh), h = n.useContext(Zh), g = h && h.variant === "head", _;
	_ = s || (g ? "th" : "td");
	let v = l;
	_ === "td" ? v = void 0 : !v && g && (v = "col");
	let y = f || h && h.variant, b = {
		...i,
		align: a,
		component: _,
		padding: c || (m && m.padding ? m.padding : "normal"),
		size: u || (m && m.size ? m.size : "medium"),
		sortDirection: d,
		stickyHeader: y === "head" && m && m.stickyHeader,
		variant: y
	}, x = og(b), S = null;
	return d && (S = d === "asc" ? "ascending" : "descending"), /*#__PURE__*/ e(sg, {
		as: _,
		ref: r,
		className: U(x.root, o),
		"aria-sort": S,
		scope: v,
		ownerState: b,
		...p
	});
});
//#endregion
//#region node_modules/@mui/material/esm/TableContainer/tableContainerClasses.js
function lg(e) {
	return W("MuiTableContainer", e);
}
G("MuiTableContainer", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/TableContainer/TableContainer.js
var ug = (e) => {
	let { classes: t } = e;
	return K({ root: ["root"] }, lg, t);
}, dg = J("div", {
	name: "MuiTableContainer",
	slot: "Root"
})({
	width: "100%",
	overflowX: "auto"
}), fg = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiTableContainer"
	}), { className: i, component: a = "div", ...o } = r, s = {
		...r,
		component: a
	}, c = ug(s);
	return /*#__PURE__*/ e(dg, {
		ref: n,
		as: a,
		className: U(c.root, i),
		ownerState: s,
		...o
	});
});
//#endregion
//#region node_modules/@mui/material/esm/TableHead/tableHeadClasses.js
function pg(e) {
	return W("MuiTableHead", e);
}
G("MuiTableHead", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/TableHead/TableHead.js
var mg = (e) => {
	let { classes: t } = e;
	return K({ root: ["root"] }, pg, t);
}, hg = J("thead", {
	name: "MuiTableHead",
	slot: "Root"
})({ display: "table-header-group" }), gg = { variant: "head" }, _g = "thead", vg = /*#__PURE__*/ n.forwardRef(function(t, n) {
	let r = Z({
		props: t,
		name: "MuiTableHead"
	}), { className: i, component: a = _g, ...o } = r, s = {
		...r,
		component: a
	}, c = mg(s);
	return /*#__PURE__*/ e(Zh.Provider, {
		value: gg,
		children: /*#__PURE__*/ e(hg, {
			as: a,
			className: U(c.root, i),
			ref: n,
			role: a === _g ? null : "rowgroup",
			ownerState: s,
			...o
		})
	});
});
//#endregion
//#region node_modules/@mui/material/esm/TableRow/tableRowClasses.js
function yg(e) {
	return W("MuiTableRow", e);
}
var bg = G("MuiTableRow", [
	"root",
	"selected",
	"hover",
	"head",
	"footer"
]), xg = (e) => {
	let { classes: t, selected: n, hover: r, head: i, footer: a } = e;
	return K({ root: [
		"root",
		n && "selected",
		r && "hover",
		i && "head",
		a && "footer"
	] }, yg, t);
}, Sg = J("tr", {
	name: "MuiTableRow",
	slot: "Root",
	overridesResolver: (e, t) => {
		let { ownerState: n } = e;
		return [
			t.root,
			n.head && t.head,
			n.footer && t.footer
		];
	}
})(X(({ theme: e }) => ({
	color: "inherit",
	display: "table-row",
	verticalAlign: "middle",
	outline: 0,
	[`&.${bg.hover}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
	[`&.${bg.selected}`]: {
		backgroundColor: e.alpha((e.vars || e).palette.primary.main, (e.vars || e).palette.action.selectedOpacity),
		"&:hover": { backgroundColor: e.alpha((e.vars || e).palette.primary.main, `${(e.vars || e).palette.action.selectedOpacity} + ${(e.vars || e).palette.action.hoverOpacity}`) }
	}
}))), Cg = "tr", wg = /*#__PURE__*/ n.forwardRef(function(t, r) {
	let i = Z({
		props: t,
		name: "MuiTableRow"
	}), { className: a, component: o = Cg, hover: s = !1, selected: c = !1, ...l } = i, u = n.useContext(Zh), d = {
		...i,
		component: o,
		hover: s,
		selected: c,
		head: u && u.variant === "head",
		footer: u && u.variant === "footer"
	}, f = xg(d);
	return /*#__PURE__*/ e(Sg, {
		as: o,
		ref: r,
		className: U(f.root, a),
		role: o === Cg ? null : "row",
		ownerState: d,
		...l
	});
});
//#endregion
//#region node_modules/@mui/material/esm/TextField/textFieldClasses.js
function Tg(e) {
	return W("MuiTextField", e);
}
G("MuiTextField", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/TextField/TextField.js
var Eg = {
	standard: fm,
	filled: Ip,
	outlined: Eh
}, Dg = (e) => {
	let { classes: t } = e;
	return K({ root: ["root"] }, Tg, t);
}, Og = J(Bp, {
	name: "MuiTextField",
	slot: "Root"
})({}), kg = /*#__PURE__*/ n.forwardRef(function(n, r) {
	let i = Z({
		props: n,
		name: "MuiTextField"
	}), { autoComplete: a, autoFocus: o = !1, children: s, className: c, color: l = "primary", defaultValue: u, disabled: d = !1, error: f = !1, FormHelperTextProps: p, fullWidth: m = !1, helperText: h, id: g, InputLabelProps: _, inputProps: v, InputProps: y, inputRef: b, label: x, maxRows: S, minRows: C, multiline: w = !1, name: T, onBlur: E, onChange: D, onFocus: O, placeholder: k, required: A = !1, rows: j, select: M = !1, SelectProps: N, slots: P = {}, slotProps: F = {}, type: ee, value: I, variant: te = "outlined", ...L } = i, ne = {
		...i,
		autoFocus: o,
		color: l,
		disabled: d,
		error: f,
		fullWidth: m,
		multiline: w,
		required: A,
		select: M,
		variant: te
	}, re = Dg(ne), R = ki(g), ie = h && R ? `${R}-helper-text` : void 0, z = x && R ? `${R}-label` : void 0, ae = Eg[te], oe = {
		slots: P,
		slotProps: {
			input: y,
			inputLabel: _,
			htmlInput: v,
			formHelperText: p,
			select: N,
			...F
		}
	}, se = {}, ce = oe.slotProps.inputLabel;
	te === "outlined" && (ce && ce.shrink !== void 0 && (se.notched = ce.shrink), se.label = x), M && ((!N || !N.native) && (se.id = void 0), se["aria-describedby"] = void 0);
	let [le, ue] = Q("root", {
		elementType: Og,
		shouldForwardComponentProp: !0,
		externalForwardedProps: {
			...oe,
			...L
		},
		ownerState: ne,
		className: U(re.root, c),
		ref: r,
		additionalProps: {
			disabled: d,
			error: f,
			fullWidth: m,
			required: A,
			color: l,
			variant: te
		}
	}), [de, B] = Q("input", {
		elementType: ae,
		externalForwardedProps: oe,
		additionalProps: se,
		ownerState: ne
	}), [V, H] = Q("inputLabel", {
		elementType: gm,
		externalForwardedProps: oe,
		ownerState: ne
	}), [fe, pe] = Q("htmlInput", {
		elementType: "input",
		externalForwardedProps: oe,
		ownerState: ne
	}), [me, he] = Q("formHelperText", {
		elementType: Qp,
		externalForwardedProps: oe,
		ownerState: ne
	}), [ge, _e] = Q("select", {
		elementType: Mh,
		externalForwardedProps: oe,
		ownerState: ne
	}), ve = /*#__PURE__*/ e(de, {
		"aria-describedby": ie,
		autoComplete: a,
		autoFocus: o,
		defaultValue: u,
		fullWidth: m,
		multiline: w,
		name: T,
		rows: j,
		maxRows: S,
		minRows: C,
		type: ee,
		value: I,
		id: R,
		inputRef: b,
		onBlur: E,
		onChange: D,
		onFocus: O,
		placeholder: k,
		inputProps: pe,
		slots: { input: P.htmlInput ? fe : void 0 },
		...B
	});
	return /*#__PURE__*/ t(le, {
		...ue,
		children: [
			x != null && x !== "" && /*#__PURE__*/ e(V, {
				htmlFor: R,
				id: z,
				...H,
				children: x
			}),
			M ? /*#__PURE__*/ e(ge, {
				"aria-describedby": ie,
				id: R,
				labelId: z,
				value: I,
				input: ve,
				..._e,
				children: s
			}) : ve,
			h && /*#__PURE__*/ e(me, {
				id: ie,
				...he,
				children: h
			})
		]
	});
}), Ag = "data-everest-color-scheme";
function jg(e) {
	return typeof document > "u" ? "" : getComputedStyle(document.documentElement).getPropertyValue(e).trim();
}
function Mg(e) {
	let t = jg(`--everest-color-${e}-main`);
	if (!t) return;
	let n = { main: t }, r = jg(`--everest-color-${e}-dark`), i = jg(`--everest-color-${e}-light`);
	return r && (n.dark = r), i && (n.light = i), n;
}
function Ng(e) {
	let t = { mode: e }, n = Mg("primary"), r = Mg("secondary"), i = Mg("error"), a = Mg("warning"), o = Mg("info"), s = Mg("success");
	n && (t.primary = n), r && (t.secondary = r), i && (t.error = i), a && (t.warning = a), o && (t.info = o), s && (t.success = s);
	let c = jg("--everest-color-text-primary");
	if (c) {
		let e = jg("--everest-color-text-secondary"), n = jg("--everest-color-text-disabled");
		t.text = Object.assign(Object.assign({ primary: c }, e && { secondary: e }), n && { disabled: n });
	}
	let l = jg("--everest-color-background-default");
	if (l) {
		let e = jg("--everest-color-background-paper");
		t.background = Object.assign({ default: l }, e && { paper: e });
	}
	let u = jg("--everest-color-divider");
	return u && (t.divider = u), t;
}
var Pg = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"button",
	"caption",
	"overline"
], Fg = [
	"none",
	"capitalize",
	"uppercase",
	"lowercase"
];
function Ig(e) {
	let t = {}, n = jg(`--everest-font-${e}-family`);
	n && (t.fontFamily = n);
	let r = jg(`--everest-font-${e}-size`);
	r && (t.fontSize = r);
	let i = jg(`--everest-font-${e}-weight`);
	if (i) {
		let e = Number(i);
		t.fontWeight = Number.isNaN(e) ? i : e;
	}
	let a = jg(`--everest-font-${e}-line-height`);
	a && (t.lineHeight = a);
	let o = jg(`--everest-font-${e}-letter-spacing`);
	o && (t.letterSpacing = o);
	let s = jg(`--everest-font-${e}-transform`);
	var c;
	return c = s, Fg.includes(c) && (t.textTransform = s), Object.keys(t).length ? t : void 0;
}
var Lg = /* @__PURE__ */ new Map();
function Rg() {
	return typeof document > "u" ? "light" : document.documentElement.getAttribute(Ag) === "dark" ? "dark" : "light";
}
function zg() {
	let [e, t] = d(Rg);
	return l((() => {
		let e = document.documentElement, n = new MutationObserver((() => t(Rg())));
		return n.observe(e, {
			attributes: !0,
			attributeFilter: [Ag]
		}), t(Rg()), () => n.disconnect();
	}), []), e;
}
var Bg = ({ children: t, cacheKey: n, nonce: r }) => {
	let i = zg(), a = function(e, t) {
		let n = `${e}:${t ?? ""}`, r = Lg.get(n);
		return r || (r = Je({
			key: e,
			nonce: t,
			prepend: !0
		}), Lg.set(n, r)), r;
	}(n, r), o = u((() => {
		let e = function() {
			let e = {};
			for (let t of Pg) {
				let n = Ig(t);
				n && (e[t] = n);
			}
			let t = e.body1?.fontFamily;
			return t && (e.fontFamily = t), Object.keys(e).length ? e : void 0;
		}(), t = function() {
			let e = parseFloat(jg("--everest-radius"));
			return Number.isFinite(e) ? { borderRadius: e } : void 0;
		}();
		return ro(Object.assign(Object.assign({ palette: Ng(i) }, e ? { typography: e } : {}), t ? { shape: t } : {}));
	}), [i]);
	return e(bt, {
		value: a,
		children: e(ho, {
			theme: o,
			children: t
		})
	});
};
//#endregion
//#region src/data.ts
async function Vg() {
	let e = await g("/api/catalog");
	if (!e.ok) {
		let t = await e.text().catch(() => "");
		throw Error(t || `HTTP ${e.status}`);
	}
	return {
		...await e.json(),
		stale: e.headers.get("X-Hub-Stale") === "true"
	};
}
async function Hg() {
	let e = await g("/api/installed");
	if (!e.ok) {
		let t = await e.text().catch(() => "");
		throw Error(t || `HTTP ${e.status}`);
	}
	return e.json();
}
function Ug(e, t) {
	return `${e}:${t}`;
}
var Wg = {
	enabled: !1,
	canInstall: !1
};
async function Gg() {
	try {
		let e = await g("/api/installer");
		return e.ok ? await e.json() : Wg;
	} catch {
		return Wg;
	}
}
async function Kg(e, t) {
	let n = await g(`/api/${e}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			type: t.type,
			name: t.name
		})
	}), r = await n.json().catch(() => null);
	if (!n.ok) throw Error(r?.error || `HTTP ${n.status}`);
	return r;
}
var qg = "UNINSTALL";
async function Jg(e) {
	let t = new URLSearchParams({
		type: e.type,
		name: e.name
	}), n = await g(`/api/uninstall/preflight?${t}`), r = await n.json().catch(() => null);
	if (!n.ok) throw Error(r?.error || `HTTP ${n.status}`);
	return r;
}
async function Yg(e, t) {
	let n = await g("/api/uninstall", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			type: e.type,
			name: e.name,
			confirm: t
		})
	}), r = await n.json().catch(() => null);
	if (!n.ok) throw Error(r?.error || `HTTP ${n.status}`);
	return r;
}
//#endregion
//#region src/catalog.ts
function Xg(e, t) {
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
function Zg(e) {
	let t = e.artifacts?.chart;
	if (!t) return null;
	let n = t.defaultChannel ?? Object.keys(t.channels ?? {})[0];
	return n ? t.channels?.[n]?.version ?? null : null;
}
function Qg(e) {
	let t = e.artifacts?.chart, n = t?.defaultChannel ?? Object.keys(t?.channels ?? {})[0] ?? "", r = t?.channels?.[n]?.ref ?? "<chart-ref>", i = t?.channels?.[n]?.version ?? "<version>", a = e.install?.helm?.releaseName ?? e.name, o = e.install?.helm?.namespace ?? "everest-system";
	return [
		`helm install ${a} ${r} \\`,
		`  --version ${i} \\`,
		`  -n ${o}`
	].join("\n");
}
function $g(e) {
	let [t, ...n] = e.trim().replace(/^v/i, "").split("+")[0].split("-");
	return {
		numbers: t.split(".").map((e) => parseInt(e, 10) || 0),
		prerelease: n.length > 0 ? n.join("-").split(".") : null
	};
}
function e_(e, t) {
	let n = $g(e), r = $g(t), i = Math.max(n.numbers.length, r.numbers.length);
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
function t_(e, t) {
	return !e || !t ? !1 : e_(e, t) < 0;
}
function n_(e) {
	return e.release?.chartVersion || e.installedVersion;
}
function r_(e) {
	let t = e.artifacts?.chart, n = t?.defaultChannel ?? Object.keys(t?.channels ?? {})[0] ?? "", r = t?.channels?.[n]?.ref ?? "<chart-ref>", i = t?.channels?.[n]?.version ?? "<version>", a = e.install?.helm?.releaseName ?? e.name, o = e.install?.helm?.namespace ?? "everest-system";
	return [
		`helm upgrade ${a} ${r} \\`,
		`  --version ${i} \\`,
		`  -n ${o}`
	].join("\n");
}
//#endregion
//#region src/routing.ts
var i_ = {
	plugin: "plugins",
	provider: "providers"
}, a_ = {
	plugins: "plugin",
	providers: "provider"
}, o_ = "pluginHubReturnTo";
function s_(e) {
	let t = (e ?? "").split("/").filter(Boolean);
	if (t.length === 0) return {
		kind: "list",
		type: "all"
	};
	let n = a_[t[0]];
	return !n || t.length > 2 ? { kind: "not-found" } : t.length === 1 ? {
		kind: "list",
		type: n
	} : {
		kind: "entry",
		type: n,
		name: t[1]
	};
}
function c_(e) {
	return e === "all" ? "" : i_[e];
}
function l_(e, t) {
	return `${i_[e]}/${encodeURIComponent(t)}`;
}
function u_(e) {
	return e in i_;
}
function d_() {
	let e = window.history.state;
	return e && typeof e == "object" ? e : null;
}
function f_() {
	let e = d_()?.usr?.[o_];
	return typeof e == "string" ? e : null;
}
function p_(e) {
	let t = `/plugins/${e}`, { pathname: n } = window.location, r = n.indexOf(t);
	return r === -1 ? t : n.slice(0, r + t.length);
}
function m_(e, t, n = {}) {
	let r = p_(e), i = t ? `${r}/${t}` : r, a = d_()?.idx, o = (typeof a == "number" ? a : 0) + +!n.replace, s = {
		usr: n.returnTo === void 0 ? null : { [o_]: n.returnTo },
		key: Math.random().toString(36).slice(2, 10),
		idx: o
	};
	n.replace ? window.history.replaceState(s, "", i) : window.history.pushState(s, "", i), window.dispatchEvent(new PopStateEvent("popstate", { state: s }));
}
//#endregion
//#region src/components/Toolbar.ts
function h_(e) {
	let { filter: t, onChange: n } = e;
	return b($, { sx: x.toolbar }, b(kg, {
		size: "small",
		type: "search",
		placeholder: "Search by name, description, category…",
		value: t.query,
		onChange: (e) => n({
			...t,
			query: e.target.value
		}),
		sx: {
			flex: "1 1 240px",
			minWidth: 200
		}
	}), b($, { sx: {
		display: "flex",
		gap: .5
	} }, ...[
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
	].map((e) => b($u, {
		key: e.key,
		label: e.label,
		size: "small",
		onClick: () => n({
			...t,
			type: e.key
		}),
		color: t.type === e.key ? "primary" : "default",
		variant: t.type === e.key ? "filled" : "outlined"
	}))), b(Kp, {
		control: b(mf, {
			size: "small",
			checked: t.installedOnly,
			onChange: (e) => n({
				...t,
				installedOnly: e.target.checked
			})
		}),
		label: "Installed only"
	}), b(Kp, {
		control: b(mf, {
			size: "small",
			checked: !t.hideGated,
			onChange: (e) => n({
				...t,
				hideGated: !e.target.checked
			})
		}),
		label: "Include gated"
	}));
}
//#endregion
//#region src/icons.ts
var g_ = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%25239ca3af'%20stroke-width%3D'1.75'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Crect%20x%3D'3'%20y%3D'3'%20width%3D'18'%20height%3D'18'%20rx%3D'3'%2F%3E%3Cpath%20d%3D'M3%209h18M9%203v18'%2F%3E%3C%2Fsvg%3E", __ = /* @__PURE__ */ new Set();
function v_(e) {
	return e ? e.startsWith("data:") || e.startsWith("http://") || e.startsWith("https://") || e.startsWith("/") ? e : _ ? `${_}/${e}` : g_ : g_;
}
function y_(e) {
	return b("img", {
		src: __.has(e.src) ? g_ : e.src,
		alt: e.alt ?? "",
		style: e.style,
		onError: (t) => {
			let n = t.currentTarget;
			n.dataset.failed !== "1" && (n.dataset.failed = "1", __.add(e.src), n.src !== "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%25239ca3af'%20stroke-width%3D'1.75'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Crect%20x%3D'3'%20y%3D'3'%20width%3D'18'%20height%3D'18'%20rx%3D'3'%2F%3E%3Cpath%20d%3D'M3%209h18M9%203v18'%2F%3E%3C%2Fsvg%3E" && (n.src = g_));
		}
	});
}
//#endregion
//#region src/components/Row.ts
function b_(e) {
	let { entry: t, onSelect: n } = e, r = Zg(t), i = n_(t), a = t_(i, r);
	return b(wg, {
		key: t.name,
		hover: !0,
		sx: { cursor: "pointer" },
		onClick: () => n(t)
	}, b(cg, { sx: {
		width: 40,
		textAlign: "center"
	} }, b(y_, {
		src: v_(t.icon),
		style: {
			width: 28,
			height: 28,
			objectFit: "contain"
		}
	})), b(cg, null, b(Lc, { sx: { fontWeight: 600 } }, t.displayName || t.name), b(Lc, {
		variant: "caption",
		sx: { color: "text.secondary" }
	}, t.name)), b(cg, null, b($u, {
		label: t.type,
		size: "small",
		color: C(t.type),
		variant: "outlined",
		sx: { textTransform: "capitalize" }
	})), b(cg, null, r ?? "—"), b(cg, null, ...(t.categories ?? []).map((e) => b($u, {
		key: e,
		label: e,
		size: "small",
		variant: "outlined",
		sx: {
			mr: .5,
			mb: .5
		}
	}))), b(cg, null, b($, { sx: {
		display: "flex",
		flexDirection: "column",
		gap: .5,
		alignItems: "flex-start"
	} }, b($u, {
		label: t.maturity || "unknown",
		size: "small",
		color: S(t.maturity || "unknown"),
		variant: "outlined",
		sx: { textTransform: "capitalize" }
	}), t.access === "gated" ? b($u, {
		label: "Gated",
		size: "small",
		color: "secondary",
		variant: "outlined"
	}) : null, t.installed ? b($u, {
		label: a ? `Update available · ${i} → ${r}` : i ? `Installed · ${i}` : "Installed",
		size: "small",
		color: a ? "warning" : "success"
	}) : null)));
}
//#endregion
//#region src/components/CodeBlock.ts
function x_() {
	return b("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": !0
	}, b("rect", {
		x: 9,
		y: 9,
		width: 11,
		height: 11,
		rx: 2,
		stroke: "currentColor",
		strokeWidth: 2
	}), b("path", {
		d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}));
}
function S_() {
	return b("svg", {
		width: 14,
		height: 14,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": !0
	}, b("path", {
		d: "M20 6 9 17l-5-5",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}));
}
function C_(e) {
	let { command: t, mt: n } = e, [r, i] = h.useState(!1), a = h.useCallback(() => {
		let e = () => {
			i(!0), window.setTimeout(() => i(!1), 1500);
		};
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(t).then(e).catch(() => {});
			return;
		}
		e();
	}, [t]);
	return b($, { sx: {
		...x.codeBlockWrap,
		mt: n
	} }, b(Wh, { title: r ? "Copied!" : "Copy to clipboard" }, b(vc, {
		size: "small",
		className: "copy-btn",
		onClick: a,
		"aria-label": r ? "Copied" : "Copy to clipboard",
		sx: [x.copyBtn, { opacity: r ? 1 : void 0 }]
	}, r ? S_() : x_())), b($, {
		component: "pre",
		sx: [x.codeBlock, { m: 0 }]
	}, t));
}
//#endregion
//#region src/components/DrawerShell.ts
function w_() {
	let e = document.querySelector("header.MuiAppBar-root");
	if (!e) return 64;
	let t = Math.round(e.getBoundingClientRect().height);
	return t > 0 ? t : 64;
}
function T_() {
	let [e, t] = h.useState(w_);
	return h.useEffect(() => {
		let e = () => t(w_());
		return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
function E_(e) {
	let t = T_();
	return b(Mp, {
		anchor: "right",
		open: !0,
		onClose: e.onClose,
		PaperProps: { sx: {
			width: "min(560px, 100%)",
			p: 3,
			boxSizing: "border-box",
			top: t,
			height: `calc(100% - ${t}px)`
		} },
		slotProps: { backdrop: { sx: { top: t } } }
	}, e.children);
}
//#endregion
//#region src/components/InstallActions.ts
var D_ = {
	install: {
		now: "Install now",
		busy: "Installing…",
		helm: "Install with Helm"
	},
	upgrade: {
		now: "Upgrade to",
		busy: "Upgrading…",
		helm: "Upgrade with Helm"
	}
};
function O_(e) {
	let { entry: t, mode: n, targetVersion: r, helmCommand: i, canInstallNow: a, onDone: o } = e, [s, c] = h.useState(!1), [l, u] = h.useState(null), [d, f] = h.useState(null), p = d ?? !a, m = D_[n], g = (t.install?.prerequisites ?? []).map((e) => e.name);
	return b($, { sx: { mb: 2 } }, b($, { sx: {
		display: "flex",
		gap: 1,
		flexWrap: "wrap"
	} }, a ? b(Zd, {
		variant: "contained",
		disabled: s,
		onClick: () => {
			c(!0), u(null), Kg(n, t).then(o).catch((e) => u(e.message)).finally(() => c(!1));
		},
		startIcon: s ? b(fc, {
			size: 14,
			color: "inherit"
		}) : null,
		"data-testid": `plugin-hub-${n}-now`
	}, s ? m.busy : n === "upgrade" ? `${m.now} ${r ?? "latest"}` : m.now) : null, b(Zd, {
		variant: "outlined",
		color: "inherit",
		onClick: () => f(!p),
		"aria-expanded": p,
		endIcon: b("span", { "aria-hidden": !0 }, p ? "▴" : "▾"),
		sx: {
			color: "text.secondary",
			borderColor: "divider"
		},
		"data-testid": `plugin-hub-${n}-helm`
	}, m.helm)), a && g.length ? b(Lc, {
		variant: "caption",
		sx: {
			display: "block",
			mt: 1,
			color: "text.secondary"
		}
	}, `Requires ${g.join(", ")} — not installed automatically, see Prerequisites below.`) : null, l ? b(Ac, {
		severity: "error",
		sx: { mt: 1.5 }
	}, l) : null, p ? b(C_, {
		command: i,
		mt: 1.5
	}) : null);
}
//#endregion
//#region src/components/UninstallDialog.ts
var k_ = 10;
function A_(e) {
	let { entry: t, onClose: n, onDone: r } = e, [i, a] = h.useState(null), [o, s] = h.useState(null), [c, l] = h.useState(!1), [u, d] = h.useState("");
	h.useEffect(() => {
		Jg(t).then(a).catch((e) => s(e.message));
	}, [t.type, t.name]);
	let f = i?.instances ?? [], p = f.length > 0, m = !p || u === "UNINSTALL", g = t.displayName || t.name, _ = () => {
		l(!0), s(null), Yg(t, p ? u : void 0).then(r).catch((e) => {
			s(e.message), l(!1);
		});
	}, v = i ? b($, null, b(Lc, {
		variant: "body2",
		sx: { mb: 1.5 }
	}, `This removes the Helm release ${i.namespace}/${i.release}.`, t.type === "provider" ? " The provider’s CRDs are kept, so database resources are not deleted." : ""), p ? b(Ac, {
		severity: "error",
		sx: { mb: 1.5 }
	}, b(Lc, {
		variant: "body2",
		sx: {
			fontWeight: 600,
			mb: .5
		}
	}, `There ${f.length === 1 ? "is 1 instance" : `are ${f.length} instances`} running that use this provider.`), b("ul", { style: {
		margin: "0.25rem 0",
		paddingLeft: "1.25rem",
		fontSize: "0.8125rem"
	} }, ...f.slice(0, k_).map((e) => b("li", { key: e }, b("code", null, e)))), f.length > k_ ? b(Lc, { variant: "caption" }, `…and ${f.length - k_} more`) : null, b(Lc, {
		variant: "body2",
		sx: { mt: .5 }
	}, "Their operator will be removed and they will no longer be managed until the provider is reinstalled.")) : null, p ? b(kg, {
		fullWidth: !0,
		size: "small",
		autoFocus: !0,
		label: `Type ${qg} to confirm`,
		value: u,
		disabled: c,
		onChange: (e) => d(e.target.value),
		inputProps: { "data-testid": "plugin-hub-uninstall-confirm" }
	}) : null) : o ? null : b($, { sx: {
		display: "flex",
		justifyContent: "center",
		py: 3
	} }, b(fc, { size: 24 }));
	return b($f, {
		open: !0,
		onClose: c ? void 0 : n,
		maxWidth: "sm",
		fullWidth: !0
	}, b(fp, null, `Uninstall ${g}?`), b(lp, null, v, o ? b(Ac, {
		severity: "error",
		sx: { mt: 1.5 }
	}, o) : null), b(rp, null, b(Zd, {
		onClick: n,
		disabled: c,
		color: "inherit"
	}, "Cancel"), b(Zd, {
		variant: "contained",
		color: "error",
		disabled: !i || !m || c,
		onClick: _,
		startIcon: c ? b(fc, {
			size: 14,
			color: "inherit"
		}) : null,
		"data-testid": "plugin-hub-uninstall-submit"
	}, c ? "Uninstalling…" : "Uninstall")));
}
//#endregion
//#region src/components/Drawer.ts
function j_(e) {
	return e.replace(/[._-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (e) => e.toUpperCase());
}
function M_(e, t) {
	let n = j_(e);
	return typeof t == "boolean" ? b($u, {
		key: e,
		label: n,
		size: "small",
		color: t ? "success" : "default",
		variant: t ? "filled" : "outlined",
		sx: {
			mr: .75,
			mb: .75,
			textDecoration: t ? "none" : "line-through"
		}
	}) : Array.isArray(t) ? b($, {
		key: e,
		sx: x.capRow
	}, b(Lc, {
		component: "span",
		sx: x.capKey
	}, n), b($, null, ...t.map((e, t) => b($u, {
		key: t,
		label: String(e),
		size: "small",
		variant: "outlined",
		sx: {
			mr: .5,
			mb: .5
		}
	})))) : t == null ? null : typeof t == "object" ? b($, {
		key: e,
		sx: x.capRow
	}, b(Lc, {
		component: "span",
		sx: x.capKey
	}, n), b(Lc, {
		component: "code",
		variant: "body2"
	}, JSON.stringify(t))) : b($, {
		key: e,
		sx: x.capRow
	}, b(Lc, {
		component: "span",
		sx: x.capKey
	}, n), b(Lc, {
		component: "span",
		variant: "body2"
	}, String(t)));
}
function N_(e) {
	let t = e.helm, n = [`helm install ${e.name} ${t.oci} \\`];
	t.version && n.push(`  --version ${t.version} \\`), n.push(`  -n ${t.namespace}${t.createNamespace ? " --create-namespace" : ""}`);
	for (let [e, r] of Object.entries(t.defaultValues ?? {})) n[n.length - 1] += " \\", n.push(`  --set ${e}=${r}`);
	return n.join("\n");
}
function P_(e, t) {
	return b(As, {
		key: t,
		variant: "outlined",
		sx: x.prereqCard
	}, b($, { sx: x.prereqHead }, b(Lc, {
		variant: "body2",
		sx: { fontWeight: 600 }
	}, e.name), e.installUrl ? b(Cm, {
		href: e.installUrl,
		target: "_blank",
		rel: "noopener noreferrer",
		variant: "caption",
		sx: { whiteSpace: "nowrap" }
	}, "Docs ↗") : null), e.description ? b(Lc, {
		variant: "body2",
		sx: { mt: .25 }
	}, e.description) : null, e.helm ? b("details", null, b(Lc, {
		component: "summary",
		variant: "caption",
		sx: x.prereqSummary
	}, "Install command"), b(C_, {
		command: N_(e),
		mt: 1
	})) : null);
}
function F_(e) {
	return !e || !e.length ? null : b($, { sx: x.section }, L_("Prerequisites"), b($, { sx: x.prereqList }, ...e.map(P_)));
}
function I_(e) {
	let t = Object.entries(e);
	if (!t.length) return null;
	let n = t.filter(([, e]) => typeof e == "boolean"), r = t.filter(([, e]) => typeof e != "boolean");
	return b($, null, n.length ? b($, { sx: { mb: r.length ? 1.5 : 0 } }, ...n.map(([e, t]) => M_(e, t))) : null, r.length ? b($, null, ...r.map(([e, t]) => M_(e, t))) : null);
}
var L_ = (e) => b(Lc, {
	variant: "overline",
	sx: x.sectionTitle
}, e), R_ = (e) => b($, null, ...e.map((e) => b($u, {
	key: e,
	label: e,
	size: "small",
	variant: "outlined",
	sx: {
		mr: .5,
		mb: .5
	}
})));
function z_(e) {
	let { entry: t, installer: n, notice: r, onInstallerDone: i, onClose: a } = e, [o, s] = h.useState(!1), c = t.access === "gated", l = c ? null : Zg(t), u = n_(t), d = !!t.installed && t_(u, l), f = c ? null : d ? "upgrade" : t.installed ? null : "install", p = t.release?.status, m = n?.self === `${t.type}:${t.name}`, g = !!n?.canInstall && !c && !m, _ = t.plugin?.extensionPoints ?? [], v = t.provider?.supportedEngines ?? [], y = t.maintainers ?? [];
	return b(E_, { onClose: a }, b($, { sx: x.drawerHeader }, b(y_, {
		src: v_(t.icon),
		style: {
			width: 40,
			height: 40
		}
	}), b($, null, b(Lc, {
		variant: "h6",
		sx: { fontWeight: 600 }
	}, t.displayName || t.name), b($, { sx: {
		display: "flex",
		alignItems: "center",
		gap: .75,
		mt: .25
	} }, b(Lc, {
		variant: "caption",
		sx: { color: "text.secondary" }
	}, t.name), b($u, {
		label: t.type,
		size: "small",
		color: C(t.type),
		variant: "outlined",
		sx: { textTransform: "capitalize" }
	}), c ? b($u, {
		label: "Gated",
		size: "small",
		color: "secondary",
		variant: "outlined"
	}) : null)), b(vc, {
		onClick: a,
		"aria-label": "Close",
		sx: { ml: "auto" }
	}, "×")), t.installed ? b($, { sx: {
		mb: 2,
		display: "flex",
		alignItems: "center",
		gap: 1
	} }, b($u, {
		label: u ? `Installed · ${u}` : "Installed",
		size: "small",
		color: "success"
	}), p && p !== "deployed" ? b($u, {
		label: `Helm: ${p}`,
		size: "small",
		color: p === "failed" ? "error" : "warning",
		variant: "outlined"
	}) : null, t.installedPhase ? b(Lc, {
		variant: "caption",
		sx: { color: "text.secondary" }
	}, `Phase: ${t.installedPhase}`) : null, g ? b(Zd, {
		size: "small",
		color: "error",
		onClick: () => s(!0),
		sx: { ml: "auto" },
		"data-testid": "plugin-hub-uninstall"
	}, "Uninstall") : null) : null, o ? b(A_, {
		entry: t,
		onClose: () => s(!1),
		onDone: (e) => {
			s(!1), i(t, "uninstall", e);
		}
	}) : null, r ? b(Ac, {
		severity: "success",
		sx: { mb: 2 }
	}, r) : null, d ? b(Ac, {
		severity: "warning",
		sx: { mb: 1.5 }
	}, `A newer version (${l}) is available. Currently installed: ${u}`) : null, f ? b(O_, {
		key: f,
		entry: t,
		mode: f,
		targetVersion: l,
		helmCommand: f === "upgrade" ? r_(t) : Qg(t),
		canInstallNow: g,
		onDone: (e) => i(t, f, e)
	}) : null, t.description ? b(Lc, {
		variant: "body2",
		sx: {
			color: "text.primary",
			whiteSpace: "pre-line"
		}
	}, t.description) : null, b($, { sx: x.section }, L_("Metadata"), b($, { sx: {
		fontSize: "0.875rem",
		lineHeight: 1.7
	} }, l ? b(Lc, { variant: "body2" }, b("b", null, "Version: "), l) : null, t.maturity ? b($, { sx: {
		display: "flex",
		alignItems: "center",
		gap: 1,
		my: .5
	} }, b("b", null, "Maturity: "), b($u, {
		label: t.maturity,
		size: "small",
		color: S(t.maturity),
		variant: "outlined",
		sx: { textTransform: "capitalize" }
	})) : null, t.compatibility?.openeverest ? b(Lc, { variant: "body2" }, b("b", null, "Requires OpenEverest: "), t.compatibility.openeverest) : null, t.license ? b(Lc, { variant: "body2" }, b("b", null, "License: "), t.license) : null, t.verified ? b(Lc, { variant: "body2" }, b("b", null, "Verified: "), "yes") : null)), _.length ? b($, { sx: x.section }, L_("Extension points"), R_(_)) : null, v.length ? b($, { sx: x.section }, L_("Supported engines"), R_(v)) : null, t.capabilities && Object.keys(t.capabilities).length ? b($, { sx: x.section }, L_("Capabilities"), I_(t.capabilities)) : null, y.length ? b($, { sx: x.section }, L_("Maintainers"), b("ul", { style: {
		margin: 0,
		paddingLeft: "1.25rem",
		fontSize: "0.875rem"
	} }, ...y.map((e, t) => b("li", { key: t }, e.name || e.github || e.email || "unknown")))) : null, b(_p, { sx: { my: 2 } }), c ? null : F_(t.install?.prerequisites), c ? b($, { sx: x.section }, L_("Access required"), b(Lc, {
		variant: "body2",
		sx: { mt: 0 }
	}, t.gated?.instructions || "This extension is not publicly available. Contact the vendor to request access."), t.gated?.provider ? b(Lc, {
		variant: "caption",
		sx: { color: "text.secondary" }
	}, `Provided by ${t.gated.provider}`) : null, t.gated?.contactUrl ? b(Cm, {
		href: t.gated.contactUrl,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Contact vendor ↗") : b(Lc, {
		variant: "caption",
		sx: { color: "text.secondary" }
	}, "No contact URL configured. See the source repository for details.")) : null, b($, { sx: x.section }, b($, { sx: {
		display: "flex",
		gap: 1.5,
		flexWrap: "wrap"
	} }, t.sourceRepo ? b(Cm, {
		href: t.sourceRepo,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Source repository ↗") : null, t.homepage ? b(Cm, {
		href: t.homepage,
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Homepage ↗") : null)));
}
//#endregion
//#region src/components/MissingEntryDrawer.ts
var B_ = {
	plugin: {
		singular: "Plugin",
		plural: "plugins"
	},
	provider: {
		singular: "Provider",
		plural: "providers"
	}
};
function V_(e) {
	let { type: t, name: n, onClose: r } = e, i = B_[t];
	return b(E_, { onClose: r }, b($, {
		sx: x.drawerHeader,
		"data-testid": "plugin-hub-missing-entry"
	}, b(Lc, {
		variant: "h6",
		sx: { fontWeight: 600 }
	}, `${i.singular} not found`), b(vc, {
		onClick: r,
		"aria-label": "Close",
		sx: { ml: "auto" }
	}, "×")), b(Lc, {
		variant: "body2",
		sx: { mb: 2 }
	}, `There is no ${i.singular.toLowerCase()} named “${n}” in the catalog. It may have been renamed or removed from the hub index.`), b(Zd, {
		variant: "outlined",
		size: "small",
		onClick: r
	}, `Browse ${i.plural}`));
}
//#endregion
//#region src/components/NotFoundPage.ts
function H_(e) {
	return b($, {
		sx: x.empty,
		"data-testid": "plugin-hub-not-found"
	}, b(Lc, {
		variant: "h6",
		sx: {
			color: "text.primary",
			mb: 1
		}
	}, "Page not found"), b(Lc, {
		variant: "body2",
		sx: { mb: 2 }
	}, "This Hub page does not exist."), b(Zd, {
		variant: "contained",
		size: "small",
		onClick: e.onBack
	}, "Back to The Hub"));
}
//#endregion
//#region src/main.tsx
var U_ = "plugin-hub";
function W_(e) {
	let t = f_();
	if (t === null) return e;
	let n = s_(t);
	return n.kind === "list" ? n.type : e;
}
var G_ = (e) => {
	let t = e.pluginName || U_, n = s_(e.subPath), [r, i] = h.useState(null), [a, o] = h.useState(null), [s, c] = h.useState(null), [l, u] = h.useState(null), [d, f] = h.useState(null), [p, m] = h.useState(null), [g, _] = h.useState(!0), [y, S] = h.useState({
		query: "",
		installedOnly: !1,
		hideGated: !1
	}), C = h.useCallback(() => {
		c(null), Hg().then((e) => {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.items ?? []) n?.name && t.set(Ug(n.type, n.name), n);
			o(t), e.error && c(e.error);
		}).catch((e) => {
			o(/* @__PURE__ */ new Map()), c(e.message);
		}), Gg().then(u);
	}, []), w = h.useCallback(() => {
		_(!0), m(null), Vg().then(i).catch((e) => m(e.message)).finally(() => _(!1)), o(null), C();
	}, [C]);
	h.useEffect(() => {
		w();
	}, [w]);
	let T = (e, t, n) => {
		let r = `${n.namespace}/${n.release}`, i = e.type === "plugin" ? t === "uninstall" ? " Reload the page to remove the plugin UI." : " Reload the page to load the plugin UI." : "", a = t === "uninstall" ? `Uninstalled ${r}.${i}` : `${t === "upgrade" ? "Upgraded" : "Installed"} ${r} to ${n.chartVersion} (Helm: ${n.status}).${i}`;
		f({
			key: Ug(e.type, e.name),
			message: a
		}), C();
	}, E = a === null, D = h.useMemo(() => {
		let e = r?.extensions ?? [];
		return a ? e.map((e) => {
			let t = Ug(e.type, e.name), n = a.get(t), r = l?.releases?.[t];
			return {
				...e,
				installed: !!n || !!r,
				installedVersion: n?.version || e.installedVersion,
				release: r
			};
		}) : e;
	}, [
		r,
		a,
		l
	]), O = n.kind === "list" ? n.type : n.kind === "entry" ? W_(n.type) : "all", k = {
		...y,
		type: O
	}, A = D.filter((e) => Xg(e, k)), j = {
		total: D.length,
		plugin: D.filter((e) => e.type === "plugin").length,
		provider: D.filter((e) => e.type === "provider").length,
		installed: D.filter((e) => e.installed).length
	}, M = ({ type: e, ...n }) => {
		S(n), e !== O && m_(t, c_(e));
	}, N = (e) => {
		u_(e.type) && m_(t, l_(e.type, e.name), { returnTo: c_(O) });
	}, P = () => {
		f_() === null ? m_(t, c_(O), { replace: !0 }) : window.history.back();
	}, F = () => m_(t, c_("all")), ee = () => {
		if (n.kind !== "entry" || !r) return null;
		let e = D.find((e) => e.type === n.type && e.name === n.name);
		if (!e) return b(V_, {
			type: n.type,
			name: n.name,
			onClose: P
		});
		let t = Ug(e.type, e.name);
		return b(z_, {
			entry: e,
			installer: l,
			notice: d?.key === t ? d.message : null,
			onInstallerDone: T,
			onClose: P
		});
	};
	return b(Bg, {
		cacheKey: "plugin-hub",
		nonce: v
	}, b($, {
		sx: x.page,
		"data-testid": "plugin-hub-root"
	}, b($, { sx: x.headerRow }, b($, null, b(Lc, {
		variant: "h5",
		sx: { fontWeight: 600 }
	}, "The Hub"), b(Lc, {
		variant: "body2",
		sx: x.subtitle
	}, `Browse OpenEverest plugins and providers. ${j.total} available · ${E ? "checking installed…" : `${j.installed} installed`}.`)), b($, { sx: x.headerActions }, b(Zd, {
		variant: "contained",
		size: "small",
		sx: x.primaryAction,
		"data-testid": "plugin-hub-add-extension",
		href: "https://github.com/openeverest/hub",
		target: "_blank",
		rel: "noopener noreferrer"
	}, "Add extension"), b(Cm, {
		href: "https://github.com/openeverest/openeverest/issues/",
		target: "_blank",
		rel: "noopener noreferrer",
		variant: "caption"
	}, "Need other tech? →"))), n.kind === "not-found" ? b(H_, { onBack: F }) : b(h.Fragment, null, p ? b(Ac, {
		severity: "error",
		sx: { mb: 2 }
	}, `Failed to load catalog: ${p}`) : null, r?.stale ? b(Ac, {
		severity: "warning",
		sx: { mb: 2 }
	}, "Showing cached catalog — upstream hub index is currently unreachable.") : null, s ? b(Ac, {
		severity: "warning",
		sx: { mb: 2 }
	}, `Could not load installed extensions: ${s}. Showing catalog without install status.`) : null, b(h_, {
		filter: k,
		onChange: M
	}), g && !r ? b($, { sx: x.empty }, "Loading catalog…") : A.length === 0 ? b($, { sx: x.empty }, D.length === 0 ? "No extensions in the catalog." : "No extensions match the current filters.") : b(fg, {
		component: As,
		variant: "outlined"
	}, b(Xh, { size: "small" }, b(vg, null, b(wg, null, b(cg, { sx: { width: 40 } }, ""), b(cg, null, "Name"), b(cg, null, "Type"), b(cg, null, "Version"), b(cg, null, "Categories"), b(cg, null, "Maturity"))), b(rg, null, ...A.map((e) => b_({
		entry: e,
		onSelect: N
	}))))), ee())));
}, K_ = (e) => {
	y(e), e.registerExtension({
		type: "sidebarItem",
		label: "Plugin Hub"
	}), e.registerExtension({
		type: "route",
		label: "Plugin Hub",
		component: G_
	});
};
//#endregion
export { K_ as default };
