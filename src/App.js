import React from "react";
import ReactGA from "react-ga";
//import { createBrowserHistory } from "history";
// import logo from "./logo.svg";
import Navbar from "./components/navBar";
import Background from "./components/background";
import Machine from "./components/machine";
import "./App.scss";

const App = () => {
  ReactGA.initialize("UA-159342205-1");

  //const history = createBrowserHistory();

  // useEffect(() => {
  //   //Initialize google analytics page view tracking
  //   history.listen(location => {
  //     ReactGA.set({ page: location.pathname }); // Update the user's current page
  //     ReactGA.pageview(location.pathname); // Record a pageview for the given page
  //   });
  // });

  ReactGA.pageview("/app"); // Record a pageview for the given page

  return (
    <React.Fragment>
      <Navbar />
      <Background />
      <Machine />
    </React.Fragment>
  );
};

export default App;

// class App extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <Navbar />
//         <Background />
//         <Machine />
//       </React.Fragment>
//     );
//   }
// }

// export default App;
