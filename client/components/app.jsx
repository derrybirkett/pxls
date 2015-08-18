const {
  Paper,
  List,
  ListItem,
  ListDivider,
  Avatar,
  RaisedButton,
  AppBar,
  FlatButton,
  IconButton,
  NavigationClose
} = mui;

const ThemeManager = new mui.Styles.ThemeManager();


App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
      return {
          themes: Themes.find({}).fetch()
      }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  renderThemes() {
    return this.data.themes.map((theme) => {
      return <Theme key={theme._id} theme={theme} />
    });
  },

  loadThemes() {
    themes = Meteor.call("loadThemes", function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res.data["new-files"]);
        write = Meteor.call("writeThemes", res.data["new-files"], function(error, result) {
          if(error) {
            console.log(error);
          } else {
            console.log(result.data);
          }
        });
      }
    });
  },

  render() {
    return (
      <div className="container">
        <AppBar zDepth={0}
          title="Pxls" iconElementRight={<FlatButton label="Reload" onClick={this.loadThemes} />} />

        <div className="row">
          <div className="col-md-5">
            <div className="box">
              <Paper zDepth={1}>
                <List subheader="New Themes">
                  {this.renderThemes()}
                </List>
            </Paper>
            </div>
          </div>

          <div className="col-md-4">
            <div className="box">Col</div>
          </div>

          <div className="col-md-3">
            <div className="box">Col</div>
          </div>

        </div>
      </div>
    )
  }
})
