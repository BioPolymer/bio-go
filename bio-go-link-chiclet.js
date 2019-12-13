import { LitElement, html } from "lit-element";
import "@polymer/iron-icon/iron-icon";
import "@biopolymer-elements/bio-icons/bio-icons";
import "@biopolymer-elements/bio-link/bio-link-mixin";

/**
 * `bio-go-link-chiclet`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioGoLinkChiclet extends LitElement {
  static get properties() {
    return {
      /** The PMID for the paper that supports this GO assertion. */
      evidence: {
        type: String,
        value: ""
      }
    };
  }

  /**
   * Implement to describe the element's DOM using lit-html.
   * Use the element current props to return a lit-html template result
   * to render into the element.
   */
  _render() {
    return html`
      <style>
        :host {
          --icon-size: 15px;
          --icon-color: #505050;
        }

        .link {
          color: var(--link-color, #505050);
          text-decoration: var(--link-text-decoration, none);
          font-family: var(--link-font-family, "Roboto");
          font-size: var(--link-font-size, 0.8em);
          padding-top: 2px;
          padding-left: 5px;
          padding-right: 5px;
          margin-left: 10px;
          margin-bottom: 3px;
          background-color: white;
          min-height: 22px;
          border: 1px solid #cacaca;
          border-radius: 5px;

          @apply --layout-horizontal;
        }
        iron-icon {
          color: var(--icon-color);
          --iron-icon-height: var(--icon-size);
          --iron-icon-width: var(--icon-size);
          border-radius: 50%;
          border: 1px solid var(--icon-color);
          margin-top: 3px;
          margin-left: 4px;
          margin-right: 4px;
        }
        .text {
          text-overflow: ellipsis;
          width: 300px;
        }

        .actions {
          width: 40px;
          margin-bottom: 5px;
          @apply --layout-vertical;
        }
      </style>
      <div id="[[id]]" class="link">
        <div class="actions">
          <iron-icon
            icon="bio:document"
            on-click="_handleEvidenceTap"
          ></iron-icon>
          <iron-icon icon="bio:arrow-forward" on-click="_handleTap"></iron-icon>
        </div>
        <div class="text">[[label]]</div>
      </div>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * This method is responsible for handling the tap event on the link.
   * @param e the event object
   */
  _handleEvidenceTap(e) {
    if (this.evidence) {
      var url = this.typeMap.get("pubmed");
      if (url == null) {
        throw "Unrecognized database: " + this.type;
      }
      if (this.useNewWindow) {
        window.open(url + this.evidence);
      } else {
        window.location = url + this.evidence;
      }
    } else {
      this.dispatchEvent(
        new CustomEvent("show-msg", {
          bubbles: true,
          composed: true,
          detail: {
            msg: "No evidence associated with this term."
          }
        })
      );
    }
  }
}

customElements.define("bio-go-link-chiclet", BioGoLinkChiclet);
