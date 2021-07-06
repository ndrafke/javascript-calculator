function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // regexes to deal with operators
const endsWithTwoOperators = /[*\+\-\/]{1}[*\+\-\/]{1}$/;
const operatorAndMinus = /[*\+\-\/]{1}-{1}$/;
const endsWithDoubleMinus = /\- \-$/;
// Buttons and all of thier ids and values
class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "buttons", className: "buttons" }, /*#__PURE__*/
      React.createElement("button", { id: "clear", value: "AC", onClick: this.props.handleClick }, "AC"), /*#__PURE__*/

      React.createElement("button", { id: "divide", value: "/", onClick: this.props.handleClick }, "\xF7"), /*#__PURE__*/
      React.createElement("button", { id: "seven", value: "7", onClick: this.props.handleClick }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", value: "8", onClick: this.props.handleClick }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", value: "9", onClick: this.props.handleClick }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", value: "*", onClick: this.props.handleClick }, "x"), /*#__PURE__*/
      React.createElement("button", { id: "four", value: "4", onClick: this.props.handleClick }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", value: "5", onClick: this.props.handleClick }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", value: "6", onClick: this.props.handleClick }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", value: "-", onClick: this.props.handleClick }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "one", value: "1", onClick: this.props.handleClick }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "two", value: "2", onClick: this.props.handleClick }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "three", value: "3", onClick: this.props.handleClick }, "3"), /*#__PURE__*/
      React.createElement("button", { id: "add", value: "+", onClick: this.props.handleClick }, "+"), /*#__PURE__*/
      React.createElement("button", { id: "zero", value: "0", onClick: this.props.handleClick }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", value: ".", onClick: this.props.handleClick }, "."), /*#__PURE__*/
      React.createElement("button", { id: "equals", value: "=", onClick: this.props.handleClick }, "=")));


  }}

//main calculator parent component
class Calculator extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "allClear",














    () => {
      this.setState({
        display: "0",
        history: "0",
        lastKeyType: "null",
        result: 0 });

    });_defineProperty(this, "getResult",

    () => {
      let answer = Math.round(1000000000000 * eval(this.state.history)) / 1000000000000;
      this.setState({
        display: answer,
        history: this.state.history + "=" + answer,
        lastKeyType: "result",
        result: answer });

    });_defineProperty(this, "operatorClick",

    operator => {
      let lastKeyType = this.state.lastKeyType;

      if (endsWithDoubleMinus.test(this.state.history)) {
        this.setState({
          lastKeyType: "operator",
          display: operator,
          history: this.state.history.slice(0, -3) + operator });

      } else
      if (!operatorAndMinus.test(this.state.history) && lastKeyType === "operator" && operator !== "-") {
        this.setState({
          lastKeyType: "operator",
          display: operator,
          history: this.state.history.replace(this.state.history[this.state.history.length - 1], operator) });

      } else

      if (endsWithTwoOperators.test(this.state.history)) {
        this.setState({
          lastKeyType: "operator",
          display: operator,
          history: this.state.history.slice(0, -2) + operator });
      }
      // to allow subtracting negative integers:
      else if (!endsWithTwoOperators.test(this.state.history) && this.state.history[this.state.history.length - 1] === "-" && operator === "-") {
          this.setState({
            lastKeyType: "operator",
            display: operator,
            history: this.state.history + " " + operator });

        } else
        if (operatorAndMinus.test(this.state.history)) {
          this.setState({
            lastKeyType: "operator",
            display: operator,
            history: this.state.history.slice(0, -2) + operator });

        } else

        if (this.state.display === "0" && operator === "-") {
          this.setState({
            lastKeyType: "operator",
            history: "-",
            display: "-" });

        }
        // to start new formula with previous answer 
        else if (lastKeyType === "result") {
            this.setState({
              lastKeyType: "operator",
              display: operator,
              history: this.state.result + operator });

          } else
          {
            this.setState({
              lastKeyType: "operator",
              display: operator,
              history: this.state.history + operator });

          }
    });_defineProperty(this, "zeroClick",
    number => {
      let lastKeyType = this.state.lastKeyType;
      if (this.state.display === "0" && number === "0") {
        this.setState({
          lastKeyType: "number",
          display: number });

      } else
      if (this.state.history === "0" && number === "0") {
        this.setState({
          lastKeyType: "number",
          history: number });

      } else
      if (number === "0" && lastKeyType === "result") {
        this.setState({
          lastKeyType: "number",
          display: number,
          history: number });

      } else
      if (number === "0") {
        this.setState({
          lastKeyType: "number",
          display: this.state.display + number,
          history: this.state.history + number });

      }
    });_defineProperty(this, "decimalClick",
    number => {
      let lastKeyType = this.state.lastKeyType;

      if (number === "." && this.state.display === "0") {
        this.setState({
          lastKeyType: "number",
          display: "0.",
          history: "0." });

      } else
      if (number === "." && this.state.history === "0") {
        this.setState({
          lastKeyType: "number",
          history: "0." });

      } else
      if (number === "." && this.state.display.indexOf(number) !== -1) {
        this.setState({
          lastKeyType: "number",
          display: this.state.display,
          history: this.state.history });

      } else
      if (number === "." && lastKeyType === "result") {
        this.setState({
          lastKeyType: "number",
          display: "0.",
          history: "0." });

      } else
      if (number === ".") {
        this.setState({
          lastKeyType: "number",
          display: this.state.display + number,
          history: this.state.history + number });

      }
    });_defineProperty(this, "numberClick",
    number => {
      let lastKeyType = this.state.lastKeyType;
      if (this.state.display.length > 15) {
        this.setState({
          lastKeyType: "number",
          display: this.state.display,
          history: this.state.history });

      } else
      if (this.state.display === "0" && this.state.history === "0") {
        this.setState({
          lastKeyType: "number",
          display: number,
          history: number });

      } else
      if (this.state.history === "0") {
        this.setState({
          lastKeyType: "number",
          history: number });

      } else
      if (lastKeyType === "operator") {
        this.setState({
          lastKeyType: "number",
          history: this.state.history + number,
          display: number });

      } else
      if (lastKeyType === "result") {
        this.setState({
          lastKeyType: "number",
          display: number,
          history: number });

      } else
      if (this.state.display[this.state.display.length - 6] === ".") {
        this.setState({
          lastKeyType: "number",
          history: this.state.history,
          display: this.state.display });

      } else
      {
        this.setState({
          lastKeyType: "number",
          display: this.state.display + number,
          history: this.state.history + number });

      }
    });_defineProperty(this, "handleClick",
    event => {
      let val = event.target.value;
      switch (val) {
        case "AC":this.allClear();
          break;
        case "=":this.getResult();
          break;
        case "+":
        case "-":
        case "*":
        case "/":this.operatorClick(val);
          break;
        case "0":this.zeroClick(val);
          break;
        case ".":this.decimalClick(val);
          break;
        case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":this.numberClick(val);}

    });this.state = { display: "0", history: "0", lastKeyType: "null", result: 0 };this.allClear = this.allClear.bind(this);this.getResult = this.getResult.bind(this);this.operatorClick = this.operatorClick.bind(this);this.zeroClick = this.zeroClick.bind(this);this.decimalClick = this.decimalClick.bind(this);this.numberClick = this.numberClick.bind(this);} //AC button 
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement("div", { className: "display-container" }, /*#__PURE__*/
      React.createElement("div", { id: "history", className: "history" },
      this.state.history), /*#__PURE__*/

      React.createElement("div", { id: "display", className: "display" },
      this.state.display)), /*#__PURE__*/


      React.createElement(Buttons, { handleClick: this.handleClick })));


  }}

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("calc"));