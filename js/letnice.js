const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const dayNames = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",  "Sunday" ]

function Year(letnice)
{
  let base = document.getElementById("center");
  base.innerHTML = "";
  let year;

  isNaN(letnice) || letnice==null ? year = new Date().getFullYear() : year = String(letnice).replace("#", "").substr(0,4);
  window.location.hash = year;

  let month = 0;
  let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1, 0);
  let style = "";
  let footer = "";

  base.innerHTML += doHeader();
  
  while(month < 12)
  {
    base.innerHTML += `<div class="month">
      <p class="m">${monthNames[new Date(year, month).getMonth()].substr(0,2)}</p>
      <svg class="graph" id="${monthNames[month]}">
      ${doLabels()}
      ${doMonth(month)}
      </svg></div>`
    month++
  }

  base.innerHTML += doFooter();
  footer = document.getElementById("footer");

  function doHeader()
  {
    return `<div class="header"><p class="y">${year}<a onclick="getYear(-1);">-</a><a onclick="getYear(1);">+</a></p><p class="p">${yearProgress(year)}</p></div>`;
  }

  function doFooter(content)
  {
    return `<div class="footer" id="footer">${footer}</div>`;
  }

  function yearProgress(year)
  {
    diff = new Date() - new Date(year, 0, 1, 0);
    progress = ((diff/31536000000)*100).toFixed(2);
    yd = Math.abs((progress / 100).toFixed(2));

    return progress < 0 ? yd + ` YEARS AWAY` : progress > 100 ? yd + ` YEARS AGO` : progress+"%";
  }

  function doLabels()
  {
    let html = "";
    let y = 0;
    
    for(i = 0; i < 7; i++)
    {
      y = (i * 14);
      html += `<text class="dayLabel" x="5" y='${y}' dy="10">${dayNames[i].substr(0,1)}</text>`
    }
    return html;
  }

  function doMonth(month)
  {
    html = "";
    monthLength = new Date(year, month+1, 0).getDate();
    let date = 0;
    let x = 0;
    let y = 0;
    
    while(date < monthLength)
    {
      x += 14;
      let week = 0;
      
      while(week < 7 && date != monthLength)
      {
        y = week * 14;
        let day = new Date(year, month, date, 0);

        if(day.getDay() != week)
        {
          style = "null";
          date--
        }
        else if(String(day) == String(today))
        {
          style = "today";
        }
        else if(day < today)
        {
          style = "gone";
        }
        else if(day.getDay() == 5 || day.getDay() == 6)
        {
          style = "weekend";
        }
        else
        {
          style = "day";
        }
        html += `<rect class='${style}' x='${x}' y='${y}' title='${(date+1) == 0 ? "null" : dayNames[week] + " " + (date+1)}' width="12px" height="12px" rx="2" ry="2" onclick="UpdateFooter('${year}', '${month}', '${(date+1)}', '${week}')"></rect>`
        week++
        date++
      }
    }
    return html;
  }
}

function UpdateFooter(year, month, date, week)
{
  let diff = ((new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0) - new Date(year, month, date))/86400000);
  let num = Math.abs(diff).toFixed();
  let calc;

  diff < 0 ? calc = `In ${num} Day${num>1?'s':''}.` : diff == 0 ? calc = `Today.`: calc = `${num} Day${num>1?'s':''} ago.`
  footer.innerHTML = `${monthNames[month]} ${date}, ${dayNames[week]}. ${calc}`;
}

function getYear(i)
{
  location.hash = parseInt(location.hash.replace('#','')) + parseInt(i);
}

window.onhashchange = function()
{
  Year(parseInt(location.hash.replace('#','')));
}