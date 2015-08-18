Meteor.publish "themes", (args) ->
  Themes.find()

Meteor.methods
  loadThemes: ->
    @unblock()
    Meteor.http.call 'GET', 'https://api.envato.com/v1/market/new-files:themeforest,wordpress.json',
      headers:
        'Authorization': 'Bearer ATi8ZLKj1uNQnM4Lnhsc92Ewm61qyLvK'

  writeThemes: (themes) ->
    Themes.remove({})
    Themes.insert theme for theme in themes
