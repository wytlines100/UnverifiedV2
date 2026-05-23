# UnverifiedV2 Custom Module API

Custom modules is a feature that allows developers to create their own modules.

---

## Structure

Every custom module has two functions "OnToggledOn" and "OnToggledOff" and "unv" which you will see later.

```js
function OnToggledOn() {
  // runs when the module is enabled
}

function OnToggledOff() {
  // runs when the module is disabled
}
```

Both functions are required to run a custom module

---

## `OnToggledOn()`

Runs when the user turns the module on.

You can optionally **return a function** 

```js
function OnToggledOn() {
  const interval = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(interval); // auto cleanup
}
```

---

## `OnToggledOff()`

Runs when the user turns the module off. Disables the entire module.`OnToggledOn` 

```js
let box;

function OnToggledOn() {
  box = document.createElement('div');
  box.textContent = 'Hello!';
  document.body.appendChild(box);
}

function OnToggledOff() {
  box.remove();
}
```

---

## `unv.CustomNotification(message, success?)`

Shows a notification in the UV2 UI.

- `message` — the text to show
- `success` — `true` for a normal notification, `false` for an error (default: `true`)

```js
function OnToggledOn() {
  unv.CustomNotification('Module started!');
}

function OnToggledOff() {
  unv.CustomNotification('Module stopped.', false);
}
```
