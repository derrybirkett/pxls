const {
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
    var themes = Meteor.call("loadThemes", function(err, res) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(res.data)
        var i, len, ref, theme;

        ref = res.data["new-files"];
        for (i = 0, len = ref.length; i < len; i++) {
          theme = ref[i];
          Themes.insert(theme);
        }

      }
    });
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <AppBar
                title="Pxls" iconElementRight={<FlatButton  onClick={this.loadThemes()}  label="Reload" />} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="box">
              <List subheader="New">
                {this.renderThemes()}
              </List>
            </div>
          </div>

          <div className="col-md-3">
            <div className="box">Col</div>
          </div>

          <div className="col-md-3">
            <div className="box">col2</div>
          </div>

        </div>
      </div>
    )
  }
})
