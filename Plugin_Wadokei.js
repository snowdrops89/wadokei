/**
 * なでしこ3 プラグイン
 * 和時計に使うやつ
 */
const PluginWadokei = {
  'クライアント幅': { // @ブラウザ内の表示域の幅（スクロールバーを除く） // @くらいあんとはば
    type: 'func',
    josi: [],
    fn: function () {
      return document.documentElement.clientWidth
    }
  },
  'クライアント高': { // @ブラウザ内の表示域の高さ（スクロールバーを除く） // @くらいあんとたかさ
    type: 'func',
    josi: [],
    fn: function () {
      return document.documentElement.clientHeight
    }
  },

  'アクセスデバイス': { // @接続してきた端末を判別 // @あくせすでばいす
    type: 'func',
    josi: [],
    fn: function () {
      var UA = navigator.userAgent;
      var iPhone = UA.indexOf('iPhone');
      var iPad = UA.indexOf('iPad');
      var Android = UA.indexOf('Android');
      var Mobile = UA.indexOf('Mobile');

      if(iPhone > 0 || Android > 0 && Mobile > 0){
        return "スマホ"
      }
      else if(iPad > 0 || Android > 0){
        return "タブレット"
      }
      else{
        return "ＰＣ他"
      }
    }
  },

  '扇描画': { // @[x,y,半径,開始角,終了角]に扇形を描く // @おうぎびょうが
    type: 'func',
    josi: [['へ', 'に'], ['から'], ['まで'], ['の']],
    fn: function (xy,start,end,r, sys) {
      sys.__ctx.beginPath();
      sys.__ctx.moveTo(xy[0], xy[1]);
      sys.__ctx.arc(xy[0], xy[1], r, start, end, false);
      sys.__ctx.fill();
      sys.__ctx.closePath();
      sys.__ctx.stroke();
    },
    return_none: true
  }
}
// モジュールのエクスポート(必ず必要)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PluginWadokei
}
//プラグインの自動登録
if (typeof (navigator) === 'object') {
  navigator.nako3.addPluginObject('PluginWadokei', PluginWadokei)
}
