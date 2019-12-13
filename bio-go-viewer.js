import "@polymer/polymer";

const $_documentContainer = document.createElement("template");

$_documentContainer.innerHTML = `<dom-module id="bio-go-viewer" attributes="goList title">
	

    <template>
    <link rel="stylesheet" href="bio-go-viewer.css">
        <div class="container">
            
            <table>
				<caption class="title">{{title}}</caption>
            <thead>
            	<tr>
            		<th>ID</th>
            		<th>Term</th>
            		<th>Evidence</th>
            	</tr>
            </thead>
            <tbody>
            <template is="dom-repeat" items="{{goList}}">
                <tr>
                <td><a href="http://amigo.geneontology.org/amigo/term/{{goEntry.id}}">{{item.id}}</a></td>
                
                <td>{{item.term}}</td>
                
                <td>{{item.evidence}}</td>
                </tr>
            </template>
            </tbody>
            </table>
        </div>
        <p>

    </p></template>
    
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
  is: "bio-go-viewer",

  properties: {
    goList: {
      type: Array
    },
    tableTitle: {
      type: String
    }
  }
});
