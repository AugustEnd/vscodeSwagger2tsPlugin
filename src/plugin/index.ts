import * as vscode from "vscode";
import { ignoreFile } from "./handleIgnore";
// @ts-ignore
import * as Swapper2TsPlugin from "swagger-ts-plugin";

// configuration
export const testCreateFile = async () => {
    const rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || null;

    const serviceList =
        vscode.workspace
            .getConfiguration("swagger-ts-plugin")
            .get("serviceList") || ([] as any);
    const appUrl =
        vscode.workspace.getConfiguration("swagger-ts-plugin").get("appUrl") ||
        "";

    if (rootPath) {
        if (serviceList.length === 0) {
            // vscode.window.showOpenDialog({title:'title',defaultUri:'e'})
            vscode.commands.executeCommand(
                "workbench.action.openGlobalSettings"
            );

            vscode.window.showWarningMessage(
                "请配置setting.json中serviceList:Array<string>;请查看readme.md文件"
            );
            return false;
        }

        if (!appUrl) {
            // vscode.window.showOpenDialog({title:'title',defaultUri:'e'})
            vscode.commands.executeCommand(
                "workbench.action.openGlobalSettings"
            );

            vscode.window.showWarningMessage(
                "请配置setting.json中appUrl:string;正确的eureka地址，请查看readme.md文件"
            );
            return false;
        }

        vscode.window.showInformationMessage("转换中，请稍等。。。");

        await new Swapper2TsPlugin({
            appUrl,
            serverList: serviceList,
            outputPath: rootPath,
        }).build();
        const msg = await ignoreFile(rootPath);
        console.log("over");
        // vscode.window.showInformationMessage(typeof a);
        vscode.window.showInformationMessage(msg, "转换已完成");
    } else {
        vscode.window.showErrorMessage("必须打开文件夹才能使用");
    }
};
