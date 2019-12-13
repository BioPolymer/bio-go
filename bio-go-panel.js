import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./bio-go-card";
/**
 * `bio-go-panel`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioGoPanel extends PolymerElement {
  static get properties() {
    return {
      types: {
        type: Map,
        value: function() {
          return new Map([
            ["BP", "Biological Process"],
            ["CC", "Cellular Compartment"],
            ["MF", "Molecular Function"]
          ]);
        }
      },

      /** An array of database names. */
      typeNames: {
        type: Array,
        computed: "__computeTypeNames(types)"
      },

      model: {
        type: Object,
        value: null
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        fieldset {
          border-radius: 5px;
          border-color: var(--app-header-color);
          color: var(--app-header-color);

          @apply --layout-horizontal;
          @apply --layout-wrap;
        }
      </style>

      <fieldset>
        <legend>Gene Ontology</legend>
        <template is="dom-repeat" items="[[typeNames]]">
          <template is="dom-if" if="{{__val(model, item)}}">
            <bio-go-card
              type="[[item]]"
              databases="[[databases]]"
              model="{{__val(model, item)}}"
            ></bio-go-card>
          </template>
        </template>
      </fieldset>
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
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }

  /**
   * This method gets the type map keys and returns them as a list
   * @param {Map<String, String>} types the map of type abbreviations and names
   * @return {Array} an array of type names
   */

  __computeTypeNames(types) {
    let names = [];
    for (let name of types.keys()) {
      names.push(name);
    }
    return names;
  }

  __val(model, item) {
    let val = this.get(`model.${item}`);
    return val;
  }
}

customElements.define("bio-go-panel", BioGoPanel);
