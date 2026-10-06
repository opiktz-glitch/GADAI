const str = `[

![CHAT WHATSAPP MARKETING RESMI ADIRA](https://img.shields.io/badge/CHAT_WHATSAPP-MARKETING_RESMI_ADIRA-25D366?style=for-the-badge&logo=whatsapp)

](https://wa.me/6281234567890?text=Halo)`;

const fixed = str.replace(/\[\s*(!\[[\s\S]*?\]\([\s\S]*?\))\s*\]\(([\s\S]*?)\)/g, "[$1]($2)");
console.log("ORIGINAL:\n", str);
console.log("FIXED:\n", fixed);
