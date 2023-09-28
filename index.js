const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Connect to MongoDB database
mongoose.connect("mongodb+srv://satnam9762:Codeguy9762@cluster0.e7cog2s.mongodb.net/todo_listDB", { useNewUrlParser: true }).then(() => {
    // some express and ejs configurations
    const app = express();
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));

    // creating a mongoose model
    const schema = mongoose.Schema({
        task: String,
        status: String,
    });
    const Post = mongoose.model("Record", schema);

    // All the requests
    app.get('/', async (req, res) => {
        let posts = await Post.find();
        posts = JSON.parse(JSON.stringify(posts));
        res.render('index', { data: posts });
    });

    app.post('/add', async (req, res) => {
        const post = new Post({
            'task': req.body.task,
            'status': 0,
        });
        await post.save().then(() => {
            res.redirect('/');
        });

    });

    app.get('/finish', async (req, res) => {
        objIndex = await Post.findByIdAndUpdate(req.query.id, {
            status: 1
        }).then(() => {
            res.redirect('/');
        });

    });

    app.get('/delete', async (req, res) => {
        await Post.deleteOne({ _id: req.query.id });

        res.redirect('/');
    });

    app.listen(3000, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Please open http://localhost:3000`);
        }
    });
});