let c=0;function addDots(){c++,c>3&&(c=0),document.getElementById("loading_dots").innerHTML=".".repeat(c)}const dotsId=setInterval(addDots,500);function calculateShardId(e,t){return(e>>22)%t}let shardCountGlobal;function shardIdButtonClick(){const t=document.getElementById("guild_id").value;let e;try{if(e=parseInt(t),isNaN(e))throw new Error(null)}catch(e){document.getElementById("shard_id_result").innerHTML="Invalid guild id";return}const n=calculateShardId(e,shardCountGlobal);document.getElementById("shard_id_result").innerHTML=`Guild ${e} is on shard ${n}`}document.getElementById("calculate_shard_id").addEventListener("click",shardIdButtonClick);async function x(){let e;try{const t=await fetch("https://api.scripty.org/bot_stats/advanced");e=await t.json()}catch(e){document.getElementById("loading").style.display="none",e.code==="502"?document.getElementById("offline").style.display=null:(document.getElementById("error_message").innerHTML=error,document.getElementById("on_error").style.display=null),clearInterval(dotsId);return}const t=e.shard_count;shardCountGlobal=t;const n=e.guild_count,s=e.user_count,o=e.voice_channel_count;document.getElementById("shard_count").innerHTML=t,document.getElementById("guild_count").innerHTML=n,document.getElementById("user_count").innerHTML=s,document.getElementById("channel_count").innerHTML=o;for(let s=0;s<t;s++){const d=s,u=e.shard_info[s].latency,h=e.shard_info[s].connection_status,m=e.shard_info[s].guild_count;let n;switch(h){case 0:n="Connected";break;case 1:n="Connecting";break;case 2:n="Disconnected";break;case 3:n="Handshaking";break;case 4:n="Identifying";break;case 5:n="Resuming";break;default:n="Unknown";break}const l=`${(u/1e6).toFixed(3)}ms`,o=document.createElement("tr"),i=document.createElement("td"),a=document.createElement("td"),r=document.createElement("td"),c=document.createElement("td");i.innerText=d,a.innerText=l,r.innerText=n,c.innerText=m,o.appendChild(i),o.appendChild(a),o.appendChild(r),o.appendChild(c),document.getElementById("shard_info").appendChild(o)}document.getElementById("loading").style.display="none",document.getElementById("content").style.display=null,clearInterval(dotsId)}x()