/*
 * --------------------------------------------------
 * MNKR_AddIconSave Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_AddIconSave.js
 * @plugindesc セーブデータにアイコンを追加表示できます。
 * @author munokura
 *
 * @help
 * セーブデータにアイコンを追加表示できます。
 * プラグインパラメーターで変数IDを指定し、
 * その変数にアイコンIDを代入すると表示されます。
 * 
 * 非表示にするには0を代入してください。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param iconVariableId1
 * @text 表示アイコン変数ID1
 * @type variable
 * @desc 表示するアイコンIDの値を入れる変数を指定します。
 * @default 0
 *
 * @param iconVariableId2
 * @text 表示アイコン変数ID2
 * @type variable
 * @desc 表示するアイコンIDの値を入れる変数を指定します。
 * @default 0
 *
 * @param iconVariableId3
 * @text 表示アイコン変数ID3
 * @type variable
 * @desc 表示するアイコンIDの値を入れる変数を指定します。
 * @default 0
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const iconVariableId1 = Number(parameters['iconVariableId1'] || 0);
  const iconVariableId2 = Number(parameters['iconVariableId2'] || 0);
  const iconVariableId3 = Number(parameters['iconVariableId3'] || 0);


  const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
  Window_SavefileList.prototype.drawContents = function (info, rect, valid) {
    _Window_SavefileList_drawContents.apply(this, arguments);
    let bottom = rect.y + rect.height;
    let lineHeight = this.lineHeight();
    if (info.iconVariableId1) {
      this.drawIcon(info.iconVariableId1, rect.x, bottom - lineHeight * 2);
    }
    if (info.iconVariableId2) {
      this.drawIcon(info.iconVariableId2, rect.x + 32, bottom - lineHeight * 2);
    }
    if (info.iconVariableId3) {
      this.drawIcon(info.iconVariableId3, rect.x + 64, bottom - lineHeight * 2);
    }
  };

  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    let info = _DataManager_makeSavefileInfo.call(this);
    info.iconVariableId1 = iconVariableId1 ? $gameVariables.value(iconVariableId1) : 0;
    info.iconVariableId2 = iconVariableId2 ? $gameVariables.value(iconVariableId2) : 0;
    info.iconVariableId3 = iconVariableId3 ? $gameVariables.value(iconVariableId3) : 0;
    return info;
  };

})();