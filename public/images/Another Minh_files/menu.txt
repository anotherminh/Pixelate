window.App = React.createClass({
  getInitialState: function () {
    return { ShowAboutMe: false };
  },

  narwhalClickHandle: function () {
    if (this.state.ShowAboutMe) {
      this.setState({ ShowAboutMe: false });
    } else {
      this.setState({ ShowAboutMe: true });
    }
  },

  render: function () {
    var menu, aboutMe;
    if (this.state.ShowAboutMe) {
      return (
        <div>
          About Me goes here!
          <div onClick={this.narwhalClickHandle}>Back</div>
        </div>
      );
    } else {
      return (
        <div className="thumbs-container">
          <a href="http://www.pixelates.xyz">
            <img className="thumb" src="hover_pixelate_icon.png"/>
          </a>
          <a onClick={this.narwhalClickHandle}>
            <img className="thumb" src="about_me.png"/>
          </a>
          <a href="https://github.com/anotherminh">
            <img className="thumb" src="github_icon.png"/>
          </a>
        </div>
      );
    }
  }
});
