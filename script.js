const bus = document.querySelector('.bus');
const count=document.querySelector('.count-info')
const buttonBuy=document.querySelector('.btn-buy')
const amount =document.querySelector('.amount-info');
const busRoute=document.getElementById('bus-list');
const seats= document.querySelectorAll('.seat:not(.reserved)');

getFromLS();

bus.addEventListener('click',function(e){
    if(e.target.classList.contains('seat')&&
    !(e.target.classList.contains('reserved'))){
        e.target.classList.toggle('selected');
    }
    calculatePrice();  
})

busRoute.addEventListener('change',function(e){
    calculatePrice();
})

buttonBuy.addEventListener('click',function(){
    calculateSelectedSeat();
})

let calculatePrice=function(){
    const selectedSeats=bus.querySelectorAll('.seat.selected');

    let selectedSeatCount=selectedSeats.length;
        amount.innerText=(busRoute.value*selectedSeatCount);
        count.innerText=selectedSeatCount;
        
    }
    
let calculateSelectedSeat=function(){
    const selectedSeats=bus.querySelectorAll('.seat.selected');
    const selectedSeatsArr=[];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });
    seats.forEach(function(seat){
        seatsArr.push(seat);
    })
    let selectedSeatIndexs=selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);  
    }) 
    saveToLS(selectedSeatIndexs);
   
    
}


function saveToLS(indexs){
let a= localStorage.setItem('selectedSeats',JSON.stringify(indexs));
localStorage.setItem('selectedBusRoute',JSON.stringify(busRoute.selectedIndex));
}

function getFromLS(){
    console.log("aa");
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!=null &&selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                console.log(seat.className);
                seat.className='seat reserved';
                console.log(seat.className);
            }
        })
    }

    const selectedBusRoute=localStorage.getItem('selectedBusRoute');
    if(selectedBusRoute!=null){
        busRoute.selectedIndex=selectedBusRoute;
    }
}

