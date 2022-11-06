function calculateShardId(e,t){return(e>>22)%t}let shardCountGlobal;function shardIdButtonClick(){const t=document.getElementById("guild_id").value;let e=parseInt(t,10);if(isNaN(e)){document.getElementById("shard_id_result").innerText="Invalid guild id";return}const n=calculateShardId(e,shardCountGlobal);document.getElementById("shard_id_result").innerText=`Guild ${e} is on shard ${n}`}document.getElementById("calculate_shard_id").addEventListener("click",shardIdButtonClick);async function x(){let e;try{const t=await fetch("https://api.scripty.org/bot_stats/advanced");e=await t.json()}catch(e){document.getElementById("loading").style.display="none",e.code==="502"?document.getElementById("offline").style.display=null:(document.getElementById("error_message").innerText=e.toString(),document.getElementById("on_error").style.display=null);return}const t=e.shard_count;shardCountGlobal=t;const n=e.guild_count,s=e.user_count,o=e.voice_channel_count;document.getElementById("shard_count").innerText=t.toLocaleString(),document.getElementById("guild_count").innerText=n.toLocaleString(),document.getElementById("user_count").innerText=s.toLocaleString(),document.getElementById("channel_count").innerText=o.toLocaleString();const i=document.getElementById("shard_info");for(let s=0;s<t;s++){const p=e.shard_info[s].latency,h=e.shard_info[s].connection_status,f=e.shard_info[s].guild_count;let n;switch(h){case 0:n="Connected";break;case 1:n="Connecting";break;case 2:n="Disconnected";break;case 3:n="Handshaking";break;case 4:n="Identifying";break;case 5:n="Resuming";break;default:n="Unknown";break}let a;switch(h){case 0:a="is-success";break;case 2:a="is-danger";break;default:a="is-warning";break}const g=`${(p/1e6).toFixed(3)}ms`,l=document.createElement("div");l.className="column is-5-mobile is-4-tablet-only is-3-desktop-only is-2-widescreen";const o=document.createElement("div");o.className=`notification ${a}`,o.id=`shard_${s}`;const u=document.createElement("h3");u.innerText=`Shard ${s}`;const c=document.createElement("p");c.className="heading";const m=document.createElement("i");m.innerText=n,c.appendChild(m);const r=document.createElement("p");r.className="heading",r.innerText=g;const d=document.createElement("p");d.className="heading",d.innerText=`${f.toLocaleString()} servers`,o.appendChild(u),o.appendChild(c),o.appendChild(r),o.appendChild(d),l.appendChild(o),i.appendChild(l)}document.getElementById("loading").style.display="none",document.getElementById("content").style.display=null}x()