

window.addEventListener('load',()=>{
    document.getElementById('send-button').addEventListener('click',()=>{
    

        let location = document.getElementById('location-selector').value;
        let address = document.getElementById('address-input').value;
        let name = document.getElementById('name-input').value;
        let option = document.getElementById('option-input').value;
        
        console.log("window has been created");
        let cafesObj = {
            "location":location,
             "address":address,
             "name":name,
             "option":option};

          //Convert the js object into JSON
          let jsonData = JSON.stringify(cafesObj);

 

        //fetch('/location',{
          fetch('/cafes',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: jsonData

        })
        .then(response=>response.json())
        .then(data=>{console.log(data)});
    })

    document.getElementById('request-button').addEventListener('click',()=>{
        //fetch('/getCafesData')
        fetch('/getCafes')
        .then(resp=>resp.json())
        .then(data=>{
            console.log("getCafes success");
            document.getElementById('recommendation-info').innerHTML="";

            let wanted = document.getElementById('ask-type').value;

            let requesting;

            if(wanted=='Xuhui district'){
                requesting = 'Xuhui district';
                
                
               
            }else if(wanted=='JingAN'){
                requesting = 'JingAN';

            } else if(wanted=='HuangPu'){
                requesting = 'HuangPun';
            }else if(wanted=='PuDong'){
                requesting = 'PuDong';
            }
            /*
            JSONArray jsonArray = jsonObject.getJSONArray("personData");

            JSONArray jsonArray = jsonObject.getJSONArray("personData");
  
  
            for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject personData = jsonArray.getJSONObject(i);
            int age = personData.getInt("age");
            String url = personData.getString("url");
            String name = personData.getString("name");
              ···    
            } */

            for(let i=0;i<data.data.length;i++){
                if(data.data[i].location==requesting){

                    let stringName =  data.data[i].name;
                

                    console.log(stringName);
                   

                    let elt = document.createElement('p');
                    elt.innerHTML = stringName;
                 

                    document.getElementById("recommendation-info").appendChild(elt);
                }
            }
        })
    })
})


