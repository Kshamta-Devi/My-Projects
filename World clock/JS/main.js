function time()
    {
      var d=new Date();

      var i=d.toLocaleTimeString('US-en',{
        timeZone:'Asia/Kolkata',
      });

      var ch=d.toLocaleTimeString('US-en',{
        timeZone:'Asia/Shanghai',
      });

      document.getElementById('India').innerHTML=i;
      document.getElementById('China').innerHTML=ch;

    }
    time();
    //setInterval(time,1000);
    setInterval(()=>{
        time();
    },1000)
