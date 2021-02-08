/**
 * 处理 如何忽略插件新增的文件夹及文件
 */
import * as fs from "fs";
import * as paths from "path";

export const ignoreFile = async (path: string): Promise<string> => {
    const ignoreUri = paths.join(path, "/.gitignore");
    const ignoreRule = "/swagger2ts";
    try {
        if (fs.existsSync(ignoreUri)) {
            const text = (await new Promise((resolve, reject) => {
                fs.readFile(
                    ignoreUri,
                    {},
                    (error: any, data: string | Buffer) => {
                        resolve(data.toString());
                    }
                );
            })) as string;

            if (!fileIsIgnore(text, ignoreRule)) {
                // 没被忽略需要重新加上当前文件忽略
                return await new Promise((resolve, reject) => {
                    fs.writeFile(
                        ignoreUri,
                        addIgnoreRule(text, ignoreRule),
                        (error) => {
                            if (!error) {
                                resolve(".gitignore文件已修改");
                            } else {
                                reject(error);
                            }
                        }
                    );
                });
            }
            return Promise.resolve(".gitignore文件不需要修改");
        } else {
            return await new Promise((resolve, reject) => {
                fs.writeFile(
                    ignoreUri,
                    addIgnoreRule("", ignoreRule),
                    (error) => {
                        if (!error) {
                            resolve(".gitignore文件已添加");
                        } else {
                            reject(error);
                        }
                    }
                );
            });
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const forEachStr = (str: string) => {
    return str
        .split(/\n/)
        .map((item) => item.replace(/^\s*/g, "").replace(/\s*$/g, ""))
        .filter((item) => !/\s*#/.test(item));
};

// ignore文件中是否忽略当前文件
export const fileIsIgnore = (text: string, ignoreRule: string) => {
    return forEachStr(text).includes(ignoreRule);
};

export const addIgnoreRule = (text: string, ignoreRule: String): string => {
    return `${text}\n${ignoreRule}`;
};
