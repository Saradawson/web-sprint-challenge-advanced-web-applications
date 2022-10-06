import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';
import axiosWithAuth from '../axios'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import AuthRoute from './AuthRoute'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    setMessage('');
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
      navigate('/')
      setMessage('Goodbye!');
    }

  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage('');
    setSpinnerOn(true);
    axios.post(loginUrl, {username, password})
    .then(res => {
      console.log(res);
      setMessage(res.data.message);
      setSpinnerOn(false);
      localStorage.setItem('token', res.data.token);
      navigate('/articles');
    })
    .catch(err => {
      console.log(err.response.data.message);
      setMessage(err.response.data.message);
      setSpinnerOn(false);
    })
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage('');
    setSpinnerOn(true);
    axiosWithAuth().get(articlesUrl)
    .then(res => {
      setSpinnerOn(false);
      setMessage(res.data.message);
      setArticles(res.data.articles);
    })
    .catch(err => {
      setSpinnerOn(false);
      setMessage(err.message);
    })
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setSpinnerOn(true);
    setMessage('');
    axiosWithAuth().post(articlesUrl, article)
    .then(res => {
      console.log(res);
      setSpinnerOn(false);
      setMessage(res.data.message);
      setArticles([...articles, res.data.article]);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const updateArticle = ( article ) => {
    // ✨ implement
    // You got this!
    setSpinnerOn(true);
    setMessage('');
    axiosWithAuth().put(`http://localhost:9000/api/articles/${article.article_id}`, article)
    .then(res => {
      setSpinnerOn(false);
      setMessage(res.data.message);
      setArticles(articles.map(art => {
        if(art.article_id === article.article_id){
          return res.data.article;
        } else {
          return art;
        }
      }))
    })
    .catch(err => {
      console.log(err);
    })
  }

  const deleteArticle = article_id => {
    // ✨ implement
    setSpinnerOn(true);
    setMessage('');
    axiosWithAuth().delete(`http://localhost:9000/api/articles/${article_id}`)
    .then(res => {
      setSpinnerOn(false);
      setMessage(res.data.message);
      setArticles(articles.filter(article => article.article_id !== article_id ? article : ''));
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner />
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <AuthRoute>
              <ArticleForm setCurrentArticleId={setCurrentArticleId} updateArticle={updateArticle} postArticle={postArticle} currentArticle={articles.find(x => x.article_id === currentArticleId)}/>
              <Articles setArticles={setArticles} deleteArticle={deleteArticle} getArticles={getArticles} articles={articles} setCurrentArticleId={setCurrentArticleId}/>
            </AuthRoute>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
