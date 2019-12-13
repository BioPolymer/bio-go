import { PolymerElement, html } from "@polymer/polymer";
import "@polymer/paper-listbox/paper-listbox";

/**
 * `bio-go-card` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class BioGoCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --height: 300px;
        }
        label {
          font-size: 0.9em;
          font-weight: 100;
        }
        paper-listbox {
          height: calc(var(--height) - 50px);
          overflow-y: scroll;
          @apply --shadow-elevation-2dp;
        }
        paper-item {
          font-size: 0.8em;
          color: #909090;
          border-bottom: 1px solid #cacaca;
        }
        .term {
          @apply --layout-flex;
        }
        .card {
          height: var(--height);
        }
        .evidence {
          margin-left: 3px;
        }
      </style>

      <div class="card">
        <label>[[name]]</label>

        <paper-listbox>
          <template is="dom-repeat" items="[[__model]]">
            <paper-item id="[[item.id]]">
              <div class="term" on-tap="__handleSelected">[[item.term]]</div>
              <template is="dom-if" if="[[item.pubmed]]">
                <div class="evidence">
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pubmed/{{item.pubmed}}"
                    target="_blank"
                    >[ [[item.evidence]] ]</a
                  >
                </div>
              </template>
              <template is="dom-if" if="[[!item.pubmed]]">
                <div class="evidence">[ [[item.evidence]] ]</div>
              </template>
            </paper-item>
          </template>
        </paper-listbox>
      </div>
    `;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return "bio-go-card";
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      typeMap: {
        type: Map,
        value: function() {
          return new Map([
            ["BP", "Biological Process"],
            ["CC", "Cellular Compartment"],
            ["MF", "Molecular Function"]
          ]);
        }
      },

      evidenceCodes: {
        type: Map,
        value: function() {
          return new Map([
            ["EXP", "Inferred from Experiment"],
            ["IDA", "Inferred from Direct Assay"],
            ["IPI", "Inferred from Physical Interaction"],
            ["IMP", "Inferred from Mutant Phenotype"],
            ["IGI", "Inferred from Genetic Interaction"],
            ["IEP", "Inferred from Expression Pattern"],
            ["HTP", "Inferred from High Throughput Experiment"],
            ["HDA", "Inferred from High Throughput Direct Assay"],
            ["HMP", "Inferred from High Throughput Mutant Phenotype"],
            ["HGI", "Inferred from High Throughput Genetic Interaction"],
            ["HEP", "Inferred from High Throughput Expression Pattern"],
            ["IBA", "Inferred from Biological aspect of Ancestor"],
            ["IBD", "Inferred from Biological aspect of Descendant"],
            ["IKR", "Inferred from Key Residues"],
            ["IRD", "Inferred from Rapid Divergence"],
            ["ISS", "Inferred from Sequence or structural Similarity"],
            ["ISO", "Inferred from Sequence Orthology"],
            ["ISA", "Inferred from Sequence Alignment"],
            ["ISM", "Inferred from Sequence Model"],
            ["IGC", "Inferred from Genomic Context"],
            ["TAS", "Traceable Author Statement"],
            ["NAS", "Non-traceable Author Statement"],
            ["IC", "Inferred By Curator"],
            ["ND", "No biological Data available"],
            ["IEA", "Inferred from Electronic Annotation"]
          ]);
        }
      },

      /** The name of the pathway database. */
      type: {
        type: String,
        value: ""
      },

      /** The user-friendly name of the database. */
      name: {
        type: String,
        computed: "__computeName(type, typeMap)"
      },

      /** A map of database names and user-friendly names. */
      databases: {
        type: Map,
        value: null
      },

      /** An array of pathway items containing an id and a name. */
      model: {
        type: Array,
        value: []
      },

      /** A normalised model containing an Array<Object> where each object is the id, and name of the pathway. */
      __model: {
        type: Array,
        computed: "__computeModel(model)"
      }
    };
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
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
  }

  /**
   * This method gets the user-friendly GO type name. For example, the BP abbreviation
   * maps to the 'Biological Process'.
   * @param {String} name the name of the database as stored in the databases Map
   * @param {Map<String, String>} typeMap a map containing short GO type names
   *                                      mapped to user-friendly type names
   */
  __computeName(name, typeMap) {
    let realName = "";
    if (typeMap) {
      realName = typeMap.get(name);
    }
    return realName;
  }

  /**
   * The model stored in the database can either be an array or an object. This
   * method insures that regardless of the type of value stored at the node,
   * an array will always be returned and used.
   * @param {*} model either an Object or an Array
   */
  __computeModel(model) {
    let realModel = [];
    if (Array.isArray(model)) {
      realModel = model;
    } else {
      realModel.push({ id: model.id, name: model.name });
    }
    return realModel;
  }

  /**
   * This method is responsible for handling the user-click event.
   * @param {Event} e the event object
   */
  __handleSelected(e) {
    console.log(e);
    let id = e.path[3].id;
    window.open(`http://amigo.geneontology.org/amigo/term/${id}`);
  }
}

window.customElements.define(BioGoCard.is, BioGoCard);
