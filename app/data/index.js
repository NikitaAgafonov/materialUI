import { Dispatcher } from 'flux';
import EventEmitter from 'events';

const Emitter = EventEmitter.EventEmitter;

let AppDispatcher = new Dispatcher();

let initialText = {

    primary: [{
        str: 'Hello React/flux'
    }],

    trash: [{
        str: 'Trash'
    }],

    spam: [{
        str: 'SpamSpamSpamSpam'
    }],

    selectedMenu: 0,

    menuNames: ['primary','trash','spam']

};

export const data = Object.assign(Emitter.prototype, {

    text: initialText,

    getAllData: function() {

        return this.text;

    },

    emitChange: function() {

        this.emit('change');

    },

    addChangeListener: function(callback) {

        this.on('change', callback);

    },

    removeChangeListener: function(callback) {

        this.removeListener('change', callback);

    }

});

AppDispatcher.register((action) => {

    switch (action.type) {

        case 'ADD_PRIMARY_TEXT':
            data.text.primary.push({
                str: action.str
            });
            break;

        case 'DELETE_PRIMARY_TEXT':
            data.text.primary.splice(action.num, 1);
            break;

        case 'ADD_TRASH_TEXT':
            data.text.trash.push({
                str: action.str
            });
            break;

        case 'DELETE_TRASH_TEXT':
            data.text.trash.splice(action.num, 1);
            break;

        case 'ADD_SPAM_TEXT':
            data.text.spam.push({
                str: action.str
            });
            break;

        case 'DELETE_SPAM_TEXT':
            data.text.spam.splice(action.num, 1);
            break;

        case 'SELECT_MENU':
            data.text.selectedMenu=action.index;
            break;
    }

    data.emitChange();

    return true;

});

export const listAction = {

    addPrimaryText: (str, name) => {

        switch (name) {

            case 'primary':
                AppDispatcher.dispatch({
                    type: 'ADD_PRIMARY_TEXT',
                    str
                });
                break;

            case 'trash':
                AppDispatcher.dispatch({
                    type: 'ADD_TRASH_TEXT',
                    str
                });
                break;

            case 'spam':
                AppDispatcher.dispatch({
                    type: 'ADD_SPAM_TEXT',
                    str
                });
                break;
        }


    },

    deletePrimaryText: (num, name) => {

        switch (name) {

            case 'primary':
                AppDispatcher.dispatch({
                    type: 'DELETE_PRIMARY_TEXT',
                    num
                });
                break;

            case 'trash':
                AppDispatcher.dispatch({
                    type: 'DELETE_TRASH_TEXT',
                    num
                });
                break;

            case 'spam':
                AppDispatcher.dispatch({
                    type: 'DELETE_SPAM_TEXT',
                    num
                });
                break;
        }
    },

    selectMenu: (index) => {
        AppDispatcher.dispatch({
            type: 'SELECT_MENU',
            index
        });
    }
};

