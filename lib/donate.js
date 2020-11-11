exports.donate = (id, BotName, corohelp, tampilTanggal, tampilWaktu, instagramlu, whatsapplu, kapanbotaktif, grupch1, grupch2) => {
	return `🔰 -----[ *MENU DONASI ${BotName}* ]----- 🔰
  
Hi, *${id.split("@s.whatsapp.net")[0]}* 👋️
Mau donasi? ✨

🌹 *${tampilTanggal}*
🌹 *${tampilWaktu}*

♻ Silahkan donasi dibawah ini :
   
⚜ *OVO*: 081329896085
⚜ *#DANA*: 081329896085
⚜ *#BANK*: 081329896085
⚜ *#PULSA*: 081329896085
⚜ *#GOPAY*: 081329896085
⚜ *#SAWERIA*: https://saweria.co/donate/bintangnurpradana

📺 *Iklan* :

✅ Follow akun instagram admin ${instagramlu}

🌹️ INFORMASI COVID-19 TERBARU!

🌹 POSITIF: *${corohelp.confirmed.value}*
🌹 SEMBUH: *${corohelp.recovered.value}*
🌹 WAFAT: *${corohelp.deaths.value}*
🌹 UPDATE: *${corohelp.lastUpdate}*

♻️ _TETAP JAGA KESEHATAN DAN SELALU PAKAI MASKER!_

♻️ Mau pasang iklan di *${BotName} ?*
☎️ WA : *${whatsapplu}*
  
🌹 Gunakan dengan bijak ‼️
🌹 Bot ini berjalan ${kapanbotaktif} ‼️

✳️ Official Grub [1] : ${grupch1}

✳️ Official Grub [2] : ${grupch2}

  
🔰 -----[ *POWERED BY ${BotName}* ]----- 🔰`
}
