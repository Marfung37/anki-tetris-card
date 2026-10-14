from aqt import mw
from pathlib import Path

global ADDON_NAME, ADDON_TITLE, ADDON_PATH

ADDON_NAME = "anki-tetris-card"
ADDON_TITLE = mw.addonManager.addon_meta(ADDON_NAME).provided_name
ADDON_PATH = Path(__file__).parent.absolute().as_posix()
