<!-- ***********************************************************************************************
	CSS
************************************************************************************************ -->
# <abbr title="层叠样式表">CSS</abbr> {#css}


<!-- ***************************************************************************
	段落转换规则
**************************************************************************** -->
## 段落转换规则 {#css-passage-conversions}

段落名称和标签会自动转换为短横线小写格式的 ID 和类名。转换过程包含以下步骤：移除所有非字母数字、下划线、连字符、长破折号或空格的字符，将剩余非字母数字字符替换为连字符（每组替换为一个），最后将结果转为全小写。

### 段落名称

段落名称前会添加 `passage-` 前缀，根据使用场景不同转换为 ID 或类名：
- 作为当前活动段落时，转换为 ID（选择器示例：`#passage-gone-fishin`）
- 被包含时（通过 [`<<include>>`](#macros-macro-include) 宏），转换为类名（选择器示例：`.passage-gone-fishin`）

例如，段落名称为 `Gone fishin'` 时：
- 活动段落 ID：`passage-gone-fishin`
- 被包含段落类名：`passage-gone-fishin`

### 段落标签

段落显示时，其标签会：
1. 添加至活动段落的容器元素、`<html>` 和 `<body>` 的 `data-tags` 属性（空格分隔列表）
2. 添加至活动段落容器和 `<body>` 的类名（以下特殊标签除外）：
	<table class="list-table">
	<tbody>
		<tr>
			<th>Twine&nbsp;2:</th>
			<td><code>debug</code>, <code>nobr</code>, <code>passage</code>, <code>widget</code> 及以 <code>twine.</code> 开头的标签</td>
		</tr>
		<tr>
			<th>Twine&nbsp;1/Twee:</th>
			<td><code>debug</code>, <code>nobr</code>, <code>passage</code>, <code>script</code>, <code>stylesheet</code>, <code>widget</code> 及以 <code>twine.</code> 开头的标签</td>
		</tr>
	</tbody>
	</table>

例如，标签 `Sector_42` 将转换为：
- `data-tags` 属性值：`Sector_42`（选择器：`[data-tags~="Sector_42"]`）
- 类名：`sector-42`（选择器：`.sector-42`）


<!-- ***************************************************************************
	常用选择器示例
**************************************************************************** -->
## 常用选择器示例 {#css-example-selectors}

<table>
<thead>
	<tr>
		<th>选择器</th>
		<th>描述</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><code>html</code></td>
		<td>
			<p>文档根元素，默认字体设置在此定义</p>
			<p>活动段落的标签会添加到其 <code>data-tags</code> 属性（详见<a href="#css-passage-conversions">段落转换规则</a>）</p>
		</td>
	</tr>
	<tr>
		<td><code>body</code></td>
		<td>
			<p>页面主体，默认前景色和背景色设置在此</p>
			<p>活动段落的标签会添加到其 <code>data-tags</code> 属性和类名（详见<a href="#css-passage-conversions">段落转换规则</a>）</p>
		</td>
	</tr>
	<tr>
		<td><code>#story</code></td>
		<td>故事主容器元素</td>
	</tr>
	<tr>
		<td><code>#passages</code></td>
		<td>段落容器元素，所有段落元素都包含在此</td>
	</tr>
	<tr>
		<td><code>.passage</code></td>
		<td>
			<p>段落元素。通常每回合只有一个，但在导航时可能短暂存在两个（进入/离开段落）</p>
			<p>活动段落名称会作为其 ID（详见<a href="#css-passage-conversions">段落转换规则</a>）</p>
			<p>活动段落的标签会添加到其 <code>data-tags</code> 属性和类名（详见<a href="#css-passage-conversions">段落转换规则</a>）</p>
		</td>
	</tr>
	<tr>
		<td><code>.passage a</code></td>
		<td>段落内所有链接元素</td>
	</tr>
	<tr>
		<td><code>.passage a:hover</code></td>
		<td>段落内鼠标悬停的链接</td>
	</tr>
	<tr>
		<td><code>.passage a:active</code></td>
		<td>段落内被点击的链接</td>
	</tr>
	<tr>
		<td><code>.passage .link-broken</td>
		<td>指向不存在的段落的链接</td>
	</tr>
	<tr>
		<td><code>.passage .link-disabled</td>
		<td>被禁用的链接（如已选择的 <code>&lt;&lt;choice&gt;&gt;</code> 宏链接）</td>
	</tr>
	<tr>
		<td><code>.passage .link-external</code></td>
		<td>外部链接（指向其他网站的链接）</td>
	</tr>
	<tr>
		<td><code>.passage .link-internal</code></td>
		<td>内部链接（指向段落或宏的链接）</td>
	</tr>
	<tr>
		<td><code>.passage .link-visited<a href="#css-example-selectors-fn1">1</a></code></td>
		<td>已访问过的内部链接（玩家历史中存在的段落）</td>
	</tr>
	<tr>
		<td><code>.passage .link-internal:not(.link-visited)<a href="#css-example-selectors-fn1">1</a></code></td>
		<td>未访问过的内部链接（玩家从未到达的段落）</td>
	</tr>
</tbody>
</table>

<ol class="note">
<li id="css-example-selectors-fn1"><code>.link-visited</code> 类默认未启用，详见 <code>Config</code> API 的 <a href="#config-api-property-addvisitedlinkclass"><code>Config.addVisitedLinkClass</code></a> 属性</li>
</ol>


<!-- ***************************************************************************
	注意事项
**************************************************************************** -->
## 注意事项 {#css-warnings}

### 多样式表问题 *(仅限 Twine&nbsp;1/Twee)*

在 Twine&nbsp;1/Twee 中<strong>强烈建议</strong>只使用一个 <code>stylesheet</code> 标签的段落。由于 CSS 按加载顺序层叠，Twine&nbsp;1/Twee 无法控制多个样式表的加载顺序，容易导致样式错乱。

### 标签样式表兼容性

SugarCube 不支持 Twine&nbsp;1.4+ 原生的标签样式表功能。替代方案是使用属性选择器或类选择器：

例如，为带有 <code>forest</code> 标签的段落定义样式：
```css
/* 在 <html> 使用属性选择器 */
html[data-tags~="forest"] { background-image: url(forest-bg.jpg); }

/* 在 <body> 使用属性选择器 */
body[data-tags~="forest"] .passage { color: darkgreen; }

/* 使用类选择器 */
body.forest a:hover { color: lime; }
```

<!-- ***************************************************************************
	内置样式表
**************************************************************************** -->
## 内置样式表 {#css-built-ins}

以下是 SugarCube 内置样式表（按加载顺序排列，5-13 最常用），链接指向最新版本: [源代码仓库](https://github.com/tmedwards/sugarcube-2).

1. [`normalize.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/vendor/normalize.css) - 标准化浏览器默认样式
2. [`init-screen.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/init-screen.css) - 初始化加载界面
3. [`font-icons.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/font-icons.css) - 图标字体
4. [`font-emoji.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/font-emoji.css) - Emoji 字体支持
5. [`core.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/core.css) - 核心基础样式
6. [`core-display.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/core-display.css) - 显示相关样式
7. [`core-passage.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/core-passage.css) - 段落容器样式
8. [`core-macro.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/core-macro.css) - 段落容器样式
9. [`ui-dialog.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-dialog.css) - 对话框基础样式
10. [`ui-dialog-saves.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-dialog-saves.css) - 存档对话框样式
11. [`ui-dialog-settings.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-dialog-settings.css) - 设置对话框样式
12. [`ui-dialog-legacy.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-dialog-legacy.css) - 旧版对话框兼容样式
13. [`ui-bar.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-bar.css) - 界面工具栏样式
14. [`ui-debug-bar.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-debug-bar.css) - 调试工具栏样式（≥v2.23.0）
15. [`ui-debug-views.css`](https://raw.githubusercontent.com/tmedwards/sugarcube-2/master/src/css/ui-debug-views.css) - 调试视图样式（≤v2.22.0）
