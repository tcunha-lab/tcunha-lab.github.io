// ============================================================
// External-link opener
// ------------------------------------------------------------
// Any <a> whose URL leaves this site is automatically set to open
// in a new tab (target="_blank") and hardened with a safe rel
// attribute. Internal links (same hostname, anchors, relative
// paths) are left alone so site navigation still happens in the
// same tab.
//
// Runs once on DOMContentLoaded. Jekyll is a multi-page site, so
// no SPA-style re-run is needed — every new page load fires this
// fresh.
// ============================================================
(function () {
  function markExternal() {
    var here = window.location.hostname;
    var anchors = document.querySelectorAll('a[href]');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      // Skip anchors already explicitly targeted by the author
      // (e.g. target="_self" on an internal CTA).
      if (a.target) continue;

      var url;
      try {
        url = new URL(a.getAttribute('href'), window.location.href);
      } catch (e) { continue; }

      // Only act on http/https links. mailto:, tel:, javascript:,
      // and fragment-only links (#foo → same hostname anyway) are
      // left alone.
      if (!/^https?:$/.test(url.protocol)) continue;
      if (!url.hostname || url.hostname === here) continue;

      a.target = '_blank';
      // Merge — don't clobber — any rel the author set.
      var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      if (rel.indexOf('noreferrer') === -1) rel.push('noreferrer');
      a.setAttribute('rel', rel.join(' '));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markExternal);
  } else {
    markExternal();
  }
})();
