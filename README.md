# SugarCube v2  

[SugarCube](http://www.motoslave.net/sugarcube/) 是一款为 [Twine/Twee](http://twinery.org/) 设计的**免费且自由**（gratis and libre）的故事格式。  

下载地址和文档可在 [SugarCube 官网](http://www.motoslave.net/sugarcube/) 找到。  

若您发现 SugarCube 的漏洞或有改进建议，可通过 [创建新议题](https://github.com/tmedwards/sugarcube-2/issues) 提交。SugarCube 还提供可供参考的 [开发日志](https://github.com/tmedwards/sugarcube-2/projects/1)。  


## 安装指南  

您可以从 [SugarCube 官网](http://www.motoslave.net/sugarcube/) 下载预编译包，或选择从源码构建——详见下方的 **从源码构建** 部分。  


## 从源码构建  

若您希望从零开始构建 SugarCube（而非直接使用官网的预编译包），请按以下步骤操作。  

SugarCube 使用 Node.js（当前版本 ≥v16）作为构建系统的核心，因此需先安装它。此外，您还需安装 Git 以从本仓库获取源码。  

1. [下载并安装 Node.js JavaScript 运行时 (`https://nodejs.org/`)](https://nodejs.org/)  
2. [下载并安装 Git 版本控制工具 (`https://git-scm.com/`)](https://git-scm.com/)  

安装完成后，打开终端并进入您希望存放代码的目录，运行以下命令克隆仓库：  

```
git clone https://github.com/tmedwards/sugarcube-2.git
```

接着进入克隆的仓库目录：  

```
cd sugarcube-2
```

仓库包含两个主要分支：  

* `develop`：主开发分支  
* `master`：稳定发布分支  

通过 `git checkout` 命令切换至目标分支。  

切换分支后，安装 SugarCube 的开发依赖：  

```
npm install
```

此时已下载所有依赖项，可通过以下命令构建：  

```
node build.js
```

若构建无误，生成的 Twine 1 和 Twine 2 版本故事格式将输出至 `build` 目录。恭喜！  

**注意**：SugarCube 的开发依赖会不定期更新。若构建报错，可尝试运行 `npm update --save -D` 更新依赖；极端情况下，可先执行 `npm uninstall` 再运行 `npm install`。  

**提示**：如需定制构建选项（如调试模式、限制 Twine 版本等），可通过 `-h` 或 `--help` 参数查看帮助：  

```
node build.js -h
```
