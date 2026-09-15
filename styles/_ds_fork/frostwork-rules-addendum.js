/* ── Frostwork · project fork · rules addendum ─────────────────────────────────
   The fork's CSS is one half of a codified rule. This file is the other two: the
   rule AS DATA, so the rules card and the coverage check can see it, and the
   MEASUREMENT, so it is enforced against a rendered page rather than trusted.

   Load order on any page that runs the harness:

       guidelines/rules.js            → window.FrostworkRules
       ui_kits/conformance/checks.js  → window.FrostworkChecks
       _ds_fork/frostwork-rules-addendum.js

   …but load order is only a preference here, not a requirement: registration happens
   at assert time, not at script-execution time, for the reason recorded at register()
   below. On a normal site page, load this file alone and call FrostworkFork.assert() —
   it needs nothing from the harness.

   WHY THIS FILE EXISTS AT ALL. The upstream system's own lesson, recorded four times
   in guidelines/rules.js: a rule written more broadly in a comment than it is
   enforced in code drifts, silently, and the drift is invisible because everything
   still renders. Section 3 of the fork CSS makes the composition easy to author
   correctly. It cannot make it impossible to author incorrectly — CSS has no way to
   ask whether a text node is sitting over a photograph. That question is geometry,
   geometry is measurable, and so this is a check and not a guideline.
   ─────────────────────────────────────────────────────────────────────────────── */
(function () {
  var RULE = {
    id: 'C-bounded-media',
    layer: 'Composition · artifact card',
    title: 'Media is bounded; no ink over the still',
    statement:
      'An artifact card bleeds its media to the left, right and top edges and stops it at the text band. ' +
      'No text may intersect the media row. The band declares no fill and no filter of its own — it is the ' +
      "card's own glass, reading the site backdrop. One composition, two sizes.",
    enforcement: 'harness',
    check: '16 bounded',
    where: '_ds_fork/frostwork-blur-first.css § 3',
    why:
      'Ink over a photograph makes legibility a property of the image, so every new still reopens the ' +
      'question and the scrim can only bound it. Bounded media makes contrast a property of the mode, ' +
      'which the site owns. A structural guarantee beats a measured one wherever the structure is available.'
  };

  /* REGISTRATION IS DEFERRED, and the first version of this file got that wrong in the
     most on-the-nose way available: it registered at script-execution time, ran before
     the design-system bundle, took its own no-registry branch, and was then overwritten
     when the bundle assigned its own array over the binding. The rule existed as an
     object and was absent from the registry — silently, with nothing to see. That is
     precisely the drift this file's header claims to prevent, so the header now has a
     receipt.

     The fix is not to reorder the script and hope. Load order is a fact about a host
     page, and this file will be loaded by pages the fork does not control. Register at
     assert time instead, after everything has loaded, idempotently — then the rule
     lands whichever file wins the race. */
  function register() {
    if (!window.FrostworkRules || !window.FrostworkRules.push) {
      /* Declared even with no registry present, rather than dropped. A rule that
         vanishes when its host file is absent is the vacuous pass the harness's own
         porting notes warn about. */
      window.FrostworkRules = [RULE];
      return 'created';
    }
    if (window.FrostworkRules.some(function (r) { return r.id === RULE.id; })) return 'present';
    window.FrostworkRules.push(RULE);
    return 'pushed';
  }

  /* ── The measurement ────────────────────────────────────────────────────────
     Four assertions per card, all geometric or computed — no opinions:

       composition  exactly one media row and one band, media first
       no-ink       no non-empty text node's rect intersects the media rect
       bleed        media's left / top / right meet the card's padding box (±1px)
       band-is-pane band declares no background-image and no backdrop-filter

     The ±1px tolerance is for subpixel layout, not for slack: a 12px inset fails.
     Intersection is tested with a 0.5px tolerance so a shared edge — the seam, where
     media.bottom equals band.top — is not read as an overlap. That tolerance was the
     first thing this check got wrong: without it every correctly-built card failed
     on its own seam, which is the same false-positive shape as upstream's concentric
     check reporting 48 wrong failures on pills. A check with an opinion is not a
     measurement. */
  function textRects(root) {
    var out = [];
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.nodeValue && n.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = walk.nextNode())) {
      var range = document.createRange();
      range.selectNodeContents(n);
      var rs = range.getClientRects();
      for (var i = 0; i < rs.length; i++) {
        if (rs[i].width > 0 && rs[i].height > 0) out.push({ rect: rs[i], text: n.nodeValue.trim() });
      }
    }
    return out;
  }

  function overlaps(a, b, tol) {
    return a.left < b.right - tol && a.right > b.left + tol &&
           a.top < b.bottom - tol && a.bottom > b.top + tol;
  }

  function where(el) {
    var id = el.id ? '#' + el.id : '';
    var cls = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\s+/).join('.')
      : '';
    return (el.tagName.toLowerCase() + id + cls).slice(0, 72);
  }

  function boundedMedia() {
    var fails = [];
    var cards = document.querySelectorAll('[data-artifact-card]');
    var checked = 0;

    Array.prototype.forEach.call(cards, function (card) {
      var w = where(card);
      var media = card.querySelector(':scope > [data-artifact-media]');
      var band = card.querySelector(':scope > [data-artifact-band]');
      var kids = Array.prototype.filter.call(card.children, function (c) {
        return getComputedStyle(c).display !== 'none';
      });

      if (!media || !band) {
        fails.push({ check: '16 bounded', where: w, what: 'composition',
          detail: 'card declares ' + (media ? '' : 'no [data-artifact-media] ') +
                  (band ? '' : 'no [data-artifact-band] ') + 'child' });
        return;
      }
      if (kids.length !== 2 || kids[0] !== media || kids[1] !== band) {
        fails.push({ check: '16 bounded', where: w, what: 'composition',
          detail: 'expected exactly [media, band] as visible children; found ' + kids.length +
                  ' (' + kids.map(function (k) { return k.tagName.toLowerCase(); }).join(', ') + ')' });
      }

      var cb = card.getBoundingClientRect();
      var mb = media.getBoundingClientRect();
      var cs = getComputedStyle(card);
      checked++;

      /* bleed — three edges, measured against the card's padding box. */
      var pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0,
          pt = parseFloat(cs.paddingTop) || 0;
      var bw = parseFloat(cs.borderLeftWidth) || 0;
      var edges = [
        ['left', Math.abs(mb.left - (cb.left + bw + pl))],
        ['right', Math.abs(mb.right - (cb.right - bw - pr))],
        ['top', Math.abs(mb.top - (cb.top + bw + pt))]
      ].filter(function (e) { return e[1] > 1; });
      if (edges.length) {
        fails.push({ check: '16 bounded', where: w, what: 'media does not bleed',
          detail: edges.map(function (e) { return e[0] + ' inset by ' + e[1].toFixed(1) + 'px'; }).join(', ') +
                  ' — media must meet the card edge on left, right and top' });
      }

      /* no-ink — the rule itself. */
      textRects(card).forEach(function (t) {
        if (overlaps(t.rect, mb, 0.5)) {
          fails.push({ check: '16 bounded', where: w, what: 'ink over media',
            detail: '"' + t.text.slice(0, 40) + '" overlaps the media row — ' +
                    'move it into [data-artifact-band]' });
        }
      });

      /* band-is-pane — the band must be a window onto the card's glass, not a
         second surface. A background-image here is the pane-over-still composition
         growing back, one card at a time, which is exactly how it spread before. */
      var bs = getComputedStyle(band);
      if (bs.backgroundImage && bs.backgroundImage !== 'none') {
        fails.push({ check: '16 bounded', where: w, what: 'band declares a fill',
          detail: 'background-image: ' + bs.backgroundImage.slice(0, 48) +
                  ' — the band reads the card\u2019s own glass and declares none' });
      }
      var bf = bs.backdropFilter || bs.webkitBackdropFilter;
      if (bf && bf !== 'none') {
        fails.push({ check: '16 bounded', where: w, what: 'nested blur',
          detail: 'band declares backdrop-filter: ' + bf + ' — the card is the pane' });
      }
    });

    return { fails: fails, cards: cards.length, checked: checked };
  }

  /* Coverage. The harness's authority list of enforced checks is a hand-maintained Set
     inside checks.js, which this fork does not edit — so a rule naming '16 bounded'
     would be reported as an orphan by check 15. That report would be a false positive
     about the fork rather than a finding about the system, so the set is extended here,
     at the same place the check is registered. Registering a check and declaring it
     enforced are one action; splitting them across two files is how upstream's
     M-fail-safe read as enforced by nobody for four versions. */
  function patchCoverage() {
    var F = window.FrostworkChecks;
    if (!F || !F.coverage || F.__forkCoverage) return;
    var inner = F.coverage;
    F.coverage = function () {
      var c = inner();
      c.orphans = c.orphans.filter(function (r) { return r.check !== '16 bounded'; });
      if (c.byHarness.indexOf(RULE.id) === -1) c.byHarness.push(RULE.id);
      return c;
    };
    F.__forkCoverage = true;
  }

  /* Reporting. Appends to the harness's own table when there is one, so a fork check
     and an upstream check are read in one place; falls back to the console so this is
     never silently skipped on a page with no harness. */
  function report(res) {
    var box = document.getElementById('failures');
    var body = box && box.querySelector('tbody');
    if (body && res.fails.length) {
      body.insertAdjacentHTML('beforeend', res.fails.map(function (f) {
        return '<tr class="bad"><td>' + f.check + '</td><td>' + f.where +
               '</td><td>' + f.what + '</td><td>' + f.detail + '</td></tr>';
      }).join(''));
    }
    if (res.fails.length) {
      console.error('[fork · 16 bounded] ' + res.fails.length + ' failure(s) across ' +
        res.cards + ' artifact card(s):');
      res.fails.forEach(function (f) {
        console.error('  ' + f.where + ' · ' + f.what + ' · ' + f.detail);
      });
    } else if (res.cards) {
      console.info('[fork · 16 bounded] clean · ' + res.cards + ' artifact card(s) measured');
    }
    return res;
  }

  function assert() {
    register();
    patchCoverage();
    return report(boundedMedia());
  }

  window.FrostworkFork = { rule: RULE, register: register, boundedMedia: boundedMedia, assert: assert };

  /* Self-run once the page has laid out, because the check is geometric and a rect
     measured before layout is a rect of zeroes — which would pass. */
  if (document.readyState === 'complete') requestAnimationFrame(assert);
  else window.addEventListener('load', function () { requestAnimationFrame(assert); });
})();
