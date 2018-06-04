function Year()
{
  let base = document.body;

  let year = new Date().getFullYear();

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];
  
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday" 
  ]

  // let leap = new Date(year, 1, 29).getDate() === 29;
  // let days = leap ? 366 : 365;
  // let cell = parseInt((base.getBoundingClientRect().width - 52*2)/52);

  let week = 0;
  let count = 1;
  let month = 0;

  let style = "day";

  // make grid
  // while(week < 52)
  // {
  //   let x = parseInt(week * (cell+2));
  //   let day = 0;
  //   while(day < 7)
  //   {
  //     let y = parseInt(day * (cell+2))
  //     count++;
  //     base.innerHTML += `<rect class='day' x='${x}' y='${y}' title='${count}' width='${cell}' height='${cell}' rx="2" ry="2" onclick=""></rect>`;
  //     day += 1
  //   }
  //   week += 1
  // }

//  let i = 0;
//   while(month < 12)
//   {
//     let day = 0;
//     let x = 0;
//     while(day < new Date(year, month).monthDays(month))
//     {
//       if(i === 7)
//       {
//         week++
//         i=0
//       }
//       day++;
//       i++
//       count++;
//       let y = parseInt(count * (cell+1));
//       console.log(count + ", M" + month + ", W" + week + ", D" + day);
//       base.innerHTML += `<rect class='${CheckDay(year, month, day)}' x='${x}' y='${y}' title='${count}' width='${cell}' height='${cell}' rx="2" ry="2" onclick=""></rect>`;
//     }
//     month++;
//   }
// }

    //start container
    //add month text
      //mtwtfss
        //start comparing date with weekdays
          //start iterating through days from a match until month is over


  //let cell = parseInt((base.getBoundingClientRect().width - 52*2)/52)

  while(month < 12)
  {
    base.innerHTML += `
      <div class="month">
      <p class="m" x="" y='${month * 140}' dy="10">${monthNames[new Date(year, month).getMonth()].substr(0,2)}</p>
      <svg class="graph">
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
      y = i * 20;
      html += `<text class="dayLabel" x="7" y='${y}' dy="10">${dayNames[i].substr(0,1)}</text>`
    }
    return html;
  }

  function populateMonth(m)
  {
    html = "";
    monthLength = new Date(year, m, 0).getDate();
    let day = 0;
    let x = 14;
    let y = 0;

    while(day < monthLength)
    {
      let i = 0
      x += 14;
      
      while(i < 7)
      {
        y = i * 14;
        
        //is it monday? is it tuesday? etc. instantiate null until day match then start for every day;
        
        html += `<rect class="day" x='${x}' y='${y}' title='${day}' width="12px" height="12px" rx="2" ry="2" onclick=""></rect>`
        i++
        day++
        count++
      }
    }
    return html;
  }
}


  
  // while(count <= days)
  // {
  //   t = new Date(year, month, count)
  //   let x = cell;
  //   let y = parseInt(count * (cell+2));
    
  //   console.log(t);

  //   base.innerHTML += `<rect class='${CheckDay(t)}' x='${x}' y='${y}' title='${count}' width='${cell}' height='${cell}' rx="2" ry="2" onclick=""></rect>`;
  //   count++;
  // }

  // function CheckDay(day)
  // {
  //   switch(day.getDay())
  //   {
  //     case 0:
  //       style = "weekend";
  //       break;
  //     case 6:
  //       style = "weekend";
  //       break;
  //     default:
  //       style = "day";
  //   }
  //   return style;
  // }