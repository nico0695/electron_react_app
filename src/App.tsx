import React, { useState, useEffect } from 'react';
import './App.css';

import { ipcRenderer } from 'electron';

const postInitialState = {
  title: '',
  text: '',
}

function App() {
  const [data, setData] = useState<{ title: string; text: string }[]>([]);

  const [postData, setPostData] = useState(postInitialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('data: ', event);
    ipcRenderer.send('post/createPost', postData);
  };

  ipcRenderer.on('post/createPost-reply', (event, arg) => {
    setPostData(postInitialState);
    getData()
  });

  const getData = async () => {
    ipcRenderer.send('post/listPosts', '');
  };

  useEffect(() => {
    getData()
  }, [])
  

  ipcRenderer.on('post/listPosts-reply', (event, arg) => {
    setData(arg.data);
  });

  console.log('data: ', data);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <label htmlFor="text">Text</label>
        <input
          type="text"
          name="text"
          id="text"
          value={postData.text}
          onChange={(e) => setPostData({ ...postData, text: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      <button onClick={getData}> get data </button>
      <br />
      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
              {' - '}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
