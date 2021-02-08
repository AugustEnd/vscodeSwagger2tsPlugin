"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCreateFile = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
// configuration
const testCreateFile = () => {
    var _a;
    const rootPath = ((_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a[0].uri.fsPath) || null;
    console.log(vscode, "target");
    console.log(vscode.workspace
        .getConfiguration("swagger-ts-plugin")
        .get("serviceList"), "serviceList");
    vscode.window.showWarningMessage(`test ${JSON.stringify(vscode.workspace.getConfiguration("swagger-ts-plugin"))}`);
    if (rootPath) {
        fs.writeFile(path.resolve(rootPath, `ye.txt`), "sss", (error) => {
            if (!error) {
                console.log("成功", path.resolve(rootPath, `ye.txt`));
            }
            else {
                console.error(error);
            }
        });
    }
    else {
        vscode.window.showErrorMessage("必须打开文件夹才能使用");
    }
};
exports.testCreateFile = testCreateFile;
//# sourceMappingURL=test.js.map