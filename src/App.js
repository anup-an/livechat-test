import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="url"> 
            <div>URL</div> 
            <div><input type="text" id="url" name="url" placeholder="URL...." /></div>
          </label>

          <label htmlFor="image" className="image"> 
            <div>IMAGE</div> 
            <div><input type="text" id="image" name="image" placeholder="Image URL...." /></div>
          </label>
          <label htmlFor="image" className="title"> 
            <div>Title</div> 
            <div><input type="text" id="title" name="title" placeholder="Title...." /></div>
          </label>
          <label htmlFor="image" className="subtitle"> 
            <div>Subtitle</div> 
            <div><input type="text" id="subtitle" name="subtitle" placeholder="Subtitle...." /></div>
          </label>
          <button type="submit">Send</button>
        </form>

      </div>
    );
  }
}

export default App;
