import * as CodeMirror from 'codemirror';
import 'codemirror-mode-stata';

import {
  CodeMirrorEditor
} from '@jupyterlab/codemirror';

module.exports = [{
    id: 'jupyterlab-stata-highlight',
    autoStart: true,
    activate: function(app) {
      console.log('JupyterLab extension jupyterlab-stata-highlight is activated!');
      console.log(app.commands);
    }
}];

export function changeStyleOnKernel(cell, kernel, info) {
  // Note: JupyterLab does not yet support tags
  if (cell.model.metadata.get('tags') && (cell.model.metadata.get('tags')).indexOf("report_output") >= 0) {
    let op = cell.node.getElementsByClassName('jp-Cell-outputWrapper');
    for (let i = 0; i < op.length; ++i)
      op.item(i).classList.add('report-output');
  } else {
    let op = cell.node.getElementsByClassName('jp-Cell-outputWrapper');
    for (let i = 0; i < op.length; ++i)
      op.item(i).classList.remove('report-output');
  }

  // cell in panel does not have prompt area
  var col = "";
  if (kernel && info.BackgroundColor.get(kernel)) {
    col = info.BackgroundColor.get(kernel);
  }
  let prompt = cell.node.getElementsByClassName("jp-InputPrompt");
  if (prompt.length > 0)
    prompt[0].style.backgroundColor = col;
  prompt = cell.node.getElementsByClassName("jp-OutputPrompt");
  for (let i = 0; i < prompt.length; ++i) {
    prompt.item(i).style.backgroundColor = col;
  }
  // cell.user_highlight = {
  //     name: 'sos',
  //     base_mode: info.LanguageName[kernel] || info.KernelName[kernel] || kernel,
  // };
  // //console.log(`Set cell code mirror mode to ${cell.user_highlight.base_mode}`)
  let base_mode = info.LanguageName.get(kernel) || info.KernelName.get(kernel) || kernel;
  if (!base_mode || base_mode.toLowerCase() === 'stata') {
    (cell.inputArea.editorWidget.editor).setOption('mode', 'stata');
  }
}

