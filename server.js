const express = require("express");
const request = require("cloudscraper");
const antrian = require("qjobs");
const app = express();

// satuan dalam milidetik (default 1 menit = 60000milis)
// untuk mencegah nomer diblokir

// jeda tiap task job antian kirim pesan ke semua kontak WA
const delay_kirim_pernomor = 60000;

// jeda request ke api wa
const delay_request_api = 30000;

// tambahkan saran ke daftar saran sesuka anda.
const daftar_saran = [
  "cuci tangan setelah berpergian",
  "hindari menyentuh area wajah",
  "hindari berjabat tangan",
  "selalu jaga jarak ya",
  "jaga kesehatan!"
];

// api coronavirus dan whatsapp - - - - -

//https://api.kawalcorona.com/indonesia => corona report case
const info_coronavirus = "https://api.kawalcorona.com/indonesia";

//https://app.whatspie.com/ => whatapps
const wa = "https://app.whatspie.com/api/messages";
// - - - - - -

//********* jangan lupa isi variable - variable dibawah ini *****

// dibawah ini nomer telpon kamu.
const device_number = "085803639392";

//ubah daftar kontak, ubah dengan nomer yang mau kamu kirimin info.
const target_number = ["083134886735","085755855404","087894694518","085540258685","081213605106"];

// ubah API Key, bisa dilihat di menu profil setting https://app.whatspie.com
const wa_token = "https://wa.me/message/F7Z46JKQZPB4I1";

// ***************

// fungsi dapatkan waktu dan memilih acak untuk saran
var waktu_sekarang = split => {
  var d = new Date();
  var date =
    d.getDate() +
    split +
    (d.getMonth() + 1) +
    split +
    d.getFullYear() +
    split +
    d.getHours() +
    ":" +
    d.getMinutes();
  return date;
};

var acak_saran = array => {
  return array[Math.floor(Math.random() * array.length)];
};

app.get("/kirim", (req, res) => {
  try {
    request.get(info_coronavirus, async function(err, response, body) {
      const wait_data = await JSON.parse(body);
      if (typeof body !== "undefined") {
        const data_indonesia = await wait_data[0];
        res.send([data_indonesia]);

        var message = `~~> [ Last Update : ${waktu_sekarang("-")} ]
       - - - - - - - - - - - - - - - - - - -
       - - *Data Coronavirus Indonesia* - -
       - - - - - - - - - - - - - - - - - - -
       *- Total Positif* = ${data_indonesia.positif}
       *- Total Sembuh* = ${data_indonesia.sembuh}
       *- Total Meninggal* = ${data_indonesia.meninggal}
       - - - - - - - - - - - - - - - - - - -
       - Sumber Data : https://kemkes.go.id
       !(•̀ᴗ•́)و ̑̑ _" ${acak_saran(daftar_saran)} "_`;

        var send_message = function(args, next) {
          setTimeout(function() {
            request.post(
              wa,
              {
                form: {
                  receiver: target_number[args[0]],
                  device: device_number,
                  message: message,
                  type: "chat"
                },
                auth: {
                  bearer: wa_token
                }
              },
              function(err, respon, body) {
                console.log(args);
                console.log("status: " + respon.statusCode);
              }
            );
            next();
          }, delay_request_api);
        };

        var qj = new antrian({ maxConcurrency: 1 });

        qj.on("start", function() {
          console.log("  ");
          console.log("*********** Starting Antrian Kirim Pesan **********");
          console.log("  ");
        });

        qj.on("jobStart", function(args) {
          console.log("  ");
          console.log("-------- Task Jobs Start --------");
          console.log("  ");
          console.log("[-]  JobStart => ", args);
          console.log("  ");
        });

        qj.on("jobEnd", function(args) {
          console.log("  ");
          console.log("[X]  Jobend => ", args);
          console.log("  ");
          console.log("  ");
          console.log("-------- Task Jobs Done --------");
          console.log("  ");

          // If job end, then make a pause

          qj.pause(true);
          setTimeout(function() {
            qj.pause(false);
          }, delay_kirim_pernomor);
        });

        qj.on("pause", function(since) {
          console.log("in pause since " + since + " milliseconds");
        });

        qj.on("unpause", function() {
          console.log("  ");
          console.log("[P] Job pause end, continu ..");
          console.log("  ");
        });

        qj.on("end", function() {
          console.log("  ");
          console.log("************ Semua Pesan Telah Terkirim ************");
          console.log("  ");
        });
        
        for (var i = 0; i < target_number.length; i++) {
          // task antrian kirim pesan ke banyak nomer
          
          qj.add(
            send_message,
             [  i , " Send message to number phone [ " + target_number[i]+ " ]"]
          );
          
        }
        
        qj.run();
        
      } else {
        //jika request gagal maka akan reload.
        setTimeout(function() {
          res.redirect("/kirim");
        }, 5000);
        res.send("auto reload after 5s …");
      }
    });
  } catch (e) {
    setTimeout(function() {
      //jika request gagal maka akan reload.
      res.redirect("/kirim");
    }, 5000);
    res.send("auto reload page after 5s …");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
