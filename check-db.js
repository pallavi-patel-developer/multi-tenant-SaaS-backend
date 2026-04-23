import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import SuperCategory from './src/modules/superCategories/superCategories.models.js';
import SuperTenant from './src/modules/superTenant/superTenant.models.js';

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected.");
  
  const categories = await SuperCategory.find().lean();
  console.log("Categories:", JSON.stringify(categories, null, 2));

  process.exit(0);
}
check();
