const horas = document.getElementById('horas')
const minutos = document.getElementById('minutos')
const segundos = document.getElementById('segundos')


const relogio = setInterval(function time(){
    let dateToday = new Date();
    let h = dateToday.getHours();
    let min = dateToday.getMinutes();
    let seg = dateToday.getSeconds();

   
    let horaZero = h >= 10 ? h : `0${h}`
    let minutoZero = min >= 10 ? min : `0${min}`
    let segundoZero = seg >= 10 ? seg : `0${seg}`


    horas.textContent = horaZero;
    minutos.textContent = minutoZero;
    segundos.textContent = segundoZero;
})
