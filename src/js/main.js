(function(){
    let chart = new Chart(document.getElementById('myChart'),config);
    let button = document.querySelector('.switch');
    let currentView = document.getElementById('currentView');
          
    let company = {
    "Company A": {
        "2019-01-01": 6031690.89,
        "2019-04-01": 6814949.07,
        "2019-07-01": 6331286.67,
        "2019-10-01": 9021847.94,
        "2020-01-01": 6590475.57,
        "2020-04-01": 8131114.13,
        "2020-07-01": 8475237.09,
        "2020-10-01": 13157888.35
    }
}
const labels = Object.keys(company['Company A']);
const values = Object.values(company['Company A']);


  const data = {
    labels: labels,
    datasets: [{
      label: 'Consumer Edge Sample Data',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: values,
    }]
  };
 

   const config = {
    type: 'line',
    data,
    options: {
        responsive: true,
    }
  };


   function toggleView(){
       
      chart.config.type = chart.config.type  === "line" ? "bar" : "line";
      currentView.innerText = `current chart view: ${chart.config.type}`
      
      chart.update()
    
 
    }

    button.addEventListener("change",toggleView)

})();


