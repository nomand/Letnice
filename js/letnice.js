function Year()
{
  let base = document.body;

  let year = new Date().getFullYear();

  const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

  // let leap = new Date(year, 1, 29).getDate() === 29;
  // let days = leap ? 366 : 365;
  // let cell = parseInt((base.getBoundingClientRect().width - 52*2)/52);

  let count = 1;
  let month = 0;

  let style = "day";
  
  while(month < 12)
  {
    base.innerHTML += `
      <div class="month">
      <p class="m" x="" y='${month * 140}' dy="10">${monthNames[new Date(year, month).getMonth()].substr(0,2)}</p>
      <svg class="graph" id="${monthNames[month]}">
      ${dayLabels()}
      ${populateMonth(month)}
      </svg></div>`
    month++
  }

  function dayLabels()
  {
    let html = "";
    let y = 0;
    
    for(i = 0; i < 7; i++)
    {
      y = i * 14;
      html += `<text class="dayLabel" x="3" y='${y}' dy="10">${dayNames[i].substr(0,1)}</text>`
    }
    return html;
  }

  function populateMonth(month)
  {
    html = "";
    monthLength = new Date(year, month+1, 0).getDate();
    let day = 0;
    let x = 0;
    let y = 0;

    while(day < monthLength)
    {
      x += 14;
      let weekDay = 0
      
      while(weekDay < 7 && day != monthLength)
      {
        y = weekDay * 14;
        
        if(new Date(year, month, day).getDay() != weekDay)
        {
          style = "null";
        }
        else
        {
          style = "day";
        }

        html += `<rect class='${style}' x='${x}' y='${y}' title='${day+1}' width="12px" height="12px" rx="2" ry="2" onclick=""></rect>`
        weekDay++
        day++
        count++
      }
    }
    return html;
  }
}