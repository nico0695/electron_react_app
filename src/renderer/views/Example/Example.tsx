import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table, Label, Input } from 'reactstrap';
import { ipcRenderer } from 'electron';

import { IPost } from '../../../shared/interfaces/post/IPost';

const postInitialState = {
  id: 0,
  title: '',
  text: '',
};

const Example = () => {
  const [data, setData] = useState<IPost[]>([]);

  const [postData, setPostData] = useState(postInitialState);

  // funcion para crear un nuevo post
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // enviamos los datos al main (post/createPost)
    ipcRenderer.send('post/createPost', postData);
  };

  // listener para la respuesta del back
  ipcRenderer.on('post/createPost-reply', (event, arg) => {
    setPostData(postInitialState);
    getData();
  });

  // funcion para obtener los posts
  const getData = async () => {
    ipcRenderer.send('post/listPosts', '');
  };

  // listener para la respuesta del back (trae el listado de posts)
  ipcRenderer.on('post/listPosts-reply', (event, arg) => {
    setData(arg.data);
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row xs={2}>
      <Col>
        <Form onSubmit={handleSubmit} className="p-4">
          <Row className="mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </Row>
          <Row className="mb-2">
            <Label htmlFor="text">Text</Label>
            <Input
              type="text"
              name="text"
              id="text"
              value={postData.text}
              onChange={(e) =>
                setPostData({ ...postData, text: e.target.value })
              }
            />
          </Row>
          <Button className='' type="submit">Submit</Button>
        </Form>
      </Col>
      <Col className="p-4">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th>Texto</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr>
                  <th scope="row">{item?.id}</th>
                  <td>{item.title}</td>
                  <td>{item.text}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Example;
