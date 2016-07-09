React.initializeTouchEvents(true)
// Add listener to get :active pseudoselector working. hack
document.addEventListener("touchstart", function(){}, false)

savedItems = React.createClass({
  mixins: [ReactMeteorData],
  contextTypes: {router: React.PropTypes.object.isRequired},
  getMeteorData() {
    let handle = Meteor.subscribe("meals")
    let savedMealsList = savedMeals.find().fetch()
    return {
      loading: !handle.ready(),
      savedMeals: savedMealsList
    }
  },
  removeCard(_id) {
    meals.remove(_id)
    //Meteor.call("repopulate")
  },
  orderItem(_id) {
    meals.update({_id}, {$set: { affirmative: true}})
    //Meteor.call("repopulate");
    this.context.router.transitionTo('/order');
  },
  renderCards() {
    return this.data.savedMeals
      .map((card) => {
        return <Card
          key={card._id}
          card={card}
          remove={ () => this.removeCard(card._id)}
          orderItem={ () => this.orderItem(card._id)}
        ></Card>
    })
  },
  render() {
    if (this.data.loading) {
      return <h1>Loading</h1>
    }
    return <div>{this.renderCards()}</div>
  }
})
