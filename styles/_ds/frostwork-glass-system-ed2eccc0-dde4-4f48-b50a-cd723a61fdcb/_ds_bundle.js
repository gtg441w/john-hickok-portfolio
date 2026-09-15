/* @ds-bundle: {"format":4,"namespace":"FrostworkGlassSystem_ed2ecc","components":[{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Choreography","sourcePath":"components/motion/Choreography.jsx"},{"name":"LiveBackdrop","sourcePath":"components/motion/LiveBackdrop.jsx"},{"name":"ContentPlane","sourcePath":"components/primitives/ContentPlane.jsx"},{"name":"Icon","sourcePath":"components/primitives/Icon.jsx"},{"name":"Icons","sourcePath":"components/primitives/Icon.jsx"},{"name":"Stack","sourcePath":"components/primitives/Stack.jsx"},{"name":"Text","sourcePath":"components/primitives/Text.jsx"},{"name":"VisuallyHidden","sourcePath":"components/primitives/VisuallyHidden.jsx"},{"name":"BackdropStage","sourcePath":"components/surfaces/BackdropStage.jsx"},{"name":"GlassButton","sourcePath":"components/surfaces/GlassButton.jsx"},{"name":"GlassCard","sourcePath":"components/surfaces/GlassCard.jsx"},{"name":"GlassModal","sourcePath":"components/surfaces/GlassModal.jsx"},{"name":"GlassNav","sourcePath":"components/surfaces/GlassNav.jsx"},{"name":"GlassSearch","sourcePath":"components/surfaces/GlassSearch.jsx"},{"name":"GlassSegmented","sourcePath":"components/surfaces/GlassSegmented.jsx"},{"name":"GlassSurface","sourcePath":"components/surfaces/GlassSurface.jsx"},{"name":"SpecChip","sourcePath":"components/surfaces/SpecChip.jsx"},{"name":"REF_DEPTHS","sourcePath":"components/surfaces/media-registry.js"}],"sourceHashes":{"components/forms/Checkbox.jsx":"b3a3191db733","components/forms/Field.jsx":"6e4f7ee09ed0","components/forms/Input.jsx":"3f5303747ef4","components/forms/Select.jsx":"8d85ee8e4ca4","components/forms/Switch.jsx":"1f96b6bf5556","components/forms/Textarea.jsx":"18c17f6f1731","components/motion/Choreography.jsx":"7686b99016ac","components/motion/LiveBackdrop.jsx":"88a19d86c8b5","components/primitives/ContentPlane.jsx":"de20f3e911f0","components/primitives/Icon.jsx":"649a52fffd19","components/primitives/Stack.jsx":"4c2286bcf17d","components/primitives/Text.jsx":"e5cf4ecea710","components/primitives/VisuallyHidden.jsx":"89216b4b7cba","components/primitives/plane.js":"f8f18a7ede28","components/surfaces/BackdropStage.jsx":"821e611b2661","components/surfaces/GlassButton.jsx":"d49199a3545a","components/surfaces/GlassCard.jsx":"7ee5059624f5","components/surfaces/GlassModal.jsx":"158458ebdd98","components/surfaces/GlassNav.jsx":"8e215ec436c3","components/surfaces/GlassSearch.jsx":"e2aa4d95358e","components/surfaces/GlassSegmented.jsx":"8bf13af68813","components/surfaces/GlassSurface.jsx":"bfb8cf01b707","components/surfaces/SpecChip.jsx":"2beba84a6809","components/surfaces/media-registry.js":"5228ee0655bf","components/surfaces/refraction.js":"71f1ffd83b6a","components/surfaces/stage-contract.js":"2e7f9838ff0a","guidelines/rules.js":"b3395b702728","ui_kits/conformance/checks.js":"e9d14ccbc5a2","ui_kits/glass-lab/Atmosphere.jsx":"3c093807cbaa","ui_kits/glass-lab/Matrix.jsx":"1f6afbc9142f","ui_kits/glass-lab/data.js":"41dc559944e2"},"inlinedExternals":[],"unexposedExports":[{"name":"ensureRefractionDefs","sourcePath":"components/surfaces/refraction.js"},{"name":"mediaFacts","sourcePath":"components/surfaces/media-registry.js"},{"name":"nearestRefDepth","sourcePath":"components/surfaces/media-registry.js"},{"name":"planeContext","sourcePath":"components/primitives/plane.js"},{"name":"publishStageFacts","sourcePath":"components/surfaces/stage-contract.js"},{"name":"resolveMediaKey","sourcePath":"components/surfaces/media-registry.js"},{"name":"stageFacts","sourcePath":"components/surfaces/media-registry.js"}]} */

(() => {

const __ds_ns = (window.FrostworkGlassSystem_ed2ecc = window.FrostworkGlassSystem_ed2ecc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Reads the shadcn slots — --card, --input, --foreground, --ring — so a real shadcn
   Input dropped into a consuming project inherits this appearance with no edits.

   Height is --control-md (40px, 5 units). The 44px touch minimum is met by the
   surrounding label and field padding rather than by inflating every control, per
   the note on --touch-min in tokens/space.css. */
const chrome = invalid => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 'var(--control-md)',
  padding: '0 var(--space-3)',
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-body)',
  lineHeight: 'var(--leading-body)',
  color: 'var(--foreground)',
  background: 'var(--card)',
  border: 'var(--hairline) solid ' + (invalid ? 'var(--danger)' : 'var(--input)'),
  borderRadius: 'var(--radius-sm)',
  outline: 'none'
});
function Input({
  invalid = false,
  type = 'text',
  onFocus,
  onBlur,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: e => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    style: {
      ...chrome(invalid),
      boxShadow: focus ? '0 0 0 var(--focus-width-inner) var(--focus-inner), 0 0 0 var(--focus-width-outer) var(--focus-outer)' : 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const chrome = invalid => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 'var(--control-md)',
  padding: '0 var(--space-3)',
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-body)',
  lineHeight: 'var(--leading-body)',
  color: 'var(--foreground)',
  background: 'var(--card)',
  border: 'var(--hairline) solid ' + (invalid ? 'var(--danger)' : 'var(--input)'),
  borderRadius: 'var(--radius-sm)',
  outline: 'none'
});
function Textarea({
  invalid = false,
  rows = 4,
  onFocus,
  onBlur,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: e => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    style: {
      ...chrome(invalid),
      padding: 'var(--space-2) var(--space-3)',
      minHeight: 'unset',
      resize: 'vertical',
      boxShadow: focus ? '0 0 0 var(--focus-width-inner) var(--focus-inner), 0 0 0 var(--focus-width-outer) var(--focus-outer)' : 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/motion/Choreography.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ── Choreography ──────────────────────────────────────────────────────────────
   One controller per page, wrapping whatever should be choreographed. It does two
   jobs and refuses a third.

   REVEAL. Descendants marked data-reveal are staggered in DOM order and switched to
   data-reveal="in" when they cross into view. Delays are assigned per SIBLING GROUP,
   not per page: a page-wide index makes the fourth section's cards enter 900ms after
   they are already on screen. Each group restarts at zero and caps at --reveal-cap.

   PARALLAX. Stages marked data-parallax get --parallax-y written on them, read by
   the media layer inside (see tokens/motion.css for which layer, and why it is not
   the stage element itself).

   WHAT IT REFUSES. It never touches blur, backdrop-filter, scale, or density —
   F-motion and the density ladder both forbid it, and it would be the natural place
   to cheat. It also never sets data-reveal itself: an author marks what should be
   choreographed, because the alternative is a controller guessing which of a page's
   elements are surfaces.

   FAIL-SAFE ORDER MATTERS. data-choreography="on" is set in an effect, i.e. after
   first paint, and the CSS that hides anything is scoped to it. So the first frame is
   the finished page, and a browser without JS, or a bundle that fails to load, shows
   the finished page permanently. The cost is a possible flash of final state before
   the reveal arms; that is the correct trade against a blank page. */

const RAF = typeof window !== 'undefined' ? window.requestAnimationFrame : null;
function Choreography({
  parallax = true,
  stagger = true,
  rootMargin = '0px 0px -12% 0px',
  as: Tag = 'div',
  children,
  ...rest
}) {
  const hostRef = React.useRef(null);
  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* claim the page — until this attribute exists, none of the hiding CSS matches */
    root.setAttribute('data-choreography', 'on');

    /* ── reveal ── */
    const targets = Array.from(host.querySelectorAll('[data-reveal]'));
    const reveal = el => el.setAttribute('data-reveal', 'in');
    const revealAll = () => targets.forEach(reveal);
    if (stagger && !reduce) {
      const seen = new Map();
      const cap = parseInt(getComputedStyle(root).getPropertyValue('--reveal-cap'), 10) || 6;
      const step = parseFloat(getComputedStyle(root).getPropertyValue('--reveal-step')) || 60;
      const hold = parseFloat(getComputedStyle(root).getPropertyValue('--reveal-hold')) || 120;
      targets.forEach(el => {
        const group = el.parentElement;
        const i = seen.get(group) || 0;
        seen.set(group, i + 1);
        el.style.setProperty('--reveal-delay', hold + Math.min(i, cap - 1) * step + 'ms');
      });
    }
    let io = null;
    let backstop = 0;
    if (targets.length) {
      /* FIRST PASS IS GEOMETRIC, NOT OBSERVED. Anything already intersecting the
         viewport is revealed synchronously, before any observer exists. This is not
         an optimisation — IntersectionObserver with an implicit root reports
         rootBounds: null and isIntersecting: false in some embeddings (iframes,
         previews, print contexts), and an earlier version of this file trusted it
         and left every surface on the page permanently invisible. A comment claimed
         this pass existed; no code implemented it. It does now. */
      const vh0 = window.innerHeight || 0;
      targets.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh0) reveal(el);
      });
      if (typeof IntersectionObserver !== 'function') {
        revealAll();
      } else {
        io = new IntersectionObserver(entries => {
          /* a null rootBounds means the observer cannot see a viewport, so its
             negative answers are meaningless rather than informative. Reveal
             everything and stop asking. */
          if (entries.some(e => e.rootBounds === null)) {
            revealAll();
            io.disconnect();
            return;
          }
          entries.forEach(e => {
            if (!e.isIntersecting) return;
            reveal(e.target);
            io.unobserve(e.target);
          });
        }, {
          rootMargin,
          threshold: 0.15
        });
        targets.forEach(el => {
          if (el.getAttribute('data-reveal') !== 'in') io.observe(el);
        });
      }

      /* LAST RESORT. If after a second nothing has revealed, the mechanism is not
         working in this environment — so stop hiding content at all. M-fail-safe is
         about content being visible, not about the reveal running; an unreachable
         observer must degrade to the static page exactly like a missing script does. */
      backstop = window.setTimeout(() => {
        if (!host.querySelector('[data-reveal="in"]')) root.removeAttribute('data-choreography');
      }, 1000);
    }

    /* ── parallax ── */
    let raf = 0,
      ticking = false;
    const stages = parallax && !reduce ? Array.from(host.querySelectorAll('[data-parallax]')) : [];
    const depth = parseFloat(getComputedStyle(root).getPropertyValue('--parallax-depth')) || 48;
    function place() {
      ticking = false;
      const vh = window.innerHeight || 1;
      stages.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -depth || r.top > vh + depth) {
          /* clear rather than skip: a stage left holding its last offset rests
             visibly off-register when it scrolls back into range. */
          el.style.removeProperty('--parallax-y');
          return;
        }
        const centre = r.top + r.height / 2;
        /* −1 entering from below → +1 leaving past the top */
        const p = Math.max(-1, Math.min(1, 1 - 2 * (centre / vh)));
        /* media lags the page: it drifts downward as the page scrolls up */
        el.style.setProperty('--parallax-y', (p * depth / 2).toFixed(2) + 'px');
      });
    }
    function onScroll() {
      if (ticking || !RAF) return;
      ticking = true;
      raf = RAF(place);
    }
    if (stages.length) {
      place();
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      window.addEventListener('resize', onScroll, {
        passive: true
      });
    }
    return () => {
      if (io) io.disconnect();
      if (backstop) clearTimeout(backstop);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.removeAttribute('data-choreography');
    };
  }, [parallax, stagger, rootMargin]);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: hostRef
  }, rest), children);
}
Object.assign(__ds_scope, { Choreography });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/Choreography.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Icons are sized on the unit and inherit colour, so they cannot drift from the text
   they sit beside. `label` decides the accessibility contract: with one, the icon is
   an image with a name; without one it is decorative and hidden — there is no third
   state where a screen reader announces a shrug. */
const SIZES = {
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: 'var(--space-5)'
};
function Icon({
  size = 'md',
  label,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 16 16",
    fill: "none",
    width: SIZES[size] || SIZES.md,
    height: SIZES[size] || SIZES.md,
    role: label ? 'img' : undefined,
    "aria-label": label || undefined,
    "aria-hidden": label ? undefined : 'true',
    focusable: "false",
    style: {
      flex: '0 0 auto',
      display: 'block',
      color: 'currentColor',
      ...style
    }
  }, rest), children);
}

/* The glyphs the system's own rules require. A status cannot render without an icon,
   so they ship with the system rather than being an author's problem.

   Capitalised deliberately: only capitalised exports are placed on the design
   system's window namespace, so a lowercase `icons` would be unreachable from card
   HTML and from any consumer reading components off the namespace. (plane.js keeps
   its lowercase `planeContext` because that one is only ever imported by module
   path, never read off the namespace.) */
const Icons = {
  check: /*#__PURE__*/React.createElement("path", {
    d: "M3 8.5l3.2 3.2L13 5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  alert: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.5l5.5 10H2.5L8 2.5z",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6.6v2.6",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "11.3",
    r: "0.95",
    fill: "currentColor"
  })),
  cross: /*#__PURE__*/React.createElement("path", {
    d: "M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }),
  chevron: /*#__PURE__*/React.createElement("path", {
    d: "M6 3.5L10.5 8 6 12.5",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "4.2",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.2 10.2L14 14",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  })),
  plus: /*#__PURE__*/React.createElement("path", {
    d: "M8 3.2v9.6M3.2 8h9.6",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  })
};
Object.assign(__ds_scope, { Icon, Icons });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Icon.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The native select, styled. Deliberately not a custom listbox: the native control
   gets keyboard behaviour, mobile pickers and screen-reader semantics for free, and a
   consuming project that needs a rich listbox should reach for Radix Select — which
   reads the same shadcn slots this does, so it inherits this appearance. */
const chrome = invalid => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 'var(--control-md)',
  padding: '0 var(--space-3)',
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-body)',
  lineHeight: 'var(--leading-body)',
  color: 'var(--foreground)',
  background: 'var(--card)',
  border: 'var(--hairline) solid ' + (invalid ? 'var(--danger)' : 'var(--input)'),
  borderRadius: 'var(--radius-sm)',
  outline: 'none'
});
function Select({
  invalid = false,
  options = [],
  placeholder,
  children,
  onFocus,
  onBlur,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: e => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      onBlur && onBlur(e);
    },
    style: {
      ...chrome(invalid),
      appearance: 'none',
      paddingRight: 'var(--space-6)',
      cursor: 'pointer',
      boxShadow: focus ? '0 0 0 var(--focus-width-inner) var(--focus-inner), 0 0 0 var(--focus-width-outer) var(--focus-outer)' : 'none',
      ...style
    }
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  }), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 'var(--space-3)',
      top: '50%',
      transform: 'translateY(-50%) rotate(90deg)',
      color: 'var(--muted-foreground)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    size: "sm"
  }, __ds_scope.Icons.chevron)));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Stack.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Layout on the 8px unit. `gap` takes a unit MULTIPLIER, not a length — Stack gap={2}
   is 16px — so a layout cannot drift off the grid by typing a number. Flex/grid with
   gap rather than margins, so spacing survives reordering and deletion. */
const SPACE = {
  0: '0',
  0.5: 'var(--space-1)',
  1: 'var(--space-2)',
  1.5: 'var(--space-3)',
  2: 'var(--space-4)',
  3: 'var(--space-5)',
  4: 'var(--space-6)',
  6: 'var(--space-7)',
  8: 'var(--space-8)',
  12: 'var(--space-9)'
};
const warned = new Set();
function resolve(n) {
  if (n == null) return undefined;
  if (SPACE[n] !== undefined) return SPACE[n];
  const key = 'gap/' + n;
  if (!warned.has(key)) {
    warned.add(key);
    console.warn('[Frostwork] Stack: gap={' + n + '} is not on the 8px unit. Legal multipliers: ' + Object.keys(SPACE).join(', ') + '. Rounding to the nearest.');
  }
  const legal = Object.keys(SPACE).map(Number).sort((a, b) => Math.abs(a - n) - Math.abs(b - n));
  return SPACE[legal[0]];
}
function Stack({
  direction = 'column',
  gap = 1,
  align,
  justify,
  wrap = false,
  inline = false,
  padding,
  as: Tag = 'div',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction,
      gap: resolve(gap),
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : undefined,
      padding: resolve(padding),
      minWidth: 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Stack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Stack.jsx", error: String((e && e.message) || e) }); }

// components/primitives/VisuallyHidden.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Available to screen readers, invisible on screen. The clip-rect technique rather
   than display:none or visibility:hidden, both of which remove the node from the
   accessibility tree — which is the opposite of the point. */
function VisuallyHidden({
  as: Tag = 'span',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
      border: 0
    }
  }, rest), children);
}
Object.assign(__ds_scope, { VisuallyHidden });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/VisuallyHidden.jsx", error: String((e && e.message) || e) }); }

// components/primitives/plane.js
try { (() => {
/* Which plane a subtree is on. Glass is the FUNCTIONAL layer — labels, icons,
   controls; the content plane is where prose and the muted tier live.

   This exists so Text can enforce the plane rules without an author having to
   remember them. GlassSurface provides 'glass'; everything else is 'content' by
   default, which is the safe direction: a mistaken 'content' renders a legible
   surface, a mistaken 'glass' would relax a rule it should not.

   Lowercase on purpose — a capitalised export would land on the design system's
   window namespace as if it were a component. */
const planeContext = React.createContext('content');
Object.assign(__ds_scope, { planeContext });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/plane.js", error: String((e && e.message) || e) }); }

// components/primitives/ContentPlane.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The content plane: opaque, on the STAGE, a SIBLING of glass — never inside it.

   Read this before using it. An opaque box nested inside a glass surface is the
   retired density-1 mechanism under a new name: protection applied on top of the
   material rather than by it. It failed the harness across opposing chrome and
   bidirectional media, which is why density 1 does not exist. Re-admitting it as a
   component would reintroduce the same defect with a friendlier API.

   So the plane split is horizontal, not vertical. On the stage:
     glass  → the functional layer: nav, labels, icons, controls, status
     plane  → content: prose, the muted tier, data
   Both sit directly on the stage. If prose seems to need to live inside a frosted
   pane, the pane is wrong — either it should not be glass, or the prose belongs
   beside it.

   This component carries both halves of the plane: the `.glass-content` recipe
   (opaque --surface-page, chrome-correct ink, concentric radius) and the plane
   CONTEXT that Text reads. It warns if it finds itself inside `.glass`; the
   conformance harness fails the same composite (check 7). */

const warned = new Set();
function ContentPlane({
  as: Tag = 'div',
  padding,
  className,
  style,
  children,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement || !el.parentElement.closest('.glass')) return;
    const key = (el.textContent || '').slice(0, 24);
    if (warned.has(key)) return;
    warned.add(key);
    console.warn('[Frostwork] ContentPlane is inside a .glass surface. An opaque box on top of ' + 'the material is the retired density-1 scrim — it failed contrast over opposing chrome and ' + 'bidirectional media. Move this plane out to be a SIBLING of the glass surface, on the stage.');
  });
  const cls = 'glass-content' + (className ? ' ' + className : '');
  const pad = padding === undefined ? undefined : 'calc(var(--unit) * ' + padding + ')';
  return /*#__PURE__*/React.createElement(__ds_scope.planeContext.Provider, {
    value: "content"
  }, /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: cls,
    style: {
      padding: pad,
      ...style
    }
  }, rest), children));
}
Object.assign(__ds_scope, { ContentPlane });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/ContentPlane.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Text.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Roles, not sizes. An author writes role="title"; the pixel value is an
   implementation detail of the role, which is what lets the scale be retuned
   without touching a single component. */
const ROLES = {
  mega: {
    fontSize: 'var(--text-mega)',
    lineHeight: 'var(--leading-mega)',
    letterSpacing: 'var(--tracking-mega)',
    family: 'display',
    weight: 'bold',
    tag: 'h1'
  },
  hero: {
    fontSize: 'var(--text-hero)',
    lineHeight: 'var(--leading-hero)',
    letterSpacing: 'var(--tracking-hero)',
    family: 'display',
    weight: 'bold',
    tag: 'h1'
  },
  display: {
    fontSize: 'var(--text-display)',
    lineHeight: 'var(--leading-display)',
    letterSpacing: 'var(--tracking-display)',
    family: 'display',
    weight: 'bold',
    tag: 'h1'
  },
  title: {
    fontSize: 'var(--text-title)',
    lineHeight: 'var(--leading-title)',
    letterSpacing: 'var(--tracking-title)',
    family: 'display',
    weight: 'bold',
    tag: 'h2'
  },
  lead: {
    fontSize: 'var(--text-lead)',
    lineHeight: 'var(--leading-lead)',
    letterSpacing: 'var(--tracking-lead)',
    family: 'ui',
    weight: 'regular',
    tag: 'p'
  },
  body: {
    fontSize: 'var(--text-body)',
    lineHeight: 'var(--leading-body)',
    letterSpacing: 'var(--tracking-body)',
    family: 'ui',
    weight: 'regular',
    tag: 'p'
  },
  small: {
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--leading-small)',
    letterSpacing: 'var(--tracking-small)',
    family: 'ui',
    weight: 'regular',
    tag: 'p'
  },
  micro: {
    fontSize: 'var(--text-micro)',
    lineHeight: 'var(--leading-micro)',
    letterSpacing: 'var(--tracking-micro)',
    family: 'ui',
    weight: 'regular',
    tag: 'span'
  }
};

/* Roles that are prose. On glass these are refused: glass is the functional layer,
   and body copy over live media is the composition that produced most of this
   system's contrast failures. */
const PROSE = new Set(['lead', 'body']);
const warned = new Set();
function warnOnce(key, msg) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn('[Frostwork] Text: ' + msg);
}
function Text({
  role = 'body',
  tone = 'default',
  weight,
  align,
  as,
  plane: planeProp,
  numeric = false,
  mono = false,
  children,
  style,
  ...rest
}) {
  const inherited = React.useContext(__ds_scope.planeContext);
  const plane = planeProp || inherited;
  const spec = ROLES[role] || ROLES.body;
  const onGlass = plane === 'glass';
  let effTone = tone;
  let effWeight = weight || spec.weight;
  if (onGlass) {
    /* L3-plane · the muted tier is a content role. On glass it is derived to sit
       below the primary role, and over live media there is no headroom beneath it. */
    if (tone === 'muted') {
      warnOnce('muted/' + role, 'tone="muted" is not legal on glass — the muted tier has no contrast headroom over live media. Falling back to the primary role. Move this text to the content plane if it needs to read as secondary.');
      effTone = 'default';
    }
    /* L3-plane · prose belongs to the content plane. */
    if (PROSE.has(role)) {
      warnOnce('prose/' + role, 'role="' + role + '" is prose, and glass is the functional layer — it carries labels, icons and controls. Move body copy to the content plane.');
    }
    /* L3-floor · 12px over a translucent fill takes semibold. Thin fills eat the
       bottom of the contrast range, and hairline strokes go first. */
    if (role === 'micro' && effWeight === 'regular') {
      effWeight = 'semibold';
    }
  }
  const Tag = as || spec.tag;
  const color = onGlass ? effTone === 'muted' ? 'var(--glass-text-muted)' : 'var(--glass-text)' : effTone === 'muted' ? 'var(--text-muted)' : effTone === 'strong' ? 'var(--text-strong)' : 'var(--text-body)';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: mono ? 'var(--font-mono)' : spec.family === 'display' ? 'var(--font-display)' : 'var(--font-ui)',
      fontSize: spec.fontSize,
      lineHeight: spec.lineHeight,
      letterSpacing: spec.letterSpacing,
      fontWeight: 'var(--weight-' + effWeight + ')',
      color,
      textAlign: align,
      textWrap: PROSE.has(role) ? 'pretty' : undefined,
      fontVariantNumeric: numeric ? 'tabular-nums' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Text });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Text.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The visual box is 20px and the hit area is exactly --touch-min (44px). Both use
   border-box, so the declared numbers ARE the rendered numbers — with content-box the
   box measured 22px (20 + 1px border each side) and the label 52px (44 + padding),
   which meant the documented contract and the geometry could not agree. 44 is 5.5
   units: the one place the 8px grid loses to a platform requirement, on purpose.

   `readOnly` is forwarded, and inferred when `checked` is passed without `onChange`,
   so a static or documented checked state is expressible without React's controlled-
   input error. A design-system control that cannot render read-only cleanly produces
   that error in every consumer that documents one.

   Checked state is carried by the CHECK GLYPH, not by fill colour alone, so it
   survives grayscale (rule L3-grayscale). */
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  readOnly,
  label,
  description,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      boxSizing: 'border-box',
      minHeight: 'var(--touch-min)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      flex: '0 0 auto',
      width: 20,
      height: 20
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    readOnly: readOnly || checked !== undefined && !onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      boxSizing: 'border-box',
      width: 20,
      height: 20,
      borderRadius: 'calc(var(--unit) * 0.5)',
      border: 'var(--hairline) solid ' + (checked ? 'transparent' : 'var(--input)'),
      background: checked ? 'var(--primary)' : 'var(--card)',
      color: 'var(--primary-fg)',
      display: 'grid',
      placeItems: 'center'
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    size: "sm"
  }, __ds_scope.Icons.check) : null)), label || description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      minWidth: 0
    }
  }, label ? /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "small",
    as: "span"
  }, label) : null, description ? /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "micro",
    tone: "muted",
    as: "span"
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Field owns everything around a control: the label, the description, the error, and
   the id wiring between them. Controls do not own their own label — that is what
   makes a missing label impossible rather than merely discouraged.

   The error is a Text + Icon pair, never colour alone (rule L3-grayscale). Radix and
   shadcn both expect aria-describedby / aria-invalid to be wired by the field
   wrapper, so this is also the shape their form primitives drop into unchanged. */
let seq = 0;
const warned = new Set();
function Field({
  label,
  description,
  error,
  required = false,
  htmlFor,
  children,
  ...rest
}) {
  const auto = React.useMemo(() => 'fw-field-' + ++seq, []);
  const id = htmlFor || auto;
  const descId = description ? id + '-desc' : undefined;
  const errId = error ? id + '-err' : undefined;
  if (!label && !warned.has(id)) {
    warned.add(id);
    console.warn('[Frostwork] Field: no label. A visible label is the default; if the design genuinely has none, pass a VisuallyHidden label rather than omitting it.');
  }

  /* The control is cloned rather than wrapped, so the id and ARIA wiring land on the
     real input and Radix's own props are preserved. */
  const control = React.isValidElement(children) ? React.cloneElement(children, {
    id,
    'aria-describedby': [descId, errId].filter(Boolean).join(' ') || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
    ...children.props
  }) : children;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      minWidth: 0
    }
  }, rest), label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      gap: 'var(--space-1)',
      alignItems: 'baseline',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "small",
    weight: "semibold",
    as: "span"
  }, label), required ? /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "small",
    as: "span",
    tone: "muted",
    "aria-hidden": "true"
  }, "*") : null) : null, description ? /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "micro",
    tone: "muted",
    id: descId
  }, description) : null, control, error ? /*#__PURE__*/React.createElement("div", {
    id: errId,
    role: "alert",
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center',
      color: 'var(--danger-glass)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    size: "sm"
  }, __ds_scope.Icons.alert), /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "micro",
    as: "span",
    weight: "semibold",
    style: {
      color: 'inherit'
    }
  }, error)) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A switch reports a state that takes effect immediately; a checkbox reports a value
   that takes effect on submit. That distinction is the only reason both exist.

   On state is carried by the THUMB POSITION as well as the track fill — position is
   the non-colour carrier here, which is why the track is deliberately wide enough for
   the travel to be unmistakable at a glance. */
function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      minHeight: 'var(--touch-min)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: 'var(--space-6)',
      height: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--primary)' : 'var(--muted)',
      border: 'var(--hairline) solid ' + (checked ? 'transparent' : 'var(--input)'),
      transition: 'background 160ms cubic-bezier(.2,.6,.2,1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 'calc(100% - 17px)' : '3px',
      width: 14,
      height: 14,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--primary-fg)' : 'var(--card)',
      boxShadow: '0 1px 2px rgba(10,10,10,.3)',
      transition: 'left 160ms cubic-bezier(.2,.6,.2,1)'
    }
  })), label ? /*#__PURE__*/React.createElement(__ds_scope.Text, {
    role: "small",
    as: "span"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassSurface.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GlassSurface({
  level = 'card',
  fill = 'inherit',
  emphasis,
  tone,
  refract,
  interactive = false,
  scrim = false,
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...rest
}) {
  const cls = ['glass', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    "data-glass-level": level,
    "data-glass-fill": fill === 'light' || fill === 'dark' ? fill : undefined,
    "data-emphasis": emphasis || undefined,
    "data-tone": tone || undefined,
    "data-glass-refract": refract && refract !== 'none' ? refract : undefined,
    "data-glass-interactive": interactive ? '' : undefined,
    style: style
  }, rest), scrim ? /*#__PURE__*/React.createElement("span", {
    className: "glass-scrim"
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.planeContext.Provider, {
    value: "glass"
  }, children));
}
Object.assign(__ds_scope, { GlassSurface });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassSurface.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 'var(--control-sm)',
    padding: '0 var(--space-4)',
    fontSize: 'var(--text-small)'
  },
  md: {
    height: 'var(--control-md)',
    padding: '0 var(--space-5)',
    fontSize: 'var(--text-body)'
  }
};
function GlassButton({
  size = 'md',
  fill = 'inherit',
  emphasis = 'secondary',
  tone,
  disabled = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.GlassSurface, _extends({
    as: "button",
    level: "button",
    fill: fill,
    emphasis: emphasis,
    tone: tone,
    interactive: !disabled,
    type: "button",
    disabled: disabled,
    style: {
      fontFamily: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      flex: '0 0 auto',
      fontWeight: 'var(--weight-semibold)',
      ...SIZES[size],
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GlassButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassButton.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassModal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GlassModal({
  title,
  body,
  actions,
  fill = 'inherit',
  open = true,
  onClose,
  scrimOpacity = 0.4,
  style,
  children,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(10,10,10,' + scrimOpacity + ')'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.GlassSurface, _extends({
    level: "modal",
    fill: fill,
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'relative',
      width: 'min(100%, 420px)',
      padding: 'var(--space-6)',
      display: 'grid',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-lead)',
      letterSpacing: 'var(--tracking-title)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, title) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body)',
      color: 'var(--glass-text)',
      textWrap: 'pretty'
    }
  }, body) : null, children, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      justifyContent: 'flex-end'
    }
  }, actions) : null));
}
Object.assign(__ds_scope, { GlassModal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassModal.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GlassNav({
  brand = 'Frostwork',
  items = [],
  active,
  onSelect,
  fill = 'inherit',
  trailing,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.GlassSurface, _extends({
    level: "nav",
    fill: fill,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      minWidth: 0,
      overflow: 'hidden',
      height: 'var(--nav-height)',
      padding: 'calc(var(--space-2) - var(--hairline)) var(--space-4)',
      ...style
    }
  }, rest), brand ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-small)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-title)',
      flex: '0 0 auto'
    }
  }, brand) : null, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      marginRight: 'auto',
      minWidth: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
      height: 'var(--control-md)',
      padding: '0 var(--space-1)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--glass-edge)',
      background: 'rgba(var(--glass-tint),.10)'
    }
  }, items.map(it => {
    const on = it === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it,
      type: "button",
      onClick: onSelect ? () => onSelect(it) : undefined,
      "aria-pressed": on,
      style: {
        appearance: 'none',
        border: '1px solid ' + (on ? 'var(--glass-edge)' : 'transparent'),
        boxSizing: 'border-box',
        flex: '0 0 auto',
        height: 'var(--control-sm)',
        padding: '0 var(--space-3)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 'var(--text-small)',
        fontWeight: on ? 'var(--weight-medium)' : 'var(--weight-regular)',
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: on ? 'rgba(var(--glass-tint),.28)' : 'transparent',
        boxShadow: on ? 'inset 0 1px 0 var(--glass-edge-inner)' : 'none',
        color: on ? 'var(--glass-text)' : 'var(--glass-text-muted)',
        transition: 'background .18s cubic-bezier(.2,.6,.2,1), color .18s cubic-bezier(.2,.6,.2,1)'
      }
    }, it);
  })), trailing);
}
Object.assign(__ds_scope, { GlassNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassNav.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassSearch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Search field that starts as a circle and grows into a pill. The glass expands —
   it does not swap for a different element — so the surface stays one continuous
   object through the transition. */

function GlassSearch({
  placeholder = 'Search',
  value,
  onChange,
  onSubmit,
  open: openProp,
  width = 320,
  fill = 'inherit',
  style,
  ...rest
}) {
  const [openState, setOpenState] = React.useState(false);
  const inputRef = React.useRef(null);
  const open = openProp != null ? openProp : openState;
  const h = 'var(--control-md)';
  const expand = () => {
    if (openProp == null) setOpenState(true);
    requestAnimationFrame(() => inputRef.current && inputRef.current.focus());
  };
  return /*#__PURE__*/React.createElement(__ds_scope.GlassSurface, _extends({
    level: "nav",
    fill: fill,
    interactive: !open,
    onClick: open ? undefined : expand,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      overflow: 'hidden',
      height: h,
      width: open ? width : 'var(--control-md)',
      padding: open ? '0 var(--space-4)' : 0,
      justifyContent: open ? 'flex-start' : 'center',
      borderRadius: 'var(--radius-pill)',
      transition: 'width .42s cubic-bezier(.32,.72,0,1), padding .42s cubic-bezier(.32,.72,0,1), background .18s cubic-bezier(.2,.6,.2,1)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: '0 0 auto',
      opacity: open ? 0.6 : 1
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.5-3.5"
  })), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "search",
    placeholder: placeholder,
    value: value,
    onChange: onChange ? e => onChange(e.target.value) : undefined,
    onBlur: openProp == null ? () => {
      if (!value) setOpenState(false);
    } : undefined,
    onKeyDown: e => {
      if (e.key === 'Enter' && onSubmit) onSubmit(value);
      if (e.key === 'Escape' && openProp == null) setOpenState(false);
    },
    tabIndex: open ? 0 : -1,
    style: {
      flex: 1,
      minWidth: 0,
      appearance: 'none',
      border: 0,
      outline: 'none',
      background: 'none',
      fontFamily: 'inherit',
      fontSize: 'var(--text-small)',
      color: 'var(--glass-text)',
      opacity: open ? 1 : 0,
      transition: 'opacity .2s cubic-bezier(.2,.6,.2,1) ' + (open ? '.12s' : '0s'),
      pointerEvents: open ? 'auto' : 'none',
      width: open ? 'auto' : 0
    }
  }));
}
Object.assign(__ds_scope, { GlassSearch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassSearch.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassSegmented.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Segmented control. The selection is a single piece of glass that SLIDES between
   items — it never fades in place. One moving highlight reads as one object; a
   fading one reads as two. The track keeps a full 4px inset (not 4px minus the
   hairline) so the sliding thumb never lands on the track's own outline. */

function GlassSegmented({
  items = [],
  value,
  onChange,
  size = 'md',
  fill = 'inherit',
  style,
  ...rest
}) {
  const trackRef = React.useRef(null);
  const [thumb, setThumb] = React.useState(null);
  const active = value != null ? value : items[0];
  const h = size === 'sm' ? 'var(--control-sm)' : 'var(--control-md)';
  React.useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const el = track.querySelector('[data-on="true"]');
      if (!el) return setThumb(null);
      const t = track.getBoundingClientRect(),
        r = el.getBoundingClientRect();
      setThumb({
        x: r.left - t.left,
        w: r.width
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [active, items.join('|'), size]);
  return /*#__PURE__*/React.createElement(__ds_scope.GlassSurface, _extends({
    level: "nav",
    fill: fill,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: h,
      padding: 'var(--space-1)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      height: '100%'
    }
  }, thumb ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: thumb.w,
      transform: 'translateX(' + thumb.x + 'px)',
      transition: 'transform .34s cubic-bezier(.32,.72,0,1), width .34s cubic-bezier(.32,.72,0,1)',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(var(--glass-tint),.30)',
      border: 'var(--hairline) solid var(--glass-edge)',
      boxShadow: 'inset 0 var(--hairline) 0 var(--glass-edge-inner)',
      pointerEvents: 'none'
    }
  }) : null, items.map(it => {
    const on = it === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it,
      type: "button",
      "data-on": on ? 'true' : 'false',
      "aria-pressed": on,
      onClick: onChange ? () => onChange(it) : undefined,
      style: {
        position: 'relative',
        appearance: 'none',
        border: 0,
        background: 'none',
        cursor: 'pointer',
        height: '100%',
        padding: '0 var(--space-3)',
        whiteSpace: 'nowrap',
        flex: '0 0 auto',
        fontFamily: 'inherit',
        fontSize: 'var(--text-small)',
        fontWeight: on ? 'var(--weight-medium)' : 'var(--weight-regular)',
        color: on ? 'var(--glass-text)' : 'var(--glass-text-muted)',
        transition: 'color .2s cubic-bezier(.2,.6,.2,1)'
      }
    }, it);
  })));
}
Object.assign(__ds_scope, { GlassSegmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassSegmented.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/SpecChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SpecChip({
  blur,
  opacity,
  override = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "mono",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 'var(--space-5)',
      padding: '0 var(--space-2)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--glass-edge)',
      background: 'rgba(var(--glass-tint),.14)',
      color: 'var(--glass-text-muted)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, "blur ", typeof blur === 'number' ? blur + 'px' : blur), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      opacity: .5
    }
  }, "/"), /*#__PURE__*/React.createElement("span", null, typeof opacity === 'number' ? opacity.toFixed(2) : opacity), override ? /*#__PURE__*/React.createElement("span", {
    title: "accessibility fill override in use",
    style: {
      color: 'var(--glass-text)',
      borderLeft: '1px solid var(--glass-edge)',
      paddingLeft: '6px'
    }
  }, "fill") : null);
}
Object.assign(__ds_scope, { SpecChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/SpecChip.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GlassCard({
  eyebrow,
  title,
  body,
  meta,
  fill = 'inherit',
  scrim = false,
  spec,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.GlassSurface, _extends({
    level: "card",
    fill: fill,
    scrim: scrim,
    style: {
      padding: 'var(--space-5)',
      display: 'grid',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: 'var(--glass-text-muted)'
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-title)',
      lineHeight: 'var(--leading-snug)',
      letterSpacing: 'var(--tracking-title)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, title) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--glass-text)',
      textWrap: 'pretty'
    }
  }, body) : null, children, meta || spec ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'var(--space-1)'
    }
  }, meta ? /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: 'var(--glass-text-muted)'
    }
  }, meta) : /*#__PURE__*/React.createElement("span", null), spec ? /*#__PURE__*/React.createElement(__ds_scope.SpecChip, spec) : null) : null);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/media-registry.js
try { (() => {
/* ─────────────────────────────────────────────────────────────────
   MEDIA REGISTRY · the measured facts for every photograph the system ships.

   Why this exists. A mood describes SYNTHETIC media — the gradient stand-ins in
   tokens/backdrops.css. `<BackdropStage image="…">` swaps in a real photograph but
   left the published facts behind: mood="plain" over a near-white photo published
   luma "dark" and tone 26,26,26, and every surface above it then chose a text role
   for media that was not there. So: an image publishes its OWN facts.

   ── WHAT IS MEASURED, AND THE CORRECTION THAT MATTERS ───────────────────────
   Text never sits on the photograph. It sits on the photograph AFTER the pane's own
   blur has been applied to it — and a blur is a low-pass filter, so it destroys
   precisely the local extremes the derivation was rejecting media for. Measuring
   the unblurred frame measured an image no reader ever sees.

   So every window figure here is measured through the pane: the frame is downscaled
   to 240px, blurred by the pane's own radius at measurement scale (CSS blur(r) is a
   Gaussian of std dev r/2; a stage is ~1280px wide, so a depth-D pane blurs by
   (D/2)·(240/1280) px here), then divided into an 8×8 grid of text-sized windows.
   Within each window we take its own p95 and p5, and keep the brightest p95 and the
   darkest p5 found anywhere in the FOOTPRINT being measured.

   This is a correction, not a relaxation. Nothing here lowers a threshold; the
   thresholds are unchanged. It measures the right image. Transmitting media went
   from 2 of 8 stills to 4 of 8 full-bleed — and the two that changed are the two
   whose rejection came from a specular patch the pane had already erased.

   Averaging still lies, and the older lesson stands: an earlier version measured
   tile MEANS, and a specular highlight moves a tile's mean by a few units and its
   p95 by eighty. sat-strawberry passed on means and shipped the least legible card
   in the system. Percentiles per window, never means.

   ── TWO AXES, BOTH AUTHORED FACTS, NEITHER A SURFACE DECISION ───────────────
   depth      Which rung of the ladder the thinnest surface on the stage uses.
              Thinner glass erases less, so the THINNEST surface governs — the same
              worst-case logic that governs everything else here. Recorded at 10
              (button), 18 (nav) and 72 (card and modal, converged).
   footprint  Which windows the stage's content actually covers: 'full' (all 64) or
              'center' (the middle 4×4). Declared once on the stage as a layout fact,
              which is a Layer-1 concern. Undeclared falls back to 'full', so an
              omission is never the less safe option.

   ── HOW A DENSITY FOLLOWS ───────────────────────────────────────────────────
   Unchanged, and still nothing here is a judgement call:
     p50 ≥ 128 ....................... luma "light"  → density 2 (legality rule 1)
     bright > 192 AND dark < 64 ...... bidirectional → density 2 (legality rule 2)
     otherwise ....................... luma "dark"   → density 0

   192 is 75% of white and 64 is 25%: past those, one patch refuses dark text while
   another refuses light text, and no single role serves both.

   ── WHAT THE MEASUREMENTS SAY ───────────────────────────────────────────────
   Rule 1 is now the binding constraint, and it should be: three of the four stills
   that still refuse to transmit are simply BRIGHT (warm-citrus, light-ice,
   edge-plate), and no amount of blur darkens a bright field. Blur only ever helped
   the media whose problem was locality. That is the correct shape for this to have.

   Depth past 28 buys nothing here — the extremes are already gone at 28, and 72
   measures the same verdicts. The card's depth is 72 for how it LOOKS, and the
   registry is the evidence that it was not bought for legibility.

   ── ANIMATED MEDIA IS ALWAYS DENSITY 2 ──────────────────────────────────────
   A GIF can only be sampled at one frame, and one frame is not a measurement of a
   moving field. The worst case is spread over TIME and no build step can see it, so
   animated media does not get to claim a transmitting stage at any depth.

   ── ADDING A PHOTOGRAPH ─────────────────────────────────────────────────────
   Measure it, add it here, reference it by key. An image with no entry is refused a
   transmitting stage: unmeasured media publishes density 2 and warns once.
   ───────────────────────────────────────────────────────────────── */

/* Not exported: a capitalised export lands on the design system's window namespace
   as if it were a component. Read it through mediaFacts(). */
const MEDIA = {
  'warm-citrus': {
    file: 'warm-citrus.jpg',
    tone: {
      full: '227,166,98',
      center: '234,169,80'
    },
    note: 'Bright everywhere and on every band. Blur cannot darken a bright field, which is rule 1 doing exactly its job: light media stays light no matter how thick the pane.',
    windows: {
      10: {
        full: {
          p50: 185,
          bright: 246,
          dark: 24,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 177,
          bright: 240,
          dark: 57,
          luma: "light",
          density: "2"
        }
      },
      18: {
        full: {
          p50: 184,
          bright: 243,
          dark: 34,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 176,
          bright: 237,
          dark: 66,
          luma: "light",
          density: "2"
        }
      },
      72: {
        full: {
          p50: 181,
          bright: 233,
          dark: 71,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 177,
          bright: 213,
          dark: 111,
          luma: "light",
          density: "2"
        }
      }
    }
  },
  'cool-mangosteen': {
    file: 'cool-mangosteen.jpg',
    tone: {
      full: '64,54,60',
      center: '103,71,79'
    },
    note: 'The clearest case for measuring the blurred field. Unblurred it reads bidirectional — one specular patch at 198 beside near-black. At any real pane depth that patch is gone and the frame transmits.',
    windows: {
      10: {
        full: {
          p50: 50,
          bright: 186,
          dark: 5,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 78,
          bright: 186,
          dark: 6,
          luma: "dark",
          density: "0"
        }
      },
      18: {
        full: {
          p50: 50,
          bright: 182,
          dark: 6,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 78,
          bright: 182,
          dark: 7,
          luma: "dark",
          density: "0"
        }
      },
      72: {
        full: {
          p50: 51,
          bright: 161,
          dark: 8,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 75,
          bright: 161,
          dark: 17,
          luma: "dark",
          density: "0"
        }
      }
    }
  },
  'busy-taps': {
    file: 'busy-taps.jpg',
    tone: {
      full: '101,94,87',
      center: '116,100,84'
    },
    note: 'Worst media in the set: clipped highlights against clipped black, plus a wordmark. Transmits on the centre band only, and full-bleed never.',
    windows: {
      10: {
        full: {
          p50: 88,
          bright: 255,
          dark: 0,
          luma: "dark",
          density: "2"
        },
        center: {
          p50: 96,
          bright: 198,
          dark: 9,
          luma: "dark",
          density: "2"
        }
      },
      18: {
        full: {
          p50: 89,
          bright: 255,
          dark: 0,
          luma: "dark",
          density: "2"
        },
        center: {
          p50: 96,
          bright: 192,
          dark: 11,
          luma: "dark",
          density: "2"
        }
      },
      72: {
        full: {
          p50: 92,
          bright: 239,
          dark: 0,
          luma: "dark",
          density: "2"
        },
        center: {
          p50: 99,
          bright: 160,
          dark: 39,
          luma: "dark",
          density: "0"
        }
      }
    }
  },
  'plain-pour': {
    file: 'plain-pour.jpg',
    tone: {
      full: '2,1,1',
      center: '2,1,1'
    },
    note: 'Near-total black. Transmits at every depth and every band, and publishes almost no tone — so the glass over it stays close to achromatic.',
    windows: {
      10: {
        full: {
          p50: 0,
          bright: 136,
          dark: 0,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 0,
          bright: 59,
          dark: 0,
          luma: "dark",
          density: "0"
        }
      },
      18: {
        full: {
          p50: 0,
          bright: 112,
          dark: 0,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 0,
          bright: 50,
          dark: 0,
          luma: "dark",
          density: "0"
        }
      },
      72: {
        full: {
          p50: 0,
          bright: 47,
          dark: 0,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 0,
          bright: 24,
          dark: 0,
          luma: "dark",
          density: "0"
        }
      }
    }
  },
  'light-ice': {
    file: 'light-ice.jpg',
    tone: {
      full: '213,220,193',
      center: '185,198,146'
    },
    note: 'The light extreme. Nothing transmits over this at any depth or footprint.',
    windows: {
      10: {
        full: {
          p50: 231,
          bright: 255,
          dark: 80,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 200,
          bright: 246,
          dark: 80,
          luma: "light",
          density: "2"
        }
      },
      18: {
        full: {
          p50: 231,
          bright: 254,
          dark: 85,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 199,
          bright: 241,
          dark: 85,
          luma: "light",
          density: "2"
        }
      },
      72: {
        full: {
          p50: 227,
          bright: 251,
          dark: 117,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 194,
          bright: 232,
          dark: 135,
          luma: "light",
          density: "2"
        }
      }
    }
  },
  'split-spectrum': {
    file: 'split-spectrum.jpg',
    tone: {
      full: '50,15,92',
      center: '24,8,67'
    },
    note: 'Saturated hue, tiny luma range — the proof that "colourful" and "high-contrast" are different measurements. Transmits unconditionally.',
    windows: {
      10: {
        full: {
          p50: 26,
          bright: 87,
          dark: 2,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 15,
          bright: 39,
          dark: 2,
          luma: "dark",
          density: "0"
        }
      },
      18: {
        full: {
          p50: 26,
          bright: 86,
          dark: 2,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 15,
          bright: 39,
          dark: 2,
          luma: "dark",
          density: "0"
        }
      },
      72: {
        full: {
          p50: 26,
          bright: 84,
          dark: 4,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 16,
          bright: 39,
          dark: 4,
          luma: "dark",
          density: "0"
        }
      }
    }
  },
  'edge-plate': {
    file: 'edge-plate.jpg',
    tone: {
      full: '193,185,180',
      center: '162,131,119'
    },
    note: 'Light on every band. Hard printed edges survive blur better than gradients do, but rule 1 settles it before that matters.',
    windows: {
      10: {
        full: {
          p50: 226,
          bright: 249,
          dark: 10,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 122,
          bright: 245,
          dark: 10,
          luma: "dark",
          density: "2"
        }
      },
      18: {
        full: {
          p50: 223,
          bright: 249,
          dark: 15,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 119,
          bright: 244,
          dark: 15,
          luma: "dark",
          density: "2"
        }
      },
      72: {
        full: {
          p50: 214,
          bright: 246,
          dark: 53,
          luma: "light",
          density: "2"
        },
        center: {
          p50: 121,
          bright: 238,
          dark: 53,
          luma: "dark",
          density: "2"
        }
      }
    }
  },
  'sat-strawberry': {
    file: 'sat-strawberry.jpg',
    tone: {
      full: '175,46,46',
      center: '163,44,41'
    },
    note: 'The specimen that broke the first derivation twice. Tile means called it safe; the worst-window rule then called it unsafe on the unblurred frame. Measured through the pane it transmits — and the margin is thin, which the numbers show rather than hide.',
    windows: {
      10: {
        full: {
          p50: 71,
          bright: 188,
          dark: 10,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 66,
          bright: 149,
          dark: 12,
          luma: "dark",
          density: "0"
        }
      },
      18: {
        full: {
          p50: 73,
          bright: 176,
          dark: 12,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 68,
          bright: 141,
          dark: 16,
          luma: "dark",
          density: "0"
        }
      },
      72: {
        full: {
          p50: 73,
          bright: 133,
          dark: 33,
          luma: "dark",
          density: "0"
        },
        center: {
          p50: 67,
          bright: 117,
          dark: 35,
          luma: "dark",
          density: "0"
        }
      }
    }
  },
  'motion-smoke': {
    file: 'motion-smoke.gif',
    animated: true,
    tone: {
      full: '42,52,65',
      center: '42,52,65'
    },
    measured: 'first frame only — p50 8 · bright 215 · dark 1',
    note: 'Reads near-black overall and carries near-white wisps. The clearest case for refusing animated media a transmitting stage.'
  },
  'motion-fireworks': {
    file: 'motion-fireworks.gif',
    animated: true,
    tone: {
      full: '68,51,37',
      center: '68,51,37'
    },
    measured: 'first frame only — p50 30 · bright 232 · dark 12',
    note: 'Contrast arrives in bursts. Any single sample is the wrong sample.'
  },
  'motion-watch': {
    file: 'motion-watch.gif',
    animated: true,
    tone: {
      full: '115,126,122',
      center: '115,126,122'
    },
    measured: 'first frame only — p50 128 · bright 252 · dark 1',
    note: 'Metallic specular motion across the entire range, mean sitting innocently in the middle of it.'
  }
};

/* The ladder rungs a stage can be measured at. A stage whose thinnest surface is a
   card (72) is measured at 72; one that also carries a nav is measured at 18. */
const REF_DEPTHS = [10, 18, 72];
function nearestRefDepth(depth) {
  const d = Number(depth);
  if (!Number.isFinite(d)) return 18;
  return REF_DEPTHS.reduce((a, b) => Math.abs(b - d) < Math.abs(a - d) ? b : a);
}
function resolveMediaKey(image) {
  if (!image) return null;
  if (MEDIA[image]) return image;
  const base = String(image).split('/').pop().split('?')[0];
  if (MEDIA[base]) return base;
  const stem = base.replace(/\.(jpg|jpeg|png|webp|gif|avif)$/i, '');
  return MEDIA[stem] ? stem : null;
}
const ANIMATED_EXT = /\.(gif|apng|webp)$/i;
function mediaFacts(image) {
  const key = resolveMediaKey(image);
  if (key) return {
    key,
    ...MEDIA[key]
  };
  return {
    key: null,
    unmeasured: true,
    animatedGuess: ANIMATED_EXT.test(String(image || ''))
  };
}

/* The facts a stage should publish for this image, given the thinnest surface it
   carries and the footprint its content covers. Density is READ from the measured
   table, never recomputed here — the arithmetic lives at the build step where the
   pixels are, and this function only chooses which measured cell applies. */
function stageFacts(image, {
  depth = 18,
  footprint = 'full'
} = {}) {
  const facts = mediaFacts(image);
  if (!facts.key) return {
    ...facts,
    density: '2',
    luma: 'dark',
    tone: null,
    why: 'unmeasured media is refused a transmitting stage'
  };
  const band = footprint === 'center' ? 'center' : 'full';
  const tone = facts.tone && facts.tone[band] || null;
  if (facts.animated) {
    return {
      ...facts,
      tone,
      density: '2',
      luma: 'dark',
      band,
      why: 'animated media cannot be measured at one frame'
    };
  }
  const rung = nearestRefDepth(depth);
  const cell = facts.windows[rung][band];
  const why = cell.density === '0' ? 'transmits: p50 ' + cell.p50 + ' · bright ' + cell.bright + ' · dark ' + cell.dark : cell.luma === 'light' ? 'rule 1 — light field (p50 ' + cell.p50 + ')' : 'rule 2 — bidirectional (bright ' + cell.bright + ' · dark ' + cell.dark + ')';
  return {
    ...facts,
    tone,
    band,
    rung,
    ...cell,
    why
  };
}
Object.assign(__ds_scope, { REF_DEPTHS, nearestRefDepth, resolveMediaKey, mediaFacts, stageFacts });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/media-registry.js", error: String((e && e.message) || e) }); }

// components/surfaces/refraction.js
try { (() => {
/* ── Layer 2 · refraction ──────────────────────────────────────────────────────
   The one thing the references stop short of: bending what passes under a surface.

   WHY IT LOOKS LIKE THIS, AND NOT LIKE THE OBVIOUS THING.

   The obvious implementation is a rim layer — a child element inset along the
   edge, carrying its own reduced blur plus a displacement, so the rim shows
   sharper, warped media while the body stays soft. That is how the convincing
   demos do it, and it is ILLEGAL HERE: it puts a blurred surface inside a blurred
   surface, which is exactly what L2-budget forbids, for the reason it forbids it
   (nested blur compounds compositing cost on the devices least able to pay).
   Pseudo-elements are not an escape either — .glass-scroll-edge already owns
   ::before and ::after, and a nav is routinely both.

   So refraction happens in the surface's OWN backdrop-filter chain, and it costs
   one extra filter primitive rather than a second composited layer.

   ORDER. The chain reads left to right. url() goes LAST — blur, then displace.
   Displacing first and blurring after washes the distortion out completely; the
   blur is doing exactly what a blur does to high-frequency detail. Putting it
   last means what warps at the rim is the already-blurred field, which reads as
   thickness in the glass rather than as a lens. That is a real limitation, not a
   tuning problem, and it is the thing the refraction lab exists to judge.

   THE MAP. feDisplacementMap samples (channel − 0.5), so mid-grey is zero shift.
   Two stretched feImages supply the axes: a horizontal ramp (white → grey → black)
   into R, a vertical one into G, composited additively into one map. Both ramps
   are neutral across the middle 68% of the surface, so displacement exists only
   near the edges — the effect is edge refraction by construction, not by masking.
   White on the leading edge means x' > x, so the rim samples from further inside:
   content compresses at the boundary, which is what a real rim does.

   STRENGTH IS PRESETS, NOT A TOKEN. feDisplacementMap's scale is an SVG attribute,
   and SVG attributes cannot read CSS custom properties. A var()-driven strength
   would silently do nothing, so three filters are emitted and the CSS picks one by
   attribute value. Scales are optical (px of displacement), so F-unit exempts them.

   SUPPORT IS A GATE, AND AN HONEST ONE. url() in backdrop-filter is unevenly
   implemented; WebKit parses filter references but does not apply them to a
   backdrop. There is no way to probe this — you cannot read pixels back out of a
   composited backdrop-filter — so this module gates on CSS.supports and says so.
   What it can promise is that the gate FAILS SAFE: without [data-refraction="on"]
   the refraction rules never match and the surface is specular-only, which is the
   1.0 baseline. Refraction is additive garnish, never load-bearing. */

const RIM = 0.16; /* neutral across the middle 68%; ramp over the outer 16% per side */

function ramp(vertical) {
  const [x2, y2] = vertical ? [0, 1] : [1, 0];
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>" + "<defs><linearGradient id='g' x1='0' y1='0' x2='" + x2 + "' y2='" + y2 + "'>" + "<stop offset='0' stop-color='#ffffff'/>" + "<stop offset='" + RIM + "' stop-color='#808080'/>" + "<stop offset='" + (1 - RIM) + "' stop-color='#808080'/>" + "<stop offset='1' stop-color='#000000'/>" + "</linearGradient></defs><rect width='64' height='64' fill='url(#g)'/></svg>";
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/* subtle is the only one intended for production surfaces. medium and strong exist
   so the lab can show where the effect stops being physical and starts being an
   effect — a range you can see the ends of is easier to choose inside.
   Not exported: a capitalised export lands on the design system's window namespace
   as if it were a component, and these are internals. */
const REFRACTION_PRESETS = {
  subtle: 8,
  medium: 20,
  strong: 40
};
const DEFS_ID = 'frost-refraction-defs';
let injected = false;

/* Called by every Layer 1 publisher, so a page gets the defs iff it has media for
   them to bend. Guarded and idempotent — the second stage on a page is a no-op. */
function ensureRefractionDefs() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const supported = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('backdrop-filter', 'blur(1px) url(#x)');
  document.documentElement.setAttribute('data-refraction', supported ? 'on' : 'off');
  if (!supported) return;
  if (document.getElementById(DEFS_ID)) return;
  const filters = Object.entries(REFRACTION_PRESETS).map(([name, scale]) => '<filter id="frost-refract-' + name + '" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">' + '<feImage href="' + ramp(false) + '" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mx"/>' + '<feImage href="' + ramp(true) + '" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="my"/>' + /* keep mx's red; zero its other channels */
  '<feColorMatrix in="mx" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="rx"/>' + /* move my's red into green, so one map carries both axes */
  '<feColorMatrix in="my" type="matrix" values="0 0 0 0 0  1 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="gy"/>' + '<feComposite in="rx" in2="gy" operator="arithmetic" k2="1" k3="1" result="map"/>' + '<feDisplacementMap in="SourceGraphic" in2="map" scale="' + scale + '" xChannelSelector="R" yChannelSelector="G"/>' + '</filter>').join('');
  const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  host.setAttribute('id', DEFS_ID);
  host.setAttribute('aria-hidden', 'true');
  host.setAttribute('width', '0');
  host.setAttribute('height', '0');
  host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  host.innerHTML = '<defs>' + filters + '</defs>';
  document.body.appendChild(host);
}
Object.assign(__ds_scope, { ensureRefractionDefs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/refraction.js", error: String((e && e.message) || e) }); }

// components/surfaces/stage-contract.js
try { (() => {
/* ── Layer 1 · the stage contract ──────────────────────────────────────────────
   Only publishStageFacts() is exported. The maps and rules below are deliberately
   module-private: capitalised exports land on the design system's window namespace
   as if they were components, and a stage's internals are not public API.
   Shared by every stage component. BackdropStage and LiveBackdrop are both Layer 1
   publishers, so the legality rules cannot live in one of them — a rule enforced by
   only one publisher is a rule an author bypasses by switching component.

   The published facts are: the media's sampled tone, its measured luminance, and
   its density. Everything above the stage derives from those and decides nothing.
   ─────────────────────────────────────────────────────────────────────────── */

/* Intrinsic luminance of each media stand-in. `plain` is a dark gradient field,
   NOT a chrome-dependent neutral: the stage publishes facts about the media and
   must never publish one the media contradicts. Chrome lives in `mode`. */
const STAGE_LUMA = {
  warm: 'light',
  cool: 'dark',
  busy: 'dark',
  plain: 'dark'
};

/* Default density per mood. `busy` is bidirectional, so it starts guaranteed. */
const STAGE_DENSITY = {
  warm: '0',
  cool: '0',
  busy: '2',
  plain: '0'
};

/* BIDIRECTIONAL media carries stops at both luminance extremes in one field —
   `busy` has a 90%-white and a 92%-black stop — so no single text colour serves
   both and no text role reaches 4.5:1. This is a published FACT, not a default,
   which is what lets legaliseStage() refuse an explicit density={0} instead of
   merely defaulting away from it. */
const BIDIRECTIONAL = {
  busy: true
};

/* ── Illegal configurations ────────────────────────────────────────────────────
   The conformance harness (ui_kits/conformance) walks every mood × density ×
   chrome combination and measures contrast against the WORST gradient stop in
   each stage, not the average. Four things are refused:

   0. DENSITY 1 ENTIRELY — retired.
      "Protected" was a middle rung whose whole mechanism was local scrims: opaque
      boxes sized to each text run, sitting on top of the material they were meant
      to protect. It failed the harness across opposing-chrome and bidirectional
      media, so it was neither honest thin glass nor a guarantee.
      → corrected to 2. Use .glass-scroll-edge when a bar needs local help.

   1. A LIGHT-LUMA STAGE AT DENSITY 0.
      Light media plus the thinnest fill leaves the muted text role with nowhere to
      go — it is derived to sit below the primary role, and over bright media there
      is no headroom beneath it. Density 0 means "transmit freely", which is a
      promise light media cannot keep.
      → corrected to 2.

   2. BIDIRECTIONAL MEDIA AT DENSITY 0.
      Measured at 3.33:1 on the dark-stage, dark-chrome cell that every other rule
      permits — the one hole an author could walk through with a single prop.
      → corrected to 2.

   3. CHROME OPPOSING STAGE LUMA AT DENSITY 0.
      The fill is chosen by chrome and the text role by stage luma, so the two
      published facts disagree and the composite lands mid-tone — where neither the
      light nor the dark role reaches 4.5:1 (measured at 4.4 and 4.1).
      → corrected to 2.

   All four CORRECT rather than throw. A design system that crashes a page over a
   contrast bound is worse than one that quietly makes the surface legible, and
   agents composing screens need the failure to be self-healing and loud, not
   fatal. Each correction warns once with the reason and the fix, and stamps
   data-density-corrected on the stage so it is visible in the DOM as well.

   The gap in the numbering is deliberate: a stale `density={1}` is corrected
   loudly, where renumbering 2→1 would have let it silently mean something new.

   To opt out deliberately, pass an explicit `fill` override on the surface — the
   sanctioned escape hatch, which the harness treats as legal. */
const warned = new Set();
function legaliseStage(mood, mode, density, luma) {
  const d = String(density);
  const key = mood + '/' + mode + '/' + luma + '/' + d;
  const correct = reason => {
    if (!warned.has(key)) {
      warned.add(key);
      console.warn('[Frostwork] stage mood="' + mood + '" mode="' + mode + '" luma="' + luma + '" at density ' + d + ' is not a legal configuration: ' + reason + '. Corrected to density 2. Pass an explicit density, or a fill override on the surface, to take control.');
    }
    return {
      density: '2',
      reason
    };
  };
  if (d === '1') return correct('density 1 is retired — its only mechanism was a local scrim box sitting on top of the material, and it failed contrast over opposing chrome and bidirectional media');
  if (d !== '0') return {
    density: d,
    reason: null
  };
  if (luma === 'light') return correct('a light-luma stage cannot transmit freely — the muted text role has no headroom over bright media');
  if (BIDIRECTIONAL[mood]) return correct('mood="' + mood + '" is bidirectional media — it carries stops at both luminance extremes, so no single text colour serves both and no text role reaches 4.5:1');
  if (luma === 'dark' && mode === 'light') return correct('chrome opposes stage luma, so the fill and the text role disagree and the composite lands mid-tone where no text role reaches 4.5:1');
  return {
    density: d,
    reason: null
  };
}

/* A mood describes synthetic media. When a stage carries a REAL photograph the
   mood no longer describes what is on screen, so the image's measured facts take
   over — see media-registry.js. Unmeasured media is refused a transmitting stage:
   the system would rather look heavier than promise contrast nobody checked.

   Two facts about the stage select WHICH measured cell applies, and both are layout
   facts the author already knows — neither is a surface deciding anything:
     depth      the thinnest surface the stage carries. A blur destroys the local
                extremes the derivation rejects media for, so thinner glass erases
                less and the thinnest surface governs. Defaults to the nav rung,
                which is the thinnest text-bearing surface in normal use.
     footprint  'full' or 'center' — which windows the content actually covers.
                Defaults to 'full', so an omission is never the less safe option.

   Author intent still wins over both. An explicit luma or density prop is the
   author saying they know something the registry does not (a crop, an overlay),
   and legaliseStage() still gets the last word on whether that is legal. */
function applyMedia(image, luma, density, depth, footprint) {
  if (!image) return {
    luma,
    density,
    mediaKey: undefined
  };
  const m = __ds_scope.mediaFacts(image);
  if (m.unmeasured) {
    const key = 'unmeasured/' + image;
    if (!warned.has(key)) {
      warned.add(key);
      console.warn('[Frostwork] stage image="' + image + '" is not in the media registry, so its ' + 'luminance and contrast were never measured' + (m.animatedGuess ? ' (and animated media cannot be measured from one frame)' : '') + '. Publishing density 2. Measure it and add an entry to ' + 'components/surfaces/media-registry.js, or pass an explicit luma and density.');
    }
    return {
      luma: luma,
      density: density != null ? density : '2',
      mediaKey: undefined
    };
  }
  const f = __ds_scope.stageFacts(image, {
    depth,
    footprint
  });
  return {
    luma: luma || f.luma,
    density: density != null ? density : f.density,
    mediaKey: f.key,
    tone: f.tone,
    why: f.why
  };
}

/* One call for every Layer 1 publisher: resolve the three facts and return them as
   ready-to-spread DOM attributes, so no stage hand-assembles them. */
function publishStageFacts({
  mood,
  mode,
  luma,
  density,
  tier,
  image,
  depth,
  footprint
}) {
  /* Refraction defs are injected here rather than by the surfaces that use them:
     a page gets them iff it has media for them to bend, and the call is guarded and
     idempotent so the second stage on a page is a no-op. It also means the support
     gate on <html> is published before any glass paints. */
  __ds_scope.ensureRefractionDefs();
  const med = applyMedia(image, luma, density, depth, footprint);
  const stageLuma = med.luma || STAGE_LUMA[mood] || 'dark';
  const requested = med.density != null ? String(med.density) : STAGE_DENSITY[mood] || '0';
  const {
    density: effective,
    reason
  } = legaliseStage(mood, mode, requested, stageLuma);
  return {
    'data-mood': mood,
    'data-stage-media': med.mediaKey,
    'data-stage-luma': stageLuma,
    'data-density': effective,
    'data-density-corrected': reason ? requested : undefined,
    'data-stage-footprint': image && footprint === 'center' ? 'center' : undefined,
    'data-glass-tier': tier || undefined
  };
}
Object.assign(__ds_scope, { publishStageFacts });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/stage-contract.js", error: String((e && e.message) || e) }); }

// components/motion/LiveBackdrop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Animated backdrop. Canvas-only, no dependencies. It exists to be looked at
   THROUGH glass: every palette is low-contrast and slow, so the surface above
   inherits tone without the motion reading as a moving picture.

   It is also Layer 1 of the glass contract: it publishes its media's sampled tone,
   its luminance and its stage density for the surfaces above it. Note `density`
   here is the PARTICLE count (low/medium/high) — the glass state is `stageDensity`,
   deliberately named apart so the two cannot be confused. */

const PALETTES = {
  warm: {
    bg: ['#6d3a22', '#c07a45'],
    ink: '255,226,184',
    glow: '255,180,110',
    orbs: ['255,138,60', '255,206,120', '214,92,58']
  },
  cool: {
    bg: ['#0d151b', '#2c4353'],
    ink: '154,196,220',
    glow: '110,170,205',
    orbs: ['79,214,230', '96,132,255', '140,110,255']
  },
  busy: {
    bg: ['#181818', '#3d2a1c'],
    ink: '255,255,255',
    glow: '255,138,60',
    orbs: ['255,90,40', '255,232,120', '90,200,255']
  },
  plain: {
    bg: ['#0b0b0b', '#1c1c1c'],
    ink: '150,150,150',
    glow: '120,120,120',
    orbs: ['170,170,170', '120,120,120', '200,200,200']
  }
};
const DENSITY = {
  low: 0.55,
  medium: 1,
  high: 1.7
};

/* The sampled tone per mood. Luminance, default density and the legality rules come
   from stage-contract.js, shared with BackdropStage — a rule enforced by only one
   Layer 1 publisher is a rule an author bypasses by switching component. */
const STAGE_TONE = {
  warm: '226,158,72',
  cool: '66,110,205',
  busy: '150,132,116',
  plain: '26,26,26'
};
function makeNet(w, h, mult) {
  const n = Math.round(Math.min(90, Math.max(14, w * h / 26000)) * mult);
  return Array.from({
    length: n
  }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28
  }));
}

/* forwardRef for the same reason as BackdropStage: the stage is what consumers measure.
   The incoming ref is merged with the internal hostRef the canvas loop needs. */
const LiveBackdrop = React.forwardRef(function LiveBackdrop({
  effect = 'net',
  mood = 'cool',
  density = 'medium',
  speed = 1,
  interactive = true,
  showDots = true,
  mode = 'dark',
  luma,
  stageDensity,
  tier,
  height = 260,
  radius = 'var(--radius-lg)',
  className = '',
  style,
  children,
  ...rest
}, forwardedRef) {
  const hostRef = React.useRef(null);
  const setHost = React.useCallback(node => {
    hostRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);
  const canvasRef = React.useRef(null);
  const pointer = React.useRef({
    x: -9999,
    y: -9999
  });
  React.useEffect(() => {
    const canvas = canvasRef.current,
      host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    const pal = PALETTES[mood] || PALETTES.cool;
    const mult = DENSITY[density] || 1;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0,
      h = 0,
      dpr = 1,
      pts = [],
      raf = 0,
      t = 0,
      visible = true;
    const resize = () => {
      const r = host.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = makeNet(w, h, mult);
    };
    const paintBg = () => {
      const g = ctx.createLinearGradient(0, 0, w * 0.7, h);
      g.addColorStop(0, pal.bg[1]);
      g.addColorStop(1, pal.bg[0]);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };
    const drawNet = () => {
      const max = Math.min(190, Math.max(90, w / 6));
      for (const p of pts) {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      const all = interactive && pointer.current.x > -9998 ? pts.concat([pointer.current]) : pts;
      ctx.lineWidth = 1;
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x,
            dy = all[i].y - all[j].y;
          const d = Math.hypot(dx, dy);
          if (d > max) continue;
          ctx.strokeStyle = 'rgba(' + pal.ink + ',' + (0.34 * (1 - d / max)).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(all[i].x, all[i].y);
          ctx.lineTo(all[j].x, all[j].y);
          ctx.stroke();
        }
      }
      if (showDots) {
        ctx.fillStyle = 'rgba(' + pal.ink + ',.5)';
        for (const p of pts) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.4, 0, 6.284);
          ctx.fill();
        }
      }
    };
    const drawEntropy = () => {
      const step = Math.max(18, 34 / mult);
      const amp = 9 + 7 * mult;
      for (let x = step / 2; x < w; x += step) {
        for (let y = step / 2; y < h; y += step) {
          const n = Math.sin(x * 0.012 + t * 0.6) + Math.sin(y * 0.015 - t * 0.45) + Math.sin((x + y) * 0.008 + t * 0.9);
          const ox = Math.cos(n * 1.7) * amp,
            oy = Math.sin(n * 1.4) * amp;
          const a = 0.12 + Math.abs(n) * 0.16;
          ctx.fillStyle = 'rgba(' + pal.ink + ',' + Math.min(0.55, a).toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, 1.1 + Math.abs(n) * 0.7, 0, 6.284);
          ctx.fill();
        }
      }
    };
    const drawOrbs = () => {
      const list = pal.orbs;
      ctx.globalCompositeOperation = 'screen';
      const n = Math.round(5 * mult);
      for (let i = 0; i < n; i++) {
        const c = list[i % list.length];
        const cx = w * (0.5 + 0.44 * Math.sin(t * (0.22 + i * 0.043) + i * 1.9));
        const cy = h * (0.5 + 0.44 * Math.cos(t * (0.19 + i * 0.037) + i * 2.6));
        const r = Math.min(w, h) * (0.26 + 0.1 * Math.sin(t * 0.3 + i));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(' + c + ',.62)');
        g.addColorStop(0.55, 'rgba(' + c + ',.24)');
        g.addColorStop(1, 'rgba(' + c + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 6.284);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };
    const drawDrift = () => {
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 4; i++) {
        const cx = w * (0.5 + 0.42 * Math.sin(t * (0.17 + i * 0.05) + i * 2.1));
        const cy = h * (0.5 + 0.4 * Math.cos(t * (0.13 + i * 0.06) + i * 1.3));
        const r = Math.max(w, h) * (0.3 + 0.1 * Math.sin(t * 0.2 + i));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(' + pal.glow + ',' + (0.2 * mult).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(' + pal.glow + ',0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = 'source-over';
    };
    const frame = () => {
      t += 0.006 * speed;
      paintBg();
      if (effect === 'entropy') drawEntropy();else if (effect === 'drift') drawDrift();else if (effect === 'orbs') drawOrbs();else drawNet();
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame();
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(host);
    const onMove = e => {
      const r = host.getBoundingClientRect();
      pointer.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top
      };
    };
    const onLeave = () => {
      pointer.current = {
        x: -9999,
        y: -9999
      };
    };
    if (interactive) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }
    resize();
    if (reduce) frame();else raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [effect, mood, density, speed, interactive, showDots]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: setHost,
    className: (mode === 'dark' ? 'dark' : 'light') + (className ? ' ' + className : ''),
    "data-stage-tone": ""
  }, __ds_scope.publishStageFacts({
    mood,
    mode,
    luma,
    density: stageDensity,
    tier
  }), {
    style: {
      position: 'relative',
      overflow: 'hidden',
      height,
      borderRadius: radius,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--stage-inset)',
      '--stage-tone-rgb': STAGE_TONE[mood] || STAGE_TONE.cool,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: "stage-media",
    style: {
      position: 'absolute',
      inset: 0,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'contents'
    }
  }, children));
});
Object.assign(__ds_scope, { LiveBackdrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/LiveBackdrop.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/BackdropStage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Layer 1 of the glass contract. The stage owns the media and publishes its facts —
   which mood it is, its measured luminance, and its density — for every surface above
   it to consume. A surface never sets these.

   The facts, the mood defaults and the legality rules all live in stage-contract.js,
   shared with LiveBackdrop: a rule enforced by only one Layer 1 publisher is a rule
   an author bypasses by switching component.

   `image` is a real photograph, and a photograph is not a mood. The image's own
   measured facts (media-registry.js) override the mood's — mood="plain" over a
   near-white photo used to publish luma "dark", and every surface above it then
   picked a text role for media that was not on screen. Pass the URL; the registry
   resolves it by filename, so a path and a key behave the same. */

const MOODS = {
  warm: 'backdrop--warm',
  cool: 'backdrop--cool',
  busy: 'backdrop--busy',
  plain: 'backdrop--plain'
};

/* forwardRef because a stage is the thing consumers MEASURE: the conformance harness
   reads data-density-corrected off the host to show what the stage refused. As a plain
   function component it dropped the ref silently, so the measurement read null and the
   harness reported zero refusals while six stages were being corrected. */
const BackdropStage = React.forwardRef(function BackdropStage({
  mood = 'warm',
  mode = 'light',
  luma,
  density,
  tier,
  image,
  height = 260,
  radius = 'var(--radius-lg)',
  className = '',
  style,
  children,
  ...rest
}, ref) {
  const cls = ['backdrop', MOODS[mood] || MOODS.warm, image ? 'backdrop--image' : '', mode === 'dark' ? 'dark' : 'light', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    className: cls
  }, __ds_scope.publishStageFacts({
    mood,
    mode,
    luma,
    density,
    tier,
    image
  }), {
    style: {
      height,
      borderRadius: radius,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--stage-inset)',
      ...(image ? {
        '--backdrop-image': 'url(' + image + ')'
      } : null),
      ...style
    }
  }, rest), children);
});
Object.assign(__ds_scope, { BackdropStage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/BackdropStage.jsx", error: String((e && e.message) || e) }); }

// guidelines/rules.js
try { (() => {
/* ── The rules, as data ────────────────────────────────────────────────────────
   Single source of truth for every rule in Frostwork. The conformance harness reads
   this to label its failures; the rules card renders its table from it; the readme
   quotes it. Nothing states a rule in prose that is not declared here.

   That indirection is the point. Four times in this system's history a rule was
   written more broadly in a comment than it was enforced in code — "no raw pixels
   anywhere" when type is optical, "density 2 does not compute its fill" when the
   fill was still 82% translucent. A rule that lives in one place, with its
   enforcement mechanism named as a field, cannot drift from what actually runs.

   enforcement:
     'harness'  checked against the RENDERED page by ui_kits/conformance
     'lint'     checked against SOURCE by _adherence.oxlintrc.json (generated)
     'runtime'  self-correcting in a component, with a console warning
     'review'   not yet mechanised — a human or agent has to look
   ─────────────────────────────────────────────────────────────────────────── */
window.FrostworkRules = [{
  id: 'L1-facts',
  layer: 'Layer 1 · stage',
  title: 'The stage publishes three facts, once',
  statement: 'A stage publishes --stage-tone-rgb, data-stage-luma and data-density. Surfaces read them and decide nothing.',
  enforcement: 'runtime',
  where: 'components/surfaces/stage-contract.js',
  why: 'CSS cannot ask what is behind a backdrop-filter. Publishing the facts in markup is the substitute for the compositor access Apple has and the web does not.'
}, {
  id: 'L1-no-layer2',
  layer: 'Layer 1 · stage',
  title: 'A mood scope declares only tone',
  statement: 'A [data-mood] rule may declare --stage-tone-rgb and nothing else. Surface arithmetic belongs to the density ladder.',
  enforcement: 'harness',
  check: '2 layer',
  why: 'backdrops.css imports after glass.css, so an equal-specificity mood scope silently shadows the ladder and density stops being authoritative. Cost us a dead-code fix we thought had landed.'
}, {
  id: 'L1-legality',
  layer: 'Layer 1 · stage',
  title: 'Four configurations are refused',
  statement: 'Density 1 anywhere; density 0 over light-luma media, over bidirectional media, or where chrome opposes stage luma. All correct to density 2 and warn.',
  enforcement: 'runtime',
  where: 'components/surfaces/stage-contract.js',
  why: 'Each fails contrast structurally, not marginally — no token value rescues them. Correcting rather than throwing keeps a page legible instead of crashing it.'
}, {
  id: 'L1-shared',
  layer: 'Layer 1 · stage',
  title: 'Every stage enforces the same rules',
  statement: 'All Layer 1 publishers call publishStageFacts(). None assembles the facts by hand.',
  enforcement: 'harness',
  check: '9 stage',
  why: 'A rule enforced by one publisher is a rule an author bypasses by switching component. LiveBackdrop was exactly that hole for most of this system\u2019s life.'
}, {
  id: 'L2-opaque-path',
  layer: 'Layer 2 · surface',
  title: 'Any luma-derived token needs an opaque counterpart',
  statement: 'A token derived from data-stage-luma must be re-derived from chrome under density 2, a fill override, and reduced transparency.',
  enforcement: 'harness',
  check: '1 contrast',
  why: 'Stage luma describes the MEDIA; once the fill is opaque the text sits on chrome instead. This recurred three times — semantic states, the guaranteed fill, and --glass-text itself.'
}, {
  id: 'L3-plane-siblings',
  layer: 'Layer 3 · content',
  title: 'Glass and the content plane are siblings, never nested',
  statement: 'The content plane sits on the stage beside glass. An opaque panel inside a glass surface is forbidden — it is the retired density-1 scrim.',
  enforcement: 'harness',
  check: '7 nesting',
  why: 'Density 1 was retired because its only mechanism was an opaque box on top of the material rather than protection by it, and it failed contrast over opposing chrome and bidirectional media. It was reintroduced once as a component with a friendlier API, which is why it is now measured rather than remembered.'
}, {
  id: 'T-scope-parity',
  layer: 'Tier 1 · token',
  title: 'A colour token exists in both chrome scopes or neither',
  statement: 'Every colour-valued semantic token (--text-*, --surface-*, --line-*) must be declared in both the light and the dark chrome scope. A token present in one silently keeps the other scope\u2019s value.',
  enforcement: 'harness',
  check: '6 parity',
  why: 'The most persistent defect in this system — five recurrences, three of them this session: --surface-card stayed #ffffff under dark chrome and put #ededed ink on a white card; the shadcn slots locked to their :root values because var() substitutes where a property is DECLARED, not where it is read. The failure is an ABSENCE, so nothing renders wrong until a screen happens to read that token — which is why it must be checked at source rather than reviewed.'
}, {
  id: 'L2-specular',
  layer: 'Layer 2 · surface',
  title: 'Never replace box-shadow on glass',
  statement: 'The four-layer specular stack is the material. Add a ring via --glass-focus-ring or outline; recolour via the edge tokens.',
  enforcement: 'harness',
  check: '3 specular',
  why: 'Replacing box-shadow to add one ring silently deletes the edge recipe, and the surface stops being this system\u2019s glass.'
}, {
  id: 'L2-emphasis',
  layer: 'Layer 2 · surface',
  title: 'Emphasis is material, never hue',
  statement: 'Exactly one primary per action group. Primary is an opaque ink fill at every density — a contrast floor, not an increment.',
  enforcement: 'harness',
  check: '4 carrier',
  why: 'Identity hue is optional in this system, so emphasis cannot depend on it. An alpha increment left the label sitting on whatever the media happened to be.'
}, {
  id: 'L2-accent-ink',
  layer: 'Layer 2 · surface',
  title: 'Accent enters glass as ink, never as edge or fill',
  statement: 'Identity hue on a glass surface appears only as type (--glass-accent-ink) or as the one solid tone="brand" fill. Never mixed into the translucent fill, never on the specular edge.',
  enforcement: 'harness',
  check: '3 specular',
  why: 'A tinted fill stops sampling the media, so Layer 2 has made a decision it is not allowed to make. Edge hue recolours the specular stack, which reads as a lighting defect and fails F-hue on its own terms — an edge neither responds nor reports. Decided in ui_kits/accent-lab/ against all five readings.'
}, {
  id: 'L2-accent-derived',
  layer: 'Layer 2 · surface',
  title: 'Accent ink follows the stage, not the palette',
  statement: '--glass-accent-ink mixes the brand hue toward the published text role rather than using the raw brand value, and is re-derived on the opaque path.',
  enforcement: 'harness',
  check: '1 contrast',
  why: 'Same failure class as --glass-text: a mid-lightness accent over saturated warm media loses the contrast the neutral roles guarantee. Deriving lightness from the stage keeps hue as identity only. Undefined brand collapses to --glass-text, so an unbranded system stays achromatic rather than grey-tinted.'
}, {
  id: 'L2-refraction-additive',
  layer: 'Layer 2 · surface',
  title: 'Refraction is additive, never load-bearing',
  statement: 'data-glass-refract only extends the backdrop-filter chain. It never replaces the specular stack, is dropped on every opaque path and under reduced transparency, increased contrast and reduced motion, and is gated on a support flag that fails safe to specular-only.',
  enforcement: 'harness',
  check: '3 specular',
  why: 'Filter references on a backdrop are unevenly implemented and cannot be probed — you cannot read pixels back out of a composited backdrop-filter. A design that depends on refraction is a design that is broken for an unknown fraction of users. It is also the most expensive primitive here, so every path that makes the fill opaque drops it rather than paying for a displacement of nothing.'
}, {
  id: 'L2-no-rim-layer',
  layer: 'Layer 2 · surface',
  title: 'Refraction never gets its own blurred layer',
  statement: 'Edge distortion happens in the surface\u2019s own backdrop-filter chain. A child or pseudo-element carrying a second backdrop-filter is forbidden.',
  enforcement: 'harness',
  check: '7 nesting',
  why: 'The convincing demos use an inset rim layer at reduced blur, which is a blurred surface inside a blurred surface \u2014 precisely what L2-budget forbids, for the reason it forbids it. Pseudo-elements are not an escape: .glass-scroll-edge already owns ::before and ::after, and a nav is routinely both.'
}, {
  id: 'L2-budget',
  layer: 'Layer 2 · surface',
  title: 'No nested blur, 6–8 surfaces per viewport',
  statement: 'A blurred surface never contains another. Cap concurrent blurred surfaces at 6–8. Pause ambient motion under a modal.',
  enforcement: 'harness',
  check: '10 budget',
  why: 'Apple: avoid layering Liquid Glass elements on top of each other. Nested blur also compounds cost on exactly the devices least able to pay it.'
}, {
  id: 'L3-plane',
  layer: 'Layer 3 · text',
  title: 'Glass is the functional layer',
  statement: 'Glass carries labels, icons and controls. Prose and the muted tier live on the content plane.',
  enforcement: 'harness',
  check: '5 functional',
  why: 'Apple: clearly separate content from navigation. Muted secondary text over live photography is a composition their design language never produces — and it was the single largest source of our contrast failures.'
}, {
  id: 'L3-role',
  layer: 'Layer 3 · text',
  title: 'The text role is derived, not chosen',
  statement: 'Authors never pick a text colour on glass. --glass-text resolves from the published facts under every fill path.',
  enforcement: 'harness',
  check: '1 contrast',
  why: 'A choice made per-surface is a choice made without knowing the media. Deriving it is what makes contrast a property of the system rather than of authoring care.'
}, {
  id: 'L3-grayscale',
  layer: 'Layer 3 · text',
  title: 'Colour is the second signal',
  statement: 'Every state carries a non-colour signal — icon, shape, position. A status cannot render without its icon.',
  enforcement: 'harness',
  check: '4 carrier',
  why: 'Makes the grayscale test pass by construction rather than by review. WCAG 1.4.1 is the floor; the design reason is that colour competing for attention destroys signal.'
}, {
  id: 'L3-floor',
  layer: 'Layer 3 · text',
  title: '12px on glass is 600, never 400',
  statement: 'Micro type over a translucent fill takes semibold. Below 12px, use the content plane.',
  enforcement: 'runtime',
  where: 'components/primitives/Text.jsx',
  why: 'Thin translucent fills eat the bottom of the contrast range; hairline strokes at 12px are the first thing to go.'
}, {
  id: 'D-measure',
  layer: 'Documentation',
  title: 'A card measures what it claims',
  statement: 'Where a card states a computed value — a resolved token, a contrast ratio, a density — it reads it off the rendered DOM rather than asserting it in prose.',
  enforcement: 'review',
  why: 'The single most repeated defect in this system\u2019s history. A hardcoded caption was wrong three times in one card because --primary inverts per chrome mode. A measured caption cannot disagree with the pixel it labels.'
}, {
  id: 'F-unit',
  layer: 'Foundations',
  title: 'Layout is n × 8',
  statement: 'Spacing, radii, control heights, gutters and insets are multiples of --unit. Type sizes and blur radii are optical, and exempt.',
  enforcement: 'lint',
  why: '8 rather than 4 because a 4px grid permits so many values it stops constraining anything. The exemptions are stated because an unscoped claim is the drift we keep catching.'
}, {
  id: 'F-hue',
  layer: 'Foundations',
  title: 'Hue only on things that respond or report',
  statement: 'Structure is achromatic. Hue appears on elements that respond to input or report status. Brand is an optional slot with a neutral fallback.',
  enforcement: 'review',
  why: 'Lets the system be complete and excellent with zero brand colour defined, so brand is additive rather than load-bearing.'
}, {
  id: 'F-concentric',
  layer: 'Foundations',
  title: 'Nested radii are concentric',
  statement: 'A nested surface uses --radius-concentric, never a hand-picked radius.',
  enforcement: 'harness',
  check: '11 concentric',
  why: 'Apple: the curvature of nested elements follows the shape containing them. Hand-picked radii read as misalignment even when the spacing is right.'
}, {
  id: 'F-motion',
  layer: 'Foundations',
  title: 'Large surfaces animate translate only',
  statement: 'Orbs and large blurred surfaces animate transform: translate. No animated blur, no animated backdrop-filter, no scale on a blurred surface.',
  enforcement: 'harness',
  check: '10 budget',
  why: 'Animating a filter re-composites the blur every frame. Translate is the one transform the compositor handles free. Scale is named explicitly because it looks like a transform and behaves like a filter change — it re-samples the backdrop at a new size every frame.'
}, {
  id: 'M-layer1-only',
  layer: 'Motion',
  title: 'Only Layer 1 parallaxes',
  statement: 'Scroll parallax moves the media. Glass is pinned to the content plane and never gets its own scroll transform.',
  enforcement: 'harness',
  check: '13 parallax',
  why: 'Glass has no appearance of its own — it samples what passes beneath. The effect IS the relative motion: borrowed tone shifts, the specular edge catches different light, refraction has something to bend. Parallax both layers and the relative motion cancels, so it costs the same and shows nothing.'
}, {
  id: 'M-fail-safe',
  layer: 'Motion',
  title: 'A reveal never hides content by default',
  statement: 'Reveal CSS is scoped to data-choreography="on", set by the controller after first paint. Content is revealed by geometry on the first pass, and the flag is withdrawn entirely if nothing has revealed within a second.',
  enforcement: 'review',
  why: 'Hiding content and revealing it with JS makes a blank page one bad deploy away. The subtle failure is not the script missing \u2014 it is the script RUNNING, hiding everything, and the observer never firing: IntersectionObserver with an implicit root reports rootBounds: null and isIntersecting: false in some embeddings, which cost us exactly one page of permanently invisible content. Declared \u2018review\u2019 as of v0.2: it claimed check \u20188 reveal\u2019 for four versions and no such check was ever built, which check 15 now makes impossible to repeat. The behaviour it describes IS mechanisable \u2014 assert that no reveal CSS is unscoped \u2014 and it is the obvious next check. So the first pass is a getBoundingClientRect check that owes nothing to an observer, a null rootBounds means reveal everything, and a backstop timer removes the flag if the mechanism is not working here.'
}, {
  id: 'M-no-density-animation',
  layer: 'Motion',
  title: 'Density never animates',
  statement: 'A surface does not interpolate between density 0 and density 2 on scroll. Bars that need help over busy media use .glass-scroll-edge, whose gradient can be interpolated.',
  enforcement: 'harness',
  check: '14 density',
  why: 'The fill goes opaque in one step, so any crossing pops. The scroll edge exists precisely because it is the part of the protection story that CAN be a continuous function of scroll position.'
}, {
  id: 'D-prose',
  layer: 'Documentation',
  title: 'Prose is part of the contract',
  statement: 'Every token, contract class, [data-*] value and version cited in code — in the readme, in any @dsCard, or in a card subtitle — must resolve against the loaded stylesheets, and every count the readme asserts about the harness must match the harness. The citation marker is per-medium: the backtick in markdown, <code> in card HTML. Dead names are declared in FrostworkRetired, never inferred from prose.',
  enforcement: 'harness',
  check: '12 prose',
  why: 'Eight statements about rung 1 stayed in the readme for a full version after the rung was deleted and check 9 began failing it \u2014 telling authors to write markup the harness rejects. Every other contract here is measured; the documents that teach them were the last thing running on trust. Cards are in scope because a card is read before the readme is, and the stray v0.3 shipped on a subtitle proved the defect is not confined to one file.'
}];

/* ── The retirements ───────────────────────────────────────────────────────────
   Names that no longer resolve — either retired, or never real. This list exists
   because CSS cannot express "dead": `.glass-scrim-text` retains a rule so existing
   markup does not break, so no stylesheet query distinguishes it from a live class.
   Check 12 reads it twice over: a name here is skipped unconditionally by the token
   and class scans (so a post-mortem may quote it), and flagged if a paragraph cites it
   as live without saying it is dead. `nonexistent: true` marks a name that was never
   real — skip-list only, never flagged, because there is no "was" to misrepresent.

   Declaring a retirement is cheaper than deleting the code and much cheaper than the
   alternative we actually paid for: the rung-1 prose, which outlived its mechanism by
   a full version because nothing anywhere recorded that the mechanism was gone. */
window.FrostworkRetired = [{
  name: '.glass-scrim-text',
  where: 'tokens/glass.css',
  detail: 'the local text scrim was the whole mechanism of density 1 — an opaque box on top of the material it protected. Use .glass-scroll-edge for bars, or density 2.'
}, {
  name: 'data-density="1"',
  where: 'tokens/glass.css + checks.js check 9',
  detail: 'rung 1 was retired on measurement; legaliseStage() corrects it to 2 and the harness fails any stage that publishes it. The numbering was kept so a stale 1 fails loudly.'
}, {
  name: '--glass-rung',
  where: 'tokens/glass.css',
  detail: 'the six-rung ladder collapsed to the two-state density knob.'
},
/* Two names that were never real. "Retired" is the wrong word and the right list:
   what check 12 needs is the set of names prose may quote without them resolving, and
   a name that never existed qualifies exactly as much as one that stopped existing.
   Declaring them is what lets the post-mortems quote them — the alternative was a
   keyword test on the surrounding paragraph, which exempted a third of the readme. */
{
  name: '--glass-fill-card',
  where: 'never existed — decisions.md, changelog 15',
  nonexistent: true,
  detail: 'the fill cannot be a token. It is composed at the point of use from --glass-fill-l, --glass-fill-c and the stage tone, because a pre-assembled one resolves --stage-tone-rgb against :root and paints every surface the same colour.'
}, {
  name: '--busy',
  where: 'never existed — decisions.md, changelog 15',
  nonexistent: true,
  detail: 'not a token but a fragment of the class backdrop--busy, which check 12 misread on its first run.'
}, {
  name: '--pane-fill',
  where: 'never a system token — decisions.md, changelog 17',
  nonexistent: true,
  detail: 'a lab-local variable declared in ui_kits/glass-lab/ab-fill.html\u2019s own <style> and set inline per option. Check 12 misread it out of a JS template literal on the first run of the card scan \u2014 the same misread as --busy, one medium over, and the changelog entry about it has to be able to name it.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/rules.js", error: String((e && e.message) || e) }); }

// ui_kits/conformance/checks.js
try { (() => {
/* Frostwork conformance harness.
   Reads the RENDERED page — computed styles, composited fills, real DOM — and
   asserts the rules the three-layer contract depends on. A source linter can be
   satisfied by code that renders wrong; this cannot. (The one exception is
   `6 parity`, which is deliberately source-level: the defect it catches is an
   ABSENCE, and absent tokens render fine until a screen happens to read one.)

   The lede states no rule count — it renders one from the scoreboard, because a
   restated count is a fact that stops tracking the thing it describes.

   Everything here is measurement, not opinion. The one modelling assumption is
   stated in the report: blur is treated as luminance-preserving, so contrast is
   bounded by the stage's extreme gradient stops rather than sampled per-pixel. */
(function () {
  const cvs = document.createElement('canvas');
  cvs.width = cvs.height = 1;
  const ctx = cvs.getContext('2d', {
    willReadFrequently: true
  });

  /* Rasterise any CSS colour — oklch, color-mix, hsl, hex — to rgba. Cheaper and
     far more robust than parsing the modern colour syntaxes by hand. */
  const cache = new Map();
  function toRgba(css) {
    if (cache.has(css)) return cache.get(css);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    const out = {
      r: d[0],
      g: d[1],
      b: d[2],
      a: d[3] / 255
    };
    cache.set(css, out);
    return out;
  }
  const COLOR_RE = /(?:rgba?|oklch|oklab|lab|lch|hsla?|color-mix)\([^()]*(?:\([^()]*\)[^()]*)*\)|#[0-9a-f]{3,8}\b/gi;
  const colorsIn = str => str && str !== 'none' ? (str.match(COLOR_RE) || []).map(toRgba) : [];
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1
  });
  const lin = v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const relLum = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => {
    const l1 = relLum(a),
      l2 = relLum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  /* Split a box-shadow value into top-level layers (commas inside rgb()/oklch()
     must not count). */
  function shadowLayers(v) {
    if (!v || v === 'none') return [];
    const out = [];
    let depth = 0,
      cur = '';
    for (const ch of v) {
      if (ch === '(') depth++;else if (ch === ')') depth--;
      if (ch === ',' && depth === 0) {
        out.push(cur.trim());
        cur = '';
      } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  /* Paint-order layers of one element: background-color first, then each colour in
     background-image above it. */
  function layersOf(el) {
    const cs = getComputedStyle(el);
    const out = [];
    const bc = toRgba(cs.backgroundColor);
    if (bc.a > 0) out.push(bc);
    colorsIn(cs.backgroundImage).forEach(c => {
      if (c.a > 0) out.push(c);
    });
    return out;
  }

  /* Candidate backdrops behind a text element: every colour stop the stage can put
     there, pushed through every intervening fill in paint order. Worst case, not
     average — a surface that only fails over one bright band still fails. */
  function backdropsBehind(textEl, stage) {
    const sc = getComputedStyle(stage);
    const base = toRgba(sc.backgroundColor);
    let candidates = colorsIn(sc.backgroundImage).map(c => c.a < 1 ? over(c, base) : c);
    if (!candidates.length) candidates = [base];
    if (base.a > 0) candidates.push(base);

    /* the blur filter's brightness() genuinely shifts what lands under the text */
    const pane = textEl.closest('.glass');
    if (pane) {
      const bf = getComputedStyle(pane).backdropFilter || getComputedStyle(pane).webkitBackdropFilter || '';
      const m = /brightness\(([\d.]+)\)/.exec(bf);
      if (m) {
        const k = parseFloat(m[1]);
        candidates = candidates.map(c => ({
          r: Math.min(255, c.r * k),
          g: Math.min(255, c.g * k),
          b: Math.min(255, c.b * k),
          a: 1
        }));
      }
    }

    /* ancestors between stage and the text element, outermost first = paint order.
       The element's own background counts: it paints behind its own glyphs. */
    const chain = [];
    for (let el = textEl; el && el !== stage; el = el.parentElement) chain.unshift(el);
    return candidates.map(cand => {
      let bg = cand;
      chain.forEach(el => layersOf(el).forEach(layer => {
        bg = over(layer, bg);
      }));
      return bg;
    });
  }
  function threshold(el) {
    const cs = getComputedStyle(el);
    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || size >= 18.66 && weight >= 700;
    return {
      need: large ? 3 : 4.5,
      size,
      weight
    };
  }

  /* Walk every style rule reachable from a sheet, THROUGH @import and @media.
     document.styleSheets exposes only top-level sheets: an @import'd file is a
     CSSImportRule whose own rules hang off .styleSheet. Frostwork's tokens all live
     in files imported by styles.css, so a non-recursive walk sees zero of them —
     which would make any source-level check silently vacuous rather than failing. */
  function walkRules(sheet, fn) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      return;
    }
    for (const rule of rules) {
      if (rule.styleSheet) walkRules(rule.styleSheet, fn); // @import
      else if (rule.style && rule.selectorText) {
        /* A style rule FIRST. Chrome's nested-CSS support gives CSSStyleRule an
           (empty) .cssRules, so testing for cssRules before .style recurses into
           every declaration block and visits none of them — the failure mode that
           made the first version of this check silently report zero. */
        fn(rule);
        if (rule.cssRules && rule.cssRules.length) walkRules(rule, fn); // nested CSS
      } else if (rule.cssRules) walkRules(rule, fn); // @media, @supports
    }
  }

  /* Check 8 measures the DOM as it stands when run() executes — which excludes the
     scoreboard and failure table, because render() writes those afterwards. That is
     not a technicality: the harness's own output is page furniture, it was wrong
     (sub-captions at 2.22:1, the clean note at 4.34:1), and nothing was positioned
     to catch it. So run() ends by re-measuring furniture once the report is on the
     page, and folds anything new into the report it just wrote. One extra pass, no
     recursion — the second render is not re-checked, because its markup is the
     first render's markup. */
  function run(_second) {
    const fails = [];
    const counts = {
      contrast: 0,
      layers: 0,
      specular: 0,
      carriers: 0,
      functional: 0,
      parity: 0,
      nesting: 0,
      furniture: 0,
      stage: 0,
      budget: 0,
      concentric: 0,
      parallax: 0,
      densityAnim: 0,
      coverage: 0
    };
    let contrastChecks = 0;
    let furnitureChecks = 0;

    /* ── 1 · contrast, worst case ─────────────────────────────────────────── */
    document.querySelectorAll('.backdrop, .stage').forEach(stage => {
      const probe = stage.getAttribute('data-probe') || stage.getAttribute('data-mood') || '?';
      /* Every text-bearing node on both planes. The functional layer's labels are
         bare spans — exactly what Apple's model says glass carries — and the content
         plane is composited over the same stage, so both are measured. An earlier
         selector listed only h4/p/.status/button and silently skipped 96 of 128
         nodes, which is how a clean scoreboard hid 16 hard failures. */
      stage.querySelectorAll('.glass h4, .glass h5, .glass p, .glass span, .glass a, .glass li, .glass button, .glass-content h4, .glass-content h5, .glass-content p, .glass-content span, .glass-content a, .glass-content li, .glass-content button').forEach(el => {
        /* leaf nodes only — a wrapper reports its children's text and would be
           measured against its own colour, which nothing actually paints */
        if (el.querySelector('h4,h5,p,span,a,li,button')) return;
        const text = (el.textContent || '').trim();
        if (!text) return;
        const fg = toRgba(getComputedStyle(el).color);
        if (fg.a === 0) return;
        const {
          need,
          size,
          weight
        } = threshold(el);
        const worst = backdropsBehind(el, stage).reduce((min, bg) => Math.min(min, ratio(fg, bg)), Infinity);
        contrastChecks++;
        if (worst < need) {
          counts.contrast++;
          fails.push({
            check: '1 contrast',
            where: probe,
            what: text.slice(0, 26) + ' · ' + Math.round(size) + 'px/' + weight,
            detail: worst.toFixed(2) + ':1 needs ' + need.toFixed(1)
          });
        }
      });
    });

    /* ── 2 · layer discipline ─────────────────────────────────────────────────
       A Layer-1 mood scope may declare ONLY --stage-tone-rgb. Anything else
       shadows the density ladder, at equal specificity, from a later import. */
    const ALLOWED_IN_MOOD = new Set(['--stage-tone-rgb']);
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        continue;
      }
      const walk = list => {
        for (const rule of list) {
          if (rule.cssRules) {
            walk(rule.cssRules);
            continue;
          }
          if (!rule.selectorText || !rule.selectorText.includes('[data-mood')) continue;
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (prop.startsWith('--') && !ALLOWED_IN_MOOD.has(prop)) {
              counts.layers++;
              fails.push({
                check: '2 layer',
                where: rule.selectorText,
                what: prop,
                detail: 'Layer-1 scope declaring a Layer-2 token'
              });
            }
          }
        }
      };
      walk(rules);
    }

    /* ── 3 · specular integrity ──────────────────────────────────────────────
       Blurred surfaces keep the four-layer edge recipe. Sanctioned exceptions:
       tertiary emphasis (no fill by design) and density 2 (glass switched off). */
    /* ── 3 · specular integrity ────────────────────────────────────────────
       Blurred surfaces keep the four-layer edge recipe. Sanctioned exceptions are
       the surfaces that are deliberately NOT glass: tertiary (no fill by design),
       primary (an opaque ink fill — it stopped being glass on purpose), and
       density 2 (glass switched off wholesale). */
    document.querySelectorAll('.glass').forEach(el => {
      const emph = el.getAttribute('data-emphasis');
      if (emph === 'tertiary' || emph === 'primary') return;
      if (el.closest('[data-density="2"]')) return;
      const n = shadowLayers(getComputedStyle(el).boxShadow).length;
      if (n < 4) {
        counts.specular++;
        const stage = el.closest('.backdrop, .stage');
        fails.push({
          check: '3 specular',
          where: stage && stage.getAttribute('data-probe') || '?',
          what: el.tagName.toLowerCase() + '[level=' + el.getAttribute('data-glass-level') + ']',
          detail: n + ' shadow layers, expected \u2265 4'
        });
      }
    });

    /* ── 4 · non-colour carriers ─────────────────────────────────────────── */
    document.querySelectorAll('.status').forEach(el => {
      if (!el.querySelector('svg')) {
        counts.carriers++;
        fails.push({
          check: '4 carrier',
          where: 'status',
          what: (el.textContent || '').trim().slice(0, 26),
          detail: 'no icon — colour is the only signal'
        });
      }
    });
    const groups = new Set();
    document.querySelectorAll('[data-emphasis="primary"]').forEach(el => el.parentElement && groups.add(el.parentElement));
    groups.forEach(g => {
      const n = g.querySelectorAll(':scope > [data-emphasis="primary"]').length;
      if (n > 1) {
        counts.carriers++;
        fails.push({
          check: '4 carrier',
          where: 'action group',
          what: n + ' primaries',
          detail: 'exactly one primary per group'
        });
      }
    });

    /* ── 5 · functional layer discipline ─────────────────────────────────────
       Glass is the functional layer: labels, icons, controls, status. Content —
       prose and the muted secondary tier — belongs on the content plane below it.
       Apple's design language never puts body copy on the glass layer, which is
       why their system does not face the contrast problem this check prevents. */
    const PROSE_WORDS = 12;
    /* A `.glass-content` INSIDE `.glass` is not a content plane — it is the retired
       density-1 scrim. So it does not earn the exemption below; check 7 fails it. */
    const onContentPlane = el => {
      const plane = el.closest('.glass-content');
      return !!plane && !(plane.parentElement && plane.parentElement.closest('.glass'));
    };
    document.querySelectorAll('.glass p, .glass li, .glass .glass-muted').forEach(el => {
      if (onContentPlane(el)) return;
      const text = (el.textContent || '').trim();
      if (!text) return;
      const words = text.split(/\s+/).length;
      const muted = el.classList.contains('glass-muted');
      if (!muted && words < PROSE_WORDS) return;
      counts.functional++;
      const stage = el.closest('.backdrop, .stage');
      fails.push({
        check: '5 functional',
        where: stage && stage.getAttribute('data-probe') || '?',
        what: text.slice(0, 26) + (muted ? ' · muted role' : ' · ' + words + ' words'),
        detail: muted ? 'muted tier is content, not function' : 'prose on the functional layer'
      });
    });

    /* Tertiary is the same class of error as muted text: a control with almost no
       fill, over media whose luminance is unknown. Measured as low as 1.09:1. It is
       a CONTENT-PLANE control — on the functional layer the rungs are primary
       (opaque ink) and secondary (glass). */
    document.querySelectorAll('[data-emphasis="tertiary"]').forEach(el => {
      if (onContentPlane(el)) return;
      const stage = el.closest('.backdrop, .stage');
      if (!stage) return;
      counts.functional++;
      fails.push({
        check: '5 functional',
        where: stage.getAttribute('data-probe') || '?',
        what: (el.textContent || '').trim().slice(0, 26) + ' · tertiary',
        detail: 'tertiary is content-plane only'
      });
    });

    /* ── 7 · no opaque box on top of the material ─────────────────────────────
       The plane split is HORIZONTAL: glass and the content plane are siblings on the
       stage, never nested. An opaque panel inside a glass surface is density 1 by
       another name — protection applied on top of the material rather than by it,
       which is precisely the mechanism that was retired for failing contrast over
       opposing chrome and bidirectional media. Checked because it was reintroduced
       once already, as a component, with a friendlier API. */
    document.querySelectorAll('.glass .glass-content').forEach(el => {
      counts.nesting++;
      const stage = el.closest('.backdrop, .stage');
      fails.push({
        check: '7 nesting',
        where: stage && stage.getAttribute('data-probe') || '?',
        what: (el.textContent || '').trim().slice(0, 26),
        detail: 'opaque plane inside glass — the retired density-1 scrim; make it a sibling'
      });
    });

    /* ── 6 · scope parity ────────────────────────────────────────────────────
       The recurring defect of this system, five times over: a token derived from
       or paired with a chrome-scoped token gets declared in ONE chrome scope. The
       other scope keeps the first one's value silently — no error, no fallback,
       just #ededed ink on a #ffffff card. Source-level, because the failure is an
       ABSENCE: nothing renders wrong until a screen happens to read that token.
        Diffs the declared key sets of the two chrome scopes over the semantic
       families (--text-*, --surface-*, --line-*). `:root` counts as light, since
       light chrome is the document default. */
    const SEMANTIC = /^--(text|surface|line)-/;
    /* Parity only matters for COLOUR-valued tokens. `--text-` is an unfortunate shared
       prefix: --text-body is an ink colour, --text-title is a font size, and the size
       tokens rightly have no dark counterpart. Rather than maintain a name list that
       would drift, the check reads the VALUE and considers only tokens that resolve to
       a colour — which is the property the rule is actually about. */
    const COLORISH = /#[0-9a-f]{3,8}|\b(rgba?|hsla?|oklch|oklab|lab|lch|color-mix)\(|var\(--n-/i;
    const declared = {
      light: new Set(),
      dark: new Set()
    };
    const scopeOf = sel => {
      if (/\[data-(density|glass-fill|stage-luma|mood)/.test(sel)) return null; // state scopes, not chrome
      const dark = /(^|[\s,])\.(dark|ui-dark)\b/.test(sel);
      const light = /(^|[\s,])(:root|\.light|\.ui-light)\b/.test(sel);
      if (dark && !light) return 'dark';
      if (light && !dark) return 'light';
      return null; // both, or neither — carries no parity information
    };
    for (const sheet of document.styleSheets) walkRules(sheet, rule => {
      if (!rule.style || !rule.selectorText) return;
      const scope = scopeOf(rule.selectorText);
      if (!scope) return;
      for (const prop of rule.style) {
        if (!SEMANTIC.test(prop)) continue;
        if (!COLORISH.test(rule.style.getPropertyValue(prop))) continue;
        declared[scope].add(prop);
      }
    });
    const parityGaps = [];
    declared.light.forEach(p => {
      if (!declared.dark.has(p)) parityGaps.push([p, 'light', 'dark']);
    });
    declared.dark.forEach(p => {
      if (!declared.light.has(p)) parityGaps.push([p, 'dark', 'light']);
    });
    counts.parity = parityGaps.length;
    parityGaps.forEach(([prop, has, missing]) => fails.push({
      check: '6 parity',
      where: '.' + missing + ' chrome',
      what: prop,
      detail: 'declared in ' + has + ' chrome only — the ' + missing + ' scope silently keeps the ' + has + ' value'
    }));

    /* ── 8 · page furniture ──────────────────────────────────────────────────
       Checks 1–7 walk the SURFACES. Everything else on the page — specimen
       captions, lab notes, table cells, the rules sheet — was checked by hand, and
       that is exactly how an 11px `--n-5` micro-caption at 3.70:1 reached 27 files
       while every glass surface in the system passed. Same contrast arithmetic,
       applied to the flat page: composite the ancestor backgrounds down to an opaque
       base and measure the ink against it.
        Two limitations, stated rather than hidden: ancestor `opacity` and blend modes
       are not modelled, and an element over an image with no background colour falls
       back to the page surface. Both make this check optimistic, never strict — it
       will miss a failure before it invents one. */
    const FURNITURE = 'h1,h2,h3,h4,h5,h6,p,span,a,li,td,th,label,button,figcaption,summary,dt,dd';
    const faintOf = new Map();
    function resolvedFaint(el) {
      const scope = el.closest('.dark,.ui-dark,.light,.ui-light') || document.documentElement;
      if (faintOf.has(scope)) return faintOf.get(scope);
      const v = toRgba(getComputedStyle(scope).getPropertyValue('--text-faint').trim() || 'transparent');
      faintOf.set(scope, v);
      return v;
    }
    /* Composite every ancestor background in paint order over an opaque white base.
       Outermost first, so the element's own background lands last — it paints
       directly behind its own glyphs. */
    function pageBackdrop(el) {
      const chain = [];
      for (let n = el; n && n.nodeType === 1; n = n.parentElement) chain.unshift(n);
      let bg = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      };
      chain.forEach(n => layersOf(n).forEach(layer => {
        bg = over(layer, bg);
      }));
      return bg;
    }
    document.querySelectorAll(FURNITURE).forEach(el => {
      if (el.closest('.backdrop, .stage')) return; // checks 1–7 own the stages
      if (el.closest('[aria-hidden="true"], svg, script, style')) return;
      const own = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
      if (!own) return; // leaf text only
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') return;
      const fg = toRgba(cs.color);
      if (fg.a === 0) return;
      const {
        need,
        size,
        weight
      } = threshold(el);
      const bg = pageBackdrop(el);
      const r = ratio(fg, bg);
      furnitureChecks++;
      const where = (el.closest('[id]') || {}).id || el.tagName.toLowerCase();
      if (r < need) {
        counts.furniture++;
        fails.push({
          check: '8 furniture',
          where: where,
          what: own.slice(0, 26) + ' \u00b7 ' + Math.round(size) + 'px/' + weight,
          detail: r.toFixed(2) + ':1 needs ' + need.toFixed(1)
        });
        return;
      }
      /* The specific defect that motivated this check: `--text-faint` is not a text
         role below 20px. It can clear AA on a light page and still be the wrong
         token — so this is flagged on top of the ratio, not instead of it. */
      const faint = resolvedFaint(el);
      if (size < 20 && faint.a > 0 && Math.abs(fg.r - faint.r) < 3 && Math.abs(fg.g - faint.g) < 3 && Math.abs(fg.b - faint.b) < 3) {
        counts.furniture++;
        fails.push({
          check: '8 furniture',
          where: where,
          what: own.slice(0, 26) + ' \u00b7 ' + Math.round(size) + 'px',
          detail: 'faint role below 20px \u2014 use --text-muted'
        });
      }
    });

    /* ── 9 · stage completeness ─────────────────────────────────────────
       `L1-shared` was review-only, and the thing it guards against is not an author
       writing bad facts — it is an author writing *some* of them. Every Layer 1
       publisher is supposed to route through publishStageFacts(); one that assembles
       the set by hand omits a field, and the surfaces above it fall back silently.
       That is checkable from the rendered page without knowing which component drew
       it: a stage either published the whole contract or it did not. */
    const STAGE_FACTS = ['data-stage-luma', 'data-density'];
    document.querySelectorAll('.backdrop, .stage').forEach(stage => {
      const probe = stage.getAttribute('data-probe') || stage.getAttribute('data-mood') || '?';
      const missing = STAGE_FACTS.filter(a => !stage.hasAttribute(a));
      /* Tone is the one optional fact — a stage without it falls back to saturate(),
         which is documented and works. But claiming a tone and not supplying the
         value is a half-published contract, and reads as an achromatic surface. */
      if (stage.hasAttribute('data-stage-tone') && !getComputedStyle(stage).getPropertyValue('--stage-tone-rgb').trim()) {
        missing.push('--stage-tone-rgb');
      }
      if (missing.length) {
        counts.stage++;
        fails.push({
          check: '9 stage',
          where: probe,
          what: missing.join(', '),
          detail: 'stage published an incomplete fact set — surfaces fall back silently'
        });
      }
      const d = stage.getAttribute('data-density');
      if (d === '1') {
        counts.stage++;
        fails.push({
          check: '9 stage',
          where: probe,
          what: 'data-density="1"',
          detail: 'rung 1 was retired — legaliseStage should have corrected this'
        });
      }
    });

    /* ── 10 · blur budget ───────────────────────────────────────────────
       `L2-budget` was review-only on the grounds that a budget is a judgement. Two
       thirds of it are not. Nested blur is a fact about the DOM, and animating a
       filter or scaling a blurred node is a fact about the stylesheet — only the
       per-viewport count is a judgement, and it is reported rather than failed,
       because the number it would be measured against is itself unmeasured. */
    document.querySelectorAll('.glass').forEach(el => {
      const parent = el.parentElement && el.parentElement.closest('.glass');
      if (!parent) return;
      const bf = getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter || 'none';
      if (bf !== 'none' && /blur\(/.test(bf)) {
        counts.budget++;
        const stage = el.closest('.backdrop, .stage');
        fails.push({
          check: '10 budget',
          where: stage && stage.getAttribute('data-probe') || '?',
          what: 'nested ' + el.getAttribute('data-glass-level'),
          detail: 'blur inside blur — .glass .glass should have dropped the filter'
        });
      }
    });
    /* Source-level half: a keyframe that animates a filter, or scales a node that
       carries one. Both re-rasterise the most expensive layer in the system every
       frame, and neither is visible in a static snapshot of the DOM. */
    const animatedFilters = new Set();
    for (const sheet of document.styleSheets) walkRules(sheet, rule => {
      if (!rule.style) return;
      const tp = rule.style.getPropertyValue('transition-property') || rule.style.getPropertyValue('transition') || '';
      if (/(^|[\s,])(filter|backdrop-filter|-webkit-backdrop-filter|all)([\s,]|$)/.test(tp)) animatedFilters.add(rule.selectorText + ' · transition');
    });
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        continue;
      }
      const walkKf = list => {
        for (const rule of list) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            for (const kf of rule.cssRules) {
              if (!kf.style) continue;
              if (kf.style.filter || kf.style.backdropFilter || kf.style.webkitBackdropFilter) animatedFilters.add('@keyframes ' + rule.name);
              const tr = kf.style.transform || '';
              if (/scale/.test(tr)) animatedFilters.add('@keyframes ' + rule.name + ' · scale');
            }
          } else if (rule.cssRules) walkKf(rule.cssRules);
        }
      };
      walkKf(rules);
    }
    animatedFilters.forEach(where => {
      /* A scale keyframe is only a defect if something blurred uses it. Reported
         with the animation name so it can be traced, not failed blind. */
      counts.budget++;
      fails.push({
        check: '10 budget',
        where: 'stylesheet',
        what: where,
        detail: 'animates or scales a filtered layer — re-rasterises the blur per frame'
      });
    });

    /* ── 11 · concentric radii ─────────────────────────────────────────
       A nested surface's corner follows the shape containing it: inner = outer minus
       the gap between them. Hand-picked radii read as misalignment even when the
       spacing is right, and the failure is invisible in source — both numbers look
       deliberate. Measured, it is arithmetic. Tolerance is 2px, because the padding
       is not always symmetric and this should flag a decision, not a rounding. */
    document.querySelectorAll('.glass').forEach(el => {
      const host = el.parentElement && el.parentElement.closest('.glass, .glass-content');
      if (!host) return;
      const ir = el.getBoundingClientRect(),
        hr = host.getBoundingClientRect();
      const outer = parseFloat(getComputedStyle(host).borderTopLeftRadius) || 0;
      const inner = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      if (!outer || !inner) return;
      /* A pill is not a hand-picked radius, it is a different shape. Buttons are pills
         by rule, and a pill inside a nav is the system working — the first version of
         this check reported all 48 of them, which is a check with an opinion rather
         than a measurement. Detected geometrically (radius ≥ half the box) rather than
         by token name, so an inline 999px is caught by the same clause. */
      if (inner >= ir.height / 2 - 0.5) return;
      /* The inset is the SMALLEST edge gap, not the top one. Measuring the top alone
         reported a horizontally centred child as 138px inset and demanded a 0px
         corner. */
      const gap = Math.min(ir.top - hr.top, ir.left - hr.left, hr.right - ir.right, hr.bottom - ir.bottom);
      if (gap < 0) return; // overflowing child; not a radius question
      const want = Math.max(0, outer - gap);
      if (Math.abs(inner - want) > 2) {
        counts.concentric++;
        const stage = el.closest('.backdrop, .stage');
        fails.push({
          check: '11 concentric',
          where: stage && stage.getAttribute('data-probe') || '?',
          what: el.getAttribute('data-glass-level') + ' · ' + Math.round(inner) + 'px in ' + Math.round(outer) + 'px',
          detail: 'expected ' + Math.round(want) + 'px at a ' + Math.round(gap) + 'px inset — use --radius-concentric'
        });
      }
    });

    /* ── 13 · parallax plane ────────────────────────────────────────────
       `M-layer1-only` was review-only, and it is not a judgement: either a glass
       surface's own transform changes when the page scrolls or it does not.
        Source-level half here; the MEASURED half is async (scrollProbe, below) because
       both ways this defect actually arrives land on a later frame than the scroll
       itself — a CSS scroll timeline is sampled by the animation engine, and a JS
       scroll handler fires after the scroll is committed. A synchronous read after
       scrollTo passes both, which on a page with no parallax to catch would have looked
       exactly like a clean sheet. */

    for (const sheet of document.styleSheets) walkRules(sheet, rule => {
      const sel = rule.selectorText;
      if (!/\.glass/.test(sel)) return;
      /* NOT read from rule.style. This engine does not support animation-timeline, so it
         drops the declaration at parse time — `.glass.probe-tl{animation-timeline:scroll()}`
         arrives in cssRules as `{ }`, and a check reading computed style here reports a
         confident zero for a rule it never saw. The timeline scan is done on stylesheet
         SOURCE TEXT instead (timelineScan, async), which is engine-independent. What is
         left here is the transform case, which every engine does parse. */
      const tr = rule.style.getPropertyValue('transform');
      if (tr && /var\(--scroll|calc\(.*--scroll/.test(tr)) {
        counts.parallax++;
        fails.push({
          check: '13 parallax',
          where: 'stylesheet',
          what: sel,
          detail: 'transform driven by a scroll variable — glass pins to the content plane'
        });
      }
    });

    /* ── 14 · density never interpolates ────────────────────────────────
       The fill goes opaque in one step, so any crossing between density 0 and 2 pops.
       Deliberately NOT a check on background-color transitions: hover brightens the
       fill by design, and a check that failed every hover state would be measuring the
       wrong thing loudly. What it looks for is interpolation of the DENSITY-derived
       alphas — plus, in scrollProbe, a stage republishing its density mid-scroll. */
    const DENSITY_PROPS = /--glass-density-alpha|--glass-alpha|--glass-fill-l|--glass-fill-c/;
    for (const sheet of document.styleSheets) walkRules(sheet, rule => {
      const tp = rule.style.getPropertyValue('transition-property') || rule.style.getPropertyValue('transition') || '';
      if (DENSITY_PROPS.test(tp)) {
        counts.densityAnim++;
        fails.push({
          check: '14 density',
          where: 'stylesheet',
          what: rule.selectorText,
          detail: 'transitions a density-derived alpha — the ladder is two discrete states'
        });
      }
    });
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        continue;
      }
      const walkKf = list => {
        for (const rule of list) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            for (const kf of rule.cssRules) {
              if (kf.style && DENSITY_PROPS.test(kf.style.cssText || '')) {
                counts.densityAnim++;
                fails.push({
                  check: '14 density',
                  where: 'stylesheet',
                  what: '@keyframes ' + rule.name,
                  detail: 'animates a density-derived alpha — the ladder is two discrete states'
                });
              }
            }
          } else if (rule.cssRules) walkKf(rule.cssRules);
        }
      };
      walkKf(rules);
    }

    /* ── 15 · rule coverage ───────────────────────────────────────────────────
       The only check whose subject is the rule set rather than the page. A rule may
       declare enforcement 'harness' or 'review'; what it may not do is claim the
       harness and name a check that does not exist. `M-fail-safe` did exactly that
       for four versions — `check: '8 reveal'` against a slot 8 that is page
       furniture — so it read as enforced, appeared in neither the enforced nor the
       review list, and every count in the readme stayed technically true while one
       rule was quietly enforced by nobody. This is the cheapest check here and the
       last blind spot of its class: two sets, one comparison. */
    coverage().orphans.forEach(r => {
      counts.coverage++;
      fails.push({
        check: '15 coverage',
        where: 'rules.js · ' + r.id,
        what: "check: '" + r.check + "'",
        detail: 'declares harness enforcement but no such check exists — set enforcement to ‘review’ or point it at a real check'
      });
    });
    render(counts, fails, contrastChecks, furnitureChecks);
    if (!_second) run(true);
    /* Claimed with a synchronous flag, NOT with `if (!PROSE)` / `if (!SCROLL)`. Both
       passes await before they assign their result, and the `run(true)` on the line
       above is synchronous — so the null-result guard let a second copy of each start.
       For the scroll probe that was not merely wasteful: probe B captured its baseline
       scrollY (and its baseline transforms) at 600px, after probe A had already
       scrolled, then "restored" to that polluted baseline. The harness opened 600px
       down its own page, and B was comparing transforms against the wrong reference
       frame — a false-negative path in the check that exists to catch exactly that. */
    if (!proseStarted) {
      proseStarted = true;
      proseCheck();
    }
    if (!scrollStarted) {
      scrollStarted = true;
      scrollProbe();
    }
  }

  /* ── The scroll probe · measured half of 13 and 14 ────────────────────────
     Scroll the page, wait two frames, read back, restore. Two things are read: each
     glass surface's OWN transform (never its screen position — glass inside a
     translating stage moves with it, which is the contract working), and each stage's
     published density, because density is a fact about the media and not a function of
     scroll position.
      Reports 'page does not scroll here' rather than 0 when there is no room to scroll.
     A check that cannot run has to say so; this system's recurring defect is the
     confident zero. */
  let SCROLL = null;
  let scrollStarted = false;
  const frame = () => new Promise(r => requestAnimationFrame(r));
  async function scrollProbe() {
    const fails = [];
    const y0 = window.scrollY;
    const glassEls = Array.from(document.querySelectorAll('.glass'));
    const room = document.documentElement.scrollHeight - window.innerHeight - y0;
    if (room < 8) {
      SCROLL = {
        fails: [],
        note: 'page does not scroll here'
      };
      return redraw();
    }
    const t0 = new Map(glassEls.map(el => [el, getComputedStyle(el).transform]));
    const d0 = new Map();
    document.querySelectorAll('.backdrop, .stage').forEach(s => d0.set(s, s.getAttribute('data-density')));
    window.scrollTo(0, y0 + Math.min(600, room));
    await frame();
    await frame();
    glassEls.forEach(el => {
      if (getComputedStyle(el).transform === t0.get(el)) return;
      const stage = el.closest('.backdrop, .stage');
      fails.push({
        check: '13 parallax',
        where: stage && stage.getAttribute('data-probe') || '?',
        what: el.getAttribute('data-glass-level') || 'glass',
        detail: 'own transform changes on scroll — only Layer 1 parallaxes, and the effect IS the relative motion'
      });
    });
    d0.forEach((was, s) => {
      const now = s.getAttribute('data-density');
      if (now === was) return;
      fails.push({
        check: '14 density',
        where: s.getAttribute('data-probe') || s.getAttribute('data-mood') || '?',
        what: 'data-density ' + was + ' → ' + now + ' on scroll',
        detail: 'density is a fact about the media, not a function of scroll — use .glass-scroll-edge, whose gradient can be interpolated'
      });
    });
    window.scrollTo(0, y0);
    await timelineScan(fails);
    SCROLL = {
      fails: fails,
      surfaces: glassEls.length,
      stages: d0.size
    };
    redraw();
  }

  /* Scroll timelines, read from stylesheet SOURCE rather than from cssRules, because an
     engine that does not implement animation-timeline discards the declaration at parse
     time and leaves a check reading cssRules reporting zero for a rule it never saw.
     Verified by injection: `.glass.probe-tl{animation-timeline:scroll()}` round-trips
     through this browser's CSSOM as `.glass.probe-tl { }`. Crude block splitting is
     enough — the question is only whether a glass selector and a timeline property
     appear in the same rule. */
  async function timelineScan(fails) {
    const hrefs = new Set();
    const collect = sheet => {
      if (sheet.href) hrefs.add(sheet.href);
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        return;
      }
      for (const r of rules) if (r.styleSheet) collect(r.styleSheet);
    };
    for (const s of document.styleSheets) collect(s);
    for (const href of hrefs) {
      let text;
      try {
        text = await (await fetch(href)).text();
      } catch (e) {
        continue;
      }
      text.split('}').forEach(block => {
        if (!/\.glass/.test(block)) return;
        if (!/(animation|scroll|view)-timeline\s*:/.test(block)) return;
        fails.push({
          check: '13 parallax',
          where: href.split('/').pop(),
          what: block.split('{')[0].trim().slice(0, 40),
          detail: 'scroll-driven timeline on a glass surface — glass pins to the content plane'
        });
      });
    }
  }

  /* ── 12 · prose vs code ─────────────────────────────────────
     Every contract in this system is measured except the prose that teaches it. Eight
     statements about rung 1 survived here for a full version after the rung was
     deleted and check 9 started failing it — found only because someone proposed
     BUILDING the thing the readme described. So: the readme's own code citations are
     checked against the loaded stylesheets. A cited token must be declared or
     referenced somewhere; a cited contract class must exist; a cited [data-*] value
     must be one the stylesheets actually style; a cited version must not run ahead of
     the readme's own heading.
      Retired names are the interesting case, because a retired class often survives as
     a no-op — `.glass-scrim-text` still parses, so no CSS query can tell you it is
     dead. The exemption is textual and mechanical: a paragraph may cite a retired name
     only if that same paragraph says so (retired / no-op / refused / removed). Prose
     that mentions `data-density="1"` while EXPLAINING the retirement passes; prose
     that instructs you to write it does not. The retirement list lives in rules.js
     beside the rules, because it is the same kind of declaration.
      Scope: readme.md, decisions.md, and every `@dsCard` HTML file the manifest declares.
     decisions.md is in scope because the post-mortems are where dead names live — moving
     them out of the readme for token weight would otherwise have moved 191 lines of
     citations out of the check at the same time. The stray
     `v0.3` on the density card's subtitle was the same defect one file over, and a
     check that read only the readme could not see it.
      The trigger is the citation marker, and the marker is per-medium. In markdown that
     is the backtick. In card HTML a backtick is just a character — the marker is
     `<code>`, and treating the backtick as universal would have scanned 51 files and
     found six citations, which is the vacuous pass this harness exists to prevent.
     Subtitles are scanned on the backtick rule and today contain zero citations: that
     is a real number, not a hidden exemption. A caption that wants to be held to this
     standard has to quote the name.
      Card HTML has no paragraphs, so the retirement exemption reads a window of
     surrounding text instead of an enclosing block. Same mechanism, coarser boundary.
      Dead names are declared, never inferred. `window.FrostworkRetired` is the single
     authoritative list, and a name on it is skipped unconditionally — so changelog 14
     and 15 in decisions.md can quote `data-density="1"` and `--glass-fill-card` because those names are
     DECLARED dead, not because their paragraphs happened to contain a lucky word. The
     cost is one line of bookkeeping when something is retired; the alternative, tried
     and reverted, was a paragraph-level keyword test that quietly stopped checking a
     third of the document. */
  let PROSE = null;
  let proseStarted = false;
  let lastRender = null;
  const EXEMPT_WINDOW = 400;

  /* Where the documents are. Defaults are this repo's layout; a consuming project sets
     window.FrostworkDocs before this file loads. Set any document to false to declare it
     out of scope — that reports as a skip, not as a failure, because "this project has
     no decisions.md" and "the harness could not read decisions.md" are different facts
     and collapsing them is how a check starts lying. cards:false turns off the card scan
     for a project whose cards are not @dsCard files. */
  const DOCS = Object.assign({
    base: '../../',
    readme: 'readme.md',
    decisions: 'decisions.md',
    manifest: '_ds_manifest.json',
    cards: true
  }, window.FrostworkDocs || {});
  /* Narrow on purpose. This gates ONE scan — the retired-name list, where the list is
     authoritative and the only question is whether this paragraph says so. It used to
     gate the token and class scans too, and widening it enough to let the post-mortems
     name their dead tokens exempted 36% of the file's paragraphs on words like "was"
     and "instead", including the Layer 1 fact list. A noisy check is a nuisance; a
     vacuous one is a lie, and keyword sniffing cannot tell "this name is dead" from
     prose that happens to use the past tense. */
  const RETIRE_RE = /retir|no-op|no longer|refus|removed|deleted|stale|legacy|never (?:exist|been a)|does not exist/i;

  /* What the stylesheets actually declare. Tokens count as known if they are declared
     OR referenced via var() — --stage-tone-rgb is published inline by the stage at
     runtime and appears in no declaration block. */
  function codeFacts() {
    const tokens = new Set(),
      classes = new Set(),
      attrVals = new Map();
    const ATTR_RE = /\[(data-[a-z-]+)(?:\s*[~|^$*]?=\s*"([^"]*)")?\]/gi;
    for (const sheet of document.styleSheets) walkRules(sheet, rule => {
      for (const p of rule.style) if (p.startsWith('--')) tokens.add(p);
      const css = rule.style.cssText || '';
      let m,
        VAR_RE = /var\(\s*(--[a-z0-9-]+)/gi;
      while (m = VAR_RE.exec(css)) tokens.add(m[1]);
      const sel = rule.selectorText;
      (sel.match(/\.[a-z][a-z0-9_-]*/gi) || []).forEach(c => classes.add(c));
      while (m = ATTR_RE.exec(sel)) {
        if (!attrVals.has(m[1])) attrVals.set(m[1], new Set());
        if (m[2] !== undefined) attrVals.get(m[1]).add(m[2]);
      }
    });
    return {
      tokens: tokens,
      classes: classes,
      attrVals: attrVals
    };
  }

  /* The five scans, run per citation unit. `cite` is the quoted text only; `context` is
     the prose around it, which is what the retirement and roadmap exemptions read. */
  function citationScans(unit, facts, declaredVersion, add) {
    const cite = unit.cite,
      context = unit.context,
      exempt = RETIRE_RE.test(context);
    let checked = 0;
    const RETIRED = window.FrostworkRetired || [];
    const declaredDead = new Set(RETIRED.map(r => r.name));
    RETIRED.forEach(r => {
      if (r.nonexistent) return; // never real: skip-list only
      if (cite.indexOf(r.name) === -1) return;
      checked++;
      if (!exempt) add(r.name, 'retired in ' + r.where + ' — cited as live: ' + r.detail);
    });

    /* The boundary matters: `backdrop--busy` is a CLASS containing a double hyphen,
       and the first version of this check read `--busy` out of it and failed twice on
       its own false positive. A trailing hyphen means a prefix stem (`--text-` as in
       "tokens sharing the --text- prefix"), which is prose about a family, not a
       citation of a token. */
    let t,
      TOKEN_RE = /(^|[^a-z0-9-])(--[a-z][a-z0-9-]*)/gi;
    while (t = TOKEN_RE.exec(cite)) {
      const name = t[2];
      if (name.endsWith('-')) continue;
      checked++;
      if (declaredDead.has(name)) continue; // handled by the scan above
      if (!facts.tokens.has(name)) add(name, 'no stylesheet declares or references this token');
    }
    let c,
      CLASS_RE = /\.((?:glass|backdrop|stage)[a-z0-9-]*)/gi;
    while (c = CLASS_RE.exec(cite)) {
      checked++;
      if (declaredDead.has('.' + c[1])) continue;
      if (!facts.classes.has('.' + c[1])) add('.' + c[1], 'no stylesheet declares this selector');
    }
    let a,
      CITE_ATTR_RE = /(data-[a-z-]+)\s*=\s*["'{]?(\d+|[a-z-]+)/gi;
    while (a = CITE_ATTR_RE.exec(cite)) {
      const known = facts.attrVals.get(a[1]);
      if (!known || !known.size) continue; // not a styled contract attribute
      checked++;
      if (!known.has(a[2]) && !exempt) {
        add(a[1] + '="' + a[2] + '"', 'stylesheets style only ' + Array.from(known).sort().join(' / ') + ' — this configuration renders unstyled');
      }
    }

    /* A version ahead of the heading is a defect in an instruction and correct in a
       roadmap or a post-mortem — "v0.3 will", "the stray v0.3 we removed". Same
       mechanism as the retirement exemption: the context has to place it. */
    if (declaredVersion) {
      const placed = exempt || /roadmap|next|planned|will\b|after\b|upcoming|target|stray|shipped|was\b/i.test(context);
      let v,
        V_RE = /v(\d+\.\d+)/gi;
      while (v = V_RE.exec(cite)) {
        checked++;
        if (parseFloat(v[1]) > parseFloat(declaredVersion) && !placed) {
          add('v' + v[1], 'runs ahead of the readme’s own heading (v' + declaredVersion + ') — documents an unreleased state as current');
        }
      }
    }
    return checked;
  }
  const lineOf = (text, i) => text.slice(0, i).split('\n').length;

  /* Markdown: one unit per paragraph, citations are backticked spans and fenced blocks,
     context is the whole paragraph. Prose says "density 2" in sentences constantly;
     `data-density="2"` is a citation, and the difference is exactly the backtick. */
  function markdownUnits(text) {
    const units = [];
    let offset = 0;
    text.split(/\n\s*\n/).forEach(para => {
      const line = lineOf(text, offset);
      offset += para.length + 2;
      const spans = [];
      let m,
        SPAN_RE = /`([^`\n]+)`/g,
        FENCE_RE = /```[a-z]*\n([\s\S]*?)```/g;
      while (m = SPAN_RE.exec(para)) spans.push(m[1]);
      while (m = FENCE_RE.exec(para)) spans.push(m[1]);
      if (spans.length) units.push({
        cite: spans.join('\n'),
        context: para,
        line: line
      });
    });
    return units;
  }
  const decoder = document.createElement('textarea');
  const decode = s => {
    decoder.innerHTML = s;
    return decoder.value;
  };

  /* Card HTML: one unit per citation, because there are no paragraph boundaries to use.
     Context is a window of the surrounding source with tags stripped — coarser than a
     paragraph, and stated as such.
      <code> is the ONLY marker here. The first version also read backticked spans, on the
     reasoning that six labs build their captions in script — and immediately failed on
     `--pane-fill`, which is not a citation at all but a fragment of a JS template
     literal, a token the card declares in its own local <style> and sets inline per
     option. Backticks in HTML delimit template literals, not quotations. Same lesson as
     `--busy`, one medium over — the check's first output is about the check.
      Worth knowing before extending this: what we read here is SERVED HTML, not the file
     on disk. The host injects a transpiler whose own template literals put backticks in
     every card, including cards with none in source — so a backtick scan would not have
     been merely noisy, it would have been scanning the host's tooling. That is also the
     scope limit: prose assembled inside a script string is not scanned, and cannot be by
     any source-text rule for the same reason. Reading the card's rendered DOM is the only
     approach that sees its prose and nothing else. */
  function htmlUnits(text) {
    const units = [];
    const push = (raw, i) => {
      const cite = decode(raw.replace(/<[^>]+>/g, '')).trim();
      if (!cite) return;
      const win = text.slice(Math.max(0, i - EXEMPT_WINDOW), i + raw.length + EXEMPT_WINDOW);
      units.push({
        cite: cite,
        context: decode(win.replace(/<[^>]+>/g, ' ')),
        line: lineOf(text, i)
      });
    };
    let m,
      CODE_RE = /<code[^>]*>([\s\S]*?)<\/code>/gi;
    while (m = CODE_RE.exec(text)) push(m[1], m.index);
    return units;
  }
  async function proseCheck() {
    const fails = [];
    let checked = 0;
    const facts = codeFacts();
    const add = where => (what, detail) => fails.push({
      check: '12 prose',
      where: where,
      what: what,
      detail: detail
    });
    const unreadable = (where, why) => fails.push({
      check: '12 prose',
      where: where,
      what: 'unreadable',
      detail: why
    });
    const grab = async path => {
      const res = await fetch(path);
      if (!res.ok) throw new Error(res.status);
      return res.text();
    };
    let text;
    try {
      text = await grab(DOCS.base + DOCS.readme);
    } catch (e) {
      /* A check that cannot read its subject must say so. Reporting zero here would
         be the vacuous-pass failure mode this harness is built to avoid. */
      PROSE = {
        fails: [{
          check: '12 prose',
          where: DOCS.readme,
          what: 'unreadable',
          detail: 'harness could not fetch the readme — this check did not run. If this is a ported harness, set window.FrostworkDocs = { base, readme, decisions, manifest } before checks.js loads.'
        }],
        checked: 0
      };
      return redraw();
    }
    const declaredVersion = (text.match(/^#\s.*?v(\d+\.\d+)/m) || [])[1];
    markdownUnits(text).forEach(u => {
      checked += citationScans(u, facts, declaredVersion, add(DOCS.readme + ':' + u.line));
    });

    /* The count claims live in the readme only — they are assertions about the harness,
       and the harness is described there. decisions.md gets the citation scans alone. */
    const counted = countClaims(text);
    fails.push.apply(fails, counted.fails);
    checked += counted.matched;
    let history = null;
    if (DOCS.decisions) {
      try {
        history = await grab(DOCS.base + DOCS.decisions);
      } catch (e) {
        unreadable(DOCS.decisions, 'declared in scope but not fetchable — the post-mortems were not scanned');
      }
    }
    if (history) {
      const hv = (history.match(/^#\s.*?v(\d+\.\d+)/m) || [])[1] || declaredVersion;
      markdownUnits(history).forEach(u => {
        checked += citationScans(u, facts, hv, add(DOCS.decisions + ':' + u.line));
      });
    }

    /* Publish the readme result before the 51 card fetches, so the report is never
       blocked on the slowest half of this check. */
    PROSE = {
      fails: fails.slice(),
      checked: checked,
      partial: true
    };
    redraw();

    /* The card list is read from the manifest, never hardcoded: a hardcoded list of 51
       paths silently stops covering the 52nd card. */
    if (!DOCS.cards) {
      PROSE = {
        fails: fails,
        checked: checked,
        cards: 0
      };
      return redraw();
    }
    let cards;
    try {
      cards = JSON.parse(await grab(DOCS.base + DOCS.manifest)).cards || [];
    } catch (e) {
      unreadable(DOCS.manifest, 'harness could not read the card list — no card was scanned');
      PROSE = {
        fails: fails,
        checked: checked
      };
      return redraw();
    }
    const texts = await Promise.all(cards.map(c => grab(DOCS.base + c.path).catch(() => null)));
    cards.forEach((card, i) => {
      const src = texts[i];
      if (src === null) {
        unreadable(card.path, 'declared in the manifest but not fetchable — this card was not scanned');
        return;
      }
      htmlUnits(src).forEach(u => {
        checked += citationScans(u, facts, declaredVersion, add(card.path + ':' + u.line));
      });
      /* Subtitles get the markdown rule: a caption is display copy, and the only way it
         asserts a name rather than describing one is to quote it. */
      if (card.subtitle) {
        markdownUnits(card.subtitle).forEach(u => {
          checked += citationScans(u, facts, declaredVersion, add(card.path + ' subtitle'));
        });
      }
    });
    PROSE = {
      fails: fails,
      checked: checked,
      cards: cards.length
    };
    redraw();
  }

  /* Counts are the one prose claim no citation scan can reach: "the harness runs twelve
     checks", "four rules remain unmechanised" — both are assertions about this file, and
     both drifted the moment a rule was reclassified in prose without touching its
     declared enforcement. Read them off the real arrays instead. */
  function countClaims(text) {
    const out = [];
    let matched = 0;
    /* Digits only, and the docs are written to match. A spelled-number map is a literal
       sized to the current number of checks: this one stopped at 'fourteen', so the
       moment check 15 landed the readme's headline count fell out of tracking
       ENTIRELY — skipped before it was even counted, no failure, no signal. Not a
       wrong numeral like render()'s WORDS array, a vacuous pass on the one claim
       D-prose exists to police. Third instance of this shape (after the scoreboard's
       fixed column list and render()'s word list) and the only one that lied. */
    const num = s => /^\d+$/.test(s) ? +s : undefined;
    const cov = coverage();
    const claims = [
    /* Bold-agnostic on purpose. The first version required **N**, and four of the
       five check-count sentences in the readme are written as plain prose ("the 15
       runtime checks in ui_kits/conformance/"), so they were never tracked — the
       same vacuous pass as the spelled-number map, one syntax over. Any digit
       followed by "checks" or "runtime checks" is a claim about this harness. */
    [/(?:\*\*)?(\d+)(?:\*\*)?\s+(?:runtime )?checks\b/gi, document.querySelectorAll('#scoreboard .score').length, 'checks the harness renders'], [/\*\*(\d+) rules? remain unmechanised/gi, cov.unmechanised.length, "rules declaring enforcement: 'review' in rules.js"]];
    claims.forEach(([re, actual, what]) => {
      let m;
      while (m = re.exec(text)) {
        const claimed = num(m[1]);
        if (claimed === undefined || !actual) continue;
        matched++; // a claim tracked, not a claim assumed
        const line = text.slice(0, m.index).split('\n').length;
        if (claimed !== actual) {
          out.push({
            check: '12 prose',
            where: 'readme.md:' + line,
            what: m[0].replace(/\*/g, '').trim(),
            detail: 'there are ' + actual + ' ' + what
          });
        }
      }
    });
    return {
      fails: out,
      matched: matched
    };
  }
  function redraw() {
    if (lastRender) render.apply(null, lastRender);
  }
  function render(counts, fails, contrastChecks, furnitureChecks) {
    lastRender = [counts, fails, contrastChecks, furnitureChecks];
    /* Check 12 is async — it fetches the readme. It merges into the report when it
       lands rather than delaying the eleven synchronous checks behind a network read. */
    if (PROSE) {
      fails = fails.concat(PROSE.fails);
      counts.prose = PROSE.fails.length;
    }
    if (SCROLL) {
      fails = fails.concat(SCROLL.fails);
      counts.parallax += SCROLL.fails.filter(f => f.check === '13 parallax').length;
      counts.densityAnim += SCROLL.fails.filter(f => f.check === '14 density').length;
    }
    const total = counts.contrast + counts.layers + counts.specular + counts.carriers + counts.functional + (counts.parity || 0) + (counts.nesting || 0) + (counts.furniture || 0) + (counts.stage || 0) + (counts.budget || 0) + (counts.concentric || 0) + (counts.parallax || 0) + (counts.densityAnim || 0) + (counts.prose || 0) + (counts.coverage || 0);
    const COV = coverage();
    const cards = [['Contrast', counts.contrast, contrastChecks + ' text nodes'], ['Layer discipline', counts.layers, 'mood scopes'], ['Specular integrity', counts.specular, document.querySelectorAll('.glass').length + ' surfaces'], ['Non-colour carriers', counts.carriers, document.querySelectorAll('.status').length + ' statuses'], ['Functional layer', counts.functional, 'prose & muted on glass'], ['Scope parity', counts.parity || 0, 'semantic tokens, light vs dark'], ['Plane nesting', counts.nesting || 0, 'opaque boxes on glass'], ['Page furniture', counts.furniture || 0, furnitureChecks + ' nodes off-stage'], ['Stage completeness', counts.stage || 0, document.querySelectorAll('.backdrop, .stage').length + ' stages'], ['Blur budget', counts.budget || 0, 'nesting & animated filters'], ['Concentric radii', counts.concentric || 0, 'nested surfaces'], ['Parallax plane', counts.parallax || 0, SCROLL ? SCROLL.note || SCROLL.surfaces + ' surfaces, scrolled' : 'scrolling…'], ['Density interpolation', counts.densityAnim || 0, SCROLL ? SCROLL.note || SCROLL.stages + ' stages on scroll, & keyframes' : 'keyframes; scrolling…'], ['Prose vs code', counts.prose || 0, PROSE ? PROSE.checked + ' citations · docs' + (PROSE.cards ? ' + ' + PROSE.cards + ' cards' : ', cards…') : 'reading ' + DOCS.readme + '…'], ['Rule coverage', counts.coverage || 0, COV.declared + ' rules declared, ' + COV.byHarness.length + ' enforced, ' + COV.unmechanised.length + ' on review']];
    /* Every host element is optional and every one is guarded. A ported host page that
       omits #failures used to throw inside render() and produce no report at all —
       strictly worse than the silent-zero mode this harness warns about, because it
       killed the run. #failures is where the report actually lands, so a host page
       without it gets a console line rather than a blank page. */
    const board = document.getElementById('scoreboard');
    if (board) board.innerHTML = cards.map(([label, n, sub]) => '<div class="score ' + (n ? 'fail' : 'pass') + '"><span class="cap">' + label + '</span><b>' + n + '</b>' + '<span class="cap" style="color:var(--text-muted)">' + (n ? 'failing' : 'clean') + ' · ' + sub + '</span></div>').join('');

    /* The lede's count comes from the cards actually rendered, as a numeral. It used to
       be spelled from a fixed WORDS array that ran out at thirteen, so the fourteenth
       check silently fell back to a digit — the third fixed-length-thing-vs-growing-count
       defect in this file (after the scoreboard's one-column-per-check grid). Encoding
       the count in a literal is the defect; a numeral does not have a length. */
    const countEl = document.getElementById('check-count');
    if (countEl) countEl.textContent = cards.length;
    const box = document.getElementById('failures');
    if (!box) return console.warn('[conformance] no #failures element on this page — ' + total + ' failure(s) not rendered.');
    if (!total) {
      box.innerHTML = '<p class="note" style="margin:0;font-family:var(--font-mono);font-size:12px;color:var(--text-body)">ALL CHECKS CLEAN \u00b7 ' + contrastChecks + ' text nodes measured across ' + document.querySelectorAll('.backdrop').length + ' stages</p>';
      return;
    }
    box.innerHTML = '<table><thead><tr><th>check</th><th>where</th><th>what</th><th>measured</th></tr></thead><tbody>' + fails.map(f => '<tr class="bad"><td>' + f.check + '</td><td>' + f.where + '</td><td>' + f.what + '</td><td>' + f.detail + '</td></tr>').join('') + '</tbody></table>';
  }

  /* Coverage: which declared rules this harness actually checks. Reported so the
     gap between "declared" and "enforced" is visible in the harness itself rather
     than only in the rules card. */
  function coverage() {
    const rules = window.FrostworkRules || [];
    /* Hand-maintained, and the one literal here that may stay so: it is the authority
       check 15 compares rules against, not a count derived from something else. It also
       fails in the safe direction — add check 16 and forget this line, and every rule
       naming it is reported as an orphan. Loud, not silent. */
    const checked = new Set(['1 contrast', '2 layer', '3 specular', '4 carrier', '5 functional', '6 parity', '7 nesting', '8 furniture', '9 stage', '10 budget', '11 concentric', '12 prose', '13 parallax', '14 density', '15 coverage']);
    return {
      declared: rules.length,
      /* Rules that claim the harness enforces them and name a check that does not
         exist. `M-fail-safe` sat here for four versions declaring `check: '8 reveal'`
         while slot 8 is page furniture: it counted as enforced in prose, appeared in
         neither byHarness nor unmechanised, and no guard compared the two sets. Check
         15 exists so the gap between declared and enforced cannot be silent again. */
      orphans: rules.filter(r => r.enforcement === 'harness' && !checked.has(r.check)),
      byHarness: rules.filter(r => r.enforcement === 'harness' && checked.has(r.check)).map(r => r.id),
      unmechanised: rules.filter(r => r.enforcement === 'review').map(r => r.id)
    };
  }
  window.FrostworkChecks = {
    run,
    ratio,
    toRgba,
    backdropsBehind,
    coverage,
    countClaims,
    scrollProbe
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/conformance/checks.js", error: String((e && e.message) || e) }); }

// ui_kits/glass-lab/Atmosphere.jsx
try { (() => {
const {
  BackdropStage,
  GlassCard,
  GlassNav,
  GlassButton
} = window.FrostworkGlassSystem_ed2ecc;
function Atmosphere({
  mode,
  mood,
  caption
}) {
  const fill = mode === 'light' ? 'light' : 'dark';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(BackdropStage, {
    mood: mood,
    mode: mode,
    height: 344,
    style: {
      alignContent: 'space-between',
      padding: 'var(--stage-inset)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(GlassNav, {
    items: ['Work', 'Writing', 'About'],
    active: "Work",
    style: {
      width: '100%'
    },
    trailing: /*#__PURE__*/React.createElement(GlassButton, {
      size: "sm"
    }, "Contact")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 12,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(GlassCard, {
    eyebrow: "Selected work",
    title: mode === 'light' ? 'Daylight, borrowed' : 'Nightshift, borrowed',
    body: mode === 'light' ? 'Light mode over bright media: thin fills, bright edges, shallow shadow. The glass reads warm because the photo is warm.' : 'Dark mode over dark media: deeper fills, dimmed brightness, a heavier shadow. The glass reads cool because the photo is cool.',
    meta: mode === 'light' ? 'blur 28 / 0.18' : 'blur 28 / 0.30'
  }), /*#__PURE__*/React.createElement(GlassCard, {
    eyebrow: "Override",
    title: "Legibility wins",
    body: "Same card, guaranteed fill forced on \u2014 hue kept, luminance pinned.",
    fill: fill,
    meta: mode === 'light' ? 'blur 24 / 0.82 · fill' : 'blur 24 / 0.78 · fill'
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, caption));
}
Object.assign(window, {
  Atmosphere
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glass-lab/Atmosphere.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glass-lab/Matrix.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  BackdropStage,
  GlassCard,
  GlassNav,
  GlassButton,
  GlassModal,
  SpecChip
} = window.FrostworkGlassSystem_ed2ecc;
const {
  MOODS,
  SURFACES,
  OVERRIDE,
  REASON,
  OVERRIDE_SPEC
} = window.GLASS_LAB;
const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)'
};
function Specimen({
  surface,
  mood,
  mode,
  fill
}) {
  const common = {
    fill
  };
  if (surface === 'nav') {
    return /*#__PURE__*/React.createElement(GlassNav, _extends({
      brand: null,
      items: ['Work', 'About'],
      active: "Work"
    }, common, {
      style: {
        width: '100%'
      }
    }));
  }
  if (surface === 'card') {
    return /*#__PURE__*/React.createElement(GlassCard, _extends({
      eyebrow: "2024 \u2014 Identity",
      title: "Sable Studio",
      body: "A quiet mark for a loud category.",
      meta: "Case study"
    }, common, {
      style: {
        width: '100%'
      }
    }));
  }
  if (surface === 'button') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(GlassButton, common, "View project"), /*#__PURE__*/React.createElement(GlassButton, _extends({
      size: "sm"
    }, common), "2024"));
  }
  return /*#__PURE__*/React.createElement(GlassModal, _extends({
    title: "Get in touch",
    body: "Studio enquiries, two-week turnaround."
  }, common, {
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlassButton, {
      size: "sm",
      fill: fill
    }, "Later"), /*#__PURE__*/React.createElement(GlassButton, {
      size: "sm",
      fill: fill
    }, "Send"))
  }));
}
function Cell({
  mood,
  surface,
  mode
}) {
  const needs = OVERRIDE[mode][mood.id][surface.id];
  const fill = needs ? mode === 'light' ? 'light' : 'dark' : 'inherit';
  const spec = needs ? {
    blur: OVERRIDE_SPEC[mode].blur,
    opacity: OVERRIDE_SPEC[mode].alpha,
    override: true
  } : {
    blur: surface.blur,
    opacity: surface.alpha[mode]
  };
  const reason = REASON[mode + '/' + mood.id + '/' + surface.id];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement(BackdropStage, {
    mood: mood.id,
    mode: mode,
    height: surface.id === 'card' ? 264 : surface.id === 'modal' ? 208 : 176,
    style: {
      position: 'relative',
      alignContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Specimen, {
    surface: surface.id,
    mood: mood.id,
    mode: mode,
    fill: fill
  })), /*#__PURE__*/React.createElement("div", {
    className: mode === 'light' ? 'light' : 'dark',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minHeight: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      color: 'var(--text-muted)'
    }
  }, "blur ", spec.blur, "px / ", spec.opacity.toFixed(2)), needs ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      color: 'var(--n-8)',
      border: '1px solid var(--n-4)',
      borderRadius: 999,
      padding: '2px 7px',
      background: 'var(--n-1)'
    },
    title: reason
  }, "fill override") : null), needs && reason ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      textTransform: 'none',
      letterSpacing: 0,
      fontSize: 11,
      color: 'var(--n-4)'
    }
  }, "\u21B3 ", reason) : null);
}
function Matrix({
  mode
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '150px repeat(4, 1fr)',
      gap: 16,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("span", null), SURFACES.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '-.014em',
      color: 'var(--n-8)'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "base ", s.blur, "px / ", s.alpha[mode].toFixed(2))))), MOODS.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '150px repeat(4, 1fr)',
      gap: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '-.014em',
      color: 'var(--n-8)'
    }
  }, m.label), /*#__PURE__*/React.createElement("span", {
    style: {
      ...labelStyle,
      textTransform: 'none',
      letterSpacing: 0,
      color: 'var(--text-muted)'
    }
  }, m.note)), SURFACES.map(s => /*#__PURE__*/React.createElement(Cell, {
    key: s.id,
    mood: m,
    surface: s,
    mode: mode
  })))));
}
Object.assign(window, {
  Matrix,
  Cell,
  Specimen,
  labelStyle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glass-lab/Matrix.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glass-lab/data.js
try { (() => {
window.GLASS_LAB = (() => {
  const MOODS = [{
    id: 'warm',
    label: 'Warm / bright photo',
    note: 'high luminance, ochre cast'
  }, {
    id: 'cool',
    label: 'Cool / dark photo',
    note: 'low luminance, blue cast'
  }, {
    id: 'busy',
    label: 'Busy / high-contrast',
    note: 'hard edges, full-range values'
  }, {
    id: 'plain',
    label: 'Plain dark backdrop',
    note: 'no media to borrow from'
  }];
  const SURFACES = [{
    id: 'nav',
    label: 'Nav',
    blur: 18,
    alpha: {
      light: 0.12,
      dark: 0.22
    }
  }, {
    id: 'card',
    label: 'Card',
    blur: 28,
    alpha: {
      light: 0.18,
      dark: 0.30
    }
  }, {
    id: 'button',
    label: 'Button',
    blur: 10,
    alpha: {
      light: 0.16,
      dark: 0.30
    }
  }, {
    id: 'modal',
    label: 'Modal',
    blur: 56,
    alpha: {
      light: 0.26,
      dark: 0.44
    }
  }];
  // true = accessibility fill override required for text to stay legible
  const OVERRIDE = {
    light: {
      warm: {
        nav: false,
        card: false,
        button: true,
        modal: false
      },
      cool: {
        nav: true,
        card: true,
        button: true,
        modal: false
      },
      busy: {
        nav: true,
        card: true,
        button: true,
        modal: true
      },
      plain: {
        nav: true,
        card: true,
        button: true,
        modal: false
      }
    },
    dark: {
      warm: {
        nav: true,
        card: true,
        button: true,
        modal: false
      },
      cool: {
        nav: false,
        card: false,
        button: false,
        modal: false
      },
      busy: {
        nav: true,
        card: true,
        button: true,
        modal: true
      },
      plain: {
        nav: false,
        card: false,
        button: false,
        modal: false
      }
    }
  };
  const REASON = {
    'light/warm/button': '13px label over bright detail',
    'light/cool/nav': 'dark nav text on a dark photo',
    'light/cool/card': 'dark body copy on a dark photo',
    'light/cool/button': 'dark label on a dark photo',
    'light/busy/nav': 'edges cut through small text',
    'light/busy/card': 'value range spans white to black',
    'light/busy/button': 'label vanishes at every stripe',
    'light/busy/modal': 'stripes survive 56px blur',
    'light/plain/nav': 'no light to borrow',
    'light/plain/card': 'no light to borrow',
    'light/plain/button': 'no light to borrow',
    'dark/warm/nav': 'light text on a bright photo',
    'dark/warm/card': 'light body copy on a bright photo',
    'dark/warm/button': 'light label on a bright photo',
    'dark/busy/nav': 'edges cut through small text',
    'dark/busy/card': 'value range spans white to black',
    'dark/busy/button': 'label vanishes at every stripe',
    'dark/busy/modal': 'stripes survive 56px blur'
  };
  const OVERRIDE_SPEC = {
    light: {
      blur: 24,
      alpha: 0.82
    },
    dark: {
      blur: 24,
      alpha: 0.78
    }
  };
  return {
    MOODS,
    SURFACES,
    OVERRIDE,
    REASON,
    OVERRIDE_SPEC
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glass-lab/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Choreography = __ds_scope.Choreography;

__ds_ns.LiveBackdrop = __ds_scope.LiveBackdrop;

__ds_ns.ContentPlane = __ds_scope.ContentPlane;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Icons = __ds_scope.Icons;

__ds_ns.Stack = __ds_scope.Stack;

__ds_ns.Text = __ds_scope.Text;

__ds_ns.VisuallyHidden = __ds_scope.VisuallyHidden;

__ds_ns.BackdropStage = __ds_scope.BackdropStage;

__ds_ns.GlassButton = __ds_scope.GlassButton;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.GlassModal = __ds_scope.GlassModal;

__ds_ns.GlassNav = __ds_scope.GlassNav;

__ds_ns.GlassSearch = __ds_scope.GlassSearch;

__ds_ns.GlassSegmented = __ds_scope.GlassSegmented;

__ds_ns.GlassSurface = __ds_scope.GlassSurface;

__ds_ns.SpecChip = __ds_scope.SpecChip;

__ds_ns.REF_DEPTHS = __ds_scope.REF_DEPTHS;

})();
