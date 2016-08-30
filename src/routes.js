import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, About, Issues, Posts, Post, PostNew, PostEdit, Error404, Albums, Album, Photo } from './containers';

import { Greeting } from './components';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Greeting} />
    <Route path="home" component={Greeting} />
    <Route path="about" component={About}>
      <Route path="issues" component={Issues} />
    </Route>
    <Route path="posts" component={Posts} />
    <Route path="posts/new" component={PostNew} />
    <Route path="posts/:id" component={Post} />
    <Route path="posts/:id/edit" component={PostEdit} />
    <Route path="albums" component={Albums} />
    <Route path="albums/:id" component={Album} />
    <Route path="photos/:id" component={Photo} />
    <Route path="*" component={Error404} />
  </Route>
);
