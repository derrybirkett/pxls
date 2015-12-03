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

  componentDidMount() {
    {this.loadThemes()}
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
        <div className="row">
          <div className="col-md-5 col-md-offset-4">
            <FlatButton label="Pixel Supply" />
            <div className="box">
              <Paper zDepth={0}>
                <List subheader="Favourite New Wordpress Theme Finds">
                  {this.renderThemes()}
                </List>
            </Paper>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
