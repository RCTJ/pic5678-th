'use babel';

import Pic5678ThView from './pic5678-th-view';
import { CompositeDisposable } from 'atom';

export default {

  pic5678ThView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pic5678ThView = new Pic5678ThView(state.pic5678ThViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pic5678ThView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pic5678-th:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pic5678ThView.destroy();
  },

  serialize() {
    return {
      pic5678ThViewState: this.pic5678ThView.serialize()
    };
  },

  toggle() {
    console.log('Pic5678Th was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
