module.exports.config = {
  name: "goiadmin",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "mention",
    prefix: true,
    category: "user",
    usages: "tag",
    cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100000959749712") {
    var aid = ["61550669852479"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Mantion_দিস না _bØss Tanvîr এর মন মন ভালো নেই আস্কে-!💔🥀", "- bØss tanVîr er সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ_//-🫂😂", "bØss tanVîr ak jon re ønek ønek love 💕 køre _//-🙈😁","এত মেনশন না দিয়ে bØss tanVîr er inbØx a আসো হট করে দিবe jan_//- 😘🥒"," Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা fhelbo amr bØss tanVîr _//-💋😾😾🔨","এতু ইমুশানাল কথা বলো তল দেশ দিয়ে অজরে বৃষ্টি হচ্ছে আমার bØss tanVîr er _//-😭😂","bØss tanVîr বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰","এতো মিনশন নাহ দিয়া সিংগেল tanVîr রে একটা bØw দে _//-🐸😏","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স køren TânVîr er _//-🙈💕","মেনশন দিসনা পারলে একটা bØw দে ore_//-😾🫵🏻","Mantion_দিস না বাঁলপাঁক্না Tanvîr প্রচুর বিজি 🥵🥀🤐","চুমু খাওয়ার বয়স টা  চকলেট🍫খেয়ে উড়িয়ে দিলØ amr bØss tanVîr _//-🤗"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
}
