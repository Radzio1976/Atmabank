import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://api-eu-central-1.graphcms.com/v2/cl3kcwb2oa9kb01zdfzwnd7i7/master',
    cache: new InMemoryCache()
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
document.getElementById('root'));