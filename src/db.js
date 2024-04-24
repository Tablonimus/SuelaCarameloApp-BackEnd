import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tablonimus:La12Xeneixe.@cluster0.c4nuoyi.mongodb.net/suelApp-db?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("conexion a mongo exitosa");
    return "Conexión a MongoDB exitosa.";
  } catch (error) {
    console.log(error);
    return error;
  }
};
