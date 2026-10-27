// ====== STORE SETTINGS ======
// WhatsApp number: country code + number, no "+" and no spaces
const WHATSAPP_NUMBER = "2348135542890";
const INSTAGRAM_URL   = "https://www.instagram.com/ledde_manga";
const CURRENCY        = "₦";

// ====== PRODUCTS — EDIT / ADD / REMOVE ======
// Every product needs a different id.
// "image" is optional. Pictures live in the /images folder.
// Leave image as "" and a black and white placeholder shows instead.
// Keep a comma after every product except the last one.
const PRODUCTS = [
  { id: 1, name: "Natural Plant Deodorizer", desc: "Great fragrance, big presence.",   price: 4500, image: "images/natural-plant-deodorizer.jpg" },
  { id: 2, name: "Pearl Bottle",             desc: "Energising + Freshness.",          price: 3500, image: "images/pearl-bottle.jpg" },
  { id: 3, name: "Silk Vanilla Deodorizer",  desc: "Soft, sleek, versatile.",          price: 4000, image: "images/silk-vanilla-deodorizer.jpg" },
  { id: 4, name: "Rose Garden Perfume",      desc: "Roses are love and that's great.", price: 4000, image: "images/rose-garden-perfume.jpg" },
  { id: 5, name: "Gold-Tone Deodorizer",     desc: "Looks rich, costs less.",          price: 6000, image: "images/gold-tone-deodorizer.jpg" },
  { id: 6, name: "Everyday Shirt",           desc: "Fits your whole life.",            price: 3000, image: "images/everyday-shirt.jpg" }
];
