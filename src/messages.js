import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToMessages, fetchFromMessages } from './store/messages';
import { sortByTime } from './util';
import Navbar from './navbar';
import Footer from './footer';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: 84
    };
    this.viewMoreMessages = this.viewMoreMessages.bind(this);
  }
  async componentDidMount() {
    await this.props.loadToMessages();
    await this.props.loadFromMessages();
  }

  viewMoreMessages() {
    const currentMessages = this.state.messages;
    this.setState({ messages: currentMessages - 28 });
  }

  toggleDate(parent, date, sender) {
    const div = document.getElementById(parent);
    if (div.children.length > 1) {
      if (sender) {
        div.removeChild(div.lastChild);
      } else {
        div.removeChild(div.firstChild);
      }
    } else {
      let child = document.createElement('DIV');
      child.setAttribute('class', 'time-container');
      let p1 = document.createElement('P');
      let p2 = document.createElement('P');
      const options1 = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
      const options2 = {hour: '2-digit', minute: '2-digit'};
      let p1text = document.createTextNode(date.toLocaleDateString('en-us', options1));
      const p2text = document.createTextNode(date.toLocaleTimeString('en-us', options2));
      p1.setAttribute('class', 'first-time');
      p2.setAttribute('class', 'first-time');
      p1.appendChild(p1text);
      p2.appendChild(p2text);
      child.appendChild(p1);
      child.appendChild(p2);
      if (sender) {
        div.appendChild(child);
      } else {
        div.insertBefore(child, div.firstChild);
      }
    }
  }

  render() {
    const { texts } = this.props;
    const firstTime = texts[this.state.messages];
    const firstDate = firstTime && new Date(firstTime.time);
    return (
      <React.Fragment>
        <Navbar />
        <div className='messages-container'>
          <div className='load-messages-container'>
            {
              this.state.messages <= 0 ?
                <p>No Previous Messages</p>
                :
                <button className='load-messages-button' onClick={this.viewMoreMessages}>Load Previous Messages...</button>
            }
          </div>
          {
            firstDate &&
            <p className='first-time'>{firstDate.toUTCString()}</p>
          }
          {
            texts.map((message, idx) => {
              if (idx >= this.state.messages) {
                const date = new Date(message.time);
                if (message.sender) {
                  return (
                    <div key={idx} className='to-container' id={`text${idx}`} onClick={() => this.toggleDate(`text${idx}`, date, message.sender)}>
                      <p className='to-bubble'>{message.text}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={idx} className='from-container' id={`text${idx}`} onClick={() => this.toggleDate(`text${idx}`, date, message.sender)}>
                      <p className='from-bubble'>{message.text}</p>
                    </div>
                  );
                }
              }
            })
          }
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    texts: sortByTime(state.texts)
  };
};

const mapDispatchToProps = dispatch => ({
  loadToMessages: () => dispatch(fetchToMessages()),
  loadFromMessages: () => dispatch(fetchFromMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
