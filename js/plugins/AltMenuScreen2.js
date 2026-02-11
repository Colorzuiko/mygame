//=============================================================================
// AltMenuScreen.js
//=============================================================================

/*:
 * @plugindesc Alternative menu screen layout.
 * @author Yoji Ojima
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc メニュー画面のレイアウトを変更します。
 * @author Yoji Ojima
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function () {

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    };

    Window_MenuCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_MenuCommand.prototype.maxCols = function () {
        return 4;
    };

    Window_MenuCommand.prototype.numVisibleRows = function () {
        return 2;
    };

    Window_MenuStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function () {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(2);
        return Graphics.boxHeight - h1 - h2;
    };

    Window_MenuStatus.prototype.maxCols = function () {
        return 4;
    };

    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        // var w = Math.min(rect.width, 144);
        // var h = Math.min(rect.height, 144);
        // var lineHeight = this.lineHeight();
        // this.changePaintOpacity(actor.isBattleMember());
        // this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);

        // --- 設定與讀取圖片 ---
        // 規則：檔案名稱為 "Actor" + 角色 ID (例如: Actor01.png, Actor02.png)
        // 圖片請放在專案的 img/pictures/ 資料夾內
        var filename = "Actor" + actor.actorId();
        var bitmap = ImageManager.loadPicture(filename);

        this.changePaintOpacity(actor.isBattleMember());

        // 確保圖片讀取完畢後再繪製
        bitmap.addLoadListener(function () {
            var pw = bitmap.width;
            var ph = bitmap.height;

            // --- 計算顯示位置 ---
            // 水平位置 (dx)：讓圖片在該角色的欄位中「水平置中」
            var dx = rect.x + (rect.width - pw) / 2;

            // 垂直位置 (dy)：設定圖片的起始 Y 座標
            // this.lineHeight() * 2 代表在名字與等級(約兩行文字)的下方開始顯示
            // 你可以透過修改後面的數字來調整高低 (例如 * 1.5 或 + 50)
            var dy = rect.y + this.lineHeight() * 1.5;

            // --- 繪製圖片 ---
            // 參數順序: 來源圖片, 來源X, 來源Y, 來源寬, 來源高, 目標X, 目標Y
            this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy);

        }.bind(this));

        this.changePaintOpacity(true);

    };

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function () {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

})();
