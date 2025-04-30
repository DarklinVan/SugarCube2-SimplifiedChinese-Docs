<!-- ***********************************************************************************************
	事件系统
************************************************************************************************ -->
# 事件系统 {#events}

事件(Events)是用于通知代码某些行为发生的消息机制（例如：触发、广播），涵盖从玩家交互到自动化流程的各种场景。每个事件对象都包含特定属性，可用于获取事件相关的附加信息。

本章节列出了 SugarCube 在故事运行过程中触发的各类专属事件。

<p role="note" class="see"><b>参考阅读：</b>
关于标准浏览器/DOM事件，请查阅 MDN 的<a href="https://developer.mozilla.org/en-US/docs/Web/Events"><i>事件参考手册</i></a>。
</p>


<!-- ***************************************************************************
	对话框事件
**************************************************************************** -->
## 对话框事件 {#events-dialog}

对话框事件允许在对话框打开和关闭的特定时刻执行 JavaScript 代码。

<p role="note" class="see"><b>参见：</b>
<a href="#dialog-api"><code>Dialog</code> API</a>。
</p>

<!-- *********************************************************************** -->

### `:dialogclosed` 事件<!-- legacy --><span id="dialog-api-event-dialogclosed"></span><!-- /legacy --> {#events-dialog-event-dialogclosed}

全局事件，在调用 [`Dialog.close()`](#dialog-api-method-close) 方法时，作为关闭对话框的最后一步触发。

<p role="note" class="warning"><b>警告：</b>
当使用 <code>:dialogclosed</code> 事件时，你无法从已关闭的对话框中获取数据（例如标题或类名），因为事件触发时对话框已经关闭并重置。如需获取此类信息，请改用 <a href="#events-dialog-event-dialogclosing"><code>:dialogclosing</code> 事件</a>。
</p>

#### 版本历史：

* `v2.29.0`：首次引入。

#### 事件对象属性：*无*

<p role="note"><b>注意：</b>
虽然没有自定义属性，但事件是从对话框的 body 元素触发的，因此 <code>target</code> 属性会指向其 body 元素 (即 <code>#ui-dialog-body</code>)。
</p>

#### 使用示例：

```javascript
/* 当事件触发时执行处理函数 */
$(document).on(':dialogclosed', (ev) => {
    /* JavaScript 代码 */
});

/* 仅执行一次处理函数 */
$(document).one(':dialogclosed', (ev) => {
    /* JavaScript 代码 */
});
```

<!-- *********************************************************************** -->

### `:dialogclosing` 事件<!-- legacy --><span id="dialog-api-event-dialogclosing"></span><!-- /legacy --> {#events-dialog-event-dialogclosing}

全局事件，在调用 [`Dialog.close()`](#dialog-api-method-close) 方法时，作为关闭对话框的第一步触发。

#### 版本历史：

* `v2.29.0`：首次引入。

#### 事件对象属性：*无*

<p role="note"><b>注意：</b>
虽然没有自定义属性，但事件是从对话框的 body 元素触发的，因此 <code>target</code> 属性会指向其 body 元素 (即 <code>#ui-dialog-body</code>)。
</p>

#### 使用示例：

```javascript
/* 当对话框开始关闭时执行处理函数（持续监听） */
$(document).on(':dialogclosing', (ev) => {
    /* JavaScript 代码 */
});

/* 当对话框开始关闭时执行处理函数（仅执行一次） */
$(document).one(':dialogclosing', (ev) => {
    /* JavaScript 代码 */
});
```

<!-- *********************************************************************** -->

### `:dialogopened` 事件<!-- legacy --><span id="dialog-api-event-dialogopened"></span><!-- /legacy --> {#events-dialog-event-dialogopened}

全局事件，在调用 [`Dialog.open()`](#dialog-api-method-open) 方法时，作为打开对话框的最后一步触发。

#### 版本历史：

* `v2.29.0`：首次引入。

#### 事件对象属性：*无*

<p role="note"><b>注意：</b>
虽然没有自定义属性，但事件是从对话框的 body 元素触发的，因此 <code>target</code> 属性会指向其 body 元素 (即 <code>#ui-dialog-body</code>)。
</p>

#### 使用示例：

```javascript
/* 当事件触发时执行处理函数 */
$(document).on(':dialogopened', (ev) => {
    /* JavaScript 代码 */
});

/* 仅执行一次处理函数 */
$(document).one(':dialogopened', (ev) => {
    /* JavaScript 代码 */
});
```

<!-- *********************************************************************** -->

### `:dialogopening` 事件<!-- legacy --><span id="dialog-api-event-dialogopening"></span><!-- /legacy --> {#events-dialog-event-dialogopening}

全局事件，在调用 [`Dialog.open()`](#dialog-api-method-open) 方法时，作为打开对话框的第一步触发。

#### 版本历史：

* `v2.29.0`：首次引入。

#### 事件对象属性：*无*

<p role="note"><b>注意：</b>
虽然没有自定义属性，但事件是从对话框的 body 元素触发的，因此 <code>target</code> 属性会指向其 body 元素 (即 <code>#ui-dialog-body</code>)。
</p>

#### 使用示例：

```javascript
/* 当事件触发时执行处理函数 */
$(document).on(':dialogopening', (ev) => {
	/* JavaScript 代码 */
});

/* 仅执行一次处理函数 */
$(document).one(':dialogopening', (ev) => {
	/* JavaScript 代码 */
});
```


<!-- ***************************************************************************
	Navigation Events
**************************************************************************** -->
## 导航事件<!-- legacy --><span id="navigation-events-tasks"></span><span id="navigation-overview"></span><span id="navigation-events"></span><span id="navigation-tasks"></span><!-- /legacy --> {#events-navigation}

导航事件允许在段落跳转的不同阶段执行 JavaScript 代码。

完整处理顺序如下（包含 `:uiupdate` 事件和各类特殊段落）：

1. **段落初始化**  
   发生在状态历史修改之前。
   - 1.1 触发 `:passageinit` 事件

2. **段落启动**  
   发生在新段落渲染之前。
   - 2.1 执行 [`PassageReady` 特殊段落](#special-passage-passageready)
   - 2.2 触发 `:passagestart` 事件
   - 2.3 执行 [`PassageHeader` 特殊段落](#special-passage-passageheader)

3. **段落渲染**  
   发生在新段落渲染完成后。
   - 3.1 执行 [`PassageFooter` 特殊段落](#special-passage-passagefooter)
   - 3.2 触发 `:passagerender` 事件

4. **段落显示**  
   发生在新段落内容输出到页面后。
   - 4.1 执行 [`PassageDone` 特殊段落](#special-passage-passagedone)
   - 4.2 触发 `:passagedisplay` 事件

5. **界面更新**  
   发生在导航结束前。
   - 5.1 触发 `:uiupdate` 事件
     - 5.1.1 执行 [`StoryDisplayTitle` 特殊段落](#special-passage-storydisplaytitle)
     - 5.1.2 执行 [`StoryBanner` 特殊段落](#special-passage-storybanner)
     - 5.1.3 执行 [`StorySubtitle` 特殊段落](#special-passage-storysubtitle)
     - 5.1.4 执行 [`StoryAuthor` 特殊段落](#special-passage-storyauthor)
     - 5.1.5 执行 [`StoryCaption` 特殊段落](#special-passage-storycaption)
     - 5.1.6 执行 [`StoryMenu` 特殊段落](#special-passage-storymenu)

6. **段落结束**  
   发生在导航流程完全结束时。
   - 6.1 触发 `:passageend` 事件

<!-- *********************************************************************** -->

### `:passageinit` event<!-- legacy --><span id="navigation-event-passageinit"></span><!-- /legacy --> {#events-navigation-event-passageinit}

Triggered before the modification of the state history.

#### History:

* `v2.20.0`: Introduced.
* `v2.37.0`: Moved custom properties into the event's `detail` object.

#### Event `detail` object properties:

`:passageinit` events have a `detail` property whose value is an object with the following properties:

* **`passage`:** (`Passage`) The incoming passage object.  See the [`Passage` API](#passage-api) for more information.

#### Examples:

```javascript
/* Execute the handler function each time the event triggers. */
$(document).on(':passageinit', (ev) => {
	/* Log details about the current moment. */
	console.group('Details about the current moment');
	console.log('passage name:', ev.detail.passage.name);
	console.log('passage tags:', ev.detail.passage.tags);
	console.groupEnd();

	/* Do something useful here. */
});

/* Execute the handler function exactly once. */
$(document).one(':passageinit', (ev) => {
	/* Do something useful here. */
});
```

<!-- *********************************************************************** -->

### `:passagestart` event<!-- legacy --><span id="navigation-event-passagestart"></span><!-- /legacy --> {#events-navigation-event-passagestart}

Triggered before the rendering of the incoming passage.

#### History:

* `v2.20.0`: Introduced.
* `v2.37.0`: Moved custom properties into the event's `detail` object.

#### Event `detail` object properties:

`:passagestart` events have a `detail` property whose value is an object with the following properties:

* **`content`:** (`HTMLElement`) The, currently, empty element that will eventually hold the rendered content of the incoming passage.
* **`passage`:** (`Passage`) The incoming passage object.  See the [`Passage` API](#passage-api) for more information.

#### Examples:

##### Basic usage

```javascript
/* Execute the handler function each time the event triggers. */
$(document).on(':passagestart', (ev) => {
	/* Log details about the current moment. */
	console.group('Details about the current moment');
	console.log('buffer:', ev.detail.content);
	console.log('passage name:', ev.detail.passage.name);
	console.log('passage tags:', ev.detail.passage.tags);
	console.groupEnd();

	/* Do something useful here. */
});

/* Execute the handler function exactly once. */
$(document).one(':passagestart', (ev) => {
	/* Do something useful here. */
});
```

##### Modifying the content buffer

```javascript
/*
	Process the given markup and append the result to the incoming
	passage's element.
*/
$(document).on(':passagestart', (ev) => {
	$(ev.detail.content).wiki("In the //beginning//.");
});
```

<!-- *********************************************************************** -->

### `:passagerender` event<!-- legacy --><span id="navigation-event-passagerender"></span><!-- /legacy --> {#events-navigation-event-passagerender}

Triggered after the rendering of the incoming passage.

#### History:

* `v2.20.0`: Introduced.
* `v2.37.0`: Moved custom properties into the event's `detail` object.

#### Event `detail` object properties:

`:passagerender` events have a `detail` property whose value is an object with the following properties:

* **`content`:** (`HTMLElement`) The element holding the fully rendered content of the incoming passage.
* **`passage`:** (`Passage`) The incoming passage object.  See the [`Passage` API](#passage-api) for more information.

#### Examples:

##### Basic usage

```javascript
/* Execute the handler function each time the event triggers. */
$(document).on(':passagerender', (ev) => {
	/* Log details about the current moment. */
	console.group('Details about the current moment');
	console.log('buffer:', ev.detail.content);
	console.log('passage name:', ev.detail.passage.name);
	console.log('passage tags:', ev.detail.passage.tags);
	console.groupEnd();

	/* Do something useful here. */
});

/* Execute the handler function exactly once. */
$(document).one(':passagerender', (ev) => {
	/* Do something useful here. */
});
```

##### Modifying the content buffer

```javascript
/*
	Process the given markup and append the result to the incoming
	passage's element.
*/
$(document).on(':passagerender', (ev) => {
	$(ev.detail.content).wiki("At the //end// of some renderings.");
});
```

<!-- *********************************************************************** -->

### `:passagedisplay` event<!-- legacy --><span id="navigation-event-passagedisplay"></span><!-- /legacy --> {#events-navigation-event-passagedisplay}

Triggered after the display—i.e., output—of the incoming passage.

#### History:

* `v2.20.0`: Introduced.
* `v2.31.0`: Added `content` property to event object.
* `v2.37.0`: Moved custom properties into the event's `detail` object.

#### Event `detail` object properties:

`:passagedisplay` events have a `detail` property whose value is an object with the following properties:

* **`content`:** (`HTMLElement`) The element holding the fully rendered content of the incoming passage.
* **`passage`:** (`Passage`) The incoming passage object.  See the [`Passage` API](#passage-api) for more information.

#### Examples:

##### Basic usage

```javascript
/* Execute the handler function each time the event triggers. */
$(document).on(':passagedisplay', (ev) => {
	/* Log details about the current moment. */
	console.group('Details about the current moment');
	console.log('buffer:', ev.detail.content);
	console.log('passage name:', ev.detail.passage.name);
	console.log('passage tags:', ev.detail.passage.tags);
	console.groupEnd();

	/* Do something useful here. */
});

/* Execute the handler function exactly once. */
$(document).one(':passagedisplay', (ev) => {
	/* Do something useful here. */
});
```

##### Modifying the content buffer

```javascript
/*
	Process the given markup and append the result to the incoming
	passage's element.
*/
$(document).on(':passagedisplay', (ev) => {
	$(ev.detail.content).wiki("It's //showtime//!");
});
```

<!-- *********************************************************************** -->

### `:passageend` event<!-- legacy --><span id="navigation-event-passageend"></span><!-- /legacy --> {#events-navigation-event-passageend}

Triggered at the end of passage navigation.

#### History:

* `v2.20.0`: Introduced.
* `v2.31.0`: Added `content` property to event object.
* `v2.37.0`: Moved custom properties into the event's `detail` object.

#### Event `detail` object properties:

`:passageend` events have a `detail` property whose value is an object with the following properties:

* **`content`:** (`HTMLElement`) The element holding the fully rendered content of the incoming passage.
* **`passage`:** (`Passage`) The incoming passage object.  See the [`Passage` API](#passage-api) for more information.

#### Examples:

##### Basic usage

```javascript
/* Execute the handler function each time the event triggers. */
$(document).on(':passageend', (ev) => {
	/* Log details about the current moment. */
	console.group('Details about the current moment');
	console.log('buffer:', ev.detail.content);
	console.log('passage name:', ev.detail.passage.name);
	console.log('passage tags:', ev.detail.passage.tags);
	console.groupEnd();

	/* Do something useful here. */
});

/* Execute the handler function exactly once. */
$(document).one(':passageend', (ev) => {
	/* Do something useful here. */
});
```

##### Modifying the content buffer

```javascript
/*
	Process the given markup and append the result to the incoming
	passage's element.
*/
$(document).on(':passageend', (ev) => {
	$(ev.detail.content).wiki("So long and //thanks for all the fish//!");
});
```

<!-- *********************************************************************** -->

### <span class="deprecated">`prehistory` tasks</span><!-- legacy --><span id="navigation-task-prehistory"></span><!-- /legacy --> {#events-navigation-task-prehistory}

<p role="note" class="warning"><b>Deprecated:</b>
<code>prehistory</code> tasks have been deprecated and should no longer be used.  See the <a href="#events-navigation-event-passageinit"><code>:passageinit</code> event</a> for its replacement.
</p>

#### History:

* `v2.0.0`: Introduced.
* `v2.31.0`: Deprecated.

<!-- *********************************************************************** -->

### <span class="deprecated">`predisplay` tasks</span><!-- legacy --><span id="navigation-task-predisplay"></span><!-- /legacy --> {#events-navigation-task-predisplay}

<p role="note" class="warning"><b>Deprecated:</b>
<code>predisplay</code> tasks have been deprecated and should no longer be used.  See the <a href="#events-navigation-event-passagestart"><code>:passagestart</code> event</a> for its replacement.
</p>

#### History:

* `v2.0.0`: Introduced.
* `v2.31.0`: Deprecated.

<!-- *********************************************************************** -->

### <span class="deprecated">`prerender` tasks</span><!-- legacy --><span id="navigation-task-prerender"></span><!-- /legacy --> {#events-navigation-task-prerender}

<p role="note" class="warning"><b>Deprecated:</b>
<code>prerender</code> tasks have been deprecated and should no longer be used.  See the <a href="#events-navigation-event-passagestart"><code>:passagestart</code> event</a> for its replacement.
</p>

#### History:

* `v2.0.0`: Introduced.
* `v2.31.0`: Deprecated.

<!-- *********************************************************************** -->

### <span class="deprecated">`postrender` tasks</span><!-- legacy --><span id="navigation-task-postrender"></span><!-- /legacy --> {#events-navigation-task-postrender}

<p role="note" class="warning"><b>Deprecated:</b>
<code>postrender</code> tasks have been deprecated and should no longer be used.  See the <a href="#events-navigation-event-passagerender"><code>:passagerender</code> event</a> for its replacement.
</p>

#### History:

* `v2.0.0`: Introduced.
* `v2.31.0`: Deprecated.

<!-- *********************************************************************** -->

### <span class="deprecated">`postdisplay` tasks</span><!-- legacy --><span id="navigation-task-postdisplay"></span><!-- /legacy --> {#events-navigation-task-postdisplay}

<p role="note" class="warning"><b>Deprecated:</b>
<code>postdisplay</code> tasks have been deprecated and should no longer be used.  See the <a href="#events-navigation-event-passagedisplay"><code>:passagedisplay</code> event</a> for its replacement.
</p>

#### History:

* `v2.0.0`: Introduced.
* `v2.31.0`: Deprecated.


<!-- ***************************************************************************
	`SimpleAudio` Events
**************************************************************************** -->
## `SimpleAudio` Events {#events-simpleaudio}

`SimpleAudio` events allow the execution of JavaScript code at specific points during audio playback.

<div role="note" class="see"><b>See:</b>
To add or remove event listeners to audio tracks managed by the <a href="#simpleaudio-api"><code>SimpleAudio</code> API</a> see:
<ul>
<li><a href="#audiotrack-api"><code>AudioTrack</code> API</a> methods: <a href="#audiotrack-api-prototype-method-off"><code>&lt;AudioTrack&gt;.off()</code></a>, <a href="#audiotrack-api-prototype-method-on"><code>&lt;AudioTrack&gt;.on()</code></a>, <a href="#audiotrack-api-prototype-method-one"><code>&lt;AudioTrack&gt;.one()</code></a>.</li>
<li><a href="#audiorunner-api"><code>AudioRunner</code> API</a> methods: <a href="#audiorunner-api-prototype-method-off"><code>&lt;AudioRunner&gt;.off()</code></a>, <a href="#audiorunner-api-prototype-method-on"><code>&lt;AudioRunner&gt;.on()</code></a>, <a href="#audiorunner-api-prototype-method-one"><code>&lt;AudioRunner&gt;.one()</code></a>.</li>
</ul>
</div>

<!-- *********************************************************************** -->

### `:faded` event<!-- legacy --><span id="audiotrack-api-event-faded"></span><!-- /legacy --> {#events-simpleaudio-event-faded}

Track event triggered when a fade completes normally.

#### History:

* `v2.29.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers for one track via <AudioTrack>. */
aTrack.on(':faded', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function when the event triggers for multiple tracks via <AudioRunner>. */
someTracks.on(':faded', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:fading` event<!-- legacy --><span id="audiotrack-api-event-fading"></span><!-- /legacy --> {#events-simpleaudio-event-fading}

Track event triggered when a fade starts.

#### History:

* `v2.29.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers for one track via <AudioTrack>. */
aTrack.on(':fading', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function when the event triggers for multiple tracks via <AudioRunner>. */
someTracks.on(':fading', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:stopped` event<!-- legacy --><span id="audiotrack-api-event-stopped"></span><!-- /legacy --> {#events-simpleaudio-event-stopped}

Track event triggered when playback is stopped after [`<AudioTrack>.stop()`](#audiotrack-api-prototype-method-stop) or [`<AudioRunner>.stop()`](#audiorunner-api-prototype-method-stop) is called—either manually or as part of another process.

<p role="note" class="see"><b>See Also:</b>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event"><code>ended</code></a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event"><code>pause</code></a> for information on somewhat similar native events.
</p>

#### History:

* `v2.29.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers for one track via <AudioTrack>. */
aTrack.on(':stopped', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function when the event triggers for multiple tracks via <AudioRunner>. */
someTracks.on(':stopped', (ev) => {
	/* JavaScript code */
});
```


<!-- ***************************************************************************
	System Events
**************************************************************************** -->
## System Events {#events-system}

System events allow the execution of JavaScript code at specific points during story startup and teardown.

<!-- *********************************************************************** -->

### `:enginerestart` event<!-- legacy --><span id="engine-api-event-enginerestart"></span><!-- /legacy --> {#events-system-event-enginerestart}

Global event triggered once just before the page is reloaded when [`Engine.restart()`](#engine-api-method-restart) is called.

#### History:

* `v2.23.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).one(':enginerestart', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:storyready` event {#events-system-event-storyready}

Global event triggered once just before the dismissal of the loading screen at startup.

#### History:

* `v2.31.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function exactly once, since it's only fired once. */
$(document).one(':storyready', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:uiupdate` event {#events-system-event-uiupdate}

Global event triggered when the built-in user interface is being updated when [`UI.update()`](#ui-api-method-update) is called.

#### History:

* `v2.37.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function each time the event triggers. */
$(document).on(':uiupdate', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function exactly once. */
$(document).one(':uiupdate', (ev) => {
	/* JavaScript code */
});
```


<!-- ***************************************************************************
	`<<type>>` Events
**************************************************************************** -->
## `<<type>>` Events {#events-type-macro}

`<<type>>` macro events allow the execution of JavaScript code at specific points during typing.

<!-- *********************************************************************** -->

### `:typingcomplete` event {#events-type-macro-event-typingcomplete}

Global event triggered when all `<<type>>` macros within a passage have completed.

<p role="note"><b>Note:</b>
Injecting additional <code>&lt;&lt;type&gt;&gt;</code> macro invocations <em>after</em> a <code>:typingcomplete</code> event has been fired will cause another event to eventually be generated, since you're creating a new sequence of typing.
</p>

#### History:

* `v2.32.0`: Introduced.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).on(':typingcomplete', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:typingstart` event {#events-type-macro-event-typingstart}

Local event triggered on the typing wrapper when the typing of a section starts.

#### History:

* `v2.32.0`: Introduced
* `v2.33.0`: Changed to a local event that bubbles up the DOM tree.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).on(':typingstart', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:typingstop` event {#events-type-macro-event-typingstop}

Local event triggered on the typing wrapper when the typing of a section stops.

#### History:

* `v2.32.0`: Introduced
* `v2.33.0`: Changed to a local event that bubbles up the DOM tree.

#### Event object properties: *none*

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).on(':typingstop', (ev) => {
	/* JavaScript code */
});
```
