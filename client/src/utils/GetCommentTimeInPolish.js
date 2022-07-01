const getCommentTimeInPolish = (time) => {
  const currentTime = `${time.getHours()}:${time.getMinutes()}` /// tutaj dokończyć
  let dateInPolish = new Intl.DateTimeFormat( 'pl-PL', { dateStyle: 'full' }).format(time);    
  return `${dateInPolish} o ${currentTime}`;
}

export default getCommentTimeInPolish;