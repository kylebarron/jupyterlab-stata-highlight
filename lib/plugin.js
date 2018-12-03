// import * as CodeMirror from 'codemirror';
import 'codemirror-mode-stata';

export default [{
    id: 'jupyterlab-stata-highlight',
    autoStart: true,
    activate: function(app) {
      console.log('JupyterLab extension jupyterlab-stata-highlight is activated!');
      console.log(app.commands);
      registerStataFileType(app);
    }
}];

function registerStataFileType(app) {
  app.docRegistry.addFileType({
    name: 'stata',
    displayName: 'Stata',
    extensions: ['do', 'ado'],
    mimeTypes: ['text/x-stata'],
  });
}
