import express from 'express';
import { engine } from 'express-handlebars';
import 'dotenv/config';
import config from "./config.js";

const app = express();
const PORT = 3000;

// Register the 'eq' helper
const hbs = engine({
  extname: '.hbs',
  helpers: {
    eq: function(arg1, arg2) {
      return (arg1 == arg2) ? 'active' : '';
    }
  }
});

//app.engine('.hbs', engine({extname: '.hbs'}));
app.engine('.hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"));
//app.enable('view cache');



app.get('/', (req, res) => {
    res.render('home',{layout: "main", title: 'Whitelabel Website', siteTitle: 'Whitelabel', siteSubtitle: 'Website', pages: config});
});

//  ROUTES
app.get('/login', (req, res) => {
  res.render('login',{layout: "main", title: 'Login', siteTitle: 'Whitelabel', siteSubtitle: 'Website', formTitle: 'Login Area', menuItem: 'login'});
});

app.get('/about', (req, res) => {
  res.render('page',{layout: "main", title: 'About us', siteTitle: 'Whitelabel', siteSubtitle: 'Website', content: 'This is the text of the "About us" page.', menuItem: 'about' });
});

app.get('/page-1', (req, res) => {
  res.render('page',{layout: "main", title: 'Page 1', siteTitle: 'Whitelabel', siteSubtitle: 'Website', content: 'This is the text of the "Page 1" page.', menuItem: 'page-1' });
});

app.get('/page-2', (req, res) => {
  res.render('page',{layout: "main", title: 'Page 2', siteTitle: 'Whitelabel', siteSubtitle: 'Website', content: 'This is the text of the "Page 2" page.', menuItem: 'page-2' });
});

app.get('/page-3', (req, res) => {
  res.render('page',{layout: "main", title: 'Page 3', siteTitle: 'Whitelabel', siteSubtitle: 'Website', content: 'This is the text of the "Page 3" page.', menuItem: 'page-3' });
});

app.get('/landing-page', (req, res) => {
  res.render('page',{layout: "main-no-nav", title: 'Landing page', siteTitle: 'Whitelabel', siteSubtitle: 'Website', });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});