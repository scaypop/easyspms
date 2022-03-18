"use strict";
import common from "./utils/common.js";
import storage from "./utils/storage.js";
import {
  keyboardCss,
  virtualKeyboard,
} from "./virtualKeyboard/virtualKeyboard.js";
import {
  keyboardNavigation,
  keyboardNavCss,
} from "./keyboardNavigation/keyboardNavigation.mjs";
import disabledUnsupportedFeatures from "../src/disabledUnsupportedFeatures/disabledUnsupportedFeatures.mjs";
import disableUnsupportedModules from "../src/disableUnsupportedModules/disableUnsupportedModules.mjs";
import parseKeys from "../src/parseKeys/parseKeys.mjs";
import runHotkey from "../src/parseKeys/runHotkey.mjs";
import resetLineHeight from "../src/fontAdjustment/resetLineHeight.mjs";
import resetTextSpace from "../src/fontAdjustment/resetTextSpace.mjs";
import resetTextSize from "../src/fontAdjustment/resetTextSize.mjs";
import fontFallback from "../src/fontAdjustment/fontFallback.mjs";
import initFontSize from "../src/fontAdjustment/initFontSize.mjs";
import alterLineHeight from "../src/fontAdjustment/alternateLineHeight.mjs";
import alterTextSpace from "../src/fontAdjustment/alternateTextSpace.mjs";
import alterTextSize from "../src/fontAdjustment/alternateTextSize.mjs";
import linkHighlight from "../src/linkHighlight/linkHighlight.mjs";
import textToSpeech from "../src/textToSpeech/textToSpeech.mjs";
import addListeners from "../src/addListeners/addListeners.mjs";

// const fonts = ['https://fonts.googleapis.com/icon?family=Material+Icons'];
// common.injectIconsFont(fonts);
// Default options
let _options = {
  icon: {
    position: {
      bottom: { size: 50, units: "px" },
      left: { size: 10, units: "px" },
      type: "fixed",
    },
    dimensions: {
      width: { size: 50, units: "px" },
      height: { size: 50, units: "px" },
    },
    zIndex: "9999",
    backgroundColor: "#4054b2",
    color: "#fff",
    circular: false,
    circularBorder: false,
    fontFaceSrc: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
    fontFamily: "Material+Icons",
    fontClass: "material-icons",
    useEmojis: false,
  },
  hotkeys: {
    enabled: true,
    helpTitles: true,
    keys: {
      toggleMenu: ["ctrlKey", "altKey", 65], // Toggle Menu	CTRL + ALT + A
      invertColors: ["ctrlKey", "altKey", 73], //invertColors CTRL + ALT + I
      grayHues: ["ctrlKey", "altKey", 71], // Gray Hues	CTRL + ALT + G
      linkHighlight: ["ctrlKey", "altKey", 85], // Underline Links	CTRL + ALT + U
      bigCursor: ["ctrlKey", "altKey", 67], // Big Cursor	CTRL + ALT + C
      readingGuide: ["ctrlKey", "altKey", 82], // Reading Guide	CTRL + ALT + R
      textToSpeech: ["ctrlKey", "altKey", 84], // Text To Speech	CTRL + ALT + T
      speechToText: ["ctrlKey", "altKey", 83], // Speech To Text	CTRL + ALT + S
    },
  },
  buttons: {
    font: { size: 16, units: "px" },
  },
  guide: {
    cBorder: "#20ff69",
    cBackground: "#000000",
    height: "12px",
  },
  menu: {
    dimensions: {
      width: { size: 27, units: "vw" },
      height: { size: 100, units: "vh" },
    },
    fontFamily: "RobotoDraft, Roboto, sans-serif, Arial",
  },
  labels: {
    resetTitle: "Redefinir",
    closeTitle: "Fechar",
    menuTitle: "Opções de accessibilidade",
    keyboardNav: "Navegação por Teclado 2x click",
    increaseText: "Aumentar texto",
    decreaseText: "Diminuir texto",
    increaselineHeight: "Aumentar expaço entre linhas",
    decreaselineHeight: "Diminuir expaço entre linhas",
    increaseTextSpacing: "Aumentar expaço do texto",
    decreaseTextSpacing: "Diminuir expaço do texto",
    invertColors: "Invertir cores",
    grayHues: "Modo mono-cromatico",
    bigCursor: "Aumentar Cursor",
    readingGuide: "Guia de leitura",
    linkHighlight: "Destaque e inks",
    textToSpeech: "Leia Texto",
    speechToText: "speech to text",
  },
  // textToSpeechLang: "pt-PT",
  speechToTextLang: "pt-PT",
  textPixelMode: false,
  textEmlMode: true,
  animations: {
    buttons: true,
  },
  modules: {
    keyboardNav: true,
    increaseText: true,
    decreaseText: true,
    increaselineHeight: true,
    decreaselineHeight: true,
    increaseTextSpacing: true,
    decreaseTextSpacing: true,
    invertColors: true,
    grayHues: true,
    bigCursor: true,
    readingGuide: true,
    linkHighlight: true,
    textToSpeech: true,
    speechToText: true,
  },
  session: {
    persistent: true,
  },
};

let self = null;
export class Accessibility {
  constructor(options = {}) {
    self = this;
    this.options = common.extend(_options, options);
    // Consider adding this:
    if (options) {
      if (
        !options.textToSpeechLang &&
        document.querySelector("html").getAttribute("lang")
      ) {
        this.options.textToSpeechLang = document
          .querySelector("html")
          .getAttribute("lang");
      }
    }

    disabledUnsupportedFeatures(this);
    this.sessionState = {
      keyboardNav: false,
      callTecladoVirtual: false,
      textSize: 0,
      lineHeight: 0,
      textSpace: 0,
      invertColors: false,
      grayHues: false,
      linkHighlight: false,
      bigCursor: false,
      readingGuide: false,
    };
    if (this.options.icon.useEmojis) {
      fontFallback(this);
      this.build();
    } else {
      common.injectIconsFont(this.options.icon.fontFaceSrc, () => {
        this.build();
        if (!this.options.icon.forceFont) {
          common.isFontLoaded(this.options.icon.fontFamily, (isLoaded) => {
            if (!isLoaded) {
              common.warn(
                `${this.options.icon.fontFamily} font was not loaded, using emojis instead`
              );
              fontFallback(this);
              this.destroyAll();
              this.build();
            }
          });
        }
      });
    }
  }

  //injetar estilos
  injectCss() {
    let css =
      `
      ${keyboardCss}
      ${keyboardNavCss}
        ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }
        ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {
            width: 6px;
            background-color: #F5F5F5;
        }
        ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {
            background-color: #999999;
        }
        ._access-icon {
            position: fixed;
            background-repeat: no-repeat;
            background-size: contain;
            cursor: pointer;
            opacity: 0;
            transition-duration: .5s;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            box-shadow: 1px 1px 5px rgba(0,0,0,.5);
            transform: scale(1);
        }
        ._access-icon:hover {
            box-shadow: 1px 1px 10px rgba(0,0,0,.9);
            transform: scale(1.1);
        }
        .circular._access-icon {
            border-radius: 50%;
            border: .5px solid white;
        }
        ` +
      (this.options.animations.buttons && this.options.icon.circularBorder
        ? `
        .circular._access-icon:hover {
            border: 5px solid white;
            border-style: double;
            font-size: 35px!important;
            vertical-align: middle;
            padding-top: 2px;
            text-align: center;
        }
        `
        : "") +
      `
        .access_read_guide_bar{
            box-sizing: border-box;
            background: ${this.options.guide.cBackground};
            width: 100%!important;
            min-width: 100%!important;
            position: fixed!important;
            height: ${this.options.guide.height} !important;
            border: solid 3px ${this.options.guide.cBorder};
            border-radius: 5px;
            top: 15px;
            z-index: 2147483647;
        }
        .access-high-contrast *{
            background-color: #000 !important;
            background-image: none !important;
            border-color: #fff !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            color: #fff !important;
            text-indent: 0 !important;
            text-shadow: none !important;
        }
        ._access-menu {
          box-sizing:border-box;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: fixed;
            width: ${
              this.options.menu.dimensions.width.size +
              this.options.menu.dimensions.width.units
            };
            height: ${
              this.options.menu.dimensions.height.size +
              this.options.menu.dimensions.height.units
            };
            transition-duration: .5s;
            z-index: ${this.options.icon.zIndex + 1};
            opacity: 1;
            background-color: #fff;
            color: #000;
            border-radius: 3px;
            border: solid 1px #f1f0f1;
            font-family: ${this.options.menu.fontFamily};
            min-width: 300px;
            box-shadow: 0px 0px 1px #aaa;
            max-height: 100vh;
            overflow: auto;
            ${
              getComputedStyle(this.body).direction == "rtl"
                ? "text-indent: -5px"
                : ""
            }
        }
        ._access-menu.close {
            z-index: -1;
            width: 0;
            opacity: 0;
            background-color: transparent;
        }
        ._access-menu.bottom {
            bottom: 0;
        }
        ._access-menu.top {
            top: 0;
        }
        ._access-menu.left {
            left: 0;
        }
        ._access-menu.close.left {
            left: -${
              this.options.menu.dimensions.width.size +
              this.options.menu.dimensions.width.units
            };
        }
        ._access-menu.right {
            right: 0;
        }
        ._access-menu.close.right {
            right: -${
              this.options.menu.dimensions.width.size +
              this.options.menu.dimensions.width.units
            };
        }
        ._access-menu ._text-center {
            text-align: center;
        }
        ._access-menu h3 {
            font-size: 20px !important;
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 0;
            color: rgba(0,0,0,.87);
            line-height: initial!important;
            letter-spacing: initial!important;
            word-spacing: initial!important;
        }
        ._access-menu ._menu-close-btn {
            left: 5px;
            color: #d63c3c;
            transition: .3s ease;
            line-height: initial!important;
            transform: rotate(0deg);
        }
        ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {
            ${
              this.options.animations.buttons
                ? "transform: rotate(180deg);"
                : ""
            }
        }
        ._access-menu ._menu-reset-btn {
            right: 5px;
            color: #4054b2;
            transition: .3s ease;
            line-height: initial!important;
            transform: rotate(0deg);
        }
        ._access-menu ._menu-btn {
            position: absolute;
            top: 5px;
            cursor: pointer;
            font-size: 24px !important;
            font-weight: bold;
        }
        ._access-menu ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          flex-direction: row;
          padding: 1rem;
          position: relative;
          font-size: 12px !important;
          margin: 0;
          line-height: initial!important;
          overflow: auto;
        }
        html._access_cursor * {
            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;
        }
        ._access-menu ul li {
          display:inline;
            list-style-type: none;
            cursor: pointer;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            height: 80px;
            width:100px;
            border: solid 1px #f1f0f1;
            padding: 5px;
            margin: 10px auto;
            border-radius: 4px;
            text-align: center;
            transition-duration: .5s;
            transition-timing-function: ease-in-out;
            font-size: ${
              this.options.buttons.font.size + this.options.buttons.font.units
            } !important;
            
            text-indent: 5px;
            background: #f9f9f9;
            color: rgba(0,0,0,.6);
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
            line-height: initial!important;
            letter-spacing: initial!important;
            word-spacing: initial!important;
        }
        ._access-menu ul.before-collapse li {
            opacity: 0.05;
        }
        ._access-menu ul li.active, ._access-menu ul li.active:hover {
            color: #fff;
            background-color: #000;
        }
        ._access-menu ul li:hover {
            color: rgba(0,0,0,.8);
            background-color: #eaeaea;
        }
        ._access-menu ul li.not-supported {
            display: none;
        }

        ._access-menu ul li svg path {
            fill: rgba(0,0,0,.6);
        }
        ._access-menu ul li:hover svg path {
            fill: rgba(0,0,0,.8);
        }
        ._access-menu ul li.active svg path {
            fill: #fff;
        }
        ._access-menu ul li:hover:before {
            color: rgba(0,0,0,.8);
        }
        ._access-menu ul li.active:before {
            color: #fff;
        }
        `;
    let className = "_access-main-css";
    common.injectStyle(css, { className: className });
    common.deployedObjects.set("." + className, false);
  }

  injectIcon() {
    // culculations for incon`s:font size,  line height and text indent, based on whidth of the icon
    let width = 60;
    let fontSize = width * 0.8;
    let lineHeight = width * 0.9;
    let textIndent = width * 0.1;
    let iconStyles = `
            width: ${width}px;
            height: auto;
            font-size: ${fontSize + "px"};
            line-height: ${lineHeight + "px"};
            text-indent: ${textIndent + "px"};
            background-color: aliceblue;
            color: "#fff";
            z-index: 10;
            type: "fixed";
            bottom: ${fontSize}px;
            left: ${fontSize}px;
    `;

    let className = `_access-icon _access circular`;
    let iconElem = common.jsonToHtml({
      type: "img",
      attrs: {
        src: "https://firebasestorage.googleapis.com/v0/b/fir-react-upload-bc250.appspot.com/o/images%2Feasy.svg?alt=media&token=22652293-8c96-440f-84fe-eeebc4f2c902",
        class: className,
        style: iconStyles,
        title: "Opções de accessibilidade",
      },
      children: [
        {
          type: "#text",
          text: "accessible",
        },
      ],
    });

    this.body.appendChild(iconElem);
    common.deployedObjects.set("._access-icon", false);
    return iconElem;
  }

  injectMenu() {
    let menuElem = common.jsonToHtml({
      type: "div",
      attrs: {
        class: "_access-menu close _access",
      },
      children: [
        {
          type: "div",
          attrs: {
            class: "_text-center sticky-top p-3 mb-2 bg-dark text-white",
          },
          children: [
            {
              type: "i",
              attrs: {
                class: `_menu-close-btn _menu-btn ${this.options.icon.fontClass}`,
                title: this.options.labels.closeTitle,
              },
              children: [
                {
                  type: "#text",
                  text: `${!this.options.icon.useEmojis ? "close" : "X"}`,
                },
              ],
            },
            {
              type: "#text",
              text: this.options.labels.menuTitle,
            },
            {
              type: "i",
              attrs: {
                class: `_menu-reset-btn _menu-btn ${this.options.icon.fontClass}`,
                title: this.options.labels.resetTitle,
              },
              children: [
                {
                  type: "#text",
                  text: `${!this.options.icon.useEmojis ? "refresh" : "♲"}`,
                },
              ],
            },
          ],
        },
        {
          type: "ul",
          attrs: {
            class: this.options.animations.buttons
              ? "before-collapse _access-scrollbar"
              : "_access-scrollbar",
          },
          children: [
            {
              type: "li",
              attrs: {
                "data-access-action": "keyboardNav",
                class: "btn_geral",
                id: "btn_keyboardnav",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.keyboardNav,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "decreaselineHeight",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.decreaselineHeight,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "increaselineHeight",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.increaselineHeight,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "increaseText",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.increaseText,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "decreaseText",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.decreaseText,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                id: "virtual-keyboard",
                "data-access-action": "tecladoVirtual",
              },
              children: [
                {
                  type: "#text",
                  text: "Teclado Virtual click 2x",
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "increaseTextSpacing",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.increaseTextSpacing,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "decreaseTextSpacing",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.decreaseTextSpacing,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "invertColors",
                title: parseKeys(this, this.options.hotkeys.keys.invertColors),
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.invertColors,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "grayHues",
                title: parseKeys(this, this.options.hotkeys.keys.grayHues),
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.grayHues,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "linkHighlight",
                title: parseKeys(this, this.options.hotkeys.keys.linkHighlight),
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.linkHighlight,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "bigCursor",
                title: parseKeys(this, this.options.hotkeys.keys.bigCursor),
              },
              children: [
                {
                  type: "div",
                  attrs: {
                    id: "iconBigCursor",
                  },
                },
                {
                  type: "#text",
                  text: this.options.labels.bigCursor,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "readingGuide",
                title: parseKeys(this, this.options.hotkeys.keys.readingGuide),
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.readingGuide,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "textToSpeech",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.textToSpeech,
                },
              ],
            },
            {
              type: "li",
              attrs: {
                "data-access-action": "speechToText",
              },
              children: [
                {
                  type: "#text",
                  text: this.options.labels.speechToText,
                },
              ],
            },
          ],
        },
      ],
    });

    for (let i in this.options.icon.position) {
      menuElem.classList.add(i);
    }

    this.body.appendChild(menuElem);

    common.deployedObjects.set("._access-menu", false);
    let closeBtn = document.querySelector("._access-menu ._menu-close-btn");
    closeBtn.addEventListener(
      "click",
      () => {
        this.toggleMenu();
      },
      false
    );
    let resetBtn = document.querySelector("._access-menu ._menu-reset-btn");
    resetBtn.addEventListener(
      "click",
      () => {
        this.resetAll();
      },
      false
    );

    return menuElem;
  }

  resetAll() {
    //window.location.reload();
    this.menuInterface.textToSpeech(true);
    this.menuInterface.speechToText(true);
    this.menuInterface.linkHighlight(true);
    this.menuInterface.grayHues(true);
    this.menuInterface.invertColors(true);
    this.menuInterface.bigCursor(true);
    this.menuInterface.readingGuide(true);
    resetLineHeight(this);
    resetTextSize(this);
    resetTextSpace(this);
    for (let i of document.querySelectorAll("._access-menu ul li.active")) {
      i.classList.remove("active");
    }
    // Following code, will destroy all Accessebility fiunctions. Including Icon amd side menu
    // this.destroy();
  }

  callTecladoVirtual() {
    virtualKeyboard();
  }
  callKeyboardNav() {
    keyboardNavigation();
  }

  speechToText() {
    if ("webkitSpeechRecognition" in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onstart = () => {
        // TODO red color on mic icon
        console.log("listening . . .");
        if (this.speechToTextTarget)
          this.speechToTextTarget.parentElement.classList.add(
            "_access-listening"
          );
        this.body.classList.add("_access-listening");
      };

      this.recognition.onend = () => {
        // this.body.classList.remove("_access-listening");
        //console.log('onend listening');
      };

      this.recognition.onresult = (event) => {
        ///console.log('onresult listening');
        let finalTranscript = "";
        if (typeof event.results == "undefined") {
          return;
        }
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
          // else {
          //     interim_transcript += event.results[i][0].transcript;
          // }
        }
        if (finalTranscript && this.speechToTextTarget) {
          this.speechToTextTarget.parentElement.classList.remove(
            "_access-listening"
          );
          if (
            this.speechToTextTarget.tagName.toLowerCase() == "input" ||
            this.speechToTextTarget.tagName.toLowerCase() == "textarea"
          ) {
            this.speechToTextTarget.value = finalTranscript;
          } else if (
            this.speechToTextTarget.getAttribute("contenteditable") != null
          ) {
            this.speechToTextTarget.innerText = finalTranscript;
          }
        }
      };
      this.recognition.lang = this.options.speechToTextLang;
      this.recognition.start();
    }
  }
  listen() {
    // let className = "_access-speech-to-text";
    window.event.preventDefault();
    window.event.stopPropagation();
    if (
      typeof self.recognition === "object" &&
      typeof self.recognition.stop === "function"
    )
      self.recognition.stop();

    self.speechToTextTarget = window.event.target;
    self.speechToText(window.event.target.innerText);
  }

  toggleMenu() {
    if (this.menu.classList.contains("close")) {
      if (this.options.animations && this.options.animations.buttons)
        setTimeout(() => {
          this.menu.querySelector("ul").classList.toggle("before-collapse");
        }, 500);
      setTimeout(() => {
        this.menu.classList.toggle("close");
      }, 10);
    } else {
      if (this.options.animations && this.options.animations.buttons) {
        setTimeout(() => {
          this.menu.classList.toggle("close");
        }, 500);
        setTimeout(() => {
          this.menu.querySelector("ul").classList.toggle("before-collapse");
        }, 10);
      } else {
        this.menu.classList.toggle("close");
      }
    }
  }

  build() {
    this.initialValues = {
      linkHighlight: false,
      textToSpeech: false,
      bigCursor: false,
      readingGuide: false,
      body: {},
      html: {},
    };
    this.body = document.body || document.getElementsByTagName("body")[0];
    this.html =
      document.documentElement || document.getElementsByTagName("html")[0];
    if (this.options.textEmlMode) {
      initFontSize(this);
    }
    this.injectCss();
    this.icon = this.injectIcon();
    this.menu = this.injectMenu();
    addListeners(this);
    disableUnsupportedModules(this);
    if (this.options.hotkeys.enabled) {
      document.onkeydown = function (e) {
        let act = Object.entries(self.options.hotkeys.keys).find(function (
          val
        ) {
          let pass = true;
          for (var i = 0; i < val[1].length; i++) {
            if (Number.isInteger(val[1][i])) {
              if (e.keyCode != val[1][i]) {
                pass = false;
              }
            } else {
              if (e[val[1][i]] == undefined || e[val[1][i]] == false) {
                pass = false;
              }
            }
          }
          return pass;
        });
        if (act != undefined) {
          runHotkey(self, act[0]);
        }
      };
    }
    //setMinHeight();

    this.icon.addEventListener(
      "click",
      () => {
        this.toggleMenu();
      },
      false
    );
    setTimeout(() => {
      this.icon.style.opacity = "1";
    }, 10);

    // if (window.SpeechSynthesisUtterance || window.speechSynthesis) {
    //     let voices = window.speechSynthesis.getVoices();
    // }
    this.updateReadGuide = function (e) {
      let newPos = 0;
      if (e.type == "touchmove") {
        newPos = e.changedTouches[0].clientY;
      } else {
        newPos = e.y;
      }
      document.getElementById("access_read_guide_bar").style.top =
        newPos - (parseInt(self.options.guide.height.replace("px")) + 5) + "px";
    };
    this.menuInterface = {
      increaselineHeight: () => {
        alterLineHeight(this, true);
      },
      decreaselineHeight: () => {
        alterLineHeight(this, false);
      },
      increaseText: () => {
        alterTextSize(this, true);
      },
      decreaseText: () => {
        alterTextSize(this, false);
      },
      linkHighlight: (destroy) => {
        linkHighlight(this, destroy);
      },
      increaseTextSpacing: () => {
        alterTextSpace(this, true);
      },
      decreaseTextSpacing: () => {
        alterTextSpace(this, false);
      },
      keyboardNav: () => {
        this.callKeyboardNav();
      },
      tecladoVirtual: () => {
        this.callTecladoVirtual();
      },
      invertColors: (destroy) => {
        if (typeof this.initialValues.html.backgroundColor === "undefined")
          this.initialValues.html.backgroundColor = getComputedStyle(
            this.html
          ).backgroundColor;
        if (typeof this.initialValues.html.color === "undefined")
          this.initialValues.html.color = getComputedStyle(this.html).color;

        if (destroy) {
          this.resetIfDefined(
            this.initialValues.html.backgroundColor,
            this.html.style,
            "backgroundColor"
          );
          this.resetIfDefined(
            this.initialValues.html.color,
            this.html.style,
            "color"
          );
          document
            .querySelector('._access-menu [data-access-action="invertColors"]')
            .classList.remove("active");
          this.initialValues.invertColors = false;
          this.sessionState.invertColors = this.initialValues.invertColors;
          this.onChange(true);
          this.html.style.filter = "";
          return;
        }

        document
          .querySelector('._access-menu [data-access-action="invertColors"]')
          .classList.toggle("active");
        this.initialValues.invertColors = !this.initialValues.invertColors;
        this.sessionState.invertColors = this.initialValues.invertColors;
        this.onChange(true);
        if (this.initialValues.invertColors) {
          if (this.initialValues.grayHues) this.menuInterface.grayHues(true);
          this.html.style.filter = "invert(1)";
        } else {
          this.html.style.filter = "";
        }
      },
      grayHues: (destroy) => {
        if (typeof this.initialValues.html.filter === "undefined")
          this.initialValues.html.filter = getComputedStyle(this.html).filter;
        if (typeof this.initialValues.html.webkitFilter === "undefined")
          this.initialValues.html.webkitFilter = getComputedStyle(
            this.html
          ).webkitFilter;
        if (typeof this.initialValues.html.mozFilter === "undefined")
          this.initialValues.html.mozFilter = getComputedStyle(
            this.html
          ).mozFilter;
        if (typeof this.initialValues.html.msFilter === "undefined")
          this.initialValues.html.msFilter = getComputedStyle(
            this.html
          ).msFilter;

        if (destroy) {
          document
            .querySelector('._access-menu [data-access-action="grayHues"]')
            .classList.remove("active");
          this.initialValues.grayHues = false;
          this.sessionState.grayHues = this.initialValues.grayHues;
          this.onChange(true);
          this.resetIfDefined(
            this.initialValues.html.filter,
            this.html.style,
            "filter"
          );
          this.resetIfDefined(
            this.initialValues.html.webkitFilter,
            this.html.style,
            "webkitFilter"
          );
          this.resetIfDefined(
            this.initialValues.html.mozFilter,
            this.html.style,
            "mozFilter"
          );
          this.resetIfDefined(
            this.initialValues.html.msFilter,
            this.html.style,
            "msFilter"
          );
          return;
        }

        document
          .querySelector('._access-menu [data-access-action="grayHues"]')
          .classList.toggle("active");
        this.initialValues.grayHues = !this.initialValues.grayHues;
        this.sessionState.grayHues = this.initialValues.grayHues;
        this.onChange(true);
        let val;
        if (this.initialValues.grayHues) {
          val = "grayscale(1)";
          if (this.initialValues.invertColors)
            this.menuInterface.invertColors(true);
        } else {
          val = "";
        }
        this.html.style.webkitFilter = val;
        this.html.style.mozFilter = val;
        this.html.style.msFilter = val;
        this.html.style.filter = val;
      },
      bigCursor: (destroy) => {
        if (destroy) {
          this.html.classList.remove("_access_cursor");
          document
            .querySelector('._access-menu [data-access-action="bigCursor"]')
            .classList.remove("active");
          this.initialValues.bigCursor = false;
          this.sessionState.bigCursor = false;
          this.onChange(true);
          return;
        }

        document
          .querySelector('._access-menu [data-access-action="bigCursor"]')
          .classList.toggle("active");
        this.initialValues.bigCursor = !this.initialValues.bigCursor;
        this.sessionState.bigCursor = this.initialValues.bigCursor;
        this.onChange(true);
        this.html.classList.toggle("_access_cursor");
      },
      readingGuide: (destroy) => {
        if (destroy) {
          if (document.getElementById("access_read_guide_bar") != undefined) {
            document.getElementById("access_read_guide_bar").remove();
          }
          document
            .querySelector('._access-menu [data-access-action="readingGuide"]')
            .classList.remove("active");
          this.initialValues.readingGuide = false;
          this.sessionState.readingGuide = this.initialValues.readingGuide;
          this.onChange(true);
          document.body.removeEventListener(
            "touchmove",
            this.updateReadGuide,
            false
          );
          document.body.removeEventListener(
            "mousemove",
            this.updateReadGuide,
            false
          );
          return;
        }
        document
          .querySelector('._access-menu [data-access-action="readingGuide"]')
          .classList.toggle("active");
        this.initialValues.readingGuide = !this.initialValues.readingGuide;
        this.sessionState.readingGuide = this.initialValues.readingGuide;
        this.onChange(true);
        if (this.initialValues.readingGuide) {
          let read = document.createElement("div");
          read.id = "access_read_guide_bar";
          read.classList.add("access_read_guide_bar");
          document.body.append(read);
          document.body.addEventListener(
            "touchmove",
            this.updateReadGuide,
            false
          );
          document.body.addEventListener(
            "mousemove",
            this.updateReadGuide,
            false
          );
        } else {
          if (document.getElementById("access_read_guide_bar") != undefined) {
            document.getElementById("access_read_guide_bar").remove();
          }
          document.body.removeEventListener(
            "touchmove",
            this.updateReadGuide,
            false
          );
          document.body.removeEventListener(
            "mousemove",
            this.updateReadGuide,
            false
          );
        }
      },
      textToSpeech: (destroy) => {
        textToSpeech(this, destroy);
      },
      speechToText: (destroy) => {
        // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
        this.onChange(false);
        let className = "_access-speech-to-text";
        let remove = () => {
          if (this.recognition) {
            this.recognition.stop();
            this.body.classList.remove("_access-listening");
          }
          let style = document.querySelector("." + className);
          if (style) {
            style.parentElement.removeChild(style);
            common.deployedObjects.remove("." + className);
          }
          let inputs = document.querySelectorAll("._access-mic");
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].removeEventListener("focus", this.listen, false);
            inputs[i].classList.remove("_access-mic");
          }
        };

        if (destroy) {
          document
            .querySelector('._access-menu [data-access-action="speechToText"]')
            .classList.remove("active");
          this.initialValues.speechToText = false;
          return remove();
        }

        document
          .querySelector('._access-menu [data-access-action="speechToText"]')
          .classList.toggle("active");

        this.initialValues.speechToText = !this.initialValues.speechToText;
        if (this.initialValues.speechToText) {
          let css = `
                        body:after {
                            content: ${
                              !this.options.icon.useEmojis ? '"mic"' : '"🎤"'
                            };
                            ${
                              !this.options.icon.useEmojis
                                ? "font-family: '" +
                                  this.options.icon.fontFamily +
                                  "';"
                                : ""
                            }
                            position: fixed;
                            z-index: 1100;
                            top: 1vw;
                            right: 1vw;
                            width: 36px;
                            height: 36px;
                            font-size: 30px;
                            line-height: 36px;
                            border-radius: 50%;
                            background: rgba(255,255,255,0.7);
                            display: flex;
                            justify-content: center;
                            aling-items: center;
                        }

                        body._access-listening:after {
                            animation: _access-listening-animation 2s infinite ease;
                        }

                        @keyframes _access-listening-animation {
                            0%  {background-color: transparent;}
                            50%  {background-color: #EF9A9A;}
                        }
                    `;
          common.injectStyle(css, { className: className });
          common.deployedObjects.set("." + className, true);
          let inputs = document.querySelectorAll(
            'input[type="text"], input[type="search"], textarea, [contenteditable]'
          );
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener(
              "blur",
              () => {
                if (
                  typeof this.recognition === "object" &&
                  typeof this.recognition.stop === "function"
                )
                  this.recognition.stop();
              },
              false
            );
            inputs[i].addEventListener("focus", this.listen, false);
            inputs[i].parentElement.classList.add("_access-mic");
          }
        } else {
          remove();
        }
      },
    };
    if (this.options.session.persistent) this.setSessionFromCache();
  }

  resetIfDefined(src, dest, prop) {
    if (typeof src !== "undefined") dest[prop] = src;
  }

  onChange(updateSession) {
    if (updateSession && this.options.session.persistent) this.saveSession();
  }

  saveSession() {
    storage.set("_accessState", this.sessionState);
  }

  setSessionFromCache() {
    let sessionState = storage.get("_accessState");
    if (sessionState) {
      if (sessionState.textSize) {
        let textSize = sessionState.textSize;
        if (textSize > 0) {
          while (textSize--) {
            alterTextSize(this, true);
          }
        } else {
          while (textSize++) {
            alterTextSize(this, false);
          }
        }
      }
      if (sessionState.textSpace) {
        let textSpace = sessionState.textSpace;
        if (textSpace > 0) {
          while (textSpace--) {
            alterTextSpace(this, true);
          }
        } else {
          while (textSpace++) {
            alterTextSpace(this, false);
          }
        }
      }
      if (sessionState.lineHeight) {
        let lineHeight = sessionState.lineHeight;
        if (lineHeight > 0) {
          while (lineHeight--) {
            alterLineHeight(this, true);
          }
        } else {
          while (lineHeight++) {
            alterLineHeight(this, false);
          }
        }
      }
      if (sessionState.invertColors) this.menuInterface.invertColors();
      if (sessionState.grayHues) this.menuInterface.grayHues();
      if (sessionState.linkHighlight) this.menuInterface.linkHighlight();
      if (sessionState.bigCursor) this.menuInterface.bigCursor();
      if (sessionState.readingGuide) this.menuInterface.readingGuide();
      this.sessionState = sessionState;
    }
  }

  destroyAll() {
    let allSelectors = common.deployedObjects.getAll();
    for (let i of allSelectors) {
      let elem = document.querySelector(i);
      if (elem) {
        elem.parentElement.removeChild(elem);
      }
    }
  }
}

Accessibility.init = (opt) => {
  common.warn(
    '"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead'
  );
  new Accessibility(opt);
};

export default Accessibility;
