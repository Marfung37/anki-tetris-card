from aqt import mw
from aqt.qt import QDialog, QVBoxLayout, QUrl, QDesktopServices, QWebEnginePage
from aqt.webview import AnkiWebPage, AnkiWebView
import json

# set files in web/* to be accessible from anki
mw.addonManager.setWebExports(__name__, r"web/.*")


# overwrite acceptNavigationRequest to have browser to open those links rather than the dialog
class SettingsWebPage(AnkiWebPage):
  def acceptNavigationRequest(self, url, navType, isMainFrame):
    if navType == QWebEnginePage.NavigationType.NavigationTypeLinkClicked:
      QDesktopServices.openUrl(url)
      return False

    return super().acceptNavigationRequest(url, navType, isMainFrame)


class SettingsDialog(QDialog):
  def __init__(self):
    super().__init__(mw)
    self.setWindowTitle("Tetris Settings")
    self.resize(500, 400)

    layout = QVBoxLayout(self)
    self.web = AnkiWebView(self)
    self.web.setPage(SettingsWebPage(self.web._onBridgeCmd, self.web.kind, self))
    layout.addWidget(self.web)

    # set handler when settings.js runs pycmd
    self.web.set_bridge_command(self.handle_command, self)

    # run on start up
    self.web.loadFinished.connect(self.on_page_loaded)

    self.web.set_open_links_externally(False)

    url = QUrl(
      f"{mw.serverURL()}_addons/"
      f"{mw.addonManager.addonFromModule(__name__)}/web/settings.html"
    )
    self.web.load_url(url)

  def on_page_loaded(self, ok: bool):
    if not ok:
      return

    # workaround for getting config to javascript
    config = mw.addonManager.getConfig(__name__)
    config_json = json.dumps(config)
    self.web.eval(f"window.initializeSettings({config_json})")

  def handle_command(self, message: str):
    # to change config, format save-config:<controls | tuning>-<key>-<value>
    if message.startswith("save-config:"):
      try:
        config = mw.addonManager.getConfig(__name__)
        if config is None:
          raise RuntimeError("No config file could be found")

        config_type, key, value = message[len("save-config:") :].split("-")

        # valuation
        if config_type not in ["controls", "tuning"]:
          raise ValueError("Config Type must either be controls or tuning")
        if key not in set(config[config_type].keys()):
          raise ValueError(f"Invalid key for configuring {config_type}")

        if config_type == "tuning":
          value = int(value)

        config[config_type][key] = value

        mw.addonManager.writeConfig(__name__, config)
        return {"success": True}
      except (RuntimeError, ValueError) as e:
        return {"success": False, "error": str(e)}


def show_settings_config():
  dialog = SettingsDialog()
  dialog.exec()


# show this dialog when trying to open config of add on
mw.addonManager.setConfigAction(__name__, show_settings_config)
