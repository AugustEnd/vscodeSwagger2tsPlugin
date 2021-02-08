"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCreateFile = void 0;
const vscode = require("vscode");
const handleIgnore_1 = require("./handleIgnore");
// @ts-ignore
const Swapper2TsPlugin = require("swagger-ts-plugin");
// configuration
const testCreateFile = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rootPath = ((_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0].uri.fsPath) || null;
    const serviceList = vscode.workspace
        .getConfiguration("swagger-ts-plugin")
        .get("serviceList") || [];
    const appUrl = vscode.workspace.getConfiguration("swagger-ts-plugin").get("appUrl") ||
        "";
    if (rootPath) {
        if (serviceList.length === 0) {
            // vscode.window.showOpenDialog({title:'title',defaultUri:'e'})
            vscode.commands.executeCommand("workbench.action.openGlobalSettings");
            vscode.window.showWarningMessage("请配置setting.json中serviceList:Array<string>;请查看readme.md文件");
            return false;
        }
        if (!appUrl) {
            // vscode.window.showOpenDialog({title:'title',defaultUri:'e'})
            vscode.commands.executeCommand("workbench.action.openGlobalSettings");
            vscode.window.showWarningMessage("请配置setting.json中appUrl:string;正确的eureka地址，请查看readme.md文件");
            return false;
        }
        vscode.window.showInformationMessage("转换中，请稍等。。。");
        yield new Swapper2TsPlugin({
            appUrl,
            serverList: serviceList,
            outputPath: rootPath,
        }).build();
        const msg = yield handleIgnore_1.ignoreFile(rootPath);
        console.log("over");
        // vscode.window.showInformationMessage(typeof a);
        vscode.window.showInformationMessage(msg, "转换已完成");
    }
    else {
        vscode.window.showErrorMessage("必须打开文件夹才能使用");
    }
});
exports.testCreateFile = testCreateFile;
//# sourceMappingURL=index.js.map