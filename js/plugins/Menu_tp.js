//=============================================================================
// rpg_windows.jsから抜き出し
//=============================================================================

/*:
 * @plugindesc キャンプメニューにもＴＰ表示
 * @author ゆわか
 *
 * @help プラグインコマンドはありません。
 *
 * デフォルトのメニューのみ対応。
 * アクターかクラスの特徴で、ＴＰ持ち越しを付加してないと無意味。
 *
 * 使用報告不要・クレジット不要・改変可・商用利用可
 * もし何か問題が起きても、当方は一切責任を負いません。ご了承ください。
 */


//ＴＰを追加（メニュー・スキル）
Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, (y + lineHeight * 1)-6, width2);
    this.drawActorMp(actor, x2, (y + lineHeight * 2)-11, width2);
    this.drawActorTp(actor, x2, (y + lineHeight * 3)-16, width2);
};

//ＴＰを追加（ステータス）
Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, (y + lineHeight * 0)-16);
    this.drawActorIcons(this._actor, x, (y + lineHeight * 1)-18);
    this.drawActorHp(this._actor, x, (y + lineHeight * 2)-18);
    this.drawActorMp(this._actor, x, (y + lineHeight * 3)-20);
    this.drawActorTp(this._actor, x, (y + lineHeight * 4)-22, 185);
};

