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

#### 事件对象属性：*None*

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

### `:dialogclosing` event<!-- legacy --><span id="dialog-api-event-dialogclosing"></span><!-- /legacy --> {#events-dialog-event-dialogclosing}

Global event triggered as the first step in closing the dialog when [`Dialog.close()`](#dialog-api-method-close) is called.

#### History:

* `v2.29.0`: Introduced.

#### Event object properties: *none*

<p role="note"><b>Note:</b>
While there are no custom properties, the event is fired from the dialog's body, thus the <code>target</code> property will refer to its body element—i.e., <code>#ui-dialog-body</code>.
</p>

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).on(':dialogclosing', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function exactly once. */
$(document).one(':dialogclosing', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:dialogopened` event<!-- legacy --><span id="dialog-api-event-dialogopened"></span><!-- /legacy --> {#events-dialog-event-dialogopened}

Global event triggered as the last step in opening the dialog when [`Dialog.open()`](#dialog-api-method-open) is called.

#### History:

* `v2.29.0`: Introduced.

#### Event object properties: *none*

<p role="note"><b>Note:</b>
While there are no custom properties, the event is fired from the dialog's body, thus the <code>target</code> property will refer to its body element—i.e., <code>#ui-dialog-body</code>.
</p>

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).on(':dialogopened', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function exactly once. */
$(document).one(':dialogopened', (ev) => {
	/* JavaScript code */
});
```

<!-- *********************************************************************** -->

### `:dialogopening` event<!-- legacy --><span id="dialog-api-event-dialogopening"></span><!-- /legacy --> {#events-dialog-event-dialogopening}

Global event triggered as the first step in opening the dialog when [`Dialog.open()`](#dialog-api-method-open) is called.

#### History:

* `v2.29.0`: Introduced.

#### Event object properties: *none*

<p role="note"><b>Note:</b>
While there are no custom properties, the event is fired from the dialog's body, thus the <code>target</code> property will refer to its body element—i.e., <code>#ui-dialog-body</code>.
</p>

#### Examples:

```javascript
/* Execute the handler function when the event triggers. */
$(document).on(':dialogopening', (ev) => {
	/* JavaScript code */
});

/* Execute the handler function exactly once. */
$(document).one(':dialogopening', (ev) => {
	/* JavaScript code */
});
```


<!-- ***************************************************************************
	Navigation Events
**************************************************************************** -->
## Navigation Events<!-- legacy --><span id="navigation-events-tasks"></span><span id="navigation-overview"></span><span id="navigation-events"></span><span id="navigation-tasks"></span><!-- /legacy --> {#events-navigation}

Navigation events allow the execution of JavaScript code at specific points during passage navigation.

In order of processing: *(for reference, this also shows the `:uiupdate` event and various special passages)*

1. Passage init.  Happens before the modification of the state history.
	1. `:passageinit` event.
2. Passage start. Happens before the rendering of the incoming passage.
	1. [`PassageReady` special passage](#special-passage-passageready).
	2. `:passagestart` event.
	3. [`PassageHeader` special passage](#special-passage-passageheader).
3. Passage render.  Happens after the rendering of the incoming passage.
	1. [`PassageFooter` special passage](#special-passage-passagefooter).
	2. `:passagerender` event.
4. Passage display.  Happens after the display—i.e., output—of the incoming passage.
	1. [`PassageDone` special passage](#special-passage-passagedone).
	2. `:passagedisplay` event.
5. UI update.  Happens before the end of passage navigation.
	1. `:uiupdate` event.
		1. [`StoryDisplayTitle` special passage](#special-passage-storydisplaytitle).
		2. [`StoryBanner` special passage](#special-passage-storybanner).
		3. [`StorySubtitle` special passage](#special-passage-storysubtitle).
		4. [`StoryAuthor` special passage](#special-passage-storyauthor).
		5. [`StoryCaption` special passage](#special-passage-storycaption).
		6. [`StoryMenu` special passage](#special-passage-storymenu).
6. Passage end.  Happens at the end of passage navigation.
	1. `:passageend` event.

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
