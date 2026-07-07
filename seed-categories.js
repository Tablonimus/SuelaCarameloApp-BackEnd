import mongoose from "mongoose";
import Category from "./src/models/categories.model.js";

const CATEGORIES = [
  { value: "FSP Masculino",         label: "FSP Masculino",         order: 1 },
  { value: "FSP Femenino",          label: "FSP Femenino",          order: 2 },
  { value: "Ascenso",               label: "Ascenso",               order: 3 },
  { value: "DH",                    label: "División de Honor",     order: 4 },
  { value: "CM",                    label: "Copa Mendoza",          order: 5 },
  { value: "TN",                    label: "Torneos Nacionales",    order: 6 },
  { value: "TI",                    label: "Torneos Internacionales", order: 7 },
];

async function seed() {
  await mongoose.connect(
    "mongodb+srv://tablonimus:La12Xeneixe.@cluster0.c4nuoyi.mongodb.net/suelApp-db?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Conectado a MongoDB");

  let created = 0;
  let skipped = 0;

  for (const cat of CATEGORIES) {
    const existing = await Category.findOne({ value: cat.value });
    if (existing) {
      console.log(`  SKIP   "${cat.value}" (ya existe)`);
      skipped++;
    } else {
      await Category.create(cat);
      console.log(`  CREATE "${cat.value}" → ${cat.label}`);
      created++;
    }
  }

  console.log(`\nListo: ${created} creadas, ${skipped} ya existían.`);
  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
