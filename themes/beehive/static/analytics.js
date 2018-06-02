(function(){
    let retention=0;
    let data={visit:{
        referer: document.referrer        
    }};
    let options={
        method: 'post',
        headers: {
            'content-type':'application/json'
        }
    };
    let scriptElement=document.querySelector('script[data-id="analytics"]')
    let baseUrl=scriptElement.getAttribute("data-url");
    console.log(baseUrl);
    function postVisit(url,data,options){
        data.visit.retention=retention;
        retention+=20;
        options.body=JSON.stringify(data);

        fetch(url,options)
            .then(response=>response.json())
            .then(json=>{
                console.log(json);
                data.visit.id=json.id;
                options.method='put';
                url=baseUrl+"/"+json.id;
                setTimeout(postVisit,20000,url,data,options);
            }).catch(e=>console.log(e));
    }
    postVisit(baseUrl,data,options);
})();
