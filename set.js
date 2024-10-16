const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUN0Ukt6S09lbTFtWkdIbFB3RXZGRGVxejlqT1hSRGVSUWxiUVZNeVRsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ2JxWEJPNWtlS0wwYWV3eTZJdWhrS3ZLT29SNUNvbjRld2ppN3ZudDN6ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SUF5VWtNWWpmRExjaTViclZ0a0QwQmVQaWdrd0NWa3QzeHZUTFhvYlU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEeThDWFd0b250dXkwSUQyR2ZES1Nxd1ZVTzhMRGRSZzkzZzdyNXBZclZFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNIQytUeTFjQnIwblNZYzlrV2J6cDRRWkhqaTVFL0gzWExBWXdKWE5uVVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZiR1VFMVBvQ3JSZCtGZWw4YjBKRWd6TXJwTTVacFlBcWxVZlRLZDBlVGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic08ra1hUajB0bisrSFprVnlLS0E1RkFDaFhUalJ6dkhJN3R6dGl6UzBsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicTVzcE5FYWZpdzNLR1l1UDBieWZsUnhhSHlNK2FQbjBEb0JHZHNVVUdpRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndoQTQ5cDZDMnRzZXdVRlJubkdIZXJ2bUNmcERidExYZ0ZkV2xCZjVma2VXdDRROWJVcklDV2tQUUV3ck1IM3p1TTRJWDNDNFlFZUlYdTZoQS9kcUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMsImFkdlNlY3JldEtleSI6IlpOM21QRmNGVG5FZGVuRk5NY2tGRlRLeTF0UUJGNUtGem5UbmRFSnhHOUU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5NzI4ODkzMTg3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhCNUQ2QzdFMDg2NkM5NkMxREFBODc4MkQ2NUYwMDZGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjkwOTExOTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTcyODg5MzE4N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQkMyREYwRjY4RkM2RUMyODVCQjgwM0Q1M0IzMzQ4RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI5MDkxMTk1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSZzlRMllLS1FHbTlzemlDQnRTZm1RIiwicGhvbmVJZCI6IjJjNzY1MTVlLTBlNjktNGRkNS1iNzEwLTk2ZGE3ODFlMmNhZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWcE5nMEZ2a0ZMRnpqelRCUnFrR2xQQ25XaFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0FzK2hNUEVISWxaU01Xb2puUWdWbU9ZcFIwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1ETUxWVE02IiwibWUiOnsiaWQiOiI5MTk3Mjg4OTMxODc6OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJzYW5qdSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzdHeS9VRkVPdXN2N2dHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYVJzQU1uanhaQVJkMXVYcHFiYU9tWjBWSEc0RGxuWU9Bak5vK096cG9Waz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUTRObDI3bUJsOWRHajNuUTIyUUtsRndLYTdqUHhGbStDckQrRDNZSDN3LzlrQlV0dE5QVTh3NDMyRStsb28wcndOaXBIMGJISW1uc0ttK2hjcmxHQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IjcxeXJaUEc4b2cyVTZ5clQ0WFlBTFo1U0dkTWMwSjdYQkVqMVJVY1JHNVBwTG9LYUtxY3ZHdFM0dzFTV2ZEMDNvc2gxdzZ3Zzd1TDU0SEVRZjI0NkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5NzI4ODkzMTg3OjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2tiQURKNDhXUUVYZGJsNmFtMmpwbWRGUnh1QTVaMkRnSXphUGpzNmFGWiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTA5MTE5MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJb2QifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SANJU",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " SANJU BHAI",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SANJU_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
