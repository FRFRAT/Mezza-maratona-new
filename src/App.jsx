import { useState, useEffect } from "react";

const P="#7F77DD",G="#1D9E75",W="#BA7517",R="#E24B4A";
const KEY="mezza2026v4";

const PLAN=[
  {w:1,date:"28 mag–1 giu",type:"n",phase:"Fase 1 — Base",phaseDesc:"Sett. 1–4 · Fondamenta aerobiche · Lungo: 7:15→6:45/km",ss:[
    {id:"1a",day:"Giovedì",name:"Corsa facile rodaggio",km:4,det:"Tutta a 7:00/km. Ascolta il ginocchio."},
    {id:"1b",day:"Domenica",name:"Lungo lento – negative split",km:7,det:"Primi 4km a 7:15/km, ultimi 3km a 6:50/km."}]},
  {w:2,date:"4–8 giu",type:"n",ss:[
    {id:"2a",day:"Giovedì",name:"Ripetute 3×1km a 5:55",km:5,det:"1km risc., 3×1km a 5:55/km con 90\" camm., 1km defat."},
    {id:"2b",day:"Domenica",name:"Lungo – negative split ondulato",km:8,det:"Primi 4km a 7:10/km, ultimi 4km a 6:45/km."}]},
  {w:3,date:"8–14 giu",type:"n",ss:[
    {id:"3a",day:"Giovedì",name:"Ripetute 3×1km a 5:50",km:6,det:"2km risc., 3×1km a 5:50/km con 90\" camm., 1km defat."},
    {id:"3b",day:"Domenica",name:"Lungo lento – negative split",km:12,det:"Primi 6km a 7:10/km, ultimi 6km a 6:40/km."}]},
  {w:4,date:"15–21 giu",type:"s",ss:[
    {id:"4a",day:"Giovedì",name:"Scarico – corsa facile",km:5,det:"7:00/km. Settimana di recupero."},
    {id:"4b",day:"Domenica",name:"Lungo corto – negative split",km:10,det:"Primi 5km a 7:15/km, ultimi 5km a 6:50/km."}]},
  {w:5,date:"22–28 giu",type:"n",phase:"Fase 2 — Costruzione",phaseDesc:"Sett. 5–8 · Aumento volume e intensità",ss:[
    {id:"5a",day:"Giovedì",name:"🏔 Salite – 6-8 ripetute",km:7,det:"2km risc., 6–8 ripetute su salita 80–100m, discesa trotterellando, 1km defat."},
    {id:"5b",day:"Domenica",name:"Lungo – negative split",km:13,det:"Primi 7km a 7:00/km, ultimi 6km a 6:30/km."}]},
  {w:6,date:"29 giu–5 lug",type:"n",ss:[
    {id:"6a",day:"Giovedì",name:"Ripetute 4×1km a 5:45",km:7,det:"2km risc., 4×1km a 5:45/km con 90\" rec., 1km defat."},
    {id:"6b",day:"Domenica",name:"Lungo – negative split",km:14,det:"Primi 7km a 6:55/km, ultimi 7km a 6:25/km."}]},
  {w:7,date:"6–12 lug",type:"n",ss:[
    {id:"7a",day:"Giovedì",name:"Progressivo lungo",km:8,det:"2km risc., 4km progressione, ultimi 2km a 5:55/km, 1km defat."},
    {id:"7b",day:"Domenica",name:"Lungo ondulato – negative split",km:15,det:"Primi 8km a 6:50/km, ultimi 7km a 6:20/km."}]},
  {w:8,date:"13–19 lug",type:"s",ss:[
    {id:"8a",day:"Giovedì",name:"Scarico – ripetute leggere",km:5.5,det:"3–4 ripetute brevi a ritmo comodo. Corri prima delle 8."},
    {id:"8b",day:"Domenica",name:"Lungo ridotto",km:7,det:"Primi 4km a 7:00/km, ultimi 3km a 6:30/km."}]},
  {w:9,date:"20–26 lug",type:"n",phase:"Fase 3 — Sviluppo",phaseDesc:"Sett. 9–12 · Consolidamento resistenza",ss:[
    {id:"9a",day:"Giovedì",name:"Corto veloce",km:8,det:"2km risc., 4×1km a 5:40/km con 90\" rec., 2km defat."},
    {id:"9b",day:"Domenica",name:"Lungo ondulato – negative split",km:12,det:"Primi 6km a 6:45/km, ultimi 6km a 6:15/km."}]},
  {w:10,date:"27 lug–2 ago",type:"n",ss:[
    {id:"10a",day:"Giovedì",name:"⏱ Prova cronometro 6km",km:9,det:"2km risc., 6km al massimo sforzo sostenibile, 1km defat. Target: sotto 34 min."},
    {id:"10b",day:"Domenica",name:"Lungo – negative split",km:17,det:"Primi 9km a 6:45/km, ultimi 8km a 6:10/km."}]},
  {w:11,date:"3–9 ago",type:"n",ss:[
    {id:"11a",day:"Giovedì",name:"Corsa facile",km:8,det:"8km a 7:00/km. Idratazione importante."},
    {id:"11b",day:"Domenica",name:"Lungo",km:14,det:"Primi 7km a 6:40/km, ultimi 7km a 6:10/km."}]},
  {w:12,date:"10–16 ago",type:"s",ss:[
    {id:"12a",day:"Giovedì",name:"Corto veloce",km:8,det:"2km risc., 3×2km a 5:45/km con 2' rec., 2km defat."},
    {id:"12b",day:"Domenica",name:"Lungo ondulato",km:15,det:"Primi 8km a 6:40/km, ultimi 7km a 6:10/km."}]},
  {w:13,date:"17–23 ago",type:"n",phase:"Fase 4 — Specifico",phaseDesc:"Sett. 13–15 · Lungo con finale a ritmo gara 5:41/km",ss:[
    {id:"13a",day:"Giovedì",name:"Ripetute 3×2km a 5:40",km:9,det:"2km risc., 3×2km a 5:40/km con 2' rec., 3km defat."},
    {id:"13b",day:"Domenica",name:"Lungo specifico con finale a ritmo gara",km:19,det:"Km 1–10 a 6:30/km, km 11–14 a 6:00/km, ultimi 5km a 5:41/km."}]},
  {w:14,date:"24–30 ago",type:"n",ss:[
    {id:"14a",day:"Giovedì",name:"Progressivo con finale a ritmo gara",km:10,det:"3km risc., 5km progressione, ultimi 2km a 5:41/km."},
    {id:"14b",day:"Domenica",name:"Lungo 20km con finale a ritmo gara",km:20,det:"Km 1–10 a 6:30/km, km 11–15 a 5:55/km, ultimi 5km a 5:41/km."}]},
  {w:15,date:"31 ago–6 set",type:"n",ss:[
    {id:"15a",day:"Giovedì",name:"Ripetute 2×3km a 5:42",km:9,det:"2km risc., 2×3km a 5:42/km con 3' rec., 4km defat."},
    {id:"15b",day:"Domenica",name:"Lungo massimo 21km",km:21,det:"Km 1–10 a 6:25/km, km 11–16 a 5:55/km, ultimi 5km a 5:41/km."}]},
  {w:16,date:"7–13 set",type:"s",phase:"Fase 5 — Tapering",phaseDesc:"Sett. 16–19 · Riduzione volume · Gambe fresche",ss:[
    {id:"16a",day:"Giovedì",name:"Ripetute scarico",km:6.3,det:"2km risc., 4×1km a 5:45/km con 90\" rec., 2km defat."},
    {id:"16b",day:"Domenica",name:"Lungo ridotto – negative split",km:16,det:"Primi 8km a 7:00/km, ultimi 8km a 6:30/km."}]},
  {w:17,date:"14–20 set",type:"t",ss:[
    {id:"17a",day:"Giovedì",name:"Corto veloce",km:5.5,det:"1km risc., 4×800m a 5:40/km con 90\" rec., 1km defat."},
    {id:"17b",day:"Domenica",name:"Lungo tranquillo",km:12,det:"Primi 6km a 6:50/km, ultimi 6km a 6:20/km."}]},
  {w:18,date:"21–27 set",type:"t",ss:[
    {id:"18a",day:"Giovedì",name:"Corsetta sciolta + strides",km:6,det:"4km a 7:00/km + 4×100m a ritmo gara."},
    {id:"18b",day:"Domenica",name:"Corsa breve con assaggio ritmo",km:12,det:"Km 1–6 a 7:00/km, km 7–10 a 6:30/km, ultimi 2km a 5:41/km."}]},
  {w:19,date:"5–9 ott",type:"t",ss:[
    {id:"19a",day:"Giovedì",name:"Tapering finale – strides",km:5,det:"4km a 7:00/km + 4×100m a ritmo gara."},
    {id:"19b",day:"Sabato",name:"Corsetta leggera",km:3,det:"3km facilissimi a 7:15/km. Poi riposo totale."}]},
  {w:20,date:"11 ott 2026",type:"g",ss:[
    {id:"20a",day:"Domenica",name:"GARA – Mezza Maratona Re→Venaria",km:21.1,gara:true,det:"Km 1–5 a 5:55/km · km 6–15 a 5:45/km · km 16–21 a 5:30/km"}]}
];

const TC={n:G,s:W,t:P,g:R};
const TL={n:"Normale",s:"Scarico",t:"Tapering",g:"Gara"};

const bg0="#0e0f0f",bg1="#161818",bg2="#1e2020",bd="#2a2e2e",mu="#7a8a7a";

function Card({c,children}){return <div style={{background:bg1,border:`1px solid ${bd}`,borderTop:`2px solid ${c}`,borderRadius:10,padding:14,marginBottom:10}}>{children}</div>;}
function CardTitle({c,t}){return <div style={{fontSize:11,fontWeight:500,textTransform:"uppercase",letterSpacing:1.5,color:c,marginBottom:10}}>{t}</div>;}
function Li({t}){return <li style={{fontSize:13,lineHeight:1.7,marginBottom:3}}>{t}</li>;}

function NoteCards({cards}){
  return <>{cards.map(({t,c,items})=>(
    <Card key={t} c={c}>
      <CardTitle c={c} t={t}/>
      <ul style={{paddingLeft:14}}>{items.map(i=><Li key={i} t={i}/>)}</ul>
    </Card>
  ))}</>;
}

function SessCard({s,d,onToggle,onUpdate}){
  const [ok,setOk]=useState(false);
  const fields=[["Data","date","date",""],["Km","km","number",s.km],["Durata","dur","text","48:30"],["Ritmo /km","pace","text","6:12"],["FC bpm","hr","number","148"],["Dislivello m","elev","number","85"]];
  return(
    <div style={{background:bg2,borderRadius:8,padding:12,marginBottom:8}}>
      <div style={{display:"flex",gap:10,marginBottom:10}}>
        <div onClick={onToggle} style={{width:18,height:18,borderRadius:4,border:`1.5px solid ${d.done?G:bd}`,background:d.done?G:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>
          {d.done&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
        </div>
        <div>
          <div style={{fontSize:10,color:G,textTransform:"uppercase",letterSpacing:1}}>{s.day}</div>
          <div style={{fontSize:13,fontWeight:500,marginTop:1}}>{s.name}</div>
          <div style={{fontSize:11,color:mu,marginTop:2,lineHeight:1.5}}>{s.det}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {fields.map(([l,f,t,ph])=>(
          <div key={f}>
            <div style={{fontSize:10,color:mu,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{l}</div>
            <input type={t} value={d[f]||""} placeholder={String(ph)} onChange={e=>onUpdate(f,e.target.value)}
              style={{width:"100%",background:bg0,border:`1px solid ${bd}`,borderRadius:6,padding:"5px 8px",color:"#e8ece8",fontSize:12,fontFamily:"monospace"}}/>
          </div>
        ))}
        <div style={{gridColumn:"1/-1"}}>
          <div style={{fontSize:10,color:mu,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Note</div>
          <textarea value={d.note||""} onChange={e=>onUpdate("note",e.target.value)}
            style={{width:"100%",background:bg0,border:`1px solid ${bd}`,borderRadius:6,padding:"5px 8px",color:"#e8ece8",fontSize:12,resize:"vertical",minHeight:40}}/>
          <div style={{fontSize:10,color:mu,marginTop:3,padding:"3px 8px",borderLeft:"2px solid #FC4C02"}}>
            Da Strava: distanza · durata · ritmo · FC · dislivello
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
        <button onClick={()=>{setOk(true);setTimeout(()=>setOk(false),2000);}}
          style={{padding:"5px 14px",fontSize:11,background:P,color:"#fff",border:"none",borderRadius:6,cursor:"pointer"}}>Salva</button>
        {ok&&<span style={{fontSize:11,color:G}}>✓ Salvato</span>}
      </div>
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState("tracker");
  const [st,setSt]=useState({});
  const [open,setOpen]=useState({});
  const [aiTxt,setAiTxt]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const [aiVis,setAiVis]=useState(false);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get(KEY);if(r?.value)setSt(JSON.parse(r.value));}catch{}})();},[]);

  const save=async(next)=>{setSt(next);try{await window.storage.set(KEY,JSON.stringify(next));}catch{}};
  const togDone=id=>save({...st,[id]:{...st[id],done:!st[id]?.done}});
  const updF=(id,f,v)=>save({...st,[id]:{...st[id],[f]:v}});
  const togW=w=>setOpen(o=>({...o,[w]:!o[w]}));

  const tot=PLAN.reduce((a,w)=>a+w.ss.length,0);
  const done=PLAN.reduce((a,w)=>a+w.ss.filter(s=>st[s.id]?.done).length,0);
  const km=PLAN.reduce((a,w)=>a+w.ss.reduce((b,s)=>b+(st[s.id]?.done?(parseFloat(st[s.id]?.km)||s.km):0),0),0);
  const pct=Math.round(done/tot*100);

  const callAI=async()=>{
    setAiVis(true);setAiLoad(true);setAiTxt("");
    let lines=[];
    PLAN.forEach(w=>w.ss.forEach(s=>{const d=st[s.id];if(d?.done)lines.push(`W${w.w} ${s.day}: ${s.name} | km:${d.km||s.km} | dur:${d.dur||"-"} | ritmo:${d.pace||"-"} | FC:${d.hr||"-"} | D+:${d.elev||"-"}m${d.note?" | "+d.note:""}`);;}));
    const prompt=`Sei un coach di corsa esperto. L'atleta si prepara per la Mezza Maratona Re→Venaria l'11 ottobre 2026, obiettivo sub 2h. Piano 20 settimane, 2 corse/settimana, profilo ondulato, livello intermedio. Artroscopia menisco ginocchio destro 3 anni fa.\n\nSessioni: ${done}/${tot}. Km: ${km.toFixed(1)}.\n${lines.length?"Dettaglio:\n"+lines.join("\n"):"Nessuna sessione registrata."}\n\nAnalisi in italiano max 200 parole: 1) valutazione andamento 2) segnali da monitorare 3) 2-3 consigli concreti. Tono diretto e motivante. Solo testo.`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:prompt}]})});
      const data=await r.json();
      setAiTxt(data.content?.find(b=>b.type==="text")?.text||"Nessuna risposta.");
    }catch{setAiTxt("Errore. Riprova.");}
    setAiLoad(false);
  };

  const TABS=[["tracker","📊 Tracker"],["piano","🗓 Piano"],["ritmi","📋 Ritmi"],["stretch","🧘 Stretch"],["food","🍽 Cibo"]];

  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:bg0,color:"#e8ece8",minHeight:"100vh"}}>

      <div style={{padding:"20px 16px 14px",borderBottom:`1px solid ${bd}`}}>
        <div style={{fontSize:26,fontWeight:600,marginBottom:10}}>Mezza <span style={{color:P}}>Maratona</span></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {[["Gara","11 ott 2026",true],["Percorso","Re → Venaria",true],["Obiettivo","Sub 2:00:00",true],["Settimane","20"],["Corse/sett","2 (Gio+Dom)"]].map(([l,v,a])=>(
            <div key={l}><div style={{fontSize:10,color:mu,textTransform:"uppercase",letterSpacing:1}}>{l}</div><div style={{fontSize:12,fontWeight:500,color:a?P:"#e8ece8"}}>{v}</div></div>
          ))}
        </div>
      </div>

      <nav style={{display:"flex",overflowX:"auto",background:bg1,borderBottom:`1px solid ${bd}`,position:"sticky",top:0,zIndex:50}}>
        {TABS.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flexShrink:0,padding:"10px 12px",fontSize:11,fontFamily:"inherit",color:tab===id?P:mu,background:"transparent",border:"none",borderBottom:tab===id?`2px solid ${P}`:"2px solid transparent",cursor:"pointer",whiteSpace:"nowrap",fontWeight:tab===id?500:400}}>{label}</button>
        ))}
      </nav>

      {tab==="tracker"&&(
        <div style={{padding:"16px 16px 48px"}}>
          <div style={{fontSize:14,fontWeight:500,marginBottom:12,paddingBottom:8,borderBottom:`1px solid ${bd}`}}>Avanzamento piano</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:12}}>
            {[["Sessioni fatte",done],["Totale",tot],["Km percorsi",km.toFixed(1)],["Completato",pct+"%"]].map(([l,v])=>(
              <div key={l} style={{background:bg2,borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:600,color:P}}>{v}</div>
                <div style={{fontSize:10,color:mu,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{height:5,background:bd,borderRadius:3,marginBottom:14,overflow:"hidden"}}>
            <div style={{height:"100%",width:pct+"%",background:P,borderRadius:3,transition:"width .4s"}}/>
          </div>

          <button onClick={callAI} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:bg1,border:`1px solid ${bd}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",marginBottom:12,textAlign:"left"}}>
            <span style={{fontSize:20}}>🤖</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500,color:P}}>Chiedi al Coach AI</div>
              <div style={{fontSize:11,color:mu,marginTop:2}}>Analisi personalizzata sul tuo andamento</div>
            </div>
            <span style={{color:mu}}>▶</span>
          </button>

          {aiVis&&(
            <div style={{background:bg1,border:`1px solid ${bd}`,borderRadius:10,padding:14,marginBottom:12}}>
              <div style={{fontSize:11,color:P,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🤖 Coach AI</div>
              <div style={{fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{aiLoad?"Analisi in corso...":aiTxt}</div>
            </div>
          )}

          {PLAN.map(w=>{
            const dc=w.ss.filter(s=>st[s.id]?.done).length;
            const allD=dc===w.ss.length,partD=dc>0&&!allD;
            return(
              <div key={w.w} style={{border:`1px solid ${bd}`,borderRadius:8,overflow:"hidden",background:bg1,marginBottom:6}}>
                <div onClick={()=>togW(w.w)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",cursor:"pointer"}}>
                  <span style={{fontSize:12,fontWeight:500,color:mu,minWidth:26}}>W{w.w}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500}}>Settimana {w.w}{w.w===20?" · 🏁":""}</div>
                    <div style={{fontSize:11,color:mu}}>{w.date}</div>
                  </div>
                  <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,border:`1px solid ${allD?G:partD?W:bd}`,color:allD?G:partD?W:mu,background:allD?"rgba(29,158,117,.1)":partD?"rgba(186,117,23,.1)":"transparent"}}>
                    {allD?"✓ Fatta":partD?`${dc}/${w.ss.length}`:`${w.ss.length} sess.`}
                  </span>
                  <span style={{color:mu,fontSize:11,marginLeft:4}}>{open[w.w]?"▼":"▶"}</span>
                </div>
                {open[w.w]&&(
                  <div style={{borderTop:`1px solid ${bd}`,padding:"10px 12px"}}>
                    {w.ss.map(s=><SessCard key={s.id} s={s} d={st[s.id]||{}} onToggle={()=>togDone(s.id)} onUpdate={(f,v)=>updF(s.id,f,v)}/>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab==="piano"&&(
        <div style={{padding:"16px 16px 48px"}}>
          {(()=>{let lp="";return PLAN.map(w=>{
            const sp=w.phase&&w.phase!==lp;if(sp)lp=w.phase;
            const col=TC[w.type],tot=w.ss.reduce((a,s)=>a+s.km,0);
            return(<div key={w.w}>
              {sp&&<div style={{margin:"16px 0 8px"}}><div style={{fontSize:15,fontWeight:500,color:col}}>{w.phase}</div><div style={{fontSize:11,color:mu}}>{w.phaseDesc}</div></div>}
              <div style={{border:`1px solid ${bd}`,borderLeft:`3px solid ${col}`,borderRadius:10,overflow:"hidden",marginBottom:8,background:bg1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",background:bg2}}>
                  <span style={{fontSize:14,fontWeight:500,color:mu,minWidth:30}}>W{w.w}</span>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>Settimana {w.w}</div><div style={{fontSize:11,color:mu}}>{w.date}</div></div>
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,border:`1px solid ${col}`,color:col}}>{TL[w.type]}</span>
                </div>
                {w.ss.length===1&&w.ss[0].gara?(
                  <div style={{padding:16,textAlign:"center"}}>
                    <div style={{fontSize:18,fontWeight:500,color:R,marginBottom:6}}>🏁 Mezza Maratona Re→Venaria</div>
                    <div style={{fontSize:12,color:mu,lineHeight:1.6}}>{w.ss[0].det}</div>
                  </div>
                ):(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                    {w.ss.map((s,i)=>(
                      <div key={s.id} style={{padding:"10px 12px",borderTop:`1px solid ${bd}`,borderRight:i===0?`1px solid ${bd}`:"none"}}>
                        <div style={{fontSize:10,color:G,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{s.day}</div>
                        <div style={{fontSize:12,fontWeight:500,marginBottom:3}}>{s.name}</div>
                        <div style={{fontSize:11,color:mu,lineHeight:1.5}}>{s.det}</div>
                        <div style={{fontSize:16,fontWeight:500,color:G,marginTop:6}}>{s.km} km</div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{padding:"7px 12px",borderTop:`1px solid ${bd}`,background:bg2,textAlign:"right",fontSize:12,color:mu}}>
                  Totale: <strong style={{color:"#e8ece8"}}>{tot} km</strong>
                </div>
              </div>
            </div>);
          });})()}
        </div>
      )}

      {tab==="ritmi"&&(
        <div style={{padding:"16px 16px 48px"}}>
          <div style={{fontSize:14,fontWeight:500,marginBottom:12,paddingBottom:8,borderBottom:`1px solid ${bd}`}}>Note & Ritmi</div>
          <NoteCards cards={[
            {t:"Ritmi di riferimento",c:P,items:["Ritmo gara: 5:41/km (sub 2h)","Lento base: 7:00–7:15/km","Lento sviluppo: 6:30–6:45/km","Ripetute: 5:40–5:50/km","Defaticamento: 7:00–7:30/km"]},
            {t:"Ginocchio post-artroscopia",c:R,items:["Fastidio → 45' bici o nuoto","Mai aumentare volume 2 sett. consecutive con segnali","5' camminata veloce prima di ogni corsa","Ghiaccio 10–15 min dopo sessioni qualità o lunghi >15km"]},
            {t:"Strategia gara · Re→Venaria",c:G,items:["Km 1–5: 5:55/km — parti conservativo","Km 6–15: 5:45/km — ritmo controllato","Km 16–21: 5:30/km — spinta finale","Non guardare il crono nei primi 5km"]},
            {t:"Estate · Caldo",c:W,items:["Luglio–agosto: corri prima delle 8 o dopo le 20","Temperatura >28°C → riduci ritmo 15–20 sec/km","500ml nelle 2h prima, acqua ogni 5km nel lungo"]},
            {t:"Negative split",c:P,items:["Parti sempre più lento di quanto pensi","Cambio ritmo graduale, non uno scatto","Se soffri a metà lungo, rallenta — non accelerare"]},
            {t:"Settimana pre-gara",c:G,items:["Lun–mer: riposo o camminata leggera","Giovedì: corsetta con strides","Ven–sab: riposo totale","Dom 11 ott: colazione 3h prima, solo cibi noti"]},
          ]}/>
        </div>
      )}

      {tab==="stretch"&&(
        <div style={{padding:"16px 16px 48px"}}>
          <div style={{fontSize:14,fontWeight:500,marginBottom:8,paddingBottom:8,borderBottom:`1px solid ${bd}`}}>Stretching</div>
          <div style={{fontSize:12,color:W,background:"rgba(186,117,23,.1)",borderRadius:8,padding:"8px 12px",marginBottom:14,border:"1px solid rgba(186,117,23,.3)"}}>
            ⚠️ Mai stretching statico prima della corsa — solo riscaldamento dinamico. Statico solo dopo.
          </div>
          <NoteCards cards={[
            {t:"Prima · Riscaldamento dinamico (5 min)",c:G,items:["Camminata veloce 2 min — scalda il ginocchio","Ginocchia alte — 20 passi alternati","Calci ai glutei — 20 passi","Circonduzioni caviglie — 10 rotazioni/lato","Affondi dinamici — 8/gamba, non tenere la posizione","Leg swing laterali — 10/gamba"]},
            {t:"Dopo · Stretching statico (10–12 min)",c:P,items:["Quadricipite — 30 sec/gamba. Tallone al gluteo. Non forzare (menisco!)","IT band — 30 sec/lato. Incrocia gambe, piega busto","Polpaccio — 30 sec/gamba. A muro, gamba dritta","Flessore anca — 30 sec/lato. Affondo basso, ginocchio a terra","Hamstring — 30 sec/gamba. Seduto, gamba tesa","Piriforme — 30 sec/lato. Sdraiato, caviglia sul ginocchio opposto","Schiena bassa — 30 sec. Entrambe le ginocchia al petto"]},
            {t:"Dopo i lunghi · Extra (5 min)",c:W,items:["Soleo — 30 sec/gamba. Come polpaccio ma ginocchio piegato","Fascia plantare — 1 min/piede. Dita verso la tibia","Spalancata anca — 45 sec/lato. Affondo profondo, gomito a terra","Rotazione toracica — 10/lato. In quadrupedia, gomito verso il soffitto","Posizione del bambino — 1 min. Braccia in avanti"]},
          ]}/>
        </div>
      )}

      {tab==="food"&&(
        <div style={{padding:"16px 16px 48px"}}>
          <div style={{fontSize:14,fontWeight:500,marginBottom:12,paddingBottom:8,borderBottom:`1px solid ${bd}`}}>Alimentazione</div>
          <NoteCards cards={[
            {t:"Prima · Giovedì (qualità)",c:G,items:["3–4h prima: carboidrati + proteine leggere","1–2h prima: banana + mandorle o pane con miele","30–45 min prima: solo acqua 300–400 ml","Evita fibre in eccesso, latticini, grassi pesanti"]},
            {t:"Prima · Lungo domenicale (>75 min)",c:P,items:["Sera prima: pasta o risotto generoso","Mattina 2–3h prima: porridge + banana + miele","Durante: gel o banana a metà (km 8–10)","Acqua: 500ml nell'ora prima, sorsi ogni 15–20 min"]},
            {t:"Dopo · Finestra recupero (entro 45 min)",c:G,items:["Carboidrati + proteine nel rapporto 3:1","Yogurt greco + banana + miele, o frullato","Pasto 1–2h dopo: proteine + carboidrati + verdure","Dopo lunghi: sodio (brodo, pretzel salati)"]},
            {t:"Giorno gara · 11 ottobre",c:R,items:["Sera prima: pasta in bianco o riso. Niente di nuovo","Colazione 3h prima: porridge + banana + miele + caffè","90 min prima: 400ml acqua + mezzo gel opzionale","Durante: gel km 7–8 e 14–15. Acqua a ogni ristoro","Dopo: acqua + banana. Pasto completo entro 2h 🎉"]},
          ]}/>
        </div>
      )}

    </div>
  );
}
