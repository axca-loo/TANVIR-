module.exports.config = {
  name: "accept",
  version: "1.0.0",
  permission: 2,
  credits: "NAYAN",
  prefix: true,
  description: "make friends via facebook id",
  category: "admin",
  usages: "uid",
  cooldowns: 0
};  


module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;
  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");
  
  const form = {
    av: api.getCurrentUserID(),
		fb_api_caller_class: "RelayModern",
		variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
		}
  };
  
  const success = [];
  const failed = [];
  
  if (args[0] == "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  }
  else if (args[0] == "del") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  }
  else return api.sendMessage("●❯────────────────❮●\n🚫__𝐩𝐥𝐞𝐚𝐬𝐞 𝐬𝐞𝐥𝐞𝐜𝐭 𝐚𝐝𝐝 𝐨𝐫 𝐝𝐞𝐥, 𝐞𝐧𝐝 𝐨𝐫𝐝𝐞𝐫 𝐨𝐫 𝐚𝐥𝐥__🚫\n●❯────────────────❮●", event.threadID, event.messageID);
  let targetIDs = args.slice(1);
  
  if (args[1] == "all") {
    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
  }
  
  const newTargetIDs = [];
  const promiseFriends = [];
  
  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) {
      failed.push(`stt ${stt} was not found in the list`);
      continue;
    }
    form.variables.input.friend_requester_id = u.node.id;
    form.variables = JSON.stringify(form.variables);
    newTargetIDs.push(u);
    promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
		form.variables = JSON.parse(form.variables);
  }
  
  const lengthTarget = newTargetIDs.length;
  for (let i = 0; i < lengthTarget; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      if (JSON.parse(friendRequest).errors) failed.push(newTargetIDs[i].node.name);
      else success.push(newTargetIDs[i].node.name);
    }
    catch(e) {
      failed.push(newTargetIDs[i].node.name);
    }
  }
  
  api.sendMessage(`●❯────────────────❮●\n       -♦𝐓𝐀𝐍𝐕𝐈𝐑 𝐁𝐎𝐓♦-        \n📣__𝐚𝐥𝐫𝐞𝐚𝐝𝐲 ${args[0] == '𝐚𝐝𝐝' ?'𝐚𝐜𝐜𝐞𝐩𝐭𝐞𝐝': '𝐝𝐞𝐥𝐞𝐭𝐞'} 𝐟𝐫𝐢𝐞𝐧𝐝 𝐫𝐞𝐪𝐮𝐞𝐬𝐭 𝐨𝐟 ${success.length} 𝐩𝐞𝐫𝐬𝐨𝐧__😍\n●❯────────────────❮●:\n${success.join("\n")}${failed.length > 0?'\nfailed with ${failed.length} person : ${failed.join("\n")}' : ""}`, event.threadID, event.messageID);
};


module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");
  const form = {
    av: api.getCurrentUserID(),
  	fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
  	fb_api_caller_class: "RelayModern",
  	doc_id: "4499164963466303",
  	variables: JSON.stringify({input: {scale: 3}})
  };
  const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;
  let msg = "";
  let i = 0;
  for (const user of listRequest) {
    i++;
    msg += (`\n${i}.\nname : ${user.node.name}`
         + `\nid : ${user.node.id}`
         + `\nurl : ${user.node.url.replace("www.facebook", "fb")}`
         + `\ntime : ${moment(user.time*1009).tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss")}\n`);
  }
  api.sendMessage(`${msg}\n●❯────────────────❮●\n        -♦𝐓𝐀𝐍𝐕𝐈𝐑 𝐁𝐎𝐓♦-       \n🔰__𝐫𝐞𝐩𝐥𝐲 𝐭𝐡𝐢𝐬 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐫𝐞𝐚𝐝𝐬:- 𝐚𝐝𝐝 𝐨𝐫 𝐝𝐞𝐥 𝐭𝐡𝐞𝐧 𝐩𝐮𝐭 𝐭𝐡𝐞 𝐧𝐮𝐦𝐛𝐞𝐫 𝐨𝐫 "𝐚𝐥𝐥" 𝐭𝐨 𝐭𝐚𝐤𝐞 𝐚𝐜𝐭𝐢𝐨𝐧__🔰\n●❯────────────────❮●`, event.threadID, (e, info) => {
      global.client.handleReply.push({
        name: this. config. name,
        messageID: info.messageID,
        listRequest,
        author: event.senderID
      });
    }, event.messageID);
};
