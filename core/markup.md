<!-- ***********************************************************************************************
	Markup
************************************************************************************************ -->
# 标记语法 {#markup}

<p role="note"><b>注意：</b>
除非特别说明，所有标记语法自 <code>v2.0.0</code> 版本起可用。
</p>

<!-- ***************************************************************************
	Naked Variable
**************************************************************************** -->
## 裸变量 {#markup-naked-variable}

除了使用打印宏（[`<<print>>`](#macros-macro-print)、[`<<=>>`](#macros-macro-equal)、[`<<->>`](#macros-macro-hyphen)）来输出变量值，SugarCube 的裸变量标记允许直接在段落文本中插入变量——即段落文本中的变量会被自动替换为其值的字符串表示。

裸变量标记支持以下形式：

<table>
<thead>
	<tr>
		<th>类型</th>
		<th>语法</th>
		<th>示例</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>简单变量</td>
		<td><pre><code>$variable</code></pre></td>
		<td><pre><code>$name</code></pre></td>
	</tr>
	<tr>
		<td>属性访问<br>（点号表示法）</td>
		<td><pre><code>$variable.property</code></pre></td>
		<td><pre><code>$thing.name</code></pre></td>
	</tr>
	<tr>
		<td>索引/属性访问<br>（方括号表示法）</td>
		<td>
			<pre><code>$variable[数字索引]</code></pre>
			<pre><code>$variable["属性名"]</code></pre>
			<pre><code>$variable['属性名']</code></pre>
			<pre><code>$variable[$索引或属性变量]</code></pre>
		</td>
		<td>
			<pre><code>$thing[0]</code></pre>
			<pre><code>$thing["name"]</code></pre>
			<pre><code>$thing['name']</code></pre>
			<pre><code>$thing[$member]</code></pre>
		</td>
	</tr>
</tbody>
</table>

如需进行更复杂的操作（例如使用计算表达式：<code>$variable[_i + 1]</code>，或方法调用：<code>$variable.someMethod()</code>），仍需使用打印宏。

示例：

```
/* 使用 <<print>> 宏显式打印 $name 的值 */
你好啊，<<print $name>>。

/* 使用裸变量标记隐式打印 $name 的值 */
你好啊，$name。

/* 假设 $name 的值为 "Mr. Freeman"，两种方式都会输出： */
你好啊，Mr. Freeman。
```

由于段落文本中的变量会自动转换为它们的值，如果您需要按原样输出变量（不进行插值，例如用于教程、调试输出等用途），则需要通过某种方式对其进行转义。例如：

```
/* 使用 nowiki 标记："""..."""（三重双引号） */
变量 """$name""" 的值为：$name

/* 使用 nowiki 标记：<nowiki>...</nowiki> */
变量 <nowiki>$name</nowiki> 的值为：$name

/* 使用双美元符号标记（转义$符号）：$$ */
变量 $$name 的值为：$name

/* 假设 $name 的值为 "Mr. Freeman"，所有示例将输出： */
变量 $name 的值为：Mr. Freeman
```

此外，您可以使用内联代码标记来转义变量，但这样做会将转义的变量包裹在 `<code>` 元素中，因此可能最适合示例和教程使用。例如：

```
/* 使用内联代码标记：{{{...}}}（三重花括号） */
变量 {{{$name}}} 的值为：$name

/* 假设 $name 的值为 "Mr. Freeman"，将输出： */
变量 <code>$name</code> 的值为：Mr. Freeman
```


<!-- ***************************************************************************
	Link
**************************************************************************** -->
## 链接 {#markup-link}

SugarCube 的链接标记由必需的 `Link` 组件和可选的 `Text`、`Setter` 组件组成。

`Link` 组件可以是纯文本或任何有效的 TwineScript 表达式（会在链接初始化时解析），其值应为段落名称或有效 URL（本地或远程）。

`Text` 组件（可选）可以是纯文本或任何有效的 TwineScript 表达式（会在链接初始化时解析）。

`Setter` 组件（仅适用于段落链接，可选）必须是有效的 [TwineScript 表达式](#twinescript-expressions)，格式与 [`<<set>>` 宏](#macros-macro-set)相同（会在点击链接时解析）。如需多个表达式，请用分号分隔（`;`）——例如：`$a to 5; $b to true`。

除标准管道符 (`|`) 分隔外，SugarCube 还支持箭头分隔符 (`->` & `<-`)。箭头方向决定组件顺序，箭头始终指向 `Link` 组件——右箭头为 `Text->Link`，左箭头为 `Link<-Text`。

<p role="note" class="warning"><b>警告 (Twine&nbsp;2):</b>
由于 Twine&nbsp;2 的自动段落创建机制，使用表达式作为 <code>Link</code> 组件会生成以表达式命名的冗余段落。建议在 Twine&nbsp;2 中使用 <a href="#macros-macro-link"><code>&lt;&lt;link&gt;&gt;</code> 宏</a>的独立参数形式来避免此问题。
</p>

<table>
<caption>以下示例假设：<code>$go</code> 为 <code>&quot;Grocery&quot;</code>，<code>$show</code> 为 <code>&quot;Go buy milk&quot;</code></caption>
<thead>
	<tr>
		<th>语法</th>
		<th>示例</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><pre><code>[[Link]]</code></pre></td>
		<td class="multiline">
			<pre><code>[[Grocery]]</code></pre>
			<pre><code>[[$go]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[[Text|Link]]</code></pre></td>
		<td class="multiline">
			<pre><code>[[Go buy milk|Grocery]]</code></pre>
			<pre><code>[[$show|$go]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[[Link][Setter]]</code></pre></td>
		<td class="multiline">
			<pre><code>[[Grocery][$bought to "milk"]]</code></pre>
			<pre><code>[[$go][$bought to "milk"]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[[Text|Link][Setter]]</code></pre></td>
		<td class="multiline">
			<pre><code>[[Go buy milk|Grocery][$bought to "milk"]]</code></pre>
			<pre><code>[[$show|$go][$bought to "milk"]]</code></pre>
		</td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Image
**************************************************************************** -->
## 图片 {#markup-image}

SugarCube 的图片标记由必需的 `Image` 组件和可选的 `Text`、`Link`、`Setter` 组件组成。

`Image` 组件可以是纯文本或任何有效的 TwineScript 表达式（会在图片初始化时解析），其值应为图片资源的有效 URL（本地或远程）或[媒体（图片）段落](#guide-media-passages)名称。

`Text` 组件（可选）可以是纯文本或任何有效的 TwineScript 表达式（会在图片初始化时解析），其值将作为图片的替代文本（alt 文本）。

`Link` 组件（可选）可以是纯文本或任何有效的 TwineScript 表达式（会在图片初始化时解析），其值应为段落名称或有效 URL（本地或远程）。

`Setter` 组件（仅适用于段落链接，可选）必须是有效的 [TwineScript 表达式](#twinescript-expressions)，格式与 [`<<set>>` 宏](#macros-macro-set)相同（会在点击链接时解析）。如需多个表达式，请用分号分隔（`;`）——例如：`$a to 5; $b to true`。

除标准管道符 (`|`) 分隔外，SugarCube 还支持箭头分隔符 (`->` & `<-`)。箭头方向决定组件顺序，箭头始终指向 `Image` 组件——右箭头为 `Text->Image`，左箭头为 `Image<-Text`。

<p role="note" class="warning"><b>警告 (Twine&nbsp;2):</b>
由于 Twine&nbsp;2 的自动段落创建机制，使用表达式作为 <code>Link</code> 组件会生成以表达式命名的冗余段落。建议在 Twine&nbsp;2 中使用 <a href="#macros-macro-link"><code>&lt;&lt;link&gt;&gt;</code> 宏</a>的独立参数形式来避免此问题。
</p>

<table>
<caption>以下示例假设：<code>$src</code> 为 <code>home.png</code>，<code>$go</code> 为 <code>"Home"</code>，<code>$show</code> 为 <code>"Go home"</code></caption>
<thead>
	<tr>
		<th>语法</th>
		<th>示例</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><pre><code>[img[Image]]</code></pre></td>
		<td class="multiline">
			<pre><code>[img[home.png]]</code></pre>
			<pre><code>[img[$src]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[img[Text|Image]]</code></pre></td>
		<td class="multiline">
			<pre><code>[img[Go home|home.png]]</code></pre>
			<pre><code>[img[$show|$src]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[img[Image][Link]]</code></pre></td>
		<td class="multiline">
			<pre><code>[img[home.png][Home]]</code></pre>
			<pre><code>[img[$src][$go]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[img[Text|Image][Link]]</code></pre></td>
		<td class="multiline">
			<pre><code>[img[Go home|home.png][Home]]</code></pre>
			<pre><code>[img[$show|$src][$go]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[img[Image][Link][Setter]]</code></pre></td>
		<td class="multiline">
			<pre><code>[img[home.png][Home][$done to true]]</code></pre>
			<pre><code>[img[$src][$go][$done to true]]</code></pre>
		</td>
	</tr>
	<tr>
		<td><pre><code>[img[Text|Image][Link][Setter]]</code></pre></td>
		<td class="multiline">
			<pre><code>[img[Go home|home.png][Home][$done to true]]</code></pre>
			<pre><code>[img[$show|$src][$go][$done to true]]</code></pre>
		</td>
	</tr>
</tbody>
</table>

#### 在样式表中

样式表中可使用图片标记的受限子集，仅允许使用 `Image` 组件——主要是便于使用[媒体（图片）段落](#guide-media-passages)。例如：

```
/* 使用外部图片 "forest.png" 作为 <body> 背景 */
body {
	background-image: [img[forest.png]];
}

/* 使用媒体段落 "lagoon" 作为 <body> 背景 */
body {
	background-image: [img[lagoon]];
}
```


<!-- ***************************************************************************
	HTML &amp; SVG Attribute
**************************************************************************** -->
## HTML &amp; SVG 属性<!-- legacy --><span id="markup-html-attribute"></span><!-- /legacy --> {#markup-html-svg-attribute}

<p role="note" class="warning"><b>注意：</b>
以下功能在<a href="#markup-verbatim-html">原始 HTML 标记</a>中均不可用。
</p>

<!-- *********************************************************************** -->

### 特殊属性<!-- legacy --><span id="markup-html-attribute-special"></span><!-- /legacy --> {#markup-html-svg-attribute-special}

SugarCube 提供了一些特殊的 HTML 和 SVG 属性，您可以将它们添加到标签中以启用特殊行为。这些属性用于段落链接、媒体段落和设置器。

<table>
<thead>
	<tr>
		<th>类型</th>
		<th>属性</th>
		<th>示例</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>段落链接</td>
		<td><pre><code>data-passage</code></pre></td>
		<td>
			<pre><code>&lt;a data-passage=&quot;PassageName&quot;&gt;执行操作&lt;/a&gt;</code></pre>
			<pre><code>&lt;area shape="rect" coords="25,25,75,75" data-passage=&quot;PassageName&quot;&gt;</code></pre>
			<pre><code>&lt;button data-passage=&quot;PassageName&quot;&gt;执行操作&lt;/button&gt;</code></pre>
		</td>
	</tr>
	<tr>
		<td>音频段落</td>
		<td><pre><code>data-passage</code></pre></td>
		<td><pre><code>&lt;audio data-passage=&quot;AudioPassageName&quot;&gt;</code></pre></td>
	</tr>
	<tr>
		<td>图片段落</td>
		<td><pre><code>data-passage</code></pre></td>
		<td>
			<pre><code>&lt;img data-passage=&quot;ImagePassageName&quot;&gt;</code></pre>
			<pre><code>&lt;image data-passage=&quot;ImagePassageName&quot; /&gt;</code></pre>
		</td>
	</tr>
	<tr>
		<td>资源段落</td>
		<td><pre><code>data-passage</code></pre></td>
		<td><pre><code>&lt;source data-passage=&quot;AudioOrVideoPassageName&quot;&gt;</code></pre></td>
	</tr>
	<tr>
		<td>视频段落</td>
		<td><pre><code>data-passage</code></pre></td>
		<td><pre><code>&lt;video data-passage=&quot;VideoPassageName&quot;&gt;</code></pre></td>
	</tr>
	<tr>
		<td>设置器</td>
		<td><pre><code>data-setter</code></pre></td>
		<td>
			<pre><code>&lt;a data-passage=&quot;PassageName&quot; data-setter=&quot;$thing to 'done'&quot;&gt;执行操作&lt;/a&gt;</code></pre>
			<pre><code>&lt;area shape="rect" coords="25,25,75,75" data-passage=&quot;PassageName&quot;
	data-setter=&quot;$thing to 'done'&quot;&gt;</code></pre>
			<pre><code>&lt;button data-passage=&quot;PassageName&quot; data-setter=&quot;$thing to 'done'&quot;&gt;执行操作&lt;/button&gt;</code></pre>
		</td>
	</tr>
</tbody>
</table>

#### 版本历史：
* `v2.0.0`：引入该功能
* `v2.24.0`：新增对 `<audio>`, `<source>`, `<video>` 标签的 `data-passage` 属性支持

<!-- *********************************************************************** -->

### 属性指令<!-- legacy --><span id="markup-html-attribute-directive"></span><!-- /legacy --> {#markup-html-svg-attribute-directive}

HTML和SVG 属性可通过添加指令前缀（特殊文本）来触发特殊处理。

<dl>
<dt>求值指令：<code>sc-eval:</code>, <code>@</code></dt>
<dd>
	<p>此指令会将属性值作为 TwineScript 表达式进行求值。处理后，指令前缀将从属性名中移除，求值结果将作为属性实际值。</p>
	<p role="note" class="warning"><b>警告：</b>
	<a href="#markup-html-svg-attribute-special"><code>data-setter</code> 属性</a>禁止使用求值指令（因其功能是在元素激活时求值内容），尝试使用将导致错误。
	</p>
	<table>
	<caption>以下示例假设：<code>_id</code> 为 <code>&quot;foo&quot;</code></caption>
	<thead>
		<tr>
			<th>语法</th>
			<th>示例</th>
			<th>渲染结果</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><pre><code>sc-eval:<i>属性名</i></code></pre></td>
			<td><pre><code>&lt;span sc-eval:id=&quot;_id&quot;&gt;…&lt;/span&gt;</code></pre></td>
			<td><pre><code>&lt;span id=&quot;foo&quot;&gt;…&lt;/span&gt;</code></pre></td>
		</tr>
		<tr>
			<td><pre><code>sc-eval:<i>属性名</i></code></pre></td>
			<td><pre><code>&lt;span sc-eval:id=&quot;'pre-' + _id + '-suf'&quot;&gt;…&lt;/span&gt;</code></pre></td>
			<td><pre><code>&lt;span id=&quot;pre-foo-suf&quot;&gt;…&lt;/span&gt;</code></pre></td>
		</tr>
		<tr>
			<td><pre><code>@<i>属性名</i></code></pre></td>
			<td><pre><code>&lt;span @id=&quot;_id&quot;&gt;…&lt;/span&gt;</code></pre></td>
			<td><pre><code>&lt;span id=&quot;foo&quot;&gt;…&lt;/span&gt;</code></pre></td>
		</tr>
		<tr>
			<td><pre><code>@<i>属性名</i></code></pre></td>
			<td><pre><code>&lt;span @id=&quot;'pre-' + _id + '-suf'&quot;&gt;…&lt;/span&gt;</code></pre></td>
			<td><pre><code>&lt;span id=&quot;pre-foo-suf&quot;&gt;…&lt;/span&gt;</code></pre></td>
		</tr>
	</tbody>
	</table>
</dd>
</dl>

#### 版本历史：
* `v2.21.0`: 引入该功能
* `v2.23.5`: 修复了单个 HTML 标签使用多个指令时部分未处理的问题

<!-- ***************************************************************************
	Line Continuation
**************************************************************************** -->
## 行继续标记 {#markup-line-continuation}

<p role="note" class="see"><b>相关参考：</b>
各类无间断功能——<a href="#macros-macro-nobr"><code>&lt;&lt;nobr&gt;&gt;</code> 宏</a>、<a href="#special-tag-nobr"><code>nobr</code> 特殊标签</a>和<a href="#config-api-property-passages-nobr"><code>Config.passages.nobr</code> 设置</a>——均提供类似但略有差异的功能。
</p>

<p role="note" class="warning"><b>注意：</b>
行继续标记（或任何依赖行定位的标记）与无间断功能不兼容，因其工作原理存在冲突。
</p>

行首或行尾的反斜杠（`\`）即行继续标记。处理时会移除反斜杠、关联的换行符及两者间的所有空格——从而实现多行内容的无缝拼接。此功能主要用于需要换行排版提升可读性，但又不想在显示时产生额外空格的场景，当需要输出内容时可用此替代无法使用的[`<<silently>>` 宏](#macros-macro-silently)。

例如以下写法（注：`·`表示将被移除的空格，`¬`表示换行符）：

```
西班牙的降水 \¬
主要集中在平原.

西班牙的降水 \····¬
主要集中在平原.

西班牙的降水¬
\ 主要集中在平原.

西班牙的降水¬
····\ 主要集中在平原.
```

在最终输出中将会输出此行:

```
西班牙的降水主要集中在平原.
```


<!-- ***************************************************************************
	Heading
**************************************************************************** -->
## Heading {#markup-heading}

An exclamation point (`!`) that begins a line defines the heading markup.  It consists of one to six exclamation points, each additional one beyond the first signifying a lesser heading.

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Level 1</td>
		<td><pre><code>!Level 1 Heading</code></pre></td>
		<td><pre><code>&lt;h1&gt;Level 1 Heading&lt;/h1&gt;</code></pre></td>
		<td class="displays"><h1>Level 1 Heading</h1></td>
	</tr>
	<tr>
		<td>Level 2</td>
		<td><pre><code>!!Level 2 Heading</code></pre></td>
		<td><pre><code>&lt;h2&gt;Level 2 Heading&lt;/h2&gt;</code></pre></td>
		<td class="displays"><h2>Level 2 Heading</h2></td>
	</tr>
	<tr>
		<td>Level 3</td>
		<td><pre><code>!!!Level 3 Heading</code></pre></td>
		<td><pre><code>&lt;h3&gt;Level 3 Heading&lt;/h3&gt;</code></pre></td>
		<td class="displays"><h3>Level 3 Heading</h3></td>
	</tr>
	<tr>
		<td>Level 4</td>
		<td><pre><code>!!!!Level 4 Heading</code></pre></td>
		<td><pre><code>&lt;h4&gt;Level 4 Heading&lt;/h4&gt;</code></pre></td>
		<td class="displays"><h4>Level 4 Heading</h4></td>
	</tr>
	<tr>
		<td>Level 5</td>
		<td><pre><code>!!!!!Level 5 Heading</code></pre></td>
		<td><pre><code>&lt;h5&gt;Level 5 Heading&lt;/h5&gt;</code></pre></td>
		<td class="displays"><h5>Level 5 Heading</h5></td>
	</tr>
	<tr>
		<td>Level 6</td>
		<td><pre><code>!!!!!!Level 6 Heading</code></pre></td>
		<td><pre><code>&lt;h6&gt;Level 6 Heading&lt;/h6&gt;</code></pre></td>
		<td class="displays"><h6>Level 6 Heading</h6></td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Style
**************************************************************************** -->
## Style {#markup-style}

<p role="note" class="warning"><b>Warning:</b>
Because the style markups use the same tokens to begin and end each markup, the same style cannot be nested within itself.
</p>

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Emphasis</td>
		<td><pre><code>//Emphasis//</code></pre></td>
		<td><pre><code>&lt;em&gt;Emphasis&lt;/em&gt;</code></pre></td>
		<td class="displays"><em>Emphasis</em></td>
	</tr>
	<tr>
		<td>Strong</td>
		<td><pre><code>''Strong''</code></pre></td>
		<td><pre><code>&lt;strong&gt;Strong&lt;/strong&gt;</code></pre></td>
		<td class="displays"><strong>Strong</strong></td>
	</tr>
	<tr>
		<td>Underline</td>
		<td><pre><code>__Underline__</code></pre></td>
		<td><pre><code>&lt;u&gt;Underline&lt;/u&gt;</code></pre></td>
		<td class="displays"><u>Underline</u></td>
	</tr>
	<tr>
		<td>Strikethrough</td>
		<td><pre><code>==Strikethrough==</code></pre></td>
		<td><pre><code>&lt;s&gt;Strikethrough&lt;/s&gt;</code></pre></td>
		<td class="displays"><s>Strikethrough</s></td>
	</tr>
	<tr>
		<td>Superscript</td>
		<td><pre><code>Super^^script^^</code></pre></td>
		<td><pre><code>Super&lt;sup&gt;script&lt;/sup&gt;</code></pre></td>
		<td class="displays">Super<sup>script</sup></td>
	</tr>
	<tr>
		<td>Subscript</td>
		<td><pre><code>Sub~~script~~</code></pre></td>
		<td><pre><code>Sub&lt;sub&gt;script&lt;/sub&gt;</code></pre></td>
		<td class="displays">Sub<sub>script</sub></td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	List
**************************************************************************** -->
## List {#markup-list}

An asterisk (`*`) or number sign (`#`) that begins a line defines a member of the unordered or ordered list markup, respectively.

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Unordered</td>
		<td><pre><code>* A&nbsp;list&nbsp;item<br>* Another&nbsp;list&nbsp;item</code></pre></td>
		<td><pre><code>&lt;ul&gt;<br>&lt;li&gt;A&nbsp;list&nbsp;item&lt;/li&gt;<br>&lt;li&gt;Another&nbsp;list&nbsp;item&lt;/li&gt;<br>&lt;/ul&gt;</code></pre></td>
		<td class="displays"><ul><li>A&nbsp;list&nbsp;item</li><li>Another&nbsp;list&nbsp;item</li></ul></td>
	</tr>
	<tr>
		<td>Ordered</td>
		<td><pre><code># A&nbsp;list&nbsp;item<br># Another&nbsp;list&nbsp;item</code></pre></td>
		<td><pre><code>&lt;ol&gt;<br>&lt;li&gt;A&nbsp;list&nbsp;item&lt;/li&gt;<br>&lt;li&gt;Another&nbsp;list&nbsp;item&lt;/li&gt;<br>&lt;/ol&gt;</code></pre></td>
		<td class="displays"><ol><li>A&nbsp;list&nbsp;item</li><li>Another&nbsp;list&nbsp;item</li></ol></td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Blockquote
**************************************************************************** -->
## Blockquote {#markup-blockquote}

A right angle bracket (`>`) that begins a line defines the blockquote markup.  It consists of one or more right angle brackets, each additional one beyond the first signifying a level of nested blockquote.

<table>
<thead>
	<tr>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><pre><code>&gt;Line&nbsp;1<br>&gt;Line&nbsp;2<br>&gt;&gt;Nested&nbsp;1<br>&gt;&gt;Nested&nbsp;2</code></pre></td>
		<td><pre><code>&lt;blockquote&gt;Line&nbsp;1&lt;br&gt;<br>Line&nbsp;2&lt;br&gt;<br>&lt;blockquote&gt;Nested&nbsp;1&lt;br&gt;<br>Nested&nbsp;2&lt;br&gt;<br>&lt;/blockquote&gt;&lt;/blockquote&gt;</code></pre></td>
		<td class="displays"><blockquote>Line&nbsp;1<br>Line&nbsp;2<br><blockquote>Nested&nbsp;1<br>Nested&nbsp;2<br></blockquote></blockquote></td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Code
**************************************************************************** -->
## Code {#markup-code}

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Inline</td>
		<td><pre><code>{{{Code}}}</code></pre></td>
		<td><pre><code>&lt;code&gt;Code&lt;/code&gt;</code></pre></td>
		<td class="displays"><pre><code>Code</code></pre></td>
	</tr>
	<tr>
		<td>Block</td>
		<td><pre><code>{{{<br>Code<br>More&nbsp;code<br>}}}</code></pre></td>
		<td><pre><code>&lt;pre&gt;&lt;code&gt;Code<br>More&nbsp;code<br>&lt;/code&gt;&lt;/pre&gt;</code></pre></td>
		<td class="displays"><pre><code>Code<br>More&nbsp;code<br></code></pre></td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Horizontal Rule
**************************************************************************** -->
## Horizontal Rule {#markup-horizontal-rule}

A set of four, or more, hyphen-minus (`-`) characters that begin a line, and are the only things on the line, define the horizontal rule markup.

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Horizontal rule</td>
		<td><pre><code>----</code></pre></td>
		<td><pre><code>&lt;hr&gt;</code></pre></td>
		<td class="displays"><hr></td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Verbatim Text
**************************************************************************** -->
## Verbatim Text<!-- legacy --><span id="markup-verbatim"></span><!-- /legacy --> {#markup-verbatim-text}

The verbatim text markup disables processing of *all* markup contained within—both SugarCube and HTML—passing its contents directly into the output as plain text.

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Rendered As</th>
		<th>Displays As (<em>roughly</em>)</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Triple&nbsp;double&nbsp;quotes</td>
		<td><pre><code>"""No //format//"""</code></pre></td>
		<td><pre><code>No //format//</code></pre></td>
		<td>No //format//</td>
	</tr>
	<tr>
		<td>&lt;nowiki&gt; tag</td>
		<td><pre><code>&lt;nowiki&gt;No //format//&lt;/nowiki&gt;</code></pre></td>
		<td><pre><code>No //format//</code></pre></td>
		<td>No //format//</td>
	</tr>
</tbody>
</table>


<!-- ***************************************************************************
	Verbatim HTML
**************************************************************************** -->
## Verbatim HTML {#markup-verbatim-html}

A set of opening and closing &lt;html&gt; tags—i.e., `<html></html>`—defines the verbatim HTML markup.  The verbatim HTML markup disables processing of *all* markup contained within—both SugarCube and HTML—passing its contents directly into the output as HTML markup for the browser.  Thus, you should only use plain HTML markup within the verbatim markup—meaning using none of SugarCube's special HTML [attributes](#markup-html-attribute-special) or [directives](#markup-html-attribute-directive).

<p role="note"><b>Note:</b>
You should virtually never need to use the verbatim HTML markup.
</p>


<!-- ***************************************************************************
	Custom Style
**************************************************************************** -->
## Custom Style {#markup-custom-style}

<p role="note" class="warning"><b>Warning:</b>
Because the custom style markup uses the same tokens to begin and end the markup, it cannot be nested within itself.
</p>

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax</th>
		<th>Example</th>
		<th>Rendered As</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td rowspan="2">Inline</td>
		<td rowspan="2"><pre><code>@@<i>style-list</i><a href="#markup-custom-style-fn1">1</a>;Text@@</code></pre></td>
		<td><pre><code>@@#alfa;.bravo;Text@@</code></pre></td>
		<td><pre><code>&lt;span id="alfa" class="bravo"&gt;Text&lt;/span&gt;</code></pre></td>
	</tr>
	<tr>
		<td><pre><code>@@color:red;Text@@</code></pre></td>
		<td><pre><code>&lt;span style="color:red"&gt;Text&lt;/span&gt;</code></pre></td>
	</tr>
	<tr>
		<td rowspan="2">Block</td>
		<td rowspan="2"><pre><code>@@<i>style-list</i><a href="#markup-custom-style-fn1">1</a>;<br>Text<br>@@</code></pre></td>
		<td><pre><code>@@#alfa;.bravo;<br>Text<br>@@</code></pre></td>
		<td><pre><code>&lt;div id="alfa" class="bravo"&gt;Text&lt;/div&gt;</code></pre></td>
	</tr>
	<tr>
		<td><pre><code>@@color:red;<br>Text<br>@@</code></pre></td>
		<td><pre><code>&lt;div style="color:red"&gt;Text&lt;/div&gt;</code></pre></td>
	</tr>
</tbody>
</table>

<ol class="note">
<li id="markup-custom-style-fn1">
	The style-list should be a semi-colon (<code>;</code>) separated list consisting of one or more of the following:
	<ul>
	<li>A single unique hash-prefixed ID—e.g., <code>#alfa</code>.</li>
	<li>Dot-prefixed class names—e.g., <code>.bravo</code>.</li>
	<li>Style properties—e.g., <code>color:red</code>.</li>
	</ul>
	As of <code>v2.31.0</code>, the ID and class names components may be conjoined without need of extra semi-colons—e.g., <code>#alfa;.bravo;.charlie;</code> may also be written as <code>#alfa.bravo.charlie;</code>.
</li>
</ol>


<!-- ***************************************************************************
	Template
**************************************************************************** -->
## Template {#markup-template}

A text replacement markup.  The template markup begins with a question mark (`?`) followed by the template name—e.g., `?yolo`—and are set up as functions-that-return-strings, strings, or arrays of either—from which a random member is selected whenever the template is processed.  They are defined via the [`Template` API](#template-api).

For example, consider the following markup:

```
?He was always willing to lend ?his ear to anyone.
```

Assuming that `?He` resolves to `She` and `?his` to `her`, then that will produce the following output:

```
She was always willing to lend her ear to anyone.
```

#### History:

* `v2.29.0`: Introduced.


<!-- ***************************************************************************
	Comment
**************************************************************************** -->
## Comment {#markup-comment}

<p role="note"><b>Note:</b>
Comments used within passage markup are not rendered into the page output.
</p>

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Syntax &amp; Example</th>
		<th>Supported Within…</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>C-style, Block</td>
		<td><pre><code>/* This is a comment. */</code></pre></td>
		<td>Passage markup, JavaScript, Stylesheets</td>
	</tr>
	<tr>
		<td>TiddlyWiki, Block</td>
		<td><pre><code>/% This is a comment. %/</code></pre></td>
		<td>Passage markup</td>
	</tr>
	<tr>
		<td>HTML, Block</td>
		<td><pre><code>&lt;!-- This is a comment. --&gt;</code></pre></td>
		<td>Passage markup</td>
	</tr>
</tbody>
</table>
