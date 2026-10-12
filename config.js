// ここだけ書き換えれば動きます(初期設定ガイドの手順で取得した値を貼る)
window.APP_CONFIG = {
  LIFF_ID: 'ここにLIFF IDを貼る',          // 例: 1234567890-AbCdEfGh
  // LIFFアプリを登録用・コメント用に2つ作った場合だけ、下の2行にそれぞれのIDを入れる(通常は空欄でOK)
  LIFF_ID_REGISTER: '',
  LIFF_ID_COMMENT: '',
  GAS_URL: 'ここにApps ScriptのウェブアプリURLを貼る', // https://script.google.com/macros/s/.../exec
  ACCOUNT_NAME: 'LINGs',                    // 画面の見出しに出る名前
  PRIVACY_CONTACT: '担当統括または本部',     // 個人情報の問い合わせ先の表記(要確認)
};
