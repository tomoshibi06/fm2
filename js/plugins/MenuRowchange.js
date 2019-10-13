//=============================================================================
// MenuRowchange.js
//=============================================================================

/*:ja
 * @plugindesc ver1.02 メニューステータスの可視行の変更。
 * @author まっつＵＰ
 *
 * @param row
 * @desc 可視行数
 * @default 3
 * 
 * @param shortwidth
 * @desc 幅を小さくする場合は0以外を入れてください。
 * @default 0
 * 
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * パラメータで可視行を変えることができますが
 * 2~4人くらいしかまともに見えるレイアウトになりません。
 * ご了承ください。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * ver1.01 幅を小さくできるようにしました。
 * ver1.02 幅を小さくしない場合にレイアウトが適切でない不具合を修正。
 * 
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('MenuRowchange');
var MRrow = Number(parameters['row'] || 3);
var MRshortwidth = Number(parameters['shortwidth'] || 0);
var MRindex = 0;
var MRflag = false;
var MRwidth = 180;
var MRwidth2 = 240 - MRwidth;

var _Scene_Menu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
Scene_Menu.prototype.createStatusWindow = function() {
    _Scene_Menu_createStatusWindow.call(this);
    this._goldWindow.x = this._commandWindow.x;
    this._goldWindow.y = this._statusWindow.height - this._goldWindow.height;
};

Window_MenuStatus.prototype.windowHeight = function() {
    return Math.min(Graphics.boxHeight * this.numVisibleRows() / 3, Graphics.boxHeight);
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return Math.max(MRrow, 1);
};

var _Window_MenuStatus_drawItem = Window_MenuStatus.prototype.drawItem;
Window_MenuStatus.prototype.drawItem = function(index) {
    MRindex = index;
    _Window_MenuStatus_drawItem.call(this, index);
};

//オーバーライド
Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
    var index = MRindex;
    var rect = this.itemRect(index);
    var y = rect.y + rect.height / 2 - Window_Base._faceHeight / 2;
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

if(MRshortwidth){
//パラメータに規定値が入っている時だけ
var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.x = MRwidth2;
};

var _Scene_Menu_createGoldWindow = Scene_Menu.prototype.createGoldWindow;
Scene_Menu.prototype.createGoldWindow = function() {
    MRflag = true;
    _Scene_Menu_createGoldWindow.call(this);
};

var _Window_Gold_windowWidth = Window_Gold.prototype.windowWidth;
Window_Gold.prototype.windowWidth = function() {
    if(MRflag){
        MRflag = false;
        return MRwidth;
    }
    return _Window_Gold_windowWidth.call(this);
};

Window_MenuCommand.prototype.windowWidth = function() {
    return MRwidth;
};

var _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
Window_MenuStatus.prototype.initialize = function(x, y) {
    var x = MRwidth + MRwidth2;
    _Window_MenuStatus_initialize.call(this, x, y);
};

Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - MRwidth - MRwidth2 * 2;
};

//オーバーライド
Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var plusval = 16;
    var plusval2 = 152;
    var x = x - plusval;
    var x2 = x + plusval2;
    var width2 = plusval + plusval2;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2 + plusval, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
};

}
 
})();
