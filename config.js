// ここだけ書き換えれば動きます(初期設定ガイドの手順で取得した値を貼る)
window.APP_CONFIG = {
  LIFF_ID: '2011974169-Gk3lzZI5',          // 例: 1234567890-AbCdEfGh
  // LIFFアプリを登録用・コメント用に2つ作った場合だけ、下の2行にそれぞれのIDを入れる(通常は空欄でOK)
  LIFF_ID_REGISTER: '',
  LIFF_ID_COMMENT: '',
  GAS_URL: 'https://script.google.com/macros/s/AKfycbyktSvVHsS_TAZliaWgTALaTBJAqrGv0c6WhktrZr5gJGXumhBiJYeBYGACv2DamCY25g/exec', // https://script.google.com/macros/s/.../exec
  // 登録・更新のあと、本人のトークにメッセージを自動で送る(true/false)
  SEND_CHAT_MESSAGE_AFTER_REGISTER: true,
  REGISTER_CHAT_MESSAGE: '登録しました',
  // 送信結果を登録完了の画面に小さく表示する(確認が済んだら false にする)
  SHOW_SEND_RESULT: true,
  UPDATE_CHAT_MESSAGE: '登録情報を更新しました',
  ACCOUNT_NAME: 'LINGs',                    // 画面の見出しに出る名前
  PRIVACY_CONTACT: '担当統括または本部',     // 個人情報の問い合わせ先の表記(要確認)
};
