***
<a href="https://github.com/AugustEnd/swagger-ts-plugin" target="\_parent"><img src="https://img.shields.io/github/stars/AugustEnd/swagger-ts-plugin.svg?style=social&label=Star"/></a>

### Usage

该插件根据 swagger 提供的 api-doc 返回的接口数据，生成前端写 ts 所需的接口定义。
如果你正在使用 ts 并且后端接口文档是 swagger 的话，这个插件适合你
### vscode插件 
新增加同样功能的vscode插件
vscode 插件中搜索 vscode-swagger2ts-plugin安装
记得给好评呀o.O 

### 配置
开始使用前必须配置，请打开 文件-> 首选项 -> 设置，
找到swagger-ts-plugin;
* 请配置eureka服务列表的接口 appUrl，如http://eureka.dev.com:1111/eureka/apps；
* 请配置服务名称和服务对象（如下）。

```json
"swagger-ts-plugin.serviceList": [
    {
        "serviceName": "xxx-service",
		// 这里的地址一定不能错，如果不知道规则，可以查看源码，或者其他服务
        "serviceUrl": "http://172.20.37.153:8000/",
    },
    "sms-service"
]
```

### 使用

* ctrl + shift + p 然后输入 swagger2ts 回车。
* 请注意如果是新开的vscode窗口未选择文件是不会有任何文件生成。
* 如果你的配置没有问题，当前窗口也选择了文件项目。
* 你将在文件根目录得到一个swagger2ts文件夹，包含多个子文件夹数量等于配置的服务数量。
* 如果没有.gitignore文件将会添加忽略当前文件夹配置。

注意右下角提示。

如果你不想使用vscode插件，你只想在某个项目中使用 [webpack插件](https://github.com/AugustEnd/swagger-ts-plugin)

### 联系我
有一些好的想法，或者比较好联系我。1543259203@qq.com


### output

```txt
├── swagger2ts
	├── [serviceName1]
        ├── interface.d.ts
        └── paths.ts
	├── [serviceName2]
        ├── interface.d.ts
        └── paths.ts
	└── ...
```

```ts
// 文件 [service1]/paths.d.ts;

import { AnswerDTO } from "./interface.d";
interface pathsObj {
    "/calendar/deleteCalendarNoticeRecord": {
        method: "delete";
        data: AnswerDTO;
    };
}

// 文件 [service1]/interface.d.ts;
// 生成如下interface和注释
/**
 * @param answerContent (string) 回答内容
 * @param answerPersonId (string) 回答人id
 * @param answerPersonName (string) 回答人名称
 * @param answerPersonType (number) 回答人类型：1-受试者；2-CRC
 * @param attachment (string) 附件
 * @param authUserRoleDto (用户角色关系) 角色信息
 * @param createTime (string) 回答时间
 * @param id (string) 主键id
 * @param operation (boolean) 是否可操作：true-是；false-否
 * @param projectId (string) 项目id
 * @param questionId (string) 问题id
 * @param siteId (string) 中心id
 * @param sourceSystem (string) 外部系统标识
 * @param subjectInfoDTO (SubjectInfoDTO) 受试者信息
 */
export interface AnswerDTO {
    answerContent: string | null;
    answerPersonId: string | null;
    answerPersonName: string | null;
    answerPersonType: number | null;
    attachment: string | null;
    authUserRoleDto: 用户角色关系;
    createTime: string | null;
    id: string | null;
    operation: boolean | null;
    projectId: string | null;
    questionId: string | null;
    siteId: string | null;
    sourceSystem: string | null;
    subjectInfoDTO: SubjectInfoDTO;
}
```

|         Name          |                            Type                            |                  Default                   | Description                                                                                      |
| :-------------------: | :--------------------------------------------------------: | :----------------------------------------: | :----------------------------------------------------------------------------------------------- |
| **[`outputPath`](#)** |                         `{String}`                         |   `{path.resolve(__dirname, "../../")}`    | 生成 ts 文件输入的文件夹位置                                                                     |
| **[`serverList`](#)** | `{Array<{serviceName: string;serviceUrl:string;},string>}` |                    `[]`                    | 当前字段必传如果穿数组字符串['sms-service'] 后端服务名，如果是字符串对象，必传服务名称和服务地址 |
|   **[`appUrl`](#)**   |                         `{String}`                         | `"http://eureka.dev.com:1111/eureka/apps"` | 后端所有服务注册信息                                                                             |

### The last

---

如果觉得对你开发效率有所提升的话，给个[Star](https://github.com/AugustEnd/swagger-ts-plugin)⭐️ 鼓励一下吧~

```ts
/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 */
```
