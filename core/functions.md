<!-- ***********************************************************************************************
	Functions
************************************************************************************************ -->
# Functions {#functions}

<!-- *********************************************************************** -->

### `clone(original)` → `any` {#functions-function-clone}

Returns a deep copy of the given value.

Only primitives, generic objects, <code>Array</code>, <code>Date</code>, <code>Map</code>, <code>RegExp</code>, and <code>Set</code> are supported by default.  Unsupported object types, either native or custom, will need to implement a <code>.clone()</code> method to be properly supported by the <code>clone()</code> function—when called on such an object, it will defer to the local method; see the <a href="#guide-non-generic-object-types"><em>Non-generic object types (classes)</em> guide</a> for more information.

<p role="note" class="warning"><b>Warning:</b>
Referential relationships between objects are not maintained—i.e., after cloning multiple references to an object will refer to seperate yet equivalent objects, as each reference receives its own clone of the original.
</p>

<p role="note" class="warning"><b>Warning:</b>
Generic objects have only their own enumerable properties copied.  Non-enumerable properties and property descriptors are not duplicated.  In particular, this means that getters/setters are not properly duplicated.  If you need getters/setters, then you'll need to use a non-generic object/class.
</p>

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`original`:** (`any`) The value to clone.

#### Returns:

A deep copy (`any`) of the original value.

#### Throws: *none*

#### Examples:

##### Basic usage (in macros)

```
/* Given the following: */
<<set $foo to { id : 1 }>>

/* Without clone() */
<<set $bar to $foo>>
<<set $bar.id to 5>>
<<= $foo.id>> // Prints 5
<<= $bar.id>> // Prints 5

/* With clone() */
<<set $bar to clone($foo)>>
<<set $bar.id to 5>>
<<= $foo.id>> // Prints 1
<<= $bar.id>> // Prints 5
```

##### Basic usage (in JavaScript)

```javascript
// Given the following:
let foo = { id : 1 };

// Without clone()
let bar = foo;
bar.id = 5;
foo.id; // Yields 5
bar.id; // Yields 5

// With clone()
let bar = clone(foo);
bar.id = 5;
foo.id; // Yields 1
bar.id; // Yields 5
```

<!-- *********************************************************************** -->

### `either(list…)` → `any` {#functions-function-either}

Returns a random value from its given arguments.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`list`:** (`any`) The list of values to operate on.  May be any combination of singular values, actual arrays, or array-like objects.  All values will be concatenated into a single list for selection.  **NOTE:** Does not flatten nested arrays—if this is required, the [`<Array>.flat()`](#methods-array-prototype-method-flat) method may be used to flatten the nested arrays prior to passing them to `either()`.

#### Returns:

A random value (`any`) from its given arguments.

#### Throws: *none*

#### Examples:

##### Basic usage (in macros)

Using singular values.

```
/* Returns a random pie from the whole list */
<<set $pie to either('Blueberry', 'Cherry', 'Pecan')>>
```

Using arrays.

```
/* Returns a random pie from the whole array */
<<set $pies to ['Blueberry', 'Cherry', 'Pecan']>>
<<set $pie to either($pies)>>
```

Using singular values and arrays.

```
/* Returns a random value from the whole list—i.e., 'A', 'B', 'C', 'D' */
<<set $letters to ['A', 'B']>>
<<set $letter to either($letters, 'C', 'D')>>
```

Using multiple arrays.

```
/* Returns a random value from the whole list—i.e., 'A', 'B', '1', '2' */
<<set $letters to ['A', 'B']>>
<<set $numerals to ['1', '2']>>
<<set $alphaNum to either($letters, $numerals)>>
```

##### Basic usage (in JavaScript)

Using singular values.

```javascript
// Returns a random pie from the whole list
let pie = either('Blueberry', 'Cherry', 'Pecan');
```

Using arrays.

```javascript
// Returns a random pie from the whole array
let pies = ['Blueberry', 'Cherry', 'Pecan'];
let pie  = either(pies);
```

Using singular values and arrays.

```javascript
// Returns a random value from the whole list—i.e., 'A', 'B', 'C', 'D'
let letters = ['A', 'B'];
let letter  = either(letters, 'C', 'D');
```

Using multiple arrays.

```javascript
// Returns a random value from the whole list—i.e., 'A', 'B', '1', '2'
let letters  = ['A', 'B'];
let numerals = ['1', '2']
let alphaNum = either(letters, numerals);
```

<!-- *********************************************************************** -->

### `forget(key)` {#functions-function-forget}

Removes the specified key, and its associated value, from the story metadata store.

<p role="note" class="see"><b>See Also:</b>
<a href="#functions-function-memorize"><code>memorize()</code></a>, <a href="#functions-function-recall"><code>recall()</code></a>.
</p>

#### History:

* `v2.29.0`: Introduced.

#### Parameters:

* **`key`:** (`string`) The key to remove.

#### Returns: *none*

#### Throws:

An `Error` or `TypeError` instance.

#### Examples:

##### Basic usage (in macros)

```
/* Clears 'achievements' from the metadata store. */
<<run forget('achievements')>>
```

##### Basic usage (in JavaScript)

```javascript
// Clears 'achievements' from the metadata store.
forget('achievements');
```

<!-- *********************************************************************** -->

### `hasVisited(passageNames…)` → `boolean` {#functions-function-hasvisited}

Returns whether the passage with the given name occurred within the story history.  If multiple passage names are given, returns the logical-AND aggregate of the set—i.e., `true` if all were found, `false` if any were not found.

#### History:

* `v2.7.0`: Introduced.

#### Parameters:

* **`passageNames`:** (`string` | `Array<string>`) The name(s) of the passage(s) to search for.  May be a list or an array of passage names.

#### Returns:

Boolean `true` if all were found, elsewise `false`.

#### Throws:

An `Error` instance.

#### Examples:

##### Basic usage (in macros)

```
<<if hasVisited('Bar')>>
	…has been to the Bar…
<</if>>

<<if not hasVisited('Bar')>>
	…has never been to the Bar…
<</if>>

<<if hasVisited('Bar', 'Café')>>
	…has been to both the Bar and Café…
<</if>>

<<if not hasVisited('Bar', 'Café')>>
	…has never been to either the Bar, Café, or both…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
if (hasVisited('Bar')) {
	// Has been to the Bar.
}

if (!hasVisited('Bar')) {
	// Has never been to the Bar.
}

if (hasVisited('Bar', 'Café')) {
	// Has been to both the Bar and Café.
}

if (!hasVisited('Bar', 'Café')) {
	// Has never been to either the Bar, Café, or both.
}
```

<!-- *********************************************************************** -->

### `lastVisited(passageNames…)` → *integer* `number` {#functions-function-lastvisited}

Returns the number of turns that have passed since the last instance of the passage with the given name occurred within the story history or `-1`, if it does not exist.  If multiple passage names are given, returns the lowest count among them, which can be `-1`.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`passageNames…`:** (`string` | `Array<string>`) The name(s) of the passage(s) to search for.  May be a list or an array of passage names.

#### Returns:

The lowest count (*integer* `number`), elsewise `-1`.

#### Throws:

An `Error` instance.

#### Examples:

##### Basic usage (in macros)

```
<<if lastVisited('Bar') is -1>>
	…has never been to the Bar…
<</if>>

<<if lastVisited('Bar') is 0>>
	…is currently in the Bar…
<</if>>

<<if lastVisited('Bar') is 1>>
	…was in the Bar one turn ago…
<</if>>

<<if lastVisited('Bar', 'Café') is -1>>
	…has never been to the Bar, Café, or both…
<</if>>

<<if lastVisited('Bar', 'Café') is 2>>
	…has been to both the Bar and Café, most recently two turns ago…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
if (lastVisited('Bar') === -1) {
	// Has never been to the Bar.
}

if (lastVisited('Bar') === 0) {
	// Is currently in the Bar.
}

if (lastVisited('Bar') === 1) {
	// Was in the Bar one turn ago.
}

if (lastVisited('Bar', 'Café') === -1) {
	// Has never been to the Bar, Café, or both.
}

if (lastVisited('Bar', 'Café') === 2) {
	// Has been to both the Bar and Café, most recently two turns ago.
}
```

<!-- *********************************************************************** -->

### `importScripts(urls…)` → `Promise` {#functions-function-importscripts}

Load and integrate external JavaScript scripts.

<p role="note"><b>Note:</b>
Loading is done asynchronously at run time, so if the script must be available within a tight time frame, then you should use the <code>Promise</code> returned by the function to ensure that the script is loaded before it is needed.
</p>

<p role="note"><b>Note:</b>
Your project's JavaScript section (Twine&nbsp;2: the Story JavaScript; Twine&nbsp;1/Twee: a <code>script</code>-tagged passage) is normally the best place to call <code>importScripts()</code>.
</p>

#### History:

* `v2.16.0`: Introduced.

#### Parameters:

* **`urls`:** (`string` | `Array<string>`) The URLs of the external scripts to import.  Loose URLs are imported concurrently, arrays of URLs are imported sequentially.

#### Returns:

A `Promise` that simply resolves, or rejects with an error if the script could not be loaded.

#### Throws:

An `Error` or `TypeError` instance.

#### Examples:

##### Basic usage

```javascript
// Import all scripts concurrently
importScripts(
	'https://somesite/a/path/a.js',
	'https://somesite/a/path/b.js',
	'https://somesite/a/path/c.js',
	'https://somesite/a/path/d.js'
);

// Import all scripts sequentially
importScripts([
	'https://somesite/a/path/a.js',
	'https://somesite/a/path/b.js',
	'https://somesite/a/path/c.js',
	'https://somesite/a/path/d.js'
]);

// Import scripts a.js, b.js, and the c.js/d.js group concurrently,
// while importing c.js and d.js sequentially relative to each other
importScripts(
	'https://somesite/a/path/a.js',
	'https://somesite/a/path/b.js',
	[
		'https://somesite/a/path/c.js',
		'https://somesite/a/path/d.js'
	]
);
```

##### Basic usage with the returned `Promise` object

```javascript
// Import a script while using the returned Promise to ensure that
// the script has been fully loaded before executing dependent code
importScripts('https://somesite/a/path/a.js')
	.then(() => {
		// Code that depends on the script goes here
	})
	.catch((err) => {
		// There was an error loading the script, log it to the console
		console.log(err);
	});
```

##### Saving the returned `Promise` object for later use

```javascript
// Import a script while saving the returned Promise so it may be used later
setup.aScriptImport = importScripts('https://somesite/a/path/aScript.js');

// Use the returned Promise later on to ensure that the script has been fully
// loaded before executing dependent code
setup.aScriptImport
	.then(() => {
		// Code that depends on the script goes here
	})
	.catch((err) => {
		// There was an error loading the script, log it to the console
		console.log(err);
	});
```

<!-- *********************************************************************** -->

### `importStyles(urls…)` → `Promise` {#functions-function-importstyles}

Load and integrate external CSS stylesheets.

<p role="note"><b>Note:</b>
Loading is done asynchronously at run time, so if the stylesheet must be available within a tight time frame, then you should use the <code>Promise</code> returned by the function to ensure that the stylesheet is loaded before it is needed.
</p>

<p role="note"><b>Note:</b>
Your project's JavaScript section (Twine&nbsp;2: the Story JavaScript; Twine&nbsp;1/Twee: a <code>script</code>-tagged passage) is normally the best place to call <code>importStyles()</code>.
</p>

#### History:

* `v2.16.0`: Introduced.

#### Parameters:

* **`urls`:** (`string` | `Array<string>`) The URLs of the external stylesheets to import.  Loose URLs are imported concurrently, arrays of URLs are imported sequentially.

#### Returns:

A `Promise` that simply resolves, or rejects with an error if the style could not be loaded.

#### Throws:

An `Error` or `TypeError` instance.

#### Examples:

##### Basic usage

```javascript
// Import all stylesheets concurrently
importStyles(
	'https://somesite/a/path/a.css',
	'https://somesite/a/path/b.css',
	'https://somesite/a/path/c.css',
	'https://somesite/a/path/d.css'
);

// Import all stylesheets sequentially
importStyles([
	'https://somesite/a/path/a.css',
	'https://somesite/a/path/b.css',
	'https://somesite/a/path/c.css',
	'https://somesite/a/path/d.css'
]);

// Import stylesheets a.css, b.css, and the c.css/d.css group concurrently,
// while importing c.css and d.css sequentially relative to each other
importStyles(
	'https://somesite/a/path/a.css',
	'https://somesite/a/path/b.css',
	[
		'https://somesite/a/path/c.css',
		'https://somesite/a/path/d.css'
	]
);
```

##### Basic usage with the returned `Promise` object

```javascript
// Grab a loading screen lock
var lsLockId = LoadScreen.lock();

// Import a stylesheet while using the returned Promise to ensure that the
// stylesheet has been fully loaded before unlocking the loading screen
importStyles('https://somesite/a/path/a.css')
	.then(() => {
		// The stylesheet has been loaded, release the loading screen lock
		LoadScreen.unlock(lsLockId);
	})
	.catch((err) => {
		// There was an error loading the stylesheet, log it to the console
		console.log(err);
	});
```

<!-- *********************************************************************** -->

### `memorize(key, value)` {#functions-function-memorize}

Sets the specified key and value within the story metadata store, which causes them to persist over story and browser restarts.  To update the value associated with a key, simply set it again.

<p role="note"><b>Note:</b>
The story metadata, like saves, is tied to the specific story it was generated with.  It is not a mechanism for moving data between stories.
</p>

<p role="note" class="warning"><b>Warning:</b>
The story metadata store <strong><em>is not</em></strong>, and should not be used as, a replacement for saves.  Examples of good uses: achievement tracking, new game+ data, playthrough statistics, etc.
</p>

<p role="note" class="warning"><b>Warning:</b>
This feature is largely incompatible with private browsing modes, which cause all in-browser storage mechanisms to either persist only for the lifetime of the browsing session or fail outright.
</p>

<p role="note" class="see"><b>See Also:</b>
<a href="#functions-function-forget"><code>forget()</code></a>, <a href="#functions-function-recall"><code>recall()</code></a>.
</p>

#### History:

* `v2.29.0`: Introduced.

#### Parameters:

* **`key`:** (`string`) The key that should be set.
* **`value`:** (`any`) The value to set.

#### Returns: *none*

#### Throws:

An `TypeError` instance.

#### Examples:

##### Basic usage (in macros)

```
/* Sets 'achievements', with the given value, in the metadata store. */
<<run memorize('achievements', { ateYellowSnow : true })>>

/* Sets 'ngplus', with the given value, in the metadata store. */
<<run memorize('ngplus', true)>>
```

##### Basic usage (in JavaScript)

```javascript
// Sets 'achievements', with the given value, in the metadata store.
memorize('achievements', { ateYellowSnow : true });

// Sets 'ngplus', with the given value, in the metadata store.
memorize('ngplus', true);
```

<!-- *********************************************************************** -->

### `passage()` → `string` {#functions-function-passage}

Returns the name of the active (present) passage.

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

The name (`string`) of the passage.

#### Throws: *none*

#### Examples:

##### Basic usage as part of a link

```
/* Link markup.*/
[[Reload passage|passage()]]

/* Link macro.*/
<<link "Reload passage" `passage()`>><</link>>
```

##### Basic usage (in macros)

```
/* Get the name of the active passage. */
<<set $passageName to passage()>>
```

```
<<if passage() is 'Café'>>
	…the active passage is the Café passage…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
// Get the name of the active passage.
let passageName = passage();
```

```javascript
if (passage() === 'Café') {
	// The active passage is the Café passage.
}
```

<!-- *********************************************************************** -->

### `previous()` → `string` {#functions-function-previous}

Returns the name of the most recent previous passage whose name does not match that of the active passage or an empty string, if there is no such passage.

<p role="note" class="warning"><b>Warning:</b>
If you need to go back multiple passages—e.g., if you have a menu and you want the player to return from any depth—then <code>previous()</code> may be insufficient for your needs.  In that case, you'll want to look at the <a href="#guide-tips-arbitrarily-long-return">arbitrarily long return</a>.
</p>

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

The name (`string`) of the passage, elsewise an empty string (`''`).

#### Throws: *none*

#### Examples:

##### Basic usage as part of a link

```
/* Link markup.*/
[[Return|previous()]]

/* Link macro.*/
<<link "Return" `previous()`>><</link>>
```

##### Basic usage (in macros)

```
/* Get the name of the most recent non-active passage. */
<<set $previousName to previous()>>
```

```
<<if previous() is 'Café'>>
	…the most recent non-active passage is the Café passage…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
// Get the name of the most recent non-active passage.
let previousName = previous();
```

```javascript
if (previous() === 'Café') {
	// The most recent non-active passage is the Café passage.
}
```

<!-- *********************************************************************** -->

### `random([min ,] max)` → *integer* `number` {#functions-function-random}

Returns a pseudo-random whole number (integer) within the range of the given bounds (inclusive)—i.e., [min,&nbsp;max].

<p role="note"><b>Note:</b>
By default, it returns non-deterministic results from <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><code>Math.random()</code></a>, however, when the seedable PRNG has been enabled, via <a href="#state-api-method-prng-init"><code>State.prng.init()</code></a>, it returns deterministic results from the seeded PRNG instead.
</p>

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`min`:** (optional, *integer* `number`) The lower bound of the random number (inclusive).  If omitted, defaults to `0`.
* **`max`:** (*integer* `number`) The upper bound of the random number (inclusive).

#### Returns:

A random whole number (*integer* `number`).

#### Throws:

An `Error` or `TypeError` instance.

#### Examples:

##### Basic usage (in macros)

```
/* Returns a number in the range 0–5 */
<<set $randInt to random(5)>>

/* Returns a number in the range 1–6 */
<<set _randInt to random(1, 6)>>
```

##### Basic usage (in JavaScript)

```javascript
// Returns a number in the range 0–5
let randInt = random(5);

// Returns a number in the range 1–6
let randInt = random(1, 6);
```

<!-- *********************************************************************** -->

### `randomFloat([min ,] max)` → *decimal* `number` {#functions-function-randomfloat}

Returns a pseudo-random decimal number (floating-point) within the range of the given bounds (inclusive for the minimum, exclusive for the maximum)—i.e., [min,&nbsp;max).

<p role="note"><b>Note:</b>
By default, it returns non-deterministic results from <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><code>Math.random()</code></a>, however, when the seedable PRNG has been enabled, via <a href="#state-api-method-prng-init"><code>State.prng.init()</code></a>, it returns deterministic results from the seeded PRNG instead.
</p>

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`min`:** (optional, *decimal* `number`) The lower bound of the random number (inclusive).  If omitted, defaults to `0.0`.
* **`max`:** (*decimal* `number`) The upper bound of the random number (exclusive).

#### Returns:

A random floating-point number (*decimal* `number`).

#### Throws:

An `Error` or `TypeError` instance.

#### Examples:

##### Basic usage (in macros)

```
/* Returns a number in the range 0.0–4.9999999… */
<<set $randNum to randomFloat(5.0)>>

/* Returns a number in the range 1.0–5.9999999… */
<<set _randNum to randomFloat(1.0, 6.0)>>
```

##### Basic usage (in JavaScript)

```javascript
// Returns a number in the range 0.0–4.9999999…
let randNum = randomFloat(5.0);

// Returns a number in the range 1.0–5.9999999…
let randNum = randomFloat(1.0, 6.0);
```

<!-- *********************************************************************** -->

### `recall(key [, defaultValue])` → `any` {#functions-function-recall}

Returns the value associated with the specified key from the story metadata store or, if no such key exists, the specified default value, if any.

<p role="note" class="see"><b>See Also:</b>
<a href="#functions-function-forget"><code>forget()</code></a>, <a href="#functions-function-memorize"><code>memorize()</code></a>.
</p>

#### History:

* `v2.29.0`: Introduced.

#### Parameters:

* **`key`:** (`string`) The key whose value should be returned.
* **`defaultValue`:** (optional, `any`) The value to return if the key doesn't exist.

#### Returns:

A value (`any`) from the specified key, elsewise the default value if specified.

#### Throws:

A `TypeError` instance.

#### Examples:

##### Basic usage (in macros)

```
/*
	Set setup.achievements to the 'achievements' metadata, defaulting
	to an empty generic object if no metadata exists.
*/
<<set setup.achievements to recall('achievements', {})>>

/* Set setup.ngplus to the 'ngplus' metadata, with no default. */
<<set setup.ngplus to recall('ngplus')>>
```

##### Basic usage (in JavaScript)

```javascript
// Set setup.achievements to the 'achievements' metadata, defaulting
// to an empty generic object if no metadata exists.
setup.achievements = recall('achievements', {});

// Set setup.ngplus to the 'ngplus' metadata, with no default.
setup.ngplus = recall('ngplus');
```

<!-- *********************************************************************** -->

### `setPageElement(idOrElement , passageNames [, defaultText])` → `HTMLElement` | `null` {#functions-function-setpageelement}

Renders the selected passage into the target element, replacing any existing content, and returns the element.  If no passages are found and default text is specified, it will be used instead.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`idOrElement`:** (`string` | `HTMLElement`) The ID of the element or the element itself.
* **`passageNames`:** (`string` | `Array<string>`) The name(s) of the passage(s) to search for.  May be a single passage name or an array of passage names.  If an array of passage names is specified, the first passage to be found is used.
* **`defaultText`:** (optional, `string`) The default text to use if no passages are found.

#### Returns:

An `HTMLElement` instance, elsewise `null`.

#### Throws: *none*

#### Examples:

<p role="note"><b>Note:</b>
As it is highly unlikely that either an array of passage names or default text will be needed in the vast majority of cases, only a few basic examples will be given.
</p>

##### Basic usage (in macros)

```
/* Using an ID; given an existing element on the page: <div id="my-display"></div> */
<<run setPageElement('my-display', 'MyPassage')>>

/* Using an element; given a reference to an existing element: myElement */
<<run setPageElement(myElement, 'MyPassage')>>
```

##### Basic usage (in JavaScript)

```javascript
// Using an ID; given an existing element on the page: <div id="my-display"></div>
setPageElement('my-display', 'MyPassage');

// Using an element; given a reference to an existing element: myElement
setPageElement(myElement, 'MyPassage');
```

<!-- *********************************************************************** -->

### `tags([passageNames])` → `Array<string>` {#functions-function-tags}

Returns a new array consisting of all of the tags of the given passage names.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`passageNames`:** (optional, `string` | `Array<string>`) The passage names from which to collect tags.  May be a list or an array of passage names.  If omitted, will default to the active (present) passage—included passages do not count for this purpose; e.g., passages pulled in via `<<include>>`, `PassageHeader`, etc.

#### Returns:

An `Array<string>` containing the tags.

#### Throws: *none*

#### Examples:

##### Basic usage (in macros)

```
/* Get the tags of the active passage. */
<<set $activeTags to tags()>>

/* Get the tags of the given passage. */
<<set $lonelyGladeTags to tags('Lonely Glade')>>
```

```
<<if tags().includes('forest')>>
	…the active passage is part of the forest…
<</if>>

<<if tags('Lonely Glade').includes('forest')>>
	…the Lonely Glade passage is part of the forest…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
// Get the tags of the active passage.
let activeTags = tags();

// Get the tags of the given passage.
let lonelyGladeTags = tags('Lonely Glade');
```

```javascript
if (tags().includes('forest')) {
	// The active passage is part of the forest.
}

if (tags('Lonely Glade').includes('forest')) {
	// The Lonely Glade passage is part of the forest.
}
```

<!-- *********************************************************************** -->

### `temporary()` → `Object` {#functions-function-temporary}

Returns a reference to the current temporary variables store (equivalent to: [`State.temporary`](#state-api-getter-temporary)).  This is only really useful within pure JavaScript code, as within TwineScript you may simply access temporary variables natively.

#### History:

* `v2.19.0`: Introduced.

#### Parameters: *none*

#### Returns:

A reference to the temporary variable store (`Object`).

#### Throws: *none*

#### Examples:

```javascript
// Given the following: _selection is 'Zagnut Bar'
if (temporary().selection === 'Zagnut Bar') {
	// Do something…
}
```

<!-- *********************************************************************** -->

### `time()` → *integer* `number` {#functions-function-time}

Returns the number of milliseconds that have passed since the current passage was rendered to the page.

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

The milliseconds (*integer* `number`) since the passage was rendered.

#### Throws: *none*

#### Examples:

```
/* Links that vary based on the time. */
In the darkness, something wicked this way comes.  Quickly!  Do you \
<<link "try to run back into the light">>
	<<if time() lt 10000>>
		/* The player clicked the link in under 10s, so they escape. */
		<<goto "Well lit passageway">>
	<<else>>
		/* Elsewise, they're eaten by a grue. */
		<<goto "Eaten by a grue">>
	<</if>>
<</link>> \
or [[stand your ground|Eaten by a grue]]?
```

<!-- *********************************************************************** -->

### `triggerEvent(name [, targets [, options]])` {#functions-function-triggerevent}

Dispatches a synthetic event with the given name, optionally on the given targets and with the given options.

#### History:

* `v2.37.0`: Introduced.

#### Parameters:

<p role="note" class="tip"><b>Tip:</b>
If dispatching custom events, it is recommended that you limit your custom event names to the following characters: letters, digits, periods (<kbd>.</kbd>), hyphens (<kbd>-</kbd>), underscores (<kbd>_</kbd>), and colons (<kbd>:</kbd>).
</p>

* **`name`:** (`string`) The name of the event to trigger.  Both native and custom events are supported.
* **`targets`:** (optional, `Document` | `HTMLElement` | `jQuery` | `NodeList` | `Array<HTMLElement>`) The target(s) to trigger the event on.  If omitted, will default to `document`.
* **`options`:** (optional, `Object`) The options to be used when dispatching the event.  See below for details.

#### Options object:

<p role="note" class="warning"><b>Warning:</b>
Adding additional properties directly to event options objects is not recommended.  Instead, use the <code>detail</code> property.
</p>

An event options object should have some of the following properties:

* **`bubbles`:** (optional, `boolean`) Whether the event bubbles (default: `true`).
* **`cancelable`:** (optional, `boolean`) Whether the event is cancelable (default: `true`).
* **`composed`:** (optional, `boolean`) Whether the event triggers listeners outside of a shadow root (default: `false`).
* **`detail`:** (optional, `any`) Custom data sent with the event (default: `undefined`).  Although any type is allowable, an object is often the most practical.

#### Returns: *none*

#### Throws: *none*

#### Examples:

##### Basic usage (in macros)

<p role="note"><b>Note:</b>
The macro examples would be exactly the same as the JavaScript examples, just wrapped in a <code>&lt;&lt;script&gt;&gt;</code> macro.
</p>

##### Basic usage (in JavaScript)

Dispatch a custom `fnord` event on `document`.

```javascript
triggerEvent('fnord');
```

Dispatch a `click` event on the element bearing the ID `some-menu`.

```javascript
triggerEvent('click', document.getElementById('some-menu'));
```

Dispatch a custom `update-meter` event on `document` while specifying some options.

```javascript
triggerEvent('update-meter', document, {
	detail : {
		tags : ['health', 'magick']
	}
});
```

Various ways to dispatch a `mouseover` event on all elements bearing the class `flippable`.

```javascript
triggerEvent('mouseover', document.getElementsByClassName('flippable'));

triggerEvent('mouseover', document.querySelectorAll('.flippable'));

triggerEvent('mouseover', jQuery('.flippable'));
```

<!-- *********************************************************************** -->

### `turns()` → *integer* `number` {#functions-function-turns}

Returns the total number (count) of played turns currently in effect—i.e., the number of played moments up to the present moment; future (rewound/undone) moments are not included within the total.

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

The turn count (*integer* `number`).

#### Throws: *none*

#### Examples:

##### Basic usage (in macros)

```
/* Record the turn count. */
<<set $turnCount to turns()>>
```

```
<<= 'This is turn #' + turns()>>
```

##### Basic usage (in JavaScript)

```javascript
// Record the turn count.
let turnCount = turns();
```

<!-- *********************************************************************** -->

### `variables()` → `Object` {#functions-function-variables}

Returns a reference to the active (present) story variables store (equivalent to: [`State.variables`](#state-api-getter-variables)).  This is only really useful within pure JavaScript code, as within TwineScript you may simply access story variables natively.

#### History:

* `v2.0.0`: Introduced.

#### Parameters: *none*

#### Returns:

A reference to the story variable store (`Object`).

#### Throws: *none*

#### Examples:

```javascript
// Given: $hasGoldenKey is true
if (variables().hasGoldenKey) {
	/* Do something… */
}
```

<!-- *********************************************************************** -->

### `visited([passageNames])` → *integer* `number` {#functions-function-visited}

Returns the number of times that the passage with the given name occurred within the story history.  If multiple passage names are given, returns the lowest count among them.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`passageNames`:** (optional, `string` | `Array<string>`) The name(s) of the passage(s) to search for.  May be a list or an array of passage names.  If omitted, will default to the current passage.

#### Returns:

The passage count (*integer* `number`).

#### Throws: *none*

#### Examples:

##### Basic usage (in macros)

```
<<if visited() is 3>>
	…has been to the current passage exactly three times…
<</if>>

<<if visited('Bar')>>
	…has been to the Bar at least once…
<</if>>

<<if visited('Café') is 2>>
	…has been to the Café exactly twice…
<</if>>

<<if visited('Bar', 'Café') is 4>>
	…has been to both the Bar and Café four or more times…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
if (visited() === 3) {
	// Has been to the current passage exactly three times.
}

if (visited('Bar')) {
	// Has been to the Bar at least once.
}

if (visited('Café') === 2) {
	// Has been to the Café exactly twice.
}

if (visited('Bar', 'Café') === 4) {
	// Has been to both the Bar and Café four or more times.
}
```

<!-- *********************************************************************** -->

### `visitedTags(tags…)` → *integer* `number` {#functions-function-visitedtags}

Returns the number of passages within the story history that are tagged with all of the given tags.

#### History:

* `v2.0.0`: Introduced.

#### Parameters:

* **`tags`:** (`string` | `Array<string>`) The tags to search for.  May be a list or an array of tags.

#### Returns:

The number (*integer* `number`) of passages that are tagged with the given tags.

#### Throws:

An `Error` instance.

#### Examples:

##### Basic usage (in macros)

```
<<if visitedTags('forest')>>
	…has been to some part of the forest at least once…
<</if>>

<<if visitedTags('forest', 'haunted') is 2>>
	…has been to the haunted part of the forest exactly twice…
<</if>>

<<if visitedTags('forest', 'burned') gte 3>>
	…has been to the burned part of the forest three or more times…
<</if>>
```

##### Basic usage (in JavaScript)

```javascript
if (visitedTags('forest')) {
	// Has been to some part of the forest at least once.
}

if (visitedTags('forest', 'haunted') === 2) {
	// Has been to the haunted part of the forest exactly twice.
}

if (visitedTags('forest', 'burned') >= 3) {
	// Has been to the burned part of the forest three or more times.
}
```
