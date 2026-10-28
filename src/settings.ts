const controlList = document.querySelector<HTMLTableSectionElement>('#controls');
const tuningList = document.querySelector<HTMLTableSectionElement>('#tuning');
const controlTemplate = document.querySelector<HTMLTemplateElement>('#control-template');
const tuningTemplate = document.querySelector<HTMLTemplateElement>('#tuning-template');

// type guard
if (!controlList || !tuningList || !controlTemplate || !tuningTemplate) {
  throw new Error('Required HTML elements are missing');
}

interface Config {
  controls: Record<string, string>;
  tuning: Record<string, number>;
}

window.initializeSettings = function (config: Config) {
  for (const [control, key] of Object.entries(config.controls)) {
    const row = document.importNode(controlTemplate.content, true);

    const name = row.querySelector('.control-name') as HTMLTableCellElement;
    const input = row.querySelector('.control-key') as HTMLInputElement;

    name.textContent = control;
    input.value = key;

    input.addEventListener('keydown', (event) => {
      event.preventDefault();

      let code = event.code;
      if (event.shiftKey && !event.code.startsWith("Shift")) code = "Shift+" + code;
      if (event.altKey && !event.code.startsWith("Alt")) code = "Alt+" + code;
      if (event.ctrlKey && !event.code.startsWith("Control")) code = "Ctrl+" + code;

      if (code == "Backspace") {
        code = "<nop>"
      }

      pycmd(`save-config:controls-${control}-${code}`);

      input.value = code;
    });

    controlList.appendChild(row);
  }
  for (const [tuning, value] of Object.entries(config.tuning)) {
    const row = document.importNode(tuningTemplate.content, true);

    const name = row.querySelector('.tuning-name') as HTMLTableCellElement;
    const input = row.querySelector('.tuning-input') as HTMLInputElement;

    name.textContent = tuning;
    input.valueAsNumber = value;

    input.addEventListener('selectionchange', (event) => {
      const input = event.target as HTMLInputElement;
      if (Number.isNaN(input.valueAsNumber)) return;
      if (input.valueAsNumber < 0) {
        input.valueAsNumber = 0;
      }

      pycmd(`save-config:tuning-${tuning}-${input.valueAsNumber}`);
    });

    tuningList.appendChild(row);
  }
};
