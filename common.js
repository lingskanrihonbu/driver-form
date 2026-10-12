// 共通処理: LIFFの起動・ログイン・サーバー(Apps Script)との通信
(function () {
  var cfg = window.APP_CONFIG;
  // ページごとのLIFF IDが設定されていればそれを使い、なければ共通の LIFF_ID を使う
  var PAGE = /comment\.html/.test(location.pathname) ? 'COMMENT' : 'REGISTER';
  var LIFF_ID = (cfg && (cfg['LIFF_ID_' + PAGE] || cfg.LIFF_ID)) || '';

  function $(id) { return document.getElementById(id); }
  function show(id) { var e = $(id); if (e) e.classList.remove('hidden'); }
  function hide(id) { var e = $(id); if (e) e.classList.add('hidden'); }

  function showFatal(msg) {
    hide('loading'); hide('formView'); hide('doneView');
    var e = $('fatalMsg'); if (e) e.textContent = msg;
    show('fatalView');
  }

  // Apps Script のウェブアプリへ送る。
  // Content-Type を text/plain にするのは、CORSの事前確認(プリフライト)を発生させないため。
  async function api(action, payload) {
    var token = liff.getIDToken();
    var body = Object.assign({ action: action, idToken: token }, payload || {});
    var res;
    try {
      res = await fetch(cfg.GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body),
      });
    } catch (e) {
      return { ok: false, error: 'network', message: '通信できませんでした。電波の良いところでもう一度お試しください。' };
    }
    try {
      var data = await res.json();
    } catch (e) {
      return { ok: false, error: 'server_error', message: 'サーバーから正しい応答がありませんでした。時間をおいてお試しください。' };
    }
    if (!data.ok && data.error === 'invalid_token') {
      // トークン期限切れ: 一度ログインし直す(無限ループ防止に1回だけ)
      if (!sessionStorageGet('relogin')) {
        sessionStorageSet('relogin', '1');
        liff.logout();
        liff.login({ redirectUri: location.href });
        return { ok: false, error: 'relogin', message: '再ログインしています…' };
      }
    } else {
      sessionStorageSet('relogin', '');
    }
    return data;
  }

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  // LIFFを起動してログイン状態にする。成功したら true
  async function start() {
    if (!cfg || !LIFF_ID || /ここに/.test(LIFF_ID) || /ここに/.test(cfg.GAS_URL)) {
      showFatal('設定が未完了です(config.js の LIFF_ID と GAS_URL を設定してください)。');
      return false;
    }
    try {
      await liff.init({ liffId: LIFF_ID });
    } catch (e) {
      showFatal('LINEの読み込みに失敗しました。LINEアプリから開き直してください。');
      return false;
    }
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: location.href });
      return false;
    }
    return true;
  }

  window.App = { $: $, show: show, hide: hide, showFatal: showFatal, api: api, start: start, cfg: cfg };
})();
