import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { result: "Loading...", lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator &&
      window.navigator.geolocation.getCurrentPosition(
        (pos) =>
          this.setState({ lat: pos.coords.latitude, result: "Latitude: " }),
        (err) => this.setState({ errorMessage: err.message, result: "Error: " })
      );
  }
  componentDidUpdate() {
    console.log("my component was just updated - it rendered!");
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div>
          {this.state.result}
          {this.state.errorMessage}
        </div>
      );
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner />;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
