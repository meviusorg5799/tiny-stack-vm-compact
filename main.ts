import{readdirSync,readFileSync,mkdirSync,writeFileSync}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const S="#4d')-.2        ,,,,,,,(,,,(,,, ,,,             CGGC#           (+              ''$'";
const B=[(a,b)=>(a+b)|0,(a,b)=>(a-b)|0,Math.imul,
(a,b)=>{if(!b)throw 4;return(a/b)|0},
(a,b)=>{if(!b)throw 4;return a%b|0},
(a,b)=>{if(!b)throw 4;return((a>>>0)/(b>>>0))|0},
(a,b)=>{if(!b)throw 4;return(a>>>0)%(b>>>0)|0},
0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,
(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>(a>>>(b&31))|0,0,
(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>a>>>0<b>>>0?1:0];
function run(p,g){
 const n=p.length;let A=new Int32Array(576),s=0,c=0,o=new Uint8Array(1<<16),l=0,j=0,pc=0,st=0;
 try{for(;;){
  if(st==1e6)throw 10;
  if(pc<0||pc>=n)throw 9;
  const k=p[pc],t=S.charCodeAt(k)-35;
  if(!(t>=0)||t>79)throw 5;
  const m=t>>4;if(pc+m>=n)throw 9;
  st++;const nx=pc+1+m,po=(t>>2)&3,pu=t&3;
  if(s<po)throw 2;
  if(s-po+pu>256)throw 3;
  pc=nx;
  if(k<8){
   if(k==0)return[o.subarray(0,l),0];
   if(k==1)A[s++]=(p[nx-1]<<24)>>24;
   else if(k==2)A[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;
   else if(k==3)s--;
   else if(k==4){A[s]=A[s-1];s++}
   else if(k==5){const x=A[s-1];A[s-1]=A[s-2];A[s-2]=x}
   else if(k==6){A[s]=A[s-2];s++}
   else{const a=A[s-3];A[s-3]=A[s-2];A[s-2]=A[s-1];A[s-1]=a}
  }else if(k>=16&&k<=34){
   if(k==23)A[s-1]=-A[s-1]|0;
   else if(k==27)A[s-1]=~A[s-1];
   else{const b=A[s-1],a=A[s-2];s-=2;A[s++]=B[k-16](a,b)}
  }else if(k>=48&&k<=52){
   const r=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
   if(k==48)pc=nx+r;
   else if(k==49||k==50){const v=A[--s];if((v==0)==(k==49))pc=nx+r}
   else if(k==51){if(c==64)throw 7;A[256+c++]=nx;pc=p[nx-2]|p[nx-1]<<8}
   else{if(!c)throw 8;pc=A[256+--c]}
  }else if(k==64){
   const a=A[s-1];if(a<0||a>255)throw 6;A[s-1]=A[320+a];
  }else if(k==65){
   const a=A[s-1],v=A[s-2];if(a<0||a>255)throw 6;s-=2;A[320+a]=v;
  }else if(k==80){
   const y=Buffer.from(""+A[--s]);if(l+y.length>(1<<16))throw 11;o.set(y,l);l+=y.length;
  }else if(k==81){
   if(l+1>(1<<16))throw 11;o[l++]=A[--s]&255;
  }else if(k==82){
   A[s++]=j<g.length?g[j++]:-1;
  }else{
   return[o.subarray(0,l),A[--s]&255];
  }
 }}catch(e){return[o.subarray(0,l),e]}
}
for(const d of readdirSync(I).sort()){
 const[o,e]=run(readFileSync(I+"/"+d+"/program.bin"),readFileSync(I+"/"+d+"/input.bin"));
 mkdirSync(O+"/"+d,{recursive:true});
 writeFileSync(O+"/"+d+"/stdout.bin",o);
 writeFileSync(O+"/"+d+"/exit.txt",e+"\n");
}
