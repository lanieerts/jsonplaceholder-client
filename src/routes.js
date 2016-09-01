import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, About, Issues, Posts, Post, PostNew, Error404, Albums, Album, Photo } from './containers';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="about" component={About}>
      <Route path="issues" component={Issues} />
    </Route>
    <Route path="posts" component={Posts} />
    <Route path="posts/new" component={PostNew} />
    <Route path="posts/:id" component={Post} />
    <Route path="albums" component={Albums} />
    <Route path="albums/:id" component={Album} />
    <Route path="photos/:id" component={Photo} />
    <Route path="*" component={Error404} />
  </Route>
);
