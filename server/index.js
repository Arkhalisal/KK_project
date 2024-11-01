import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const app = express();
const port = 3001;
const uri =
  "mongodb+srv://Arkhalis:Yy51182474@jfsd12-test.z4upm.mongodb.net/?retryWrites=true&w=majority&appName=JFSD12-test";
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
const connectDb = async () => {
  await client.connect();
  db = client.db("KK_project");
  console.log("successfully connected to mongodb");
};
connectDb();

app.get("/", async (req, res) => {
  const post = await db.collection("posts").find().toArray();
  res.json(post);
});

app.get("/post/:id", async (req, res) => {
  try {
    const id = req.params;
    const post = await db
      .collection("posts")
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.json(post);
  } catch (err) {
    res.json({ comment: "failed to fetch" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password)
      return res.json({ comment: "please enter the correct infomation" });
    // check if existing email exist
    const existingUser = await db
      .collection("user_info")
      .findOne({ email: email });
    if (existingUser) return res.json({ comment: "email already exist" });
    // create a encode password
    if (password.length < 8)
      return res.json({
        comment: "the password needs to be atleast 8 characters long",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    // insert a user
    const user = await db.collection("user_info").insertOne({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db
      .collection("user_info")
      .find({ email: email })
      .toArray();
    if (!user[0]) return res.json({ comment: "No email exist" });
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    passwordMatch
      ? res.json(user[0])
      : res.json({ comment: "password is wrong" });
  } catch (err) {
    res.json(err);
  }
});

app.post("/create-post", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.json({ comment: "please enter the correct info" });
  const post = await db.collection("posts").insertOne({
    title: title,
    content: content,
  });
  res.json({ ...post, comment: "successfully posted" });
});

app.listen(port, () => {
  console.log(`successfully connect to port ${port}`);
});
