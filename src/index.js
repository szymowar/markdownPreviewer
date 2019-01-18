import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const marked = require('marked');
/*
User Story #1: I can see a textarea element with a corresponding id="editor".

User Story #2: I can see an element with a corresponding id="preview".

User Story #3: When I enter text into the #editor element,
the #preview element is updated as I type to display the content of the textarea.

User Story #4: When I enter GitHub flavored markdown into the #editor element,
the text is rendered as HTML in the #preview element as
I type (HINT: You don't need to parse Markdown yourself -
you can import the Marked library for this: https://cdnjs.com/libraries/marked).

User Story #5: When my markdown previewer first loads,
the default text in the #editor field should contain valid
markdown that represents at least one of each of the following
elements: a header (H1 size), a sub header (H2 size), a link,
inline code, a code block, a list item, a blockquote, an image, and bolded text.

User Story #6: When my markdown previewer first loads, the default
markdown in the #editor field should be rendered as HTML in the #preview element.

Optional Bonus (you do not need to make this test pass): When I click a
link rendered by my markdown previewer, the link is opened up in a new tab
(HINT: read the Marked.js docs for this one!).

Optional Bonus (you do not need to make this test pass): My markdown
previewer interprets carriage returns and
renders them as br (line break) elements.
*/
const prvexample = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

const Editor = (props) =>{
        return(
                <div id="editor-container" className="items">
                    <div className="head">Editor</div>
                    <textarea id="editor" onChange={props.handleInput} className="content" defaultValue={props.prv}>
                    </textarea>
                </div>)
            }


const Preview = (props) => {
        return (<div className="items">
                    <div className="head">Preview
                    </div>
                    <div id="preview" className="content" dangerouslySetInnerHTML={{__html: marked(props.prv, {renderer: renderer})}}>
                    </div>
                </div>)
                }

class MarkdownPrev extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputEditor: prvexample
        };
        this.handleEditorInput = this.handleEditorInput.bind(this);

    }

    handleEditorInput(val){
            this.setState({
                inputEditor: val.target.value
            });
    }
    render(){
        return (<div className="container">
                    <div className="title">Markdown Previewer</div>
                    <Editor handleInput={this.handleEditorInput} prv={this.state.inputEditor}/>
                    <Preview prv={this.state.inputEditor} />
            </div>)
    }
}
ReactDOM.render(<MarkdownPrev />, document.getElementById('root'))
