export default (time)=>{
    console.log(time,"纯时间戳77777777777")
    let date = new Date(parseInt(time));
    console.log(date,"parseInt后的date77777777777")
    let year = date.getFullYear();
    let month = (date.getMonth()+1+"").padStart(2,"0");
    let day = (date.getDate()+"").padStart(2,"0");
    return `${year}-${month}-${day}`;
}