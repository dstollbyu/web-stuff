import React from 'react';
import marked from 'marked';
import './MarkdownPreview.css';
import NavbarProj from './NavbarProj.js';

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const defaultText = `
# Header 1
## Header 2
More \`<div>Inline code</div>\` found here.
Click [here](https://www.freecodecamp.org/) to go to a page of learning.
List item:
- List item!
> Block this quote.

`;

class MarkdownPreview extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          input: defaultText
      };

      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
      this.setState({
          input: event.target.value
      });

  }
  render() {
    return (
      <>
        <NavbarProj />
        <div className="mdPreview">
          <Editor input={this.state.input} onChange={this.handleChange} />
          <Preview input={this.state.input} />
        </div>
      </>
    );


  }
};

const Editor = props => {
  return (
      React.createElement("textarea", { id: "editor", onChange: props.onChange, value: props.input }));

};

const Preview = props => {
  return (
      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(props.input, { renderer: renderer }) } }));

};

export default MarkdownPreview;