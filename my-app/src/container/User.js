import React from 'react';
import { Tags, ModalPhoto } from '../export'
import UserProvider from '../context/UserProvider';

class User extends React.Component {
  state = {
    modal: "modal"
  }
  static contextType = UserProvider;

  componentWillReceiveProps() {
    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")
  }

  componentDidMount() {
    if (this.context.header !== "red-white")
      this.context.onChange("header", "red-white")
  }

  onChange = (modal) => {
    this.setState({ ...this.state, modal })
  }

  render() {

    return (
      <div id="user">
        <div id="info-user">
          <span style={{ display: "flex", fontWeight: "bold" }}><p>Lisa TRAN (
            <span style={{ fontStyle: "italic", fontWeight: 600 }}>Lisouiw</span>), 20</p>
          </span>

          <br />

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            <img className="is-square" alt="username" onClick={() => this.onChange("modal is-active")} src="https://data.whicdn.com/images/296905234/superthumb.png?t=1505109579" />
          </div>
          <br />

          <p>
            Je suis une gentille fille. Très gentille!
            Je suis une gentille fille. Très gentille!
            Je suis une gentille fille. Très gentille!
            Je suis une gentille fille. Très gentille!
            Je suis une gentille fille. Très gentille!
            Je suis une gentille fille. Très gentille!
            Je suis une gentille fille. Très gentille!
          </p>

          <Tags />
          <ModalPhoto modal={this.state.modal} onChange={this.onChange} />
          <br />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <button className="button red-white">Bloquer</button>
            <button className="button red-white">Report</button> */}

            <button className="button red-white">Change my informations</button>
          </div>
        </div>
      </div>
    );
  }
}

export { User };
