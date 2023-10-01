import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

function connectToDatabase() {
  try {
     mongoose.connect('mongodb://127.0.0.1:27017/myLogin');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


connectToDatabase(); // Call the async function to connect

// ... Your MongoDB connection code ...

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// ... Your routes ...

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.send({ message: "Login successful", user });
      } else {
        res.send({ message: "Incorrect password" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.send({ message: 'Successfully registered' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// ... Your server listening code ...


app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
