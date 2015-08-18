const {
  FontIcons,
  IconButton,
  Icons,
  List,
  ListItem,
  ListDivider,
  Avatar
} = mui;

Theme = React.createClass({
  render() {
    return (
        <ListItem
          primaryText={ this.props.theme.item }
          leftAvatar={ <Avatar src={ this.props.theme.thumbnail }/> }
          secondaryText={ this.props.theme.user }
          href={this.props.theme.url + "?ref=d2tstudio"} 
          rightIcon={ <IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub" /> }
        />
    )
  }
})
