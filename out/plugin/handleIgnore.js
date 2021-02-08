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
exports.addIgnoreRule = exports.fileIsIgnore = exports.forEachStr = exports.ignoreFile = void 0;
/**
 * 处理 如何忽略插件新增的文件夹及文件
 */
const fs = require("fs");
const paths = require("path");
const ignoreFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const ignoreUri = paths.join(path, "/.gitignore");
    const ignoreRule = "/swagger2ts";
    try {
        if (fs.existsSync(ignoreUri)) {
            const text = (yield new Promise((resolve, reject) => {
                fs.readFile(ignoreUri, {}, (error, data) => {
                    resolve(data.toString());
                });
            }));
            if (!exports.fileIsIgnore(text, ignoreRule)) {
                // 没被忽略需要重新加上当前文件忽略
                return yield new Promise((resolve, reject) => {
                    fs.writeFile(ignoreUri, exports.addIgnoreRule(text, ignoreRule), (error) => {
                        if (!error) {
                            resolve(".gitignore文件已修改");
                        }
                        else {
                            reject(error);
                        }
                    });
                });
            }
            return Promise.resolve(".gitignore文件不需要修改");
        }
        else {
            return yield new Promise((resolve, reject) => {
                fs.writeFile(ignoreUri, exports.addIgnoreRule("", ignoreRule), (error) => {
                    if (!error) {
                        resolve(".gitignore文件已添加");
                    }
                    else {
                        reject(error);
                    }
                });
            });
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.ignoreFile = ignoreFile;
const forEachStr = (str) => {
    return str
        .split(/\n/)
        .map((item) => item.replace(/^\s*/g, "").replace(/\s*$/g, ""))
        .filter((item) => !/\s*#/.test(item));
};
exports.forEachStr = forEachStr;
// ignore文件中是否忽略当前文件
const fileIsIgnore = (text, ignoreRule) => {
    return exports.forEachStr(text).includes(ignoreRule);
};
exports.fileIsIgnore = fileIsIgnore;
const addIgnoreRule = (text, ignoreRule) => {
    return `${text}\n${ignoreRule}`;
};
exports.addIgnoreRule = addIgnoreRule;
//# sourceMappingURL=handleIgnore.js.map