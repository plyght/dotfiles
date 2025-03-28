var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/lodash.throttle/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.throttle/index.js"(exports2, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function throttle2(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = throttle2;
  }
});

// src/devPanel.jsx
var devPanel_exports = {};
__export(devPanel_exports, {
  default: () => DevPanel
});
module.exports = __toCommonJS(devPanel_exports);

// src/api/storage.js
var import_api3 = require("@raycast/api");

// src/api/preferences.js
var import_api = require("@raycast/api");

// src/config/config.json
var defaultPreferences = {
  defaultProvider: "Nexra_gpt-4o",
  webSearch: "off",
  proxyURL: "",
  smartChatNaming: false,
  autoCheckForUpdates: true,
  persistentStorage: false,
  useCursorIcon: true,
  codeInterpreter: false,
  devMode: false,
  GeminiAPIKeys: "",
  inactiveDuration: "0",
  defaultLanguage: "English",
  fetchTimeout: "10000"
};

// src/api/preferences.js
var Preferences = {
  ...defaultPreferences,
  ...(0, import_api.getPreferenceValues)()
};

// src/helpers/extension_helper.js
var import_api2 = require("@raycast/api");
var getSupportPath = () => {
  return import_api2.environment.supportPath;
};

// src/api/storage.js
var import_fs = __toESM(require("fs"), 1);

// src/helpers/throttle.js
var import_lodash = __toESM(require_lodash(), 1);
function throttle(f, { delay = 0, delayFunction = null, ...options } = {}) {
  let delay_ms = delay;
  let __handler = (0, import_lodash.default)(f, delay_ms, options);
  let handler = function(...args) {
    let result = __handler(...args);
    if (delayFunction) {
      let new_delay_ms = delayFunction(delay_ms, { args, result });
      if (new_delay_ms !== delay_ms) {
        __handler.flush();
        __handler = (0, import_lodash.default)(f, new_delay_ms, options);
        delay_ms = new_delay_ms;
      }
    }
    return result;
  };
  handler.flush = () => {
    return __handler.flush();
  };
  return handler;
}

// src/api/storage.js
var not_found = (x) => x === void 0 || x === null;
var found = (x) => !not_found(x);
var Storage = {
  // whether to enable persistent/combined storage
  persistent: () => Preferences["persistentStorage"],
  /// Local storage functions - these provide quicker access that is not critical to persist
  // check if item exists in local storage
  localStorage_has: async (key) => {
    return found(await import_api3.LocalStorage.getItem(key));
  },
  // write to local storage
  // value is stored as-is, it is the user's responsibility to serialize it if needed
  localStorage_write: async (key, value) => {
    await import_api3.LocalStorage.setItem(key, value);
  },
  // read from local storage
  // if a default value is provided and key is not found, write the default value to local storage
  // value is returned as-is, it is the user's responsibility to deserialize it if needed
  localStorage_read: async (key, default_value = void 0) => {
    const retrieved = await import_api3.LocalStorage.getItem(key);
    if (not_found(retrieved) && default_value !== void 0) {
      await Storage.localStorage_write(key, default_value);
      return default_value;
    }
    return retrieved;
  },
  // delete from local storage
  localStorage_delete: async (key) => {
    await import_api3.LocalStorage.removeItem(key);
  },
  // list all items in local storage
  localStorage_list: async () => {
    return await import_api3.LocalStorage.allItems();
  },
  /// For file storage we use a dedicated directory within the support path.
  /// As a speedup, we store each key-value pair in a separate file.
  // get file storage path for a key
  // it is the user's responsibility to ensure that the key is a valid file name,
  // although we URI-encode it to cover basic cases
  fileStoragePath: (key) => {
    return `${getSupportPath()}/storage/${encodeURIComponent(key)}.txt`;
  },
  // check if item exists in file storage
  fileStorage_has: async (key) => {
    return import_fs.default.existsSync(Storage.fileStoragePath(key));
  },
  // write to file storage
  fileStorage_write: async (key, value) => {
    const dir = `${getSupportPath()}/storage`;
    if (!import_fs.default.existsSync(dir)) import_fs.default.mkdirSync(dir);
    const path = Storage.fileStoragePath(key);
    import_fs.default.writeFileSync(path, value);
  },
  // read from file storage
  // if a default value is provided and key is not found, write the default value to file storage
  fileStorage_read: async (key, default_value = void 0) => {
    const path = Storage.fileStoragePath(key);
    if (!import_fs.default.existsSync(path)) {
      if (default_value === void 0) return void 0;
      await Storage.fileStorage_write(key, default_value);
      return default_value;
    }
    return import_fs.default.readFileSync(path, "utf8");
  },
  // delete from file storage
  fileStorage_delete: async (key) => {
    const path = Storage.fileStoragePath(key);
    if (import_fs.default.existsSync(path)) {
      import_fs.default.unlinkSync(path);
    }
  },
  /// Sync functions
  /// We carry out a sync process periodically when either read or write is called
  syncInterval: 5 * 60 * 1e3,
  // interval for syncing local and file storage (in ms)
  add_to_sync_cache: async (key) => {
    let syncCache = JSON.parse(await Storage.localStorage_read("syncCache", "{}"));
    syncCache[key] = true;
    await Storage.localStorage_write("syncCache", JSON.stringify(syncCache));
  },
  run_sync: async () => {
    let lastSync = await Storage.localStorage_read("lastSync", 0);
    if (Date.now() - lastSync < Storage.syncInterval) return;
    console.log("Storage API: running sync process");
    let syncCache = JSON.parse(await Storage.localStorage_read("syncCache", "{}"));
    for (const key of Object.keys(syncCache)) {
      const local = await Storage.localStorage_read(key);
      if (local) {
        await Storage.fileStorage_write(key, local);
      }
    }
    await Storage.localStorage_write("syncCache", "{}");
    await Storage.localStorage_write("lastSync", Date.now());
  },
  // combined write function
  // first write to local storage function only, and then add key to sync cache to add to file storage later
  write: async (key, value) => {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
      console.log(`Storage API: Warning: value for key ${key} is not a string`);
    }
    await Storage.localStorage_write(key, value);
    if (Storage.persistent()) {
      await Storage.add_to_sync_cache(key);
      await Storage.run_sync();
    }
  },
  // combined read function - read from local storage, fallback to file storage.
  // also writes the default value to local storage if it is provided and key is not found
  read: async (key, default_value = void 0) => {
    let value;
    if (await Storage.localStorage_has(key)) {
      value = await Storage.localStorage_read(key);
      if (Storage.persistent()) {
        await Storage.add_to_sync_cache(key);
        await Storage.run_sync();
      }
    } else if (Storage.persistent() && await Storage.fileStorage_has(key)) {
      console.log(`Reading key: ${key} from file storage`);
      value = await Storage.fileStorage_read(key);
      await Storage.localStorage_write(key, value);
    } else {
      console.log(`Key: ${key} not found, returning default value`);
      value = default_value;
      if (value !== void 0) await Storage.write(key, value);
    }
    return value;
  },
  // combined delete function - delete from both local and file storage
  delete: async (key) => {
    await Storage.localStorage_delete(key);
    await Storage.fileStorage_delete(key);
  },
  // Throttled functions
  // We offer an easy way to throttle storage writes *while guaranteeing that the last write is always executed*.
  // Object storing the throttle functions for each key
  throttledWrites: {},
  // Throttled write function
  throttledWrite: async (key, value, interval = 1e3) => {
    if (!Storage.throttledWrites[key]) {
      Storage.throttledWrites[key] = throttle(
        async (key2, value2) => {
          await Storage.write(key2, value2);
        },
        { delay: interval, trailing: true }
      );
    }
    Storage.throttledWrites[key](key, value);
  },
  // Clear a throttled write function and ensure the last write is executed
  clearThrottledWrite: async (key) => {
    if (Storage.throttledWrites[key]) {
      Storage.throttledWrites[key].flush();
      delete Storage.throttledWrites[key];
    }
  }
};

// src/devPanel.jsx
var import_api4 = require("@raycast/api");
var SetStorage = () => {
  return /* @__PURE__ */ _jsx(
    import_api4.Form,
    {
      actions: /* @__PURE__ */ _jsx(import_api4.ActionPanel, null, /* @__PURE__ */ _jsx(
        import_api4.Action.SubmitForm,
        {
          title: "Save",
          onSubmit: async (values) => {
            await Storage.write(values.key, values.value);
            await (0, import_api4.showToast)(import_api4.Toast.Style.Success, "Saved");
          }
        }
      ))
    },
    /* @__PURE__ */ _jsx(import_api4.Form.TextField, { id: "key", title: "Key" }),
    /* @__PURE__ */ _jsx(import_api4.Form.TextField, { id: "value", title: "Value" })
  );
};
function DevPanel() {
  return /* @__PURE__ */ _jsx(import_api4.List, null, /* @__PURE__ */ _jsx(import_api4.List.Section, { title: "Storage" }, /* @__PURE__ */ _jsx(
    import_api4.List.Item,
    {
      title: "Set Storage",
      actions: /* @__PURE__ */ _jsx(import_api4.ActionPanel, null, /* @__PURE__ */ _jsx(import_api4.Action.Push, { target: /* @__PURE__ */ _jsx(SetStorage, null), title: "Set Storage" }))
    }
  )));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vcmF5Y2FzdC1nNGYvbm9kZV9tb2R1bGVzL2xvZGFzaC50aHJvdHRsZS9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9yYXljYXN0LWc0Zi9zcmMvZGV2UGFuZWwuanN4IiwgIi4uLy4uLy4uLy4uL3JheWNhc3QtZzRmL3NyYy9hcGkvc3RvcmFnZS5qcyIsICIuLi8uLi8uLi8uLi9yYXljYXN0LWc0Zi9zcmMvYXBpL3ByZWZlcmVuY2VzLmpzIiwgIi4uLy4uLy4uLy4uL3JheWNhc3QtZzRmL3NyYy9jb25maWcvY29uZmlnLmpzb24iLCAiLi4vLi4vLi4vLi4vcmF5Y2FzdC1nNGYvc3JjL2hlbHBlcnMvZXh0ZW5zaW9uX2hlbHBlci5qcyIsICIuLi8uLi8uLi8uLi9yYXljYXN0LWc0Zi9zcmMvaGVscGVycy90aHJvdHRsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwgImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiI3Jvb3Qvc3JjL2FwaS9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBGb3JtLCBMaXN0LCBBY3Rpb25QYW5lbCwgQWN0aW9uLCBUb2FzdCwgc2hvd1RvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5jb25zdCBTZXRTdG9yYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxGb3JtXG4gICAgICBhY3Rpb25zPXtcbiAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgIDxBY3Rpb24uU3VibWl0Rm9ybVxuICAgICAgICAgICAgdGl0bGU9XCJTYXZlXCJcbiAgICAgICAgICAgIG9uU3VibWl0PXthc3luYyAodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IFN0b3JhZ2Uud3JpdGUodmFsdWVzLmtleSwgdmFsdWVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIFwiU2F2ZWRcIik7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICB9XG4gICAgPlxuICAgICAgPEZvcm0uVGV4dEZpZWxkIGlkPVwia2V5XCIgdGl0bGU9XCJLZXlcIiAvPlxuICAgICAgPEZvcm0uVGV4dEZpZWxkIGlkPVwidmFsdWVcIiB0aXRsZT1cIlZhbHVlXCIgLz5cbiAgICA8L0Zvcm0+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXZQYW5lbCgpIHtcbiAgcmV0dXJuIChcbiAgICA8TGlzdD5cbiAgICAgIDxMaXN0LlNlY3Rpb24gdGl0bGU9XCJTdG9yYWdlXCI+XG4gICAgICAgIDxMaXN0Lkl0ZW1cbiAgICAgICAgICB0aXRsZT1cIlNldCBTdG9yYWdlXCJcbiAgICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICAgICAgPEFjdGlvbi5QdXNoIHRhcmdldD17PFNldFN0b3JhZ2UgLz59IHRpdGxlPVwiU2V0IFN0b3JhZ2VcIiAvPlxuICAgICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L0xpc3QuU2VjdGlvbj5cbiAgICA8L0xpc3Q+XG4gICk7XG59XG4iLCAiLy8gVGhpcyBpcyB0aGUgU3RvcmFnZSBpbnRlcmZhY2UsIHdoaWNoIGNvbWJpbmVzIExvY2FsU3RvcmFnZSB3aXRoIG1vcmUgcGVyc2lzdGVudCBmaWxlIHN5c3RlbSBzdG9yYWdlLlxuLy8gSWYgdGhlIHBlcnNpc3RlbnQgc3RvcmFnZSBwcmVmZXJlbmNlIGlzIGVuYWJsZWQsIHdlIGFsc28ga2VlcCB0aGUgdHdvIHZlcnNpb25zIGluIHN5bmMsXG4vLyBidXQgdGhlIHN5bmMgcHJvY2VzcyBoYXBwZW5zIG9ubHkgcGVyaW9kaWNhbGx5IHNvIHRoZSBmaWxlIHN0b3JhZ2Ugc2hvdWxkIG5vdCBiZSByZWxpZWQgdXBvbiBmb3IgaW1tZWRpYXRlIGNvbnNpc3RlbmN5LlxuLy8gTm90ZSB0aGF0IHBlcnNpc3RlbnQgc3RvcmFnZSBpcyBub3QgYWx3YXlzIHRoZSBiZXN0IG9wdGlvbiBhcyBmaWxlIEkvTyBpcyByZWxhdGl2ZWx5IGV4cGVuc2l2ZS5cbi8vIFRodXMsIG9ubHkgdXNlIGl0IHdoZW4geW91IHJlYWxseSBuZWVkIHRvIHBlcnNpc3QgZGF0YSBhY3Jvc3Mgc2Vzc2lvbnMuIE90aGVyd2lzZSwgdXNlIGxvY2FsIHN0b3JhZ2UuXG5cbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IFByZWZlcmVuY2VzIH0gZnJvbSBcIiNyb290L3NyYy9hcGkvcHJlZmVyZW5jZXMuanNcIjtcblxuaW1wb3J0IHsgZ2V0U3VwcG9ydFBhdGggfSBmcm9tIFwiLi4vaGVscGVycy9leHRlbnNpb25faGVscGVyLmpzXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSBcIiNyb290L3NyYy9oZWxwZXJzL3Rocm90dGxlLmpzXCI7XG5cbmNvbnN0IG5vdF9mb3VuZCA9ICh4KSA9PiB4ID09PSB1bmRlZmluZWQgfHwgeCA9PT0gbnVsbDtcbmNvbnN0IGZvdW5kID0gKHgpID0+ICFub3RfZm91bmQoeCk7XG5cbmV4cG9ydCBjb25zdCBTdG9yYWdlID0ge1xuICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBwZXJzaXN0ZW50L2NvbWJpbmVkIHN0b3JhZ2VcbiAgcGVyc2lzdGVudDogKCkgPT4gUHJlZmVyZW5jZXNbXCJwZXJzaXN0ZW50U3RvcmFnZVwiXSxcblxuICAvLy8gTG9jYWwgc3RvcmFnZSBmdW5jdGlvbnMgLSB0aGVzZSBwcm92aWRlIHF1aWNrZXIgYWNjZXNzIHRoYXQgaXMgbm90IGNyaXRpY2FsIHRvIHBlcnNpc3RcblxuICAvLyBjaGVjayBpZiBpdGVtIGV4aXN0cyBpbiBsb2NhbCBzdG9yYWdlXG4gIGxvY2FsU3RvcmFnZV9oYXM6IGFzeW5jIChrZXkpID0+IHtcbiAgICByZXR1cm4gZm91bmQoYXdhaXQgTG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gIH0sXG5cbiAgLy8gd3JpdGUgdG8gbG9jYWwgc3RvcmFnZVxuICAvLyB2YWx1ZSBpcyBzdG9yZWQgYXMtaXMsIGl0IGlzIHRoZSB1c2VyJ3MgcmVzcG9uc2liaWxpdHkgdG8gc2VyaWFsaXplIGl0IGlmIG5lZWRlZFxuICBsb2NhbFN0b3JhZ2Vfd3JpdGU6IGFzeW5jIChrZXksIHZhbHVlKSA9PiB7XG4gICAgYXdhaXQgTG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH0sXG5cbiAgLy8gcmVhZCBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgLy8gaWYgYSBkZWZhdWx0IHZhbHVlIGlzIHByb3ZpZGVkIGFuZCBrZXkgaXMgbm90IGZvdW5kLCB3cml0ZSB0aGUgZGVmYXVsdCB2YWx1ZSB0byBsb2NhbCBzdG9yYWdlXG4gIC8vIHZhbHVlIGlzIHJldHVybmVkIGFzLWlzLCBpdCBpcyB0aGUgdXNlcidzIHJlc3BvbnNpYmlsaXR5IHRvIGRlc2VyaWFsaXplIGl0IGlmIG5lZWRlZFxuICBsb2NhbFN0b3JhZ2VfcmVhZDogYXN5bmMgKGtleSwgZGVmYXVsdF92YWx1ZSA9IHVuZGVmaW5lZCkgPT4ge1xuICAgIGNvbnN0IHJldHJpZXZlZCA9IGF3YWl0IExvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKG5vdF9mb3VuZChyZXRyaWV2ZWQpICYmIGRlZmF1bHRfdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgU3RvcmFnZS5sb2NhbFN0b3JhZ2Vfd3JpdGUoa2V5LCBkZWZhdWx0X3ZhbHVlKTtcbiAgICAgIHJldHVybiBkZWZhdWx0X3ZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0cmlldmVkO1xuICB9LFxuXG4gIC8vIGRlbGV0ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgbG9jYWxTdG9yYWdlX2RlbGV0ZTogYXN5bmMgKGtleSkgPT4ge1xuICAgIGF3YWl0IExvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH0sXG5cbiAgLy8gbGlzdCBhbGwgaXRlbXMgaW4gbG9jYWwgc3RvcmFnZVxuICBsb2NhbFN0b3JhZ2VfbGlzdDogYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBhd2FpdCBMb2NhbFN0b3JhZ2UuYWxsSXRlbXMoKTtcbiAgfSxcblxuICAvLy8gRm9yIGZpbGUgc3RvcmFnZSB3ZSB1c2UgYSBkZWRpY2F0ZWQgZGlyZWN0b3J5IHdpdGhpbiB0aGUgc3VwcG9ydCBwYXRoLlxuICAvLy8gQXMgYSBzcGVlZHVwLCB3ZSBzdG9yZSBlYWNoIGtleS12YWx1ZSBwYWlyIGluIGEgc2VwYXJhdGUgZmlsZS5cblxuICAvLyBnZXQgZmlsZSBzdG9yYWdlIHBhdGggZm9yIGEga2V5XG4gIC8vIGl0IGlzIHRoZSB1c2VyJ3MgcmVzcG9uc2liaWxpdHkgdG8gZW5zdXJlIHRoYXQgdGhlIGtleSBpcyBhIHZhbGlkIGZpbGUgbmFtZSxcbiAgLy8gYWx0aG91Z2ggd2UgVVJJLWVuY29kZSBpdCB0byBjb3ZlciBiYXNpYyBjYXNlc1xuICBmaWxlU3RvcmFnZVBhdGg6IChrZXkpID0+IHtcbiAgICByZXR1cm4gYCR7Z2V0U3VwcG9ydFBhdGgoKX0vc3RvcmFnZS8ke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfS50eHRgO1xuICB9LFxuXG4gIC8vIGNoZWNrIGlmIGl0ZW0gZXhpc3RzIGluIGZpbGUgc3RvcmFnZVxuICBmaWxlU3RvcmFnZV9oYXM6IGFzeW5jIChrZXkpID0+IHtcbiAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhTdG9yYWdlLmZpbGVTdG9yYWdlUGF0aChrZXkpKTtcbiAgfSxcblxuICAvLyB3cml0ZSB0byBmaWxlIHN0b3JhZ2VcbiAgZmlsZVN0b3JhZ2Vfd3JpdGU6IGFzeW5jIChrZXksIHZhbHVlKSA9PiB7XG4gICAgLy8gZW5zdXJlIHN0b3JhZ2UgZGlyZWN0b3J5IGV4aXN0c1xuICAgIGNvbnN0IGRpciA9IGAke2dldFN1cHBvcnRQYXRoKCl9L3N0b3JhZ2VgO1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSBmcy5ta2RpclN5bmMoZGlyKTtcbiAgICBjb25zdCBwYXRoID0gU3RvcmFnZS5maWxlU3RvcmFnZVBhdGgoa2V5KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGgsIHZhbHVlKTtcbiAgfSxcblxuICAvLyByZWFkIGZyb20gZmlsZSBzdG9yYWdlXG4gIC8vIGlmIGEgZGVmYXVsdCB2YWx1ZSBpcyBwcm92aWRlZCBhbmQga2V5IGlzIG5vdCBmb3VuZCwgd3JpdGUgdGhlIGRlZmF1bHQgdmFsdWUgdG8gZmlsZSBzdG9yYWdlXG4gIGZpbGVTdG9yYWdlX3JlYWQ6IGFzeW5jIChrZXksIGRlZmF1bHRfdmFsdWUgPSB1bmRlZmluZWQpID0+IHtcbiAgICBjb25zdCBwYXRoID0gU3RvcmFnZS5maWxlU3RvcmFnZVBhdGgoa2V5KTtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICAgIGlmIChkZWZhdWx0X3ZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBhd2FpdCBTdG9yYWdlLmZpbGVTdG9yYWdlX3dyaXRlKGtleSwgZGVmYXVsdF92YWx1ZSk7XG4gICAgICByZXR1cm4gZGVmYXVsdF92YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhwYXRoLCBcInV0ZjhcIik7XG4gIH0sXG5cbiAgLy8gZGVsZXRlIGZyb20gZmlsZSBzdG9yYWdlXG4gIGZpbGVTdG9yYWdlX2RlbGV0ZTogYXN5bmMgKGtleSkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBTdG9yYWdlLmZpbGVTdG9yYWdlUGF0aChrZXkpO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpKSB7XG4gICAgICBmcy51bmxpbmtTeW5jKHBhdGgpO1xuICAgIH1cbiAgfSxcblxuICAvLy8gU3luYyBmdW5jdGlvbnNcbiAgLy8vIFdlIGNhcnJ5IG91dCBhIHN5bmMgcHJvY2VzcyBwZXJpb2RpY2FsbHkgd2hlbiBlaXRoZXIgcmVhZCBvciB3cml0ZSBpcyBjYWxsZWRcblxuICBzeW5jSW50ZXJ2YWw6IDUgKiA2MCAqIDEwMDAsIC8vIGludGVydmFsIGZvciBzeW5jaW5nIGxvY2FsIGFuZCBmaWxlIHN0b3JhZ2UgKGluIG1zKVxuXG4gIGFkZF90b19zeW5jX2NhY2hlOiBhc3luYyAoa2V5KSA9PiB7XG4gICAgLy8gaW1wb3J0YW50ISB0aGUga2V5cyBzeW5jQ2FjaGUgYW5kIGxhc3RTeW5jIHNob3VsZCBPTkxZIEVWRVIgYmUgcHV0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICAvLyBvciBlbHNlIGl0IHdpbGwgbGlrZWx5IGNhdXNlIGluZmluaXRlIHJlY3Vyc2lvbiBpbiB0aGUgY29tYmluZWQgcmVhZCBmdW5jdGlvbi5cbiAgICAvLyBhbnl3YXkgaXQncyB1c2VsZXNzIHRvIHB1dCB0aGVtIGluIGZpbGUgc3RvcmFnZSBhcyB0aGV5IGFyZSBvbmx5IHVzZWQgZm9yIHN5bmNpbmdcbiAgICBsZXQgc3luY0NhY2hlID0gSlNPTi5wYXJzZShhd2FpdCBTdG9yYWdlLmxvY2FsU3RvcmFnZV9yZWFkKFwic3luY0NhY2hlXCIsIFwie31cIikpO1xuICAgIHN5bmNDYWNoZVtrZXldID0gdHJ1ZTtcbiAgICBhd2FpdCBTdG9yYWdlLmxvY2FsU3RvcmFnZV93cml0ZShcInN5bmNDYWNoZVwiLCBKU09OLnN0cmluZ2lmeShzeW5jQ2FjaGUpKTtcbiAgfSxcblxuICBydW5fc3luYzogYXN5bmMgKCkgPT4ge1xuICAgIGxldCBsYXN0U3luYyA9IGF3YWl0IFN0b3JhZ2UubG9jYWxTdG9yYWdlX3JlYWQoXCJsYXN0U3luY1wiLCAwKTtcbiAgICBpZiAoRGF0ZS5ub3coKSAtIGxhc3RTeW5jIDwgU3RvcmFnZS5zeW5jSW50ZXJ2YWwpIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKFwiU3RvcmFnZSBBUEk6IHJ1bm5pbmcgc3luYyBwcm9jZXNzXCIpO1xuICAgIGxldCBzeW5jQ2FjaGUgPSBKU09OLnBhcnNlKGF3YWl0IFN0b3JhZ2UubG9jYWxTdG9yYWdlX3JlYWQoXCJzeW5jQ2FjaGVcIiwgXCJ7fVwiKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc3luY0NhY2hlKSkge1xuICAgICAgY29uc3QgbG9jYWwgPSBhd2FpdCBTdG9yYWdlLmxvY2FsU3RvcmFnZV9yZWFkKGtleSk7XG4gICAgICBpZiAobG9jYWwpIHtcbiAgICAgICAgYXdhaXQgU3RvcmFnZS5maWxlU3RvcmFnZV93cml0ZShrZXksIGxvY2FsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjbGVhciBzeW5jIGNhY2hlLCByZXNldCBsYXN0IHN5bmMgdGltZVxuICAgIGF3YWl0IFN0b3JhZ2UubG9jYWxTdG9yYWdlX3dyaXRlKFwic3luY0NhY2hlXCIsIFwie31cIik7XG4gICAgYXdhaXQgU3RvcmFnZS5sb2NhbFN0b3JhZ2Vfd3JpdGUoXCJsYXN0U3luY1wiLCBEYXRlLm5vdygpKTtcbiAgfSxcblxuICAvLyBjb21iaW5lZCB3cml0ZSBmdW5jdGlvblxuICAvLyBmaXJzdCB3cml0ZSB0byBsb2NhbCBzdG9yYWdlIGZ1bmN0aW9uIG9ubHksIGFuZCB0aGVuIGFkZCBrZXkgdG8gc3luYyBjYWNoZSB0byBhZGQgdG8gZmlsZSBzdG9yYWdlIGxhdGVyXG4gIHdyaXRlOiBhc3luYyAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIHZhbHVlIG11c3QgYmUgYSBzdHJpbmcuIFRvIGF2b2lkIGNyYXNoZXMgd2Ugc2VyaWFsaXplIGl0LCBidXQgbG9nIGEgd2FybmluZy5cbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgY29uc29sZS5sb2coYFN0b3JhZ2UgQVBJOiBXYXJuaW5nOiB2YWx1ZSBmb3Iga2V5ICR7a2V5fSBpcyBub3QgYSBzdHJpbmdgKTtcbiAgICB9XG5cbiAgICBhd2FpdCBTdG9yYWdlLmxvY2FsU3RvcmFnZV93cml0ZShrZXksIHZhbHVlKTtcbiAgICBpZiAoU3RvcmFnZS5wZXJzaXN0ZW50KCkpIHtcbiAgICAgIGF3YWl0IFN0b3JhZ2UuYWRkX3RvX3N5bmNfY2FjaGUoa2V5KTtcbiAgICAgIGF3YWl0IFN0b3JhZ2UucnVuX3N5bmMoKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gY29tYmluZWQgcmVhZCBmdW5jdGlvbiAtIHJlYWQgZnJvbSBsb2NhbCBzdG9yYWdlLCBmYWxsYmFjayB0byBmaWxlIHN0b3JhZ2UuXG4gIC8vIGFsc28gd3JpdGVzIHRoZSBkZWZhdWx0IHZhbHVlIHRvIGxvY2FsIHN0b3JhZ2UgaWYgaXQgaXMgcHJvdmlkZWQgYW5kIGtleSBpcyBub3QgZm91bmRcbiAgcmVhZDogYXN5bmMgKGtleSwgZGVmYXVsdF92YWx1ZSA9IHVuZGVmaW5lZCkgPT4ge1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAoYXdhaXQgU3RvcmFnZS5sb2NhbFN0b3JhZ2VfaGFzKGtleSkpIHtcbiAgICAgIHZhbHVlID0gYXdhaXQgU3RvcmFnZS5sb2NhbFN0b3JhZ2VfcmVhZChrZXkpO1xuICAgICAgLy8gbm90ZSBob3cgd2Ugb25seSBzeW5jIGhlcmUsIGFzIGl0IG9ubHkgbWFrZXMgc2Vuc2Ugd2hlbiB3ZSBoYXZlIGEgdmFsdWUgaW4gbG9jYWwgc3RvcmFnZVxuICAgICAgaWYgKFN0b3JhZ2UucGVyc2lzdGVudCgpKSB7XG4gICAgICAgIGF3YWl0IFN0b3JhZ2UuYWRkX3RvX3N5bmNfY2FjaGUoa2V5KTtcbiAgICAgICAgYXdhaXQgU3RvcmFnZS5ydW5fc3luYygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoU3RvcmFnZS5wZXJzaXN0ZW50KCkgJiYgKGF3YWl0IFN0b3JhZ2UuZmlsZVN0b3JhZ2VfaGFzKGtleSkpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVhZGluZyBrZXk6ICR7a2V5fSBmcm9tIGZpbGUgc3RvcmFnZWApO1xuICAgICAgdmFsdWUgPSBhd2FpdCBTdG9yYWdlLmZpbGVTdG9yYWdlX3JlYWQoa2V5KTtcbiAgICAgIC8vIHdyaXRlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICAgIGF3YWl0IFN0b3JhZ2UubG9jYWxTdG9yYWdlX3dyaXRlKGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgS2V5OiAke2tleX0gbm90IGZvdW5kLCByZXR1cm5pbmcgZGVmYXVsdCB2YWx1ZWApO1xuICAgICAgdmFsdWUgPSBkZWZhdWx0X3ZhbHVlO1xuICAgICAgLy8gd3JpdGUgZGVmYXVsdCBrZXkgdG8gc3RvcmFnZVxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIGF3YWl0IFN0b3JhZ2Uud3JpdGUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvLyBjb21iaW5lZCBkZWxldGUgZnVuY3Rpb24gLSBkZWxldGUgZnJvbSBib3RoIGxvY2FsIGFuZCBmaWxlIHN0b3JhZ2VcbiAgZGVsZXRlOiBhc3luYyAoa2V5KSA9PiB7XG4gICAgYXdhaXQgU3RvcmFnZS5sb2NhbFN0b3JhZ2VfZGVsZXRlKGtleSk7XG4gICAgYXdhaXQgU3RvcmFnZS5maWxlU3RvcmFnZV9kZWxldGUoa2V5KTtcbiAgfSxcblxuICAvLyBUaHJvdHRsZWQgZnVuY3Rpb25zXG4gIC8vIFdlIG9mZmVyIGFuIGVhc3kgd2F5IHRvIHRocm90dGxlIHN0b3JhZ2Ugd3JpdGVzICp3aGlsZSBndWFyYW50ZWVpbmcgdGhhdCB0aGUgbGFzdCB3cml0ZSBpcyBhbHdheXMgZXhlY3V0ZWQqLlxuXG4gIC8vIE9iamVjdCBzdG9yaW5nIHRoZSB0aHJvdHRsZSBmdW5jdGlvbnMgZm9yIGVhY2gga2V5XG4gIHRocm90dGxlZFdyaXRlczoge30sXG5cbiAgLy8gVGhyb3R0bGVkIHdyaXRlIGZ1bmN0aW9uXG4gIHRocm90dGxlZFdyaXRlOiBhc3luYyAoa2V5LCB2YWx1ZSwgaW50ZXJ2YWwgPSAxMDAwKSA9PiB7XG4gICAgaWYgKCFTdG9yYWdlLnRocm90dGxlZFdyaXRlc1trZXldKSB7XG4gICAgICBTdG9yYWdlLnRocm90dGxlZFdyaXRlc1trZXldID0gdGhyb3R0bGUoXG4gICAgICAgIGFzeW5jIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgYXdhaXQgU3RvcmFnZS53cml0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgVGhyb3R0bGVkIHdyaXRlIGV4ZWN1dGVkIGZvciBrZXk6ICR7a2V5fWApO1xuICAgICAgICB9LFxuICAgICAgICB7IGRlbGF5OiBpbnRlcnZhbCwgdHJhaWxpbmc6IHRydWUgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBTdG9yYWdlLnRocm90dGxlZFdyaXRlc1trZXldKGtleSwgdmFsdWUpO1xuICB9LFxuXG4gIC8vIENsZWFyIGEgdGhyb3R0bGVkIHdyaXRlIGZ1bmN0aW9uIGFuZCBlbnN1cmUgdGhlIGxhc3Qgd3JpdGUgaXMgZXhlY3V0ZWRcbiAgY2xlYXJUaHJvdHRsZWRXcml0ZTogYXN5bmMgKGtleSkgPT4ge1xuICAgIGlmIChTdG9yYWdlLnRocm90dGxlZFdyaXRlc1trZXldKSB7XG4gICAgICBTdG9yYWdlLnRocm90dGxlZFdyaXRlc1trZXldLmZsdXNoKCk7XG4gICAgICBkZWxldGUgU3RvcmFnZS50aHJvdHRsZWRXcml0ZXNba2V5XTtcbiAgICB9XG4gIH0sXG59O1xuIiwgIi8vIFRoaXMgaXMgdGhlIFByZWZlcmVuY2VzIGludGVyZmFjZSwgd2hpY2ggdXNlcyB0aGUgUmF5Y2FzdCBBUEkgdG8gZ2V0IHByZWZlcmVuY2UgdmFsdWVzLlxuLy8gVGhpcyBpcyBleHRyZW1lbHkgc2ltcGxlIGFuZCBvbmx5IGV4cG9ydHMgb25lIGNvbnN0YW50LCBgUHJlZmVyZW5jZXNgLlxuLy8gSXQgaXMgdXNlZCB0byBhYnN0cmFjdCBhd2F5IHRoZSBkZXRhaWxzIG9mIHRoZSBSYXljYXN0IEFQSSwgc2ltaWxhciB0byB3aGF0IHdlIGRpZCBmb3IgdGhlIFN0b3JhZ2UgQVBJLlxuLy8gSXQgaXMgYWxzbyBhIHNtYWxsIHNwZWVkdXAsIGFzIHdlIGNhbiBhdm9pZCBmZXRjaGluZyB0aGUgcHJlZmVyZW5jZXMgbXVsdGlwbGUgdGltZXMuXG5cbmltcG9ydCB7IGdldFByZWZlcmVuY2VWYWx1ZXMgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBkZWZhdWx0UHJlZmVyZW5jZXMgfSBmcm9tIFwiI3Jvb3Qvc3JjL2NvbmZpZy9jb25maWcuanNvblwiO1xuXG5leHBvcnQgY29uc3QgUHJlZmVyZW5jZXMgPSB7XG4gIC4uLmRlZmF1bHRQcmVmZXJlbmNlcyxcbiAgLi4uZ2V0UHJlZmVyZW5jZVZhbHVlcygpLFxufTtcbiIsICJ7XG4gIFwiZGVmYXVsdFByZWZlcmVuY2VzXCI6IHtcbiAgICBcImRlZmF1bHRQcm92aWRlclwiOiBcIk5leHJhX2dwdC00b1wiLFxuICAgIFwid2ViU2VhcmNoXCI6IFwib2ZmXCIsXG4gICAgXCJwcm94eVVSTFwiOiBcIlwiLFxuICAgIFwic21hcnRDaGF0TmFtaW5nXCI6IGZhbHNlLFxuICAgIFwiYXV0b0NoZWNrRm9yVXBkYXRlc1wiOiB0cnVlLFxuICAgIFwicGVyc2lzdGVudFN0b3JhZ2VcIjogZmFsc2UsXG4gICAgXCJ1c2VDdXJzb3JJY29uXCI6IHRydWUsXG4gICAgXCJjb2RlSW50ZXJwcmV0ZXJcIjogZmFsc2UsXG4gICAgXCJkZXZNb2RlXCI6IGZhbHNlLFxuICAgIFwiR2VtaW5pQVBJS2V5c1wiOiBcIlwiLFxuICAgIFwiaW5hY3RpdmVEdXJhdGlvblwiOiBcIjBcIixcbiAgICBcImRlZmF1bHRMYW5ndWFnZVwiOiBcIkVuZ2xpc2hcIixcbiAgICBcImZldGNoVGltZW91dFwiOiBcIjEwMDAwXCJcbiAgfSxcbiAgXCJsYW5ndWFnZXNcIjogW1xuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUNcdUQ4M0NcdURERTcgRW5nbGlzaFwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkVuZ2xpc2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFQlx1RDgzQ1x1RERGNyBGcmVuY2hcIixcbiAgICAgIFwidmFsdWVcIjogXCJGcmVuY2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFOFx1RDgzQ1x1RERGMyBDaGluZXNlXCIsXG4gICAgICBcInZhbHVlXCI6IFwiQ2hpbmVzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREVFXHVEODNDXHVEREY5IEl0YWxpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJJdGFsaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERTlcdUQ4M0NcdURERUEgR2VybWFuXCIsXG4gICAgICBcInZhbHVlXCI6IFwiR2VybWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUFcdUQ4M0NcdURERjggU3BhbmlzaFwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIlNwYW5pc2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGNVx1RDgzQ1x1RERGOSBQb3J0dWd1ZXNlXCIsXG4gICAgICBcInZhbHVlXCI6IFwiUG9ydHVndWVzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREY3XHVEODNDXHVEREZBIFJ1c3NpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJSdXNzaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERkJcdUQ4M0NcdURERjMgVmlldG5hbWVzZVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIlZpZXRuYW1lc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFRVx1RDgzQ1x1RERGMyBIaW5kaVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkhpbmRpXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERTZcdUQ4M0NcdURERUEgQXJhYmljXCIsXG4gICAgICBcInZhbHVlXCI6IFwiQXJhYmljXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERTZcdUQ4M0NcdURERjEgQWxiYW5pYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJBbGJhbmlhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREVBXHVEODNDXHVEREY5IEFtaGFyaWNcIixcbiAgICAgIFwidmFsdWVcIjogXCJBbWhhcmljXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERTZcdUQ4M0NcdURERjIgQXJtZW5pYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJBcm1lbmlhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREU3XHVEODNDXHVEREU5IEJlbmdhbGlcIixcbiAgICAgIFwidmFsdWVcIjogXCJCZW5nYWxpXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERTdcdUQ4M0NcdURERTYgQm9zbmlhblwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkJvc25pYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFN1x1RDgzQ1x1RERFQyBCdWxnYXJpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJCdWxnYXJpYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGMlx1RDgzQ1x1RERGMiBCdXJtZXNlXCIsXG4gICAgICBcInZhbHVlXCI6IFwiQnVybWVzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREVBXHVEODNDXHVEREY4IENhdGFsYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJDYXRhbGFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERURcdUQ4M0NcdURERjcgQ3JvYXRpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJDcm9hdGlhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREU4XHVEODNDXHVEREZGIEN6ZWNoXCIsXG4gICAgICBcInZhbHVlXCI6IFwiQ3plY2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFOVx1RDgzQ1x1RERGMCBEYW5pc2hcIixcbiAgICAgIFwidmFsdWVcIjogXCJEYW5pc2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGM1x1RDgzQ1x1RERGMSBEdXRjaFwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkR1dGNoXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUFcdUQ4M0NcdURERUEgRXN0b25pYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJFc3RvbmlhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREVCXHVEODNDXHVEREVFIEZpbm5pc2hcIixcbiAgICAgIFwidmFsdWVcIjogXCJGaW5uaXNoXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUNcdUQ4M0NcdURERUEgR2VvcmdpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJHZW9yZ2lhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREVDXHVEODNDXHVEREY3IEdyZWVrXCIsXG4gICAgICBcInZhbHVlXCI6IFwiR3JlZWtcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFRVx1RDgzQ1x1RERGMyBHdWphcmF0aVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkd1amFyYXRpXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERURcdUQ4M0NcdURERkEgSHVuZ2FyaWFuXCIsXG4gICAgICBcInZhbHVlXCI6IFwiSHVuZ2FyaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUVcdUQ4M0NcdURERjggSWNlbGFuZGljXCIsXG4gICAgICBcInZhbHVlXCI6IFwiSWNlbGFuZGljXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUVcdUQ4M0NcdURERTkgSW5kb25lc2lhblwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkluZG9uZXNpYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFRlx1RDgzQ1x1RERGNSBKYXBhbmVzZVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkphcGFuZXNlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUVcdUQ4M0NcdURERjMgS2FubmFkYVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIkthbm5hZGFcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGMFx1RDgzQ1x1RERGRiBLYXpha2hcIixcbiAgICAgIFwidmFsdWVcIjogXCJLYXpha2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGMFx1RDgzQ1x1RERGNyBLb3JlYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJLb3JlYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGMVx1RDgzQ1x1RERGQiBMYXR2aWFuXCIsXG4gICAgICBcInZhbHVlXCI6IFwiTGF0dmlhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREYxXHVEODNDXHVEREY5IExpdGh1YW5pYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJMaXRodWFuaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjJcdUQ4M0NcdURERjAgTWFjZWRvbmlhblwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIk1hY2Vkb25pYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGMlx1RDgzQ1x1RERGRSBNYWxheVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIk1hbGF5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUVcdUQ4M0NcdURERjMgTWFsYXlhbGFtXCIsXG4gICAgICBcInZhbHVlXCI6IFwiTWFsYXlhbGFtXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERUVcdUQ4M0NcdURERjMgTWFyYXRoaVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIk1hcmF0aGlcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGMlx1RDgzQ1x1RERGMyBNb25nb2xpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJNb25nb2xpYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGM1x1RDgzQ1x1RERGNCBOb3J3ZWdpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJOb3J3ZWdpYW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFRVx1RDgzQ1x1RERGNyBQZXJzaWFuXCIsXG4gICAgICBcInZhbHVlXCI6IFwiUGVyc2lhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREY1XHVEODNDXHVEREYxIFBvbGlzaFwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIlBvbGlzaFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREY1XHVEODNDXHVEREYwIFB1bmphYmlcIixcbiAgICAgIFwidmFsdWVcIjogXCJQdW5qYWJpXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjdcdUQ4M0NcdURERjQgUm9tYW5pYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJSb21hbmlhblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREY3XHVEODNDXHVEREY4IFNlcmJpYW5cIixcbiAgICAgIFwidmFsdWVcIjogXCJTZXJiaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjhcdUQ4M0NcdURERjAgU2xvdmFrXCIsXG4gICAgICBcInZhbHVlXCI6IFwiU2xvdmFrXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjhcdUQ4M0NcdURERUUgU2xvdmVuaWFuXCIsXG4gICAgICBcInZhbHVlXCI6IFwiU2xvdmVuaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjhcdUQ4M0NcdURERjQgU29tYWxpXCIsXG4gICAgICBcInZhbHVlXCI6IFwiU29tYWxpXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjhcdUQ4M0NcdURERUEgU3dlZGlzaFwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIlN3ZWRpc2hcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGNVx1RDgzQ1x1RERFRCBUYWdhbG9nXCIsXG4gICAgICBcInZhbHVlXCI6IFwiVGFnYWxvZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREVFXHVEODNDXHVEREYzIFRhbWlsXCIsXG4gICAgICBcInZhbHVlXCI6IFwiVGFtaWxcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERFRVx1RDgzQ1x1RERGMyBUZWx1Z3VcIixcbiAgICAgIFwidmFsdWVcIjogXCJUZWx1Z3VcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJ0aXRsZVwiOiBcIlx1RDgzQ1x1RERGOVx1RDgzQ1x1RERFRCBUaGFpXCIsXG4gICAgICBcInZhbHVlXCI6IFwiVGhhaVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcInRpdGxlXCI6IFwiXHVEODNDXHVEREY5XHVEODNDXHVEREY3IFR1cmtpc2hcIixcbiAgICAgIFwidmFsdWVcIjogXCJUdXJraXNoXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERkFcdUQ4M0NcdURERTYgVWtyYWluaWFuXCIsXG4gICAgICBcInZhbHVlXCI6IFwiVWtyYWluaWFuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwidGl0bGVcIjogXCJcdUQ4M0NcdURERjVcdUQ4M0NcdURERjAgVXJkdVwiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIlVyZHVcIlxuICAgIH1cbiAgXVxufVxuIiwgIi8vLyBIZWxwZXIgZmlsZSB3aXRoIGRlcGVuZGVuY2llc1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRTdXBwb3J0UGF0aCA9ICgpID0+IHtcbiAgcmV0dXJuIGVudmlyb25tZW50LnN1cHBvcnRQYXRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEFzc2V0c1BhdGggPSAoKSA9PiB7XG4gIHJldHVybiBlbnZpcm9ubWVudC5hc3NldHNQYXRoO1xufTtcbiIsICIvLyBVdGlsaXR5IGZvciBkeW5hbWljYWxseSB0aHJvdHRsaW5nIGFueSBmdW5jdGlvbi5cbi8vIFRoaXMgaXMgYSBtb3JlIHBvd2VyZnVsIHZlcnNpb24gb2YgbG9kYXNoLnRocm90dGxlOlxuLy8gLSBZb3UgY2FuIGNob29zZSB0byBzcGVjaWZ5IHNpbXBseSBhIGRlbGF5LCBtYWtpbmcgaXQgdGhlIHNhbWUgYXMgbG9kYXNoLnRocm90dGxlXG4vLyAtIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IGEgZGVsYXkgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIHRoZSB0aHJvdHRsaW5nIGRlbGF5XG4vLyBBZGRpdGlvbmFsbHksIHNvbWUgc3BlY2lmaWMgdGhyb3R0bGluZyBmdW5jdGlvbnMgYXJlIGF2YWlsYWJsZSBoZXJlLCB3aGljaCBhcmUgdXNlZCBpbiB0aGUgZXh0ZW5zaW9uLlxuXG5pbXBvcnQgX3Rocm90dGxlIGZyb20gXCJsb2Rhc2gudGhyb3R0bGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGhyb3R0bGUoZiwgeyBkZWxheSA9IDAsIGRlbGF5RnVuY3Rpb24gPSBudWxsLCAuLi5vcHRpb25zIH0gPSB7fSkge1xuICBsZXQgZGVsYXlfbXMgPSBkZWxheTtcblxuICBsZXQgX19oYW5kbGVyID0gX3Rocm90dGxlKGYsIGRlbGF5X21zLCBvcHRpb25zKTtcblxuICAvLyBUaGlzIGlzIHRoZSBmdW5jdGlvbiB3ZSdsbCByZXR1cm5cbiAgbGV0IGhhbmRsZXIgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGxldCByZXN1bHQgPSBfX2hhbmRsZXIoLi4uYXJncyk7XG5cbiAgICAvLyB1cGRhdGUgZGVsYXlcbiAgICBpZiAoZGVsYXlGdW5jdGlvbikge1xuICAgICAgbGV0IG5ld19kZWxheV9tcyA9IGRlbGF5RnVuY3Rpb24oZGVsYXlfbXMsIHsgYXJncywgcmVzdWx0IH0pO1xuXG4gICAgICBpZiAobmV3X2RlbGF5X21zICE9PSBkZWxheV9tcykge1xuICAgICAgICBfX2hhbmRsZXIuZmx1c2goKTtcbiAgICAgICAgX19oYW5kbGVyID0gX3Rocm90dGxlKGYsIG5ld19kZWxheV9tcywgb3B0aW9ucyk7XG5cbiAgICAgICAgZGVsYXlfbXMgPSBuZXdfZGVsYXlfbXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBoYW5kbGVyLmZsdXNoID0gKCkgPT4ge1xuICAgIHJldHVybiBfX2hhbmRsZXIuZmx1c2goKTtcbiAgfTtcblxuICByZXR1cm4gaGFuZGxlcjtcbn1cblxuZXhwb3J0IGNvbnN0IEFJQ2hhdERlbGF5RnVuY3Rpb24gPSAoeyBkZWxheSA9IDMwLCBtYXhfZGVsYXkgPSAyMDAwMCwgbGVuZ3RoX2xpbWl0ID0gNTAwLCBtdWx0aXBsaWVyID0gMS41IH0gPSB7fSkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKGRlbGF5X21zLCB7IGFyZ3MgfSkge1xuICAgIGRlbGF5ID0gTWF0aC5tYXgoZGVsYXlfbXMsIDMwKTtcbiAgICBsZXQgbmV3X21lc3NhZ2UgPSBhcmdzWzBdO1xuICAgIC8vIERldGVybWluZSBpZiB3ZSBzaG91bGQgaW5jcmVhc2UgdGhlIGludGVydmFsXG4gICAgaWYgKG5ld19tZXNzYWdlPy5sZW5ndGggPiBsZW5ndGhfbGltaXQgJiYgZGVsYXkgPCBtYXhfZGVsYXkpIHtcbiAgICAgIGRlbGF5ICo9IG11bHRpcGxpZXI7XG4gICAgICBsZW5ndGhfbGltaXQgKj0gbXVsdGlwbGllcjtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGAke25ld19tZXNzYWdlLmxlbmd0aH0gY2hhcnMsICR7bGVuZ3RoX2xpbWl0fSwgaW5jcmVhc2luZyBkZWxheSB0byAke2RlbGF5fWApO1xuICAgIH1cbiAgICByZXR1cm4gZGVsYXk7XG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLDBDQUFBQSxVQUFBQyxTQUFBO0FBVUEsUUFBSSxrQkFBa0I7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QUFRLGdCQUFnQixHQUFHLElBQUk7QUFBQSxRQUM3QixPQUFPQyxNQUFLQyxXQUFVO0FBQ3BCLGdCQUFNLFFBQVEsTUFBTUQsTUFBS0MsTUFBSztBQUFBLFFBRWhDO0FBQUEsUUFDQSxFQUFFLE9BQU8sVUFBVSxVQUFVLEtBQUs7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFFQSxZQUFRLGdCQUFnQixHQUFHLEVBQUUsS0FBSyxLQUFLO0FBQUEsRUFDekM7QUFBQTtBQUFBLEVBR0EscUJBQXFCLE9BQU8sUUFBUTtBQUNsQyxRQUFJLFFBQVEsZ0JBQWdCLEdBQUcsR0FBRztBQUNoQyxjQUFRLGdCQUFnQixHQUFHLEVBQUUsTUFBTTtBQUNuQyxhQUFPLFFBQVEsZ0JBQWdCLEdBQUc7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFDRjs7O0FEN01BLElBQUFDLGNBQWtFO0FBRWxFLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFNBQ0UscUJBQUMsK0JBQ0M7QUFBQSxRQUFDLG1CQUFPO0FBQUEsUUFBUDtBQUFBLFVBQ0MsT0FBTTtBQUFBLFVBQ04sVUFBVSxPQUFPLFdBQVc7QUFDMUIsa0JBQU0sUUFBUSxNQUFNLE9BQU8sS0FBSyxPQUFPLEtBQUs7QUFDNUMsc0JBQU0sdUJBQVUsa0JBQU0sTUFBTSxTQUFTLE9BQU87QUFBQSxVQUM5QztBQUFBO0FBQUEsTUFDRixDQUNGO0FBQUE7QUFBQSxJQUdGLHFCQUFDLGlCQUFLLFdBQUwsRUFBZSxJQUFHLE9BQU0sT0FBTSxPQUFNO0FBQUEsSUFDckMscUJBQUMsaUJBQUssV0FBTCxFQUFlLElBQUcsU0FBUSxPQUFNLFNBQVE7QUFBQSxFQUMzQztBQUVKO0FBRWUsU0FBUixXQUE0QjtBQUNqQyxTQUNFLHFCQUFDLHdCQUNDLHFCQUFDLGlCQUFLLFNBQUwsRUFBYSxPQUFNLGFBQ2xCO0FBQUEsSUFBQyxpQkFBSztBQUFBLElBQUw7QUFBQSxNQUNDLE9BQU07QUFBQSxNQUNOLFNBQ0UscUJBQUMsK0JBQ0MscUJBQUMsbUJBQU8sTUFBUCxFQUFZLFFBQVEscUJBQUMsZ0JBQVcsR0FBSSxPQUFNLGVBQWMsQ0FDM0Q7QUFBQTtBQUFBLEVBRUosQ0FDRixDQUNGO0FBRUo7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAibW9kdWxlIiwgInJlc3VsdCIsICJ0aHJvdHRsZSIsICJpbXBvcnRfYXBpIiwgImltcG9ydF9hcGkiLCAiX3Rocm90dGxlIiwgImZzIiwgImtleSIsICJ2YWx1ZSIsICJpbXBvcnRfYXBpIl0KfQo=
