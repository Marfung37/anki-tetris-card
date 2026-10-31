from aqt import mw, gui_hooks, reviewer
from pathlib import Path
import json
from html import unescape
import re
from . import constants

card_fields = {
  "Queue": "A pattern satisfying extended sfinder notation.",
  "Field": "A fumen with one page for the initial state of the board, empty implies an empty board.",
  "Goal": "A description of the goal.",
  "Answer": "An newline separated list of (multipage) fumens for the accepted final state(s) of the board.",
  "Cover Description": "A description of the queue pattern",
  "Refill Bags": "Continue providing pieces after queue with bags. (T/F)",
  "Bag Pattern": "General queue pattern ending with a full bag. Ex: *p4,*p7",
  "Cover Mask": "Hex string of which queues are valid, empty implies all queues are valid.",
}


mw.addonManager.setWebExports(__name__, r"web/.*")


def setup_html():

  addon_dir = Path(__file__).parent
  html = (addon_dir / "web" / "index.html").read_text(encoding="utf-8")

  asset_url = f"/_addons/{constants.ADDON_NAME}/web"

  html = html.replace('href="style.css"', f'href="{asset_url}/style.css"')
  html = html.replace('src="app.js"', f'src="{asset_url}/app.js"')

  return html


def setup_back_html():
  addon_dir = Path(__file__).parent
  html = (addon_dir / "web" / "back.html").read_text(encoding="utf-8")

  return html


def setup_tetris_card():
  """Setup the template for card"""
  # type guard
  if mw.col is None:
    raise RuntimeError(
      "Collections has not been populated yet, make sure to use a hook after it been populated"
    )
  models = mw.col.models

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

    template["qfmt"] = setup_html()
    template["afmt"] = setup_back_html()
    models.add_template(note_type, template)

    # Register it in the collection
    models.add(note_type)
    return

  for name, description in card_fields.items():
    found = False
    for field in note_type["flds"]:
      if field["name"] == name:
        field["description"] = description
        found = True
        break
    if not found:
      field = models.new_field(name)
      field["description"] = description
      models.add_field(note_type, field)

  # Update the existing card template.
  template = note_type["tmpls"][0]
  template["qfmt"] = setup_html()
  template["afmt"] = setup_back_html()

  mw.col.models.update_dict(note_type)


def populate_config(html, card, context):
  """Provide web interface the tetris config"""
  if card.note_type()["name"] != "Tetris":
    return html

  config = mw.addonManager.getConfig(__name__)
  config_json = json.dumps(config)

  # inject config into the html
  script = f"""
  <script>
      window.config = {config_json};
  </script>
  """

  return html.replace("<!-- CONFIG -->", script)


def populate_side(html, card, context):
  """Provide web interface if anki is on front or back of card"""
  if card.note_type()["name"] != "Tetris":
    return html
  if context not in ("reviewQuestion", "reviewAnswer"):
    return html

  side = "back" if context == "reviewAnswer" else "front"
  script = f"""
  <script>
      window.ankiCardSide = "{side}";
  </script>
  """

  return html.replace("<!-- ANKI CARD SIDE -->", script)


def populate_parameters(html, card, context):
  """Populate the window.parameters field with decoded/santized html"""
  if card.note_type()["name"] != "Tetris":
    return html

  note = card.note()

  parameters = {
    "pattern": unescape(note["Queue"]),
    "initialFumen": unescape(note["Field"]) or None,
    "targetFumens": re.split(r"<br\s*/?>", unescape(note["Answer"])),
    "fillBag": unescape(note["Refill Bags"]) == "T",
    "coverMask": unescape(note["Cover Mask"]) or None,
    "bagEndedPattern": unescape(note["Bag Pattern"]) or None,
  }

  payload = json.dumps(parameters, ensure_ascii=False)

  # Prevent field contents from being interpreted as HTML/script markup.
  payload = (
    payload.replace("&", "\\u0026").replace("<", "\\u003c").replace(">", "\\u003e")
  )

  script = f"<script>window.parameters = {payload};</script>"

  return html.replace("<!-- TETRIS PARAMETERS -->", script)


def on_js_message(handled, message, context):
  """Event handling when web interface says user solve"""
  if not isinstance(context, reviewer.Reviewer):
    return handled

  if message == "tetris:answer":
    context._showAnswer()
    return (True, None)

  return handled


gui_hooks.profile_did_open.append(setup_tetris_card)
gui_hooks.card_will_show.append(populate_config)
gui_hooks.card_will_show.append(populate_side)
gui_hooks.card_will_show.append(populate_parameters)
gui_hooks.webview_did_receive_js_message.append(on_js_message)
