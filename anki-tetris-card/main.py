from aqt import mw, gui_hooks, reviewer
from pathlib import Path
import json
from . import constants

card_fields = {
  "Queue": "A queue satisfying extended sfinder notation.",
  "Field": "A fumen with one page for the initial state of the board, empty implies an empty board.",
  "Goal": "A description of the goal.",
  "Answer": "A (multipage) fumen for the accepted final state(s) of the board.",
  "Refill Bags": "Continue providing pieces after queue with bags. (T/F) ",
}

config = mw.addonManager.getConfig(__name__)
config_json = json.dumps(config)
parameters = {
  "pattern": "{{Queue}}",
  "initialFumen": "{{Field}}",
  "targetFumen": "{{Answer}}",
  "fillBag": "{{Refill Bags}}",
}
parameters_json = json.dumps(parameters)

addon_dir = Path(__file__).parent
html = (addon_dir / "web" / "index.html").read_text(encoding="utf-8")

mw.addonManager.setWebExports(__name__, r"web/.*")

addon_package = mw.addonManager.addonFromModule(__name__)
asset_url = f"/_addons/{constants.ADDON_NAME}/web"

html = html.replace('href="style.css"', f'href="{asset_url}/style.css"')
html = html.replace('src="app.js"', f'src="{asset_url}/app.js"')

# inject config into the html
config_script = f"""
<script>
    window.config = {config_json};
    window.parameters = {parameters_json};
</script>
"""

html = html.replace("</head>", config_script + "\n</head>")


def setup_tetris_card():
  # type guard
  if mw.col is None:
    raise RuntimeError(
      "Collections has not been populated yet, make sure to use a hook after it been populated"
    )
  models = mw.col.models

  models.by_name("Tetris")

  # check if Tetris card already exists
  note_type = models.by_name("Tetris")
  if note_type is None:
    note_type = models.new("Tetris")

    # add fields to card type
    for name, description in card_fields.items():
      field = models.new_field(name)
      field["description"] = description
      models.add_field(note_type, field)

    template = models.new_template("Tetris")
    template["qfmt"] = html

    models.add_template(note_type, template)

    # Register it in the collection
    models.add(note_type)

  # Update the existing card template.
  template = note_type["tmpls"][0]
  template["qfmt"] = html
  template["afmt"] = """
  {{FrontSide}}
  <hr id="answer">
  <h3>Reference answer</h3>
  {{Answer}}
  """

  mw.col.models.update_dict(note_type)


gui_hooks.profile_did_open.append(setup_tetris_card)


def on_js_message(handled, message, context):
  if not isinstance(context, reviewer.Reviewer):
    return handled

  if message == "tetris:answer":
    context._showAnswer()
    return (True, None)

  return handled


gui_hooks.webview_did_receive_js_message.append(on_js_message)
