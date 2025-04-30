<!-- ***********************************************************************************************
	Dialog API
************************************************************************************************ -->
# `Dialog` API {#dialog-api}

<!-- *********************************************************************** -->

### `Dialog.append(content)` → `Dialog` {#dialog-api-method-append}

Appends the given content to the dialog's content area.  Returns a reference to the `Dialog` object for chaining.

<p role="note" class="warning"><b>Warning:</b>
If your content contains any SugarCube markup, you'll need to use the <a href="#dialog-api-method-wiki"><code>Dialog.wiki()</code> method</a> instead.
</p>

#### History:

* `v2.9.0`: Introduced.

#### Parameters:

* **`content`:** (`Node` | `string`) The content to append.  As this method is essentially a shortcut for `jQuery(Dialog.body()).append(…)`, see [jQuery's `append()`](https://api.jquery.com/append/) method for the range of valid content types.

#### Returns:

The `Dialog` object for chaining.

#### Examples:

```javascript
Dialog.append("Cry 'Havoc!', and let slip the <em>dogs</em> of <strong>war</strong>.");
```

```javascript
Dialog.append( /* DOM nodes */ );
```

<!-- *********************************************************************** -->

### `Dialog.body()` → `HTMLElement` {#dialog-api-method-body}

Returns a reference to the dialog's content area.

<p role="note"><b>Note:</b>
In practice, this method should usually be unnecessary as the <a href="#dialog-api-method-append"><code>Dialog.append()</code> method</a> exists.
</p>

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

The dialog's body element (`HTMLElement`).

#### Examples:

```javascript
jQuery(Dialog.body())
	.append("Cry 'Havoc!', and let slip the <em>dogs</em> of <strong>war</strong>.");
```

```javascript
jQuery(Dialog.body())
	.wiki("Cry 'Havoc!', and let slip the //dogs// of ''war''.");
```

<!-- *********************************************************************** -->

### `Dialog.close()` → `Dialog` {#dialog-api-method-close}

Closes the dialog.  Returns a reference to the `Dialog` object for chaining.

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

The `Dialog` object for chaining.

#### Examples:

```javascript
Dialog.close();
```

<!-- *********************************************************************** -->

### `Dialog.create([title [, classNames]])` → `Dialog` {#dialog-api-method-create}

Prepares the dialog for use.  Returns a reference to the `Dialog` object for chaining.

#### History:

* `v2.37.0`: Introduced.

#### Parameters:

* **`title`:** (optional, `string`) The title of the dialog.
* **`classNames`:** (optional, `string`) The space-separated-list of classes to add to the dialog.

#### Returns:

The `Dialog` object for chaining.

#### Examples:

##### Basic usage

```javascript
Dialog.create();
```

##### With the optional `title` parameter

```javascript
Dialog.create('Character Sheet');
```

##### With the optional `classNames` parameter

```javascript
Dialog.create(null, 'charsheet');
```

##### With both optional parameters

```javascript
Dialog.create('Character Sheet', 'charsheet');
```

##### Making use of chaining

```javascript
Dialog
	.create('Character Sheet', 'charsheet')
	.wikiPassage('Player Character')
	.open();
```

<!-- *********************************************************************** -->

### `Dialog.empty()` → `Dialog` {#dialog-api-method-empty}

Empties the dialog's content area.  Returns a reference to the `Dialog` object for chaining.

#### History:

* `v2.37.0`: Introduced.

#### Parameters: *none*

#### Returns:

The `Dialog` object for chaining.

#### Examples:

##### Basic usage

```javascript
Dialog.empty();
```

##### Replacing the open dialog's content

```javascript
Dialog
	.empty()
	.wikiPassage('Quests');
```

<!-- *********************************************************************** -->

### `Dialog.isOpen([classNames])` → `boolean` {#dialog-api-method-isopen}

Returns whether the dialog is currently open.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`classNames`:** (optional, `string`) The space-separated-list of classes to check for when determining the state of the dialog.  Each of the built-in dialogs contains a name-themed class that can be tested for in this manner—e.g., the Saves dialog contains the class `saves`.

#### Returns:

A `boolean` denoting whether the dialog is currently open.

#### Examples:

##### Basic usage

```javascript
if (Dialog.isOpen()) {
	/* code to execute if any dialog is open… */
}
```

```javascript
if (!Dialog.isOpen()) {
	/* code to execute if no dialog is open… */
}
```

##### With the optional `classNames` parameter

```javascript
if (Dialog.isOpen('saves')) {
	/* code to execute if the Saves dialog is open… */
}
```

```javascript
if (!Dialog.isOpen('saves')) {
	/*
		code to execute if either no dialog or the Saves dialog,
		specifically, is not open…
	*/
}
```

<!-- *********************************************************************** -->

### `Dialog.open([options [, closeFn]])` → `Dialog` {#dialog-api-method-open}

Opens the dialog.  Returns a reference to the `Dialog` object for chaining.

<p role="note"><b>Note:</b>
Call this only after populating the dialog with content.
</p>

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`options`:** (optional, `null` | `Object`) The options to be used when opening the dialog.
* **`closeFn`:** (optional, `null` | `Function`) The function to execute whenever the dialog is closed.

#### Options object:

An options object should have some of the following properties:

* **`top`:** Top y-coordinate of the dialog in pixels without the unit (default: `50`).

#### Returns:

The `Dialog` object for chaining.

#### Examples:

##### Basic usage

```javascript
Dialog.open();
```

##### With the optional `options` parameter

```javascript
Dialog.open({ top : 100 });
```

##### With the optional `closeFn` parameter

```javascript
Dialog.open(null, () => {
	/* code to execute on close… */
});
```

##### With both optional parameters

```javascript
Dialog.open({ top : 100 }, () => {
	/* code to execute on close… */
});
```

<!-- *********************************************************************** -->

### `Dialog.wiki(wikiMarkup)` → `Dialog` {#dialog-api-method-wiki}

Renders the given [markup](#markup) and appends it to the dialog's content area.  Returns a reference to the `Dialog` object for chaining.

<p role="note"><b>Note:</b>
If you simply want to render a passage, see the <a href="#dialog-api-method-wikipassage"><code>Dialog.wikiPassage()</code> method</a> instead.
</p>

<p role="note" class="warning"><b>Warning:</b>
If your content consists of DOM nodes, you'll need to use the <a href="#dialog-api-method-append"><code>Dialog.append()</code> method</a> instead.
</p>

#### History:

* `v2.9.0`: Introduced.

#### Parameters:

* **`wikiMarkup`:** (`string`) The markup to render.

#### Returns:

The `Dialog` object for chaining.

#### Examples:

```javascript
Dialog.wiki("Cry 'Havoc!', and let slip the //dogs// of ''war''.");
```

<!-- *********************************************************************** -->

### `Dialog.wikiPassage(passageName)` → `Dialog` {#dialog-api-method-wikipassage}

Renders the passage by the given name and appends it to the dialog's content area.  Returns a reference to the `Dialog` object for chaining.

#### History:

* `v2.37.0`: Introduced.

#### Parameters:

* **`passageName`:** (`string`) The name of the passage to render.

#### Returns:

The `Dialog` object for chaining.

#### Examples:

```javascript
Dialog.wikiPassage('Inventory');
```

<!-- *********************************************************************** -->

### <span class="deprecated">`Dialog.setup([title [, classNames]])` → `HTMLElement`</span> {#dialog-api-method-setup}

<p role="note" class="warning"><b>Deprecated:</b>
This method has been deprecated and should no longer be used.
</p>

#### History:

* `v2.0.0`: Introduced.
* `v2.37.0`: Deprecated in favor of `Dialog.create()`.
