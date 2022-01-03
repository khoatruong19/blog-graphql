import { Layout, Menu } from 'antd';
import Feed from './components/Feed';
import NavBar from './components/NavBar';
import {Routes, Route} from "react-router-dom"
import Login from './components/Login';
import CreatePost from './components/CreatePost';

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import PostDetail from './components/PostDetail';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

const { Header, Content } = Layout;

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout> 
      <Header>
        <NavBar/>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostDetail/>}/>
        </Routes>
      </Content>
    </Layout>
  </ApolloProvider>
  );
}

export default App;
