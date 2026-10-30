"use strict";
(() => {
  // src/settings.ts
  var controlList = document.querySelector("#controls");
  var tuningList = document.querySelector("#tuning");
  var controlTemplate = document.querySelector("#control-template");
  var tuningTemplate = document.querySelector("#tuning-template");
  if (!controlList || !tuningList || !controlTemplate || !tuningTemplate) {
    throw new Error("Required HTML elements are missing");
  }
  window.initializeSettings = function(config) {
    for (const [control, key] of Object.entries(config.controls)) {
      const row = document.importNode(controlTemplate.content, true);
      const name = row.querySelector(".control-name");
      const input = row.querySelector(".control-key");
      name.textContent = control;
      input.value = key;
      input.addEventListener("keydown", (event) => {
        event.preventDefault();
        let code = event.code;
        if (event.shiftKey && !event.code.startsWith("Shift")) code = "Shift+" + code;
        if (event.altKey && !event.code.startsWith("Alt")) code = "Alt+" + code;
        if (event.ctrlKey && !event.code.startsWith("Control")) code = "Ctrl+" + code;
        if (code == "Backspace") {
          code = "<nop>";
        }
        pycmd(`save-config:controls-${control}-${code}`);
        input.value = code;
      });
      controlList.appendChild(row);
    }
    for (const [tuning, value] of Object.entries(config.tuning)) {
      const row = document.importNode(tuningTemplate.content, true);
      const name = row.querySelector(".tuning-name");
      const input = row.querySelector(".tuning-input");
      name.textContent = tuning;
      input.valueAsNumber = value;
      input.addEventListener("selectionchange", (event) => {
        const input2 = event.target;
        if (Number.isNaN(input2.valueAsNumber)) return;
        if (input2.valueAsNumber < 0) {
          input2.valueAsNumber = 0;
        }
        pycmd(`save-config:tuning-${tuning}-${input2.valueAsNumber}`);
      });
      tuningList.appendChild(row);
    }
  };
})();
