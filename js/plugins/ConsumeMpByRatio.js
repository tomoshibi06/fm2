//=============================================================================
// ConsumeMpByRatio.js
//=============================================================================
/*:
 * @plugindesc Set skills' mp cost based on subjct's Max MP.
 * @author Sasuke KANNAZUKI
 *
 *
 * @help
 * This plugin does not provide plugin commands.
 *
 * [Usage]
 * Write down skill's note as following notation.
 *
 * <ConsumeMpRatio:33.4%>  // Consume 33.4% of Max MP
 * <ConsumeMpRatio:33.4>   // The same of abovr
 * <ConsumeMpRatio>      // Consume MP is "MP Cost" % of Max MP
 *
 * [Recommended usage]
 * In those skill's damage formula, I recommend to include a.mmp,
 * then the skill become more powerful based on subject's Max MP.
 *
 * These skills' mp cost is based on subject's Max MP.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc 消費MPを、最大MPの割合で変動させるスキルが作成できます。
 * @author 神無月サスケ
 *
 * @help
 * このプラグインには、プラグインコマンドはありません。
 *
 * ■設定方法
 * スキルのメモに以下の書式を書くと、MP変動スキルとみなされます。
 *
 * <ConsumeMpRatio:33.4%>  // 最大MPの33.4%が必要MPになります。
 * <ConsumeMpRatio:33.4>   // 同上
 * <ConsumeMpRatio>      // エディタの「消費MP」の％が必要MPになります。
 *
 * ■推奨する使い方
 * これらのスキルのダメージ計算式には、a.mmp (行動者の最大MP)を含めましょう。
 * それによって、最大MPが増えるほど、スキルの威力が増します。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  Game_BattlerBase.prototype.calcMpCostByRatio = function (skill) {
    var ratioStr = skill.meta.ConsumeMpRatio;
    if (ratioStr) {
      if (ratioStr === true) {
        return Math.floor(this.mmp * skill.mpCost / 100);
      } else {
	    var reg = (/([0-9]+(?:\.?)[0-9]+)(%?)/).exec(ratioStr);
        if (reg[1]) {
          return Math.floor(this.mmp * parseFloat(reg[1]) / 100);
        }        
      }
    }
    return skill.mpCost;
  };

  var _Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
  Game_BattlerBase.prototype.skillMpCost = function(skill) {
    var originalSkillCost = skill.mpCost;
    skill.mpCost = this.calcMpCostByRatio(skill);
    var result = _Game_BattlerBase_skillMpCost.call(this, skill);
    skill.mpCost = originalSkillCost;
    return result;
  };

})();
