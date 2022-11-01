import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await axios.get(
      `http://data.fixer.io/api/latest?access_key=8b853c03d3313d0cd8af733b49ee4538&base=EUR`
    );

    this.setState({ data });
  }

  onInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addCurrency = () => {
    console.log(this.state);

    const copy = { ...this.state };
    copy.data.rates[this.state.addCurrency] = 5.5555;

    this.setState({ ...copy });
  };

  render() {
    console.log(this.state);
    const { data, current, inputValue } = this.state;

    if (!data) return <p>Loading...</p>;

    //get a list of currencies
    const currencies = Object.keys(data.rates);

    //get converted value
    const convertedValue = inputValue
      ? (inputValue * data.rates[current]).toFixed()
      : 0;

    return (
      <>
        <p>Add currency</p>
        <input type="text" onInput={this.onInput} id="addCurrency" />
        <button onClick={this.addCurrency}>Add</button>
        <div id="error" class="error"></div>
        <div>
          <div class="container">
            <div class="row justify-content-center align-items-center">
              <div class="col-md-6">
                <div class="col-md-12">
                  <form id="currencyForm" class="form" action="" method="post">
                    <h3 class="text-center text-info m-4">
                      Currency Converter
                    </h3>
                    <div class="form-group">
                      <label for="eur" class="text-info">
                        EUR value:
                      </label>
                      <br />
                      <input
                        onInput={this.onInput}
                        type="number"
                        name="eur"
                        class="form-control"
                        id="inputValue"
                      />
                    </div>
                    <div class="form-group">
                      <label for="currency" class="text-info">
                        Currency:
                      </label>
                      <br />
                      <select
                        name="currency"
                        id="current"
                        onInput={this.onInput}
                      >
                        {currencies.map((currency) => (
                          <option value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="output" class="text-info" id="outputLabel">
                        USD value:
                      </label>
                      <br />
                      <input
                        id="output"
                        type="text"
                        name="output"
                        class="form-control"
                        value={convertedValue}
                        readonly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
