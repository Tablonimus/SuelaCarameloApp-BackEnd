import mongoose from "mongoose";

await mongoose.connect(
  "mongodb+srv://tablonimus:La12Xeneixe.@cluster0.c4nuoyi.mongodb.net/suelApp-db?retryWrites=true&w=majority&appName=Cluster0"
);

const users = await mongoose.connection
  .collection("users")
  .find({}, { projection: { password: 0 } })
  .toArray();

console.table(users.map(u => ({ username: u.username, role: u.role, createdAt: u.createdAt })));

await mongoose.disconnect();
