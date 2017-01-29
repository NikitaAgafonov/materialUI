import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import SvgIconFace from 'material-ui/svg-icons/action/face';

import AutoCompleteExampleSimple from './forms/AutoCompleteExampleSimple';
import DrawerUndockedExample from './drawer/DrawerUndockedExample';
import { data, listAction } from './data';
import Bottom from './bottom';


const styles = {
    chip: {
        margin: '4px'
    },
    paper: {
        margin: '10px',
        padding: '5px',
        textAlign: 'center',
        width: 'auto'
    },
    ul: {
        paddingLeft: '0px',
        textAlign: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    menu: {
        flexGrow: '1'
    },
    text: {
        flexGrow: '10'
    },
    bottom: {
        position: 'absolute',
        bottom: '0px'
    }
};

class Main extends React.Component {

    constructor() {

        super();

        this.state = data.getAllData();

    }

    componentDidMount() {

        data.addChangeListener(this._setFluxState.bind(this));

    }

    _setFluxState() {

        this.setState(data.getAllData());

    }

    componentWillUnmount() {

        data.removeChangeListener(this._setFluxState.bind(this));

    }

    handleDelete(num) {

        listAction.deletePrimaryText(num,this.state.menuNames[this.state.selectedMenu]);

    }

    getNotes() {

        return this.state[this.state.menuNames[this.state.selectedMenu]];

    }

    renderText() {

        const notes = this.getNotes();

        return (

            <Paper
                style={styles.paper}
                zDepth={2}
            >

                <ul style={styles.ul}>

                {
                    (notes[0]) ?
                        notes.map( ( val , key ) =>

                            <Chip

                                style={styles.chip}

                                key={key}

                                onRequestDelete={() => this.handleDelete(key)}

                            >

                                <Avatar color="#444" icon={<SvgIconFace />} />

                                {val.str}

                            </Chip> )
                    :   (<Chip

                            style={styles.chip}

                        >
                            Write text
                        </Chip>)
                }
                </ul>
            </Paper>
        );

    }

    selectMenu(event, menuItem, index) {

        listAction.selectMenu(index);

    }

    renderMenu() {

        return (

            <Paper style={styles.paper} zDepth={2}>

                <Menu onItemTouchTap={this.selectMenu.bind(this)}>

                    <MenuItem primaryText="Primary" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Trash" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="Spam" leftIcon={<RemoveRedEye />} />

                </Menu>

            </Paper>

        );

    }

    render() {

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

                <div>

                    {this.state.openDrawer ?
                        <DrawerUndockedExample
                            handleToggleDrawer = {this.handleToggleDrawer.bind(this)}
                            handleCloseDrawer = {this.handleCloseDrawer.bind(this)}
                            open = {this.state.openDrawer}
                        /> : ''}

                    <AppBar
                        title="HELLO WORLD"
                        onLeftIconButtonTouchTap={this.handleToggleDrawer.bind(this)}
                    />

                    <div id="content" style={styles.content}>

                        <div id="menu" style={styles.menu}>

                            {this.renderMenu()}

                        </div>

                        <div id="text" style={styles.text}>

                            {this.renderText()}

                            <AutoCompleteExampleSimple
                                selectedMenu = {this.state.selectedMenu}
                                menuNames = {this.state.menuNames}
                            />

                        </div>

                    </div>

                    <Bottom style={styles.bottom}/>

                </div>

            </MuiThemeProvider>
        );
    }

    handleToggleDrawer () {

        this.setState({
            openDrawer: !this.state.open
        });

    }

    handleCloseDrawer () {

        this.setState({
            openDrawer: false
        });

    }

    handleClick(e) {

        console.log("click", e);

    }

    handleTouchTap(e) {

        console.log("touchTap", e);

    }

}

ReactDOM.render(<Main />, document.getElementById("container"));